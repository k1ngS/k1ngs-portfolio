# Tutorial Refatorado - K1ngs Portfolio Terminal 2025

## Visão Geral do Projeto

Este documento detalha as modificações necessárias para transformar o projeto atual em um portfólio terminal interativo moderno, considerando as versões mais recentes das tecnologias em 2025.

### Estado Atual vs Estado Desejado

**Estado Atual:**
- Monorepo com Better-T-Stack (Fastify + tRPC + Prisma)
- Frontend básico com TanStack Router
- Backend com autenticação simples
- Estrutura de banco de dados básica (User, Session, Account)

**Estado Desejado:**
- Portfólio terminal interativo completo
- Sistema de comandos avançado
- Integração com dados reais do portfólio
- Interface terminal moderna e responsiva

## 1. Backend - Expansão e Melhorias

### 1.1 Schema Prisma - Expansão Completa

**Arquivo:** `apps/server/prisma/schema/schema.prisma`

**Modificações Necessárias:**

```prisma
// Adicionar novos modelos ao schema existente

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  longDescription String?
  technologies ProjectTechnology[]
  tags        ProjectTag[]
  githubUrl   String?
  liveUrl     String?
  imageUrl    String?
  featured    Boolean  @default(false)
  category    Category
  status      ProjectStatus @default(COMPLETED)
  startDate   DateTime?
  endDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("projects")
}

model Technology {
  id       String              @id @default(cuid())
  name     String              @unique
  icon     String?
  color    String?
  category TechnologyCategory
  projects ProjectTechnology[]
  skills   Skill[]

  @@map("technologies")
}

model ProjectTechnology {
  id           String     @id @default(cuid())
  projectId    String
  technologyId String
  project      Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  technology   Technology @relation(fields: [technologyId], references: [id], onDelete: Cascade)

  @@unique([projectId, technologyId])
  @@map("project_technologies")
}

model Tag {
  id       String       @id @default(cuid())
  name     String       @unique
  color    String?
  projects ProjectTag[]

  @@map("tags")
}

model ProjectTag {
  id        String  @id @default(cuid())
  projectId String
  tagId     String
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@unique([projectId, tagId])
  @@map("project_tags")
}

model Skill {
  id           String     @id @default(cuid())
  name         String
  level        SkillLevel
  category     SkillCategory
  technologyId String?
  technology   Technology? @relation(fields: [technologyId], references: [id])
  userId       String
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  @@map("skills")
}

model Contact {
  id        String        @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  status    ContactStatus @default(UNREAD)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt

  @@map("contacts")
}

model Experience {
  id          String    @id @default(cuid())
  company     String
  position    String
  description String?
  startDate   DateTime
  endDate     DateTime?
  current     Boolean   @default(false)
  location    String?
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("experiences")
}

model Education {
  id          String   @id @default(cuid())
  institution String
  degree      String
  field       String?
  startDate   DateTime
  endDate     DateTime?
  current     Boolean  @default(false)
  description String?
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("education")
}

// Enums
enum Role {
  USER
  ADMIN
}

enum Category {
  WEB_DEVELOPMENT
  MOBILE_DEVELOPMENT
  DESKTOP_APPLICATION
  API_BACKEND
  DATA_SCIENCE
  MACHINE_LEARNING
  DEVOPS
  OTHER
}

enum ProjectStatus {
  PLANNING
  IN_PROGRESS
  COMPLETED
  ARCHIVED
}

enum TechnologyCategory {
  FRONTEND
  BACKEND
  DATABASE
  DEVOPS
  MOBILE
  DESIGN
  OTHER
}

enum SkillLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

enum SkillCategory {
  PROGRAMMING_LANGUAGE
  FRAMEWORK
  TOOL
  SOFT_SKILL
  OTHER
}

enum ContactStatus {
  UNREAD
  READ
  REPLIED
  ARCHIVED
}

// Atualizar modelo User existente
model User {
  id           String       @id @default(cuid())
  name         String?
  email        String       @unique
  emailVerified DateTime?   @map("email_verified")
  image        String?
  role         Role         @default(USER)
  bio          String?
  location     String?
  website      String?
  github       String?
  linkedin     String?
  twitter      String?
  createdAt    DateTime     @default(now()) @map("created_at")
  updatedAt    DateTime     @updatedAt @map("updated_at")
  
  // Relacionamentos
  accounts     Account[]
  sessions     Session[]
  projects     Project[]
  skills       Skill[]
  experiences  Experience[]
  education    Education[]

  @@map("users")
}
```

### 1.2 Seed do Banco de Dados

**Arquivo:** `apps/server/prisma/seed.ts` (CRIAR)

