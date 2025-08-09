console.log("SEED STARTING");

import { PrismaClient } from "./prisma/generated/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Iniciando seed do banco de dados...");

	// Criar usuário admin
	const adminUser = await prisma.user.upsert({
		where: { email: "admin@k1ngs.dev" },
		update: {},
		create: {
			id: "admin-user-id",
			email: "admin@k1ngs.dev",
			name: "k1ngs Developer",
			role: "ADMIN",
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	console.log("✅ Usuário admin criado:", adminUser.email);

	// Criar tecnologias
	const technologies = [
		{
			name: "React",
			icon: "react",
			color: "#61DAFB",
			category: "FRONTEND",
		},
		{
			name: "TypeScript",
			icon: "typescript",
			color: "#3178C6",
			category: "FRONTEND",
		},
		{
			name: "Next.js",
			icon: "nextjs",
			color: "#000000",
			category: "FRONTEND",
		},
		{
			name: "Tailwind CSS",
			icon: "tailwindcss",
			color: "#06B6D4",
			category: "FRONTEND",
		},
		{
			name: "Node.js",
			icon: "nodejs",
			color: "#339933",
			category: "BACKEND",
		},
		{
			name: "Fastify",
			icon: "fastify",
			color: "#000000",
			category: "BACKEND",
		},
		{
			name: "Prisma",
			icon: "prisma",
			color: "#2D3748",
			category: "DATABASE",
		},
		{
			name: "PostgreSQL",
			icon: "postgresql",
			color: "#336791",
			category: "DATABASE",
		},
		{
			name: "Docker",
			icon: "docker",
			color: "#2496ED",
			category: "DEVOPS",
		},
		{ name: "AWS", icon: "aws", color: "#FF9900", category: "DEVOPS" },
	];

	for (const tech of technologies) {
		await prisma.technology.upsert({
			where: { name: tech.name },
			update: {},
			create: tech,
		});
	}

	console.log("✅ Tecnologias criadas");

	// Buscar tecnologias criadas
	const reactTech = await prisma.technology.findUnique({
		where: { name: "React" },
	});
	const typescriptTech = await prisma.technology.findUnique({
		where: { name: "TypeScript" },
	});
	const nextjsTech = await prisma.technology.findUnique({
		where: { name: "Next.js" },
	});
	const nodejsTech = await prisma.technology.findUnique({
		where: { name: "Node.js" },
	});

	// Criar projetos
	const projects = [
		{
			title: "Portfolio Terminal",
			description: "Portfolio interativo com interface de terminal",
			content:
				"Um portfolio único que simula um terminal Linux, oferecendo uma experiência interativa e imersiva para explorar projetos, habilidades e informações profissionais.",
			category: "WEB",
			featured: true,
			githubUrl: "https://github.com/k1ngs/portfolio-terminal",
			demoUrl: "https://k1ngs.dev",
			imageUrl: "/projects/portfolio.png",
			technologies: [reactTech?.id, typescriptTech?.id, nextjsTech?.id].filter(
				Boolean,
			),
		},
		{
			title: "E-commerce Fullstack",
			description: "Sistema completo de e-commerce com painel admin",
			content:
				"Sistema completo de e-commerce com carrinho, pagamentos, gestão de produtos e painel administrativo. Desenvolvido com Next.js e Stripe.",
			category: "WEB",
			featured: true,
			githubUrl: "https://github.com/k1ngs/ecommerce-fullstack",
			demoUrl: "https://ecommerce-demo.vercel.app",
			imageUrl: "/projects/ecommerce.png",
			technologies: [nextjsTech?.id, typescriptTech?.id, nodejsTech?.id].filter(
				Boolean,
			),
		},
		{
			title: "Task Manager API",
			description: "API REST para gerenciamento de tarefas",
			content:
				"API robusta para gerenciamento de tarefas com autenticação, autorização, filtros avançados e documentação Swagger.",
			category: "API",
			featured: false,
			githubUrl: "https://github.com/k1ngs/task-manager-api",
			imageUrl: "/projects/task-api.png",
			technologies: [nodejsTech?.id, typescriptTech?.id].filter(Boolean),
		},
	];

	for (const projectData of projects) {
		const { technologies, ...project } = projectData;

		const createdProject = await prisma.project.create({
			data: project,
		});

		// Conectar tecnologias
		for (const techId of technologies) {
			await prisma.projectTechnology.create({
				data: {
					projectId: createdProject.id,
					technologyId: techId,
				},
			});
		}

		// Adicionar traduções
		const translations = [
			{
				language: "pt",
				title: project.title,
				description: project.description,
				content: project.content,
			},
			{
				language: "en",
				title: project.title, // Você pode traduzir depois
				description: project.description,
				content: project.content,
			},
		];

		for (const translation of translations) {
			await prisma.projectTranslation.create({
				data: {
					projectId: createdProject.id,
					...translation,
				},
			});
		}
	}

	console.log("✅ Projetos criados");

	// Criar skills
	const skills = [
		{
			name: "React",
			level: 95,
			category: "FRONTEND",
			yearsOfExp: 4,
			technologyId: reactTech?.id,
		},
		{
			name: "TypeScript",
			level: 90,
			category: "FRONTEND",
			yearsOfExp: 3,
			technologyId: typescriptTech?.id,
		},
		{
			name: "Next.js",
			level: 88,
			category: "FRONTEND",
			yearsOfExp: 2,
			technologyId: nextjsTech?.id,
		},
		{
			name: "Node.js",
			level: 85,
			category: "BACKEND",
			yearsOfExp: 3,
			technologyId: nodejsTech?.id,
		},
		{
			name: "Problem Solving",
			level: 92,
			category: "SOFT_SKILLS",
			yearsOfExp: 4,
		},
		{
			name: "Team Leadership",
			level: 80,
			category: "SOFT_SKILLS",
			yearsOfExp: 2,
		},
	];

	for (const skill of skills) {
		const createdSkill = await prisma.skill.create({
			data: skill,
		});

		// Adicionar traduções
		const translations = [
			{
				language: "pt",
				name: skill.name,
				description: `Experiência avançada em ${skill.name}`,
			},
			{
				language: "en",
				name: skill.name,
				description: `Advanced experience in ${skill.name}`,
			},
		];

		for (const translation of translations) {
			await prisma.skillTranslation.create({
				data: {
					skillId: createdSkill.id,
					...translation,
				},
			});
		}
	}

	console.log("✅ Skills criadas");

	// Criar conteúdo multilíngue
	const contents = [
		{
			key: "about.welcome",
			type: "TEXT",
			category: "about",
			translations: {
				pt: "Bem-vindo ao meu domínio digital, aventureiro!",
				en: "Welcome to my digital domain, adventurer!",
				es: "¡Bienvenido a mi dominio digital, aventurero!",
			},
		},
		{
			key: "about.intro",
			type: "MARKDOWN",
			category: "about",
			translations: {
				pt: "Eu sou Marcos Beltrão (k1ngs), um desenvolvedor full-stack apaixonado por criar experiências digitais únicas e funcionais.",
				en: "I am Marcos Beltrão (k1ngs), a full-stack developer passionate about creating unique and functional digital experiences.",
				es: "Soy Marcos Beltrão (k1ngs), un desarrollador full-stack apasionado por crear experiencias digitales únicas y funcionales.",
			},
		},
		{
			key: "contact.intro",
			type: "TEXT",
			category: "contact",
			translations: {
				pt: "Vamos conectar e criar algo incrível juntos! 🚀",
				en: "Let's connect and create something amazing together! 🚀",
				es: "¡Conectemos y creemos algo increíble juntos! 🚀",
			},
		},
	];

	for (const contentData of contents) {
		const { translations, ...content } = contentData;

		const createdContent = await prisma.content.upsert({
			where: { key: content.key },
			update: {},
			create: content,
		});

		for (const [language, value] of Object.entries(translations)) {
			await prisma.contentTranslation.upsert({
				where: {
					contentId_language: {
						contentId: createdContent.id,
						language,
					},
				},
				update: { value },
				create: {
					contentId: createdContent.id,
					language,
					value,
				},
			});
		}
	}

	console.log("✅ Conteúdo multilíngue criado");

	console.log("🎉 Seed concluído com sucesso!");
	console.log("📧 Admin: admin@k1ngs.dev");
	console.log("🔗 Acesse: http://localhost:3001/login");
}

main()
	.catch((e) => {
		console.error("❌ Erro no seed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
