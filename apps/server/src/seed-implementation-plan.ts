import prisma from "../prisma";

const implementationPlanData = [
	// COMPLETED
	{
		title: "Estrutura Base do Projeto",
		description:
			"Configuração inicial do projeto com Next.js, TypeScript, Tailwind CSS e estrutura de pastas.",
		category: "COMPLETED" as const,
		priority: "HIGH" as const,
		estimatedTime: "2-3 dias",
		dependencies: [],
		order: 1,
	},
	{
		title: "Sistema de Autenticação",
		description:
			"Implementação do sistema de login/logout para acesso ao painel administrativo.",
		category: "COMPLETED" as const,
		priority: "HIGH" as const,
		estimatedTime: "1-2 dias",
		dependencies: ["Estrutura Base do Projeto"],
		order: 2,
	},
	{
		title: "Modelos de Dados Básicos",
		description: "Criação dos modelos Project, Technology, Content no Prisma.",
		category: "COMPLETED" as const,
		priority: "HIGH" as const,
		estimatedTime: "1 dia",
		dependencies: ["Estrutura Base do Projeto"],
		order: 3,
	},
	{
		title: "CRUD de Projetos",
		description:
			"Sistema completo de gerenciamento de projetos no painel administrativo.",
		category: "COMPLETED" as const,
		priority: "HIGH" as const,
		estimatedTime: "2-3 dias",
		dependencies: ["Modelos de Dados Básicos", "Sistema de Autenticação"],
		order: 4,
	},
	{
		title: "CRUD de Tecnologias",
		description: "Sistema de gerenciamento de tecnologias e skills.",
		category: "COMPLETED" as const,
		priority: "HIGH" as const,
		estimatedTime: "1-2 dias",
		dependencies: ["Modelos de Dados Básicos", "Sistema de Autenticação"],
		order: 5,
	},
	{
		title: "Sistema de Conteúdo Terminal",
		description: "Gerenciamento de conteúdo dinâmico para seções do terminal.",
		category: "COMPLETED" as const,
		priority: "MEDIUM" as const,
		estimatedTime: "2-3 dias",
		dependencies: ["Modelos de Dados Básicos"],
		order: 6,
	},

	// IN_PROGRESS
	{
		title: "Plano de Implementação Editável",
		description:
			"Tornar o plano de implementação totalmente editável através do painel administrativo.",
		category: "IN_PROGRESS" as const,
		priority: "HIGH" as const,
		estimatedTime: "1-2 dias",
		dependencies: ["Sistema de Autenticação", "Modelos de Dados Básicos"],
		order: 7,
	},

	// PENDING
	{
		title: "Sistema de Configurações Gerais",
		description:
			"Painel para configurar informações pessoais, links de redes sociais, e configurações do sistema.",
		category: "PENDING" as const,
		priority: "HIGH" as const,
		estimatedTime: "2-3 dias",
		dependencies: ["Plano de Implementação Editável"],
		order: 8,
	},
	{
		title: "Configuração de Temas",
		description:
			"Sistema para personalizar cores, temas e aparência do portfólio.",
		category: "PENDING" as const,
		priority: "MEDIUM" as const,
		estimatedTime: "2-3 dias",
		dependencies: ["Sistema de Configurações Gerais"],
		order: 9,
	},
	{
		title: "Sistema de Idiomas",
		description: "Gerenciamento completo de traduções e idiomas do portfólio.",
		category: "PENDING" as const,
		priority: "MEDIUM" as const,
		estimatedTime: "3-4 dias",
		dependencies: ["Sistema de Configurações Gerais"],
		order: 10,
	},
	{
		title: "Configuração de Seções",
		description: "Permitir ativar/desativar e reordenar seções do portfólio.",
		category: "PENDING" as const,
		priority: "MEDIUM" as const,
		estimatedTime: "1-2 dias",
		dependencies: ["Sistema de Configurações Gerais"],
		order: 11,
	},
	{
		title: "Editor de Arte ASCII",
		description:
			"Interface para personalizar a arte ASCII da sequência de boot.",
		category: "PENDING" as const,
		priority: "LOW" as const,
		estimatedTime: "2-3 dias",
		dependencies: ["Sistema de Configurações Gerais"],
		order: 12,
	},

	// FUTURE
	{
		title: "Sistema de Analytics",
		description: "Dashboard com estatísticas de visitantes e interações.",
		category: "FUTURE" as const,
		priority: "LOW" as const,
		estimatedTime: "3-4 dias",
		dependencies: ["Sistema de Configurações Gerais"],
		order: 13,
	},
	{
		title: "Sistema de Backup",
		description: "Funcionalidade para backup e restauração de configurações.",
		category: "FUTURE" as const,
		priority: "LOW" as const,
		estimatedTime: "2-3 dias",
		dependencies: ["Sistema de Analytics"],
		order: 14,
	},
	{
		title: "API Pública",
		description: "Endpoints públicos para integração com outros sistemas.",
		category: "FUTURE" as const,
		priority: "LOW" as const,
		estimatedTime: "2-3 dias",
		dependencies: ["Sistema de Backup"],
		order: 15,
	},
	{
		title: "Sistema de Notificações",
		description: "Notificações em tempo real para atualizações e eventos.",
		category: "FUTURE" as const,
		priority: "LOW" as const,
		estimatedTime: "2-3 dias",
		dependencies: ["API Pública"],
		order: 16,
	},
	{
		title: "Modo Offline",
		description: "Funcionalidade PWA para acesso offline ao portfólio.",
		category: "FUTURE" as const,
		priority: "LOW" as const,
		estimatedTime: "3-4 dias",
		dependencies: ["Sistema de Notificações"],
		order: 17,
	},
];

export async function seedImplementationPlan() {
	console.log("🌱 Seeding implementation plan...");

	// Limpar dados existentes
	await prisma.implementationPlan.deleteMany();

	// Inserir novos dados
	for (const item of implementationPlanData) {
		await prisma.implementationPlan.create({
			data: item,
		});
	}

	console.log(
		`✅ Created ${implementationPlanData.length} implementation plan items`,
	);
}

// Executar se chamado diretamente
if (require.main === module) {
	seedImplementationPlan()
		.then(() => {
			console.log("🎉 Implementation plan seeding completed!");
			process.exit(0);
		})
		.catch((error) => {
			console.error("❌ Error seeding implementation plan:", error);
			process.exit(1);
		});
}
