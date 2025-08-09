import { useRouteContext } from "@tanstack/react-router";
import {
	Code,
	Database,
	Edit,
	Globe,
	Plus,
	Server,
	Star,
	Trash2,
	Wrench,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import AdminLayout from "../../components/admin/admin-layout";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

interface Technology {
	id: string;
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
	order?: number;
	createdAt: string;
	updatedAt: string;
}

const AdminTechnologies: React.FC = () => {
	const { theme } = useTheme();
	const [selectedTechnology, setSelectedTechnology] =
		useState<Technology | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<Partial<Technology>>({});

	// Real tRPC data fetching
	useRouteContext({ from: "__root__" });

	const {
		data: technologiesData,
		isLoading,
		refetch,
	} = trpc.technologies.adminList.useQuery({
		limit: 50,
		offset: 0,
	});

	const technologies = technologiesData?.technologies || [];

	const createTechnologyMutation = trpc.technologies.create.useMutation({
		onSuccess: () => {
			refetch();
			setShowForm(false);
			setFormData({});
			setSelectedTechnology(null);
		},
		onError: (error) => {
			console.error("Error creating technology:", error);
		},
	});

	const updateTechnologyMutation = trpc.technologies.update.useMutation({
		onSuccess: () => {
			refetch();
			setShowForm(false);
			setFormData({});
			setSelectedTechnology(null);
		},
		onError: (error) => {
			console.error("Error updating technology:", error);
		},
	});

	const deleteTechnologyMutation = trpc.technologies.delete.useMutation({
		onSuccess: () => {
			refetch();
		},
		onError: (error) => {
			console.error("Error deleting technology:", error);
		},
	});

	const handleEdit = (technology: Technology) => {
		setSelectedTechnology(technology);
		setFormData(technology);
		setShowForm(true);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir esta tecnologia?")) {
			try {
				await deleteTechnologyMutation.mutateAsync({ id });
			} catch (error) {
				console.error("Error deleting technology:", error);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (selectedTechnology) {
				await updateTechnologyMutation.mutateAsync({
					id: selectedTechnology.id,
					...formData,
				});
			} else {
				await createTechnologyMutation.mutateAsync(formData as any);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case "FRONTEND":
				return <Code size={16} />;
			case "BACKEND":
				return <Server size={16} />;
			case "DATABASE":
				return <Database size={16} />;
			case "DEVOPS":
				return <Wrench size={16} />;
			case "MOBILE":
				return <Star size={16} />;
			case "AI":
				return <Star size={16} />;
			case "DESIGN":
				return <Star size={16} />;
			default:
				return <Star size={16} />;
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "FRONTEND":
				return theme.secondary;
			case "BACKEND":
				return theme.accent;
			case "DATABASE":
				return theme.cyan;
			case "DEVOPS":
				return theme.error;
			case "MOBILE":
				return theme.primary;
			case "AI":
				return theme.primary;
			case "DESIGN":
				return theme.primary;
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
					<div className="animate-pulse">Carregando tecnologias...</div>
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
							Gerenciar Tecnologias
						</h1>
						<p className={theme.secondary}>
							Total: {technologies?.length || 0} tecnologias
						</p>
					</div>
					<button
						onClick={() => {
							setSelectedTechnology(null);
							setFormData({});
							setShowForm(true);
						}}
						className={`flex items-center gap-2 px-4 py-2 ${theme.secondary} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10`}
					>
						<Plus size={16} />
						Nova Tecnologia
					</button>
				</div>

				{/* Technologies Grid */}
				<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{technologies?.map((technology: any) => (
						<div
							key={technology.id}
							className={
								"rounded-lg border border-current border-opacity-20 p-4 transition-colors hover:border-opacity-40"
							}
						>
							<div className="mb-3 flex items-start justify-between">
								<div className="flex items-center gap-2">
									<div className={getCategoryColor(technology.category)}>
										{getCategoryIcon(technology.category)}
									</div>
									<h3 className={`font-semibold ${theme.primary}`}>
										{technology.name}
									</h3>
								</div>
								<div className="flex gap-2">
									<button
										type="button"
										onClick={() => handleEdit(technology)}
										className={`${theme.secondary} hover:${theme.accent} transition-colors`}
									>
										<Edit size={14} />
									</button>
									<button
										type="button"
										onClick={() => handleDelete(technology.id)}
										className={`${theme.error} transition-opacity hover:opacity-80`}
									>
										<Trash2 size={14} />
									</button>
								</div>
							</div>

							{technology.description && (
								<p className={`${theme.secondary} mb-3 line-clamp-2 text-sm`}>
									{technology.description}
								</p>
							)}

							<div className="mb-2 flex items-center justify-between">
								<span
									className={`rounded px-2 py-1 text-xs ${getCategoryColor(technology.category)}`}
								>
									{technology.category}
								</span>
								{technology.featured && (
									<Star
										size={12}
										className={theme.accent}
										fill="currentColor"
									/>
								)}
							</div>

							{technology.websiteUrl && (
								<a
									href={technology.websiteUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={`${theme.secondary} hover:${theme.accent} flex items-center gap-1 text-sm transition-colors`}
								>
									<Globe size={12} />
									Website
								</a>
							)}
						</div>
					))}
				</div>

				{/* Empty State */}
				{technologies?.length === 0 && (
					<div className={`py-12 text-center ${theme.secondary}`}>
						<Wrench size={48} className="mx-auto mb-4 opacity-50" />
						<p className="mb-2 text-lg">Nenhuma tecnologia cadastrada</p>
						<p className="text-sm">Clique em "Nova Tecnologia" para começar</p>
					</div>
				)}

				{/* Form Modal */}
				{showForm && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div
							className={`${theme.bg} max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-current border-opacity-20 p-6`}
						>
							<h2 className={`font-bold text-xl ${theme.primary} mb-4`}>
								{selectedTechnology ? "Editar Tecnologia" : "Nova Tecnologia"}
							</h2>

							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Nome *
									</label>
									<input
										type="text"
										value={formData.name || ""}
										onChange={(e) =>
											setFormData({ ...formData, name: e.target.value })
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										required
									/>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Ícone *
									</label>
									<input
										type="text"
										value={formData.icon || ""}
										onChange={(e) =>
											setFormData({ ...formData, icon: e.target.value })
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										placeholder="Nome ou classe do ícone"
										required
									/>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Categoria *
									</label>
									<select
										value={formData.category || "OTHER"}
										onChange={(e) =>
											setFormData({
												...formData,
												category: e.target.value as any,
											})
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										required
									>
										<option value="FRONTEND">Frontend</option>
										<option value="BACKEND">Backend</option>
										<option value="DATABASE">Database</option>
										<option value="DEVOPS">DevOps</option>
										<option value="MOBILE">Mobile</option>
										<option value="AI">Inteligência Artificial</option>
										<option value="DESIGN">Design</option>
										<option value="OTHER">Outros</option>
									</select>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Cor *
									</label>
									<input
										type="text"
										value={formData.color || ""}
										onChange={(e) =>
											setFormData({ ...formData, color: e.target.value })
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										placeholder="#FF0000 ou nome da cor"
										required
									/>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Ordem
									</label>
									<input
										type="number"
										value={formData.order || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												order: Number.parseInt(e.target.value) || undefined,
											})
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										placeholder="Ordem de exibição"
									/>
								</div>

								<div className="flex justify-end gap-3 pt-4">
									<button
										type="button"
										onClick={() => {
											setShowForm(false);
											setSelectedTechnology(null);
											setFormData({});
										}}
										className={`px-4 py-2 ${theme.secondary} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10`}
									>
										Cancelar
									</button>
									<button
										type="submit"
										disabled={
											createTechnologyMutation.isPending ||
											updateTechnologyMutation.isPending
										}
										className={`px-4 py-2 ${theme.accent} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10 disabled:opacity-50`}
									>
										{createTechnologyMutation.isPending ||
										updateTechnologyMutation.isPending
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

export default AdminTechnologies;
