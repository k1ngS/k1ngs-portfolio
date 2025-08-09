import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SetHtmlLang } from "@/components/set-html-language";
import { LanguageProvider } from "../contexts/language-context";
import { ThemeProvider } from "../contexts/theme-context";
import { trpc, trpcClient } from "../utils/trpc";

// Create query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: 2,
		},
	},
});

export const AppProviders: React.FC<{
	children: React.ReactNode;
	initialTheme?: string;
	initialLanguage?: string;
}> = ({ children, initialTheme = "default", initialLanguage = "pt" }) => {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider initialTheme={initialTheme}>
					<LanguageProvider initialLanguage={initialLanguage}>
						<SetHtmlLang />
						{children}
					</LanguageProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
};
