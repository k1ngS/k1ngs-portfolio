import { z } from "zod";
import prisma from "../../prisma";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";

const createProjectSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	content: z.string().min(1),
	category: z.enum(["WEB", "MOBILE", "API", "DESKTOP", "OTHER"]),
	featured: z.boolean().default(false),
	githubUrl: z.string().url().optional(),
	demoUrl: z.string().url().optional(),
	imageUrl: z.string().optional(),
	technologies: z.array(z.string()).default([]),
	tags: z.array(z.string()).default([]),
	translations: z
		.array(
			z.object({
				language: z.string(),
				title: z.string(),
				description: z.string(),
				content: z.string(),
			}),
		)
		.default([]),
});

const updateProjectSchema = createProjectSchema.partial().extend({
	id: z.string(),
});

export const projectsRouter = router({
	// Listar todos os projetos (público)
	list: publicProcedure
		.input(
			z.object({
				language: z.string().optional(),
				category: z
					.enum(["WEB", "MOBILE", "API", "DESKTOP", "OTHER"])
					.optional(),
				featured: z.boolean().optional(),
				limit: z.number().min(1).max(100).default(10),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { language = "pt", category, featured, limit, offset } = input;

			const projects = await prisma.project.findMany({
				where: {
					...(category && { category }),
					...(featured !== undefined && { featured }),
				},
				include: {
					translations: {
						where: { language },
					},
					technologies: {
						include: {
							technology: true,
						},
					},
					tags: {
						include: {
							tag: true,
						},
					},
				},
				orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
				take: limit,
				skip: offset,
			});

			return projects.map((project) => ({
				...project,
				translation: project.translations[0] || null,
				technologies: project.technologies.map((pt) => pt.technology),
				tags: project.tags.map((pt) => pt.tag),
			}));
		}),

	// Obter projeto por ID (público)
	getById: publicProcedure
		.input(
			z.object({
				id: z.string(),
				language: z.string().default("pt"),
			}),
		)
		.query(async ({ input }) => {
			const { id, language } = input;

			const project = await prisma.project.findUnique({
				where: { id },
				include: {
					translations: {
						where: { language },
					},
					technologies: {
						include: {
							technology: true,
						},
					},
					tags: {
						include: {
							tag: true,
						},
					},
				},
			});

			if (!project) {
				throw new Error("Projeto não encontrado");
			}

			return {
				...project,
				translation: project.translations[0] || null,
				technologies: project.technologies.map((pt) => pt.technology),
				tags: project.tags.map((pt) => pt.tag),
			};
		}),

	// Criar projeto (protegido)
	create: protectedProcedure
		.input(createProjectSchema)
		.mutation(async ({ input }) => {
			const { technologies, tags, translations, ...projectData } = input;

			const project = await prisma.project.create({
				data: projectData,
			});

			// Conectar tecnologias
			if (technologies.length > 0) {
				await prisma.projectTechnology.createMany({
					data: technologies.map((techId) => ({
						projectId: project.id,
						technologyId: techId,
					})),
				});
			}

			// Conectar tags
			if (tags.length > 0) {
				await prisma.projectTag.createMany({
					data: tags.map((tagId) => ({
						projectId: project.id,
						tagId: tagId,
					})),
				});
			}

			// Criar traduções
			if (translations.length > 0) {
				await prisma.projectTranslation.createMany({
					data: translations.map((translation) => ({
						projectId: project.id,
						...translation,
					})),
				});
			}

			return project;
		}),

	// Atualizar projeto (protegido)
	update: protectedProcedure
		.input(updateProjectSchema)
		.mutation(async ({ input }) => {
			const { id, technologies, tags, translations, ...projectData } = input;

			const project = await prisma.project.update({
				where: { id },
				data: projectData,
			});

			// Atualizar tecnologias se fornecidas
			if (technologies) {
				await prisma.projectTechnology.deleteMany({
					where: { projectId: id },
				});

				if (technologies.length > 0) {
					await prisma.projectTechnology.createMany({
						data: technologies.map((techId) => ({
							projectId: id,
							technologyId: techId,
						})),
					});
				}
			}

			// Atualizar tags se fornecidas
			if (tags) {
				await prisma.projectTag.deleteMany({
					where: { projectId: id },
				});

				if (tags.length > 0) {
					await prisma.projectTag.createMany({
						data: tags.map((tagId) => ({
							projectId: id,
							tagId: tagId,
						})),
					});
				}
			}

			// Atualizar traduções se fornecidas
			if (translations) {
				await prisma.projectTranslation.deleteMany({
					where: { projectId: id },
				});

				if (translations.length > 0) {
					await prisma.projectTranslation.createMany({
						data: translations.map((translation) => ({
							projectId: id,
							...translation,
						})),
					});
				}
			}

			return project;
		}),

	// Deletar projeto (protegido)
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			const { id } = input;

			// Deletar relacionamentos primeiro
			await prisma.projectTechnology.deleteMany({ where: { projectId: id } });
			await prisma.projectTag.deleteMany({ where: { projectId: id } });
			await prisma.projectTranslation.deleteMany({ where: { projectId: id } });

			// Deletar projeto
			return await prisma.project.delete({ where: { id } });
		}),

	// Listar todos os projetos para admin (protegido)
	adminList: protectedProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(50),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { limit, offset } = input;

			const projects = await prisma.project.findMany({
				include: {
					translations: true,
					technologies: {
						include: {
							technology: true,
						},
					},
					tags: {
						include: {
							tag: true,
						},
					},
				},
				orderBy: { createdAt: "desc" },
				take: limit,
				skip: offset,
			});

			const total = await prisma.project.count();

			return {
				projects: projects.map((project) => ({
					...project,
					technologies: project.technologies.map((pt) => pt.technology),
					tags: project.tags.map((pt) => pt.tag),
				})),
				total,
				hasMore: offset + limit < total,
			};
		}),
});
