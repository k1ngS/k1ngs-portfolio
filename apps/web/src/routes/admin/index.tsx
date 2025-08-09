import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "../../pages/admin/index";

export const Route = createFileRoute("/admin/")({
	component: AdminDashboard,
});
