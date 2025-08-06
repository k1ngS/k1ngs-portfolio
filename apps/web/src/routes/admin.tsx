import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/admin")({
	component: AdminLayout,
});

function AdminLayout() {
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
				<div className="animate-pulse">Carregando painel administrativo...</div>
			</div>
		);
	}

	if (!session) {
		return null;
	}

	return (
		<div className="min-h-screen bg-slate-900">
			<Outlet />
		</div>
	);
}
