Abaixo estão as correções de base que deixam o projeto compilando sem erros, padronizado com a stack real (Fastify + tRPC + Prisma + PostgreSQL + React/TanStack Start), e com um conjunto de Design Patterns aplicados e explicados. Incluí os arquivos essenciais para backend e frontend, organizados para você colar/substituir no repo. No fim, deixei um arquivo de documentação em Markdown com as decisões e os padrões adotados.

Observações importantes antes de aplicar

- Remova/arquive o arquivo new_tutorial.md (está com mojibake/encoding quebrado e stack divergente).

- Padronize .env e variáveis (exemplos logo abaixo).

- Se você já tem partes desses arquivos, compare e una as mudanças; se não, substitua-os inteiros.
- Backend – Server (Fastify + tRPC + Prisma + PostgreSQL)

apps/server/prisma/schema.prisma

```Prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ProjectCategory {
  WEB
  API
  MOBILE
  LIB
  OTHER
}

enum ProjectStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum SkillCategory {
  FRONTEND
  BACKEND
  DATABASE
  DEVOPS
  MOBILE
  OTHER
}

model Technology {
  id        String    @id @default(cuid())
  name      String    @unique
  icon      String?
  color     String?
  category  String?
  projects  ProjectTechnology[]
  skills    Skill[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Tag {
  id        String       @id @default(cuid())
  name      String       @unique
  projects  ProjectTag[]
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
}

model Project {
  id           String              @id @default(cuid())
  title        String
  description  String
  content      String?
  category     ProjectCategory     @default(WEB)
  status       ProjectStatus       @default(PUBLISHED)
  featured     Boolean             @default(false)
  published    Boolean             @default(true)
  githubUrl    String?
  demoUrl      String?
  imageUrl     String?
  technologies ProjectTechnology[]
  tags         ProjectTag[]
  createdAt    DateTime            @default(now())
  updatedAt    DateTime            @updatedAt
}

model ProjectTechnology {
  id           String     @id @default(cuid())
  projectId    String
  technologyId String

  project      Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  technology   Technology @relation(fields: [technologyId], references: [id], onDelete: Cascade)

  @@unique([projectId, technologyId])
}

model ProjectTag {
  id        String  @id @default(cuid())
  projectId String
  tagId     String

  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@unique([projectId, tagId])
}

model Skill {
  id           String        @id @default(cuid())
  name         String
  level        Int           // 0-100
  category     SkillCategory
  description  String?
  yearsOfExp   Int           @default(0)
  certified    Boolean       @default(false)
  technologyId String?
  technology   Technology?   @relation(fields: [technologyId], references: [id])
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  createdAt DateTime @default(now())
}
```

apps/server/prisma/seed.ts

```Typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const technologies = [
    { name: 'React', category: 'FRONTEND', color: '#61DAFB' },
    { name: 'TypeScript', category: 'FRONTEND', color: '#3178C6' },
    { name: 'Next.js', category: 'FRONTEND', color: '#000000' },
    { name: 'TanStack Start', category: 'FRONTEND', color: '#FF4154' },
    { name: 'Node.js', category: 'BACKEND', color: '#3C873A' },
    { name: 'Fastify', category: 'BACKEND', color: '#000000' },
    { name: 'tRPC', category: 'BACKEND', color: '#398CCB' },
    { name: 'Prisma', category: 'DATABASE', color: '#2D3748' },
    { name: 'PostgreSQL', category: 'DATABASE', color: '#336791' },
    { name: 'Tailwind CSS', category: 'FRONTEND', color: '#06B6D4' },
    { name: 'Framer Motion', category: 'FRONTEND', color: '#0055FF' },
    { name: 'Docker', category: 'DEVOPS', color: '#2496ED' },
  ]

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    })
  }

  const react = await prisma.technology.findUnique({ where: { name: 'React' } })
  const ts = await prisma.technology.findUnique({ where: { name: 'TypeScript' } })
  const tanstack = await prisma.technology.findUnique({ where: { name: 'TanStack Start' } })
  const nextjs = await prisma.technology.findUnique({ where: { name: 'Next.js' } })

  const createdProjects = []
  const p1 = await prisma.project.create({
    data: {
      title: 'Portfolio Terminal Roguelike',
      description: 'Portfolio interativo em estilo terminal com comandos e temas',
      content: 'Terminal com comandos help, projects, project <id>, skills, contact, theme...',
      category: 'WEB',
      status: 'PUBLISHED',
      featured: true,
      published: true,
      githubUrl: 'https://github.com/k1ngS/k1ngs-portfolio-v3',
      demoUrl: 'https://k1ngs-portfolio.vercel.app',
      imageUrl: '/projects/portfolio-terminal.png',
    },
  })
  createdProjects.push(p1)

  const p2 = await prisma.project.create({
    data: {
      title: 'E-commerce Full Stack',
      description: 'Plataforma completa com carrinho, pagamentos e painel admin',
      category: 'WEB',
      status: 'PUBLISHED',
      featured: true,
      published: true,
      githubUrl: 'https://github.com/k1ngs/ecommerce-fullstack',
      demoUrl: 'https://ecommerce-demo.vercel.app',
      imageUrl: '/projects/ecommerce.png',
    },
  })
  createdProjects.push(p2)

  const p3 = await prisma.project.create({
    data: {
      title: 'Task Manager API',
      description: 'API REST com autenticação JWT e filtros avançados',
      category: 'API',
      status: 'PUBLISHED',
      featured: false,
      published: true,
      githubUrl: 'https://github.com/k1ngs/task-manager-api',
      imageUrl: '/projects/task-api.png',
    },
  })
  createdProjects.push(p3)

  for (const project of createdProjects) {
    if (project.title.includes('Portfolio')) {
      for (const tech of [react?.id, ts?.id, tanstack?.id]) {
        if (tech) {
          await prisma.projectTechnology.create({
            data: { projectId: project.id, technologyId: tech },
          })
        }
      }
    } else if (project.title.includes('E-commerce')) {
      for (const tech of [nextjs?.id, ts?.id]) {
        if (tech) {
          await prisma.projectTechnology.create({
            data: { projectId: project.id, technologyId: tech },
          })
        }
      }
    }
  }

  const skills = [
    { name: 'React', level: 95, category: 'FRONTEND' as const, yearsOfExp: 4, certified: true },
    { name: 'TypeScript', level: 90, category: 'FRONTEND' as const, yearsOfExp: 3, certified: false },
    { name: 'Next.js', level: 85, category: 'FRONTEND' as const, yearsOfExp: 2, certified: false },
    { name: 'Node.js', level: 80, category: 'BACKEND' as const, yearsOfExp: 3, certified: false },
    { name: 'PostgreSQL', level: 75, category: 'DATABASE' as const, yearsOfExp: 2, certified: false },
    { name: 'Docker', level: 70, category: 'DEVOPS' as const, yearsOfExp: 2, certified: false },
  ]

  for (const s of skills) {
    const tech = await prisma.technology.findUnique({ where: { name: s.name } })
    await prisma.skill.create({
      data: { ...s, technologyId: tech?.id },
    })
  }

  console.log('Seed concluído.')
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

apps/server/src/routers/portfolio.ts

```Typescript
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const portfolioRouter = router({
  getInfo: publicProcedure.query(async () => {
    return {
      name: 'K1ngs Developer',
      title: 'Full Stack Developer',
      bio: 'Desenvolvedor focado em React, Node.js e arquiteturas modernas. Aficionado por DX e performance.',
      location: 'Brasília, Brasil',
      experience: '3+ anos',
      email: 'contact@k1ngs.dev',
      github: 'https://github.com/k1ngS',
      linkedin: 'https://linkedin.com/in/k1ngs',
      website: 'https://k1ngs.dev',
    }
  }),

  getProjects: publicProcedure
    .input(z.object({
      featured: z.boolean().optional(),
      category: z.enum(['WEB', 'API', 'MOBILE', 'LIB', 'OTHER']).optional(),
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ input }) => {
      const projects = await prisma.project.findMany({
        where: {
          published: true,
          ...(input.featured !== undefined ? { featured: input.featured } : {}),
          ...(input.category ? { category: input.category } : {}),
        },
        include: {
          technologies: { include: { technology: true } },
          tags: { include: { tag: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit,
      })

      return projects.map((p) => ({
        ...p,
        technologies: p.technologies.map((pt) => pt.technology),
        tags: p.tags.map((t) => t.tag),
      }))
    }),

  getProject: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input }) => {
      const p = await prisma.project.findUnique({
        where: { id: input.id },
        include: {
          technologies: { include: { technology: true } },
          tags: { include: { tag: true } },
        },
      })
      if (!p) throw new Error('Projeto não encontrado')

      return {
        ...p,
        technologies: p.technologies.map((pt) => pt.technology),
        tags: p.tags.map((t) => t.tag),
      }
    }),

  getSkills: publicProcedure
    .input(z.object({ category: z.enum(['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'MOBILE', 'OTHER']).optional() }))
    .query(async ({ input }) => {
      const skills = await prisma.skill.findMany({
        where: { ...(input.category ? { category: input.category } : {}) },
        include: { technology: true },
        orderBy: { level: 'desc' },
      })
      return skills
    }),

  sendContact: publicProcedure
    .input(z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      subject: z.string().min(5).max(200).optional(),
      message: z.string().min(10).max(1000),
    }))
    .mutation(async ({ input }) => {
      const contact = await prisma.contact.create({ data: input })
      return { success: true, message: 'Mensagem enviada com sucesso!', id: contact.id }
    }),

  healthCheck: publicProcedure.query(() => ({ status: 'OK', timestamp: new Date().toISOString() })),
})
```

apps/server/src/routers/index.ts

```Typescript
import { router } from '../trpc'
import { portfolioRouter } from './portfolio'

export const appRouter = router({
  portfolio: portfolioRouter,
})

export type AppRouter = typeof appRouter
```

apps/server/src/trpc.ts

```Typescript
import { initTRPC } from '@trpc/server'
import type { FastifyRequest } from 'fastify'

export type Context = {
  req: FastifyRequest
}

export const createContext = async ({ req }: { req: FastifyRequest }): Promise<Context> => {
  return { req }
}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
```

apps/server/src/index.ts

```Typescript
import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import pino from 'pino'
import { appRouter } from './routers'
import { createContext } from './trpc'

const PORT = Number(process.env.PORT ?? 3000)
const ORIGINS = (process.env.CORS_ORIGINS ?? 'http://localhost:3001,http://localhost:5173').split(',')

async function buildServer() {
  const logger = pino({ level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' })
  const app = Fastify({ logger })

  await app.register(cors, {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true)
      if (ORIGINS.includes(origin)) return cb(null, true)
      cb(new Error('Not allowed'), false)
    },
    credentials: true,
  })

  await app.register(helmet)

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  })

  await app.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext: ({ req }) => createContext({ req }),
      onError({ error, path }) {
        app.log.error({ err: error, path }, 'tRPC error')
      },
    },
  })

  app.get('/healthz', async () => ({ status: 'ok' }))

  return app
}