```typescript
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@k1ngs.dev' },
    update: {},
    create: {
      email: 'admin@k1ngs.dev',
      name: 'K1ngs Developer',
      role: 'ADMIN',
      bio: 'Full Stack Developer especializado em tecnologias modernas',
      location: 'Brasil',
      website: 'https://k1ngs.dev',
      github: 'https://github.com/k1ngs',
      linkedin: 'https://linkedin.com/in/k1ngs',
    },
  })

  // Criar tecnologias
  const technologies = [
    { name: 'React', icon: 'react', color: '#61DAFB', category: 'FRONTEND' },
    { name: 'TypeScript', icon: 'typescript', color: '#3178C6', category: 'FRONTEND' },
    { name: 'Node.js', icon: 'nodejs', color: '#339933', category: 'BACKEND' },
    { name: 'Fastify', icon: 'fastify', color: '#000000', category: 'BACKEND' },
    { name: 'Prisma', icon: 'prisma', color: '#2D3748', category: 'DATABASE' },
    { name: 'PostgreSQL', icon: 'postgresql', color: '#336791', category: 'DATABASE' },
    { name: 'TailwindCSS', icon: 'tailwindcss', color: '#06B6D4', category: 'FRONTEND' },
    { name: 'Docker', icon: 'docker', color: '#2496ED', category: 'DEVOPS' },
  ]

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    })
  }

  // Criar projetos de exemplo
  const reactTech = await prisma.technology.findUnique({ where: { name: 'React' } })
  const typescriptTech = await prisma.technology.findUnique({ where: { name: 'TypeScript' } })
  const nodeTech = await prisma.technology.findUnique({ where: { name: 'Node.js' } })

  const project1 = await prisma.project.create({
    data: {
      title: 'Portfolio Terminal',
      description: 'Portfólio interativo com interface de terminal',
      longDescription: 'Um portfólio único que simula um terminal Linux, permitindo navegação através de comandos.',
      category: 'WEB_DEVELOPMENT',
      featured: true,
      githubUrl: 'https://github.com/k1ngs/portfolio-terminal',
      liveUrl: 'https://k1ngs.dev',
      userId: adminUser.id,
      technologies: {
        create: [
          { technologyId: reactTech!.id },
          { technologyId: typescriptTech!.id },
        ],
      },
    },
  })

  // Criar skills
  const skills = [
    { name: 'React', level: 'EXPERT', category: 'FRAMEWORK', technologyId: reactTech!.id },
    { name: 'TypeScript', level: 'ADVANCED', category: 'PROGRAMMING_LANGUAGE', technologyId: typescriptTech!.id },
    { name: 'Node.js', level: 'ADVANCED', category: 'PROGRAMMING_LANGUAGE', technologyId: nodeTech!.id },
    { name: 'Liderança', level: 'INTERMEDIATE', category: 'SOFT_SKILL' },
    { name: 'Comunicação', level: 'ADVANCED', category: 'SOFT_SKILL' },
  ]

  for (const skill of skills) {
    await prisma.skill.create({
      data: {
        ...skill,
        userId: adminUser.id,
      },
    })
  }

  // Criar experiências
  await prisma.experience.create({
    data: {
      company: 'Tech Company',
      position: 'Senior Full Stack Developer',
      description: 'Desenvolvimento de aplicações web modernas usando React, Node.js e TypeScript.',
      startDate: new Date('2022-01-01'),
      current: true,
      location: 'Remote',
      userId: adminUser.id,
    },
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### 1.3 Rotas tRPC para Portfólio

**Arquivo:** `apps/server/src/routers/portfolio.ts` (CRIAR)

```typescript
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../lib/trpc'

export const portfolioRouter = router({
  // Projetos
  getProjects: publicProcedure
    .input(
      z.object({
        featured: z.boolean().optional(),
        category: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.project.findMany({
        where: {
          ...(input.featured && { featured: true }),
          ...(input.category && { category: input.category as any }),
        },
        include: {
          technologies: {
            include: {
              technology: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
        take: input.limit,
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),

  getProjectById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: { id: input.id },
        include: {
          technologies: {
            include: {
              technology: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      })
    }),

  // Skills
  getSkills: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        level: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.skill.findMany({
        where: {
          ...(input.category && { category: input.category as any }),
          ...(input.level && { level: input.level as any }),
        },
        include: {
          technology: true,
        },
        orderBy: {
          level: 'desc',
        },
      })
    }),

  // Tecnologias
  getTechnologies: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.technology.findMany({
      include: {
        _count: {
          select: {
            projects: true,
            skills: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
  }),

  // Experiências
  getExperiences: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.experience.findMany({
      orderBy: {
        startDate: 'desc',
      },
    })
  }),

  // Educação
  getEducation: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.education.findMany({
      orderBy: {
        startDate: 'desc',
      },
    })
  }),

  // Contato
  createContact: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        subject: z.string().optional(),
        message: z.string().min(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.contact.create({
        data: input,
      })
    }),

  // Admin routes
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  }),

  updateContactStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['UNREAD', 'READ', 'REPLIED', 'ARCHIVED']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.contact.update({
        where: { id: input.id },
        data: { status: input.status as any },
      })
    }),
})
```

### 1.4 Atualização do Router Principal

**Arquivo:** `apps/server/src/routers/index.ts`

**Modificações:**

```typescript
import { router } from '../lib/trpc'
import { portfolioRouter } from './portfolio'

export const appRouter = router({
  portfolio: portfolioRouter,
  // outros routers existentes...
})

export type AppRouter = typeof appRouter
```

### 1.5 Atualização do package.json do Server

**Arquivo:** `apps/server/package.json`

**Adicionar scripts:**

```json
{
  "scripts": {
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset --force && bun run db:seed",
    "db:studio": "prisma studio"
  }
}
```

## 2. Frontend - Implementação do Terminal

### 2.1 Tipos TypeScript para Terminal

**Arquivo:** `apps/web/src/types/terminal.ts` (CRIAR)

```typescript
export interface TerminalEntry {
  id: string
  command: string
  output: React.ReactNode
  timestamp: Date
  type: 'command' | 'output' | 'error' | 'info'
}

