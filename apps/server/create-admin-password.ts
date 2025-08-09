import { PrismaClient } from "./prisma/generated/client";

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createAdminPassword() {
	const adminEmail = "test@example.com";
	const adminPassword = "admin123"; // Senha temporária

	try {
		// Buscar ou criar o usuário admin
		let adminUser = await prisma.user.findUnique({
			where: { email: adminEmail },
		});

		if (!adminUser) {
			console.log("👤 Criando usuário admin...");
			adminUser = await prisma.user.create({
				data: {
					id: `user-${Date.now()}`,
					name: "Admin",
					email: adminEmail,
					emailVerified: true,
					role: "ADMIN",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});
			console.log("✅ Usuário admin criado com sucesso!");
		}

		// Criar uma conta com senha para o usuário admin usando bcrypt
		const hashedPassword = await bcrypt.hash(adminPassword, 10);
		const accountId = `account-${adminUser.id}`;

		await prisma.account.upsert({
			where: {
				id: accountId,
			},
			update: {
				password: hashedPassword,
			},
			create: {
				id: accountId,
				accountId: adminUser.id,
				providerId: "credential",
				userId: adminUser.id,
				password: hashedPassword,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

		console.log("✅ Senha do admin criada com sucesso!");
		console.log("📧 Email:", adminEmail);
		console.log("🔑 Senha:", adminPassword);
		console.log("🔗 Acesse: http://localhost:3001/login");
	} catch (error) {
		console.error("❌ Erro ao criar senha do admin:", error);
	} finally {
		await prisma.$disconnect();
	}
}

createAdminPassword();