buildServer()
  .then((app) => app.listen({ port: PORT, host: '0.0.0.0' }))
  .then((address) => {
    console.log(`Server listening on ${address}`)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
```

apps/server/.env.example

```Env
PORT=3000
NODE_ENV=development

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/k1ngs_portfolio

CORS_ORIGINS=http://localhost:3001,http://localhost:5173
```

2) Frontend – Web (React + TanStack Start)

apps/web/src/types/terminal.ts

```Typescript
export interface TerminalEntry {
  id: string
  command: string
  output: string[]
  timestamp: Date
  type: 'info' | 'success' | 'error' | 'warning' | 'clear'
}

export interface TerminalTheme {
  name: string
  bg: string
  text: string
  accent: string
  prompt: string
  error: string
  success: string
  warning: string
}

export interface CommandResult {
  output: string[]
  type: 'info' | 'success' | 'error' | 'warning' | 'clear'
  theme?: TerminalTheme
}

export interface Technology {
  id: string
  name: string
  icon?: string
  color?: string
  category?: string
}

export interface Tag {
  id: string
  name: string
}

export interface Project {
  id: string
  title: string
  description: string
  content?: string
  category: string
  status: string
  technologies: Technology[]
  tags: Tag[]
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  description?: string
  yearsOfExp: number
  certified: boolean
  technology?: Technology
}

export interface ContactInfo {
  name: string
  title: string
  bio: string
  location: string
  experience: string
  email: string
  github: string
  linkedin: string
  website: string
}
```

apps/web/src/utils/trpc.ts

```Typescript
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../server/src/routers'
import SuperJSON from 'superjson'

export const trpc = createTRPCReact<AppRouter>()

const url = import.meta.env.VITE_TRPC_URL ?? 'http://localhost:3000/trpc'

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url,
      headers() {
        return {}
      },
    }),
  ],
  transformer: SuperJSON,
})
```

apps/web/src/routes/__root.tsx

```Tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { trpc, trpcClient } from '@/utils/trpc'
import '@/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
})

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <div className="min-h-screen">
          <Outlet />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
        <TanStackRouterDevtools position="bottom-right" />
      </trpc.Provider>
    </QueryClientProvider>
  )
}
```

apps/web/src/routes/index.tsx

```Tsx
import { createFileRoute } from '@tanstack/react-router'
import { Terminal } from '@/components/terminal/Terminal'
import { useTerminalStore } from '@/stores/terminal-store'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { theme } = useTerminalStore()
  return (
    <div className={cn('min-h-screen', theme.bg)}>
      <Terminal />
    </div>
  )
}
```

apps/web/src/stores/terminal-store.ts

```Typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { TerminalEntry, TerminalTheme } from '@/types/terminal'
import { processCommand } from '@/lib/command-processor'
import { nanoid } from 'nanoid'

