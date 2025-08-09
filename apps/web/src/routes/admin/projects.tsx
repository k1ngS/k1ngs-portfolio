import { createFileRoute } from "@tanstack/react-router";
import AdminProjects from "../../pages/admin/projects";

export const Route = createFileRoute("/admin/projects")({
	component: AdminProjects,
});