export interface Command {
  name: string
  description: string
  usage: string
  aliases?: string[]
  category: CommandCategory
  handler: (args: string[], context: TerminalContext) => Promise<React.ReactNode> | React.ReactNode
}

export type CommandCategory = 'navigation' | 'portfolio' | 'system' | 'social' | 'help'

export interface TerminalContext {
  currentPath: string
  setCurrentPath: (path: string) => void
  addEntry: (entry: Omit<TerminalEntry, 'id' | 'timestamp'>) => void
  clearHistory: () => void
  theme: TerminalTheme
  setTheme: (theme: TerminalTheme) => void
}

export interface TerminalTheme {
  name: string
  background: string
  foreground: string
  cursor: string
  selection: string
  black: string
  red: string
  green: string
  yellow: string
  blue: string
  magenta: string
  cyan: string
  white: string
  brightBlack: string
  brightRed: string
  brightGreen: string
  brightYellow: string
  brightBlue: string
  brightMagenta: string
  brightCyan: string
  brightWhite: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: Array<{
    technology: {
      id: string
      name: string
      icon?: string
      color?: string
    }
  }>
  tags: Array<{
    tag: {
      id: string
      name: string
      color?: string
    }
  }>
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
  category: string
  status: string
  startDate?: string
  endDate?: string
  createdAt: string
}

export interface Skill {
  id: string
  name: string
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  category: string
  technology?: {
    id: string
    name: string
    icon?: string
    color?: string
  }
}

export interface Experience {
  id: string
  company: string
  position: string
  description?: string
  startDate: string
  endDate?: string
  current: boolean
  location?: string
}

export interface Contact {
  name: string
  email: string
  subject?: string
  message: string
}
```

### 2.2 Store do Terminal (Zustand)

**Arquivo:** `apps/web/src/stores/terminalStore.ts` (CRIAR)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TerminalEntry, TerminalTheme } from '../types/terminal'

interface TerminalState {
  // Estado
  history: TerminalEntry[]
  currentPath: string
  isLoading: boolean
  theme: TerminalTheme
  
  // Ações
  addEntry: (entry: Omit<TerminalEntry, 'id' | 'timestamp'>) => void
  clearHistory: () => void
  setCurrentPath: (path: string) => void
  setLoading: (loading: boolean) => void
  setTheme: (theme: TerminalTheme) => void
}

const defaultTheme: TerminalTheme = {
  name: 'default',
  background: '#1a1a1a',
  foreground: '#ffffff',
  cursor: '#ffffff',
  selection: '#444444',
  black: '#000000',
  red: '#ff5555',
  green: '#50fa7b',
  yellow: '#f1fa8c',
  blue: '#bd93f9',
  magenta: '#ff79c6',
  cyan: '#8be9fd',
  white: '#f8f8f2',
  brightBlack: '#6272a4',
  brightRed: '#ff6e6e',
  brightGreen: '#69ff94',
  brightYellow: '#ffffa5',
  brightBlue: '#d6acff',
  brightMagenta: '#ff92df',
  brightCyan: '#a4ffff',
  brightWhite: '#ffffff',
}

export const useTerminalStore = create<TerminalState>()(n  persist(
    (set, get) => ({
      history: [],
      currentPath: '~',
      isLoading: false,
      theme: defaultTheme,
      
      addEntry: (entry) => {
        const newEntry: TerminalEntry = {
          ...entry,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        }
        set((state) => ({
          history: [...state.history, newEntry],
        }))
      },
      
      clearHistory: () => {
        set({ history: [] })
      },
      
      setCurrentPath: (path) => {
        set({ currentPath: path })
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading })
      },
      
      setTheme: (theme) => {
        set({ theme })
      },
    }),
    {
      name: 'terminal-storage',
      partialize: (state) => ({
        theme: state.theme,
        currentPath: state.currentPath,
      }),
    }
  )
)
```

### 2.3 Processador de Comandos

**Arquivo:** `apps/web/src/utils/commandProcessor.tsx` (CRIAR)

