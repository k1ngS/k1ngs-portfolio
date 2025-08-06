import { Link, useLocation } from "@tanstack/react-router";
import {
	Code,
	FileText,
	FolderOpen,
	Lightbulb,
	LogOut,
	Monitor,
	Settings,
	User,
	Wrench,
} from "lucide-react";
import type React from "react";
import { useTheme } from "../../contexts/theme-context";
import { authClient } from "../../lib/auth-client";

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	const { theme } = useTheme();
	const location = useLocation();
	const { data: session } = authClient.useSession();

	const handleSignOut = async () => {
		await authClient.signOut();
		window.location.href = "/login";
	};

	const menuItems = [
		{
			path: "/admin",
			icon: Settings,
			label: "Dashboard",
			exact: true,
		},
		{
			path: "/admin/projects",
			icon: FolderOpen,
			label: "Projetos",
		},
		{
			path: "/admin/skills",
			icon: Code,
			label: "Skills",
		},
		{
			path: "/admin/technologies",
			icon: Wrench,
			label: "Tecnologias",
		},
		{
			path: "/admin/terminal",
			icon: Monitor,
			label: "Terminal",
		},
		{
			path: "/admin/content",
			icon: FileText,
			label: "Conteúdo",
		},
		{
			path: "/admin/implementation-plan",
			icon: Lightbulb,
			label: "Plano de Implementação",
		},
	];

	const isActive = (path: string, exact = false) => {
		if (exact) {
			return location.pathname === path;
		}
		return location.pathname.startsWith(path);
	};

	return (
		<div className={`min-h-screen ${theme.bg} ${theme.primary} font-mono`}>
			{/* Header */}
			<header className={`${theme.secondary} border-b ${theme.accent} p-4`}>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<h1 className={`font-bold text-xl ${theme.primary}`}>
							k1ngs Portfolio - Admin
						</h1>
					</div>

					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<User className="h-4 w-4" />
							<span className={`text-sm ${theme.secondary}`}>
								{session?.user?.name || session?.user?.email}
							</span>
						</div>

						<button
							type="button"
							onClick={handleSignOut}
							className={`flex items-center space-x-2 rounded px-3 py-1 ${theme.accent} hover:${theme.secondary} transition-colors`}
						>
							<LogOut className="h-4 w-4" />
							<span>Sair</span>
						</button>
					</div>
				</div>
			</header>

			<div className="flex">
				{/* Sidebar */}
				<aside
					className={`w-64 ${theme.secondary} border-r ${theme.accent} min-h-[calc(100vh-73px)]`}
				>
					<nav className="p-4">
						<ul className="space-y-2">
							{menuItems.map((item) => {
								const Icon = item.icon;
								const active = isActive(item.path, item.exact);

								return (
									<li key={item.path}>
										<Link
											to={item.path}
											className={`flex items-center space-x-3 rounded px-3 py-2 transition-colors ${
												active
													? `${theme.accent} ${theme.primary}`
													: `${theme.secondary} hover:${theme.accent} hover:${theme.primary}`
											}`}
										>
											<Icon className="h-4 w-4" />
											<span>{item.label}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-6">{children}</main>
			</div>
		</div>
	);
};

export default AdminLayout;
