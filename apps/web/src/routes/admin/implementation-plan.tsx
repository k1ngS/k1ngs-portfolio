import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle,
	Circle,
	Clock,
	Edit,
	FileText,
	Lightbulb,
	Plus,
	Target,
	Trash2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import AdminLayout from "../../components/admin/admin-layout";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

export const Route = createFileRoute("/admin/implementation-plan")({
	component: AdminImplementationPlan,
});

type ImplementationCategory =
	| "COMPLETED"
	| "IN_PROGRESS"
	| "PENDING"
	| "FUTURE";
type ImplementationPriority = "HIGH" | "MEDIUM" | "LOW";

interface ImplementationItem {
	id: string;
	title: string;
	description: string;
	category: ImplementationCategory;
	priority: ImplementationPriority;
	estimatedTime?: string | null;
	dependencies: string[];
	order: number;
	createdAt: Date;
	updatedAt: Date;
}

function AdminImplementationPlan() {
	const { theme } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [selectedItem, setSelectedItem] = useState<ImplementationItem | null>(
		null,
	);
	const [formData, setFormData] = useState<Partial<ImplementationItem>>({});

	// Buscar dados do tRPC
	const { data: implementationPlanData, isLoading } =
		trpc.implementationPlan.adminList.useQuery({
			limit: 100,
		});
	const { data: statsData } = trpc.implementationPlan.stats.useQuery();

	const utils = trpc.useUtils();
	const deleteMutation = trpc.implementationPlan.delete.useMutation({
		onSuccess: () => {
			utils.implementationPlan.adminList.invalidate();
			utils.implementationPlan.stats.invalidate();
		},
	});

	const createMutation = trpc.implementationPlan.create.useMutation({
		onSuccess: () => {
			utils.implementationPlan.adminList.invalidate();
			utils.implementationPlan.stats.invalidate();
			setShowForm(false);
			setFormData({});
		},
	});

	const updateMutation = trpc.implementationPlan.update.useMutation({
		onSuccess: () => {
			utils.implementationPlan.adminList.invalidate();
			utils.implementationPlan.stats.invalidate();
			setShowForm(false);
			setSelectedItem(null);
			setFormData({});
		},
	});

	const handleDelete = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir este item?")) {
			await deleteMutation.mutateAsync({ id });
		}
	};

	const handleEdit = (item: ImplementationItem) => {
		setSelectedItem(item);
		setFormData({
			title: item.title,
			description: item.description,
			category: item.category,
			priority: item.priority,
			estimatedTime: item.estimatedTime,
			dependencies: item.dependencies,
			order: item.order,
		});
		setShowForm(true);
	};

	const handleCreate = () => {
		setSelectedItem(null);
		setFormData({
			category: "PENDING",
			priority: "MEDIUM",
			dependencies: [],
			order: 0,
		});
		setShowForm(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (selectedItem) {
				await updateMutation.mutateAsync({
					id: selectedItem.id,
					...formData,
				} as any);
			} else {
				await createMutation.mutateAsync(formData as any);
			}
		} catch (error) {
			console.error("Erro ao salvar item:", error);
		}
	};

	if (isLoading) {
		return (
			<AdminLayout>
				<div className="flex h-64 items-center justify-center">
					<div className="text-lg">Carregando...</div>
				</div>
			</AdminLayout>
		);
	}

	const implementationPlan = implementationPlanData?.items || [];

	const categories = [
		{ id: "", label: "Todas", icon: FileText, color: "text-blue-400" },
		{
			id: "COMPLETED",
			label: "Concluído",
			icon: CheckCircle,
			color: "text-green-400",
		},
		{
			id: "IN_PROGRESS",
			label: "Em Progresso",
			icon: Clock,
			color: "text-yellow-400",
		},
		{
			id: "PENDING",
			label: "Pendente",
			icon: Circle,
			color: "text-orange-400",
		},
		{ id: "FUTURE", label: "Futuro", icon: Target, color: "text-purple-400" },
	];

	const priorities = {
		HIGH: { label: "Alta", color: "text-red-400" },
		MEDIUM: { label: "Média", color: "text-yellow-400" },
		LOW: { label: "Baixa", color: "text-green-400" },
	};

	// Filtrar itens
	const filteredItems = implementationPlan.filter((item) => {
		const matchesCategory =
			!selectedCategory || item.category === selectedCategory;
		const matchesSearch =
			!searchTerm ||
			item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.description.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	// Usar estatísticas do tRPC
	const stats = statsData || {
		total: 0,
		completed: 0,
		inProgress: 0,
		pending: 0,
		future: 0,
		completionPercentage: 0,
	};

	const completionPercentage = stats.completionPercentage;

	return (
		<AdminLayout>
			<div className={`space-y-6 ${theme.primary}`}>
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1
							className={`font-bold text-2xl ${theme.primary} flex items-center gap-2`}
						>
							<Lightbulb className="h-6 w-6 text-yellow-400" />
							Plano de Implementação
						</h1>
						<p className={`${theme.secondary} mt-1`}>
							Roadmap para tornar o portfólio totalmente configurável
						</p>
					</div>
					<button
						className={
							"flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
						}
						onClick={handleCreate}
					>
						<Plus className="h-4 w-4" />
						Novo Item
					</button>
				</div>

				{/* Estatísticas */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-5">
					<div
						className={`${theme.secondary} rounded-lg border p-4 ${theme.accent}`}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className={`text-sm ${theme.secondary}`}>Total</p>
								<p className={`font-bold text-2xl ${theme.primary}`}>
									{stats.total}
								</p>
							</div>
							<FileText className="h-8 w-8 text-blue-400" />
						</div>
					</div>

					<div
						className={`${theme.secondary} rounded-lg border p-4 ${theme.accent}`}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className={`text-sm ${theme.secondary}`}>Concluído</p>
								<p className={"font-bold text-2xl text-green-400"}>
									{stats.completed}
								</p>
							</div>
							<CheckCircle className="h-8 w-8 text-green-400" />
						</div>
					</div>

					<div
						className={`${theme.secondary} rounded-lg border p-4 ${theme.accent}`}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className={`text-sm ${theme.secondary}`}>Em Progresso</p>
								<p className={"font-bold text-2xl text-yellow-400"}>
									{stats.inProgress}
								</p>
							</div>
							<Clock className="h-8 w-8 text-yellow-400" />
						</div>
					</div>

					<div
						className={`${theme.secondary} rounded-lg border p-4 ${theme.accent}`}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className={`text-sm ${theme.secondary}`}>Pendente</p>
								<p className={"font-bold text-2xl text-orange-400"}>
									{stats.pending}
								</p>
							</div>
							<Circle className="h-8 w-8 text-orange-400" />
						</div>
					</div>

					<div
						className={`${theme.secondary} rounded-lg border p-4 ${theme.accent}`}
					>
						<div className="flex items-center justify-between">
							<div>
								<p className={`text-sm ${theme.secondary}`}>Progresso</p>
								<p className={"font-bold text-2xl text-blue-400"}>
									{completionPercentage}%
								</p>
							</div>
							<Target className="h-8 w-8 text-blue-400" />
						</div>
					</div>
				</div>

				{/* Filtros */}
				<div
					className={`${theme.secondary} rounded-lg border p-4 ${theme.accent}`}
				>
					<div className="flex flex-col gap-4 md:flex-row">
						{/* Busca */}
						<div className="flex-1">
							<input
								type="text"
								placeholder="Buscar itens..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className={`w-full rounded border px-3 py-2 ${theme.accent} ${theme.bg} ${theme.primary} focus:outline-none focus:ring-2 focus:ring-blue-500`}
							/>
						</div>

						{/* Filtro por categoria */}
						<div className="flex flex-wrap gap-2">
							{categories.map((category) => {
								const Icon = category.icon;
								const isActive = selectedCategory === category.id;
								return (
									<button
										key={category.id}
										onClick={() => setSelectedCategory(category.id)}
										className={`flex items-center gap-2 rounded px-3 py-2 transition-colors ${
											isActive
												? `${theme.accent} ${theme.primary}`
												: `${theme.bg} ${theme.secondary} hover:${theme.accent}`
										}`}
									>
										<Icon className={`h-4 w-4 ${category.color}`} />
										<span>{category.label}</span>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{/* Lista de Itens */}
				<div className="space-y-4">
					{filteredItems.map((item) => {
						const categoryInfo = categories.find(
							(cat) => cat.id === item.category,
						);
						const priorityInfo = priorities[item.priority];
						const CategoryIcon = categoryInfo?.icon || Circle;

						return (
							<div
								key={item.id}
								className={`${theme.secondary} rounded-lg border p-4 ${theme.accent} hover:${theme.accent} transition-colors`}
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="mb-2 flex items-center gap-3">
											<CategoryIcon
												className={`h-5 w-5 ${categoryInfo?.color}`}
											/>
											<h3 className={`font-semibold ${theme.primary}`}>
												{item.title}
											</h3>
										</div>
										<p className={`${theme.secondary} mb-3`}>
											{item.description}
										</p>

										<div className="flex items-center gap-4 text-sm">
											<span
												className={`rounded px-2 py-1 ${theme.accent} ${categoryInfo?.color}`}
											>
												{categoryInfo?.label}
											</span>
											<span
												className={`rounded px-2 py-1 ${theme.accent} ${priorityInfo.color}`}
											>
												Prioridade: {priorityInfo.label}
											</span>
											{item.estimatedTime && (
												<span
													className={`rounded px-2 py-1 ${theme.accent} ${theme.secondary}`}
												>
													⏱️ {item.estimatedTime}
												</span>
											)}
										</div>

										{item.dependencies && item.dependencies.length > 0 && (
											<div className="mt-3">
												<p className={`text-sm ${theme.secondary} mb-1`}>
													Dependências:
												</p>
												<div className="flex flex-wrap gap-1">
													{item.dependencies.map((dep, index) => (
														<span
															key={index}
															className={`rounded px-2 py-1 text-xs ${theme.accent} ${theme.secondary}`}
														>
															{dep}
														</span>
													))}
												</div>
											</div>
										)}
									</div>

									{/* Botões de ação */}
									<div className="ml-4 flex flex-col gap-2">
										<button
											className={`rounded p-2 ${theme.accent} text-blue-400 transition-colors hover:bg-blue-600 hover:text-white`}
											title="Editar item"
											onClick={() => handleEdit(item)}
										>
											<Edit className="h-4 w-4" />
										</button>
										<button
											className={`rounded p-2 ${theme.accent} text-red-400 transition-colors hover:bg-red-600 hover:text-white`}
											title="Excluir item"
											onClick={() => handleDelete(item.id)}
										>
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{filteredItems.length === 0 && (
					<div className={`py-8 text-center ${theme.secondary}`}>
						<FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
						<p>Nenhum item encontrado com os filtros aplicados.</p>
					</div>
				)}

				{/* Form Modal */}
				{showForm && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div
							className={`${theme.secondary} max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border p-6 ${theme.accent}`}
						>
							<h2 className={`font-bold text-xl ${theme.primary} mb-4`}>
								{selectedItem ? "Editar Item" : "Novo Item"}
							</h2>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label
										className={`block font-medium text-sm ${theme.primary} mb-1`}
									>
										Título *
									</label>
									<input
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
										className={`block font-medium text-sm ${theme.primary} mb-1`}
									>
										Descrição *
									</label>
									<textarea
										value={formData.description || ""}
										onChange={(e) =>
											setFormData({ ...formData, description: e.target.value })
										}
										rows={3}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										required
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label
											className={`block font-medium text-sm ${theme.primary} mb-1`}
										>
											Categoria *
										</label>
										<select
											value={formData.category || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													category: e.target.value as ImplementationCategory,
												})
											}
											className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
											required
										>
											<option value="">Selecione...</option>
											<option value="COMPLETED">Concluído</option>
											<option value="IN_PROGRESS">Em Progresso</option>
											<option value="PENDING">Pendente</option>
											<option value="FUTURE">Futuro</option>
										</select>
									</div>

									<div>
										<label
											className={`block font-medium text-sm ${theme.primary} mb-1`}
										>
											Prioridade *
										</label>
										<select
											value={formData.priority || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													priority: e.target.value as ImplementationPriority,
												})
											}
											className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
											required
										>
											<option value="">Selecione...</option>
											<option value="HIGH">Alta</option>
											<option value="MEDIUM">Média</option>
											<option value="LOW">Baixa</option>
										</select>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label
											className={`block font-medium text-sm ${theme.primary} mb-1`}
										>
											Tempo Estimado
										</label>
										<input
											type="text"
											value={formData.estimatedTime || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													estimatedTime: e.target.value,
												})
											}
											className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
											placeholder="Ex: 2-3 dias"
										/>
									</div>

									<div>
										<label
											className={`block font-medium text-sm ${theme.primary} mb-1`}
										>
											Ordem
										</label>
										<input
											type="number"
											value={formData.order || 0}
											onChange={(e) =>
												setFormData({
													...formData,
													order: Number.parseInt(e.target.value) || 0,
												})
											}
											className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
											min="0"
										/>
									</div>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.primary} mb-1`}
									>
										Dependências
									</label>
									<textarea
										value={formData.dependencies?.join(", ") || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												dependencies: e.target.value
													.split(",")
													.map((dep) => dep.trim())
													.filter((dep) => dep.length > 0),
											})
										}
										rows={2}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										placeholder="Separe as dependências por vírgula"
									/>
								</div>

								<div className="flex justify-end gap-3 pt-4">
									<button
										type="button"
										onClick={() => {
											setShowForm(false);
											setSelectedItem(null);
											setFormData({});
										}}
										className={`px-4 py-2 ${theme.secondary} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10`}
									>
										Cancelar
									</button>
									<button
										type="submit"
										disabled={
											createMutation.isPending || updateMutation.isPending
										}
										className={`px-4 py-2 ${theme.accent} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10 disabled:opacity-50`}
									>
										{createMutation.isPending || updateMutation.isPending
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
}
