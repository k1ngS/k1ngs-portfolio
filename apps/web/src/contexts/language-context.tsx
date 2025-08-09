import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface Language {
	code: string;
	name: string;
	flag: string;
	translations: {
		// Navigation
		about: string;
		skills: string;
		projects: string;
		contact: string;
		// Descriptions
		aboutDesc: string;
		skillsDesc: string;
		projectsDesc: string;
		contactDesc: string;
		// System
		themes: string;
		language: string;
		systemInfo: string;
		// Terminal
		terminalTitle: string;
		loading: string;
		initializing: string;
		// About section
		welcomeMessage: string;
		linesOfCode: string;
		coffeeCups: string;
		yearsExperience: string;
		projectsCompleted: string;
		// Contact
		sendMessage: string;
		yourName: string;
		yourEmail: string;
		yourMessage: string;
		send: string;
		messageSent: string;
		// Skills
		frontend: string;
		backend: string;
		database: string;
		devops: string;
		// Projects
		viewProject: string;
		viewCode: string;
		technologies: string;
	};
}

interface LanguageContextType {
	currentLanguage: string;
	language: Language;
	languages: Record<string, Language>;
	changeLanguage: (languageCode: string) => void;
	t: (key: keyof Language["translations"]) => string;
}

const languages: Record<string, Language> = {
	pt: {
		code: "pt",
		name: "Português",
		flag: "🇧🇷",
		translations: {
			// Navigation
			about: "Sobre o Aventureiro",
			skills: "Magias & Artefatos",
			projects: "Missões Épicas",
			contact: "Canais de Comunicação",
			// Descriptions
			aboutDesc: "whoami",
			skillsDesc: "ls -la /skills",
			projectsDesc: "cat /adventures/*",
			contactDesc: "ping marcos@k1ngs.dev",
			// System
			themes: "Temas",
			language: "Idioma",
			systemInfo: "Informações do Sistema",
			// Terminal
			terminalTitle: "K1ngs Portfolio Terminal",
			loading: "Carregando...",
			initializing: "Inicializando sistema...",
			// About
			welcomeMessage: "Bem-vindo ao meu domínio digital, aventureiro!",
			linesOfCode: "Linhas de Código",
			coffeeCups: "Xícaras de Café",
			yearsExperience: "Anos de Experiência",
			projectsCompleted: "Projetos Concluídos",
			// Contact
			sendMessage: "Enviar Mensagem",
			yourName: "Seu Nome",
			yourEmail: "Seu Email",
			yourMessage: "Sua Mensagem",
			send: "Enviar",
			messageSent: "Mensagem enviada com sucesso!",
			// Skills
			frontend: "Frontend",
			backend: "Backend",
			database: "Banco de Dados",
			devops: "DevOps",
			// Projects
			viewProject: "Ver Projeto",
			viewCode: "Ver Código",
			technologies: "Tecnologias",
		},
	},
	en: {
		code: "en",
		name: "English",
		flag: "🇺🇸",
		translations: {
			// Navigation
			about: "About the Adventurer",
			skills: "Spells & Artifacts",
			projects: "Epic Quests",
			contact: "Communication Channels",
			// Descriptions
			aboutDesc: "whoami",
			skillsDesc: "ls -la /skills",
			projectsDesc: "cat /adventures/*",
			contactDesc: "ping marcos@k1ngs.dev",
			// System
			themes: "Themes",
			language: "Language",
			systemInfo: "System Information",
			// Terminal
			terminalTitle: "K1ngs Portfolio Terminal",
			loading: "Loading...",
			initializing: "Initializing system...",
			// About
			welcomeMessage: "Welcome to my digital domain, adventurer!",
			linesOfCode: "Lines of Code",
			coffeeCups: "Coffee Cups",
			yearsExperience: "Years of Experience",
			projectsCompleted: "Projects Completed",
			// Contact
			sendMessage: "Send Message",
			yourName: "Your Name",
			yourEmail: "Your Email",
			yourMessage: "Your Message",
			send: "Send",
			messageSent: "Message sent successfully!",
			// Skills
			frontend: "Frontend",
			backend: "Backend",
			database: "Database",
			devops: "DevOps",
			// Projects
			viewProject: "View Project",
			viewCode: "View Code",
			technologies: "Technologies",
		},
	},
	es: {
		code: "es",
		name: "Español",
		flag: "🇪🇸",
		translations: {
			// Navigation
			about: "Sobre el Aventurero",
			skills: "Hechizos y Artefactos",
			projects: "Misiones Épicas",
			contact: "Canales de Comunicación",
			// Descriptions
			aboutDesc: "whoami",
			skillsDesc: "ls -la /skills",
			projectsDesc: "cat /adventures/*",
			contactDesc: "ping marcos@k1ngs.dev",
			// System
			themes: "Temas",
			language: "Idioma",
			systemInfo: "Información del Sistema",
			// Terminal
			terminalTitle: "Terminal Portfolio K1ngs",
			loading: "Cargando...",
			initializing: "Inicializando sistema...",
			// About
			welcomeMessage: "¡Bienvenido a mi dominio digital, aventurero!",
			linesOfCode: "Líneas de Código",
			coffeeCups: "Tazas de Café",
			yearsExperience: "Años de Experiencia",
			projectsCompleted: "Proyectos Completados",
			// Contact
			sendMessage: "Enviar Mensaje",
			yourName: "Tu Nombre",
			yourEmail: "Tu Email",
			yourMessage: "Tu Mensaje",
			send: "Enviar",
			messageSent: "¡Mensaje enviado con éxito!",
			// Skills
			frontend: "Frontend",
			backend: "Backend",
			database: "Base de Datos",
			devops: "DevOps",
			// Projects
			viewProject: "Ver Proyecto",
			viewCode: "Ver Código",
			technologies: "Tecnologías",
		},
	},
	fr: {
		code: "fr",
		name: "Français",
		flag: "🇫🇷",
		translations: {
			// Navigation
			about: "À propos de l'Aventurier",
			skills: "Sorts et Artefacts",
			projects: "Quêtes Épiques",
			contact: "Canaux de Communication",
			// Descriptions
			aboutDesc: "whoami",
			skillsDesc: "ls -la /skills",
			projectsDesc: "cat /adventures/*",
			contactDesc: "ping marcos@k1ngs.dev",
			// System
			themes: "Thèmes",
			language: "Langue",
			systemInfo: "Informations Système",
			// Terminal
			terminalTitle: "Terminal Portfolio K1ngs",
			loading: "Chargement...",
			initializing: "Initialisation du système...",
			// About
			welcomeMessage: "Bienvenue dans mon domaine numérique, aventurier !",
			linesOfCode: "Lignes de Code",
			coffeeCups: "Tasses de Café",
			yearsExperience: "Années d'Expérience",
			projectsCompleted: "Projets Terminés",
			// Contact
			sendMessage: "Envoyer un Message",
			yourName: "Votre Nom",
			yourEmail: "Votre Email",
			yourMessage: "Votre Message",
			send: "Envoyer",
			messageSent: "Message envoyé avec succès !",
			// Skills
			frontend: "Frontend",
			backend: "Backend",
			database: "Base de Données",
			devops: "DevOps",
			// Projects
			viewProject: "Voir le Projet",
			viewCode: "Voir le Code",
			technologies: "Technologies",
		},
	},
	ja: {
		code: "ja",
		name: "日本語",
		flag: "🇯🇵",
		translations: {
			// Navigation
			about: "冒険者について",
			skills: "魔法とアーティファクト",
			projects: "エピッククエスト",
			contact: "コミュニケーションチャンネル",
			// Descriptions
			aboutDesc: "whoami",
			skillsDesc: "ls -la /skills",
			projectsDesc: "cat /adventures/*",
			contactDesc: "ping marcos@k1ngs.dev",
			// System
			themes: "テーマ",
			language: "言語",
			systemInfo: "システム情報",
			// Terminal
			terminalTitle: "K1ngsポートフォリオターミナル",
			loading: "読み込み中...",
			initializing: "システム初期化中...",
			// About
			welcomeMessage: "私のデジタル領域へようこそ、冒険者よ！",
			linesOfCode: "コード行数",
			coffeeCups: "コーヒーカップ",
			yearsExperience: "経験年数",
			projectsCompleted: "完了プロジェクト",
			// Contact
			sendMessage: "メッセージを送信",
			yourName: "お名前",
			yourEmail: "メールアドレス",
			yourMessage: "メッセージ",
			send: "送信",
			messageSent: "メッセージが正常に送信されました！",
			// Skills
			frontend: "フロントエンド",
			backend: "バックエンド",
			database: "データベース",
			devops: "DevOps",
			// Projects
			viewProject: "プロジェクトを見る",
			viewCode: "コードを見る",
			technologies: "技術",
		},
	},
};

