import { createFileRoute } from "@tanstack/react-router";
import AdminSkills from "../../pages/admin/skills";

export const Route = createFileRoute("/admin/skills")({
	component: AdminSkills,
});
