import axios, { type AxiosError, type AxiosResponse } from "axios";
import type {
	About,
	ApiErrorData,
	ApiResponse,
	ContactFormData,
	Project,
	ProjectParams,
	Setting,
	Skill,
	SuccessResponse,
} from "@/types";

// Configuração base da API
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:3002/api";

// Instância do axios com configurações padrão
const api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		console.error("API Error:", error);

		if (error.response) {
			// Erro com resposta do servidor
			const { status, data } = error.response;
			const errorData = data as ApiErrorData;
			throw new Error(errorData.message || `Erro ${status}: ${error.message}`);
		}
		if (error.request) {
			// Erro de rede
			throw new Error("Erro de conexão. Verifique sua internet.");
		}
		// Outros erros
		throw new Error("Erro inesperado. Tente novamente.");
	},
);

// Serviços da API
export const apiService = {
	// Informações "Sobre"
	about: {
		getAll: (): Promise<ApiResponse<About[]>> => api.get("/about"),
		getStats: (): Promise<ApiResponse<Record<string, number>>> =>
			api.get("/about/stats"),
	},

	// Habilidades
	skills: {
		getAll: (): Promise<ApiResponse<Skill[]>> => api.get("/skills"),
		getStats: (): Promise<ApiResponse<Record<string, number>>> =>
			api.get("/skills/stats"),
		getByCategory: (category: string): Promise<ApiResponse<Skill[]>> =>
			api.get(`/skills/category/${category}`),
	},

	// Projetos
	projects: {
		getAll: (params: ProjectParams = {}): Promise<ApiResponse<Project[]>> => {
			const queryParams = new URLSearchParams();

			if (params.category) queryParams.append("category", params.category);
			if (params.technology)
				queryParams.append("technology", params.technology);
			if (params.featured !== undefined)
				queryParams.append("featured", params.featured.toString());
			if (params.limit) queryParams.append("limit", params.limit.toString());
			if (params.offset) queryParams.append("offset", params.offset.toString());

			const queryString = queryParams.toString();
			return api.get(`/projects${queryString ? `?${queryString}` : ""}`);
		},
		getById: (id: string): Promise<ApiResponse<Project>> =>
			api.get(`/projects/${id}`),
		getStats: (): Promise<ApiResponse<Record<string, number>>> =>
			api.get("/projects/stats"),
		getFeatured: (): Promise<ApiResponse<Project[]>> =>
			api.get("/projects?featured=true&limit=6"),
	},

	// Contato
	contact: {
		send: (data: ContactFormData): Promise<ApiResponse<SuccessResponse>> =>
			api.post("/contact", data),
	},

	// Configurações
	settings: {
		getPublic: (formatted = true): Promise<ApiResponse<Setting[]>> =>
			api.get(`/settings/public?formatted=${formatted}`),
		getByKey: (key: string): Promise<ApiResponse<Setting>> =>
			api.get(`/settings/public/${key}`),
	},

	// Health check
	health: (): Promise<ApiResponse<SuccessResponse>> => api.get("/health"),
};

// Funções utilitárias
export const formatApiError = (error: unknown): string => {
	if (axios.isAxiosError(error) && error.response) {
		const errorData = error.response.data as ApiErrorData;
		return errorData.message || error.message;
	}
	if (error instanceof Error) {
		return error.message;
	}
	return "Erro desconhecido";
};

export const isApiError = (error: unknown): boolean => {
	return axios.isAxiosError(error) && error.response !== undefined;
};

export default api;
