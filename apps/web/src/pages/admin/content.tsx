import { useRouteContext } from "@tanstack/react-router";
import { Edit, FileText, Filter, Plus, Search, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import AdminLayout from "../../components/admin/admin-layout";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

interface Content {
	id: string;
	key: string;
	type: string; // Accept any string type from backend
	category: string | null;
	order: number;
	createdAt: string;
	updatedAt: string;
	translations: {
		id: string;
		language: string;
		value: string;
		contentId: string;
	}[];
}

const AdminContent: React.FC = () => {
	const { theme } = useTheme();
	const [selectedContent, setSelectedContent] = useState<Content | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<Partial<Content>>({});
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");

	// Real tRPC data fetching
	useRouteContext({ from: "__root__" });

	const {
		data: contentData,
		isLoading,
		refetch,
	} = trpc.content.adminList.useQuery({
		category: selectedCategory || undefined,
		limit: 50,
		offset: 0,
	});

	const contentList = (contentData?.contents || []).filter((item: Content) =>
		["TEXT", "MARKDOWN", "HTML"].includes(item.type),
	);

	const createContentMutation = trpc.content.create.useMutation({
		onSuccess: () => {
			refetch();
			setShowForm(false);
			setFormData({});
			setSelectedContent(null);
		},
		onError: (error) => {
			console.error("Error creating content:", error);
		},
	});

	const updateContentMutation = trpc.content.update.useMutation({
		onSuccess: () => {
			refetch();
			setShowForm(false);
			setFormData({});
			setSelectedContent(null);
		},
		onError: (error) => {
			console.error("Error updating content:", error);
		},
	});

	const deleteContentMutation = trpc.content.delete.useMutation({
		onSuccess: () => {
			refetch();
		},
		onError: (error) => {
			console.error("Error deleting content:", error);
		},
	});

	const handleEdit = (contentItem: Content) => {
		setSelectedContent(contentItem);
		setFormData(contentItem);
		setShowForm(true);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir este conteúdo?")) {
			try {
				await deleteContentMutation.mutateAsync({ id });
			} catch (error) {
				console.error("Error deleting content:", error);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (selectedContent) {
				await updateContentMutation.mutateAsync({
					id: selectedContent.id,
					key: formData.key,
					type: formData.type as "TEXT" | "MARKDOWN" | "HTML",
					category: formData.category || null || undefined,
					translations: formData.translations,
				});
			} else {
				await createContentMutation.mutateAsync({
					key: formData.key || "",
					type: (formData.type as "TEXT" | "MARKDOWN" | "HTML") || "TEXT",
					category: formData.category ?? "",
					translations: formData.translations || [],
				});
			}
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	// Filter content based on search and filters
	const filteredContent = contentList.filter((item: Content) => {
		const matchesSearch =
			!searchTerm ||
			item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.category?.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesType = !selectedType || item.type === selectedType;
		const matchesCategory =
			!selectedCategory || item.category === selectedCategory;

		return matchesSearch && matchesType && matchesCategory;
	});

	// Get unique types and categories for filters
	const types = Array.from(
		new Set(contentList.map((item: Content) => item.type)),
	);
	const categories = Array.from(
		new Set(contentList.map((item: Content) => item.category).filter(Boolean)),
	);

	if (isLoading) {
		return (
			<AdminLayout>
				<div
					className={`flex h-64 items-center justify-center ${theme.primary}`}
				>
					<div className="animate-pulse">Carregando conteúdo...</div>
				</div>
			</AdminLayout>
		);
	}

	return (
		<AdminLayout>
			<div className={`min-h-screen ${theme.primary}`}>
				<div className="container mx-auto px-4 py-8">
					<div className="mb-8 flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<FileText className={`h-8 w-8 ${theme.accent}`} />
							<h1 className={`font-bold text-3xl ${theme.primary}`}>
								Gerenciar Conteúdo
							</h1>
						</div>
						<button
							type="button"
							onClick={() => {
								setSelectedContent(null);
								setFormData({});
								setShowForm(true);
							}}
							className={`flex items-center space-x-2 px-4 py-2 ${theme.accent} rounded-lg text-white transition-opacity hover:opacity-90`}
						>
							<Plus className="h-5 w-5" />
							<span>Novo Conteúdo</span>
						</button>
					</div>

					{/* Search and Filters */}
					<div className={`${theme.secondary} mb-8 rounded-lg p-6`}>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div className="relative">
								<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 transform text-gray-400" />
								<input
									type="text"
									placeholder="Buscar conteúdo..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div className="relative">
								<Filter className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 transform text-gray-400" />
								<select
									value={selectedType}
									onChange={(e) => setSelectedType(e.target.value)}
									className="w-full appearance-none rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Todos os tipos</option>
									{types.map((type) => (
										<option key={type} value={type}>
											{type}
										</option>
									))}
								</select>
							</div>

							<div className="relative">
								<Filter className="-translate-y-1/2 absolute top-1/2 left-3 h-5 w-5 transform text-gray-400" />
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="w-full appearance-none rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Todas as categorias</option>
									{categories.map((category) => (
										<option key={category} value={category || undefined}>
											{category}
										</option>
									))}
								</select>
							</div>

							<button
								type="button"
								onClick={() => {
									setSearchTerm("");
									setSelectedType("");
									setSelectedCategory("");
								}}
								className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
							>
								Limpar Filtros
							</button>
						</div>
					</div>

					{/* Content Table */}
					<div className={`${theme.secondary} overflow-hidden rounded-lg`}>
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Chave
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Tipo
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Categoria
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Traduções
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Criado em
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Ações
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{filteredContent.map((contentItem: Content) => (
										<tr key={contentItem.id}>
											<td className="whitespace-nowrap px-6 py-4 text-gray-900 text-sm">
												{contentItem.key}
											</td>
											<td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
												{contentItem.type}
											</td>
											<td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
												{contentItem.category || "Sem categoria"}
											</td>
											<td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
												{contentItem.translations.length} traduções
											</td>
											<td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
												{new Date(contentItem.createdAt).toLocaleDateString()}
											</td>
											<td className="whitespace-nowrap px-6 py-4 font-medium text-sm">
												<div className="flex space-x-2">
													<button
														type="button"
														onClick={() => handleEdit(contentItem)}
														className="text-blue-600 hover:text-blue-900"
													>
														<Edit className="h-4 w-4" />
													</button>
													<button
														type="button"
														onClick={() => handleDelete(contentItem.id)}
														className="text-red-600 hover:text-red-900"
													>
														<Trash2 className="h-4 w-4" />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Form Modal */}
					{showForm && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
							<div
								className={`${theme.secondary} max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg p-6`}
							>
								<h2 className={`mb-6 font-bold text-2xl ${theme.primary}`}>
									{selectedContent ? "Editar Conteúdo" : "Novo Conteúdo"}
								</h2>

								<form onSubmit={handleSubmit}>
									<div className="mb-4">
										<label
											htmlFor="content-key"
											className="mb-2 block font-medium text-sm"
										>
											Chave
										</label>
										<input
											id="content-key"
											type="text"
											value={formData.key || ""}
											onChange={(e) =>
												setFormData({ ...formData, key: e.target.value })
											}
											className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											required
										/>
									</div>

									<div className="mb-4">
										<label
											htmlFor="content-type"
											className="mb-2 block font-medium text-sm"
										>
											Tipo
										</label>
										<select
											id="content-type"
											value={formData.type || "TEXT"}
											onChange={(e) =>
												setFormData({
													...formData,
													type: e.target.value as "TEXT" | "MARKDOWN" | "HTML",
												})
											}
											className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										>
											<option value="TEXT">Texto</option>
											<option value="MARKDOWN">Markdown</option>
											<option value="HTML">HTML</option>
										</select>
									</div>

									<div className="mb-4">
										<label
											htmlFor="content-category"
											className="mb-2 block font-medium text-sm"
										>
											Categoria
										</label>
										<input
											id="content-category"
											type="text"
											value={formData.category || ""}
											onChange={(e) =>
												setFormData({
													...formData,
													category: e.target.value || null,
												})
											}
											className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div className="mb-4">
										<label
											htmlFor="content-pt"
											className="mb-2 block font-medium text-sm"
										>
											Conteúdo (Português) *
										</label>
										<textarea
											id="content-pt"
											value={formData.translations?.[0]?.value || ""}
											onChange={(e) => {
												const translations = formData.translations || [];
												const updatedTranslations = [...translations];
												if (updatedTranslations[0]) {
													updatedTranslations[0].value = e.target.value;
												} else {
													updatedTranslations[0] = {
														id: "",
														language: "pt",
														value: e.target.value,
														contentId: "",
													};
												}
												setFormData({
													...formData,
													translations: updatedTranslations,
												});
											}}
											className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											rows={4}
											required
										/>
									</div>

									<div className="flex justify-end space-x-4">
										<button
											type="button"
											onClick={() => {
												setShowForm(false);
												setSelectedContent(null);
												setFormData({});
											}}
											className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
										>
											Cancelar
										</button>
										<button
											type="submit"
											className={`px-4 py-2 ${theme.accent} rounded-md text-white transition-opacity hover:opacity-90`}
										>
											{selectedContent ? "Atualizar" : "Criar"}
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminContent;
