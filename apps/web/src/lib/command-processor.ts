import { trpc } from "@/utils/trpc";
import type { TerminalTheme } from "@/stores/terminal-store";

// Command processor result
export interface CommandResult {
  type: "output" | "error" | "system";
  content: string;
}

// Available commands
export type AvailableCommand = 
  | "help" 
  | "about" 
  | "projects" 
  | "project" 
  | "skills" 
  | "contact" 
  | "theme" 
  | "clear";

// Theme mappings
const THEME_MAP: Record<string, TerminalTheme> = {
  matrix: "matrix",
  cyberpunk: "cyberpunk", 
  hacker: "hacker",
  retro: "retro",
  professional: "professional",
  clean: "professional", // Alias
  dark: "matrix", // Alias
};

// Command processor function (no longer a class since we can't use hooks in classes)
export async function processCommand(input: string): Promise<CommandResult[]> {
  const trimmedInput = input.trim();
  if (!trimmedInput) {
    return [{ type: "error", content: "Please enter a command. Type 'help' for available commands." }];
  }

  const [command, ...args] = trimmedInput.toLowerCase().split(" ");

  try {
    switch (command as AvailableCommand) {
      case "help":
        return handleHelp();
      
      case "about":
        return await handleAbout();
      
      case "projects":
        return await handleProjects();
      
      case "project":
        return await handleProject(args[0]);
      
      case "skills":
        return await handleSkills();
      
      case "contact":
        return await handleContact();
      
      case "theme":
        return handleTheme(args[0]);
      
      case "clear":
        return handleClear();
      
      default:
        return handleUnknownCommand(command);
    }
  } catch (error) {
    console.error("Command processing error:", error);
    return [{ 
      type: "error", 
      content: `Error processing command: ${error instanceof Error ? error.message : "Unknown error"}`
    }];
  }
}

function handleHelp(): CommandResult[] {
  const helpText = `Available Commands:

📋 INFORMATION
  help          - Show this help message
  about         - Display information about K1ngs
  contact       - Show contact information

🚀 PORTFOLIO  
  projects      - List all projects
  project <id>  - Show specific project details
  skills        - Display technical skills

🎨 CUSTOMIZATION
  theme <name>  - Change terminal theme
                  Available: matrix, cyberpunk, hacker, retro, professional
  clear         - Clear terminal screen

💡 TIPS
  - Use ↑/↓ arrow keys to navigate command history
  - Commands are case-insensitive
  - Type any command followed by the parameter when needed

Example: project 1, theme matrix, etc.`;

  return [{ type: "output", content: helpText }];
}

async function handleAbout(): Promise<CommandResult[]> {
  // Fallback content since we can't use tRPC hooks here
  const aboutText = `👋 About K1ngs

Full-Stack Developer | Tech Enthusiast | Problem Solver

I'm passionate about creating innovative solutions using modern technologies.
My expertise spans across web development, mobile applications, and system architecture.

🔧 Current Focus:
- Building scalable web applications
- Exploring new frameworks and technologies  
- Contributing to open-source projects
- Continuous learning and improvement

Type 'skills' to see my technical capabilities
Type 'projects' to explore my work
Type 'contact' to get in touch`;

  return [{ type: "output", content: aboutText }];
}

async function handleProjects(): Promise<CommandResult[]> {
  // Mock data since we can't use tRPC hooks in this context
  const output = `🚀 My Projects

1. K1ngs Portfolio v3
   Modern portfolio website with terminal interface
   Technologies: React, TypeScript, tRPC, Fastify, PostgreSQL
   GitHub: https://github.com/k1ngS/k1ngs-portfolio
   ---

2. Terminal Interface System
   Interactive command-line portfolio experience
   Technologies: Zustand, Framer Motion, TailwindCSS
   Status: Active Development
   ---

3. Full-Stack Authentication
   Secure authentication system with Better Auth
   Technologies: Better Auth, Prisma, PostgreSQL
   Status: In Progress
   ---

💡 Use 'project <number>' to see detailed information about a specific project.
Example: project 1

Note: Projects data will be loaded from database once seeded.`;

  return [{ type: "output", content: output }];
}

