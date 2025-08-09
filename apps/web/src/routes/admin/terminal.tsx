import { createFileRoute } from "@tanstack/react-router";
import { Edit, Monitor, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";
import AdminLayout from "../../components/admin/admin-layout";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

export const Route = createFileRoute("/admin/terminal")({
	component: AdminTerminal,
});

interface Content {
	id: string;
	key: string;
	type: any;
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

function AdminTerminal() {
	const { theme } = useTheme();
	const [selectedContent, setSelectedContent] = useState<Content | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<Partial<Content>>({});
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedSection, setSelectedSection] = useState("");

	// Fetch terminal-related content
	const {
		data: contentData,
		isLoading,
		refetch,
	} = trpc.content.adminList.useQuery({
		category: undefined,
		limit: 100,
		offset: 0,
	});

	const contentList = contentData?.contents || [];

	// Filter only terminal-related content
	const terminalContent = contentList.filter(
		(item: Content) =>
			item.key.startsWith("terminal.") ||
			item.key.startsWith("categories.") ||
			item.key.startsWith("skill_levels.") ||
			item.key.startsWith("project_status.") ||
			item.key.startsWith("contact.") ||
			item.key.startsWith("about."),
	);

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

	const handleEdit = (contentItem: Content) => {
		setSelectedContent(contentItem);
		setFormData(contentItem);
		setShowForm(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (selectedContent) {
				await updateContentMutation.mutateAsync({
					id: selectedContent.id,
					key: formData.key,
					type: formData.type as "TEXT" | "MARKDOWN" | "HTML",
					category: formData.category || undefined,
					translations: formData.translations,
				});
			}
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	// Filter content based on search and section
	const filteredContent = terminalContent.filter((item: Content) => {
		const matchesSearch =
			!searchTerm || item.key.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesSection =
			!selectedSection || item.key.startsWith(selectedSection);

		return matchesSearch && matchesSection;
	});

	// Terminal sections for filtering
	const terminalSections = [
		{ value: "terminal.boot", label: "Boot Sequence" },
		{ value: "terminal.nav", label: "Navigation Panel" },
		{ value: "terminal.status", label: "Status Panel" },
		{ value: "about", label: "About Section" },
		{ value: "about.stats", label: "Personal Statistics" },
		{ value: "contact", label: "Contact Section" },
		{ value: "contact.github", label: "GitHub Info" },
		{ value: "contact.linkedin", label: "LinkedIn Info" },
		{ value: "contact.twitter", label: "Twitter Info" },
		{ value: "contact.website", label: "Website Info" },
		{ value: "contact.email", label: "Email Info" },
		{ value: "contact.discord", label: "Discord Info" },
		{ value: "contact.calendly", label: "Calendly Info" },
		{ value: "contact.coffee", label: "Coffee Chat Info" },
		{ value: "categories", label: "Categories" },
		{ value: "skill_levels", label: "Skill Levels" },
		{ value: "project_status", label: "Project Status" },
	];

	if (isLoading) {
		return (
			<AdminLayout>
				<div
					className={`flex h-64 items-center justify-center ${theme.primary}`}
				>
					<div className="animate-pulse">
						Carregando conteúdo do terminal...
					</div>
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
							<Monitor className={`h-8 w-8 ${theme.accent}`} />
							<h1 className={`font-bold text-3xl ${theme.primary}`}>
								Gerenciar Terminal
							</h1>
						</div>
					</div>

					{/* Search and Filters */}
					<div className={`${theme.secondary} mb-8 rounded-lg p-6`}>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
								<select
									value={selectedSection}
									onChange={(e) => setSelectedSection(e.target.value)}
									className="w-full appearance-none rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Todas as seções</option>
									{terminalSections.map((section) => (
										<option key={section.value} value={section.value}>
											{section.label}
										</option>
									))}
								</select>
							</div>

							<button
								onClick={() => {
									setSearchTerm("");
									setSelectedSection("");
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
											Seção
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Português
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Inglês
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Espanhol
										</th>
										<th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
											Ações
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{filteredContent.map((contentItem: Content) => {
										const ptTranslation = contentItem.translations.find(
											(t) => t.language === "pt",
										);
										const enTranslation = contentItem.translations.find(
											(t) => t.language === "en",
										);
										const esTranslation = contentItem.translations.find(
											(t) => t.language === "es",
										);

										return (
											<tr key={contentItem.id}>
												<td className="px-6 py-4 font-mono text-gray-900 text-sm">
													{contentItem.key}
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
													{contentItem.key.split(".")[0] === "terminal"
														? contentItem.key.split(".")[1]
														: contentItem.key.split(".")[0]}
												</td>
												<td className="max-w-xs truncate px-6 py-4 text-gray-500 text-sm">
													{ptTranslation?.value || "-"}
												</td>
												<td className="max-w-xs truncate px-6 py-4 text-gray-500 text-sm">
													{enTranslation?.value || "-"}
												</td>
												<td className="max-w-xs truncate px-6 py-4 text-gray-500 text-sm">
													{esTranslation?.value || "-"}
												</td>
												<td className="whitespace-nowrap px-6 py-4 font-medium text-sm">
													<button
														onClick={() => handleEdit(contentItem)}
														className="text-blue-600 hover:text-blue-900"
													>
														<Edit className="h-4 w-4" />
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>

					{/* Edit Form Modal */}
					{showForm && selectedContent && (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
							<div
								className={`${theme.secondary} max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg p-6`}
							>
								<h2 className={`font-bold text-xl ${theme.primary} mb-4`}>
									Editar Conteúdo: {selectedContent.key}
								</h2>
								<form onSubmit={handleSubmit} className="space-y-4">
									{selectedContent.translations.map((translation, index) => (
										<div key={translation.id} className="space-y-2">
											<label
												className={`block font-medium text-sm ${theme.primary}`}
											>
												{translation.language.toUpperCase()}
											</label>
											<textarea
												value={
													formData.translations?.[index]?.value ||
													translation.value
												}
												onChange={(e) => {
													const newTranslations = [
														...(formData.translations ||
															selectedContent.translations),
													];
													newTranslations[index] = {
														...newTranslations[index],
														value: e.target.value,
													};
													setFormData({
														...formData,
														translations: newTranslations,
													});
												}}
												rows={3}
												className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									))}
									<div className="flex justify-end space-x-4 pt-4">
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
											disabled={updateContentMutation.isPending}
										>
											{updateContentMutation.isPending
												? "Salvando..."
												: "Salvar"}
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
}