```typescript
import React from 'react'
import type { Command, TerminalContext } from '../types/terminal'
import { trpc } from './trpc'

// Temas disponíveis
const themes = {
  default: {
    name: 'default',
    background: '#1a1a1a',
    foreground: '#ffffff',
    cursor: '#ffffff',
    selection: '#444444',
    // ... resto das cores
  },
  matrix: {
    name: 'matrix',
    background: '#000000',
    foreground: '#00ff00',
    cursor: '#00ff00',
    selection: '#003300',
    // ... resto das cores em verde
  },
  ocean: {
    name: 'ocean',
    background: '#001122',
    foreground: '#00aaff',
    cursor: '#00aaff',
    selection: '#002244',
    // ... resto das cores em azul
  },
}

// Comandos disponíveis
export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Mostra todos os comandos disponíveis',
    usage: 'help [comando]',
    category: 'help',
    handler: (args) => {
      if (args.length > 0) {
        const cmd = commands[args[0]]
        if (cmd) {
          return (
            <div className="space-y-2">
              <div className="text-cyan-400 font-bold">{cmd.name}</div>
              <div className="text-gray-300">{cmd.description}</div>
              <div className="text-yellow-400">Uso: {cmd.usage}</div>
              {cmd.aliases && (
                <div className="text-purple-400">
                  Aliases: {cmd.aliases.join(', ')}
                </div>
              )}
            </div>
          )
        } else {
          return <div className="text-red-400">Comando '{args[0]}' não encontrado</div>
        }
      }
      
      const categories = {
        navigation: 'Navegação',
        portfolio: 'Portfólio',
        system: 'Sistema',
        social: 'Social',
        help: 'Ajuda',
      }
      
      return (
        <div className="space-y-4">
          <div className="text-green-400 font-bold text-lg">
            Comandos Disponíveis:
          </div>
          {Object.entries(categories).map(([category, title]) => {
            const categoryCommands = Object.values(commands).filter(
              (cmd) => cmd.category === category
            )
            if (categoryCommands.length === 0) return null
            
            return (
              <div key={category} className="space-y-2">
                <div className="text-cyan-400 font-semibold">{title}:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                  {categoryCommands.map((cmd) => (
                    <div key={cmd.name} className="flex justify-between">
                      <span className="text-yellow-400">{cmd.name}</span>
                      <span className="text-gray-400 text-sm">
                        {cmd.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
          <div className="text-gray-400 text-sm mt-4">
            Digite 'help [comando]' para mais informações sobre um comando específico.
          </div>
        </div>
      )
    },
  },
  
  about: {
    name: 'about',
    description: 'Informações sobre o desenvolvedor',
    usage: 'about',
    aliases: ['whoami'],
    category: 'portfolio',
    handler: () => {
      return (
        <div className="space-y-4">
          <div className="text-green-400 font-bold text-xl">
            👋 Olá! Eu sou K1ngs
          </div>
          <div className="text-gray-300 space-y-2">
            <p>
              Sou um desenvolvedor Full Stack apaixonado por tecnologia e inovação.
              Especializado em React, Node.js, TypeScript e tecnologias modernas.
            </p>
            <p>
              Este portfólio foi criado para simular um terminal Linux,
              proporcionando uma experiência única de navegação.
            </p>
          </div>
          <div className="text-cyan-400">
            📍 Localização: Brasil<br/>
            💼 Posição: Senior Full Stack Developer<br/>
            🎯 Foco: Desenvolvimento Web Moderno
          </div>
        </div>
      )
    },
  },
  
  projects: {
    name: 'projects',
    description: 'Lista todos os projetos',
    usage: 'projects [--featured]',
    category: 'portfolio',
    handler: async (args) => {
      const featured = args.includes('--featured')
      
      try {
        const { data: projects } = await trpc.portfolio.getProjects.query({
          featured,
          limit: 20,
        })
        
        if (!projects || projects.length === 0) {
          return <div className="text-yellow-400">Nenhum projeto encontrado.</div>
        }
        
        return (
          <div className="space-y-4">
            <div className="text-green-400 font-bold text-lg">
              {featured ? '⭐ Projetos em Destaque:' : '📁 Todos os Projetos:'}
            </div>
            {projects.map((project, index) => (
              <div key={project.id} className="border-l-2 border-cyan-400 pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold">
                    {index + 1}. {project.title}
                  </span>
                  {project.featured && <span className="text-red-400">⭐</span>}
                </div>
                <div className="text-gray-300">{project.description}</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(({ technology }) => (
                    <span
                      key={technology.id}
                      className="px-2 py-1 bg-gray-700 text-xs rounded"
                      style={{ color: technology.color || '#ffffff' }}
                    >
                      {technology.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      📂 GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      🌐 Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      } catch (error) {
        return (
          <div className="text-red-400">
            Erro ao carregar projetos: {error instanceof Error ? error.message : 'Erro desconhecido'}
          </div>
        )
      }
    },
  },
  
  skills: {
    name: 'skills',
    description: 'Mostra habilidades técnicas',
    usage: 'skills [categoria]',
    category: 'portfolio',
    handler: async (args) => {
      const category = args[0]
      
      try {
        const { data: skills } = await trpc.portfolio.getSkills.query({
          category,
        })
        
        if (!skills || skills.length === 0) {
          return <div className="text-yellow-400">Nenhuma habilidade encontrada.</div>
        }
        
        const groupedSkills = skills.reduce((acc, skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = []
          }
          acc[skill.category].push(skill)
          return acc
        }, {} as Record<string, typeof skills>)
        
        const levelColors = {
          BEGINNER: 'text-red-400',
          INTERMEDIATE: 'text-yellow-400',
          ADVANCED: 'text-blue-400',
          EXPERT: 'text-green-400',
        }
        
        const levelIcons = {
          BEGINNER: '⭐',
          INTERMEDIATE: '⭐⭐',
          ADVANCED: '⭐⭐⭐',
          EXPERT: '⭐⭐⭐⭐',
        }
        
        return (
          <div className="space-y-4">
            <div className="text-green-400 font-bold text-lg">
              🛠️ Habilidades Técnicas:
            </div>
            {Object.entries(groupedSkills).map(([cat, categorySkills]) => (
              <div key={cat} className="space-y-2">
                <div className="text-cyan-400 font-semibold">
                  {cat.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center">
                      <span className="text-white">{skill.name}</span>
                      <span className={`text-sm ${levelColors[skill.level]}`}>
                        {levelIcons[skill.level]} {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      } catch (error) {
        return (
          <div className="text-red-400">
            Erro ao carregar habilidades: {error instanceof Error ? error.message : 'Erro desconhecido'}
          </div>
        )
      }
    },
  },
  
  contact: {
    name: 'contact',
    description: 'Informações de contato',
    usage: 'contact',
    category: 'social',
    handler: () => {
      return (
        <div className="space-y-4">
          <div className="text-green-400 font-bold text-lg">
            📞 Entre em Contato:
          </div>
          <div className="space-y-2 text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">📧 Email:</span>
              <a href="mailto:contact@k1ngs.dev" className="text-blue-400 hover:underline">
                contact@k1ngs.dev
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">🐙 GitHub:</span>
              <a
                href="https://github.com/k1ngs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                github.com/k1ngs
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">💼 LinkedIn:</span>
              <a
                href="https://linkedin.com/in/k1ngs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/k1ngs
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">🌐 Website:</span>
              <a
                href="https://k1ngs.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                k1ngs.dev
              </a>
            </div>
          </div>
          <div className="text-yellow-400 text-sm">
            💡 Dica: Use o comando 'send-message' para enviar uma mensagem diretamente!
          </div>
        </div>
      )
    },
  },
  
  clear: {
    name: 'clear',
    description: 'Limpa o terminal',
    usage: 'clear',
    aliases: ['cls'],
    category: 'system',
    handler: (args, context) => {
      context.clearHistory()
      return null
    },
  },
  
  theme: {
    name: 'theme',
    description: 'Altera o tema do terminal',
    usage: 'theme [nome-do-tema]',
    category: 'system',
    handler: (args, context) => {
      if (args.length === 0) {
        return (
          <div className="space-y-2">
            <div className="text-green-400 font-bold">Temas Disponíveis:</div>
            {Object.keys(themes).map((themeName) => (
              <div key={themeName} className="flex items-center gap-2">
                <span className="text-yellow-400">{themeName}</span>
                {context.theme.name === themeName && (
                  <span className="text-green-400">(atual)</span>
                )}
              </div>
            ))}
            <div className="text-gray-400 text-sm mt-2">
              Use 'theme [nome]' para alterar o tema.
            </div>
          </div>
        )
      }
      
      const themeName = args[0]
      const newTheme = themes[themeName as keyof typeof themes]
      
      if (!newTheme) {
        return (
          <div className="text-red-400">
            Tema '{themeName}' não encontrado. Temas disponíveis: {Object.keys(themes).join(', ')}
          </div>
        )
      }
      
      context.setTheme(newTheme)
      return (
        <div className="text-green-400">
          Tema alterado para '{themeName}' ✨
        </div>
      )
    },
  },
  
  pwd: {
    name: 'pwd',
    description: 'Mostra o diretório atual',
    usage: 'pwd',
    category: 'navigation',
    handler: (args, context) => {
      return <div className="text-cyan-400">{context.currentPath}</div>
    },
  },
  
  ls: {
    name: 'ls',
    description: 'Lista arquivos e diretórios',
    usage: 'ls [diretório]',
    category: 'navigation',
    handler: (args, context) => {
      const directories = {
        '~': ['projects/', 'skills/', 'about.txt', 'contact.txt'],
        '~/projects': ['web-apps/', 'mobile-apps/', 'apis/', 'tools/'],
        '~/skills': ['frontend.txt', 'backend.txt', 'devops.txt', 'soft-skills.txt'],
      }
      
      const currentDir = args[0] || context.currentPath
      const files = directories[currentDir as keyof typeof directories] || []
      
      if (files.length === 0) {
        return <div className="text-yellow-400">Diretório vazio ou não encontrado.</div>
      }
      
      return (
        <div className="space-y-1">
          {files.map((file) => (
            <div key={file} className="flex items-center gap-2">
              <span className={file.endsWith('/') ? 'text-blue-400' : 'text-white'}>
                {file.endsWith('/') ? '📁' : '📄'} {file}
              </span>
            </div>
          ))}
        </div>
      )
    },
  },
  
  date: {
    name: 'date',
    description: 'Mostra a data e hora atual',
    usage: 'date',
    category: 'system',
    handler: () => {
      const now = new Date()
      return (
        <div className="text-cyan-400">
          {now.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>
      )
    },
  },
}

// Função para processar comandos
export async function processCommand(
  input: string,
  context: TerminalContext
): Promise<React.ReactNode> {
  const [commandName, ...args] = input.trim().split(' ')
  
  if (!commandName) {
    return null
  }
  
  // Procurar comando por nome ou alias
  const command = Object.values(commands).find(
    (cmd) => cmd.name === commandName || cmd.aliases?.includes(commandName)
  )
  
  if (!command) {
    return (
      <div className="text-red-400">
        Comando '{commandName}' não encontrado. Digite 'help' para ver os comandos disponíveis.
      </div>
    )
  }
  
  try {
    return await command.handler(args, context)
  } catch (error) {
    return (
      <div className="text-red-400">
        Erro ao executar comando: {error instanceof Error ? error.message : 'Erro desconhecido'}
      </div>
    )
  }
}
```

