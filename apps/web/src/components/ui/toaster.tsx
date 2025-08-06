import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Toaster as HotToaster } from "react-hot-toast";
import { useTheme } from "../../contexts/theme-context";

export const Toaster = () => {
	const { theme } = useTheme();

	const getToastStyle = () => {
		const baseStyle = {
			borderRadius: "8px",
			border: "1px solid",
			fontFamily: "Fira Code, monospace",
			fontSize: "14px",
			fontWeight: "500",
		};

		switch (theme.name) {
			case "Verde Fósforo":
				return {
					...baseStyle,
					background: "#000000",
					color: "#00ff00",
					borderColor: "#00ff00",
					boxShadow: "0 0 10px rgba(0, 255, 0, 0.3)",
				};
			case "Cyberpunk 2025":
				return {
					...baseStyle,
					background: "#1a0033",
					color: "#ff00ff",
					borderColor: "#ff00ff",
					boxShadow: "0 0 10px rgba(255, 0, 255, 0.3)",
				};
			case "Âmbar Clássico":
				return {
					...baseStyle,
					background: "#2d1b00",
					color: "#ffaa00",
					borderColor: "#ffaa00",
					boxShadow: "0 0 10px rgba(255, 170, 0, 0.3)",
				};
			case "Azul Ártico":
				return {
					...baseStyle,
					background: "#0f172a",
					color: "#22d3ee",
					borderColor: "#22d3ee",
					boxShadow: "0 0 10px rgba(34, 211, 238, 0.3)",
				};
			default: // Terminal Clássico
				return {
					...baseStyle,
					background: "#1e293b",
					color: "#e2e8f0",
					borderColor: "#475569",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
				};
		}
	};

	const getIconColor = () => {
		switch (theme.name) {
			case "Verde Fósforo":
				return "#00ff00";
			case "Cyberpunk 2025":
				return "#ff00ff";
			case "Âmbar Clássico":
				return "#ffaa00";
			case "Azul Ártico":
				return "#22d3ee";
			default:
				return "#22d3ee";
		}
	};

	return (
		<HotToaster
			position="top-right"
			gutter={8}
			containerClassName=""
			containerStyle={{}}
			toastOptions={{
				duration: 4000,
				style: getToastStyle(),
				success: {
					iconTheme: {
						primary: getIconColor(),
						secondary: getToastStyle().background,
					},
					icon: <CheckCircle size={20} color={getIconColor()} />,
				},
				error: {
					iconTheme: {
						primary: "#ef4444",
						secondary: getToastStyle().background,
					},
					icon: <XCircle size={20} color="#ef4444" />,
				},
				loading: {
					iconTheme: {
						primary: getIconColor(),
						secondary: getToastStyle().background,
					},
					icon: (
						<Loader2
							size={20}
							color={getIconColor()}
							className="animate-spin"
						/>
					),
				},
			}}
		/>
	);
};

export default Toaster;
