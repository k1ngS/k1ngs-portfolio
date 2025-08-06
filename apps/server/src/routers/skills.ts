import { z } from "zod";
import prisma from "../../prisma";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";

const createSkillSchema = z.object({
	name: z.string().min(1),
	level: z.number().min(0).max(100),
	category: z.enum([
		"FRONTEND",
		"BACKEND",
		"DATABASE",
		"DEVOPS",
		"MOBILE",
		"SOFT_SKILLS",
		"OTHER",
	]),
	yearsOfExp: z.number().min(0),
	technologyId: z.string().optional(),
	translations: z
		.array(
			z.object({
				language: z.string(),
				name: z.string(),
				description: z.string(),
			}),
		)
		.default([]),
});

const updateSkillSchema = createSkillSchema.partial().extend({
	id: z.string(),
});

export const skillsRouter = router({
	// Listar todas as skills (público)
	list: publicProcedure
		.input(
			z.object({
				language: z.string().optional(),
				category: z
					.enum([
						"FRONTEND",
						"BACKEND",
						"DATABASE",
						"DEVOPS",
						"MOBILE",
						"SOFT_SKILLS",
						"OTHER",
					])
					.optional(),
				limit: z.number().min(1).max(100).default(50),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { language = "pt", category, limit, offset } = input;

			const skills = await prisma.skill.findMany({
				where: {
					...(category && { category }),
				},
				include: {
					translations: {
						where: { language },
					},
					technology: true,
				},
				orderBy: [{ level: "desc" }, { name: "asc" }],
				take: limit,
				skip: offset,
			});

			return skills.map((skill) => ({
				...skill,
				translation: skill.translations[0] || null,
			}));
		}),

	// Obter skill por ID (público)
	getById: publicProcedure
		.input(
			z.object({
				id: z.string(),
				language: z.string().default("pt"),
			}),
		)
		.query(async ({ input }) => {
			const { id, language } = input;

			const skill = await prisma.skill.findUnique({
				where: { id },
				include: {
					translations: {
						where: { language },
					},
					technology: true,
				},
			});

			if (!skill) {
				throw new Error("Skill não encontrada");
			}

			return {
				...skill,
				translation: skill.translations[0] || null,
			};
		}),

	// Criar skill (protegido)
	create: protectedProcedure
		.input(createSkillSchema)
		.mutation(async ({ input }) => {
			const { translations, ...skillData } = input;

			const skill = await prisma.skill.create({
				data: skillData,
			});

			// Criar traduções
			if (translations.length > 0) {
				await prisma.skillTranslation.createMany({
					data: translations.map((translation) => ({
						skillId: skill.id,
						...translation,
					})),
				});
			}

			return skill;
		}),

	// Atualizar skill (protegido)
	update: protectedProcedure
		.input(updateSkillSchema)
		.mutation(async ({ input }) => {
			const { id, translations, ...skillData } = input;

			const skill = await prisma.skill.update({
				where: { id },
				data: skillData,
			});

			// Atualizar traduções se fornecidas
			if (translations) {
				await prisma.skillTranslation.deleteMany({
					where: { skillId: id },
				});

				if (translations.length > 0) {
					await prisma.skillTranslation.createMany({
						data: translations.map((translation) => ({
							skillId: id,
							...translation,
						})),
					});
				}
			}

			return skill;
		}),

	// Deletar skill (protegido)
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			const { id } = input;

			// Deletar traduções primeiro
			await prisma.skillTranslation.deleteMany({ where: { skillId: id } });

			// Deletar skill
			return await prisma.skill.delete({ where: { id } });
		}),

	// Listar todas as skills para admin (protegido)
	adminList: protectedProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(50),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { limit, offset } = input;

			const skills = await prisma.skill.findMany({
				include: {
					translations: true,
					technology: true,
				},
				orderBy: { name: "asc" },
				take: limit,
				skip: offset,
			});

			const total = await prisma.skill.count();

			return {
				skills,
				total,
				hasMore: offset + limit < total,
			};
		}),
});
