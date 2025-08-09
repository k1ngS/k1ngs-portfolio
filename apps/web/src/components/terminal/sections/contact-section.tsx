import { motion } from "framer-motion";
import {
	Calendar,
	Coffee,
	Github,
	Globe,
	Linkedin,
	Mail,
	MessageSquare,
	Send,
	Twitter,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { ContactForm, SocialLink } from "@/types";
import { useLanguage } from "../../../contexts/language-context";
import { useTheme } from "../../../contexts/theme-context";
import { trpc } from "../../../utils/trpc";

const ContactSection: React.FC = () => {
	const { theme } = useTheme();
	const { currentLanguage } = useLanguage();
	const [form, setForm] = useState<ContactForm>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [animationStep, setAnimationStep] = useState(0);
	const [typingText, setTypingText] = useState("");
	const [currentTime, setCurrentTime] = useState(new Date());

	// Fetch editable content
	const { data: introContent } = trpc.content.getByKey.useQuery({
		key: "contact.intro",
		language: currentLanguage,
	});
	const { data: githubUrlContent } = trpc.content.getByKey.useQuery({
		key: "contact.github_url",
		language: currentLanguage,
	});
	const { data: linkedinUrlContent } = trpc.content.getByKey.useQuery({
		key: "contact.linkedin_url",
		language: currentLanguage,
	});
	const { data: twitterUrlContent } = trpc.content.getByKey.useQuery({
		key: "contact.twitter_url",
		language: currentLanguage,
	});
	const { data: websiteUrlContent } = trpc.content.getByKey.useQuery({
		key: "contact.website_url",
		language: currentLanguage,
	});
	const { data: emailContent } = trpc.content.getByKey.useQuery({
		key: "contact.email",
		language: currentLanguage,
	});
	const { data: discordContent } = trpc.content.getByKey.useQuery({
		key: "contact.discord",
		language: currentLanguage,
	});
	const { data: calendlyUrlContent } = trpc.content.getByKey.useQuery({
		key: "contact.calendly_url",
		language: currentLanguage,
	});

	// Fetch usernames and descriptions
	const { data: githubUsernameContent } = trpc.content.getByKey.useQuery({
		key: "contact.github_username",
		language: currentLanguage,
	});
	const { data: linkedinUsernameContent } = trpc.content.getByKey.useQuery({
		key: "contact.linkedin_username",
		language: currentLanguage,
	});
	const { data: twitterUsernameContent } = trpc.content.getByKey.useQuery({
		key: "contact.twitter_username",
		language: currentLanguage,
	});
	const { data: websiteNameContent } = trpc.content.getByKey.useQuery({
		key: "contact.website_name",
		language: currentLanguage,
	});
	const { data: githubDescContent } = trpc.content.getByKey.useQuery({
		key: "contact.github_description",
		language: currentLanguage,
	});
	const { data: linkedinDescContent } = trpc.content.getByKey.useQuery({
		key: "contact.linkedin_description",
		language: currentLanguage,
	});
	const { data: twitterDescContent } = trpc.content.getByKey.useQuery({
		key: "contact.twitter_description",
		language: currentLanguage,
	});
	const { data: websiteDescContent } = trpc.content.getByKey.useQuery({
		key: "contact.website_description",
		language: currentLanguage,
	});
	const { data: emailDescContent } = trpc.content.getByKey.useQuery({
		key: "contact.email_description",
		language: currentLanguage,
	});
	const { data: discordDescContent } = trpc.content.getByKey.useQuery({
		key: "contact.discord_description",
		language: currentLanguage,
	});
	const { data: calendlyDescContent } = trpc.content.getByKey.useQuery({
		key: "contact.calendly_description",
		language: currentLanguage,
	});
	const { data: coffeeDescContent } = trpc.content.getByKey.useQuery({
		key: "contact.coffee_description",
		language: currentLanguage,
	});
	const { data: coffeeLabelContent } = trpc.content.getByKey.useQuery({
		key: "contact.coffee_label",
		language: currentLanguage,
	});
	const { data: coffeeCtaContent } = trpc.content.getByKey.useQuery({
		key: "contact.coffee_cta",
		language: currentLanguage,
	});

	const introText =
		introContent?.translation?.value ||
		"Vamos conectar e criar algo incrível juntos! 🚀";

	const socialLinks: SocialLink[] = [
		{
			name: "GitHub",
			url: githubUrlContent?.translation?.value || "https://github.com/k1ngs",
			icon: Github,
			username: githubUsernameContent?.translation?.value || "@k1ngs",
			description:
				githubDescContent?.translation?.value ||
				"Código e projetos open source",
			color: "text-gray-300",
		},
		{
			name: "LinkedIn",
			url:
				linkedinUrlContent?.translation?.value ||
				"https://linkedin.com/in/andre-k1ngs",
			icon: Linkedin,
			username:
				linkedinUsernameContent?.translation?.value || "/in/marcos-k1ngs",
			description:
				linkedinDescContent?.translation?.value || "Conexões profissionais",
			color: "text-blue-400",
		},
		{
			name: "Twitter",
			url:
				twitterUrlContent?.translation?.value ||
				"https://twitter.com/k1ngs_dev",
			icon: Twitter,
			username: twitterUsernameContent?.translation?.value || "@k1ngs_dev",
			description:
				twitterDescContent?.translation?.value || "Pensamentos e updates",
			color: "text-sky-400",
		},
		{
			name: "Website",
			url: websiteUrlContent?.translation?.value || "https://k1ngs.dev",
			icon: Globe,
			username: websiteNameContent?.translation?.value || "k1ngs.dev",
			description:
				websiteDescContent?.translation?.value || "Portfolio e blog pessoal",
			color: "text-green-400",
		},
	];

	const contactMethods = [
		{
			icon: Mail,
			label: "Email",
			value: emailContent?.translation?.value || "marcos@k1ngs.dev",
			action: `mailto:${emailContent?.translation?.value || "marcos@k1ngs.dev"}`,
			description:
				emailDescContent?.translation?.value || "Resposta em até 24h",
		},
		{
			icon: MessageSquare,
			label: "Discord",
			value: discordContent?.translation?.value || "k1ngs#1337",
			action: "#",
			description:
				discordDescContent?.translation?.value || "Chat em tempo real",
		},
		{
			icon: Calendar,
			label: "Calendly",
			value: "Agendar reunião",
			action:
				calendlyUrlContent?.translation?.value || "https://calendly.com/k1ngs",
			description:
				calendlyDescContent?.translation?.value || "Reunião de 30min",
		},
		{
			icon: Coffee,
			label: coffeeLabelContent?.translation?.value || "Café Virtual",
			value: coffeeCtaContent?.translation?.value || "Vamos conversar",
			action: "#",
			description:
				coffeeDescContent?.translation?.value || "Bate-papo informal",
		},
	];

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		let index = 0;
		const timer = setInterval(() => {
			if (index <= introText.length) {
				setTypingText(introText.slice(0, index));
				index++;
			} else {
				clearInterval(timer);
				setTimeout(() => setAnimationStep(1), 500);
			}
		}, 50);
		return () => clearInterval(timer);
	}, [introText.length, introText.slice]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		try {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			toast.success("Mensagem enviada com sucesso! 🚀", {
				style: {
					background: "#1f2937",
					color: "#10b981",
					border: "1px solid #374151",
				},
			});
			setForm({ name: "", email: "", subject: "", message: "" });
		} catch (_error) {
			toast.error("Erro ao enviar mensagem. Tente novamente.", {
				style: {
					background: "#1f2937",
					color: "#ef4444",
					border: "1px solid #374151",
				},
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const isFormValid = form.name && form.email && form.subject && form.message;

	return (
		<div className={`p-6 ${theme.bg} ${theme.primary} h-full overflow-auto`}>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-6"
			>
				<div className={`font-bold text-lg ${theme.accent} mb-2`}>
					$ whoami --contact --social --availability
				</div>
				<div className={`text-sm ${theme.secondary} mb-4`}>
					Estabelecendo conexão segura... Canais de comunicação disponíveis
				</div>
				<div className={`text-base ${theme.primary} min-h-[24px]`}>
					{typingText}
					<span className="animate-pulse">█</span>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
				{/* Contact Form */}
				{animationStep >= 1 && (
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-6"
					>
						<div>
							<h2 className={`font-bold text-xl ${theme.accent} mb-4`}>
								📡 Transmitir Mensagem
							</h2>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div>
										<label
											htmlFor="operator-name"
											className={`block font-medium text-sm ${theme.primary} mb-2`}
										>
											Nome do Operador
										</label>
										<input
											id="operator-name"
											type="text"
											name="name"
											value={form.name}
											onChange={handleInputChange}
											className={`w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 focus:border-gray-400 focus:outline-none ${theme.primary} placeholder-gray-500`}
											placeholder="Seu nome"
											required
										/>
									</div>
									<div>
										<label
											htmlFor="operator-email"
											className={`block font-medium text-sm ${theme.primary} mb-2`}
										>
											Canal de Resposta
										</label>
										<input
											id="operator-email"
											type="email"
											name="email"
											value={form.email}
											onChange={handleInputChange}
											className={`w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 focus:border-gray-400 focus:outline-none ${theme.primary} placeholder-gray-500`}
											placeholder="seu@email.com"
											required
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="mission-subject"
										className={`block font-medium text-sm ${theme.primary} mb-2`}
									>
										Protocolo da Missão
									</label>
									<input
										id="mission-subject"
										type="text"
										name="subject"
										value={form.subject}
										onChange={handleInputChange}
										className={`w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 focus:border-gray-400 focus:outline-none ${theme.primary} placeholder-gray-500`}
										placeholder="Assunto da mensagem"
										required
									/>
								</div>

								<div>
									<label
										htmlFor="transmission-data"
										className={`block font-medium text-sm ${theme.primary} mb-2`}
									>
										Dados da Transmissão
									</label>
									<textarea
										id="transmission-data"
										name="message"
										value={form.message}
										onChange={handleInputChange}
										rows={6}
										className={`w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 focus:border-gray-400 focus:outline-none ${theme.primary} resize-none placeholder-gray-500`}
										placeholder="Sua mensagem aqui..."
										required
									/>
								</div>

								<button
									type="submit"
									disabled={!isFormValid || isSubmitting}
									className={`flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
										isFormValid && !isSubmitting
											? `${theme.accent} border border-gray-500 bg-gray-800 hover:bg-gray-700`
											: "cursor-not-allowed border border-gray-700 bg-gray-800 text-gray-500"
									}`}
								>
									{isSubmitting ? (
										<>
											<div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
											<span>Transmitindo...</span>
										</>
									) : (
										<>
											<Send size={16} />
											<span>Enviar Transmissão</span>
										</>
									)}
								</button>
							</form>
						</div>
					</motion.div>
				)}

				{/* Contact Info & Social */}
				{animationStep >= 1 && (
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="space-y-6"
					>
						{/* Quick Contact */}
						<div>
							<h2 className={`font-bold text-xl ${theme.accent} mb-4`}>
								🔗 Canais Diretos
							</h2>
							<div className="space-y-3">
								{contactMethods.map((method, index) => {
									const Icon = method.icon;
									return (
										<motion.a
											key={method.label}
											href={method.action}
											target={
												method.action.startsWith("http") ? "_blank" : "_self"
											}
											rel="noopener noreferrer"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
											className="flex items-center space-x-3 rounded-lg border border-gray-600 bg-gray-800 p-3 transition-all duration-200 hover:border-gray-500 hover:bg-gray-700"
										>
											<Icon size={20} className={theme.accent} />
											<div className="flex-1">
												<div className={`font-medium ${theme.primary}`}>
													{method.value}
												</div>
												<div className={`text-xs ${theme.secondary}`}>
													{method.description}
												</div>
											</div>
										</motion.a>
									);
								})}
							</div>
						</div>

						{/* Social Links */}
						<div>
							<h2 className={`font-bold text-xl ${theme.accent} mb-4`}>
								🌐 Redes Sociais
							</h2>
							<div className="space-y-3">
								{socialLinks.map((social, index) => {
									const Icon = social.icon;
									return (
										<motion.a
											key={social.name}
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
											className="flex items-center space-x-3 rounded-lg border border-gray-600 bg-gray-800 p-3 transition-all duration-200 hover:border-gray-500 hover:bg-gray-700"
										>
											<Icon size={20} className={social.color} />
											<div className="flex-1">
												<div className={`font-medium ${theme.primary}`}>
													{social.username}
												</div>
												<div className={`text-xs ${theme.secondary}`}>
													{social.description}
												</div>
											</div>
										</motion.a>
									);
								})}
							</div>
						</div>

						{/* Status */}
						<div className="rounded-lg border border-gray-600 bg-gray-800 p-4">
							<h3 className={`font-bold text-lg ${theme.accent} mb-3`}>
								📊 Status do Sistema
							</h3>
							<div className="space-y-2 text-sm">
								<div className="flex items-center justify-between">
									<span className={theme.primary}>Status:</span>
									<div className="flex items-center space-x-2">
										<div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
										<span className={theme.secondary}>Online & Disponível</span>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span className={theme.primary}>Localização:</span>
									<span className={theme.secondary}>São Paulo, Brasil 🇧🇷</span>
								</div>
								<div className="flex items-center justify-between">
									<span className={theme.primary}>Timezone:</span>
									<span className={theme.secondary}>UTC-3 (BRT)</span>
								</div>
								<div className="flex items-center justify-between">
									<span className={theme.primary}>Horário Local:</span>
									<span className={theme.secondary}>
										{currentTime.toLocaleTimeString("pt-BR")}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className={theme.primary}>Resposta:</span>
									<span className={theme.secondary}>Dentro de 24h</span>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</div>

			{/* Command Prompt */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 1 }}
				className={`mt-8 rounded-lg border border-gray-600 bg-gray-800 p-4 ${theme.primary}`}
			>
				<div className="flex items-center space-x-2 text-sm">
					<span className={theme.accent}>marcos@k1ngs-terminal</span>
					<span>:</span>
					<span className={theme.cyan}>~/contact</span>
					<span className={theme.accent}>$</span>
					<span className={theme.secondary}>ping collaboration.server</span>
				</div>
				<div className={`mt-2 text-sm ${theme.secondary}`}>
					PING collaboration.server (k1ngs.dev): 56 data bytes
				</div>
				<div className={`text-sm ${theme.secondary}`}>
					64 bytes from k1ngs.dev: icmp_seq=1 ttl=64 time=0.1ms
				</div>
				<div className={`text-sm ${theme.secondary}`}>
					64 bytes from k1ngs.dev: icmp_seq=2 ttl=64 time=0.1ms
				</div>
				<div className={`text-sm ${theme.secondary}`}>
					--- collaboration.server ping statistics ---
				</div>
				<div className={`text-sm ${theme.secondary}`}>
					2 packets transmitted, 2 received, 0% packet loss
				</div>
				<div className="mt-2 flex items-center space-x-2 text-sm">
					<span className={theme.accent}>marcos@k1ngs-terminal</span>
					<span>:</span>
					<span className={theme.cyan}>~/contact</span>
					<span className={theme.accent}>$</span>
					<span className="animate-pulse">█</span>
				</div>
			</motion.div>
		</div>
	);
};

export default ContactSection;
