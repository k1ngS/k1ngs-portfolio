import { createFileRoute } from "@tanstack/react-router";
import AdminTechnologies from "../../pages/admin/technologies";

export const Route = createFileRoute("/admin/technologies")({
	component: AdminTechnologies,
});