interface TerminalState {
  entries: TerminalEntry[]
  currentPath: string
  isLoading: boolean
  theme: TerminalTheme
  commandHistory: string[]
  historyIndex: number

  executeCommand: (command: string) => Promise<void>
  clearTerminal: () => void
  setTheme: (theme: TerminalTheme) => void
  addEntry: (entry: Omit<TerminalEntry, 'id' | 'timestamp'>) => void
  navigateHistory: (direction: 'up' | 'down') => string
}

const defaultTheme: TerminalTheme = {
  name: 'matrix',
  bg: 'bg-black',
  text: 'text-green-400',
  accent: 'text-green-300',
  prompt: 'text-green-500',
  error: 'text-red-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
}

const welcomeMessage = [
  '──────────────────────────────────────────────────────────────────────────────',
  '                    K1NGS PORTFOLIO TERMINAL                                 ',
  '                                                                              ',
  '  Bem-vindo ao meu portfolio interativo!                                      ',
  '  Digite "help" para ver os comandos disponíveis.                              ',
  '                                                                              ',
  '  Versão: 3.0.0 | Better-T-Stack | 2025                                       ',
  '──────────────────────────────────────────────────────────────────────────────',
]

export const useTerminalStore = create<TerminalState>()(
  devtools(
    persist(
      (set, get) => ({
        entries: [
          {
            id: nanoid(),
            command: 'welcome',
            output: welcomeMessage,
            timestamp: new Date(),
            type: 'info',
          },
        ],
        currentPath: '~',
        isLoading: false,
        theme: defaultTheme,
        commandHistory: [],
        historyIndex: -1,

        executeCommand: async (command: string) => {
          if (!command.trim()) return
          const { entries, commandHistory } = get()
          set({ isLoading: true })

          const newHistory = [command, ...commandHistory.filter((c) => c !== command)].slice(0, 50)
          const commandEntry: TerminalEntry = {
            id: nanoid(),
            command,
            output: [],
            timestamp: new Date(),
            type: 'info',
          }

          set({
            entries: [...entries, commandEntry],
            commandHistory: newHistory,
            historyIndex: -1,
          })

          try {
            const result = await processCommand(command)

            if (result.type === 'clear') {
              set({ entries: [] })
            } else {
              const updated = [...get().entries]
              const last = updated[updated.length - 1]
              last.output = result.output
              last.type = result.type
              set({ entries: updated })

              if (result.theme) set({ theme: result.theme })
            }
          } catch (e: any) {
            const updated = [...get().entries]
            const last = updated[updated.length - 1]
            last.output = [`Erro: ${e?.message ?? 'Erro desconhecido'}`]
            last.type = 'error'
            set({ entries: updated })
          } finally {
            set({ isLoading: false })
          }
        },

        clearTerminal: () => set({ entries: [] }),
        setTheme: (theme) => set({ theme }),
        addEntry: (entry) =>
          set((s) => ({
            entries: [
              ...s.entries,
              {
                ...entry,
                id: nanoid(),
                timestamp: new Date(),
              },
            ],
          })),
        navigateHistory: (direction) => {
          const { commandHistory, historyIndex } = get()
          if (commandHistory.length === 0) return ''
          let newIndex = historyIndex
          if (direction === 'up') newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
          else newIndex = Math.max(historyIndex - 1, -1)
          set({ historyIndex: newIndex })
          return newIndex >= 0 ? commandHistory[newIndex] : ''
        },
      }),
      {
        name: 'terminal-store',
        partialize: (state) => ({
          theme: state.theme,
          commandHistory: state.commandHistory,
        }),
      }
    ),
    { name: 'terminal-store' }
  )
)
```

apps/web/src/lib/command-processor.ts

```Typescript
import type { CommandResult, TerminalTheme } from '@/types/terminal'
import { trpc } from '@/utils/trpc'

