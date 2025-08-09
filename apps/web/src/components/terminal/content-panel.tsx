import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useTheme } from "../../contexts/theme-context";
import AboutSection from "./sections/about-section";
import ContactSection from "./sections/contact-section";
import ProjectsSection from "./sections/projects-section";
import SkillsSection from "./sections/skills-section";

interface ContentPanelProps {
	activeSection: string;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ activeSection }) => {
	const { theme } = useTheme();

	const renderSection = () => {
		switch (activeSection) {
			case "about":
				return <AboutSection />;
			case "skills":
				return <SkillsSection />;
			case "projects":
				return <ProjectsSection />;
			case "contact":
				return <ContactSection />;
			default:
				return <AboutSection />;
		}
	};

	const sectionVariants = {
		initial: { opacity: 0, x: 20 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -20 },
	};

	return (
		<div
			className={`h-full ${theme.bg} ${theme.primary} overflow-hidden font-mono`}
		>
			{/* Terminal Prompt Header */}
			<div
				className={`border-gray-600 border-b px-6 py-3 ${theme.secondary} bg-gray-900`}
			>
				<div className="flex items-center space-x-2 text-sm">
					<span className={theme.accent}>marcos@k1ngs-terminal</span>
					<span>:</span>
					<span className={theme.cyan}>~/{activeSection}</span>
					<span className={theme.accent}>$</span>
					<span className="animate-pulse">█</span>
				</div>
			</div>

			{/* Content Area */}
			<div className="h-full overflow-auto">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeSection}
						variants={sectionVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.3 }}
						className="h-full"
					>
						{renderSection()}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default ContentPanel;
