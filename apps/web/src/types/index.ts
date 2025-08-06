export interface About {
	id: string;
	title: string;
	description: string;
}

export interface Project {
	title: string;
	description: string;
	content: string;
	category: "WEB" | "MOBILE" | "API" | "DESKTOP" | "OTHER";
	featured: boolean;
	githubUrl?: string;
	demoUrl?: string;
	imageUrl?: string;
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
}

export interface Skill {
	name: string;
	level: number;
	category:
		| "FRONTEND"
		| "BACKEND"
		| "DATABASE"
		| "DEVOPS"
		| "MOBILE"
		| "SOFT_SKILLS"
		| "OTHER";
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
	category:
		| "FRONTEND"
		| "BACKEND"
		| "DATABASE"
		| "DEVOPS"
		| "MOBILE"
		| "AI"
		| "DESIGN"
		| "OTHER";
}

export interface Content {
	key: string;
	type: "TEXT" | "HTML" | "MARKDOWN";
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
