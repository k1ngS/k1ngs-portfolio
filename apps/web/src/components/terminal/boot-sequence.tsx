import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/language-context";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

interface BootSequenceProps {
	onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
	const { theme } = useTheme();
	const { currentLanguage } = useLanguage();
	const [currentLine, setCurrentLine] = useState(0);
	const [showCursor, setShowCursor] = useState(true);
	const [bootPhase, setBootPhase] = useState<
		"power" | "bios" | "loading" | "ascii" | "welcome" | "complete"
	>("power");
	const [biosText, setBiosText] = useState("");
	const [showScanlines, _setShowScanlines] = useState(true);
	const [powerProgress, setPowerProgress] = useState(0);
	const [systemChecks, setSystemChecks] = useState<string[]>([]);
	const [glitchEffect, setGlitchEffect] = useState(false);

	// Fetch editable content
	const { data: titleContent } = trpc.content.getByKey.useQuery({
		key: "terminal.boot.title",
		language: currentLanguage,
	});
	const { data: welcomeContent } = trpc.content.getByKey.useQuery({
		key: "terminal.boot.welcome",
		language: currentLanguage,
	});
	const { data: techIntroContent } = trpc.content.getByKey.useQuery({
		key: "terminal.boot.tech_intro",
		language: currentLanguage,
	});
	const { data: helpTextContent } = trpc.content.getByKey.useQuery({
		key: "terminal.boot.help_text",
		language: currentLanguage,
	});
	const { data: readyContent } = trpc.content.getByKey.useQuery({
		key: "terminal.boot.ready",
		language: currentLanguage,
	});

	// BIOS-style boot messages
	const biosMessages = [
		"K1NGS BIOS v3.0.2025 - Copyright (C) 2025 Marcos K1ngs Systems",
		"CPU: Intel Core i9-13900K @ 3.00GHz (24 cores)",
		"Memory Test: 32768MB OK",
		"Detecting IDE drives...",
		"Primary Master: K1NGS-SSD-1TB",
		"Primary Slave: PORTFOLIO-DATA",
		"Secondary Master: PROJECTS-ARCHIVE",
		"Secondary Slave: SKILLS-DATABASE",
		"",
		"Press DEL to enter SETUP, F12 for Boot Menu",
		"Booting from K1NGS-SSD-1TB...",
		"",
	];

