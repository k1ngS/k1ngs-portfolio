import { motion } from "framer-motion";
import {
	Brain,
	Cloud,
	Code,
	Database,
	Globe,
	Server,
	Shield,
	Smartphone,
	Star,
	Wrench,
	Zap,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../contexts/language-context";
import { useTheme } from "../../../contexts/theme-context";
import { trpc } from "../../../utils/trpc";

interface Skill {
	id: string;
	name: string;
	level: number;
	category: string;
	description?: string;
	yearsOfExp: number;
	certified: boolean;
	featured: boolean;
	iconUrl?: string;
	translations?: any[];
}

const SkillsSection: React.FC = () => {
	const { theme } = useTheme();
	const { currentLanguage } = useLanguage();
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [animationStep, setAnimationStep] = useState(0);

	// Fetch skills from backend
	const { data: skillsData, isLoading } = trpc.skills.adminList.useQuery({});
	const skills = skillsData?.skills || [];

	// Helper function to get category icon
	const getCategoryIcon = (category: string) => {
		switch (category.toUpperCase()) {
			case "FRONTEND":
				return Code;
			case "BACKEND":
				return Server;
			case "DATABASE":
				return Database;
			case "DEVOPS":
				return Wrench;
			case "MOBILE":
				return Smartphone;
			default:
				return Star;
		}
	};

	// Fetch editable category labels
	const { data: allCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.skills.all",
		language: currentLanguage,
	});
	const { data: frontendCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.skills.frontend",
		language: currentLanguage,
	});
	const { data: backendCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.skills.backend",
		language: currentLanguage,
	});
	const { data: mobileCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.skills.mobile",
		language: currentLanguage,
	});
	const { data: devopsCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.skills.devops",
		language: currentLanguage,
	});
	const { data: aiCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.skills.ai",
		language: currentLanguage,
	});
	const { data: blockchainCategoryContent } = trpc.content.getByKey.useQuery({
		key: "categories.skills.blockchain",
		language: currentLanguage,
	});

	const categories = [
		{
			id: "all",
			name: allCategoryContent?.translation?.value || "Todas as Magias",
			icon: Zap,
		},
		{
			id: "frontend",
			name:
				frontendCategoryContent?.translation?.value || "Encantamentos Frontend",
			icon: Globe,
		},
		{
			id: "backend",
			name: backendCategoryContent?.translation?.value || "Feitiços Backend",
			icon: Database,
		},
		{
			id: "mobile",
			name: mobileCategoryContent?.translation?.value || "Magias Mobile",
			icon: Smartphone,
		},
		{
			id: "devops",
			name: devopsCategoryContent?.translation?.value || "Rituais DevOps",
			icon: Cloud,
		},
		{
			id: "ai",
			name: aiCategoryContent?.translation?.value || "IA & Machine Learning",
			icon: Brain,
		},
		{
			id: "blockchain",
			name: blockchainCategoryContent?.translation?.value || "Artes Blockchain",
			icon: Shield,
		},
	];

	const filteredSkills =
		selectedCategory === "all"
			? skills
			: skills.filter((skill) => skill.category === selectedCategory);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAnimationStep(1);
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	const getSkillColor = (level: number) => {
		if (level >= 90) return theme.accent;
		if (level >= 80) return theme.secondary;
		if (level >= 70) return theme.cyan;
		return theme.primary;
	};

	// Fetch skill level labels
	const { data: masterLevelContent } = trpc.content.getByKey.useQuery({
		key: "skill_levels.master",
		language: currentLanguage,
	});
	const { data: advancedLevelContent } = trpc.content.getByKey.useQuery({
		key: "skill_levels.advanced",
		language: currentLanguage,
	});
	const { data: intermediateLevelContent } = trpc.content.getByKey.useQuery({
		key: "skill_levels.intermediate",
		language: currentLanguage,
	});
	const { data: beginnerLevelContent } = trpc.content.getByKey.useQuery({
		key: "skill_levels.beginner",
		language: currentLanguage,
	});

	const getSkillLabel = (level: number) => {
		if (level >= 90) return masterLevelContent?.translation?.value || "Mestre";
		if (level >= 80)
			return advancedLevelContent?.translation?.value || "Avançado";
		if (level >= 70)
			return intermediateLevelContent?.translation?.value || "Intermediário";
		return beginnerLevelContent?.translation?.value || "Iniciante";
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
					$ ls -la /skills/magical_arsenal
				</div>
				<div className={`text-sm ${theme.secondary} mb-4`}>
					Explorando o grimório de tecnologias dominadas - Edição 2025 Enhanced
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

			{/* Skills Grid */}
			{animationStep >= 1 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
				>
					{filteredSkills.map((skill, index) => {
						const Icon = getCategoryIcon(skill.category || "OTHER");
						return (
							<motion.div
								key={skill.name}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								className="relative rounded-lg border border-gray-600 bg-gray-800 p-4 transition-all duration-200 hover:border-gray-500 hover:shadow-lg"
							>
								{skill.isNew && (
									<div
										className={`-top-2 -right-2 absolute rounded-full px-2 py-1 font-bold text-xs ${theme.accent} border border-gray-600 bg-gray-900`}
									>
										NEW
									</div>
								)}

								<div className="mb-3 flex items-center space-x-3">
									<Icon size={20} className={getSkillColor(skill.level)} />
									<div className="flex-1">
										<div className={`font-semibold ${theme.primary}`}>
											{skill.translations?.[0]?.name || skill.name}
										</div>
										<div className={`text-xs ${getSkillColor(skill.level)}`}>
											{getSkillLabel(skill.level)} - {skill.level}% •{" "}
											{skill.yearsOfExp} years
										</div>
									</div>
								</div>

								{/* Progress Bar */}
								<div className="mb-2">
									<div className="h-2 w-full rounded-full bg-gray-700">
										<motion.div
											initial={{ width: 0 }}
											animate={{ width: `${skill.level}%` }}
											transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
											className={`h-2 rounded-full ${getSkillColor(skill.level).replace("text-", "bg-")}`}
										/>
									</div>
								</div>

								<div className={`text-xs ${theme.secondary} opacity-80`}>
									{skill.translations?.[0]?.description ||
										skill.description ||
										"No description available"}
								</div>
								{skill.certified && (
									<div className="mt-2">
										<span className="rounded border border-green-500/30 bg-green-500/20 px-2 py-1 text-green-400 text-xs">
											CERTIFIED
										</span>
									</div>
								)}
							</motion.div>
						);
					})}
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
					<span className={theme.cyan}>~/skills</span>
					<span className={theme.accent}>$</span>
					<span className={theme.secondary}>grep -r "mastery" ./</span>
				</div>
				<div className={`mt-2 text-sm ${theme.secondary}`}>
					./mindset.txt: "Continuous learning is the key to mastery"
				</div>
				<div className={`text-sm ${theme.secondary}`}>
					./philosophy.txt: "Every bug is a lesson, every feature is growth"
				</div>
				<div className="mt-2 flex items-center space-x-2 text-sm">
					<span className={theme.accent}>marcos@k1ngs-terminal</span>
					<span>:</span>
					<span className={theme.cyan}>~/skills</span>
					<span className={theme.accent}>$</span>
					<span className="animate-pulse">█</span>
				</div>
			</motion.div>
		</div>
	);
};

export default SkillsSection;
