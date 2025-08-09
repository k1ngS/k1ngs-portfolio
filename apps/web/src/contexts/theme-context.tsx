import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface Theme {
	name: string;
	bg: string;
	primary: string;
	secondary: string;
	accent: string;
	cyan: string;
	error: string;
}

interface ThemeContextType {
	currentTheme: string;
	theme: Theme;
	themes: Record<string, Theme>;
	changeTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		return {
			currentTheme: "default",
			theme: themes.default,
			themes,
			changeTheme: () => {},
		}
	}
	return context;
};

const themes: Record<string, Theme> = {
	default: {
		name: "Terminal Clássico",
		bg: "bg-slate-900",
		primary: "text-slate-100",
		secondary: "text-green-400",
		accent: "text-amber-400",
		cyan: "text-cyan-400",
		error: "text-red-400",
	},
	green: {
		name: "Verde Fósforo",
		bg: "bg-black",
		primary: "text-green-400",
		secondary: "text-green-300",
		accent: "text-yellow-400",
		cyan: "text-green-400",
		error: "text-red-400",
	},
	amber: {
		name: "Âmbar Clássico",
		bg: "bg-amber-950",
		primary: "text-amber-200",
		secondary: "text-amber-300",
		accent: "text-yellow-400",
		cyan: "text-amber-400",
		error: "text-red-400",
	},
	blue: {
		name: "Azul Ártico",
		bg: "bg-blue-950",
		primary: "text-blue-100",
		secondary: "text-blue-300",
		accent: "text-cyan-400",
		cyan: "text-cyan-400",
		error: "text-red-400",
	},
	cyberpunk: {
		name: "Cyberpunk 2025",
		bg: "bg-purple-950",
		primary: "text-pink-100",
		secondary: "text-pink-400",
		accent: "text-cyan-400",
		cyan: "text-cyan-300",
		error: "text-red-400",
	},
	matrix: {
		name: "Matrix Code",
		bg: "bg-black",
		primary: "text-green-500",
		secondary: "text-green-300",
		accent: "text-lime-400",
		cyan: "text-green-400",
		error: "text-red-500",
	},
	retro: {
		name: "Retro Wave",
		bg: "bg-gradient-to-b from-purple-900 to-pink-900",
		primary: "text-pink-200",
		secondary: "text-purple-300",
		accent: "text-cyan-400",
		cyan: "text-cyan-300",
		error: "text-red-400",
	},
	neon: {
		name: "Neon Dreams",
		bg: "bg-gray-900",
		primary: "text-white",
		secondary: "text-blue-400",
		accent: "text-pink-500",
		cyan: "text-cyan-400",
		error: "text-red-500",
	},
	dracula: {
		name: "Dracula",
		bg: "bg-gray-800",
		primary: "text-purple-200",
		secondary: "text-purple-400",
		accent: "text-pink-400",
		cyan: "text-cyan-400",
		error: "text-red-400",
	},
	monokai: {
		name: "Monokai Pro",
		bg: "bg-gray-900",
		primary: "text-gray-100",
		secondary: "text-yellow-400",
		accent: "text-pink-400",
		cyan: "text-cyan-400",
		error: "text-red-400",
	},
	solarized: {
		name: "Solarized Dark",
		bg: "bg-slate-800",
		primary: "text-slate-200",
		secondary: "text-blue-400",
		accent: "text-yellow-500",
		cyan: "text-cyan-400",
		error: "text-red-400",
	},
	nord: {
		name: "Nord",
		bg: "bg-slate-900",
		primary: "text-slate-200",
		secondary: "text-blue-300",
		accent: "text-teal-400",
		cyan: "text-cyan-300",
		error: "text-red-400",
	},
	gruvbox: {
		name: "Gruvbox",
		bg: "bg-yellow-900",
		primary: "text-yellow-100",
		secondary: "text-yellow-300",
		accent: "text-orange-400",
		cyan: "text-blue-300",
		error: "text-red-400",
	},
	tokyo: {
		name: "Tokyo Night",
		bg: "bg-indigo-950",
		primary: "text-indigo-100",
		secondary: "text-indigo-300",
		accent: "text-purple-400",
		cyan: "text-cyan-400",
		error: "text-red-400",
	},
	hacker: {
		name: "Hacker Terminal",
		bg: "bg-black",
		primary: "text-lime-400",
		secondary: "text-green-500",
		accent: "text-yellow-400",
		cyan: "text-cyan-400",
		error: "text-red-500",
	},
};

interface ThemeProviderProps {
	children: React.ReactNode;
	initialTheme?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme = "default" }) => {
	const [currentTheme, setCurrentTheme] = useState(initialTheme);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const savedTheme = typeof window !== "undefined"
			? localStorage.getItem("terminal-theme")
			: null;
		if (savedTheme && themes[savedTheme]) {
			setCurrentTheme(savedTheme);
		}
		setHydrated(true)
	}, []);

	const changeTheme = (themeName: string) => {
		if (themes[themeName]) {
			setCurrentTheme(themeName);
			if (typeof window !== "undefined") {
				localStorage.setItem("terminal-theme", themeName);
			}
		}
	};

	const value: ThemeContextType = {
		currentTheme,
		theme: themes[currentTheme] ?? themes.default,
		themes,
		changeTheme,
	};

	return (
		<ThemeContext.Provider value={value}>
			<div className={themes[currentTheme]?.bg || themes.default.bg} style={!hydrated ? { transition: "none" } : undefined}>{children}</div>
		</ThemeContext.Provider>
	);
};
