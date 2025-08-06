import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { contentRouter } from "./content";
// import { implementationPlanRouter } from "./implementation-plan";
import { projectsRouter } from "./projects";
import { skillsRouter } from "./skills";
import { technologiesRouter } from "./technologies";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	// Portfolio routers
	projects: projectsRouter,
	skills: skillsRouter,
	technologies: technologiesRouter,
	content: contentRouter,
	// implementationPlan: implementationPlanRouter,
});
export type AppRouter = typeof appRouter;
