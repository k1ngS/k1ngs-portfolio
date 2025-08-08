import "dotenv/config";
import fastifyCors from "@fastify/cors";
import {
	type FastifyTRPCPluginOptions,
	fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import Fastify from "fastify";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { logError, validateRequiredEnvVars } from "./lib/errors";
import { type AppRouter, appRouter } from "./routers/index";

// Validate required environment variables
validateRequiredEnvVars([
	"DATABASE_URL",
	"BETTER_AUTH_SECRET",
	"BETTER_AUTH_URL",
]);

const baseCorsConfig = {
	origin: process.env.CORS_ORIGIN || "",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	credentials: true,
	maxAge: 86400,
};

const fastify = Fastify({
	logger: {
		level: process.env.LOG_LEVEL || "info",
		transport: process.env.NODE_ENV === "development" ? {
			target: "pino-pretty",
			options: {
				colorize: true,
			},
		} : undefined,
	},
	bodyLimit: 1048576, // 1MB limit
	requestTimeout: 30000, // 30s timeout
});

// Security headers middleware
fastify.addHook("onSend", async (request, reply) => {
	reply.header("X-Content-Type-Options", "nosniff");
	reply.header("X-Frame-Options", "DENY");
	reply.header("X-XSS-Protection", "1; mode=block");
	reply.header("Referrer-Policy", "strict-origin-when-cross-origin");
	reply.header("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
});

// Rate limiting (basic implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // 100 requests per window

fastify.addHook("preHandler", async (request, reply) => {
	const clientIP = request.ip;
	const now = Date.now();
	
	const clientData = rateLimitMap.get(clientIP);
	
	if (!clientData || now > clientData.resetTime) {
		rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
	} else {
		clientData.count++;
		
		if (clientData.count > RATE_LIMIT_MAX) {
			reply.status(429).send({
				error: "Too Many Requests",
				message: "Rate limit exceeded. Please try again later.",
				retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
			});
			return;
		}
	}
});

fastify.register(fastifyCors, baseCorsConfig);

fastify.route({
	method: ["GET", "POST"],
	url: "/api/auth/*",
	async handler(request, reply) {
		try {
			const url = new URL(request.url, `http://${request.headers.host}`);
			const headers = new Headers();
			Object.entries(request.headers).forEach(([key, value]) => {
				if (value) headers.append(key, value.toString());
			});
			const req = new Request(url.toString(), {
				method: request.method,
				headers,
				body: request.body ? JSON.stringify(request.body) : undefined,
			});
			const response = await auth.handler(req);
			reply.status(response.status);
			response.headers.forEach((value, key) => reply.header(key, value));
			reply.send(response.body ? await response.text() : null);
		} catch (error) {
			fastify.log.error("Authentication Error:", error);
			reply.status(500).send({
				error: "Internal authentication error",
				code: "AUTH_FAILURE",
			});
		}
	},
});

fastify.register(fastifyTRPCPlugin, {
	prefix: "/trpc",
	trpcOptions: {
		router: appRouter,
		createContext,
		batching: {
			enabled: true,
		},
		onError({ path, error }) {
			logError(error, `tRPC handler on path '${path}'`);
		},
	} satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

fastify.get("/", async () => {
	return { status: "OK", timestamp: new Date().toISOString() };
});

// Health check endpoint
fastify.get("/health", async () => {
	return {
		status: "healthy",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
		memory: process.memoryUsage(),
		environment: process.env.NODE_ENV || "development",
	};
});

// Global error handler
fastify.setErrorHandler((error, request, reply) => {
	logError(error, `Fastify error on ${request.method} ${request.url}`);
	
	if (error.statusCode && error.statusCode < 500) {
		reply.status(error.statusCode).send({
			error: error.name || "Client Error",
			message: error.message,
		});
	} else {
		reply.status(500).send({
			error: "Internal Server Error",
			message: "An unexpected error occurred",
		});
	}
});

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || "0.0.0.0";

fastify.listen({ port, host }, (err) => {
	if (err) {
		logError(err, "Server startup");
		process.exit(1);
	}
	console.log(`🚀 Server running on ${host}:${port}`);
	console.log(`📊 Health check: http://${host}:${port}/health`);
	console.log(`🔧 tRPC endpoint: http://${host}:${port}/trpc`);
	console.log(`🔐 Auth endpoint: http://${host}:${port}/api/auth`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
	console.log("Received SIGTERM, shutting down gracefully...");
	await fastify.close();
	process.exit(0);
});

process.on("SIGINT", async () => {
	console.log("Received SIGINT, shutting down gracefully...");
	await fastify.close();
	process.exit(0);
});