### 2.4 Componente Terminal Principal

**Arquivo:** `apps/web/src/components/terminal/Terminal.tsx` (CRIAR)

```typescript
import React, { useState, useRef, useEffect } from 'react'
import { useTerminalStore } from '../../stores/terminalStore'
import { processCommand } from '../../utils/commandProcessor'
import type { TerminalContext } from '../../types/terminal'

const Terminal: React.FC = () => {
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  
  const {
    history,
    currentPath,
    theme,
    addEntry,
    clearHistory,
    setCurrentPath,
    setTheme,
  } = useTerminalStore()
  
  // Auto-focus no input
  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus()
    }
  }, [isProcessing])
  
  // Auto-scroll para o final
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])
  
  // Aplicar tema
  useEffect(() => {
    document.documentElement.style.setProperty('--terminal-bg', theme.background)
    document.documentElement.style.setProperty('--terminal-fg', theme.foreground)
    document.documentElement.style.setProperty('--terminal-cursor', theme.cursor)
  }, [theme])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isProcessing) return
    
    const command = input.trim()
    setInput('')
    setIsProcessing(true)
    
    // Adicionar comando ao histórico
    addEntry({
      command,
      output: null,
      type: 'command',
    })
    
    // Criar contexto do terminal
    const context: TerminalContext = {
      currentPath,
      setCurrentPath,
      addEntry,
      clearHistory,
      theme,
      setTheme,
    }
    
    try {
      // Processar comando
      const output = await processCommand(command, context)
      
      if (output !== null) {
        addEntry({
          command,
          output,
          type: 'output',
        })
      }
    } catch (error) {
      addEntry({
        command,
        output: (
          <div className="text-red-400">
            Erro: {error instanceof Error ? error.message : 'Erro desconhecido'}
          </div>
        ),
        type: 'error',
      })
    } finally {
      setIsProcessing(false)
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+C para cancelar
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      setInput('')
      setIsProcessing(false)
    }
    
    // Ctrl+L para limpar
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      clearHistory()
    }
  }
  
  return (
    <div 
      className="h-screen w-full font-mono text-sm overflow-hidden flex flex-col"
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 ml-4">k1ngs@portfolio:~$</span>
        </div>
        <div className="text-gray-400 text-xs">
          Tema: {theme.name} | Digite 'help' para começar
        </div>
      </div>
      
      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {/* Welcome Message */}
        {history.length === 0 && (
          <div className="space-y-4 mb-6">
            <div className="text-green-400 font-bold text-lg">
              🚀 Bem-vindo ao K1ngs Portfolio Terminal!
            </div>
            <div className="text-gray-300 space-y-2">
              <p>Este é um portfólio interativo que simula um terminal Linux.</p>
              <p>Digite <span className="text-yellow-400 font-semibold">help</span> para ver todos os comandos disponíveis.</p>
              <p>Use <span className="text-cyan-400 font-semibold">about</span> para saber mais sobre mim.</p>
            </div>
            <div className="text-purple-400 text-sm">
              💡 Dica: Você pode usar Tab para autocompletar comandos!
            </div>
          </div>
        )}
        
        {/* Command History */}
        {history.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.type === 'command' && (
              <div className="flex items-center gap-2">
                <span className="text-green-400">k1ngs@portfolio</span>
                <span className="text-blue-400">{currentPath}</span>
                <span className="text-white">$</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <div className="ml-4">
                {entry.output}
              </div>
            )}
          </div>
        ))}
        
        {/* Current Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400">k1ngs@portfolio</span>
          <span className="text-blue-400">{currentPath}</span>
          <span className="text-white">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white"
            style={{ caretColor: theme.cursor }}
            disabled={isProcessing}
            autoComplete="off"
            spellCheck={false}
          />
          {isProcessing && (
            <div className="text-yellow-400 animate-pulse">⏳</div>
          )}
        </form>
      </div>
      
      {/* Footer */}
      <div className="p-2 border-t border-gray-700 text-xs text-gray-500 text-center">
        Pressione Ctrl+C para cancelar | Ctrl+L para limpar | Clique em qualquer lugar para focar
      </div>
    </div>
  )
}

export default Terminal
```

