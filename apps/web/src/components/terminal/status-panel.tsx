import { Battery, Clock, Cpu, HardDrive, Wifi } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/language-context";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

interface StatusPanelProps {
	activeSection: string;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ activeSection }) => {
	const { theme } = useTheme();
	const { currentLanguage } = useLanguage();
	const [currentTime, setCurrentTime] = useState(new Date());
	const [cpuUsage] = useState(Math.floor(Math.random() * 30) + 10);
	const [memoryUsage] = useState(Math.floor(Math.random() * 40) + 20);

	// Fetch editable content
	const { data: sectionLabelContent } = trpc.content.getByKey.useQuery({
		key: "terminal.status.section_label",
		language: currentLanguage,
	});
	const { data: readyContent } = trpc.content.getByKey.useQuery({
		key: "terminal.status.ready",
		language: currentLanguage,
	});
	const { data: onlineContent } = trpc.content.getByKey.useQuery({
		key: "terminal.status.online",
		language: currentLanguage,
	});
	const { data: versionContent } = trpc.content.getByKey.useQuery({
		key: "terminal.status.version",
		language: currentLanguage,
	});
	const { data: networkConnectedContent } = trpc.content.getByKey.useQuery({
		key: "terminal.status.network_connected",
		language: currentLanguage,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		});
	};

	const getStatusColor = (usage: number) => {
		if (usage < 30) return theme.secondary;
		if (usage < 60) return theme.accent;
		return theme.error;
	};

	return (
		<div
			className={`px-6 py-2 ${theme.bg} border-gray-600 border-t bg-gray-900`}
		>
			<div className="flex items-center justify-between font-mono text-xs">
				{/* Left side - System stats */}
				<div className="flex items-center space-x-6">
					<div className="flex items-center space-x-1">
						<Cpu size={12} className={theme.secondary} />
						<span className={theme.primary}>CPU:</span>
						<span className={getStatusColor(cpuUsage)}>{cpuUsage}%</span>
					</div>

					<div className="flex items-center space-x-1">
						<HardDrive size={12} className={theme.secondary} />
						<span className={theme.primary}>MEM:</span>
						<span className={getStatusColor(memoryUsage)}>{memoryUsage}%</span>
					</div>

					<div className="flex items-center space-x-1">
						<Wifi size={12} className={theme.secondary} />
						<span className={theme.primary}>NET:</span>
						<span className={theme.secondary}>
							{networkConnectedContent?.translation?.value || "Connected"}
						</span>
					</div>

					<div className="flex items-center space-x-1">
						<Battery size={12} className={theme.secondary} />
						<span className={theme.primary}>PWR:</span>
						<span className={theme.secondary}>∞</span>
					</div>
				</div>

				{/* Center - Current section */}
				<div className="flex items-center space-x-2">
					<span className={theme.primary}>
						{sectionLabelContent?.translation?.value || "Section:"}
					</span>
					<span className={theme.accent}>{activeSection}</span>
					<span className={theme.primary}>|</span>
					<span className={theme.cyan}>
						{readyContent?.translation?.value || "Ready"}
					</span>
				</div>

				{/* Right side - Time and status */}
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-1">
						<Clock size={12} className={theme.secondary} />
						<span className={theme.primary}>{formatTime(currentTime)}</span>
					</div>

					<div className="flex items-center space-x-1">
						<div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
						<span className={theme.secondary}>
							{onlineContent?.translation?.value || "Online"}
						</span>
					</div>

					<div
						className={`rounded px-2 py-1 text-xs ${theme.accent} bg-gray-800`}
					>
						{versionContent?.translation?.value || "v3.0-2025"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StatusPanel;
