import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Starting basic seed...");

	// Create basic admin user
	const adminUser = await prisma.user.upsert({
		where: { email: "admin@k1ngs.dev" },
		update: {},
		create: {
			id: "admin-user-id",
			email: "admin@k1ngs.dev",
			name: "K1ngs Admin",
			role: "ADMIN",
			emailVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	console.log("✅ Admin user created:", adminUser.email);

	// Create basic technologies
	const technologies = [
		{ name: "React", icon: "react", color: "#61DAFB", category: "FRONTEND" as const },
		{ name: "TypeScript", icon: "typescript", color: "#3178C6", category: "FRONTEND" as const },
		{ name: "Node.js", icon: "nodejs", color: "#339933", category: "BACKEND" as const },
		{ name: "Prisma", icon: "prisma", color: "#2D3748", category: "DATABASE" as const },
	];

	for (const tech of technologies) {
		await prisma.technology.upsert({
			where: { name: tech.name },
			update: {},
			create: tech,
		});
	}

	console.log("✅ Technologies created");

	// Create basic content
	const content = await prisma.content.upsert({
		where: { key: "about.welcome" },
		update: {},
		create: {
			key: "about.welcome",
			type: "TEXT",
			category: "about",
		},
	});

	// Add translation
	await prisma.contentTranslation.upsert({
		where: {
			contentId_language: {
				contentId: content.id,
				language: "pt",
			},
		},
		update: {},
		create: {
			contentId: content.id,
			language: "pt",
			value: "👋 Bem-vindo ao domínio digital de K1ngs! Desenvolvedor Full-Stack apaixonado por criar experiências únicas.",
		},
	});

	console.log("✅ Basic content created");
	console.log("🎉 Basic seed completed successfully!");
}

main()
	.catch((e) => {
		console.error("❌ Seed error:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});