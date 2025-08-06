import { z } from "zod";
import prisma from "../../prisma";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";

const createContentSchema = z.object({
	key: z.string().min(1),
	type: z.enum(["TEXT", "MARKDOWN", "HTML"]),
	category: z.string().min(1),
	translations: z
		.array(
			z.object({
				language: z.string(),
				value: z.string(),
			}),
		)
		.min(1),
});

const updateContentSchema = createContentSchema.partial().extend({
	id: z.string(),
});

export const contentRouter = router({
	// Obter conteúdo por chave e idioma (público)
	getByKey: publicProcedure
		.input(
			z.object({
				key: z.string(),
				language: z.string().default("pt"),
			}),
		)
		.query(async ({ input }) => {
			const { key, language } = input;

			const content = await prisma.content.findUnique({
				where: { key },
				include: {
					translations: {
						where: { language },
					},
				},
			});

			if (!content) {
				return null;
			}

			return {
				...content,
				translation: content.translations[0] || null,
			};
		}),

	// Obter múltiplos conteúdos por categoria (público)
	getByCategory: publicProcedure
		.input(
			z.object({
				category: z.string(),
				language: z.string().default("pt"),
			}),
		)
		.query(async ({ input }) => {
			const { category, language } = input;

			const contents = await prisma.content.findMany({
				where: { category },
				include: {
					translations: {
						where: { language },
					},
				},
				orderBy: { key: "asc" },
			});

			return contents.map((content) => ({
				...content,
				translation: content.translations[0] || null,
			}));
		}),

	// Obter todos os conteúdos com todas as traduções (público)
	getAll: publicProcedure
		.input(
			z.object({
				language: z.string().default("pt"),
			}),
		)
		.query(async ({ input }) => {
			const { language } = input;

			const contents = await prisma.content.findMany({
				include: {
					translations: {
						where: { language },
					},
				},
				orderBy: [{ category: "asc" }, { key: "asc" }],
			});

			// Organizar por categoria
			const contentsByCategory = contents.reduce(
				(acc, content) => {
					const category = content.category ?? "";
					const key = content.key;

					if (category !== "" && key) {
						if (!acc[category]) {
							acc[category] = {};
						}
						acc[category][key] = {
							...content,
							category, // ensure category is always a string
							translation: content.translations[0] || null,
						};
					}
					return acc;
				},
				{} as Record<
					string,
					Record<
						string,
						{
							id: string;
							key: string;
							type: string;
							category: string;
							translations: Array<{ language: string; value: string }>;
							translation: { language: string; value: string } | null;
						}
					>
				>,
			);

			return contentsByCategory;
		}),

	// Criar conteúdo (protegido)
	create: protectedProcedure
		.input(createContentSchema)
		.mutation(async ({ input }) => {
			const { translations, ...contentData } = input;

			const content = await prisma.content.create({
				data: contentData,
			});

			// Criar traduções
			await prisma.contentTranslation.createMany({
				data: translations.map((translation) => ({
					contentId: content.id,
					...translation,
				})),
			});

			return content;
		}),

	// Atualizar conteúdo (protegido)
	update: protectedProcedure
		.input(updateContentSchema)
		.mutation(async ({ input }) => {
			const { id, translations, ...contentData } = input;

			const content = await prisma.content.update({
				where: { id },
				data: contentData,
			});

			// Atualizar traduções se fornecidas
			if (translations) {
				await prisma.contentTranslation.deleteMany({
					where: { contentId: id },
				});

				await prisma.contentTranslation.createMany({
					data: translations.map((translation) => ({
						contentId: id,
						...translation,
					})),
				});
			}

			return content;
		}),

	// Deletar conteúdo (protegido)
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			const { id } = input;

			// Deletar traduções primeiro
			await prisma.contentTranslation.deleteMany({ where: { contentId: id } });

			// Deletar conteúdo
			return await prisma.content.delete({ where: { id } });
		}),

	// Listar todos os conteúdos para admin (protegido)
	adminList: protectedProcedure
		.input(
			z.object({
				category: z.string().optional(),
				limit: z.number().min(1).max(100).default(50),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { category, limit, offset } = input;

			const contents = await prisma.content.findMany({
				where: {
					...(category && { category }),
				},
				include: {
					translations: true,
				},
				orderBy: [{ category: "asc" }, { key: "asc" }],
				take: limit,
				skip: offset,
			});

			const total = await prisma.content.count({
				where: {
					...(category && { category }),
				},
			});

			return {
				contents,
				total,
				hasMore: offset + limit < total,
			};
		}),

	// Obter categorias disponíveis (protegido)
	getCategories: protectedProcedure.query(async () => {
		const categories = await prisma.content.findMany({
			select: {
				category: true,
			},
			distinct: ["category"],
			orderBy: {
				category: "asc",
			},
		});

		return categories.map((c) => c.category);
	}),
});
