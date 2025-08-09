import { PrismaClient } from "./generated/client";

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
			category: "FRONTEND" as const,
		},
		{
			name: "TypeScript",
			icon: "typescript",
			color: "#3178C6",
			category: "FRONTEND" as const,
		},
		{
			name: "Next.js",
			icon: "nextjs",
			color: "#000000",
			category: "FRONTEND" as const,
		},
		{
			name: "Tailwind CSS",
			icon: "tailwindcss",
			color: "#06B6D4",
			category: "FRONTEND" as const,
		},
		{
			name: "Node.js",
			icon: "nodejs",
			color: "#339933",
			category: "BACKEND" as const,
		},
		{
			name: "Fastify",
			icon: "fastify",
			color: "#000000",
			category: "BACKEND" as const,
		},
		{
			name: "Prisma",
			icon: "prisma",
			color: "#2D3748",
			category: "DATABASE" as const,
		},
		{
			name: "PostgreSQL",
			icon: "postgresql",
			color: "#336791",
			category: "DATABASE" as const,
		},
		{
			name: "Docker",
			icon: "docker",
			color: "#2496ED",
			category: "DEVOPS" as const,
		},
		{ name: "AWS", icon: "aws", color: "#FF9900", category: "DEVOPS" as const },
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
			category: "WEB" as const,
			featured: true,
			githubUrl: "https://github.com/k1ngs/portfolio-terminal",
			demoUrl: "https://k1ngs.dev",
			imageUrl: "/projects/portfolio.png",
			technologies: [reactTech?.id, typescriptTech?.id, nextjsTech?.id].filter(
				Boolean,
			) as string[],
		},
		{
			title: "E-commerce Fullstack",
			description: "Sistema completo de e-commerce com painel admin",
			content:
				"Sistema completo de e-commerce com carrinho, pagamentos, gestão de produtos e painel administrativo. Desenvolvido com Next.js e Stripe.",
			category: "WEB" as const,
			featured: true,
			githubUrl: "https://github.com/k1ngs/ecommerce-fullstack",
			demoUrl: "https://ecommerce-demo.vercel.app",
			imageUrl: "/projects/ecommerce.png",
			technologies: [nextjsTech?.id, typescriptTech?.id, nodejsTech?.id].filter(
				Boolean,
			) as string[],
		},
		{
			title: "Task Manager API",
			description: "API REST para gerenciamento de tarefas",
			content:
				"API robusta para gerenciamento de tarefas com autenticação, autorização, filtros avançados e documentação Swagger.",
			category: "API" as const,
			featured: false,
			githubUrl: "https://github.com/k1ngs/task-manager-api",
			imageUrl: "/projects/task-api.png",
			technologies: [nodejsTech?.id, typescriptTech?.id].filter(
				Boolean,
			) as string[],
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
			category: "FRONTEND" as const,
			yearsOfExp: 4,
			technologyId: reactTech?.id,
		},
		{
			name: "TypeScript",
			level: 90,
			category: "FRONTEND" as const,
			yearsOfExp: 3,
			technologyId: typescriptTech?.id,
		},
		{
			name: "Next.js",
			level: 88,
			category: "FRONTEND" as const,
			yearsOfExp: 2,
			technologyId: nextjsTech?.id,
		},
		{
			name: "Node.js",
			level: 85,
			category: "BACKEND" as const,
			yearsOfExp: 3,
			technologyId: nodejsTech?.id,
		},
		{
			name: "Problem Solving",
			level: 92,
			category: "SOFT_SKILLS" as const,
			yearsOfExp: 4,
		},
		{
			name: "Team Leadership",
			level: 80,
			category: "SOFT_SKILLS" as const,
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
			type: "TEXT" as const,
			category: "about",
			translations: {
				pt: "Bem-vindo ao meu domínio digital, aventureiro!",
				en: "Welcome to my digital domain, adventurer!",
				es: "¡Bienvenido a mi dominio digital, aventurero!",
			},
		},
		{
			key: "about.bio",
			type: "MARKDOWN" as const,
			category: "about",
			translations: {
				pt: "Eu sou Marcos Beltrão (k1ngs), um desenvolvedor full-stack apaixonado por criar experiências digitais únicas e funcionais.\n\nMinha jornada começou há alguns anos, quando descobri o poder de transformar ideias em realidade através do código. Desde então, tenho me dedicado a dominar as artes arcanas da programação, explorando desde as profundezas do backend até as alturas do frontend.",
				en: "I am Marcos Beltrão (k1ngs), a full-stack developer passionate about creating unique and functional digital experiences.\n\nMy journey began a few years ago when I discovered the power of transforming ideas into reality through code. Since then, I have dedicated myself to mastering the arcane arts of programming, exploring from the depths of backend to the heights of frontend.",
				es: "Soy Marcos Beltrão (k1ngs), un desarrollador full-stack apasionado por crear experiencias digitales únicas y funcionales.\n\nMi viaje comenzó hace algunos años cuando descubrí el poder de transformar ideas en realidad a través del código. Desde entonces, me he dedicado a dominar las artes arcanas de la programación, explorando desde las profundidades del backend hasta las alturas del frontend.",
			},
		},
		{
			key: "about.tech_stack",
			type: "MARKDOWN" as const,
			category: "about",
			translations: {
				pt: "Em 2025, meu arsenal foi aprimorado com as mais recentes tecnologias:\n• React 19 com recursos concorrentes\n• TypeScript 5.8 com inferência avançada\n• Tailwind CSS 4.0 com novas funcionalidades\n• Arquiteturas serverless e edge computing\n• IA integrada para desenvolvimento assistido",
				en: "In 2025, my arsenal was enhanced with the latest technologies:\n• React 19 with concurrent features\n• TypeScript 5.8 with advanced inference\n• Tailwind CSS 4.0 with new functionalities\n• Serverless and edge computing architectures\n• Integrated AI for assisted development",
				es: "En 2025, mi arsenal fue mejorado con las últimas tecnologías:\n• React 19 con características concurrentes\n• TypeScript 5.8 con inferencia avanzada\n• Tailwind CSS 4.0 con nuevas funcionalidades\n• Arquitecturas serverless y edge computing\n• IA integrada para desarrollo asistido",
			},
		},
		{
			key: "about.closing",
			type: "TEXT" as const,
			category: "about",
			translations: {
				pt: "Quando não estou codificando, você pode me encontrar explorando novas tecnologias, contribuindo para projetos open source, ou planejando a próxima revolução digital.",
				en: "When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or planning the next digital revolution.",
				es: "Cuando no estoy programando, puedes encontrarme explorando nuevas tecnologías, contribuyendo a proyectos de código abierto, o planeando la próxima revolución digital.",
			},
		},
		{
			key: "contact.intro",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Vamos conectar e criar algo incrível juntos! 🚀",
				en: "Let's connect and create something amazing together! 🚀",
				es: "¡Conectemos y creemos algo increíble juntos! 🚀",
			},
		},
		// Boot Sequence Content
		{
			key: "terminal.boot.title",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "MARCOS K1NGS TERMINAL v3.0 - 2025 Edition",
				en: "MARCOS K1NGS TERMINAL v3.0 - 2025 Edition",
				es: "MARCOS K1NGS TERMINAL v3.0 - Edición 2025",
			},
		},
		{
			key: "terminal.boot.welcome",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Welcome, digital explorer! You are about to enter the enhanced realm of k1ngs.",
				en: "Welcome, digital explorer! You are about to enter the enhanced realm of k1ngs.",
				es: "¡Bienvenido, explorador digital! Estás a punto de entrar al reino mejorado de k1ngs.",
			},
		},
		{
			key: "terminal.boot.tech_intro",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "This terminal has been upgraded with 2025 technologies including:",
				en: "This terminal has been upgraded with 2025 technologies including:",
				es: "Esta terminal ha sido actualizada con tecnologías de 2025 incluyendo:",
			},
		},
		{
			key: "terminal.boot.help_text",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: 'Type "help" for available commands or navigate using the enhanced interface.',
				en: 'Type "help" for available commands or navigate using the enhanced interface.',
				es: 'Escribe "help" para comandos disponibles o navega usando la interfaz mejorada.',
			},
		},
		{
			key: "terminal.boot.ready",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Quantum system ready. Initializing holographic interface...",
				en: "Quantum system ready. Initializing holographic interface...",
				es: "Sistema cuántico listo. Inicializando interfaz holográfica...",
			},
		},
		// Navigation Panel Content
		{
			key: "terminal.nav.user_name",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "@ marcos k1ngs",
				en: "@ marcos k1ngs",
				es: "@ marcos k1ngs",
			},
		},
		{
			key: "terminal.nav.user_title",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Full Stack Developer",
				en: "Full Stack Developer",
				es: "Desarrollador Full Stack",
			},
		},
		{
			key: "terminal.nav.user_level",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Level 99 Code Wizard",
				en: "Level 99 Code Wizard",
				es: "Mago de Código Nivel 99",
			},
		},
		{
			key: "terminal.nav.edition",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "2025 Enhanced Edition",
				en: "2025 Enhanced Edition",
				es: "Edición Mejorada 2025",
			},
		},
		{
			key: "terminal.nav.quantum_ready",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Quantum Ready ⚡",
				en: "Quantum Ready ⚡",
				es: "Listo Cuántico ⚡",
			},
		},
		// Status Panel Content
		{
			key: "terminal.status.section_label",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Section:",
				en: "Section:",
				es: "Sección:",
			},
		},
		{
			key: "terminal.status.ready",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Ready",
				en: "Ready",
				es: "Listo",
			},
		},
		{
			key: "terminal.status.online",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Online",
				en: "Online",
				es: "En línea",
			},
		},
		{
			key: "terminal.status.version",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "v3.0-2025",
				en: "v3.0-2025",
				es: "v3.0-2025",
			},
		},
		{
			key: "terminal.status.network_connected",
			type: "TEXT" as const,
			category: "terminal",
			translations: {
				pt: "Connected",
				en: "Connected",
				es: "Conectado",
			},
		},
		// Contact Section Content
		{
			key: "contact.github_url",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "https://github.com/k1ngs",
				en: "https://github.com/k1ngs",
				es: "https://github.com/k1ngs",
			},
		},
		{
			key: "contact.linkedin_url",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "https://linkedin.com/in/marcos-k1ngs",
				en: "https://linkedin.com/in/marcos-k1ngs",
				es: "https://linkedin.com/in/marcos-k1ngs",
			},
		},
		{
			key: "contact.twitter_url",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "https://twitter.com/k1ngs_dev",
				en: "https://twitter.com/k1ngs_dev",
				es: "https://twitter.com/k1ngs_dev",
			},
		},
		{
			key: "contact.website_url",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "https://k1ngs.dev",
				en: "https://k1ngs.dev",
				es: "https://k1ngs.dev",
			},
		},
		{
			key: "contact.email",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "marcos@k1ngs.dev",
				en: "marcos@k1ngs.dev",
				es: "marcos@k1ngs.dev",
			},
		},
		{
			key: "contact.discord",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "k1ngs#1337",
				en: "k1ngs#1337",
				es: "k1ngs#1337",
			},
		},
		{
			key: "contact.calendly_url",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "https://calendly.com/k1ngs",
				en: "https://calendly.com/k1ngs",
				es: "https://calendly.com/k1ngs",
			},
		},
		// Categories Content
		{
			key: "categories.skills.all",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Todas as Magias",
				en: "All Spells",
				es: "Todos los Hechizos",
			},
		},
		{
			key: "categories.skills.frontend",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Encantamentos Frontend",
				en: "Frontend Enchantments",
				es: "Encantamientos Frontend",
			},
		},
		{
			key: "categories.skills.backend",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Feitiços Backend",
				en: "Backend Spells",
				es: "Hechizos Backend",
			},
		},
		{
			key: "categories.skills.mobile",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Magias Mobile",
				en: "Mobile Magic",
				es: "Magia Móvil",
			},
		},
		{
			key: "categories.skills.devops",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Rituais DevOps",
				en: "DevOps Rituals",
				es: "Rituales DevOps",
			},
		},
		{
			key: "categories.skills.ai",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "IA & Machine Learning",
				en: "AI & Machine Learning",
				es: "IA y Aprendizaje Automático",
			},
		},
		{
			key: "categories.skills.blockchain",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Artes Blockchain",
				en: "Blockchain Arts",
				es: "Artes Blockchain",
			},
		},
		{
			key: "categories.projects.all",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Todas as Missões",
				en: "All Missions",
				es: "Todas las Misiones",
			},
		},
		{
			key: "categories.projects.web",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Aventuras Web",
				en: "Web Adventures",
				es: "Aventuras Web",
			},
		},
		{
			key: "categories.projects.mobile",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Jornadas Mobile",
				en: "Mobile Journeys",
				es: "Jornadas Móviles",
			},
		},
		{
			key: "categories.projects.ai",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Magias de IA",
				en: "AI Magic",
				es: "Magia de IA",
			},
		},
		{
			key: "categories.projects.blockchain",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Artefatos Blockchain",
				en: "Blockchain Artifacts",
				es: "Artefactos Blockchain",
			},
		},
		{
			key: "categories.projects.devops",
			type: "TEXT" as const,
			category: "categories",
			translations: {
				pt: "Rituais DevOps",
				en: "DevOps Rituals",
				es: "Rituales DevOps",
			},
		},
		// Skill Level Labels
		{
			key: "skills.level.master",
			type: "TEXT" as const,
			category: "skills",
			translations: {
				pt: "Mestre",
				en: "Master",
				es: "Maestro",
			},
		},
		{
			key: "skills.level.advanced",
			type: "TEXT" as const,
			category: "skills",
			translations: {
				pt: "Avançado",
				en: "Advanced",
				es: "Avanzado",
			},
		},
		{
			key: "skills.level.intermediate",
			type: "TEXT" as const,
			category: "skills",
			translations: {
				pt: "Intermediário",
				en: "Intermediate",
				es: "Intermedio",
			},
		},
		{
			key: "skills.level.beginner",
			type: "TEXT" as const,
			category: "skills",
			translations: {
				pt: "Iniciante",
				en: "Beginner",
				es: "Principiante",
			},
		},
		// Project Status Labels
		{
			key: "projects.status.completed",
			type: "TEXT" as const,
			category: "projects",
			translations: {
				pt: "Concluído",
				en: "Completed",
				es: "Completado",
			},
		},
		{
			key: "projects.status.in_progress",
			type: "TEXT" as const,
			category: "projects",
			translations: {
				pt: "Em Progresso",
				en: "In Progress",
				es: "En Progreso",
			},
		},
		{
			key: "projects.status.planning",
			type: "TEXT" as const,
			category: "projects",
			translations: {
				pt: "Planejamento",
				en: "Planning",
				es: "Planificación",
			},
		},
		// Personal Statistics
		{
			key: "about.stats.lines_of_code",
			type: "TEXT" as const,
			category: "about",
			translations: {
				pt: "100,000+",
				en: "100,000+",
				es: "100,000+",
			},
		},
		{
			key: "about.stats.coffee_cups",
			type: "TEXT" as const,
			category: "about",
			translations: {
				pt: "3,247",
				en: "3,247",
				es: "3,247",
			},
		},
		{
			key: "about.stats.years_experience",
			type: "TEXT" as const,
			category: "about",
			translations: {
				pt: "4+",
				en: "4+",
				es: "4+",
			},
		},
		{
			key: "about.stats.projects_launched",
			type: "TEXT" as const,
			category: "about",
			translations: {
				pt: "25+",
				en: "25+",
				es: "25+",
			},
		},
		{
			key: "about.stats.technologies_mastered",
			type: "TEXT" as const,
			category: "about",
			translations: {
				pt: "20+",
				en: "20+",
				es: "20+",
			},
		},
		{
			key: "about.stats.bugs_eliminated",
			type: "TEXT" as const,
			category: "about",
			translations: {
				pt: "∞",
				en: "∞",
				es: "∞",
			},
		},
		// Contact Social Media Usernames
		{
			key: "contact.github_username",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "@k1ngs",
				en: "@k1ngs",
				es: "@k1ngs",
			},
		},
		{
			key: "contact.linkedin_username",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "/in/marcos-k1ngs",
				en: "/in/marcos-k1ngs",
				es: "/in/marcos-k1ngs",
			},
		},
		{
			key: "contact.twitter_username",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "@k1ngs_dev",
				en: "@k1ngs_dev",
				es: "@k1ngs_dev",
			},
		},
		{
			key: "contact.website_name",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "k1ngs.dev",
				en: "k1ngs.dev",
				es: "k1ngs.dev",
			},
		},
		// Social Media Descriptions
		{
			key: "contact.github_description",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Código e projetos open source",
				en: "Code and open source projects",
				es: "Código y proyectos de código abierto",
			},
		},
		{
			key: "contact.linkedin_description",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Conexões profissionais",
				en: "Professional connections",
				es: "Conexiones profesionales",
			},
		},
		{
			key: "contact.twitter_description",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Pensamentos e updates",
				en: "Thoughts and updates",
				es: "Pensamientos y actualizaciones",
			},
		},
		{
			key: "contact.website_description",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Portfolio e blog pessoal",
				en: "Portfolio and personal blog",
				es: "Portafolio y blog personal",
			},
		},
		// Contact Method Descriptions
		{
			key: "contact.email_description",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Resposta em até 24h",
				en: "Response within 24h",
				es: "Respuesta en 24h",
			},
		},
		{
			key: "contact.discord_description",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Chat em tempo real",
				en: "Real-time chat",
				es: "Chat en tiempo real",
			},
		},
		{
			key: "contact.calendly_description",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Reunião de 30min",
				en: "30min meeting",
				es: "Reunión de 30min",
			},
		},
		{
			key: "contact.coffee_description",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Bate-papo informal",
				en: "Casual chat",
				es: "Charla informal",
			},
		},
		{
			key: "contact.coffee_label",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Café Virtual",
				en: "Virtual Coffee",
				es: "Café Virtual",
			},
		},
		{
			key: "contact.coffee_cta",
			type: "TEXT" as const,
			category: "contact",
			translations: {
				pt: "Vamos conversar",
				en: "Let's talk",
				es: "Hablemos",
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
