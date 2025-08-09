import { useRouteContext } from "@tanstack/react-router";
import {
	Code,
	Database,
	Edit,
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

interface Skill {
	id: string;
	name: string;
	level: number;
	category: "FRONTEND" | "BACKEND" | "DATABASE" | "DEVOPS" | "MOBILE" | "OTHER";
	description?: string;
	yearsOfExp: number;
	certified: boolean;
	featured: boolean;
	iconUrl?: string;
	isNew?: boolean;
	order?: number;
	technologyId?: string;
	technology?: any;
	translations?: any[];
	createdAt: string;
	updatedAt: string;
}

const AdminSkills: React.FC = () => {
	const { theme } = useTheme();
	const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<Partial<Skill>>({});

	// Real tRPC data fetching
	useRouteContext({ from: "__root__" });

	const {
		data: skillsData,
		isLoading,
		refetch,
	} = trpc.skills.adminList.useQuery({});

	const skills = skillsData?.skills || [];

	const createSkillMutation = trpc.skills.create.useMutation({
		onSuccess: () => {
			refetch();
			setShowForm(false);
			setFormData({});
			setSelectedSkill(null);
		},
		onError: (error) => {
			console.error("Error creating skill:", error);
		},
	});

	const updateSkillMutation = trpc.skills.update.useMutation({
		onSuccess: () => {
			refetch();
			setShowForm(false);
			setFormData({});
			setSelectedSkill(null);
		},
		onError: (error) => {
			console.error("Error updating skill:", error);
		},
	});

	const deleteSkillMutation = trpc.skills.delete.useMutation({
		onSuccess: () => {
			refetch();
		},
		onError: (error) => {
			console.error("Error deleting skill:", error);
		},
	});

	const handleEdit = (skill: Skill) => {
		setSelectedSkill(skill);
		setFormData(skill);
		setShowForm(true);
	};

	const handleDelete = async (id: string) => {
		if (confirm("Tem certeza que deseja excluir esta skill?")) {
			try {
				await deleteSkillMutation.mutateAsync({ id });
			} catch (error) {
				console.error("Error deleting skill:", error);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (selectedSkill) {
				await updateSkillMutation.mutateAsync({
					id: selectedSkill.id,
					...formData,
				});
			} else {
				await createSkillMutation.mutateAsync(formData as any);
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
					<div className="animate-pulse">Carregando skills...</div>
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
							Gerenciar Skills
						</h1>
						<p className={theme.secondary}>
							Total: {skills?.length || 0} skills
						</p>
					</div>
					<button
						onClick={() => {
							setSelectedSkill(null);
							setFormData({});
							setShowForm(true);
						}}
						className={`flex items-center gap-2 px-4 py-2 ${theme.secondary} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10`}
					>
						<Plus size={16} />
						Nova Skill
					</button>
				</div>

				{/* Skills Grid */}
				<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{skills?.map((skill: any) => (
						<div
							key={skill.id}
							className={
								"rounded-lg border border-current border-opacity-20 p-4 transition-colors hover:border-opacity-40"
							}
						>
							<div className="mb-3 flex items-start justify-between">
								<div className="flex items-center gap-2">
									<div className={getCategoryColor(skill.category)}>
										{getCategoryIcon(skill.category)}
									</div>
									<h3 className={`font-semibold ${theme.primary}`}>
										{skill.name}
									</h3>
								</div>
								<div className="flex gap-2">
									<button
										onClick={() => handleEdit(skill)}
										className={`${theme.secondary} hover:${theme.accent} transition-colors`}
									>
										<Edit size={14} />
									</button>
									<button
										onClick={() => handleDelete(skill.id)}
										className={`${theme.error} transition-opacity hover:opacity-80`}
									>
										<Trash2 size={14} />
									</button>
								</div>
							</div>

							{skill.description && (
								<p className={`${theme.secondary} mb-3 line-clamp-2 text-sm`}>
									{skill.description}
								</p>
							)}

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span
										className={`rounded px-2 py-1 text-xs ${getCategoryColor(skill.category)}`}
									>
										{skill.category}
									</span>
									{skill.featured && (
										<Star
											size={12}
											className={theme.accent}
											fill="currentColor"
										/>
									)}
								</div>
								<div className="flex items-center gap-1">
									<span className={`text-xs ${theme.secondary}`}>Nível:</span>
									<span className={`font-bold text-xs ${theme.accent}`}>
										{skill.level}/10
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Form Modal */}
				{showForm && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div
							className={`${theme.bg} max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-current border-opacity-20 p-6`}
						>
							<h2 className={`font-bold text-xl ${theme.primary} mb-4`}>
								{selectedSkill ? "Editar Skill" : "Nova Skill"}
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
										Anos de Experiência *
									</label>
									<input
										type="number"
										min="0"
										value={formData.yearsOfExp || 0}
										onChange={(e) =>
											setFormData({
												...formData,
												yearsOfExp: Number.parseInt(e.target.value),
											})
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										required
									/>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Descrição
									</label>
									<textarea
										value={formData.description || ""}
										onChange={(e) =>
											setFormData({ ...formData, description: e.target.value })
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										rows={3}
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
										<option value="OTHER">Outros</option>
									</select>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Nível (1-10) *
									</label>
									<input
										type="number"
										min="1"
										max="10"
										value={formData.level || 1}
										onChange={(e) =>
											setFormData({
												...formData,
												level: Number.parseInt(e.target.value),
											})
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										required
									/>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										URL do Ícone
									</label>
									<input
										type="url"
										value={formData.iconUrl || ""}
										onChange={(e) =>
											setFormData({ ...formData, iconUrl: e.target.value })
										}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
									/>
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
										Skill em destaque
									</label>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Nome em Inglês *
									</label>
									<input
										type="text"
										value={formData.translations?.[0]?.name || ""}
										onChange={(e) => {
											const translations = formData.translations || [];
											const updatedTranslations = [...translations];
											if (updatedTranslations[0]) {
												updatedTranslations[0].name = e.target.value;
											} else {
												updatedTranslations[0] = {
													language: "en",
													name: e.target.value,
													description: "",
												};
											}
											setFormData({
												...formData,
												translations: updatedTranslations,
											});
										}}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										required
									/>
								</div>

								<div>
									<label
										className={`block font-medium text-sm ${theme.secondary} mb-1`}
									>
										Descrição em Inglês *
									</label>
									<textarea
										value={formData.translations?.[0]?.description || ""}
										onChange={(e) => {
											const translations = formData.translations || [];
											const updatedTranslations = [...translations];
											if (updatedTranslations[0]) {
												updatedTranslations[0].description = e.target.value;
											} else {
												updatedTranslations[0] = {
													language: "en",
													name: "",
													description: e.target.value,
												};
											}
											setFormData({
												...formData,
												translations: updatedTranslations,
											});
										}}
										className={`w-full rounded border border-current border-opacity-20 bg-transparent px-3 py-2 ${theme.primary} focus:border-opacity-40 focus:outline-none`}
										rows={3}
										required
									/>
								</div>

								<div className="flex justify-end gap-3 pt-4">
									<button
										type="button"
										onClick={() => {
											setShowForm(false);
											setSelectedSkill(null);
											setFormData({});
										}}
										className={`px-4 py-2 ${theme.secondary} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10`}
									>
										Cancelar
									</button>
									<button
										type="submit"
										disabled={
											createSkillMutation.isPending ||
											updateSkillMutation.isPending
										}
										className={`px-4 py-2 ${theme.accent} rounded border border-current transition-colors hover:bg-current hover:bg-opacity-10 disabled:opacity-50`}
									>
										{createSkillMutation.isPending ||
										updateSkillMutation.isPending
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

export default AdminSkills;
