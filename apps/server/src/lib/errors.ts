import { TRPCError } from "@trpc/server";
import { ZodError } from "zod";

export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;
	public readonly code?: string;

	constructor(
		message: string,
		statusCode: number = 500,
		isOperational: boolean = true,
		code?: string,
	) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.code = code;

		Error.captureStackTrace(this, this.constructor);
	}
}

export function handleError(error: unknown): TRPCError {
	console.error("Error occurred:", error);

	// Handle Zod validation errors
	if (error instanceof ZodError) {
		const message = error.errors
			.map((err) => `${err.path.join(".")}: ${err.message}`)
			.join(", ");
		return new TRPCError({
			code: "BAD_REQUEST",
			message: `Validation error: ${message}`,
		});
	}

	// Handle custom app errors
	if (error instanceof AppError) {
		const trpcCode = mapHttpToTrpcCode(error.statusCode);
		return new TRPCError({
			code: trpcCode,
			message: error.message,
		});
	}

	// Handle Prisma errors
	if (error && typeof error === "object" && "code" in error) {
		const prismaError = error as { code: string; message: string };
		switch (prismaError.code) {
			case "P2002":
				return new TRPCError({
					code: "CONFLICT",
					message: "A record with this data already exists",
				});
			case "P2025":
				return new TRPCError({
					code: "NOT_FOUND",
					message: "Record not found",
				});
			default:
				return new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Database error occurred",
				});
		}
	}

	// Handle known Error instances
	if (error instanceof Error) {
		return new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: error.message,
		});
	}

	// Handle unknown errors
	return new TRPCError({
		code: "INTERNAL_SERVER_ERROR",
		message: "An unexpected error occurred",
	});
}

function mapHttpToTrpcCode(statusCode: number): TRPCError["code"] {
	switch (statusCode) {
		case 400:
			return "BAD_REQUEST";
		case 401:
			return "UNAUTHORIZED";
		case 403:
			return "FORBIDDEN";
		case 404:
			return "NOT_FOUND";
		case 409:
			return "CONFLICT";
		case 429:
			return "TOO_MANY_REQUESTS";
		case 500:
		default:
			return "INTERNAL_SERVER_ERROR";
	}
}

// Error logging utility
export function logError(error: unknown, context?: string) {
	const timestamp = new Date().toISOString();
	const contextInfo = context ? ` [${context}]` : "";
	
	console.error(`${timestamp}${contextInfo} Error:`, error);
	
	// In production, you would send this to a logging service
	// like Sentry, LogRocket, etc.
	if (process.env.NODE_ENV === "production") {
		// Send to monitoring service
		// e.g., Sentry.captureException(error, { context });
	}
}

// Validation helpers
export function validateRequiredEnvVars(vars: string[]) {
	const missing = vars.filter((varName) => !process.env[varName]);
	
	if (missing.length > 0) {
		throw new AppError(
			`Missing required environment variables: ${missing.join(", ")}`,
			500,
			false,
			"ENV_VARS_MISSING",
		);
	}
}

// Rate limiting error
export function createRateLimitError() {
	return new AppError(
		"Too many requests, please try again later",
		429,
		true,
		"RATE_LIMIT_EXCEEDED",
	);
}

// Async error wrapper for better error handling
export function asyncHandler<T extends (...args: any[]) => Promise<any>>(
	fn: T,
): T {
	return ((...args: Parameters<T>) => {
		const result = fn(...args);
		return Promise.resolve(result).catch((error) => {
			logError(error, fn.name);
			throw handleError(error);
		});
	}) as T;
}