async function handleProject(projectIndex?: string): Promise<CommandResult[]> {
  if (!projectIndex || !projectIndex.trim()) {
    return [{ 
      type: "error", 
      content: "Please specify a project number. Use 'projects' to see the list." 
    }];
  }

  const index = parseInt(projectIndex);
  if (isNaN(index) || index < 1 || index > 3) {
    return [{ 
      type: "error", 
      content: `Project ${projectIndex} not found. Use 'projects' to see available projects.` 
    }];
  }

  // Mock detailed project data
  const projects = {
    1: {
      title: "K1ngs Portfolio v3",
      description: "Modern portfolio website with terminal interface",
      content: `This portfolio represents a modern approach to showcasing technical skills and projects. Built with cutting-edge technologies, it features a unique terminal-style interface that provides an interactive and engaging user experience.

The project demonstrates proficiency in full-stack development, from React-based frontend to Fastify backend with PostgreSQL database.`,
      technologies: "React 19, TypeScript, tRPC, Fastify, PostgreSQL, Prisma, TailwindCSS, Zustand, Framer Motion",
      status: "Active Development",
      github: "https://github.com/k1ngS/k1ngs-portfolio",
      demo: "https://k1ngs.dev (coming soon)"
    },
    2: {
      title: "Terminal Interface System",
      description: "Interactive command-line portfolio experience",
      content: `A sophisticated terminal emulator built in React that provides a nostalgic yet modern way to explore portfolio content. Features include command history, theme switching, keyboard navigation, and responsive design.

The terminal supports multiple themes (matrix, cyberpunk, hacker, retro, professional) and includes accessibility features for keyboard-only navigation.`,
      technologies: "React, Zustand, Framer Motion, TailwindCSS, TypeScript",
      status: "In Progress",
      github: "Part of main portfolio repository",
      demo: "Live in this interface!"
    },
    3: {
      title: "Full-Stack Authentication",
      description: "Secure authentication system with Better Auth",
      content: `Implementation of a complete authentication system using Better Auth, featuring secure session management, password hashing, and protected routes.

The system includes role-based access control for admin functionality and is designed with security best practices in mind.`,
      technologies: "Better Auth, Prisma, PostgreSQL, bcrypt, TypeScript",
      status: "In Progress",
      github: "Private repository",
      demo: "Admin panel (requires authentication)"
    }
  };

  const project = projects[index as keyof typeof projects];
  
  const projectDetail = `📦 ${project.title}

${project.description}

${project.content}

🛠️  Technologies: ${project.technologies}
📅 Status: ${project.status}

🔗 Links:
  Demo: ${project.demo}
  GitHub: ${project.github}

💡 Use 'projects' to see all projects`;

  return [{ type: "output", content: projectDetail }];
}

async function handleSkills(): Promise<CommandResult[]> {
  // Mock skills data
  const skillsOutput = `💪 Technical Skills

🎨 FRONTEND
  React: ██████████ 95% 5y ✅
  TypeScript: ████████░░ 90% 4y ✅
  Next.js: ████████░░ 85% 3y
  TailwindCSS: █████████░ 90% 3y
  Framer Motion: ███████░░░ 75% 2y 🆕

⚙️ BACKEND
  Node.js: █████████░ 90% 5y ✅
  Fastify: ████████░░ 80% 2y 🆕
  tRPC: ███████░░░ 70% 1y 🆕
  Express: ████████░░ 85% 4y

🗄️ DATABASE
  PostgreSQL: ████████░░ 80% 3y ✅
  Prisma: ███████░░░ 75% 2y
  MongoDB: ███████░░░ 70% 2y
  Redis: ██████░░░░ 60% 1y

🚀 DEVOPS
  Docker: ███████░░░ 75% 2y
  GitHub Actions: ██████░░░░ 65% 1y 🆕
  Vercel: ████████░░ 80% 2y
  AWS: █████░░░░░ 50% 1y

📱 MOBILE
  React Native: ███████░░░ 70% 2y
  Expo: ██████░░░░ 65% 1y 🆕

🤝 SOFT SKILLS
  Problem Solving: ██████████ 95% 8y
  Communication: █████████░ 88% 8y
  Team Leadership: ███████░░░ 75% 3y
  Project Management: ██████░░░░ 65% 2y

📊 Legend: Level (0-100%), 🆕 New, ✅ Certified, Ny = Years of experience

Note: Skills data will be loaded from database once seeded.`;

  return [{ type: "output", content: skillsOutput }];
}

async function handleContact(): Promise<CommandResult[]> {
  const contactText = `📬 Get In Touch

I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!

🔗 Connect with me:
  📧 Email: contact@k1ngs.dev (placeholder)
  💼 LinkedIn: linkedin.com/in/k1ngs (placeholder)
  🐱 GitHub: github.com/k1ngS
  🌐 Portfolio: k1ngs.dev (placeholder)

💡 Preferred contact method: Email or LinkedIn
🕒 Response time: Usually within 24-48 hours

Feel free to reach out for:
- Job opportunities
- Collaboration projects  
- Technical discussions
- Freelance work
- Open source contributions

Note: Contact information will be updated from database once seeded.`;

  return [{ type: "output", content: contactText }];
}

function handleTheme(themeName?: string): CommandResult[] {
  if (!themeName || !themeName.trim()) {
    const availableThemes = Object.keys(THEME_MAP).join(", ");
    return [{ 
      type: "error", 
      content: `Please specify a theme. Available themes: ${availableThemes}` 
    }];
  }

  const theme = THEME_MAP[themeName.toLowerCase()];
  if (!theme) {
    const availableThemes = Object.keys(THEME_MAP).join(", ");
    return [{ 
      type: "error", 
      content: `Theme '${themeName}' not found. Available themes: ${availableThemes}` 
    }];
  }

  // Theme change will be handled by the caller (terminal component)
  return [{ 
    type: "system", 
    content: `Theme will be changed to: ${theme}` 
  }];
}

function handleClear(): CommandResult[] {
  // Clear command will be handled by the caller (terminal component)
  return [{ 
    type: "system", 
    content: "Terminal cleared" 
  }];
}

function handleUnknownCommand(command: string): CommandResult[] {
  return [{ 
    type: "error", 
    content: `Command '${command}' not found. Type 'help' to see available commands.` 
  }];
}

// Helper function to get theme from theme command
export function extractThemeFromCommand(command: string): TerminalTheme | null {
  const [cmd, themeName] = command.toLowerCase().split(" ");
  if (cmd === "theme" && themeName) {
    return THEME_MAP[themeName] || null;
  }
  return null;
}