import type { LucideIcon } from "lucide-react";

export interface About {
	id: string;
	title: string;
	description: string;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	longDescription?: string;
	content?: string | null;
	category: Category | null;
	status?: ProjectStatus | null;
	featured: boolean;
	githubUrl?: string | null;
	demoUrl?: string | null;
	imageUrl?: string | null;
	technologies: string[];
	tags: string[];
	translations: {
		[key: string]: {
			language: string;
			title: string;
			description: string;
			content: string;
		};
	};
	createdAt: string;
	updatedAt: string;
}

export interface Skill {
	name: string;
	level: number;
	category: Category | null;
	yearsOfExp: number;
	technologyId?: string;
	translations: {
		[key: string]: {
			language: string;
			name: string;
			description: string;
		};
	};
}

export interface Technology {
	name: string;
	icon: string;
	color: string;
	category: Category | null;
	order: number;
}

export interface Content {
	key: string;
	type: ContentType | null;
	category: string;
	translations: {
		[key: string]: {
			language: string;
			value: string;
		};
	};
}

export interface Setting {
	key: string;
	value: string | number | boolean;
}

export interface ContactFormData {
	name: string;
	email: string;
	message: string;
}

export interface ContactForm {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface SocialLink {
	name: string;
	url: string;
	icon: LucideIcon;
	username: string;
	description: string;
	color: string;
}

export interface SuccessResponse {
	message: string;
}

// Tipo para a estrutura do erro da API
export interface ApiErrorData {
	message: string;
}

// Tipo genérico para a resposta da API
export interface ApiResponse<T> {
	data: T;
}

// Parâmetros de busca para Projetos
export interface ProjectParams {
	category?: string;
	technology?: string;
	featured?: boolean;
	limit?: number;
	offset?: number;
}

export type Category =
	| "FRONTEND"
	| "BACKEND"
	| "DATABASE"
	| "DEVOPS"
	| "MOBILE"
	| "SOFT_SKILLS"
	| "OTHER";

export type Language = "en" | "pt" | "es" | "fr" | "de";

export type ProjectCategory =
	| "WEB"
	| "MOBILE"
	| "API"
	| "DESKTOP"
	| "AI"
	| "GAME"
	| "OTHER";

export type ProjectStatus = "ACTIVE" | "ARCHIVED" | "DRAFT";

export type ContentType = "TEXT" | "HTML" | "MARKDOWN";
