import { motion } from "framer-motion";
import { Brain, Calendar, Coffee, Rocket, Terminal, Zap } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../contexts/language-context";
import { useTheme } from "../../../contexts/theme-context";
import { trpc } from "../../../utils/trpc";

const AboutSection: React.FC = () => {
	const { theme } = useTheme();
	const { currentLanguage } = useLanguage();
	const [typingText, setTypingText] = useState("");
	const [showCursor, setShowCursor] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);

	// Fetch content from backend based on current language
	const { data: welcomeContent } = trpc.content.getByKey.useQuery({
		key: "about.welcome",
		language: currentLanguage,
	});

	const { data: bioContent } = trpc.content.getByKey.useQuery({
		key: "about.bio",
		language: currentLanguage,
	});

	const { data: techStackContent } = trpc.content.getByKey.useQuery({
		key: "about.tech_stack",
		language: currentLanguage,
	});

	const { data: closingContent } = trpc.content.getByKey.useQuery({
		key: "about.closing",
		language: currentLanguage,
	});

	// Fetch stats content from backend
	const { data: linesOfCodeStat } = trpc.content.getByKey.useQuery({
		key: "about.stats.lines_of_code",
		language: currentLanguage,
	});

	const { data: coffeeCupsStat } = trpc.content.getByKey.useQuery({
		key: "about.stats.coffee_cups",
		language: currentLanguage,
	});

	const { data: yearsExperienceStat } = trpc.content.getByKey.useQuery({
		key: "about.stats.years_experience",
		language: currentLanguage,
	});

	const { data: projectsLaunchedStat } = trpc.content.getByKey.useQuery({
		key: "about.stats.projects_launched",
		language: currentLanguage,
	});

	const { data: technologiesMasteredStat } = trpc.content.getByKey.useQuery({
		key: "about.stats.technologies_mastered",
		language: currentLanguage,
	});

	const { data: bugsEliminatedStat } = trpc.content.getByKey.useQuery({
		key: "about.stats.bugs_eliminated",
		language: currentLanguage,
	});

	const fullText = `${welcomeContent?.translation?.value || "Bem-vindo ao meu domínio digital, aventureiro!"}

${bioContent?.translation?.value || "Eu sou Marcos Beltrão (k1ngs), um desenvolvedor full-stack apaixonado por criar experiências digitais únicas e funcionais."}

${techStackContent?.translation?.value || "Em 2025, meu arsenal foi aprimorado com as mais recentes tecnologias:\n• React 19 com recursos concorrentes\n• TypeScript 5.8 com inferência avançada\n• Tailwind CSS 4.0 com novas funcionalidades\n• Arquiteturas serverless e edge computing\n• IA integrada para desenvolvimento assistido"}

${closingContent?.translation?.value || "Quando não estou codificando, você pode me encontrar explorando novas tecnologias, contribuindo para projetos open source, ou planejando a próxima revolução digital."}`;

	const stats = [
		{
			icon: Terminal,
			label: "Linhas de Código",
			value: linesOfCodeStat?.translation?.value || "100,000+",
			color: theme.accent,
			description: "Escritas com paixão",
		},
		{
			icon: Coffee,
			label: "Xícaras de Café",
			value: coffeeCupsStat?.translation?.value || "3,247",
			color: theme.secondary,
			description: "Combustível para criatividade",
		},
		{
			icon: Calendar,
			label: "Anos de Experiência",
			value: yearsExperienceStat?.translation?.value || "4+",
			color: theme.cyan,
			description: "Em constante evolução",
		},
		{
			icon: Rocket,
			label: "Projetos Lançados",
			value: projectsLaunchedStat?.translation?.value || "25+",
			color: theme.accent,
			description: "Do conceito à produção",
		},
		{
			icon: Brain,
			label: "Tecnologias Dominadas",
			value: technologiesMasteredStat?.translation?.value || "20+",
			color: theme.secondary,
			description: "E sempre aprendendo mais",
		},
		{
			icon: Zap,
			label: "Bugs Eliminados",
			value: bugsEliminatedStat?.translation?.value || "∞",
			color: theme.error,
			description: "A batalha nunca termina",
		},
	];

	useEffect(() => {
		let index = 0;
		const timer = setInterval(() => {
			if (index < fullText.length) {
				setTypingText(fullText.slice(0, index + 1));
				index++;
			} else {
				clearInterval(timer);
				setCurrentStep(1);
			}
		}, 20);

		return () => clearInterval(timer);
	}, [fullText.length, fullText.slice]);

	useEffect(() => {
		const cursorTimer = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 500);

		return () => clearInterval(cursorTimer);
	}, []);

	return (
		<div className={`p-6 ${theme.bg} ${theme.primary} h-full overflow-auto`}>
			{/* Terminal Output */}
			<div className="mb-8">
				<div
					className={`whitespace-pre-wrap text-sm leading-relaxed ${theme.primary}`}
				>
					{typingText}
					{showCursor && currentStep === 0 && (
						<span className={`${theme.accent} animate-pulse`}>█</span>
					)}
				</div>
			</div>

			{/* Stats Grid */}
			{currentStep >= 1 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
				>
					{stats.map((stat, index) => {
						const Icon = stat.icon;
						return (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
								className="rounded-lg border border-gray-600 bg-gray-800 p-4 transition-all duration-200 hover:border-gray-500 hover:shadow-lg"
							>
								<div className="mb-2 flex items-center space-x-3">
									<Icon size={20} className={stat.color} />
									<div className="flex-1">
										<div className={`font-bold text-lg ${stat.color}`}>
											{stat.value}
										</div>
										<div className={`text-sm ${theme.primary}`}>
											{stat.label}
										</div>
									</div>
								</div>
								<div className={`text-xs ${theme.secondary} opacity-80`}>
									{stat.description}
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			)}

			{/* Command Prompt */}
			{currentStep >= 1 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 1.5 }}
					className={`mt-8 rounded-lg border border-gray-600 bg-gray-800 p-4 ${theme.primary}`}
				>
					<div className="flex items-center space-x-2 text-sm">
						<span className={theme.accent}>marcos@k1ngs-terminal</span>
						<span>:</span>
						<span className={theme.cyan}>~/about</span>
						<span className={theme.accent}>$</span>
						<span className={theme.secondary}>cat /dev/motivation</span>
					</div>
					<div className={`mt-2 text-sm ${theme.secondary}`}>
						"Code is poetry, bugs are just misplaced semicolons in the
						universe."
					</div>
					<div className="mt-2 flex items-center space-x-2 text-sm">
						<span className={theme.accent}>marcos@k1ngs-terminal</span>
						<span>:</span>
						<span className={theme.cyan}>~/about</span>
						<span className={theme.accent}>$</span>
						<span className="animate-pulse">█</span>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default AboutSection;
