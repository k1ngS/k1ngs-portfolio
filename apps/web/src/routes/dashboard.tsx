import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import TerminalApp from "@/components/terminal/terminal-app";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (!session && !isPending) {
			navigate({
				to: "/login",
			});
		}
	}, [session, isPending, navigate]);

	if (isPending) {
		return (
			<div className="flex h-screen items-center justify-center bg-slate-900 text-green-400">
				<div className="animate-pulse">Inicializando sistema...</div>
			</div>
		);
	}

	return (
		<div className="h-screen overflow-hidden">
			<TerminalApp />
		</div>
	);
}
