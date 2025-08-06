import type { QueryClient } from "@tanstack/react-query";

import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import Loader from "@/components/loader";
import { ErrorBoundary } from "@/components/error-boundary";
import { LanguageProvider } from "../contexts/language-context";
import { ThemeProvider } from "../contexts/theme-context";
import appCss from "../index.css?url";
import type { trpc } from "../utils/trpc";

export interface RouterAppContext {
	trpc: typeof trpc;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				name: "description",
				content: "k1ngS Portfolio - Full Stack Developer specializing in modern web technologies",
			},
			{
				name: "keywords",
				content: "portfolio, full stack developer, react, typescript, node.js, web development",
			},
			{
				name: "author",
				content: "k1ngS",
			},
			{
				property: "og:title",
				content: "k1ngS Portfolio",
			},
			{
				property: "og:description",
				content: "Interactive portfolio showcasing modern web development skills",
			},
			{
				property: "og:type",
				content: "website",
			},
		],
		title: "k1ngS Portfolio",
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico",
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	const isFetching = useRouterState({ select: (s) => s.isLoading });

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ErrorBoundary>
					<ThemeProvider>
						<LanguageProvider>
							{isFetching ? <Loader /> : <Outlet />}
							{/* <TanStackRouterDevtools position="bottom-left" />
							<ReactQueryDevtools
								position="bottom"
								buttonPosition="bottom-right"
							/> */}
						</LanguageProvider>
					</ThemeProvider>
				</ErrorBoundary>
				<Scripts />
			</body>
		</html>
	);
}
