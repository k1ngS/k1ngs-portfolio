import type React from "react";
import { SetHtmlLang } from "@/components/set-html-language";
import { LanguageProvider } from "../contexts/language-context";
import { ThemeProvider } from "../contexts/theme-context";

export const AppProviders: React.FC<{
	children: React.ReactNode;
	initialTheme?: string;
	initialLanguage?: string;
}> = ({ children, initialTheme = "default", initialLanguage = "pt" }) => {
	return (
		<ThemeProvider initialTheme={initialTheme}>
			<LanguageProvider initialLanguage={initialLanguage}>
				<SetHtmlLang />
				{children}
			</LanguageProvider>
		</ThemeProvider>
	);
};
