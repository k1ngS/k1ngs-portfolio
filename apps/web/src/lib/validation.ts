import { z } from "zod";

// Contact form validation
export const contactFormSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters and spaces"),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address")
		.max(100, "Email must be less than 100 characters"),
	subject: z
		.string()
		.min(5, "Subject must be at least 5 characters")
		.max(100, "Subject must be less than 100 characters")
		.optional(),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(1000, "Message must be less than 1000 characters"),
});

// Auth validation schemas
export const signInSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters"),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(100, "Password must be less than 100 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
		),
	confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

// Project/skill search validation
export const searchSchema = z.object({
	query: z
		.string()
		.max(100, "Search query must be less than 100 characters")
		.optional(),
	category: z.string().optional(),
	limit: z
		.number()
		.min(1, "Limit must be at least 1")
		.max(100, "Limit must be at most 100")
		.optional(),
	offset: z
		.number()
		.min(0, "Offset must be non-negative")
		.optional(),
});

// Portfolio data validation
export const projectFilterSchema = z.object({
	language: z.string().optional(),
	category: z.enum(["WEB", "MOBILE", "API", "DESKTOP", "AI", "GAME", "OTHER"]).optional(),
	featured: z.boolean().optional(),
	limit: z.number().min(1).max(100).default(10),
	offset: z.number().min(0).default(0),
});

export const skillFilterSchema = z.object({
	language: z.string().optional(),
	category: z.enum([
		"FRONTEND",
		"BACKEND", 
		"DATABASE",
		"DEVOPS",
		"MOBILE",
		"AI",
		"DESIGN",
		"SOFT_SKILLS",
		"OTHER",
	]).optional(),
	limit: z.number().min(1).max(100).default(50),
	offset: z.number().min(0).default(0),
});

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type SearchData = z.infer<typeof searchSchema>;
export type ProjectFilterData = z.infer<typeof projectFilterSchema>;
export type SkillFilterData = z.infer<typeof skillFilterSchema>;

// Validation utility functions
export function sanitizeString(str: string): string {
	return str.trim().replace(/\s+/g, " ");
}

export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export function validatePassword(password: string): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];
	
	if (password.length < 8) {
		errors.push("Password must be at least 8 characters long");
	}
	
	if (!/[a-z]/.test(password)) {
		errors.push("Password must contain at least one lowercase letter");
	}
	
	if (!/[A-Z]/.test(password)) {
		errors.push("Password must contain at least one uppercase letter");
	}
	
	if (!/\d/.test(password)) {
		errors.push("Password must contain at least one number");
	}
	
	if (!/[@$!%*?&]/.test(password)) {
		errors.push("Password must contain at least one special character");
	}
	
	return {
		isValid: errors.length === 0,
		errors,
	};
}

// Form validation hook
export function useFormValidation<T>(schema: z.ZodSchema<T>) {
	return {
		validate: (data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } => {
			const result = schema.safeParse(data);
			if (result.success) {
				return { success: true, data: result.data };
			}
			return { success: false, errors: result.error };
		},
		getFieldErrors: (errors: z.ZodError, field: string): string[] => {
			return errors.errors
				.filter(error => error.path.includes(field))
				.map(error => error.message);
		},
	};
}