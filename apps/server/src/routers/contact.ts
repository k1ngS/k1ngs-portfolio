import { z } from "zod";
import prisma from "../../prisma";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { handleError } from "../lib/errors";

const createContactSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email().max(100),
	subject: z.string().min(5).max(100).optional(),
	message: z.string().min(10).max(1000),
});

const updateContactStatusSchema = z.object({
	id: z.string(),
	status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED"]),
});

export const contactRouter = router({
	// Submit contact form (public)
	submit: publicProcedure
		.input(createContactSchema)
		.mutation(async ({ input }) => {
			try {
				const contact = await prisma.contact.create({
					data: {
						name: input.name.trim(),
						email: input.email.toLowerCase().trim(),
						subject: input.subject?.trim(),
						message: input.message.trim(),
						status: "UNREAD",
					},
				});

				// In a real app, you might want to send an email notification here
				console.log(`New contact form submission from ${input.email}`);

				return {
					success: true,
					message: "Your message has been sent successfully!",
					id: contact.id,
				};
			} catch (error) {
				throw handleError(error);
			}
		}),

	// List all contacts (protected - admin only)
	list: protectedProcedure
		.input(
			z.object({
				status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED"]).optional(),
				limit: z.number().min(1).max(100).default(50),
				offset: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			try {
				const { status, limit, offset } = input;

				const contacts = await prisma.contact.findMany({
					where: status ? { status } : undefined,
					orderBy: [
						{ status: "asc" }, // UNREAD first
						{ createdAt: "desc" },
					],
					take: limit,
					skip: offset,
				});

				const total = await prisma.contact.count({
					where: status ? { status } : undefined,
				});

				const unreadCount = await prisma.contact.count({
					where: { status: "UNREAD" },
				});

				return {
					contacts,
					total,
					unreadCount,
					hasMore: offset + limit < total,
				};
			} catch (error) {
				throw handleError(error);
			}
		}),

	// Get contact by ID (protected)
	getById: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input }) => {
			try {
				const contact = await prisma.contact.findUnique({
					where: { id: input.id },
				});

				if (!contact) {
					throw new Error("Contact not found");
				}

				// Mark as read if it was unread
				if (contact.status === "UNREAD") {
					await prisma.contact.update({
						where: { id: input.id },
						data: { status: "READ" },
					});
				}

				return contact;
			} catch (error) {
				throw handleError(error);
			}
		}),

	// Update contact status (protected)
	updateStatus: protectedProcedure
		.input(updateContactStatusSchema)
		.mutation(async ({ input }) => {
			try {
				const contact = await prisma.contact.update({
					where: { id: input.id },
					data: { status: input.status },
				});

				return contact;
			} catch (error) {
				throw handleError(error);
			}
		}),

	// Delete contact (protected)
	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input }) => {
			try {
				await prisma.contact.delete({
					where: { id: input.id },
				});

				return { success: true };
			} catch (error) {
				throw handleError(error);
			}
		}),

	// Get contact statistics (protected)
	stats: protectedProcedure.query(async () => {
		try {
			const [total, unread, read, replied, archived] = await Promise.all([
				prisma.contact.count(),
				prisma.contact.count({ where: { status: "UNREAD" } }),
				prisma.contact.count({ where: { status: "READ" } }),
				prisma.contact.count({ where: { status: "REPLIED" } }),
				prisma.contact.count({ where: { status: "ARCHIVED" } }),
			]);

			// Get recent contacts (last 30 days)
			const thirtyDaysAgo = new Date();
			thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

			const recent = await prisma.contact.count({
				where: {
					createdAt: {
						gte: thirtyDaysAgo,
					},
				},
			});

			return {
				total,
				unread,
				read,
				replied,
				archived,
				recent,
			};
		} catch (error) {
			throw handleError(error);
		}
	}),
});