import { Link, useRouteContext } from "@tanstack/react-router";
import {
	Activity,
	Code,
	FileText,
	FolderOpen,
	TrendingUp,
	Wrench,
} from "lucide-react";
import type React from "react";
import AdminLayout from "../../components/admin/admin-layout";
import { useTheme } from "../../contexts/theme-context";
import { trpc } from "../../utils/trpc";

const AdminDashboard: React.FC = () => {
	const { theme } = useTheme();

	// Real tRPC data fetching
	useRouteContext({ from: "__root__" });

	const { data: projectsData } = trpc.projects.adminList.useQuery({
		limit: 100,
		offset: 0,
	});
	const { data: skillsData } = trpc.skills.adminList.useQuery({});
	const { data: technologiesData } = trpc.technologies.adminList.useQuery({
		limit: 100,
		offset: 0,
	});
	const { data: contentData } = trpc.content.adminList.useQuery({
		limit: 100,
		offset: 0,
	});

	const projectsStats = { total: projectsData?.projects?.length || 0 };
	const skillsStats = { total: skillsData?.skills?.length || 0 };
	const technologiesStats = {
		total: technologiesData?.technologies?.length || 0,
	};
	const contentStats = { total: contentData?.contents?.length || 0 };

	const stats = [
		{
			title: "Projetos",
			value: projectsStats?.total || 0,
			icon: FolderOpen,
			color: "text-blue-400",
			bgColor: "bg-blue-400/10",
			href: "/admin/projects",
		},
		{
			title: "Skills",
			value: skillsStats?.total || 0,
			icon: Code,
			color: "text-green-400",
			bgColor: "bg-green-400/10",
			href: "/admin/skills",
		},
		{
			title: "Tecnologias",
			value: technologiesStats?.total || 0,
			icon: Wrench,
			color: "text-yellow-400",
			bgColor: "bg-yellow-400/10",
			href: "/admin/technologies",
		},
		{
			title: "Conteúdos",
			value: contentStats?.total || 0,
			icon: FileText,
			color: "text-purple-400",
			bgColor: "bg-purple-400/10",
			href: "/admin/content",
		},
	];

	const recentActivities = [
		{
			action: "Projeto criado",
			item: "Portfolio Terminal",
			time: "2 horas atrás",
			icon: FolderOpen,
		},
		{
			action: "Skill atualizada",
			item: "React",
			time: "5 horas atrás",
			icon: Code,
		},
		{
			action: "Tecnologia adicionada",
			item: "Next.js",
			time: "1 dia atrás",
			icon: Wrench,
		},
		{
			action: "Conteúdo editado",
			item: "about.intro",
			time: "2 dias atrás",
			icon: FileText,
		},
	];

	return (
		<AdminLayout>
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className={`font-bold text-3xl ${theme.primary} mb-2`}>
						Dashboard Administrativo
					</h1>
					<p className={`${theme.secondary}`}>
						Gerencie o conteúdo do seu portfolio
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat) => {
						const Icon = stat.icon;
						return (
							<Link
								key={stat.title}
								to={stat.href}
								className={`${theme.secondary} border ${theme.accent} block cursor-pointer rounded-lg p-6 transition-colors hover:border-opacity-50`}
							>
								<div className="flex items-center justify-between">
									<div>
										<p className={`text-sm ${theme.secondary} opacity-70`}>
											{stat.title}
										</p>
										<p className={`font-bold text-2xl ${theme.primary} mt-1`}>
											{stat.value}
										</p>
									</div>
									<div className={`rounded-lg p-3 ${stat.bgColor}`}>
										<Icon className={`h-6 w-6 ${stat.color}`} />
									</div>
								</div>
							</Link>
						);
					})}
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{/* Recent Activity */}
					<div
						className={`${theme.secondary} border ${theme.accent} rounded-lg p-6`}
					>
						<div className="mb-4 flex items-center space-x-2">
							<Activity className={`h-5 w-5 ${theme.primary}`} />
							<h2 className={`font-semibold text-xl ${theme.primary}`}>
								Atividade Recente
							</h2>
						</div>

						<div className="space-y-4">
							{recentActivities.map((activity) => {
								const Icon = activity.icon;
								const key = `${activity.action}-${activity.item}`;
								return (
									<div key={key} className="flex items-center space-x-3">
										<div
											className={`rounded-lg p-2 ${theme.accent} bg-opacity-20`}
										>
											<Icon className={`h-4 w-4 ${theme.secondary}`} />
										</div>
										<div className="flex-1">
											<p className={`text-sm ${theme.primary}`}>
												<span className={"font-medium"}>
													{activity.action}:
												</span>{" "}
												{activity.item}
											</p>
											<p className={`text-xs ${theme.secondary}`}>
												{activity.time}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Quick Actions */}
					<div
						className={`${theme.secondary} border ${theme.accent} rounded-lg p-6`}
					>
						<div className="mb-4 flex items-center space-x-2">
							<TrendingUp className={`h-5 w-5 ${theme.primary}`} />
							<h2 className={`font-semibold text-xl ${theme.primary}`}>
								Ações Rápidas
							</h2>
						</div>

						<div className="space-y-3">
							<Link
								to="/admin/projects"
								className={`w-full rounded-lg p-3 text-left ${theme.accent} block bg-opacity-20 transition-colors hover:bg-opacity-30`}
							>
								<div className="flex items-center space-x-3">
									<FolderOpen className={`h-4 w-4 ${theme.primary}`} />
									<span className={`${theme.primary}`}>Gerenciar Projetos</span>
								</div>
							</Link>

							<Link
								to="/admin/skills"
								className={`w-full rounded-lg p-3 text-left ${theme.accent} block bg-opacity-20 transition-colors hover:bg-opacity-30`}
							>
								<div className="flex items-center space-x-3">
									<Code className={`h-4 w-4 ${theme.primary}`} />
									<span className={`${theme.primary}`}>Gerenciar Skills</span>
								</div>
							</Link>

							<Link
								to="/admin/technologies"
								className={`w-full rounded-lg p-3 text-left ${theme.accent} block bg-opacity-20 transition-colors hover:bg-opacity-30`}
							>
								<div className="flex items-center space-x-3">
									<Wrench className={`h-4 w-4 ${theme.primary}`} />
									<span className={`${theme.primary}`}>
										Gerenciar Tecnologias
									</span>
								</div>
							</Link>

							<Link
								to="/admin/content"
								className={`w-full rounded-lg p-3 text-left ${theme.accent} block bg-opacity-20 transition-colors hover:bg-opacity-30`}
							>
								<div className="flex items-center space-x-3">
									<FileText className={`h-4 w-4 ${theme.primary}`} />
									<span className={`${theme.primary}`}>Gerenciar Conteúdo</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default AdminDashboard;
