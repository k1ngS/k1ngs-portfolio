import type { QueryClient } from "@tanstack/react-query";

import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import Loader from "@/components/loader";
import { AppProviders } from "@/providers/app-providers";
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
		],
		title: "k1ngS Portfolio",
		links: [
			{
				rel: "stylesheet",
				href: appCss,
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
				<AppProviders>
					{isFetching ? <Loader /> : <Outlet />}
				</AppProviders>
				<Scripts />
			</body>
		</html>
	);
}
