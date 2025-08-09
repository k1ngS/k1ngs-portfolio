import { motion } from "framer-motion";
import { Briefcase, Code, Globe, Mail, Palette, User } from "lucide-react";
import type React from "react";
import { useLanguage } from "../../contexts/language-context";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

interface NavigationItem {
	id: string;
	label: string;
	icon: React.ComponentType<{ size?: number; className?: string }>;
	description: string;
}

interface NavigationPanelProps {
	activeSection: string;
	onSectionChange: (section: string) => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({
	activeSection,
	onSectionChange,
}) => {
	const { theme, themes, changeTheme, currentTheme } = useTheme();
	const { t, languages, currentLanguage, changeLanguage } = useLanguage();

	// Fetch editable content
	const { data: userNameContent } = trpc.content.getByKey.useQuery({
		key: "terminal.nav.user_name",
		language: currentLanguage,
	});
	const { data: userTitleContent } = trpc.content.getByKey.useQuery({
		key: "terminal.nav.user_title",
		language: currentLanguage,
	});
	const { data: userLevelContent } = trpc.content.getByKey.useQuery({
		key: "terminal.nav.user_level",
		language: currentLanguage,
	});
	const { data: editionContent } = trpc.content.getByKey.useQuery({
		key: "terminal.nav.edition",
		language: currentLanguage,
	});
	const { data: quantumReadyContent } = trpc.content.getByKey.useQuery({
		key: "terminal.nav.quantum_ready",
		language: currentLanguage,
	});

	const navigationItems: NavigationItem[] = [
		{
			id: "about",
			label: t("about"),
			icon: User,
			description: t("aboutDesc"),
		},
		{
			id: "skills",
			label: t("skills"),
			icon: Code,
			description: t("skillsDesc"),
		},
		{
			id: "projects",
			label: t("projects"),
			icon: Briefcase,
			description: t("projectsDesc"),
		},
		{
			id: "contact",
			label: t("contact"),
			icon: Mail,
			description: t("contactDesc"),
		},
	];

	const handleThemeChange = (themeName: string) => {
		changeTheme(themeName);
	};

	return (
		<div
			className={`flex h-full flex-col ${theme.bg} ${theme.primary} font-mono`}
		>
			<div className="min-h-0 flex-1 overflow-y-auto p-4">
				{/* User Info */}
				<div className="mb-6 border-gray-600 border-b pb-4">
					<div className={`font-bold text-lg ${theme.accent} mb-1`}>
						{userNameContent?.translation?.value || "@ Marcos K1ngs"}
					</div>
					<div className={`text-sm ${theme.secondary}`}>
						{userTitleContent?.translation?.value || "Full Stack Developer"}
					</div>
					<div className={`text-xs ${theme.primary} mt-1 opacity-70`}>
						{userLevelContent?.translation?.value || "Level 99 Code Wizard"}
					</div>
					<div className={`text-xs ${theme.cyan} mt-1`}>
						{editionContent?.translation?.value || "2025 Enhanced Edition"}
					</div>
				</div>

				{/* Navigation Menu */}
				<nav className="mb-6 space-y-2">
					{navigationItems.map((item) => {
						const Icon = item.icon;
						const isActive = activeSection === item.id;

						return (
							<motion.button
								key={item.id}
								onClick={() => onSectionChange(item.id)}
								className={`w-full rounded-lg border p-3 text-left transition-all duration-200 ${
									isActive
										? `${theme.accent} border-gray-500 bg-gray-800 shadow-lg`
										: `${theme.primary} border-gray-700 hover:border-gray-500 hover:bg-gray-800`
								}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className="flex items-center space-x-3">
									<Icon
										size={18}
										className={isActive ? theme.accent : theme.secondary}
									/>
									<div className="flex-1">
										<div
											className={`font-medium text-sm ${
												isActive ? theme.accent : theme.primary
											}`}
										>
											{item.label}
										</div>
										<div
											className={`text-xs opacity-70 ${
												isActive ? theme.accent : theme.secondary
											}`}
										>
											{item.description}
										</div>
									</div>
								</div>
							</motion.button>
						);
					})}
				</nav>

				{/* Language Selector */}
				<div className="border-gray-600 border-t pt-4">
					<div className={`mb-3 flex items-center space-x-2 ${theme.primary}`}>
						<Globe size={16} />
						<span className="font-medium text-sm">{t("language")}</span>
					</div>

					<div className="space-y-1">
						{Object.entries(languages).map(([key, languageData]) => (
							<button
								type="button"
								key={key}
								onClick={() => changeLanguage(key)}
								className={`w-full rounded p-2 text-left text-xs transition-all duration-200 ${
									currentLanguage === key
										? `${theme.accent} border border-gray-500 bg-gray-800`
										: `${theme.secondary} hover:bg-gray-800 hover:${theme.primary}`
								}`}
							>
								<span className="mr-2">{languageData.flag}</span>
								{languageData.name}
							</button>
						))}
					</div>
				</div>

				{/* Theme Selector */}
				<div className="mt-4 border-gray-600 border-t pt-4">
					<div className={`mb-3 flex items-center space-x-2 ${theme.primary}`}>
						<Palette size={16} />
						<span className="font-medium text-sm">{t("themes")}</span>
					</div>

					<div className="space-y-1">
						{Object.entries(themes).map(([key, themeData]) => (
							<button
								type="button"
								key={key}
								onClick={() => handleThemeChange(key)}
								className={`w-full rounded p-2 text-left text-xs transition-all duration-200 ${
									currentTheme === key
										? `${theme.accent} border border-gray-500 bg-gray-800`
										: `${theme.secondary} hover:bg-gray-800 hover:${theme.primary}`
								}`}
							>
								{themeData.name}
							</button>
						))}
					</div>
				</div>

				{/* System Info */}
				<div className="mt-6 border-gray-600 border-t pt-4">
					<div className={`mb-2 font-medium text-xs ${theme.primary}`}>
						{t("systemInfo")}
					</div>
					<div className={`text-xs ${theme.secondary} space-y-1`}>
						<div>React 19.0.0</div>
						<div>TypeScript 5.8</div>
						<div>Tailwind 4.1</div>
						<div className={theme.accent}>
							{quantumReadyContent?.translation?.value || "Quantum Ready ⚡"}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavigationPanel;
