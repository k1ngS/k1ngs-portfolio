import { z } from "zod";
import prisma from "../../prisma";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";

const createTechnologySchema = z.object({
	name: z.string().min(1),
	icon: z.string().min(1),
	color: z.string().min(1),
	category: z.enum([
		"FRONTEND",
		"BACKEND",
		"DATABASE",
		"DEVOPS",
		"MOBILE",
		"AI",
		"DESIGN",
		"OTHER",
	]),
});

const updateTechnologySchema = createTechnologySchema.partial().extend({
	id: z.string(),
});

export const technologiesRouter = router({
	// Listar todas as tecnologias (público)
	list: publicProcedure
		.input(
			z.object({
				category: z
					.enum([
						"FRONTEND",
						"BACKEND",
						"DATABASE",
						"DEVOPS",
						"MOBILE",
						"AI",
						"DESIGN",
						"OTHER",
					])
					.optional(),
				limit: z.number().min(1).max(100).default(50),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { category, limit, offset } = input;

			const technologies = await prisma.technology.findMany({
				where: {
					...(category && { category }),
				},
				orderBy: [{ category: "asc" }, { name: "asc" }],
				take: limit,
				skip: offset,
			});

			return technologies;
		}),

	// Obter tecnologia por ID (público)
	getById: publicProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const { id } = input;

			const technology = await prisma.technology.findUnique({
				where: { id },
			});

			if (!technology) {
				throw new Error("Tecnologia não encontrada");
			}

			return technology;
		}),

	// Criar tecnologia (protegido)
	create: protectedProcedure
		.input(createTechnologySchema)
		.mutation(async ({ input }) => {
			return await prisma.technology.create({
				data: input,
			});
		}),

	// Atualizar tecnologia (protegido)
	update: protectedProcedure
		.input(updateTechnologySchema)
		.mutation(async ({ input }) => {
			const { id, ...technologyData } = input;

			return await prisma.technology.update({
				where: { id },
				data: technologyData,
			});
		}),

	// Deletar tecnologia (protegido)
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			const { id } = input;

			// Verificar se a tecnologia está sendo usada
			const projectsUsingTech = await prisma.projectTechnology.count({
				where: { technologyId: id },
			});

			const skillsUsingTech = await prisma.skill.count({
				where: { technologyId: id },
			});

			if (projectsUsingTech > 0 || skillsUsingTech > 0) {
				throw new Error(
					"Não é possível deletar uma tecnologia que está sendo usada em projetos ou skills",
				);
			}

			return await prisma.technology.delete({ where: { id } });
		}),

	// Listar todas as tecnologias para admin (protegido)
	adminList: protectedProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(50),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { limit, offset } = input;

			const technologies = await prisma.technology.findMany({
				include: {
					_count: {
						select: {
							projects: true,
							skills: true,
						},
					},
				},
				orderBy: { name: "asc" },
				take: limit,
				skip: offset,
			});

			const total = await prisma.technology.count();

			return {
				technologies,
				total,
				hasMore: offset + limit < total,
			};
		}),
});
