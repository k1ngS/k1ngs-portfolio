/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

interface EnvConfig {
	// Server URLs
	serverUrl: string;
	apiUrl: string;
	authUrl: string;
	
	// App configuration
	nodeEnv: string;
	appName: string;
	appDescription: string;
	
	// Contact information
	contactEmail: string;
	contactLinkedin: string;
	contactGithub: string;
	contactWebsite: string;
	
	// Feature flags
	enableDevtools: boolean;
	enableDebug: boolean;
	
	// Analytics
	googleAnalyticsId?: string;
	hotjarId?: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
	const value = import.meta.env[key] || defaultValue;
	if (!value) {
		console.warn(`Environment variable ${key} is not set`);
		return "";
	}
	return value;
}

function getEnvBoolean(key: string, defaultValue: boolean = false): boolean {
	const value = import.meta.env[key];
	if (value === undefined) return defaultValue;
	return value === "true" || value === "1";
}

export const env: EnvConfig = {
	// Server URLs
	serverUrl: getEnvVar("VITE_SERVER_URL", "http://localhost:3000"),
	apiUrl: getEnvVar("VITE_API_URL", "http://localhost:3000/trpc"),
	authUrl: getEnvVar("VITE_AUTH_URL", "http://localhost:3000/api/auth"),
	
	// App configuration
	nodeEnv: getEnvVar("VITE_NODE_ENV", "development"),
	appName: getEnvVar("VITE_APP_NAME", "k1ngS Portfolio"),
	appDescription: getEnvVar("VITE_APP_DESCRIPTION", "Interactive portfolio showcasing modern web development skills"),
	
	// Contact information
	contactEmail: getEnvVar("VITE_CONTACT_EMAIL", "your.email@example.com"),
	contactLinkedin: getEnvVar("VITE_CONTACT_LINKEDIN", "https://linkedin.com/in/yourprofile"),
	contactGithub: getEnvVar("VITE_CONTACT_GITHUB", "https://github.com/yourusername"),
	contactWebsite: getEnvVar("VITE_CONTACT_WEBSITE", "https://yourwebsite.com"),
	
	// Feature flags
	enableDevtools: getEnvBoolean("VITE_ENABLE_DEVTOOLS", true),
	enableDebug: getEnvBoolean("VITE_ENABLE_DEBUG", false),
	
	// Analytics (optional)
	googleAnalyticsId: getEnvVar("VITE_GOOGLE_ANALYTICS_ID"),
	hotjarId: getEnvVar("VITE_HOTJAR_ID"),
};

// Validation
if (env.nodeEnv === "production") {
	const requiredVars = [
		"VITE_SERVER_URL",
		"VITE_API_URL",
		"VITE_AUTH_URL",
	];
	
	const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
	
	if (missingVars.length > 0) {
		console.error("Missing required environment variables:", missingVars);
	}
}

// Development helpers
export const isDevelopment = env.nodeEnv === "development";
export const isProduction = env.nodeEnv === "production";
export const isTest = env.nodeEnv === "test";

// API helpers
export const apiEndpoints = {
	base: env.serverUrl,
	trpc: env.apiUrl,
	auth: env.authUrl,
	health: `${env.serverUrl}/health`,
};

// Contact information for easy access
export const contactInfo = {
	email: env.contactEmail,
	linkedin: env.contactLinkedin,
	github: env.contactGithub,
	website: env.contactWebsite,
};

// Debug logging
if (env.enableDebug && isDevelopment) {
	console.log("Environment configuration:", env);
}

export default env;