### 2.5 Atualização da Página Principal

**Arquivo:** `apps/web/src/routes/index.tsx`

**Substituir conteúdo por:**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import Terminal from '../components/terminal/Terminal'

export const Route = createFileRoute('/')({n  component: () => <Terminal />,
})
```

### 2.6 Estilos CSS Responsivos

**Arquivo:** `apps/web/src/styles/terminal.css` (CRIAR)

```css
/* Terminal Styles */
:root {
  --terminal-bg: #1a1a1a;
  --terminal-fg: #ffffff;
  --terminal-cursor: #ffffff;
}

/* Scrollbar personalizada */
.terminal-scroll::-webkit-scrollbar {
  width: 8px;
}

.terminal-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.terminal-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.terminal-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Animações */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.cursor-blink::after {
  content: '█';
  animation: blink 1s infinite;
  color: var(--terminal-cursor);
}

/* Responsividade */
@media (max-width: 768px) {
  .terminal-container {
    font-size: 12px;
  }
  
  .terminal-header {
    padding: 8px;
  }
  
  .terminal-content {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .terminal-container {
    font-size: 11px;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* Temas */
.theme-matrix {
  --terminal-bg: #000000;
  --terminal-fg: #00ff00;
  --terminal-cursor: #00ff00;
}

.theme-ocean {
  --terminal-bg: #001122;
  --terminal-fg: #00aaff;
  --terminal-cursor: #00aaff;
}

.theme-sunset {
  --terminal-bg: #2d1b69;
  --terminal-fg: #f8f8f2;
  --terminal-cursor: #ff79c6;
}
```

### 2.7 Atualização do CSS Principal

**Arquivo:** `apps/web/src/index.css`

**Adicionar:**

```css
@import './styles/terminal.css';

/* Garantir que o body ocupe toda a tela */
html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Fonte monospace para todo o terminal */
.font-mono {
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Ubuntu Mono', monospace;
}
```

## 3. Configurações e Scripts

### 3.1 Atualização do package.json do Web

**Arquivo:** `apps/web/package.json`

**Adicionar dependências:**

```json
{
  "dependencies": {
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.17.0",
    "@trpc/client": "^10.45.0",
    "@trpc/react-query": "^10.45.0"
  }
}
```

### 3.2 Configuração do tRPC Client

**Arquivo:** `apps/web/src/utils/trpc.ts`

**Atualizar:**

```typescript
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../server/src/routers'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
      // Adicionar headers se necessário
      headers() {
        return {
          // authorization: getAuthCookie(),
        }
      },
    }),
  ],
})
```

### 3.3 Provider do tRPC

**Arquivo:** `apps/web/src/components/providers/TRPCProvider.tsx` (CRIAR)

```typescript
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc, trpcClient } from '../../utils/trpc'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

