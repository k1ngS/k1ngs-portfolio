import { createFileRoute } from "@tanstack/react-router";
import AdminContent from "../../pages/admin/content";

export const Route = createFileRoute("/admin/content")({
	component: AdminContent,
});