	// Linux-style boot messages
	const bootMessages = [
		"K1NGS Linux 6.8.0-k1ngs #1 SMP PREEMPT_DYNAMIC",
		"Loading initial ramdisk...",
		"[    0.000000] Linux version 6.8.0-k1ngs (marcos@k1ngs-dev)",
		"[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-k1ngs ro quiet splash",
		"[    0.001234] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'",
		"[    0.002456] x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'",
		"[    0.003678] BIOS-provided physical RAM map:",
		"[    0.004890] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable",
		"[    0.006102] BIOS-e820: [mem 0x0000000100000000-0x000000081fffffff] usable",
		"[    0.007314] DMI: K1ngs Systems Portfolio/K1NGS-MAIN, BIOS v3.0 01/15/2025",
		"[    0.123456] PCI: Using configuration type 1 for base access",
		"[    0.234567] HugeTLB registered 2.00 MiB page size, pre-allocated 0 pages",
		"[    0.345678] ACPI: Added _OSI(Module Device)",
		"[    0.456789] ACPI: Added _OSI(Processor Device)",
		"[    0.567890] ACPI: Added _OSI(3.0 _SCP Extensions)",
		"[    0.678901] ACPI: Added _OSI(Processor Aggregator Device)",
		"[    0.789012] SCSI subsystem initialized",
		"[    0.890123] usbcore: registered new interface driver usbfs",
		"[    0.901234] PCI: Probing PCI hardware",
		"[    1.012345] NET: Registered protocol family 16",
		"[    1.123456] portfolio: Loading K1ngs Portfolio System v3.0",
		"[    1.234567] portfolio: Initializing developer profile...",
		"[    1.345678] portfolio: Loading skills database... [OK]",
		"[    1.456789] portfolio: Mounting projects filesystem... [OK]",
		"[    1.567890] portfolio: Starting contact services... [OK]",
		"[    1.678901] portfolio: Initializing terminal interface... [OK]",
		"[    1.789012] NET: Registered protocol family 2",
		"[    1.890123] TCP established hash table entries: 524288",
		"[    1.901234] TCP bind hash table entries: 65536",
		"[    2.012345] Freeing unused kernel memory: 2048K",
		"[    2.123456] systemd[1]: systemd 255 running in system mode",
		"[    2.234567] systemd[1]: Detected architecture x86-64",
		"[    2.345678] systemd[1]: Set hostname to <k1ngs-portfolio>",
		"[    2.456789] systemd[1]: Reached target Local File Systems",
		"[    2.567890] systemd[1]: Starting Create Volatile Files and Directories...",
		"[    2.678901] systemd[1]: Started Create Volatile Files and Directories",
		"[    2.789012] systemd[1]: Starting Network Service...",
		"[    2.890123] systemd[1]: Started Network Service",
		"[    2.901234] systemd[1]: Reached target Network",
		"[    3.012345] systemd[1]: Starting K1ngs Portfolio Service...",
		"[    3.123456] k1ngs-portfolio[1337]: Starting portfolio terminal interface",
		"[    3.234567] k1ngs-portfolio[1337]: Loading developer profile: Marcos K1ngs",
		"[    3.345678] k1ngs-portfolio[1337]: Initializing skill tree...",
		"[    3.456789] k1ngs-portfolio[1337]: Loading project database...",
		"[    3.567890] k1ngs-portfolio[1337]: Starting contact daemon...",
		"[    3.678901] systemd[1]: Started K1ngs Portfolio Service",
		"[    3.789012] systemd[1]: Reached target Multi-User System",
		"[    3.890123] systemd[1]: Starting Terminal Login Service...",
		"[    3.901234] systemd[1]: Started Terminal Login Service",
		"",
		"K1ngs Linux 6.8.0-k1ngs k1ngs-portfolio tty1",
		"",
		"██╗  ██╗ ██╗███╗   ██╗ ██████╗ ███████╗    ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ ",
		"██║ ██╔╝███║████╗  ██║██╔════╝ ██╔════╝    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗",
		"█████╔╝ ╚██║██╔██╗ ██║██║  ███╗███████╗    ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║",
		"██╔═██╗  ██║██║╚██╗██║██║   ██║╚════██║    ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║",
		"██║  ██╗ ██║██║ ╚████║╚██████╔╝███████║    ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝",
		"╚═╝  ╚═╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ ",
		"",
		"                                    ██╗   ██╗██████╗     ██████╗  ██████╗ ██████╗ ███████╗",
		"                                    ██║   ██║╚════██╗   ██╔═████╗██╔═████╗╚════██╗██╔════╝",
		"                                    ██║   ██║ █████╔╝   ██║██╔██║██║██╔██║ █████╔╝███████╗",
		"                                    ╚██╗ ██╔╝ ╚═══██╗   ████╔╝██║████╔╝██║██╔═══╝ ╚════██║",
		"                                     ╚████╔╝ ██████╔╝██╗╚██████╔╝╚██████╔╝███████╗███████║",
		"                                      ╚═══╝  ╚═════╝ ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝",
		"",
		welcomeContent?.translation?.value ||
			"Welcome, digital explorer! You are about to enter the enhanced realm of k1ngs.",
		techIntroContent?.translation?.value ||
			"This terminal has been upgraded with 2025 technologies including:",
		"• React 19 with concurrent features",
		"• TanStack Router for lightning-fast navigation",
		"• Tailwind CSS 4.0 with new features",
		"• TypeScript 5.8 with advanced type inference",
		"• Framer Motion for smooth animations",
		"",
		helpTextContent?.translation?.value ||
			'Type "help" for available commands or navigate using the enhanced interface.',
		"",
		readyContent?.translation?.value ||
			"Quantum system ready. Initializing holographic interface...",
	];

	// Power-on phase effect
	useEffect(() => {
		if (bootPhase === "power") {
			const powerSequence = async () => {
				// Power-on animation
				for (let i = 0; i <= 100; i += 2) {
					setPowerProgress(i);
					await new Promise((resolve) => setTimeout(resolve, 30));
				}
				// Brief glitch effect
				setGlitchEffect(true);
				await new Promise((resolve) => setTimeout(resolve, 200));
				setGlitchEffect(false);
				// Transition to BIOS
				await new Promise((resolve) => setTimeout(resolve, 500));
				setBootPhase("bios");
			};
			powerSequence();
		}
	}, [bootPhase]);

