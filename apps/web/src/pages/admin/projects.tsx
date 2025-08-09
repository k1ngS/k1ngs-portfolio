import { useRouteContext } from "@tanstack/react-router";
import {
	Calendar,
	Edit,
	ExternalLink,
	Github,
	Plus,
	Tag,
	Trash2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import AdminLayout from "../../components/admin/admin-layout";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

interface Technology {
	id: string;
	name: string;
	category: string | null;
	order: number;
	icon: string | null;
	color: string | null;
}

interface ProjectTag {
	id: string;
	name: string;
	color?: string | null;
}

interface Project {
	id: string;
	title: string;
	description: string;
	longDescription?: string | null;
	content?: string | null;
	category: "WEB" | "MOBILE" | "API" | "DESKTOP" | "AI" | "GAME" | "OTHER";
	status?: "ACTIVE" | "ARCHIVED" | "DRAFT" | null;
	featured: boolean;
	githubUrl?: string | null;
	liveUrl?: string | null;
	imageUrl?: string | null;
	technologies: Technology[];
	tags: ProjectTag[];
	translations?: string[];
	createdAt: string;
	updatedAt: string;
}

const AdminProjects: React.FC = () => {
	const { theme } = useTheme();
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<Partial<Project>>({});

	useRouteContext({ from: "__root__" });

	// Fetch projects from database using tRPC
	const {
		data: projectsData,
		isLoading,
		refetch,
	} = trpc.projects.adminList.useQuery({ limit: 50, offset: 0 });

	const projects = projectsData?.projects || [];

	// Mutations for CRUD operations using tRPC
	const createProjectMutation = trpc.projects.create.useMutation({
		onSuccess: () => {
			refetch();
			setShowForm(false);
			setFormData({});
			setSelectedProject(null);
		},
	});

	const updateProjectMutation = trpc.projects.update.useMutation({
		onSuccess: () => {
			refetch();
			setShowForm(false);
			setSelectedProject(null);
			setFormData({});
		},
	});

	const deleteProjectMutation = trpc.projects.delete.useMutation({
		onSuccess: () => {
			refetch();
		},
	});

	const handleEdit = (project: Project) => {
		setSelectedProject(project);
		setFormData(project);
		setShowForm(true);
	};

	const handleDelete = async (project: Project) => {
		if (window.confirm("Tem certeza que deseja deletar este projeto?")) {
			try {
				await deleteProjectMutation.mutateAsync({ id: project.id });
			} catch (error) {
				console.error("Error deleting project:", error);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (selectedProject) {
				const updateData = {
					id: selectedProject.id,
					...formData,
					content: formData.content ?? undefined,
					category: formData.category as
						| "WEB"
						| "MOBILE"
						| "API"
						| "DESKTOP"
						| "OTHER"
						| undefined,
					githubUrl: formData.githubUrl ?? undefined,
					liveUrl: formData.liveUrl ?? undefined,
					imageUrl: formData.imageUrl ?? undefined,
					longDescription: formData.longDescription ?? undefined,
					// Only include translations if they are objects with the required shape
					translations:
						Array.isArray(formData.translations) &&
						formData.translations.length > 0 &&
						typeof formData.translations[0] === "object"
							? (formData.translations as unknown as {
									language: string;
									title: string;
									description: string;
									content: string;
								}[])
							: undefined,
					technologies: Array.isArray(formData.technologies)
						? formData.technologies.map((tech: Technology) => tech.id)
						: [],
					tags: Array.isArray(formData.tags)
						? formData.tags.map((tag: ProjectTag) => tag.id)
						: [],
				};
				await updateProjectMutation.mutateAsync(updateData);
			} else {
				await createProjectMutation.mutateAsync({
					title: formData.title || "",
					description: formData.description || "",
					content: formData.content || "",
					category:
						(formData.category as
							| "WEB"
							| "MOBILE"
							| "API"
							| "DESKTOP"
							| "OTHER") || "OTHER",
					featured: formData.featured || false,
					githubUrl: formData.githubUrl ?? undefined,
					imageUrl: formData.imageUrl ?? undefined,
					technologies: formData.technologies || [],
					tags: (formData.tags as ProjectTag[]) || [],
				});
			}
		} catch (error) {
			console.error("Error saving project:", error);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "published":
				return theme.secondary;
			case "draft":
				return theme.accent;
			case "archived":
				return theme.error;
			default:
				return theme.primary;
		}
	};

	if (isLoading) {
		return (
			<AdminLayout>
				<div
					className={`flex h-64 items-center justify-center ${theme.primary}`}
				>
					<div className="animate-pulse">Carregando projetos...</div>
				</div>
			</AdminLayout>
		);
	}

	return (
		<AdminLayout>
			<div className={`p-6 ${theme.primary}`}>
				{/* Header */}
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h1 className={`font-bold text-2xl ${theme.primary} mb-2`}>
							Gerenciar Projetos
						</h1>
						<p className={theme.secondary}>
							Total: {projects?.length || 0} projetos
						</p>
					</div>
					<button
						type="button"
						onClick={() => {
							setSelectedProject(null);
							setFormData({});
							setShowForm(true);
						}}
						className={`flex items-center gap-2 px-4 py-2 ${theme.secondary} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10`}
					>
						<Plus size={16} />
						Novo Projeto
					</button>
				</div>

				{/* Projects Grid */}
				<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{projects?.map((project: Project) => (
						<div
							key={project.id}
							className={
								"rounded-lg border border-current border-opacity-20 p-4 transition-colors hover:border-opacity-40"
							}
						>
							<div className="mb-3 flex items-start justify-between">
								<h3 className={`font-semibold ${theme.primary} text-lg`}>
									{project.title}
								</h3>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => handleEdit(project)}
										className={`${theme.secondary} hover:${theme.accent} transition-colors`}
									>
										<Edit size={16} />
									</button>
									<button
										type="button"
										onClick={() => handleDelete(project)}
										className={`${theme.error} transition-opacity hover:opacity-80`}
									>
										<Trash2 size={16} />
									</button>
								</div>
							</div>

							<p className={`${theme.secondary} mb-3 line-clamp-2 text-sm`}>
								{project.description}
							</p>

							<div className="mb-3 flex items-center gap-2">
								<Tag size={14} className={theme.accent} />
								<span
									className={`rounded px-2 py-1 text-xs ${getStatusColor(project.status ?? "")}`}
								>
									{project.status}
								</span>
								{project.featured && (
									<span className={`rounded px-2 py-1 text-xs ${theme.accent}`}>
										Destaque
									</span>
								)}
							</div>

							<div className="flex items-center gap-3 text-sm">
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={`${theme.secondary} hover:${theme.accent} flex items-center gap-1 transition-colors`}
									>
										<Github size={14} />
										GitHub
									</a>
								)}
								{project.liveUrl && (
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={`${theme.secondary} hover:${theme.accent} flex items-center gap-1 transition-colors`}
									>
										<ExternalLink size={14} />
										Live
									</a>
								)}
							</div>

							<div
								className={`mt-3 flex items-center gap-1 text-xs ${theme.secondary}`}
							>
								<Calendar size={12} />
								{new Date(project.createdAt).toLocaleDateString("pt-BR")}
							</div>
						</div>
					))}
				</div>

				{/* Form Modal */}
				{showForm && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div
							className={`${theme.bg} max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-current border-opacity-20 p-6`}
						>
							<h2 className={`font-bold text-xl ${theme.primary} mb-4`}>
								{selectedProject ? "Editar Projeto" : "Novo Projeto"}
							</h2>

							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label
										htmlFor="project-title"
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Título *
									</label>
									<input
										id="project-title"
										type="text"
										value={formData.title || ""}
										onChange={(e) =>
											setFormData({ ...formData, title: e.target.value })
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										required
									/>
								</div>

								<div>
									<label
										htmlFor="project-description"
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Descrição *
									</label>
									<textarea
										id="project-description"
										value={formData.description || ""}
										onChange={(e) =>
											setFormData({ ...formData, description: e.target.value })
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										rows={3}
										required
									/>
								</div>

								<div>
									<label
										htmlFor="project-content"
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Conteúdo *
									</label>
									<textarea
										id="project-content"
										value={formData.content || ""}
										onChange={(e) =>
											setFormData({ ...formData, content: e.target.value })
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										rows={5}
										required
									/>
								</div>

								<div>
									<label
										htmlFor="project-long-description"
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Descrição Longa
									</label>
									<textarea
										id="project-long-description"
										value={formData.longDescription || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												longDescription: e.target.value,
											})
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										rows={5}
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="project-github-url"
											className={`block font-medium text-sm ${theme.secondary} mb-1`}
										>
											URL do GitHub
										</label>
										<input
											id="project-github-url"
											type="url"
											value={formData.githubUrl || ""}
											onChange={(e) =>
												setFormData({ ...formData, githubUrl: e.target.value })
											}
											className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										/>
									</div>

									<div>
										<label
											htmlFor="project-live-url"
											className={`block font-medium text-sm ${theme.secondary} mb-1`}
										>
											URL Live
										</label>
										<input
											id="project-live-url"
											type="url"
											value={formData.liveUrl || ""}
											onChange={(e) =>
												setFormData({ ...formData, liveUrl: e.target.value })
											}
											className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="project-status"
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Status
									</label>
									<select
										id="project-status"
										value={formData.status || "draft"}
										onChange={(e) =>
											setFormData({
												...formData,
												status:
													e.target.value === "draft"
														? "DRAFT"
														: e.target.value === "published"
															? "ACTIVE"
															: e.target.value === "archived"
																? "ARCHIVED"
																: undefined,
											})
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
									>
										<option value="draft">Rascunho</option>
										<option value="published">Publicado</option>
										<option value="archived">Arquivado</option>
									</select>
								</div>

								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										id="featured"
										checked={formData.featured || false}
										onChange={(e) =>
											setFormData({ ...formData, featured: e.target.checked })
										}
										className="rounded"
									/>
									<label
										htmlFor="featured"
										className={`text-sm ${theme.secondary}`}
									>
										Projeto em destaque
									</label>
								</div>

								<div className="flex justify-end gap-3 pt-4">
									<button
										type="button"
										onClick={() => {
											setShowForm(false);
											setSelectedProject(null);
											setFormData({});
										}}
										className={`px-4 py-2 ${theme.secondary} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10`}
									>
										Cancelar
									</button>
									<button
										type="submit"
										disabled={
											createProjectMutation.isPending ||
											updateProjectMutation.isPending
										}
										className={`px-4 py-2 ${theme.accent} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10 disabled:opacity-50`}
									>
										{createProjectMutation.isPending ||
										updateProjectMutation.isPending
											? "Salvando..."
											: "Salvar"}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
};

export default AdminProjects;
