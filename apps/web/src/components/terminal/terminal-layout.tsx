import { motion } from "framer-motion";
import { Maximize2, Minimize2, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useTheme } from "../../contexts/theme-context";
import ContentPanel from "./content-panel";
import NavigationPanel from "./navigation-panel";
import StatusPanel from "./status-panel";

interface TerminalLayoutProps {
	onReboot?: () => void;
}

const TerminalLayout: React.FC<TerminalLayoutProps> = () => {
	const { theme } = useTheme();
	const [activeSection, setActiveSection] = useState("about");
	const [isMaximized, setIsMaximized] = useState(true);

	const handleSectionChange = (section: string) => {
		setActiveSection(section);
	};

	return (
		<div className="flex h-screen items-center justify-center p-4">
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className={`flex h-full max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-lg border border-gray-600 shadow-2xl ${theme.bg}`}
			>
				{/* Terminal Header */}
				<div className="flex flex-shrink-0 items-center justify-between border-gray-600 border-b bg-gray-800 px-4 py-2">
					<div className="flex items-center space-x-2">
						<div className="h-3 w-3 cursor-pointer rounded-full bg-red-500 transition-colors hover:bg-red-400" />
						<div className="h-3 w-3 cursor-pointer rounded-full bg-yellow-500 transition-colors hover:bg-yellow-400" />
						<div className="h-3 w-3 cursor-pointer rounded-full bg-green-500 transition-colors hover:bg-green-400" />
					</div>

					<div className={`flex-1 text-center ${theme.primary}`}>
						<span className="font-medium font-mono text-sm">
							marcos@k1ngs-terminal:~/{activeSection}
						</span>
					</div>

					<div className="flex items-center space-x-2">
						<button
							type="button"
							className={`rounded p-1 transition-colors hover:bg-gray-700 ${theme.primary}`}
							onClick={() => setIsMaximized(!isMaximized)}
							title="Minimize"
						>
							<Minimize2 size={14} />
						</button>
						<button
							type="button"
							className={`rounded p-1 transition-colors hover:bg-gray-600 ${theme.primary}`}
							onClick={() => setIsMaximized(!isMaximized)}
							title="Maximize"
						>
							<Maximize2 size={14} />
						</button>
						<button
							type="button"
							className={`rounded p-1 transition-colors hover:bg-red-600 ${theme.primary}`}
							title="Close"
						>
							<X size={14} />
						</button>
					</div>
				</div>

				{/* Terminal Content */}
				<div className="flex min-h-0 flex-1">
					{/* Navigation Panel */}
					<div className="flex w-64 flex-col border-gray-600 border-r">
						{NavigationPanel && (
							<NavigationPanel
								activeSection={activeSection}
								onSectionChange={handleSectionChange}
							/>
						)}
					</div>

					{/* Main Content Panel */}
					<div className="flex min-h-0 flex-1 flex-col">
						<div className="min-h-0 flex-1 overflow-hidden">
							<ContentPanel activeSection={activeSection} />
						</div>

						{/* Status Panel */}
						<div className="flex-shrink-0 border-gray-600 border-t">
							{StatusPanel && <StatusPanel activeSection={activeSection} />}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default TerminalLayout;