	// BIOS phase effect
	useEffect(() => {
		if (bootPhase === "bios") {
			const biosSequence = async () => {
				// System checks animation
				const checks = [
					"CPU: Intel Core i9-13900K @ 3.0GHz",
					"RAM: 32GB DDR5-5600 OK",
					"GPU: NVIDIA RTX 4090 24GB",
					"Storage: 2TB NVMe SSD",
					"Network: Gigabit Ethernet",
					"USB: 8 Ports Detected",
					"Audio: Realtek HD Audio",
				];

				for (let i = 0; i < checks.length; i++) {
					setSystemChecks((prev) => [...prev, checks[i]]);
					await new Promise((resolve) => setTimeout(resolve, 300));
				}

				// Simulate BIOS text typing
				for (let i = 0; i < biosMessages.length; i++) {
					await new Promise((resolve) =>
						setTimeout(resolve, i < 3 ? 800 : 400),
					);
					setBiosText((prev) => `${prev + biosMessages[i]}\n`);
				}
				// Wait a bit then transition to loading phase
				await new Promise((resolve) => setTimeout(resolve, 1500));
				setBootPhase("loading");
			};
			biosSequence();
		}
	}, [bootPhase]);

	// Main boot sequence effect
	useEffect(() => {
		if (
			(bootPhase === "loading" ||
				bootPhase === "ascii" ||
				bootPhase === "welcome") &&
			currentLine < bootMessages.length
		) {
			const timer = setTimeout(
				() => {
					setCurrentLine((prev) => prev + 1);
					// Transition to ASCII phase when we reach the ASCII art (index 47)
					if (currentLine === 47) {
						setBootPhase("ascii");
					}
					// Transition to welcome phase after ASCII art (index 55)
					if (currentLine === 55) {
						setBootPhase("welcome");
					}
				},
				// Faster for kernel messages, slower for important ones
				currentLine < 20
					? 50
					: currentLine < 40
						? 80
						: currentLine < 47
							? 120
							: currentLine < 55
								? 200
								: 150,
			);

			return () => clearTimeout(timer);
		}
		if (
			(bootPhase === "loading" ||
				bootPhase === "ascii" ||
				bootPhase === "welcome") &&
			currentLine >= bootMessages.length
		) {
			// Boot sequence complete
			setBootPhase("complete");
			setTimeout(() => {
				onComplete();
			}, 2000);
		}
	}, [currentLine, bootPhase, onComplete, bootMessages.length]);

