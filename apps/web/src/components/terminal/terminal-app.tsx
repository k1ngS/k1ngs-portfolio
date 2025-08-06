import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, User, Folder, Mail, Code, Star, ExternalLink } from "lucide-react";
import { trpc } from "@/utils/trpc";
import ContactForm from "@/components/contact-form";

interface TerminalCommand {
	command: string;
	description: string;
	action: () => void;
}

export default function TerminalApp() {
	const [input, setInput] = useState("");
	const [history, setHistory] = useState<string[]>([]);
	const [currentPath, setCurrentPath] = useState("~/portfolio");
	const [isLoading, setIsLoading] = useState(false);
	const [showContactForm, setShowContactForm] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const terminalRef = useRef<HTMLDivElement>(null);

	// tRPC queries with error handling
	const projectsQuery = trpc.projects.list.useQuery(
		{ limit: 10 },
		{
			retry: 2,
			staleTime: 5 * 60 * 1000, // 5 minutes
		}
	);
	const skillsQuery = trpc.skills.list.useQuery(
		{ limit: 20 },
		{
			retry: 2,
			staleTime: 5 * 60 * 1000, // 5 minutes
		}
	);

	const commands: TerminalCommand[] = [
		{
			command: "help",
			description: "Show available commands",
			action: () => showHelp(),
		},
		{
			command: "about",
			description: "Learn about me",
			action: () => showAbout(),
		},
		{
			command: "projects",
			description: "View my projects",
			action: () => showProjects(),
		},
		{
			command: "skills",
			description: "View my skills",
			action: () => showSkills(),
		},
		{
			command: "contact",
			description: "Open contact form",
			action: () => showContactFormAction(),
		},
		{
			command: "clear",
			description: "Clear the terminal",
			action: () => clearTerminal(),
		},
		{
			command: "theme",
			description: "Toggle theme",
			action: () => toggleTheme(),
		},
	];

	useEffect(() => {
		// Show welcome message on mount
		setHistory([
			"Welcome to k1ngS Portfolio Terminal!",
			"Type 'help' to see available commands.",
			"",
		]);
		
		// Focus input on mount
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		// Auto-scroll to bottom when history changes
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [history]);

	const handleCommand = (cmd: string) => {
		const trimmedCmd = cmd.trim().toLowerCase();
		const newHistory = [...history, `${currentPath} $ ${cmd}`];

		const command = commands.find(c => c.command === trimmedCmd);
		
		if (command) {
			setHistory(newHistory);
			setIsLoading(true);
			setTimeout(() => {
				command.action();
				setIsLoading(false);
			}, 300);
		} else if (trimmedCmd === "") {
			setHistory(newHistory);
		} else {
			setHistory([...newHistory, `Command not found: ${trimmedCmd}`, "Type 'help' for available commands.", ""]);
		}
		
		setInput("");
	};

	const showHelp = () => {
		const helpText = [
			"Available Commands:",
			"",
			...commands.map(cmd => `  ${cmd.command.padEnd(12)} - ${cmd.description}`),
			"",
		];
		setHistory(prev => [...prev, ...helpText]);
	};

	const showAbout = () => {
		const aboutText = [
			"About k1ngS",
			"================",
			"",
			"🚀 Full Stack Developer with passion for modern technologies",
			"💻 Specialized in TypeScript, React, Node.js, and cloud technologies",
			"🎯 Building scalable and performant web applications",
			"📚 Continuous learner and technology enthusiast",
			"",
			"Location: [Your Location]",
			"Experience: [Years] years",
			"",
		];
		setHistory(prev => [...prev, ...aboutText]);
	};

	const showProjects = () => {
		if (projectsQuery.isLoading) {
			setHistory(prev => [...prev, "Loading projects...", ""]);
			return;
		}

		if (projectsQuery.error) {
			setHistory(prev => [...prev, "Error loading projects. Please try again.", ""]);
			return;
		}

		const projects = projectsQuery.data || [];
		const projectText = [
			"My Projects",
			"=============",
			"",
		];

		if (projects.length === 0) {
			projectText.push("No projects found. Check back soon!");
		} else {
			projects.forEach((project, index) => {
				projectText.push(`${index + 1}. ${project.title}`);
				projectText.push(`   ${project.description}`);
				projectText.push(`   Category: ${project.category}`);
				if (project.githubUrl) {
					projectText.push(`   GitHub: ${project.githubUrl}`);
				}
				if (project.demoUrl) {
					projectText.push(`   Demo: ${project.demoUrl}`);
				}
				projectText.push("");
			});
		}

		setHistory(prev => [...prev, ...projectText]);
	};

	const showSkills = () => {
		if (skillsQuery.isLoading) {
			setHistory(prev => [...prev, "Loading skills...", ""]);
			return;
		}

		if (skillsQuery.error) {
			setHistory(prev => [...prev, "Error loading skills. Please try again.", ""]);
			return;
		}

		const skills = skillsQuery.data || [];
		const skillsByCategory = skills.reduce((acc, skill) => {
			if (!acc[skill.category]) {
				acc[skill.category] = [];
			}
			acc[skill.category].push(skill);
			return acc;
		}, {} as Record<string, typeof skills>);

		const skillText = [
			"My Skills",
			"==========",
			"",
		];

		Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
			skillText.push(`${category}:`);
			categorySkills.forEach(skill => {
				const levelBar = "█".repeat(Math.floor(skill.level / 10)) + "░".repeat(10 - Math.floor(skill.level / 10));
				skillText.push(`  ${skill.name.padEnd(20)} [${levelBar}] ${skill.level}%`);
			});
			skillText.push("");
		});

		setHistory(prev => [...prev, ...skillText]);
	};

	const showContact = () => {
		const contactText = [
			"Contact Information",
			"===================",
			"",
			"📧 Email: your.email@example.com",
			"💼 LinkedIn: https://linkedin.com/in/yourprofile",
			"🐙 GitHub: https://github.com/yourusername",
			"🌐 Website: https://yourwebsite.com",
			"",
			"Type 'contact' to open the contact form!",
			"",
		];
		setHistory(prev => [...prev, ...contactText]);
	};

	const showContactFormAction = () => {
		setShowContactForm(true);
		setHistory(prev => [...prev, "Opening contact form...", ""]);
	};

	const clearTerminal = () => {
		setHistory([]);
		setShowContactForm(false);
	};

	const toggleTheme = () => {
		// This would integrate with your theme context
		setHistory(prev => [...prev, "Theme toggle functionality would be implemented here.", ""]);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleCommand(input);
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 text-green-400 font-mono">
			<motion.div 
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="container mx-auto px-4 py-8"
			>
				{/* Terminal Header */}
				<div className="flex items-center gap-2 mb-4">
					<Terminal className="w-6 h-6" />
					<h1 className="text-xl font-bold">k1ngS Portfolio Terminal</h1>
				</div>

				{/* Terminal Window */}
				<div className="bg-black border border-gray-700 rounded-lg overflow-hidden shadow-2xl">
					{/* Terminal Title Bar */}
					<div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-red-500"></div>
							<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
							<div className="w-3 h-3 rounded-full bg-green-500"></div>
						</div>
						<span className="text-sm text-gray-400">portfolio-terminal</span>
						<div className="w-16"></div>
					</div>

					{/* Terminal Content */}
					<div 
						ref={terminalRef}
						className="p-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
					>
						{/* Command History */}
						{history.map((line, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2, delay: index * 0.05 }}
								className="mb-1"
							>
								{line}
							</motion.div>
						))}

						{/* Loading Indicator */}
						{isLoading && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex items-center gap-2"
							>
								<span>Processing...</span>
								<div className="animate-pulse">_</div>
							</motion.div>
						)}

						{/* Current Input Line */}
						<div className="flex items-center gap-2 mt-2">
							<span className="text-blue-400">{currentPath}</span>
							<span className="text-white">$</span>
							<input
								ref={inputRef}
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								className="flex-1 bg-transparent outline-none text-green-400"
								placeholder="Type a command..."
								autoComplete="off"
								spellCheck={false}
							/>
							<div className="w-2 h-5 bg-green-400 animate-pulse"></div>
						</div>
					</div>
				</div>

				{/* Quick Commands */}
				<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
					{commands.slice(0, 4).map((cmd) => (
						<motion.button
							key={cmd.command}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => handleCommand(cmd.command)}
							className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors"
						>
							{cmd.command === "about" && <User className="w-4 h-4" />}
							{cmd.command === "projects" && <Folder className="w-4 h-4" />}
							{cmd.command === "skills" && <Code className="w-4 h-4" />}
							{cmd.command === "contact" && <Mail className="w-4 h-4" />}
							<span className="text-sm">{cmd.command}</span>
						</motion.button>
					))}
				</div>

				{/* Footer */}
				<div className="mt-8 text-center text-gray-500 text-sm">
					<p>Built with React, TypeScript, and ❤️</p>
					<p>Type 'help' for all available commands</p>
				</div>
			</motion.div>

			{/* Contact Form Modal */}
			{showContactForm && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
					onClick={() => setShowContactForm(false)}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-bold text-green-400">Contact Form</h2>
							<button
								onClick={() => setShowContactForm(false)}
								className="text-gray-400 hover:text-white"
							>
								✕
							</button>
						</div>
						<ContactForm
							embedded
							onSuccess={() => {
								setShowContactForm(false);
								setHistory(prev => [...prev, "Message sent successfully!", ""]);
							}}
						/>
					</motion.div>
				</motion.div>
			)}
		</div>
	);
}