interface TRPCProviderProps {
  children: React.ReactNode
}

export const TRPCProvider: React.FC<TRPCProviderProps> = ({ children }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
```

### 3.4 Atualização do App Principal

**Arquivo:** `apps/web/src/main.tsx`

**Atualizar:**

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { TRPCProvider } from './components/providers/TRPCProvider'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TRPCProvider>
      <RouterProvider router={router} />
    </TRPCProvider>
  </React.StrictMode>
)
```

## 4. Comandos e Scripts de Desenvolvimento

### 4.1 Scripts do Workspace

**Arquivo:** `package.json` (raiz)

**Atualizar scripts:**

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "start": "turbo run start",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "db:setup": "cd apps/server && bun run db:push && bun run db:seed",
    "db:reset": "cd apps/server && bun run db:reset",
    "db:studio": "cd apps/server && bun run db:studio",
    "clean": "turbo run clean"
  }
}
```

### 4.2 Scripts do Server

**Arquivo:** `apps/server/package.json`

**Adicionar/Atualizar scripts:**

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset --force && bun run db:seed",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "lint": "biome check src/",
    "lint:fix": "biome check --apply src/",
    "type-check": "tsc --noEmit"
  }
}
```

### 4.3 Scripts do Web

**Arquivo:** `apps/web/package.json`

**Adicionar/Atualizar scripts:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "biome check src/",
    "lint:fix": "biome check --apply src/",
    "type-check": "tsc --noEmit"
  }
}
```

## 5. Melhorias e Funcionalidades Avançadas

### 5.1 Sistema de Autocompletar

**Arquivo:** `apps/web/src/hooks/useAutoComplete.ts` (CRIAR)

```typescript
import { useState, useCallback } from 'react'
import { commands } from '../utils/commandProcessor'

export const useAutoComplete = () => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(-1)
  
  const getSuggestions = useCallback((input: string) => {
    if (!input.trim()) {
      setSuggestions([])
      setCurrentSuggestionIndex(-1)
      return []
    }
    
    const commandNames = Object.keys(commands)
    const filtered = commandNames.filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase())
    )
    
    setSuggestions(filtered)
    setCurrentSuggestionIndex(-1)
    return filtered
  }, [])
  
  const getNextSuggestion = useCallback(() => {
    if (suggestions.length === 0) return null
    
    const nextIndex = (currentSuggestionIndex + 1) % suggestions.length
    setCurrentSuggestionIndex(nextIndex)
    return suggestions[nextIndex]
  }, [suggestions, currentSuggestionIndex])
  
  const getPreviousSuggestion = useCallback(() => {
    if (suggestions.length === 0) return null
    
    const prevIndex = currentSuggestionIndex <= 0 
      ? suggestions.length - 1 
      : currentSuggestionIndex - 1
    setCurrentSuggestionIndex(prevIndex)
    return suggestions[prevIndex]
  }, [suggestions, currentSuggestionIndex])
  
  const getCurrentSuggestion = useCallback(() => {
    if (currentSuggestionIndex >= 0 && currentSuggestionIndex < suggestions.length) {
      return suggestions[currentSuggestionIndex]
    }
    return null
  }, [suggestions, currentSuggestionIndex])
  
  const clearSuggestions = useCallback(() => {
    setSuggestions([])
    setCurrentSuggestionIndex(-1)
  }, [])
  
  return {
    suggestions,
    getSuggestions,
    getNextSuggestion,
    getPreviousSuggestion,
    getCurrentSuggestion,
    clearSuggestions,
  }
}
```

### 5.2 Histórico de Comandos

**Arquivo:** `apps/web/src/hooks/useCommandHistory.ts` (CRIAR)

```typescript
import { useState, useCallback } from 'react'