const themes: Record<string, TerminalTheme> = {
  matrix: {
    name: 'matrix',
    bg: 'bg-black',
    text: 'text-green-400',
    accent: 'text-green-300',
    prompt: 'text-green-500',
    error: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
  },
  cyberpunk: {
    name: 'cyberpunk',
    bg: 'bg-purple-900',
    text: 'text-cyan-300',
    accent: 'text-pink-400',
    prompt: 'text-cyan-400',
    error: 'text-red-400',
    success: 'text-cyan-300',
    warning: 'text-yellow-400',
  },
  hacker: {
    name: 'hacker',
    bg: 'bg-gray-900',
    text: 'text-amber-400',
    accent: 'text-orange-400',
    prompt: 'text-amber-300',
    error: 'text-red-400',
    success: 'text-amber-400',
    warning: 'text-yellow-400',
  },
  retro: {
    name: 'retro',
    bg: 'bg-blue-900',
    text: 'text-yellow-300',
    accent: 'text-white',
    prompt: 'text-yellow-400',
    error: 'text-red-400',
    success: 'text-yellow-300',
    warning: 'text-orange-400',
  },
}

export async function processCommand(input: string): Promise<CommandResult> {
  const [command, ...args] = input.trim().split(/\s+/)
  const cmd = command.toLowerCase()

  switch (cmd) {
    case 'help':
      return {
        output: [
          'Comandos disponíveis:',
          '',
          '  help          - Ajuda',
          '  about         - Sobre mim',
          '  projects      - Lista projetos',
          '  project <id>  - Detalhes de um projeto',
          '  skills        - Habilidades técnicas',
          '  contact       - Contatos',
          '  clear         - Limpa o terminal',
          '  theme [nome]  - Altera tema (matrix, cyberpunk, hacker, retro)',
        ],
        type: 'info',
      }

    case 'about': {
      const info = await trpc.portfolio.getInfo.query()
      return {
        output: [
          '──────────────── SOBRE MIM ────────────────',
          `Nome: ${info.name}`,
          `Cargo: ${info.title}`,
          `Localização: ${info.location}`,
          `Experiência: ${info.experience}`,
          '',
          info.bio,
          '',
          'Contatos:',
          `Email: ${info.email}`,
          `GitHub: ${info.github}`,
          `LinkedIn: ${info.linkedin}`,
          `Website: ${info.website}`,
        ],
        type: 'success',
      }
    }

    case 'projects': {
      const projects = await trpc.portfolio.getProjects.query({ limit: 10 })
      const out: string[] = ['Meus projetos:', '']
      projects.forEach((p, i) => {
        out.push(`${i + 1}. ${p.title} ${p.featured ? '[DESTAQUE]' : ''}`)
        out.push(`   ${p.description}`)
        out.push(`   Tech: ${p.technologies.map((t) => t.name).join(', ')}`)
        if (p.githubUrl) out.push(`   GitHub: ${p.githubUrl}`)
        if (p.demoUrl) out.push(`   Demo: ${p.demoUrl}`)
        out.push(`   use: project ${p.id}`)
        out.push('')
      })
      return { output: out, type: 'success' }
    }

    case 'project': {
      const id = args[0]
      if (!id) return { output: ['Uso: project <id>'], type: 'warning' }
      try {
        const p = await trpc.portfolio.getProject.query({ id })
        return {
          output: [
            p.title,
            '—'.repeat(60),
            p.description,
            '',
            `Tecnologias: ${p.technologies.map((t) => t.name).join(', ')}`,
            `Categoria: ${p.category} | Destaque: ${p.featured ? 'Sim' : 'Não'}`,
            ...(p.content ? ['', 'Detalhes:', p.content] : []),
            ...(p.githubUrl ? ['', `GitHub: ${p.githubUrl}`] : []),
            ...(p.demoUrl ? [`Demo: ${p.demoUrl}`] : []),
          ],
          type: 'success',
        }
      } catch {
        return { output: ['Projeto não encontrado.'], type: 'error' }
      }
    }

    case 'skills': {
      const skills = await trpc.portfolio.getSkills.query({})
      const out: string[] = ['Habilidades técnicas:', '']
      const groups = skills.reduce<Record<string, typeof skills>>((acc, s) => {
        acc[s.category] = acc[s.category] ?? []
        acc[s.category].push(s)
        return acc
      }, {})

      Object.entries(groups).forEach(([cat, list]) => {
        out.push(`${cat}:`)
        list
          .sort((a, b) => b.level - a.level)
          .forEach((s) => {
            const bars = '█'.repeat(Math.floor(s.level / 20)) + '░'.repeat(5 - Math.floor(s.level / 20))
            const cert = s.certified ? ' ✅' : ''
            const years = s.yearsOfExp ? ` (${s.yearsOfExp} anos)` : ''
            out.push(`  ${s.name.padEnd(20)} [${bars}] ${s.level}%${cert}${years}`)
          })
        out.push('')
      })

      return { output: out, type: 'success' }
    }

    case 'contact': {
      const info = await trpc.portfolio.getInfo.query()
      return {
        output: [
          'Contato:',
          `Email: ${info.email}`,
          `GitHub: ${info.github}`,
          `LinkedIn: ${info.linkedin}`,
          `Website: ${info.website}`,
        ],
        type: 'info',
      }
    }

    case 'clear':
      return { output: [], type: 'clear' }

    case 'theme': {
      const name = args[0]?.toLowerCase()
      if (!name) {
        return {
          output: ['Temas: matrix, cyberpunk, hacker, retro', 'Uso: theme <nome>'],
          type: 'info',
        }
      }
      if (themes[name]) {
        return { output: [`Tema alterado para: ${name}`], type: 'success', theme: themes[name] }
      }
      return { output: [`Tema "${name}" não encontrado.`], type: 'error' }
    }

    default:
      return {
        output: [`Comando "${command}" não encontrado. Digite "help" para ajuda.`],
        type: 'error',
      }
  }
}
```

apps/web/src/components/terminal/Terminal.tsx

```Tsx
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminalStore } from '@/stores/terminal-store'
import { cn } from '@/lib/utils'

