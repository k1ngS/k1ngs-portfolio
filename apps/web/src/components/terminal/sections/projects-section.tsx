import { motion } from "framer-motion";
import {
	Calendar,
	ExternalLink,
	GitBranch,
	Github,
	Play,
	Star,
	Users,
	Zap,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import type { Project } from "@/types";
import { useLanguage } from "../../../contexts/language-context";
import { useTheme } from "../../../contexts/theme-context";
import { trpc } from "../../../utils/trpc";

const ProjectsSection: React.FC = () => {
	const { theme } = useTheme();
	const { currentLanguage } = useLanguage();
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [animationStep, setAnimationStep] = useState(0);

	// Fetch projects from backend
	const { data: projectsData, isLoading } = trpc.projects.adminList.useQuery({
		limit: 50,
		offset: 0,
	});
	const projects = projectsData?.projects || [];

	// Fetch editable category labels
	const { data: allCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.projects.all",
		language: currentLanguage,
	});
	const { data: webCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.projects.web",
		language: currentLanguage,
	});
	const { data: mobileCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.projects.mobile",
		language: currentLanguage,
	});
	const { data: aiCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.projects.ai",
		language: currentLanguage,
	});
	const { data: blockchainCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.projects.blockchain",
		language: currentLanguage,
	});
	const { data: devopsCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.projects.devops",
		language: currentLanguage,
	});

	const categories = [
		{
			id: "all",
			name: allCategoryContent?.translation?.value || "Todas as Missões",
			icon: Star,
		},
		{
			id: "web",
			name: webCategoryContent?.translation?.value || "Aventuras Web",
			icon: ExternalLink,
		},
		{
			id: "mobile",
			name: mobileCategoryContent?.translation?.value || "Jornadas Mobile",
			icon: Play,
		},
		{
			id: "ai",
			name: aiCategoryContent?.translation?.value || "Magias de IA",
			icon: Zap,
		},
		{
			id: "blockchain",
			name:
				blockchainCategoryContent?.translation?.value || "Artefatos Blockchain",
			icon: GitBranch,
		},
		{
			id: "devops",
			name: devopsCategoryContent?.translation?.value || "Rituais DevOps",
			icon: Users,
		},
	];

	const filteredProjects =
		selectedCategory === "all"
			? projects
			: projects.filter((project) => project.category === selectedCategory);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimationStep(1);
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	// Fetch project status labels
	const { data: completedStatusContent } = trpc.content.getByKey.useQuery({
		key: "project_status.completed",
		language: currentLanguage,
	});
	const { data: inProgressStatusContent } = trpc.content.getByKey.useQuery({
		key: "project_status.in_progress",
		language: currentLanguage,
	});
	const { data: planningStatusContent } = trpc.content.getByKey.useQuery({
		key: "project_status.planning",
		language: currentLanguage,
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return theme.secondary;
			case "in-progress":
				return theme.accent;
			case "planning":
				return theme.cyan;
			default:
				return theme.primary;
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case "completed":
				return completedStatusContent?.translation?.value || "Concluído";
			case "in-progress":
				return inProgressStatusContent?.translation?.value || "Em Progresso";
			case "planning":
				return planningStatusContent?.translation?.value || "Planejamento";
			default:
				return "Desconhecido";
		}
	};

	return (
		<div className={`p-6 ${theme.bg} ${theme.primary} h-full overflow-auto`}>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-6"
			>
				<div className={`font-bold text-lg ${theme.accent} mb-2`}>
					$ find ./adventures -name "*.epic" -type f
				</div>
				<div className={`text-sm ${theme.secondary} mb-4`}>
					Explorando as missões épicas completadas e em andamento - Portfolio
					2025
				</div>
			</motion.div>

			{/* Category Filter */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="mb-6"
			>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => {
						const Icon = category.icon;
						return (
							<button
								type="button"
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`flex items-center space-x-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
									selectedCategory === category.id
										? `${theme.accent} border-gray-500 bg-gray-800`
										: `${theme.primary} border-gray-700 hover:border-gray-500 hover:bg-gray-800`
								}`}
							>
								<Icon size={14} />
								<span>{category.name}</span>
							</button>
						);
					})}
				</div>
			</motion.div>

			{/* Projects Grid */}
			{animationStep >= 1 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="grid grid-cols-1 gap-6 lg:grid-cols-2"
				>
					{filteredProjects.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className={`relative rounded-lg border bg-gray-800 p-6 transition-all duration-200 hover:border-gray-500 hover:shadow-lg ${
								project.featured ? "border-yellow-500" : "border-gray-600"
							}`}
						>
							{project.featured && (
								<div
									className={`-top-2 -right-2 absolute rounded-full px-2 py-1 font-bold text-xs ${theme.accent} border border-yellow-500 bg-gray-900`}
								>
									DESTAQUE
								</div>
							)}

							<div className="mb-4 flex items-start justify-between">
								<div className="flex-1">
									<h3 className={`font-bold text-lg ${theme.primary} mb-2`}>
										{project.title}
									</h3>
									<p className={`text-sm ${theme.secondary} mb-3`}>
										{project.description}
									</p>
								</div>
								<div
									className={`rounded px-2 py-1 font-semibold text-xs ${getStatusColor(project.status)} bg-gray-700`}
								>
									{getStatusLabel(project.status)}
								</div>
							</div>

							{/* Technologies */}
							<div className="mb-4">
								<div className="flex flex-wrap gap-1">
									{project.technologies.map((tech, techIndex) => (
										<span
											key={tech.id || techIndex}
											className={`rounded px-2 py-1 text-xs ${theme.cyan} border border-gray-600 bg-gray-700`}
										>
											{typeof tech === "string" ? tech : tech.name || "Unknown"}
										</span>
									))}
								</div>
							</div>

							{/* Stats */}
							<div className="mb-4 flex items-center space-x-4 text-xs">
								<div className="flex items-center space-x-1">
									<Star size={12} className={theme.accent} />
									<span className={theme.primary}>
										{project.featured ? "Featured" : "Project"}
									</span>
								</div>
								<div className="flex items-center space-x-1">
									<Users size={12} className={theme.secondary} />
									<span className={theme.primary}>
										{project.status || "ACTIVE"}
									</span>
								</div>
								<div className="flex items-center space-x-1">
									<Calendar size={12} className={theme.cyan} />
									<span className={theme.primary}>
										{new Date(project.createdAt).getFullYear()}
									</span>
								</div>
							</div>

							{/* Actions */}
							<div className="flex space-x-2">
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={`flex items-center space-x-1 rounded border border-gray-600 px-3 py-2 transition-colors hover:border-gray-500 ${theme.primary} hover:bg-gray-700`}
									>
										<Github size={14} />
										<span className="text-xs">Código</span>
									</a>
								)}

								<button
									type="button"
									onClick={() => setSelectedProject(project)}
									className={`flex items-center space-x-1 rounded border border-gray-600 px-3 py-2 transition-colors hover:border-gray-500 ${theme.secondary} hover:bg-gray-700`}
								>
									<span className="text-xs">Detalhes</span>
								</button>
							</div>
						</motion.div>
					))}
				</motion.div>
			)}

			{/* Project Detail Modal */}
			{selectedProject && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
					onClick={() => setSelectedProject(null)}
				>
					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-lg border border-gray-600 bg-gray-800 p-6"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="mb-4 flex items-start justify-between">
							<h2 className={`font-bold text-xl ${theme.primary}`}>
								{selectedProject.title}
							</h2>
							<button
								type="button"
								onClick={() => setSelectedProject(null)}
								className={`${theme.primary} hover:${theme.accent} transition-colors`}
							>
								✕
							</button>
						</div>

						<p className={`text-sm ${theme.secondary} mb-4 leading-relaxed`}>
							{selectedProject.longDescription || selectedProject.description}
						</p>

						<div className="mb-4">
							<h3 className={`font-semibold text-sm ${theme.accent} mb-2`}>
								Tecnologias Utilizadas:
							</h3>
							<div className="flex flex-wrap gap-1">
								{selectedProject.technologies.map((tech, techIndex) => (
									<span
										key={tech.id || techIndex}
										className={`rounded px-2 py-1 text-xs ${theme.cyan} border border-gray-600 bg-gray-700`}
									>
										{tech.name || tech}
									</span>
								))}
							</div>
						</div>

						<div className="text-gray-400 text-xs">
							Última atualização:{" "}
							{new Date(selectedProject.updatedAt).toLocaleDateString()}
						</div>
					</motion.div>
				</motion.div>
			)}

			{/* Command Prompt */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 1 }}
				className={`mt-8 rounded-lg border border-gray-600 bg-gray-800 p-4 ${theme.primary}`}
			>
				<div className="flex items-center space-x-2 text-sm">
					<span className={theme.accent}>marcos@k1ngs-terminal</span>
					<span>:</span>
					<span className={theme.cyan}>~/projects</span>
					<span className={theme.accent}>$</span>
					<span className={theme.secondary}>git log --oneline --graph</span>
				</div>
				<div className={`mt-2 text-sm ${theme.secondary}`}>
					* 2025-01-15 feat: Portfolio v3.0 with quantum enhancements
				</div>
				<div className={`text-sm ${theme.secondary}`}>
					* 2024-12-20 feat: AI Code Assistant with advanced features
				</div>
				<div className={`text-sm ${theme.secondary}`}>
					* 2024-11-15 feat: Quantum Task Manager with real-time sync
				</div>
				<div className="mt-2 flex items-center space-x-2 text-sm">
					<span className={theme.accent}>marcos@k1ngs-terminal</span>
					<span>:</span>
					<span className={theme.cyan}>~/projects</span>
					<span className={theme.accent}>$</span>
					<span className="animate-pulse">█</span>
				</div>
			</motion.div>
		</div>
	);
};

export default ProjectsSection;