export const useCommandHistory = () => {
  const [history, setHistory] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  
  const addCommand = useCallback((command: string) => {
    if (command.trim() && command !== history[history.length - 1]) {
      setHistory(prev => [...prev, command.trim()])
    }
    setCurrentIndex(-1)
  }, [history])
  
  const getPreviousCommand = useCallback(() => {
    if (history.length === 0) return null
    
    const newIndex = currentIndex === -1 
      ? history.length - 1 
      : Math.max(0, currentIndex - 1)
    
    setCurrentIndex(newIndex)
    return history[newIndex]
  }, [history, currentIndex])
  
  const getNextCommand = useCallback(() => {
    if (history.length === 0 || currentIndex === -1) return ''
    
    const newIndex = Math.min(history.length - 1, currentIndex + 1)
    
    if (newIndex === history.length - 1 && currentIndex === newIndex) {
      setCurrentIndex(-1)
      return ''
    }
    
    setCurrentIndex(newIndex)
    return history[newIndex]
  }, [history, currentIndex])
  
  const clearHistory = useCallback(() => {
    setHistory([])
    setCurrentIndex(-1)
  }, [])
  
  return {
    history,
    addCommand,
    getPreviousCommand,
    getNextCommand,
    clearHistory,
  }
}
```

### 5.3 Comando de Envio de Mensagem

**Arquivo:** `apps/web/src/components/terminal/SendMessageForm.tsx` (CRIAR)

```typescript
import React, { useState } from 'react'
import { trpc } from '../../utils/trpc'

interface SendMessageFormProps {
  onClose: () => void
  onSuccess: () => void
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const createContact = trpc.portfolio.createContact.useMutation()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await createContact.mutateAsync(formData)
      onSuccess()
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  
  return (
    <div className="space-y-4 p-4 border border-gray-600 rounded bg-gray-800">
      <div className="flex justify-between items-center">
        <h3 className="text-green-400 font-bold">📧 Enviar Mensagem</h3>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300"
        >
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-cyan-400 text-sm mb-1">Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-400 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-cyan-400 text-sm mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-400 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-cyan-400 text-sm mb-1">Assunto (opcional):</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-400 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-cyan-400 text-sm mb-1">Mensagem:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-400 outline-none resize-none"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isSubmitting ? '⏳ Enviando...' : '📤 Enviar'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default SendMessageForm
```

## 6. Roadmap de Implementação

### Fase 1: Backend (2-3 dias)
1. ✅ Expandir schema Prisma com novos modelos
2. ✅ Criar seed do banco de dados
3. ✅ Implementar rotas tRPC para portfólio
4. ✅ Atualizar configurações do servidor
5. ✅ Testar APIs com dados reais

### Fase 2: Frontend Base (2-3 dias)
1. ✅ Criar tipos TypeScript para terminal
2. ✅ Implementar store do terminal com Zustand
3. ✅ Desenvolver processador de comandos
4. ✅ Criar componente Terminal principal
5. ✅ Configurar tRPC client

### Fase 3: Funcionalidades Avançadas (2-3 dias)
1. ✅ Sistema de autocompletar comandos
2. ✅ Histórico de comandos (setas para cima/baixo)
3. ✅ Múltiplos temas para o terminal
4. ✅ Formulário de contato integrado
5. ✅ Animações e transições

### Fase 4: Polimento e Deploy (1-2 dias)
1. ✅ Responsividade mobile
2. ✅ Otimizações de performance
3. ✅ Testes finais
4. ✅ Deploy e configuração de produção
5. ✅ Documentação final

## 7. Comandos de Desenvolvimento

### Inicialização do Projeto

```bash
# Instalar dependências
bun install

# Configurar banco de dados
bun run db:setup

# Iniciar desenvolvimento
bun run dev
```

### Comandos Úteis

```bash
# Resetar banco de dados
bun run db:reset

# Visualizar banco de dados
bun run db:studio

# Lint e formatação
bun run lint

# Build para produção
bun run build
```

## 8. Considerações Finais

### Tecnologias Utilizadas (2025)

- **Frontend:** React 18, TanStack Router, TailwindCSS, Zustand
- **Backend:** Fastify, tRPC, Prisma, PostgreSQL
- **Desenvolvimento:** TypeScript, Vite, Turbo, Biome
- **Deploy:** Vercel (frontend), Railway/Render (backend)

### Melhorias Futuras

1. **PWA:** Transformar em Progressive Web App
2. **Temas:** Mais opções de temas personalizáveis
3. **Comandos:** Adicionar mais comandos interativos
4. **Analytics:** Integração com Google Analytics
5. **SEO:** Melhorar otimização para motores de busca
6. **Acessibilidade:** Melhorar suporte a leitores de tela
7. **Performance:** Lazy loading e code splitting
8. **Internacionalização:** Suporte a múltiplos idiomas

### Estrutura Final do Projeto

```
k1ngs-portfolio-v3/
├── apps/
│   ├── web/                    # Frontend React
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── terminal/
│   │   │   │   └── providers/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   ├── styles/
│   │   │   └── routes/
│   │   └── package.json
│   └── server/                 # Backend Fastify
│       ├── src/
│       │   ├── routers/
│       │   ├── lib/
│       │   └── index.ts
│       ├── prisma/
│       │   ├── schema/
│       │   └── seed.ts
│       └── package.json
├── packages/                   # Pacotes compartilhados
├── turbo.json                  # Configuração Turbo
└── package.json               # Workspace root
```

Este documento serve como guia completo para transformar o projeto atual em um portfólio terminal interativo moderno, seguindo as melhores práticas de desenvolvimento de 2025.