	useEffect(() => {
		// Cursor blinking effect
		const cursorTimer = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 500);

		return () => clearInterval(cursorTimer);
	}, []);

	return (
		<div
			className={`terminal-boot relative h-screen w-full overflow-hidden font-mono text-green-400 ${
				glitchEffect ? "animate-pulse" : ""
			}`}
		>
			{/* Enhanced CRT effects */}
			{showScanlines && (
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/10 to-transparent opacity-30" />
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/5 to-transparent opacity-20" />
				</div>
			)}

			{/* Glitch overlay */}
			{glitchEffect && (
				<div className="absolute inset-0 animate-ping bg-red-500/20" />
			)}

			{/* Power-on Phase */}
			{bootPhase === "power" && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="flex h-full items-center justify-center"
				>
					<div className="space-y-8 text-center">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5 }}
							className="font-bold text-6xl text-green-400"
						>
							⚡
						</motion.div>
						<div className="font-bold text-white text-xl">
							INITIALIZING SYSTEM
						</div>
						<div className="h-2 w-64 overflow-hidden rounded-full bg-gray-800">
							<motion.div
								className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
								style={{ width: `${powerProgress}%` }}
								initial={{ width: 0 }}
								animate={{ width: `${powerProgress}%` }}
							/>
						</div>
						<div className="text-green-400 text-lg">{powerProgress}%</div>
					</div>
				</motion.div>
			)}

			{/* BIOS Phase */}
			{bootPhase === "bios" && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="p-4 text-sm text-white leading-relaxed"
				>
					{/* System checks */}
					<div className="mb-6">
						<div className="mb-2 font-bold text-cyan-400">
							K1NGS BIOS v3.2025 - System Check
						</div>
						<div className="mb-4 border border-gray-600 p-2">
							{systemChecks.map((check, index) => (
								<motion.div
									key={`system-check-${check}`}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									className="mb-1 text-green-400"
								>
									[✓] {check}
								</motion.div>
							))}
						</div>
					</div>

					<pre className="boot-text whitespace-pre-wrap">{biosText}</pre>
					{showCursor && (
						<span className="boot-cursor ml-1 inline-block h-4 w-2 bg-white" />
					)}
				</motion.div>
			)}

			{/* Linux Boot Phase */}
			{(bootPhase === "loading" ||
				bootPhase === "ascii" ||
				bootPhase === "welcome") && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="relative h-full overflow-hidden p-4 text-xs leading-tight"
				>
					{/* Boot progress indicator */}
					<div className="absolute top-2 right-4 flex items-center space-x-2">
						<div className="text-green-400 text-xs">
							Boot Progress:{" "}
							{Math.round((currentLine / bootMessages.length) * 100)}%
						</div>
						<div className="h-1 w-20 rounded bg-gray-700">
							<div
								className="h-full rounded bg-green-400 transition-all duration-300"
								style={{
									width: `${(currentLine / bootMessages.length) * 100}%`,
								}}
							/>
						</div>
					</div>

					<div className="mt-6 space-y-0">
						{bootMessages.slice(0, currentLine).map((message, index) => {
							// Determine message color based on content
							let colorClass = "text-white";
							let glowEffect = "";
							if (message.includes("[OK]")) {
								colorClass = "text-green-400";
								glowEffect = "drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]";
							} else if (
								message.includes("ERROR") ||
								message.includes("FAILED")
							) {
								colorClass = "text-red-400";
								glowEffect = "drop-shadow-[0_0_3px_rgba(248,113,113,0.5)]";
							} else if (message.includes("WARNING")) {
								colorClass = "text-yellow-400";
								glowEffect = "drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]";
							} else if (message.includes("portfolio:"))
								colorClass = "text-cyan-400";
							else if (message.includes("systemd"))
								colorClass = "text-blue-400";
							else if (message.includes("k1ngs-portfolio"))
								colorClass = "text-purple-400";
							else if (message.includes("██")) {
								colorClass = "text-green-400 font-bold";
								glowEffect = "drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]";
							} else if (message.startsWith("[")) colorClass = "text-gray-300";

							// Use a stable key based on message content and index for duplicates
							const key = `boot-${message}-${index}`;

							return (
								<motion.div
									key={key}
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.1 }}
									className={`${colorClass} ${glowEffect} ${
										message.includes("██")
											? "boot-text text-[8px] leading-none"
											: "boot-text"
									}`}
								>
									{message === "" ? "\u00A0" : message}
								</motion.div>
							);
						})}

						{/* Enhanced blinking cursor during boot */}
						{bootPhase === "loading" && currentLine < bootMessages.length && (
							<motion.span
								className="boot-cursor inline-block h-3 w-2 bg-green-400"
								animate={{ opacity: [1, 0, 1] }}
								transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
							/>
						)}
					</div>
				</motion.div>
			)}

			{/* Enhanced Login prompt phase */}
			{bootPhase === "complete" && (
				<div className="flex h-full items-center justify-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1, ease: "easeOut" }}
						className="space-y-6 rounded-lg border border-green-400/30 bg-black/50 p-8 text-center backdrop-blur-sm"
					>
						{/* Welcome header */}
						<motion.div
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="font-bold text-2xl text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
						>
							🚀 SYSTEM READY
						</motion.div>

						{/* Login simulation */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6, duration: 0.8 }}
							className="space-y-3 text-left font-mono"
						>
							<div className="text-white">
								k1ngs-portfolio login:{" "}
								<span className="animate-pulse text-green-400">visitor</span>
							</div>
							<div className="text-white">
								Password: <span className="text-green-400">••••••••</span>
							</div>
							<div className="text-green-400 text-sm">
								Last login: {new Date().toLocaleDateString()} from 127.0.0.1
							</div>
						</motion.div>

						{/* Loading animation */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1, duration: 0.8 }}
							className="flex flex-col items-center space-y-4"
						>
							<div className="flex items-center space-x-3">
								<motion.div
									className="h-3 w-3 rounded-full bg-green-400"
									animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
									transition={{
										duration: 1.5,
										repeat: Number.POSITIVE_INFINITY,
										delay: 0,
									}}
								/>
								<motion.div
									className="h-3 w-3 rounded-full bg-green-400"
									animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
									transition={{
										duration: 1.5,
										repeat: Number.POSITIVE_INFINITY,
										delay: 0.3,
									}}
								/>
								<motion.div
									className="h-3 w-3 rounded-full bg-green-400"
									animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
									transition={{
										duration: 1.5,
										repeat: Number.POSITIVE_INFINITY,
										delay: 0.6,
									}}
								/>
							</div>
							<div className="animate-pulse font-semibold text-green-400 text-lg">
								Initializing Terminal Interface...
							</div>
							<div className="text-cyan-400 text-sm">
								Powered by React 19 • TypeScript 5.8 • Tailwind CSS 4.0
							</div>
						</motion.div>
					</motion.div>
				</div>
			)}
		</div>
	);
};

export default BootSequence;
