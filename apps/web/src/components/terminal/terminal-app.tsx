import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import { useTheme } from "../../contexts/theme-context";
import { Toaster } from "../ui/toaster";
import BootSequence from "./boot-sequence";
import Terminal from "./Terminal";

interface TerminalAppProps {
	className?: string;
}

const TerminalApp: React.FC<TerminalAppProps> = ({ className = "" }) => {
	const { theme } = useTheme();
	const [isBooted, setIsBooted] = useState(true); // Skip boot for development
	const [showTerminal, setShowTerminal] = useState(true); // Show terminal directly
	const [isClient, setIsClient] = useState(true);

	// useEffect(() => {
	// 	setIsClient(true);
	// 	// Check if user has seen boot sequence before
	// 	const hasSeenBoot = localStorage.getItem("k1ngs-terminal-booted");

	// 	if (hasSeenBoot) {
	// 		// Skip boot sequence for returning users
	// 		setIsBooted(true);
	// 		setShowTerminal(true);
	// 	}
	// }, []);

	const handleBootComplete = () => {
		setIsBooted(true);
		if (isClient) {
			localStorage.setItem("k1ngs-terminal-booted", "true");
		}

		// Small delay before showing terminal
		setTimeout(() => {
			setShowTerminal(true);
		}, 500);
	};

	const handleReboot = () => {
		setShowTerminal(false);
		setIsBooted(false);
		if (isClient) {
			localStorage.removeItem("k1ngs-terminal-booted");
		}

		// Small delay before starting boot sequence
		setTimeout(() => {
			// Boot sequence will start automatically
		}, 100);
	};

	return (
		<div
			className={`min-h-screen ${theme.bg} font-mono ${theme.primary} ${className}`}
		>
			<AnimatePresence mode="wait">
				{!isBooted && (
					<motion.div
						key="boot"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="h-screen"
					>
						<BootSequence onComplete={handleBootComplete} />
					</motion.div>
				)}

				{isBooted && showTerminal && (
					<motion.div
						key="terminal"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="h-screen"
					>
						<Terminal />
					</motion.div>
				)}
			</AnimatePresence>
			<Toaster />
		</div>
	);
};

export default TerminalApp;