const LanguageContext = createContext<LanguageContextType | null>(
	null,
);

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		const lang = languages.pt;
		return {
			currentLanguage: "pt",
			language: lang,
			languages,
			changeLanguage: () => {},
			t: (key: keyof Language["translations"]) => lang.translations[key] || key,
		}
	}
	return context;
};


interface LanguageProviderProps {
	children: React.ReactNode;
	initialLanguage?: string;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
	children,
	initialLanguage = "pt",
}) => {
	const isBrowser = typeof window !== "undefined";
	const [currentLanguage, setCurrentLanguage] = useState<string>(initialLanguage);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		if (!isBrowser) return;
		const saved = localStorage.getItem("portfolio-language");
		if (saved && languages[saved]) {
			setCurrentLanguage(saved);
		}
		setHydrated(true);
	}, [isBrowser]);

	const changeLanguage = (languageCode: string) => {
		if (languages[languageCode]) {
			setCurrentLanguage(languageCode);
			if (isBrowser) {
				localStorage.setItem("portfolio-language", languageCode);
			}
		}
	};

	const language = languages[currentLanguage] || languages.pt;

	const t = (key: keyof Language["translations"]) => {
		return language.translations[key] || key;
	};

	const value: LanguageContextType = {
		currentLanguage,
		language,
		languages,
		changeLanguage,
		t,
	};

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
};