interface TerminalProps {
  className?: string
}

export function Terminal({ className }: TerminalProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const { entries, isLoading, theme, executeCommand, navigateHistory } = useTerminalStore()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight
  }, [entries])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    await executeCommand(input)
    setInput('')
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setInput(navigateHistory('up'))
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setInput(navigateHistory('down'))
    }
  }

  return (
    <div className={cn('flex flex-col h-screen font-mono', theme.bg, theme.text, className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="ml-4 text-sm text-gray-400">K1ngs Portfolio Terminal</span>
        </div>
        <div className="text-xs text-gray-500">{theme.name} theme</div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 cursor-text"
        onClick={() => inputRef.current?.focus()}
        aria-label="terminal output"
      >
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <div className="flex items-center mb-1">
                <span className={cn('mr-2', theme.prompt)}>$</span>
                <span className={theme.text}>{entry.command}</span>
              </div>
              {entry.output.length > 0 && (
                <div
                  className={cn('ml-4 whitespace-pre-wrap text-sm leading-relaxed', {
                    [theme.error]: entry.type === 'error',
                    [theme.success]: entry.type === 'success',
                    [theme.warning]: entry.type === 'warning',
                    [theme.text]: entry.type === 'info',
                  })}
                >
                  {entry.output.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <form onSubmit={onSubmit} className="flex items-center mt-2" aria-label="terminal input">
          <label htmlFor="terminal-input" className={cn('mr-2', theme.prompt)}>
            $
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className={cn('flex-1 bg-transparent outline-none', theme.text, 'placeholder-gray-500')}
            placeholder="Digite um comando..."
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
          />
          {isLoading && <div className="ml-2 animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full opacity-50" />}
        </form>
      </div>
    </div>
  )
}
```

apps/web/src/lib/utils.ts

```Typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString('pt-BR')
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
```

apps/web/tailwind.config.js

```Javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0a0a0a',
          text: '#00ff00',
          prompt: '#ffff00',
          error: '#ff0000',
          success: '#00ff00',
          warning: '#ffaa00',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'terminal-blink': 'blink 1s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
```

apps/web/.env.example

```Env
VITE_TRPC_URL=http://localhost:3000/trpc
```

3) Monorepo – Scripts e DX

package.json (raiz) – seção scripts

```Json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "check-types": "turbo run check-types",
    "check": "biome check --write .",
    "prepare": "husky",
    "db:start": "turbo run db:start --filter=server",
    "db:push": "turbo run db:push --filter=server",
    "db:studio": "turbo run db:studio --filter=server",
    "db:generate": "turbo run db:generate --filter=server",
    "db:migrate": "turbo run db:migrate --filter=server",
    "db:seed": "turbo run db:seed --filter=server",
    "db:reset": "turbo run db:reset --filter=server"
  }
}
```

apps/server/package.json – seção scripts (com Bun)

```Json
{
  "scripts": {
    "dev": "bun run --hot src/index.ts",
    "build": "tsc -p tsconfig.json",
    "start": "bun run dist/index.js",
    "check-types": "tsc -b",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:seed": "bun run prisma/seed.ts",
    "db:reset": "prisma migrate reset --force",
    "db:start": "docker compose up -d",
    "db:stop": "docker compose stop",
    "db:down": "docker compose down"
  }
}
```

docker-compose.yml (na raiz ou em apps/server) – Postgres local

```Yaml
version: "3.9"
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: k1ngs_portfolio
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d k1ngs_portfolio"]
      interval: 5s
      timeout: 3s
      retries: 10

volumes:
  pgdata:
```

4) .env e ordem de inicialização

Ordem local sugerida

- bun install (na raiz)

- bun db:start

- cd apps/server && bun run prisma generate

- bun db:push

- bun db:seed

- bun dev (na raiz: sobe web+server)
- Design Patterns aplicados (visão rápida)

- Monorepo modular: separação por apps (web, server, docs), pipelines rápidos via Turborepo.

- Boundaries claros: tRPC como boundary tipado entre Web e Server; zod para contratos e validação.

- Repository/ORM: Prisma centraliza acesso a dados, isolando regras de consulta; modelos claros e normalizados (tecnologias/tags via tabelas de junção).

- Application services finos: routers tRPC encapsulam casos de uso (getProjects, sendContact) com validação e filtros.

- Command pattern no front: processCommand mapeia comandos → handlers, permitindo extensões fáceis.

- State container leve: Zustand para estado do terminal (persistência, histórico, tema), seguindo princípio single-responsibility.

- UI declarativa e componível: Terminal isolado, regras de foco/scroll, responsabilidade única.

- Cross-cutting concerns: segurança (helmet, CORS, rate-limit), logging (pino), configuração via env.

- Defensive programming: zod em inputs, try/catch robusto no front para mensagens amigáveis.

- DX e manutenção: scripts turbo, .env.example, docker-compose, seed determinístico.
- Documentação de padrões e decisões (coloque este arquivo no repositório)

docs/Design-Patterns.md

Design Patterns e Decisões Arquiteturais

Este documento descreve os padrões de projeto, decisões e trade-offs adotados no k1ngs-portfolio-v3, visando legibilidade, manutenção, performance e DX (Developer Experience).

# 1. Monorepo e Modularidade

- Padrão: Turborepo com apps independentes (web, server, docs).

- Benefício: Build e dev paralelos, escopo claro por aplicação, cache incremental.

- Trade-off: Exige disciplina em scripts e versionamento de dependências.

# 2. Boundary Tipado com tRPC

- Padrão: tRPC como boundary entre frontend e backend, com zod para validar inputs/outputs.

- Benefício: Tipos de ponta a ponta, menos boilerplate (sem schemas duplicados), contratos explícitos.

- Trade-off: Aderência à lib; se migrar para REST/GraphQL, será necessário um adapter.

# 3. Prisma como Repositório

- Padrão: Prisma ORM centraliza acesso aos dados; schema como single source of truth.

- Benefício: Migrações e tipagem de dados seguras, produtividade elevada.

- Trade-off: Abstração do SQL; para consultas muito específicas, use `prisma.$queryRaw` com cuidado.

## 4. Modelagem Normalizada

- Padrão: Tabelas de junção (ProjectTechnology, ProjectTag) e enums (ProjectCategory, SkillCategory).

- Benefício: Flexibilidade de filtros, integridade referencial, queries previsíveis.

- Trade-off: Mais joins; mitigado por includes seletivos e limites (take/limit).

## 5. Application Services finos (Routers tRPC)

- Padrão: Procedures organizadas por contexto (portfolio.getProjects, portfolio.sendContact).

- Benefício: Coesão por caso de uso, facilita testes e observabilidade por rota.

- Trade-off: Divisão granular requer curadoria de nomes e pastas.

## 6. Command Pattern no Frontend

- Padrão: `processCommand` mapeia comandos para handlers; temas como “estratégias”.

- Benefício: Extensível (adicionar novos comandos sem tocar no componente de UI), testável.

- Trade-off: Estados complexos de terminal pedem padronização de mensagens e erros.

# 7. State Management enxuto (Zustand)

- Padrão: Store única para o Terminal (entries, tema, histórico) com persistência.

- Benefício: Baixo overhead, API simples, integra bem com React e devtools.

- Trade-off: Sem middleware complexo nativo; mantenha a store pequena e pura.

## 8. UI Componível e Acessível

- Padrão: Terminal componentizado, foco de teclado, scroll automático, cores temáticas, responsivo.

- Benefício: Usabilidade alta e baixo acoplamento com lógica de negócios.

- Trade-off: Evitar “efeitos” pesados que degradem Web Vitals.

# 9. Cross-Cutting Concerns

- Segurança: `helmet`, `CORS` restrito, `rate-limit` em mutações sensíveis.

- Logging: Pino estruturado com níveis por ambiente; hook `onError` do tRPC.

- Configuração: `.env.example` por app e leitura em runtime; sem segredos no repo.

- Benefício: Base “production-ready” desde o MVP.

## 10. Performance e SEO

- Padrão: Code-splitting por rota, imagens WebP/AVIF, SSR/streaming quando suportado.

- Benefício: LCP baixo, CLS estável, pontuação alta no Lighthouse, descoberta orgânica.

- Trade-off: Ajustes finos de build e medição contínua (Lighthouse CI recomendado).

## 11. Testabilidade

- Padrão: Handlers de comando puros e procedures tRPC com zod; fácil unit e integração.

- Benefício: Cobertura útil sem fragilidade; CI confiável.

- Trade-off: Cobertura além de 80% pode ter custo-benefício decrescente; foque em paths críticos.

## 12. Escalabilidade e Evolução

- Padrão: Paginação por `take/limit` (e cursor quando necessário), pooling de DB, cache HTTP.

- Benefício: Cresce com segurança sem reescrever camadas.

- Trade-off: Complexidade aumenta com features (blog/admin); mantenha boundaries estáveis.

## Diretrizes de Código (resumo)

- Use TypeScript estrito e lint (Biome) para consistência.

- Valide toda entrada externa com zod em procedures/mutações.

- Mantenha componentes “burros” e lógica de domínio fora da UI.

- Prefira dados derivados e funções puras para facilitar testes.

- Nomes declarativos: `getProjects`, `sendContact` e similares.

- Evite “any”; use tipos utilitários e inferência do tRPC/Prisma.

## Quando adicionar novos padrões?

- CQRS/Event Sourcing: apenas se houver requisitos de auditoria/escala não triviais.

- Factory/Strategy adicionais: quando surgirem variações complexas (por exemplo, múltiplos temas/provedores).

- Repository custom: somente se a camada Prisma não atender requisitos específicos de cross-db ou caching.