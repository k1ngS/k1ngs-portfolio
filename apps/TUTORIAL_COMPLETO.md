# 🎓 Tutorial Completo: Customizando seu Portfólio Terminal Roguelike com Better-T-Stack (2025)

**Objetivo:** Aprender a customizar e expandir um portfólio interativo moderno com estilo terminal roguelike usando o starter Better-T-Stack

> **🚀 Atualizado para 2025**: Este tutorial utiliza as versões mais recentes das tecnologias e incorpora as melhores práticas de desenvolvimento moderno, incluindo ES2024+, TypeScript 5.x, React 18.x com Server Components, e arquitetura cloud-native.

## 📚 Índice

### 🏗️ Fundação do Projeto
- [Conceitos e Arquitetura](#conceitos-e-arquitetura)
- [Preparação do Ambiente](#preparação-do-ambiente)
- [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
- [Clean Architecture e Estrutura](#clean-architecture-e-estrutura)

### 🔧 Desenvolvimento Core
- [Criando o Backend (API)](#criando-o-backend-api)
- [Criando o Frontend (React)](#criando-o-frontend-react)
- [Sistema de Responsividade](#sistema-de-responsividade)
- [Integração Frontend + Backend](#integração-frontend--backend)
- [Testes Básicos](#testes-básicos)

### 🐳 Containerização e Deploy
- [Configuração Docker](#configuração-docker)
- [Deploy e Produção](#deploy-e-produção)

### 🚀 Melhorias Avançadas
- [Sistema de Autenticação](#sistema-de-autenticação)
- [Painel Administrativo](#painel-administrativo)
- [Performance e Cache](#performance-e-cache)
- [Analytics e Monitoramento](#analytics-e-monitoramento)
- [SEO e Acessibilidade](#seo-e-acessibilidade)
- [Testes Avançados](#testes-avançados)
- [CI/CD e Automação](#cicd-e-automação)

### 📋 Roadmap e Próximos Passos
- [Roadmap de Implementação](#roadmap-de-implementação)
- [Funcionalidades Futuras](#funcionalidades-futuras)
- [Conclusão](#conclusão)

## 🎯 Conceitos e Arquitetura

### O que vamos construir?

Um portfólio interativo que simula um terminal de computador com:

- **Interface Terminal:** Visual autêntico de terminal com boot sequence
- **Navegação por Seções:** About, Skills, Projects, Contact
- **API REST:** Backend para gerenciar dados
- **Temas Personalizáveis:** Diferentes esquemas de cores
- **Animações:** Transições suaves e efeitos de digitação
- **Docker:** Containerização para desenvolvimento e produção

### Arquitetura do Sistema (Better-T-Stack)

```
┌─────────────────┐    tRPC/HTTP   ┌─────────────────┐
│                 │ ◄─────────────► │                 │
│   FRONTEND      │                 │    BACKEND      │
│ (TanStack Start)│                 │   (Fastify)     │
│   Port: 3001    │                 │   Port: 3000    │
│                 │                 │                 │
└─────────────────┘                 └─────────────────┘
         │                                   │
         │                                   │
         ▼                                   ▼
┌─────────────────┐                 ┌─────────────────┐
│   Starlight     │                 │  PostgreSQL     │
│   (Docs)        │                 │   (Docker)      │
│   Port: 4321    │                 │   Port: 5432    │
└─────────────────┘                 └─────────────────┘
```

### Fluxo de Dados Moderno

```
┌─────────────────────────────────────────────────────────┐
│                    Better-T-Stack                       │
├─────────────────────────────────────────────────────────┤
│  TanStack Start  │    tRPC     │   Fastify   │ Prisma   │
│  (Frontend SSR)  │ (Type-Safe) │  (Backend)  │  (ORM)   │
│                  │     API     │             │          │
├─────────────────────────────────────────────────────────┤
│           Better-Auth (Authentication)                   │
├─────────────────────────────────────────────────────────┤
│  PostgreSQL (Docker) │ Starlight (Docs) │ Turborepo    │
└─────────────────────────────────────────────────────────┘
```
### Stack Tecnológico 2025 (Better-T-Stack)

#### **Runtime & Package Manager:**
- **Bun** - Runtime JavaScript ultra-rápido e package manager all-in-one
- **TypeScript 5.x** - Tipagem estática com strict mode

#### **Frontend (TanStack Start):**
- **TanStack Start** - Framework full-stack com SSR/SSG
- **TanStack Router** - Roteamento type-safe e performático
- **TanStack Query v5** - Gerenciamento de estado servidor
- **Vite 5.x** - Build tool com Hot Module Replacement
- **TailwindCSS 4.x** - Framework CSS utilitário moderno
- **React 18.x** - Biblioteca UI com Server Components

#### **Backend (Fastify):**
- **Fastify 4.x** - Framework web de alta performance
- **tRPC** - APIs end-to-end type-safe
- **Prisma ORM** - ORM moderno com TypeScript-first
- **PostgreSQL 16** - Banco de dados relacional com JSONB
- **Better-Auth** - Sistema de autenticação moderno
- **Zod** - Validação de schemas TypeScript

#### **Documentação:**
- **Starlight (Astro)** - Framework de documentação moderno
- **MDX** - Markdown com componentes React/Vue

#### **DevOps e Ferramentas:**
- **Docker** - Containerização para PostgreSQL
- **Turborepo** - Monorepo de alta performance
- **Biome** - Linter e formatter ultra-rápido (substitui ESLint + Prettier)
- **GitHub Actions** - CI/CD integrado
- **Vitest** - Framework de testes rápido

## 🛠️ Preparação do Ambiente

### Pré-requisitos 2025 (Better-T-Stack)
```bash
# Verificar versões necessárias para Better-T-Stack
bun --version     # >= 1.0.0 (runtime e package manager)
docker --version  # >= 24.0.0 (para PostgreSQL)
git --version     # >= 2.40.0

# Ferramentas opcionais mas recomendadas
gh --version      # GitHub CLI para automação
```

**Por que essas tecnologias?**
- **Bun**: Runtime JavaScript ultra-rápido (3x mais rápido que Node.js) com package manager integrado
- **Docker**: Necessário apenas para PostgreSQL, simplificando a infraestrutura
- **Git 2.40+**: Suporte a partial clone e melhores algoritmos de merge

### Instalação do Bun

```bash
# Instalar Bun (Linux/macOS)
curl -fsSL https://bun.sh/install | bash

# Ou via npm (se já tiver Node.js)
npm install -g bun

# Verificar instalação
bun --version
```

### Usando o Starter Better-T-Stack Portfolio

Este tutorial utiliza o starter **k1ngs-portfolio** que já está configurado com Better-T-Stack e todas as dependências necessárias:

```bash
# 1. Clonar o starter do portfólio
git clone https://github.com/k1ngS/k1ngs-portfolio.git meu-portfolio

# 2. Navegar para o diretório do projeto
cd meu-portfolio

# 3. Instalar dependências
bun install

# 4. Verificar a estrutura já configurada
ls -la
```

### Stack Escolhida Automaticamente

O comando acima configura automaticamente:

- **Frontend**: TanStack Start (React com file-based routing)
- **Backend**: Fastify (servidor web de alta performance)
- **Runtime**: Bun (JavaScript runtime moderno)
- **API**: tRPC (APIs type-safe)
- **Database**: PostgreSQL (banco relacional robusto)
- **ORM**: Prisma (ORM TypeScript-first)
- **Authentication**: Better-Auth (sistema de auth moderno)
- **Addons**: Biome (linting), Husky (git hooks), Starlight (docs), Turborepo (monorepo)
- **Database Setup**: Docker (containerização)
- **Package Manager**: Bun (gerenciador rápido)

### Configuração Já Incluída no Starter

O starter **k1ngs-portfolio** já inclui todas as configurações necessárias:

```bash
# O starter já vem configurado com:
# ✅ Frontend: TanStack Start
# ✅ Backend: Fastify
# ✅ Runtime: Bun
# ✅ Database: PostgreSQL
# ✅ ORM: Prisma
# ✅ API: tRPC
# ✅ Auth: Better-Auth
# ✅ Addons: Biome, Husky, Starlight, Turborepo
# ✅ Database Setup: Docker
# ✅ Package Manager: Bun
```

### Estrutura do Starter k1ngs-portfolio (2025)

O starter já possui uma estrutura moderna de monorepo configurada:

```
meu-portfolio/
├── apps/                    # Aplicações principais
│   ├── web/                # Frontend TanStack Start
│   │   ├── app/            # App Router com file-based routing
│   │   │   ├── routes/     # Rotas da aplicação
│   │   │   ├── __root.tsx  # Layout raiz
│   │   │   └── index.tsx   # Página inicial
│   │   ├── src/
│   │   │   ├── components/ # Componentes React
│   │   │   ├── lib/        # Utilitários e configurações
│   │   │   └── styles/     # Estilos globais
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── server/             # Backend Fastify + tRPC
│   │   ├── src/
│   │   │   ├── routes/     # Rotas tRPC
│   │   │   ├── lib/        # Configurações (DB, Auth)
│   │   │   ├── types/      # Tipos TypeScript
│   │   │   └── index.ts    # Entry point
│   │   ├── prisma/         # Schema Prisma
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── docs/               # Starlight (documentação)
│       ├── src/
│       │   ├── content/    # Conteúdo MDX
│       │   └── pages/      # Páginas da documentação
│       ├── astro.config.mjs
│       └── package.json
├── packages/               # Pacotes compartilhados
│   ├── ui/                # Componentes UI (shadcn/ui)
│   ├── auth/              # Better-Auth configuração
│   ├── db/                # Prisma client e schemas
│   └── typescript-config/ # Configurações TypeScript
├── tooling/               # Ferramentas de desenvolvimento
│   ├── biome/            # Configuração Biome (linting)
│   └── tailwind/         # Configuração Tailwind
├── .github/              # GitHub Actions (Husky)
├── docker-compose.yml    # PostgreSQL container
├── turbo.json           # Configuração Turborepo
├── bun.lockb            # Lockfile do Bun
├── package.json         # Workspace principal
├── biome.json           # Configuração Biome
└── README.md
```

### Inicialização do Projeto

```bash
# 1. Iniciar o banco de dados PostgreSQL via Docker
bun db:start

# 2. Aplicar o schema do banco de dados
bun db:push

# 3. Iniciar todos os serviços em desenvolvimento
bun dev

# Serviços disponíveis:
# • Frontend (TanStack Start): http://localhost:3001
# • Backend API (Fastify + tRPC): http://localhost:3000
# • Documentação (Starlight): http://localhost:4321
# • Database Studio (Prisma): bun db:studio
```

### Comandos Úteis do Better-T-Stack

```bash
# Formatação e linting automático
bun check

# Atualizar todas as dependências
bunx taze -r

# Comandos de banco de dados
bun db:start    # Iniciar PostgreSQL container
bun db:push     # Aplicar schema sem migrations
bun db:studio   # Interface visual do banco
bun db:migrate  # Criar e aplicar migrations

# Comandos de desenvolvimento
bun dev         # Iniciar todos os serviços
bun build       # Build de produção
bun test        # Executar testes

# Documentação Starlight
cd apps/docs && bun dev    # Iniciar docs localmente
cd apps/docs && bun build  # Build da documentação
```

## 🔧 Configuração de Variáveis de Ambiente

### Por que configurar agora?
Antes de começar o desenvolvimento, é fundamental configurar as variáveis de ambiente para evitar problemas de configuração mais tarde. Isso garante que tanto o backend quanto o frontend tenham as configurações necessárias desde o início.

### Backend - Variáveis de Ambiente (Better-T-Stack)

**apps/server/.env:**

```bash
# Database (PostgreSQL via Docker - configurado automaticamente)
DATABASE_URL="postgresql://postgres:password@localhost:5432/k1ngs_portfolio"
DIRECT_URL="postgresql://postgres:password@localhost:5432/k1ngs_portfolio"

# Better-Auth Configuration (substituindo JWT tradicional)
BETTER_AUTH_SECRET="your-super-secret-auth-key-2025-minimum-32-chars"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_TRUSTED_ORIGINS="http://localhost:3001"

# Server Configuration (Fastify)
PORT=3000
HOST="0.0.0.0"
NODE_ENV=development
FASTIFY_LOG_LEVEL="info"

# tRPC Configuration
TRPC_ENDPOINT="/trpc"
TRPC_BATCH_ENABLED=true

# OAuth Providers (Better-Auth)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
DISCORD_CLIENT_ID="your_discord_client_id"
DISCORD_CLIENT_SECRET="your_discord_client_secret"

# Email (Resend.com - padrão Better-T-Stack)
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@k1ngs-portfolio.com"
EMAIL_FROM_NAME="K1ngs Portfolio"

# CORS Configuration
CORS_ORIGIN="http://localhost:3001"
CORS_CREDENTIALS=true

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false

# File Upload (Cloudinary recomendado)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
MAX_FILE_SIZE=5242880  # 5MB

# Monitoring & Analytics
SENTRY_DSN="your_sentry_dsn"
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Redis (opcional - para cache avançado)
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD=""
REDIS_DB=0

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_RATE_LIMITING=true
ENABLE_FILE_UPLOAD=true
ENABLE_EMAIL_NOTIFICATIONS=true
```

**backend/.env.example:**

```bash
# Server Configuration
PORT=3002
NODE_ENV=development

# Database
DATABASE_URL=sqlite:./portfolio.db

# Security (ALTERE ESTES VALORES!)
JWT_SECRET=your_super_secure_jwt_secret_here
GITHUB_ADMIN_USERNAME=your_username

# Email Configuration (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# CORS Origins
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend - Variáveis de Ambiente (TanStack Start)

**apps/web/.env:**

```bash
# tRPC API Configuration
VITE_API_URL="http://localhost:3000/trpc"
VITE_API_TIMEOUT=10000
VITE_WS_URL="ws://localhost:3000/ws"

# Better-Auth Frontend Configuration
VITE_BETTER_AUTH_URL="http://localhost:3000"
VITE_BETTER_AUTH_BASE_PATH="/api/auth"

# App Configuration
VITE_APP_NAME="K1ngs Portfolio"
VITE_APP_VERSION="1.0.0"
VITE_APP_DESCRIPTION="Portfolio Terminal Interativo com TanStack Start"
VITE_APP_KEYWORDS="portfolio,terminal,tanstack,react,typescript,trpc"

# Contact Information
VITE_CONTACT_EMAIL="contact@k1ngs-portfolio.com"
VITE_GITHUB_URL="https://github.com/k1ngs"
VITE_LINKEDIN_URL="https://linkedin.com/in/k1ngs"
VITE_TWITTER_URL="https://twitter.com/k1ngs"
VITE_PORTFOLIO_URL="https://k1ngs-portfolio.com"

# Analytics & Monitoring
VITE_GA_TRACKING_ID="G-XXXXXXXXXX"
VITE_HOTJAR_ID="your_hotjar_id"
VITE_SENTRY_DSN="your_frontend_sentry_dsn"
VITE_POSTHOG_KEY="your_posthog_key"

# Feature Flags
VITE_ENABLE_PWA=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_SOUND_EFFECTS=true
VITE_ENABLE_TERMINAL_HISTORY=true
VITE_ENABLE_AUTH=true

# TanStack Start Configuration
VITE_START_SSR=true
VITE_START_PRERENDER=false
VITE_START_HYDRATION=true

# Performance
VITE_ENABLE_SERVICE_WORKER=true
VITE_CACHE_STRATEGY="stale-while-revalidate"
VITE_IMAGE_OPTIMIZATION=true
VITE_BUNDLE_ANALYZER=false

# Development
VITE_SHOW_DEV_TOOLS=true
VITE_ENABLE_REACT_DEVTOOLS=true
VITE_LOG_LEVEL="info"
VITE_MOCK_API=false
```

### Documentação - Variáveis de Ambiente (Starlight)

**apps/docs/.env:**

```bash
# Starlight Configuration (Astro)
SITE_URL="http://localhost:4321"
BASE_URL="/"

# GitHub Integration (para edit links)
GITHUB_REPO="k1ngs/k1ngs-portfolio"
GITHUB_BRANCH="main"
GITHUB_EDIT_URL="https://github.com/k1ngs/k1ngs-portfolio/edit/main/apps/docs/src/content/docs"

# Analytics (opcional)
GA_TRACKING_ID="G-XXXXXXXXXX"

# Search (Pagefind - built-in do Starlight)
ENABLE_SEARCH=true
SEARCH_PROVIDER="pagefind"

# Social Links
SOCIAL_GITHUB="https://github.com/k1ngs"
SOCIAL_TWITTER="https://twitter.com/k1ngs"
SOCIAL_LINKEDIN="https://linkedin.com/in/k1ngs"
```

### Arquivos .env.example

**apps/server/.env.example:**

```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/k1ngs_portfolio"
DIRECT_URL="postgresql://postgres:password@localhost:5432/k1ngs_portfolio"

# Better-Auth (ALTERE ESTES VALORES!)
BETTER_AUTH_SECRET="your-super-secret-auth-key-2025-minimum-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# Server
PORT=3000
NODE_ENV=development

# OAuth (CONFIGURE SEUS APPS!)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@k1ngs-portfolio.com"
```

**apps/web/.env.example:**

```bash
# API Configuration
VITE_API_URL="http://localhost:3000/trpc"
VITE_BETTER_AUTH_URL="http://localhost:3000"

# App Configuration (PERSONALIZE!)
VITE_APP_NAME="K1ngs Portfolio"
VITE_CONTACT_EMAIL="contact@k1ngs-portfolio.com"
VITE_GITHUB_URL="https://github.com/k1ngs"
VITE_LINKEDIN_URL="https://linkedin.com/in/k1ngs"

# Analytics (CONFIGURE SEUS SERVIÇOS!)
VITE_GA_TRACKING_ID="G-XXXXXXXXXX"
VITE_SENTRY_DSN="your_frontend_sentry_dsn"

# Feature Flags
VITE_ENABLE_PWA=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANIMATIONS=true
```

**apps/docs/.env.example:**

```bash
# Starlight (Astro)
SITE_URL="http://localhost:4321"
BASE_URL="/"

# GitHub (para edit links)
GITHUB_REPO="k1ngs/k1ngs-portfolio"
GITHUB_BRANCH="main"

# Analytics (opcional)
GA_TRACKING_ID="G-XXXXXXXXXX"

# Social Links
SOCIAL_GITHUB="https://github.com/k1ngs"
SOCIAL_LINKEDIN="https://linkedin.com/in/k1ngs"
```

### Configuração do .gitignore (2025)
Para um projeto moderno com monorepo, configure o .gitignore na raiz:

**.gitignore (raiz do projeto):**

```gitignore
# Environment variables (todos os apps)
.env
.env.local
.env.production
.env.development
.env.test
**/.env
**/.env.local
**/.env.production

# Dependencies
node_modules/
**/node_modules/
.pnpm-store/
.pnpm-debug.log*

# Build outputs
dist/
build/
out/
**/dist/
**/build/
**/out/

# Cache directories
.turbo/
.next/
.vite/
.cache/
**/.turbo/
**/.next/
**/.vite/

# Database files
*.db
*.sqlite
*.sqlite3
postgres-data/

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# ESLint cache
.eslintcache

# Prettier cache
.prettiercache

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.parcel-cache

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Docker
.dockerignore
Dockerfile.dev

# Kubernetes
*.kubeconfig

# Terraform
*.tfstate
*.tfstate.*
.terraform/
.terraform.lock.hcl

# Sentry
.sentryclirc

# Local development
.local
.vercel
```
## 🚀 Configuração do Projeto com Better-T-Stack Starter (2025)

### Passo 1: Clonar e Configurar o Starter

```bash
# Clonar o starter k1ngs-portfolio
git clone https://github.com/k1ngS/k1ngs-portfolio.git meu-portfolio
cd meu-portfolio

# Instalar dependências com Bun (já configurado)
bun install

# Verificar se tudo está funcionando
bun dev
```

### Passo 2: Entender a Configuração Existente

O starter já possui **turbo.json** configurado com:

```json
// turbo.json (já configurado no starter)
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": { "dependsOn": ["^build"] },
    "dev": { "cache": false, "persistent": true },
    "lint": { "dependsOn": ["^lint"] },
    "type-check": { "dependsOn": ["^type-check"] },
    "test": { "dependsOn": ["^test"] }
  }
}
```

### Passo 3: Scripts Disponíveis no Starter

O **package.json** do starter já inclui todos os scripts necessários:

```json
// package.json (já configurado no starter)
{
  "name": "k1ngs-portfolio",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "test": "turbo run test",
    "db:start": "docker-compose up -d",
    "db:push": "turbo run db:push",
    "db:studio": "turbo run db:studio"
  },
  "packageManager": "bun@1.0.0"
}
```

💾 **Personalizando o Starter:**

```bash
# Após clonar, você pode personalizar:
git remote set-url origin https://github.com/seu-usuario/seu-portfolio.git
git add .
git commit -m "feat: customize portfolio with my information"
```

## 🏗️ Clean Architecture e Estrutura Moderna (2025)

### Princípios da Arquitetura Hexagonal + DDD

Em 2025, evoluímos para uma arquitetura mais robusta que combina Clean Architecture, Domain-Driven Design (DDD) e Arquitetura Hexagonal:

**apps/api/src/ (Backend TypeScript):**

```
apps/api/src/
├── modules/                    # Módulos por domínio (DDD)
│   ├── portfolio/             # Domínio Portfolio
│   │   ├── domain/           # Camada de domínio
│   │   │   ├── entities/     # Entidades com regras de negócio
│   │   │   ├── value-objects/ # Value Objects
│   │   │   ├── repositories/ # Interfaces dos repositórios
│   │   │   ├── services/     # Serviços de domínio
│   │   │   └── events/       # Eventos de domínio
│   │   ├── application/      # Casos de uso
│   │   │   ├── commands/     # Command handlers (CQRS)
│   │   │   ├── queries/      # Query handlers (CQRS)
│   │   │   ├── handlers/     # Event handlers
│   │   │   └── dto/          # Data Transfer Objects
│   │   └── infrastructure/   # Implementações
│   │       ├── repositories/ # Implementações dos repositórios
│   │       ├── controllers/  # Controllers HTTP/GraphQL
│   │       ├── persistence/  # Modelos Prisma
│   │       └── external/     # Integrações externas
│   ├── projects/             # Domínio Projects
│   ├── skills/               # Domínio Skills
│   └── contact/              # Domínio Contact
├── shared/                    # Código compartilhado
│   ├── domain/               # Base classes e interfaces
│   ├── infrastructure/       # Implementações compartilhadas
│   │   ├── database/         # Configuração Prisma
│   │   ├── cache/            # Redis
│   │   ├── events/           # Event Bus
│   │   ├── monitoring/       # OpenTelemetry
│   │   └── validation/       # Zod schemas
│   └── types/                # Tipos TypeScript globais
└── main.ts                   # Entry point da aplicação
```

**apps/web/src/ (Frontend TypeScript):**

```
apps/web/src/
├── app/                      # App Router (inspirado no Next.js)
│   ├── (routes)/            # Rotas da aplicação
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/              # Componentes React
│   ├── ui/                  # Componentes base (shadcn/ui style)
│   ├── features/            # Componentes por feature
│   │   ├── terminal/        # Terminal components
│   │   ├── portfolio/       # Portfolio components
│   │   └── admin/           # Admin components
│   └── layout/              # Componentes de layout
├── hooks/                   # Custom hooks
│   ├── use-terminal.ts      # Terminal logic
│   ├── use-portfolio.ts     # Portfolio data
│   └── use-theme.ts         # Theme management
├── lib/                     # Utilitários e configurações
│   ├── api.ts               # Cliente API
│   ├── utils.ts             # Funções utilitárias
│   ├── constants.ts         # Constantes
│   └── validations.ts       # Schemas Zod
├── stores/                  # Estado global (Zustand)
│   ├── terminal-store.ts    # Estado do terminal
│   ├── portfolio-store.ts   # Estado do portfolio
│   └── theme-store.ts       # Estado do tema
├── styles/                  # Estilos
│   ├── globals.css          # Estilos globais
│   └── components.css       # Estilos de componentes
└── types/                   # Tipos TypeScript
    ├── api.ts               # Tipos da API
    ├── terminal.ts          # Tipos do terminal
    └── portfolio.ts         # Tipos do portfolio
```
### Benefícios da Arquitetura Moderna (2025)

#### 🎯 **Separação de Responsabilidades Avançada**
- **Domínio**: Regras de negócio puras, sem dependências externas
- **Aplicação**: Orquestração de casos de uso e coordenação
- **Infraestrutura**: Implementações técnicas e integrações
- **Apresentação**: UI/UX e interação com usuário

#### 🧪 **Testabilidade Máxima**
- **Testes Unitários**: Domínio e aplicação isolados
- **Testes de Integração**: Infraestrutura com containers
- **Testes E2E**: Fluxos completos com Playwright
- **Testes de Contrato**: APIs com Pact.js

#### 🔧 **Manutenibilidade Aprimorada**
- **TypeScript**: Tipagem estática em todo o código
- **Domain-Driven Design**: Linguagem ubíqua e bounded contexts
- **CQRS**: Separação de comandos e consultas
- **Event Sourcing**: Histórico completo de mudanças

#### 📈 **Escalabilidade Cloud-Native**
- **Microserviços**: Módulos podem virar serviços independentes
- **Event-Driven**: Comunicação assíncrona entre módulos
- **Horizontal Scaling**: Kubernetes e load balancing
- **Observabilidade**: Métricas, logs e traces distribuídos

#### 🚀 **Performance Otimizada**
- **Lazy Loading**: Carregamento sob demanda
- **Code Splitting**: Bundles otimizados
- **Caching**: Redis para dados frequentes
- **CDN**: Assets estáticos distribuídos

### Padrões de Código Modernos (2025)

#### 🎨 **Design Patterns Implementados**

**1. Repository Pattern (Backend)**
```typescript
// Domain interface
export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  findAll(filters: ProjectFilters): Promise<Project[]>;
  save(project: Project): Promise<void>;
  delete(id: string): Promise<void>;
}

// Infrastructure implementation
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaClient) {}
  
  async findById(id: string): Promise<Project | null> {
    const data = await this.prisma.project.findUnique({ where: { id } });
    return data ? ProjectMapper.toDomain(data) : null;
  }
}
```

**2. Command Query Responsibility Segregation (CQRS)**
```typescript
// Command (Write)
export class CreateProjectCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly technologies: string[]
  ) {}
}

// Query (Read)
export class GetProjectsQuery {
  constructor(
    public readonly filters: ProjectFilters,
    public readonly pagination: Pagination
  ) {}
}
```

**3. Factory Pattern (Frontend)**
```typescript
// Terminal command factory
export class TerminalCommandFactory {
  static create(input: string): TerminalCommand {
    const [command, ...args] = input.split(' ');
    
    switch (command) {
      case 'help': return new HelpCommand();
      case 'about': return new AboutCommand();
      case 'projects': return new ProjectsCommand(args);
      default: return new UnknownCommand(command);
    }
  }
}
```

**4. Observer Pattern (Event System)**
```typescript
// Event-driven architecture
export class DomainEventDispatcher {
  private handlers = new Map<string, EventHandler[]>();
  
  subscribe<T extends DomainEvent>(eventType: string, handler: EventHandler<T>) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }
  
  async dispatch<T extends DomainEvent>(event: T): Promise<void> {
    const handlers = this.handlers.get(event.constructor.name) || [];
    await Promise.all(handlers.map(handler => handler.handle(event)));
  }
}
```
#### 🏗️ **Configuração de Ferramentas de Desenvolvimento**

**ESLint Config (Flat Config - 2025)**
```typescript
// eslint.config.js
import { defineConfig } from 'eslint-define-config';
import typescript from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
```

**Prettier Config**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Husky + Lint-staged**
```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

💾 **Commit da Arquitetura:**

```bash
git add .
git commit -m "feat: implement modern clean architecture with DDD, CQRS and TypeScript"
```

## 🔧 Desenvolvendo o Backend (Fastify + tRPC + Prisma)

### Estrutura Já Configurada pelo Better-T-Stack

O Better-T-Stack já configurou automaticamente toda a estrutura do backend:

```bash
# Navegar para o diretório do servidor
cd apps/server

# Verificar a estrutura criada
ls -la
```

**Estrutura gerada automaticamente:**

```
apps/server/
├── src/
│   ├── lib/           # Configurações (DB, Auth, tRPC)
│   ├── routes/        # Rotas tRPC organizadas por domínio
│   ├── types/         # Tipos TypeScript compartilhados
│   └── index.ts       # Entry point do servidor
├── prisma/
│   ├── schema.prisma  # Schema do banco de dados
│   └── migrations/    # Migrações do banco
├── package.json       # Dependências já configuradas
├── tsconfig.json      # Configuração TypeScript
└── .env              # Variáveis de ambiente
```

### Dependências Já Instaladas

O Better-T-Stack já instalou e configurou:

- **Fastify**: Servidor web de alta performance
- **tRPC**: Type-safe APIs com TypeScript
- **Prisma**: ORM moderno para PostgreSQL
- **Better-Auth**: Sistema de autenticação completo
- **Zod**: Validação de schemas TypeScript-first
- **Biome**: Linting e formatação

### Inicialização do Banco de Dados

```bash
# 1. Iniciar PostgreSQL via Docker
bun db:start

# 2. Aplicar o schema inicial
bun db:push

# 3. (Opcional) Visualizar o banco
bun db:studio

# 4. (Produção) Criar e aplicar migrations
bun db:migrate
```
## Passo 2: Configuração TypeScript Moderna (tsconfig.json):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/modules/*": ["src/modules/*"],
      "@/shared/*": ["src/shared/*"]
    }
  },
  "include": [
    "src/**/*",
    "prisma/seed.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```
### Passo 3: Configuração do Prisma (schema.prisma):

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  projects Project[]
  skills   Skill[]

  @@map("users")
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  content     String?
  imageUrl    String?
  demoUrl     String?
  githubUrl   String?
  featured    Boolean  @default(false)
  published   Boolean  @default(false)
  category    Category
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  technologies ProjectTechnology[]
  tags         ProjectTag[]

  @@map("projects")
}

model Technology {
  id       String @id @default(cuid())
  name     String @unique
  icon     String?
  color    String?
  category String?

  projects ProjectTechnology[]
  skills   Skill[]

  @@map("technologies")
}

model ProjectTechnology {
  projectId    String
  technologyId String

  project    Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
  technology Technology @relation(fields: [technologyId], references: [id], onDelete: Cascade)

  @@id([projectId, technologyId])
  @@map("project_technologies")
}

model Tag {
  id   String @id @default(cuid())
  name String @unique

  projects ProjectTag[]

  @@map("tags")
}

model ProjectTag {
  projectId String
  tagId     String

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  tag     Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([projectId, tagId])
  @@map("project_tags")
}

model Skill {
  id           String @id @default(cuid())
  name         String
  level        Int    @default(1) // 1-5
  category     String
  description  String?
  yearsOfExp   Int    @default(0)
  certified    Boolean @default(false)
  technologyId String?

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  technology Technology? @relation(fields: [technologyId], references: [id])

  @@map("skills")
}

model Contact {
  id        String      @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  status    ContactStatus @default(PENDING)
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  @@map("contacts")
}

enum Role {
  USER
  ADMIN
}

enum Category {
  WEB
  MOBILE
  DESKTOP
  API
  LIBRARY
  TOOL
  OTHER
}

enum ContactStatus {
  PENDING
  READ
  REPLIED
  ARCHIVED
}
```

💾 **Commit:**

```bash
git add prisma/schema.prisma
git commit -m "feat: configure Prisma schema with modern database design"
```
### Passo 4: Configuração de Variáveis de Ambiente

**apps/api/.env:**
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db?schema=public"
DATABASE_URL_DEV="postgresql://username:password@localhost:5432/portfolio_dev?schema=public"
DATABASE_URL_TEST="postgresql://username:password@localhost:5432/portfolio_test?schema=public"

# Server
PORT=3001
HOST="0.0.0.0"
NODE_ENV="development"

# Security
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"
BCRYPT_ROUNDS=12

# CORS
CORS_ORIGINS="http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000"

# Redis (Cache)
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD=""
REDIS_DB=0

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=60000

# Monitoring
OTEL_SERVICE_NAME="portfolio-api"
OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
SENTRY_DSN=""

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File Upload
UPLOAD_MAX_SIZE=10485760  # 10MB
UPLOAD_ALLOWED_TYPES="image/jpeg,image/png,image/webp,image/svg+xml"
```

### Passo 5: Executar Migrações e Seeds

```bash
# Gerar cliente Prisma
bun db:generate

# Executar migrações
bun db:migrate

# Popular banco com dados iniciais
bun db:seed
```

**prisma/seed.ts:**
```typescript
import { PrismaClient, Role, Category, ContactStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      name: 'Admin User',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);

  // Criar tecnologias
  const technologies = [
    { name: 'TypeScript', icon: '🔷', color: '#3178C6', category: 'Language' },
    { name: 'React', icon: '⚛️', color: '#61DAFB', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', color: '#339933', category: 'Backend' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791', category: 'Database' },
    { name: 'Docker', icon: '🐳', color: '#2496ED', category: 'DevOps' },
    { name: 'Kubernetes', icon: '☸️', color: '#326CE5', category: 'DevOps' },
  ];

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: tech,
    });
  }

  console.log('✅ Tecnologias criadas');

  // Criar projetos de exemplo
  const reactTech = await prisma.technology.findUnique({ where: { name: 'React' } });
  const typescriptTech = await prisma.technology.findUnique({ where: { name: 'TypeScript' } });
  const nodeTech = await prisma.technology.findUnique({ where: { name: 'Node.js' } });

  if (reactTech && typescriptTech && nodeTech) {
    const project = await prisma.project.create({
      data: {
        title: 'Portfolio Terminal Roguelike',
        description: 'Um portfólio interativo no estilo terminal com elementos de RPG',
        content: 'Este projeto combina a nostalgia dos terminais clássicos com elementos modernos de gamificação...',
        category: Category.WEB,
        featured: true,
        published: true,
        githubUrl: 'https://github.com/k1ngs/k1ngs-portfolio',
        demoUrl: 'https://portfolio.k1ngs.dev',
        authorId: admin.id,
        technologies: {
          create: [
            { technologyId: reactTech.id },
            { technologyId: typescriptTech.id },
            { technologyId: nodeTech.id },
          ],
        },
      },
    });

    console.log('✅ Projeto exemplo criado:', project.title);
  }

  // Criar skills do usuário
  const skills = [
    { name: 'React', level: 5, category: 'Frontend', yearsOfExp: 4, certified: true },
    { name: 'TypeScript', level: 5, category: 'Language', yearsOfExp: 3, certified: false },
    { name: 'Node.js', level: 4, category: 'Backend', yearsOfExp: 3, certified: false },
    { name: 'PostgreSQL', level: 4, category: 'Database', yearsOfExp: 2, certified: false },
  ];

  for (const skill of skills) {
    const technology = await prisma.technology.findUnique({ where: { name: skill.name } });
    
    await prisma.skill.create({
      data: {
        ...skill,
        userId: admin.id,
        technologyId: technology?.id,
      },
    });
  }

  console.log('✅ Skills criadas');

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```
### Passo 6: Configuração do Servidor Principal (src/main.ts):

```typescript
// src/main.ts
import { fastify } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { createServer } from './server.js';
import { env } from './shared/config/env.js';
import { logger } from './shared/infrastructure/logger.js';
import { setupTelemetry } from './shared/infrastructure/telemetry.js';

async function bootstrap() {
  // Setup telemetry first
  setupTelemetry();

  // Create Prisma client
  const prisma = new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  });

  // Create Fastify server
  const server = await createServer({ prisma });

  try {
    // Connect to database
    await prisma.$connect();
    logger.info('✅ Database connected successfully');

    // Start server
    await server.listen({
      port: env.PORT,
      host: env.HOST,
    });

    logger.info(`🚀 Server running on http://${env.HOST}:${env.PORT}`);
    logger.info(`📚 API Documentation: http://${env.HOST}:${env.PORT}/docs`);
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('🛑 Shutting down gracefully...');
  process.exit(0);
});

bootstrap().catch((error) => {
  logger.error('❌ Failed to bootstrap application:', error);
  process.exit(1);
});
```

### Configuração do Servidor Fastify (src/server.ts):

```typescript
// src/server.ts
import { fastify, FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import jwt from '@fastify/jwt';

import { env } from './shared/config/env.js';
import { logger } from './shared/infrastructure/logger.js';
import { portfolioRoutes } from './modules/portfolio/infrastructure/routes.js';
import { projectRoutes } from './modules/projects/infrastructure/routes.js';
import { skillRoutes } from './modules/skills/infrastructure/routes.js';
import { contactRoutes } from './modules/contact/infrastructure/routes.js';
import { authRoutes } from './modules/auth/infrastructure/routes.js';

export interface ServerDependencies {
  prisma: PrismaClient;
}

export async function createServer(deps: ServerDependencies): Promise<FastifyInstance> {
  const server = fastify({
    logger: env.NODE_ENV === 'development' ? {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    } : true,
  });

  // Register plugins
  await server.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  await server.register(cors, {
    origin: env.CORS_ORIGINS,
    credentials: true,
  });

  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await server.register(jwt, {
    secret: env.JWT_SECRET,
  });

  // Swagger documentation
  await server.register(swagger, {
    swagger: {
      info: {
        title: 'Portfolio API',
        description: 'Modern portfolio API with TypeScript and Prisma',
        version: '1.0.0',
      },
      host: `${env.HOST}:${env.PORT}`,
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  });

  await server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  });

  // Add dependencies to server context
  server.decorate('prisma', deps.prisma);

  // Health check
  server.get('/health', async () => {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  });

  // Register routes
  await server.register(authRoutes, { prefix: '/api/auth' });
  await server.register(portfolioRoutes, { prefix: '/api/portfolio' });
  await server.register(projectRoutes, { prefix: '/api/projects' });
  await server.register(skillRoutes, { prefix: '/api/skills' });
  await server.register(contactRoutes, { prefix: '/api/contact' });

  return server;
}
```

💾 **Commit do Backend:**

```bash
git add .
git commit -m "feat: implement modern backend with Fastify, Prisma and TypeScript"
```

---

## 🎨 Frontend Moderno (TanStack Start)

### Estrutura Já Configurada pelo Better-T-Stack

O Better-T-Stack já configurou automaticamente todo o frontend com TanStack Start:

```bash
# Navegar para o diretório do frontend
cd apps/web

# Verificar a estrutura criada
ls -la
```

### Dependências Já Instaladas pelo Better-T-Stack

**apps/web/package.json (gerado automaticamente):**

```json
{
  "name": "@k1ngs-portfolio/web",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start",
    "lint": "biome check .",
    "lint:fix": "biome check --apply .",
    "type-check": "tsc --noEmit",
    "test": "vitest"
  },
  "dependencies": {
    "@tanstack/react-router": "^1.58.0",
    "@tanstack/start": "^1.58.0",
    "@tanstack/react-query": "^5.59.0",
    "@trpc/client": "^11.0.0",
    "@trpc/react-query": "^11.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwindcss": "^3.4.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.6.0",
    "vite": "^5.4.0",
    "vinxi": "^0.4.0",
    "vitest": "^2.1.0"
  }
}
```

### Configuração TanStack Start (Vinxi)

**app.config.ts (gerado automaticamente):**

```typescript
import { defineConfig } from '@tanstack/start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
  server: {
    preset: 'bun',
  },
  routers: {
    ssr: {
      entry: './app/ssr.tsx',
    },
    client: {
      entry: './app/client.tsx',
    },
  },
})
```

### Passo 3: Configuração do TypeScript

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Passo 4: Configuração do Tailwind CSS

**tailwind.config.js:**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#0a0a0a',
          text: '#00ff00',
          prompt: '#ffff00',
          error: '#ff0000',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

## Criando a Estrutura do Frontend

### Estrutura de Pastas

```
apps/web/src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   ├── terminal/       # Componentes do terminal
│   └── layout/         # Componentes de layout
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── stores/             # Estado global (Zustand)
├── services/           # Serviços de API
├── types/              # Definições de tipos
├── utils/              # Utilitários
└── styles/             # Estilos globais
```

### Passo 5: Componente Terminal Principal

**src/components/terminal/Terminal.tsx:**

```typescript
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTerminalStore } from '@/stores/terminalStore'
import { TerminalCommand } from '@/types/terminal'

interface TerminalProps {
  className?: string
}

export const Terminal: React.FC<TerminalProps> = ({ className }) => {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  
  const {
    history,
    currentPath,
    isLoading,
    executeCommand,
    clearHistory
  } = useTerminalStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setIsTyping(true)
    await executeCommand(input)
    setInput('')
    setIsTyping(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      // Implementar navegação no histórico
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={`bg-terminal-bg text-terminal-text font-mono ${className}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-400">Terminal</span>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="p-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600"
      >
        <AnimatePresence>
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2"
            >
              <div className="flex items-center">
                <span className="text-terminal-prompt">$</span>
                <span className="ml-2">{entry.command}</span>
              </div>
              {entry.output && (
                <div className="mt-1 ml-4 text-sm">
                  {entry.error ? (
                    <span className="text-terminal-error">{entry.output}</span>
                  ) : (
                    <span>{entry.output}</span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-2 bg-transparent outline-none flex-1 text-terminal-text"
            placeholder="Digite um comando..."
            disabled={isLoading}
          />
          {isLoading && (
            <div className="ml-2 animate-spin w-4 h-4 border-2 border-terminal-text border-t-transparent rounded-full"></div>
          )}
        </form>
      </div>
    </div>
  )
}
```

### Passo 6: Store do Terminal (Zustand)

**src/stores/terminalStore.ts:**

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { TerminalCommand, TerminalEntry } from '@/types/terminal'
import { commandProcessor } from '@/services/commandProcessor'

interface TerminalState {
  history: TerminalEntry[]
  currentPath: string
  isLoading: boolean
  user: string
  host: string
  executeCommand: (command: string) => Promise<void>
  clearHistory: () => void
  addEntry: (entry: TerminalEntry) => void
}

export const useTerminalStore = create<TerminalState>()()
  devtools(
    (set, get) => ({
      history: [
        {
          command: 'welcome',
          output: 'Bem-vindo ao meu portfólio! Digite "help" para ver os comandos disponíveis.',
          timestamp: new Date(),
          error: false
        }
      ],
      currentPath: '~',
      isLoading: false,
      user: 'visitor',
      host: 'portfolio',

      executeCommand: async (command: string) => {
        const { history, addEntry } = get()
        
        set({ isLoading: true })
        
        // Adicionar comando ao histórico
        addEntry({
          command,
          output: '',
          timestamp: new Date(),
          error: false
        })

        try {
          const result = await commandProcessor.execute(command)
          
          // Atualizar a última entrada com o resultado
          const updatedHistory = [...history]
          const lastEntry = updatedHistory[updatedHistory.length - 1]
          lastEntry.output = result.output
          lastEntry.error = result.error
          
          set({ 
            history: updatedHistory,
            currentPath: result.newPath || get().currentPath
          })
        } catch (error) {
          const updatedHistory = [...history]
          const lastEntry = updatedHistory[updatedHistory.length - 1]
          lastEntry.output = `Erro: ${error.message}`
          lastEntry.error = true
          
          set({ history: updatedHistory })
        } finally {
          set({ isLoading: false })
        }
      },

      clearHistory: () => {
        set({ 
          history: [
            {
              command: 'clear',
              output: 'Terminal limpo.',
              timestamp: new Date(),
              error: false
            }
          ]
        })
      },

      addEntry: (entry: TerminalEntry) => {
        set((state) => ({
          history: [...state.history, entry]
        }))
      }
    }),
    {
      name: 'terminal-store'
    }
  )
)
)
```

### Passo 7: Tipos TypeScript

**src/types/terminal.ts:**

```typescript
export interface TerminalEntry {
  command: string
  output: string
  timestamp: Date
  error: boolean
}

export interface TerminalCommand {
  name: string
  description: string
  usage: string
  execute: (args: string[]) => Promise<CommandResult>
}

export interface CommandResult {
  output: string
  error: boolean
  newPath?: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'devops' | 'tools'
  level: number
  icon?: string
}

export interface Contact {
  email: string
  github: string
  linkedin: string
  twitter?: string
  website?: string
}
```

### Passo 8: Serviços de API

**src/services/projectsService.ts:**

```typescript
import { Project } from '@/types/terminal'

class ProjectsService {
  private projects: Project[] = [
    {
      id: '1',
      title: 'Portfolio Terminal',
      description: 'Portfólio interativo com interface de terminal usando React e TypeScript',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion'],
      githubUrl: 'https://github.com/usuario/portfolio-terminal',
      liveUrl: 'https://portfolio-terminal.vercel.app',
      featured: true
    },
    {
      id: '2',
      title: 'E-commerce API',
      description: 'API REST completa para sistema de e-commerce com autenticação JWT',
      technologies: ['Node.js', 'Fastify', 'Prisma', 'PostgreSQL', 'JWT'],
      githubUrl: 'https://github.com/usuario/ecommerce-api',
      featured: true
    },
    {
      id: '3',
      title: 'Task Manager',
      description: 'Aplicativo de gerenciamento de tarefas com drag and drop',
      technologies: ['React', 'Next.js', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/usuario/task-manager',
      liveUrl: 'https://task-manager-demo.vercel.app',
      featured: false
    }
  ]

  async getAll(): Promise<Project[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    return this.projects
  }

  async getById(id: string): Promise<Project | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.projects.find(p => p.id === id) || null
  }

  async getFeatured(): Promise<Project[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return this.projects.filter(p => p.featured)
  }
}

export const projectsService = new ProjectsService()
```

**src/services/skillsService.ts:**

```typescript
import { Skill } from '@/types/terminal'

class SkillsService {
  private skills: Skill[] = [
    // Frontend
    { id: '1', name: 'React', category: 'frontend', level: 5 },
    { id: '2', name: 'TypeScript', category: 'frontend', level: 4 },
    { id: '3', name: 'Next.js', category: 'frontend', level: 4 },
    { id: '4', name: 'Tailwind CSS', category: 'frontend', level: 5 },
    { id: '5', name: 'Vue.js', category: 'frontend', level: 3 },
    
    // Backend
    { id: '6', name: 'Node.js', category: 'backend', level: 4 },
    { id: '7', name: 'Python', category: 'backend', level: 4 },
    { id: '8', name: 'PostgreSQL', category: 'backend', level: 4 },
    { id: '9', name: 'MongoDB', category: 'backend', level: 3 },
    { id: '10', name: 'Redis', category: 'backend', level: 3 },
    
    // DevOps
    { id: '11', name: 'Docker', category: 'devops', level: 4 },
    { id: '12', name: 'Kubernetes', category: 'devops', level: 3 },
    { id: '13', name: 'AWS', category: 'devops', level: 3 },
    { id: '14', name: 'CI/CD', category: 'devops', level: 4 },
    
    // Tools
    { id: '15', name: 'Git', category: 'tools', level: 5 },
    { id: '16', name: 'Linux', category: 'tools', level: 4 },
    { id: '17', name: 'VS Code', category: 'tools', level: 5 },
    { id: '18', name: 'Figma', category: 'tools', level: 3 }
  ]

  async getAll(): Promise<Skill[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return this.skills
  }

  async getByCategory(category: string): Promise<Skill[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.skills.filter(s => s.category === category)
  }
}

export const skillsService = new SkillsService()
```

### Passo 9: Processador de Comandos

**src/services/commandProcessor.ts:**

```typescript
// src/lib/commandProcessor.ts
import { projectsService, skillsService } from './services';
import type { CommandResult, Project, Skill, Contact } from './types';

const themes = {
  matrix: { bg: 'bg-black', text: 'text-green-400', accent: 'text-green-300' },
  cyberpunk: { bg: 'bg-purple-900', text: 'text-cyan-400', accent: 'text-pink-400' },
  hacker: { bg: 'bg-gray-900', text: 'text-amber-400', accent: 'text-orange-400' },
  retro: { bg: 'bg-blue-900', text: 'text-yellow-300', accent: 'text-white' }
};

let currentTheme = 'matrix';

export const processCommand = async (command: string, args: string[]): Promise<CommandResult> => {
  const cmd = command.toLowerCase();
  
  switch (cmd) {
    case 'help':
      return {
        output: [
          'Comandos disponíveis:',
          '  help          - Mostra esta mensagem de ajuda',
          '  about         - Informações sobre mim',
          '  projects      - Lista meus projetos',
          '  skills        - Minhas habilidades técnicas',
          '  contact       - Informações de contato',
          '  clear         - Limpa o terminal',
          '  theme [nome]  - Altera o tema (matrix, cyberpunk, hacker, retro)',
          '  whoami        - Informações do usuário atual',
          '  date          - Data e hora atual',
          '  pwd           - Diretório atual',
          '  ls            - Lista arquivos do diretório'
        ],
        type: 'info'
      };

    case 'about':
      return {
        output: [
          '╔══════════════════════════════════════════════════════════════╗',
          '║                    SOBRE MIM                                ║',
          '╠══════════════════════════════════════════════════════════════╣',
          '║ Nome: João Silva                                             ║',
          '║ Cargo: Desenvolvedor Full Stack                              ║',
          '║ Localização: São Paulo, Brasil                              ║',
          '║ Experiência: 5+ anos                                        ║',
          '║                                                              ║',
          '║ Especializado em desenvolvimento web moderno com foco em     ║',
          '║ React, Node.js, TypeScript e arquiteturas escaláveis.       ║',
          '║                                                              ║',
          '║ Apaixonado por tecnologia, código limpo e experiências      ║',
          '║ de usuário excepcionais.                                    ║',
          '╚══════════════════════════════════════════════════════════════╝'
        ],
        type: 'success'
      };

    case 'projects':
      try {
        const projects = await projectsService.getAll();
        const output = [
          '📁 PROJETOS:',
          ''
        ];
        
        projects.forEach((project: Project, index: number) => {
          output.push(`${index + 1}. ${project.title}`);
          output.push(`   ${project.description}`);
          output.push(`   Tech: ${project.technologies.join(', ')}`);
          output.push(`   Status: ${project.status}`);
          if (project.url) output.push(`   URL: ${project.url}`);
          output.push('');
        });
        
        return { output, type: 'success' };
      } catch (error) {
        return {
          output: ['Erro ao carregar projetos. Usando dados de exemplo...'],
          type: 'error'
        };
      }

    case 'skills':
      try {
        const skills = await skillsService.getAll();
        const output = ['🛠️  HABILIDADES TÉCNICAS:', ''];
        
        const groupedSkills = skills.reduce((acc: Record<string, Skill[]>, skill: Skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {});
        
        Object.entries(groupedSkills).forEach(([category, categorySkills]) => {
          output.push(`${category.toUpperCase()}:`);
          categorySkills.forEach(skill => {
            const level = '█'.repeat(Math.floor(skill.level / 20)) + '░'.repeat(5 - Math.floor(skill.level / 20));
            output.push(`  ${skill.name.padEnd(20)} [${level}] ${skill.level}%`);
          });
          output.push('');
        });
        
        return { output, type: 'success' };
      } catch (error) {
        return {
          output: ['Erro ao carregar habilidades.'],
          type: 'error'
        };
      }

    case 'contact':
      const contact: Contact = {
        email: 'joao@exemplo.com',
        linkedin: 'https://linkedin.com/in/joaosilva',
        github: 'https://github.com/joaosilva',
        phone: '+55 11 99999-9999'
      };
      
      return {
        output: [
          '📞 CONTATO:',
          '',
          `📧 Email: ${contact.email}`,
          `💼 LinkedIn: ${contact.linkedin}`,
          `🐙 GitHub: ${contact.github}`,
          `📱 Telefone: ${contact.phone}`,
          '',
          'Fique à vontade para entrar em contato!'
        ],
        type: 'info'
      };

    case 'clear':
      return { output: [], type: 'clear' };

    case 'theme':
      const themeName = args[0]?.toLowerCase();
      if (!themeName) {
        return {
          output: [
            'Temas disponíveis:',
            '  matrix    - Verde sobre preto (padrão)',
            '  cyberpunk - Ciano e rosa sobre roxo',
            '  hacker    - Âmbar sobre cinza escuro',
            '  retro     - Amarelo sobre azul escuro',
            '',
            `Tema atual: ${currentTheme}`
          ],
          type: 'info'
        };
      }
      
      if (themes[themeName as keyof typeof themes]) {
        currentTheme = themeName;
        return {
          output: [`Tema alterado para: ${themeName}`],
          type: 'success',
          theme: themes[themeName as keyof typeof themes]
        };
      } else {
        return {
          output: [`Tema '${themeName}' não encontrado.`],
          type: 'error'
        };
      }

    case 'whoami':
      return {
        output: ['visitor@portfolio.dev'],
        type: 'info'
      };

    case 'date':
      return {
        output: [new Date().toLocaleString('pt-BR')],
        type: 'info'
      };

    case 'pwd':
      return {
        output: ['/home/visitor/portfolio'],
        type: 'info'
      };

    case 'ls':
      return {
        output: [
          'total 8',
          'drwxr-xr-x  2 visitor visitor 4096 Jan 15 10:30 projects/',
          'drwxr-xr-x  2 visitor visitor 4096 Jan 15 10:30 skills/',
          '-rw-r--r--  1 visitor visitor 1024 Jan 15 10:30 about.txt',
          '-rw-r--r--  1 visitor visitor  512 Jan 15 10:30 contact.txt'
        ],
        type: 'info'
      };

    default:
      return {
        output: [`Comando '${command}' não encontrado. Digite 'help' para ver os comandos disponíveis.`],
        type: 'error'
      };
  }
};
```

### Passo 10: Componente Principal da Aplicação

```typescript
// src/App.tsx
import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import { useTerminalStore } from './store/terminalStore';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const { theme } = useTerminalStore();

  useEffect(() => {
    // Simula o boot sequence
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <div className="text-xl mb-2">Inicializando Portfolio Terminal...</div>
          <div className="text-sm opacity-70">Carregando módulos do sistema...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono`}>
      <Terminal />
    </div>
  );
}

export default App;
```

## 📱 Sistema de Responsividade e Multi-dispositivos

Antes de integrar o frontend com o backend, vamos implementar um sistema de responsividade robusto para garantir que nossa aplicação funcione perfeitamente em todos os dispositivos.

### Configuração CSS Responsiva Moderna

```css
/* src/styles/responsive.css - Sistema de Responsividade Moderno (2025) */

/* Reset e configurações base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Breakpoints modernos */
  --mobile-xs: 320px;
  --mobile-sm: 375px;
  --mobile-md: 414px;
  --mobile-lg: 480px;
  --tablet-sm: 768px;
  --tablet-md: 834px;
  --tablet-lg: 1024px;
  --desktop-sm: 1280px;
  --desktop-md: 1440px;
  --desktop-lg: 1920px;
  --desktop-xl: 2560px;

  /* Espaçamentos responsivos */
  --spacing-xs: clamp(0.25rem, 0.5vw, 0.5rem);
  --spacing-sm: clamp(0.5rem, 1vw, 1rem);
  --spacing-md: clamp(1rem, 2vw, 2rem);
  --spacing-lg: clamp(1.5rem, 3vw, 3rem);
  --spacing-xl: clamp(2rem, 4vw, 4rem);

  /* Tipografia responsiva */
  --font-xs: clamp(0.75rem, 2vw, 0.875rem);
  --font-sm: clamp(0.875rem, 2.5vw, 1rem);
  --font-md: clamp(1rem, 3vw, 1.125rem);
  --font-lg: clamp(1.125rem, 3.5vw, 1.25rem);
  --font-xl: clamp(1.25rem, 4vw, 1.5rem);
  --font-2xl: clamp(1.5rem, 5vw, 2rem);
  --font-3xl: clamp(2rem, 6vw, 3rem);

  /* Container responsivo */
📱 Sistema de Responsividade e Multi-dispositivos
Antes de integrar o frontend com o backend, vamos implementar um sistema de responsividade robusto para garantir que nossa aplicação funcione perfeitamente em todos os dispositivos.

Configuração CSS Responsiva Moderna
src/styles/responsive.css:

/* responsive.css - Sistema de Responsividade Moderno (2025) */

/* Reset e configurações base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Breakpoints modernos */
  --mobile-xs: 320px;
  --mobile-sm: 375px;
  --mobile-md: 414px;
  --mobile-lg: 480px;
  --tablet-sm: 768px;
  --tablet-md: 834px;
  --tablet-lg: 1024px;
  --desktop-sm: 1280px;
  --desktop-md: 1440px;
  --desktop-lg: 1920px;
  --desktop-xl: 2560px;

  /* Espaçamentos responsivos */
  --spacing-xs: clamp(0.25rem, 0.5vw, 0.5rem);
  --spacing-sm: clamp(0.5rem, 1vw, 1rem);
  --spacing-md: clamp(1rem, 2vw, 2rem);
  --spacing-lg: clamp(1.5rem, 3vw, 3rem);
  --spacing-xl: clamp(2rem, 4vw, 4rem);

  /* Tipografia responsiva */
  --font-xs: clamp(0.75rem, 2vw, 0.875rem);
  --font-sm: clamp(0.875rem, 2.5vw, 1rem);
  --font-md: clamp(1rem, 3vw, 1.125rem);
  --font-lg: clamp(1.125rem, 3.5vw, 1.25rem);
  --font-xl: clamp(1.25rem, 4vw, 1.5rem);
  --font-2xl: clamp(1.5rem, 5vw, 2rem);
  --font-3xl: clamp(2rem, 6vw, 3rem);

  /* Container responsivo */
  --container-padding: clamp(1rem, 5vw, 2rem);
  --container-max-width: min(100% - var(--container-padding) * 2, 1200px);
}

/* Container principal responsivo */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Grid responsivo moderno */
.grid {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}

.grid--2 {
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
}

.grid--3 {
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
}

.grid--4 {
  grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));
}

/* Terminal responsivo */
.terminal {
  width: 100%;
  height: 100vh;
  min-height: 500px;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: var(--font-sm);
  line-height: 1.5;
  overflow: hidden;
}

.terminal__content {
  height: 100%;
  overflow-y: auto;
  padding: var(--spacing-md);
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) transparent;
}

.terminal__input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font: inherit;
  caret-color: var(--color-accent);
}

/* Cards responsivos */
.card {
  background: var(--color-surface);
  border-radius: 12px;
  padding: var(--spacing-md);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.2);
}

/* Botões responsivos */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-sm);
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 44px; /* Acessibilidade touch */
  min-width: 44px;
}

/* Media Queries Modernas */

/* Mobile Extra Small (320px - 374px) */
@media (max-width: 374px) {
  :root {
    --container-padding: 1rem;
  }

  .terminal {
    font-size: 12px;
  }

  .card {
    padding: var(--spacing-sm);
  }
}

/* Mobile Small (375px - 413px) */
@media (min-width: 375px) and (max-width: 413px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet Small (768px - 833px) */
@media (min-width: 768px) and (max-width: 833px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .terminal {
    font-size: var(--font-md);
  }
}

/* Desktop Large (1440px+) */
@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Orientação Portrait */
@media (orientation: portrait) {
  .terminal {
    height: calc(100vh - 60px);
  }
}

/* Dispositivos com hover */
@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
  }
}

/* Dispositivos sem hover (touch) */
@media (hover: none) {
  .card:active {
    transform: scale(0.98);
  }
}

/* Preferência de movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Modo escuro */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0a0a0a;
    --color-surface: #1a1a1a;
    --color-text: #ffffff;
    --color-accent: #00ff88;
  }
}

/* Modo claro */
@media (prefers-color-scheme: light) {
  :root {
    --color-background: #ffffff;
    --color-surface: #f8f9fa;
    --color-text: #1a1a1a;
    --color-accent: #007bff;
  }
}
Hook React para Responsividade
src/hooks/useResponsive.js:

// src/hooks/useResponsive.js - Hook de Responsividade Moderno (2025)
import { useState, useEffect, useCallback } from 'react';

// Breakpoints modernos
const breakpoints = {
  mobileXs: 320,
  mobileSm: 375,
  mobileMd: 414,
  mobileLg: 480,
  tabletSm: 768,
  tabletMd: 834,
  tabletLg: 1024,
  desktopSm: 1280,
  desktopMd: 1440,
  desktopLg: 1920,
  desktopXl: 2560
};

// Detectar tipo de dispositivo
const getDeviceType = (width) => {
  if (width < breakpoints.mobileLg) return 'mobile';
  if (width < breakpoints.tabletLg) return 'tablet';
  return 'desktop';
};

export const useResponsive = () => {
  const [screenData, setScreenData] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        deviceType: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        orientation: 'landscape',
        touchSupport: false
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const deviceType = getDeviceType(width);

    return {
      width,
      height,
      deviceType,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      orientation: width > height ? 'landscape' : 'portrait',
      touchSupport: 'ontouchstart' in window
    };
  });

  const updateScreenData = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const deviceType = getDeviceType(width);

    setScreenData({
      width,
      height,
      deviceType,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      orientation: width > height ? 'landscape' : 'portrait',
      touchSupport: 'ontouchstart' in window
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenData, 150); // Debounce
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', updateScreenData);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateScreenData);
    };
  }, [updateScreenData]);

  return screenData;
};

export default useResponsive;
Componente Terminal Responsivo
src/components/ResponsiveTerminal.jsx:

// src/components/ResponsiveTerminal.jsx - Terminal Responsivo (2025)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useResponsive } from '../hooks/useResponsive';
import './responsive.css';

const ResponsiveTerminal = ({
  onCommand,
  initialCommands = [],
  theme = 'dark',
  autoFocus = true
}) => {
  const [history, setHistory] = useState(initialCommands);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const contentRef = useRef(null);
  const { isMobile, isTablet, orientation, touchSupport } = useResponsive();

  // Auto scroll para o final
  const scrollToBottom = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Lidar com comandos
  const handleCommand = useCallback(async (command) => {
    if (!command.trim()) return;

    setIsLoading(true);
    const newEntry = {
      id: Date.now(),
      type: 'command',
      content: command,
      timestamp: new Date().toISOString()
    };

    setHistory(prev => [...prev, newEntry]);
    setCurrentInput('');

    try {
      const response = await onCommand?.(command);

      const responseEntry = {
        id: Date.now() + 1,
        type: 'response',
        content: response || 'Comando executado com sucesso',
        timestamp: new Date().toISOString()
      };

      setHistory(prev => [...prev, responseEntry]);
    } catch (error) {
      const errorEntry = {
        id: Date.now() + 1,
        type: 'error',
        content: error.message || 'Erro ao executar comando',
        timestamp: new Date().toISOString()
      };

      setHistory(prev => [...prev, errorEntry]);
    } finally {
      setIsLoading(false);
    }
  }, [onCommand]);

  // Classe CSS baseada no dispositivo
  const terminalClass = [
    'terminal',
    `terminal--${theme}`,
    isMobile && 'terminal--mobile',
    isTablet && 'terminal--tablet',
    orientation === 'portrait' && 'terminal--portrait',
    touchSupport && 'terminal--touch'
  ].filter(Boolean).join(' ');

  return (
    <div className={terminalClass}>
      <div
        ref={contentRef}
        className="terminal__content"
        onClick={() => !touchSupport && inputRef.current?.focus()}
      >
        {/* Histórico */}
        <div className="terminal__history">
          {history.map(entry => (
            <div key={entry.id} className={`terminal__entry terminal__entry--${entry.type}`}>
              {entry.type === 'command' && <span className="terminal__prompt">$ </span>}
              <span className="terminal__content">{entry.content}</span>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="terminal__loading">
            <span className="terminal__prompt">$ </span>
            <span>Processando...</span>
          </div>
        )}

        {/* Input atual */}
        <div className="terminal__input-line">
          <span className="terminal__prompt">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCommand(currentInput)}
            className="terminal__input"
            placeholder={isMobile ? "Toque para digitar..." : "Digite um comando..."}
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>

        {/* Botões de ação para mobile */}
        {touchSupport && (
          <div className="terminal__mobile-actions">
            <button
              className="btn btn--primary"
              onClick={() => handleCommand(currentInput)}
              disabled={!currentInput.trim() || isLoading}
            >
              Executar
            </button>
            <button
              className="btn btn--secondary"
              onClick={() => setCurrentInput('')}
              disabled={!currentInput || isLoading}
            >
              Limpar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveTerminal;
Configuração do Viewport
public/index.html:

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#000000">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Portfolio Terminal">
  <title>Portfolio Terminal</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
Integração no App Principal
src/App.jsx (atualização):

import React from 'react';
import ResponsiveTerminal from './components/ResponsiveTerminal';
import { useResponsive } from './hooks/useResponsive';
import './styles/responsive.css';

function App() {
  const { isMobile, isTablet } = useResponsive();

  const handleCommand = async (command) => {
    // Lógica dos comandos aqui
    return `Comando executado: ${command}`;
  };

  return (
    <div className="App">
      <ResponsiveTerminal
        onCommand={handleCommand}
        theme={isMobile ? 'mobile' : 'dark'}
        autoFocus={!isMobile}
      />
    </div>
  );
}

export default App;
🔗 Integração Frontend + Backend
Passo 1: Configuração de Variáveis de Ambiente
frontend/.env:

# API Configuration
VITE_API_URL=http://localhost:3002/api

# App Configuration
VITE_APP_NAME=Portfolio Terminal
VITE_APP_VERSION=1.0.0

# Contact Information
VITE_CONTACT_EMAIL=seu@email.com
Passo 2: Componentes de Seção
src/components/sections/ProjectsSection.jsx:

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../../hooks/useApi';
import { useTheme } from '../../contexts/ThemeContext';

function ProjectsSection() {
  const { theme } = useTheme();
  const { data: projectsData, loading, error } = useProjects();
  const [filter, setFilter] = useState('all');

  // Garantir que projects seja sempre um array
  const projects = Array.isArray(projectsData) ? projectsData : [];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const categories = ['all', ...new Set(projects.map(p => p.category))];

  if (loading) {
    return (
      <div className="space-y-4">
        <div className={`${theme.accent} text-lg`}>$ ls -la /projects/</div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-600 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className={`${theme.accent} text-lg`}>$ ls -la /projects/</div>
        <div className="text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`${theme.accent} text-lg`}>$ ls -la /projects/</div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-3 py-1 rounded border ${
              filter === category
                ? `${theme.border} ${theme.accent}`
                : `border-gray-600 ${theme.text} hover:${theme.accent}`
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lista de Projetos */}
      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`border ${theme.border} rounded p-4 hover:bg-gray-900 transition-colors`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className={`${theme.accent} text-lg font-bold`}>
                {project.title}
              </h3>
              <span className={`text-sm ${theme.text} opacity-70`}>
                [{project.category}]
              </span>
            </div>

            <p className={`${theme.text} mb-3`}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {JSON.parse(project.technologies || '[]').map(tech => (
                <span
                  key={tech}
                  className={`px-2 py-1 text-xs rounded bg-gray-800 ${theme.text}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme.accent} hover:underline`}
                >
                  [GitHub]
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme.accent} hover:underline`}
                >
                  [Demo]
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className={`${theme.text} opacity-70`}>
          Nenhum projeto encontrado para o filtro "{filter}".
        </div>
      )}
    </div>
  );
}

export default ProjectsSection;
Passo 3: Testando a Integração
# Terminal 1 - Backend
cd apps/server
bun db:migrate
bun db:seed
bun dev

# Terminal 2 - Frontend
cd apps/web
bun dev
🧪 Testes Básicos
Após integrar o frontend com o backend, é fundamental implementar testes para garantir a qualidade e confiabilidade da aplicação.

Backend - Testes com Vitest (já configurado)
cd apps/server
# Vitest já está instalado pelo Better-T-Stack
bun test
backend/package.json (adicionar scripts):

{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/server.js"
    ]
  }
}
tests/unit/projectUseCases.test.js:

const ProjectUseCases = require('../../src/domain/usecases/projectUseCases');

// Mock do repository
const mockProjectRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

describe('ProjectUseCases', () => {
  let projectUseCases;

  beforeEach(() => {
    projectUseCases = new ProjectUseCases(mockProjectRepository);
    jest.clearAllMocks();
  });

  describe('createProject', () => {
    it('should create project with valid data', async () => {
      const projectData = {
        title: 'Test Project',
        description: 'Test Description'
      };
      const userId = 1;
      const expectedProject = { id: 1, ...projectData, created_by: userId };

      mockProjectRepository.create.mockResolvedValue(expectedProject);

      const result = await projectUseCases.createProject(projectData, userId);

      expect(mockProjectRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...projectData,
          created_by: userId
        })
      );
      expect(result).toEqual(expectedProject);
    });

    it('should throw error for invalid title', async () => {
      const projectData = { title: 'ab' }; // Título muito curto
      const userId = 1;

      await expect(
        projectUseCases.createProject(projectData, userId)
      ).rejects.toThrow('Título deve ter pelo menos 3 caracteres');
    });
  });
});
tests/integration/projects.test.js:

const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/infrastructure/database/connection');

describe('Projects API', () => {
  beforeEach(async () => {
    // Limpar banco de dados antes de cada teste
    await db('projects').del();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe('GET /api/projects', () => {
    it('should return empty array when no projects exist', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return projects when they exist', async () => {
      // Criar projeto de teste
      await db('projects').insert({
        title: 'Test Project',
        description: 'Test Description',
        category: 'web'
      });

      const response = await request(app)
        .get('/api/projects')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Test Project');
    });
  });
});
Frontend - Testes com Vitest
# Testes já configurados no starter
# O starter já inclui Vitest e Testing Library

# Scripts de teste disponíveis:
bun test              # Executar testes
bun test:ui           # Interface visual dos testes
bun test:coverage     # Relatório de cobertura
vite.config.js (atualizar):

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
});
src/test/setup.js:

import '@testing-library/jest-dom';

// Mock do IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
src/components/tests/ProjectsSection.test.jsx:

import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProjectsSection from '../sections/ProjectsSection';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock do hook useProjects
vi.mock('../../hooks/useApi', () => ({
  useProjects: vi.fn()
}));

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ProjectsSection', () => {
  it('should render loading state', () => {
    const { useProjects } = require('../../hooks/useApi');
    useProjects.mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    renderWithTheme(<ProjectsSection />);

    expect(screen.getByText('$ ls -la /projects/')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('should render projects when data is loaded', async () => {
    const mockProjects = [
      {
        id: 1,
        title: 'Test Project',
        description: 'Test Description',
        category: 'web',
        technologies: '["React", "Node.js"]'
      }
    ];

    const { useProjects } = require('../../hooks/useApi');
    useProjects.mockReturnValue({
      data: mockProjects,
      loading: false,
      error: null
    });

    renderWithTheme(<ProjectsSection />);

    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  it('should handle error state', () => {
    const { useProjects } = require('../../hooks/useApi');
    useProjects.mockReturnValue({
      data: null,
      loading: false,
      error: 'Failed to fetch projects'
    });

    renderWithTheme(<ProjectsSection />);

    expect(screen.getByText(/erro ao carregar projetos/i)).toBeInTheDocument();
  });
});
src/hooks/tests/useResponsive.test.js:

import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useResponsive from '../useResponsive';

// Mock do window
const mockWindow = {
  innerWidth: 1024,
  innerHeight: 768,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
};

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: 768,
});

describe('useResponsive', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return desktop device type for large screens', () => {
    const { result } = renderHook(() => useResponsive());

    expect(result.current.deviceType).toBe('desktop');
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
  });

  it('should return mobile device type for small screens', () => {
    // Simular tela mobile
    Object.defineProperty(window, 'innerWidth', { value: 375 });
    Object.defineProperty(window, 'innerHeight', { value: 667 });

    const { result } = renderHook(() => useResponsive());

    expect(result.current.deviceType).toBe('mobile');
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });
});
Executando os Testes
# Backend
cd backend
npm test
npm run test:coverage

# Frontend
cd frontend
npm test
npm run test:coverage
💾 Commit:

git add .
git commit -m "feat: implement comprehensive testing suite with Jest and Vitest for backend and frontend"
🐳 Configuração Docker (Já Incluída no Starter)

O starter **k1ngs-portfolio** já possui configuração Docker otimizada:

### Docker Compose para PostgreSQL

O arquivo **docker-compose.yml** já está configurado:

```yaml
# docker-compose.yml (já incluído no starter)
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: portfolio
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Comandos Docker Disponíveis

```bash
# Iniciar PostgreSQL
bun db:start

# Parar PostgreSQL
docker-compose down

# Ver logs do banco
docker-compose logs postgres
```
### Deploy com Better-T-Stack

O starter utiliza **TanStack Start** que possui build otimizado:

```bash
# Build de produção (já configurado)
bun run build

# O build gera arquivos otimizados para deploy
# em qualquer plataforma (Vercel, Netlify, etc.)
```
### Configuração de Proxy (tRPC)

O starter usa **tRPC** que elimina a necessidade de proxy manual:

```typescript
// tRPC já configurado no starter
// Frontend e Backend se comunicam type-safe
// sem necessidade de configuração Nginx manual
```
## 🚀 Deploy e Produção com Better-T-Stack

### Comandos de Deploy Disponíveis

O starter já possui scripts otimizados para deploy:

```bash
# Build de produção
bun run build

# Deploy automático (dependendo da plataforma)
bun run deploy

# Verificar build localmente
bun run preview
```
### Plataformas de Deploy Suportadas

O **TanStack Start** suporta deploy em múltiplas plataformas:

- **Vercel** (recomendado)
- **Netlify**
- **Railway**
- **Render**
- **AWS/GCP/Azure**

```bash
# Deploy no Vercel (exemplo)
npx vercel

# Deploy no Netlify
npx netlify deploy --prod
```
### Variáveis de Ambiente

O starter já possui configuração de ambiente:

```bash
# .env (já configurado no starter)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

### Scripts de Desenvolvimento

```bash
# Comandos já disponíveis no starter
bun dev          # Desenvolvimento
bun build        # Build de produção
bun test         # Executar testes
bun lint         # Verificar código
bun db:start     # Iniciar PostgreSQL
bun db:push      # Aplicar schema
bun db:studio    # Interface do banco
```
## 🎨 Customizando seu Portfólio

### Personalizando Informações

Após clonar o starter, personalize suas informações:

```typescript
// apps/web/src/data/portfolio.ts
export const portfolioData = {
  name: "Seu Nome",
  title: "Seu Título Profissional",
  bio: "Sua biografia...",
  skills: ["React", "TypeScript", "Node.js"],
  projects: [
    {
      name: "Projeto 1",
      description: "Descrição do projeto",
      tech: ["React", "TypeScript"],
      url: "https://github.com/seu-usuario/projeto"
    }
  ],
  contact: {
    email: "seu@email.com",
    github: "https://github.com/seu-usuario",
    linkedin: "https://linkedin.com/in/seu-perfil"
  }
};
```

### Customizando Temas

O starter inclui sistema de temas:

```typescript
// apps/web/src/styles/themes.ts
export const themes = {
  matrix: {
    primary: "#00ff00",
    background: "#000000",
    text: "#00ff00"
  },
  cyberpunk: {
    primary: "#ff0080",
    background: "#0a0a0a",
    text: "#ffffff"
  }
  // Adicione seus próprios temas
};
```
🔧 Melhorias e Extensões Pós-Projeto
Importante: Implemente essas melhorias após completar o projeto base, seguindo os princípios de Clean Code e Clean Architecture.

🏗️ Princípios de Clean Architecture
Antes de implementar melhorias, organize o código seguindo:

backend/src/
├── domain/              # Regras de negócio
│   ├── entities/        # Entidades do domínio
│   ├── repositories/    # Interfaces dos repositórios
│   └── usecases/        # Casos de uso
├── infrastructure/      # Implementações externas
│   ├── database/        # Implementação do banco
│   ├── web/            # Controllers e rotas
│   └── external/       # APIs externas
└── application/        # Orquestração
    ├── services/       # Serviços de aplicação
    └── dto/           # Data Transfer Objects
💾 Commit:

git add .
git commit -m "refactor: restructure backend following clean architecture principles"
🚀 Implementação de Melhorias
1. Sistema de Autenticação GitHub OAuth
Passo 1: Configuração OAuth
# Autenticação GitHub já configurada no starter
# As dependências de autenticação já estão incluídas
src/infrastructure/auth/githubStrategy.js:

const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const { findOrCreateUser } = require('../../domain/usecases/userUseCases');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await findOrCreateUser({
      githubId: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value,
      avatar: profile.photos?.[0]?.value
    });
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;
src/infrastructure/web/routes/auth.js:

const express = require('express');
const passport = require('../../../infrastructure/auth/githubStrategy');
const { generateJWT } = require('../../domain/usecases/authUseCases');
const router = express.Router();

// Iniciar autenticação
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// Callback do GitHub
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    const token = await generateJWT(req.user);
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

// Logout
router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;
💾 Commit:

git add .
git commit -m "feat: implement GitHub OAuth authentication with clean architecture"
Passo 2: Frontend - Context de Autenticação
src/contexts/AuthContext.jsx:

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const userData = await authService.verifyToken(token);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('auth_token');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
💾 Commit:

git add .
git commit -m "feat: add authentication context and user management"
2. Painel Administrativo
Backend - CRUD de Projetos
src/domain/usecases/projectUseCases.js:

class ProjectUseCases {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async createProject(projectData, userId) {
    // Validação de negócio
    if (!projectData.title || projectData.title.trim().length < 3) {
      throw new Error('Título deve ter pelo menos 3 caracteres');
    }

    const project = {
      ...projectData,
      created_by: userId,
      created_at: new Date(),
      updated_at: new Date()
    };

    return await this.projectRepository.create(project);
  }

  async updateProject(id, projectData, userId) {
    const existingProject = await this.projectRepository.findById(id);

    if (!existingProject) {
      throw new Error('Projeto não encontrado');
    }

    if (existingProject.created_by !== userId) {
      throw new Error('Sem permissão para editar este projeto');
    }

    return await this.projectRepository.update(id, {
      ...projectData,
      updated_at: new Date()
    });
  }

  async deleteProject(id, userId) {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new Error('Projeto não encontrado');
    }

    if (project.created_by !== userId) {
      throw new Error('Sem permissão para deletar este projeto');
    }

    return await this.projectRepository.delete(id);
  }
}

module.exports = ProjectUseCases;
Frontend - Painel Admin
src/components/admin/AdminPanel.jsx:

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import Analytics from './Analytics';

function AdminPanel() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  const tabs = [
    { id: 'projects', label: 'Projetos', icon: '📁' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Header */}
      <div className="border-b border-green-400 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <span className="text-sm opacity-70">Bem-vindo, {user?.username}</span>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 border border-red-400 text-red-400 rounded hover:bg-red-400 hover:text-black transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-green-400 p-4">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-3 rounded flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-400 text-black'
                    : 'hover:bg-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'projects' && <ProjectManager />}
            {activeTab === 'skills' && <SkillManager />}
            {activeTab === 'analytics' && <Analytics />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
💾 Commit:

git add .
git commit -m "feat: implement admin panel with CRUD operations following single responsibility principle"
3. Sistema de Cache Redis
# Cache Redis já configurado no starter
# As dependências do Redis já estão incluídas
src/infrastructure/cache/redisClient.js:

const Redis = require('ioredis');

class CacheService {
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3
    });
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttl = 3600) {
    try {
      await this.client.setex(key, ttl, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  async flush() {
    try {
      await this.client.flushall();
      return true;
    } catch (error) {
      console.error('Cache flush error:', error);
      return false;
    }
  }
}

module.exports = new CacheService();
src/infrastructure/web/middleware/cacheMiddleware.js:

const cacheService = require('../cache/redisClient');

const cacheMiddleware = (ttl = 3600) => {
  return async (req, res, next) => {
    // Só cachear GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = `cache:${req.originalUrl}`;

    try {
      const cachedData = await cacheService.get(cacheKey);

      if (cachedData) {
        console.log(`Cache hit: ${cacheKey}`);
        return res.json(cachedData);
      }

      // Interceptar res.json para cachear a resposta
      const originalJson = res.json;
      res.json = function(data) {
        // Cachear apenas respostas de sucesso
        if (res.statusCode === 200) {
          cacheService.set(cacheKey, data, ttl);
          console.log(`Cache set: ${cacheKey}`);
        }
        return originalJson.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

module.exports = cacheMiddleware;
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement Redis cache system with middleware for performance optimization"
```

## 5. Analytics e Monitoramento

### Google Analytics 4

> **Nota:** Analytics já configurado no starter - as dependências de analytics já estão incluídas

**src/services/analytics.js:**

```javascript

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (typeof window === 'undefined' || this.isInitialized) return;

    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics ID não configurado');
      return;
    }

    // Carregar script do Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Configurar gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href
    });

    this.isInitialized = true;
  }

  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized || typeof window.gtag !== 'function') return;

    window.gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label,
      value: parameters.value,
      ...parameters
    });
  }

  trackPageView(path, title) {
    if (!this.isInitialized || typeof window.gtag !== 'function') return;

    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title
    });
  }

  trackProjectView(projectId, projectTitle) {
    this.trackEvent('project_view', {
      category: 'projects',
      label: projectTitle,
      project_id: projectId
    });
  }

  trackSectionNavigation(section) {
    this.trackEvent('section_navigation', {
      category: 'navigation',
      label: section
    });
  }
}

export default new AnalyticsService();
```

### Sistema de Logs Estruturados

**src/infrastructure/logging/logger.js:**

```javascript

const winston = require('winston');
const path = require('path');

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: {
    service: 'portfolio-api',
    environment: process.env.NODE_ENV
  },
  transports: [
    // Arquivo de erro
    new winston.transports.File({
      filename: path.join(__dirname, '../../../logs/error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),

    // Arquivo combinado
    new winston.transports.File({
      filename: path.join(__dirname, '../../../logs/combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
});

// Em desenvolvimento, também logar no console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Middleware para Express
logger.expressMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    };

    if (res.statusCode >= 400) {
      logger.error('HTTP Error', logData);
    } else {
      logger.info('HTTP Request', logData);
    }
  });

  next();
};

module.exports = logger;
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement analytics tracking and structured logging system"
```

## 6. Otimizações de Performance

### Lazy Loading e Code Splitting

**src/App.jsx:**

```jsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loading dos componentes
const TerminalLayout = lazy(() => import('./components/TerminalLayout'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));
const BootSequence = lazy(() => import('./components/BootSequence'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-black text-green-400 font-mono">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<TerminalLayout />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/boot" element={<BootSequence />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
```

### Service Worker para Cache

**public/sw.js:**

```javascript

const CACHE_NAME = 'portfolio-terminal-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement performance optimizations with lazy loading and service worker"
```

## 7. SEO e Acessibilidade

### Meta Tags Dinâmicas

```bash
cd frontend
```

> **Nota:** SEO já configurado no starter - as dependências de SEO já estão incluídas

**src/components/SEOHead.jsx:**

```jsx

import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEOHead({
  title = 'Portfolio Terminal',
  description = 'Portfólio interativo com interface de terminal roguelike',
  keywords = 'portfolio, terminal, react, node.js, desenvolvedor',
  image = '/og-image.png',
  url = window.location.href
}) {
  const fullTitle = title === 'Portfolio Terminal' ? title : `${title} | Portfolio Terminal`;

  return (
    <Helmet>
      {/* Meta tags básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Seu Nome",
          "jobTitle": "Desenvolvedor Full Stack",
          "url": url,
          "sameAs": [
            "https://github.com/seu-usuario",
            "https://linkedin.com/in/seu-perfil"
          ],
          "knowsAbout": [
            "JavaScript", "React", "Node.js", "Docker", "Clean Architecture"
          ]
        })}
      </script>
    </Helmet>
  );
}

export default SEOHead;
```

### Acessibilidade (ARIA)

**src/components/AccessibleTerminal.jsx:**

```jsx

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function AccessibleTerminal({ children, title = "Terminal Portfolio" }) {
  const { theme } = useTheme();

  return (
    <div
      className={`terminal-window ${theme.bg} ${theme.text}`}
      role="application"
      aria-label={title}
      aria-describedby="terminal-description"
    >
      <div
        id="terminal-description"
        className="sr-only"
      >
        Interface de terminal interativa para navegação do portfólio.
        Use Tab para navegar entre seções e Enter para selecionar.
      </div>

      <div
        className="terminal-header"
        role="banner"
        aria-label="Cabeçalho do terminal"
      >
        <div className="flex items-center space-x-2" role="group" aria-label="Controles da janela">
          <div
            className="w-3 h-3 bg-red-500 rounded-full"
            role="button"
            aria-label="Fechar janela"
            tabIndex={0}
          ></div>
          <div
            className="w-3 h-3 bg-yellow-500 rounded-full"
            role="button"
            aria-label="Minimizar janela"
            tabIndex={0}
          ></div>
          <div
            className="w-3 h-3 bg-green-500 rounded-full"
            role="button"
            aria-label="Maximizar janela"
            tabIndex={0}
          ></div>
        </div>
      </div>

      <main
        className="terminal-content"
        role="main"
        aria-live="polite"
        aria-atomic="false"
      >
        {children}
      </main>
    </div>
  );
}

export default AccessibleTerminal;
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement SEO optimization and accessibility features with ARIA labels"
```

## 🚀 Mais Sugestões de Melhorias

### 8. Funcionalidades Avançadas

#### Sistema de Comentários
- Integração com Disqus ou sistema próprio
- Moderação de comentários
- Notificações por email

#### Blog Integrado
- Sistema de posts markdown
- Tags e categorias
- RSS feed
- Busca full-text

#### Portfolio Dinâmico
- Upload de imagens
- Galeria de screenshots
- Vídeos demonstrativos
- Links para repositórios

### 9. Integrações Externas

#### GitHub Integration
- Sincronização automática de repositórios
- Estatísticas de commits
- Linguagens mais usadas
- Contribuições em tempo real

#### LinkedIn API
- Experiências profissionais
- Recomendações
- Certificações

### 10. Gamificação

#### Sistema de Conquistas
- Badges por tecnologias
- Níveis de experiência
- Progresso visual
- Ranking de habilidades

#### Easter Eggs
- Comandos secretos no terminal
- Mini-games escondidos
- Referências a jogos clássicos

### 11. Performance Avançada

#### CDN e Otimizações
- Cloudflare ou AWS CloudFront
- Compressão de imagens automática
- Lazy loading de imagens
- Preload de recursos críticos

#### Database Optimization
- Índices otimizados
- Query optimization
- Connection pooling
- Read replicas

### 12. Monitoramento Avançado

#### Error Tracking
- Sentry para tracking de erros
- Alertas em tempo real
- Performance monitoring
- User session recording

#### Business Intelligence
- Dashboard de métricas
- Análise de comportamento
- A/B testing
- Conversion tracking

💾 **Commit Final:**

```bash
git add .
git commit -m "docs: add comprehensive improvement suggestions and clean architecture guidelines"
git tag -a v2.0.0 -m "Portfolio Terminal v2.0.0 - Complete with advanced features"
git push origin main --tags
```

## 🎯 Roadmap de Implementação

### Fase 1: Fundação (Semanas 1-2)
- ✅ Projeto base funcionando
- ✅ Docker configurado
- ✅ Clean Architecture implementada

### Fase 2: Autenticação (Semana 3)
- 🔄 GitHub OAuth
- 🔄 Sistema de usuários
- 🔄 Middleware de autenticação

### Fase 3: Admin Panel (Semana 4)
- 🔄 CRUD de projetos
- 🔄 Upload de imagens
- 🔄 Gerenciamento de skills

### Fase 4: Performance (Semana 5)
- 🔄 Cache Redis
- 🔄 Lazy loading
- 🔄 Service Worker

### Fase 5: Analytics (Semana 6)
- 🔄 Google Analytics
- 🔄 Sistema de logs
- 🔄 Monitoramento

### Fase 6: Testes (Semana 7)
- 🔄 Testes unitários
- 🔄 Testes de integração
- 🔄 E2E testing

### Fase 7: SEO/Acessibilidade (Semana 8)
- 🔄 Meta tags dinâmicas
- 🔄 ARIA labels
- 🔄 Schema.org markup

### Fase 8: Deploy (Semana 9)
- 🔄 CI/CD pipeline
- 🔄 Monitoramento em produção
- 🔄 Backup automatizado

## 🔄 CI/CD e Automação

### GitHub Actions Pipeline

**.github/workflows/ci-cd.yml:**

```yaml

name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      redis:
        image: redis:alpine
        ports:
          - 6379:6379

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install Backend Dependencies
      run: |
        cd backend
        npm ci

    - name: Install Frontend Dependencies
      run: |
        cd frontend
        npm ci

    - name: Run Backend Tests
      run: |
        cd backend
        npm run test:coverage
      env:
        NODE_ENV: test
        REDIS_HOST: localhost

    - name: Run Frontend Tests
      run: |
        cd frontend
        npm run test:coverage

    - name: Upload Coverage Reports
      uses: codecov/codecov-action@v3
      with:
        directory: ./coverage

    - name: Build Frontend
      run: |
        cd frontend
        npm run build

    - name: Run E2E Tests
      run: |
        cd frontend
        npm run test:e2e

  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Run Security Audit
      run: |
        cd backend && npm audit --audit-level high
        cd ../frontend && npm audit --audit-level high

    - name: Run SAST Scan
      uses: github/super-linter@v4
      env:
        DEFAULT_BRANCH: main
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  deploy:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Deploy to Production
      run: |
        echo "Deploying to production..."
        # Adicionar comandos de deploy aqui
```

💾 **Commit:**

```bash
git add .github/workflows/ci-cd.yml
git commit -m "feat: implement comprehensive CI/CD pipeline with testing and security checks"
```

## Dockerfile Multi-stage Otimizado

**backend/Dockerfile.prod:**

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine AS production

# Install security updates
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S portfolio -u 1001

WORKDIR /app

# Copy from builder stage
COPY --from=builder --chown=portfolio:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=portfolio:nodejs /app/package*.json ./
COPY --from=builder --chown=portfolio:nodejs /app/src ./src
COPY --from=builder --chown=portfolio:nodejs /app/knexfile.js ./

# Switch to non-root user
USER portfolio

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

EXPOSE 3002

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

💾 **Commit:**

```bash
git add backend/Dockerfile.prod
git commit -m "feat: add production-optimized Dockerfile with security best practices"
```

## 📊 Monitoramento e Observabilidade

### Prometheus + Grafana

**docker-compose.monitoring.yml:**

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'

volumes:
  prometheus_data:
  grafana_data:
```

**monitoring/prometheus.yml:**

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules/*.yml"

scrape_configs:
  - job_name: 'portfolio-backend'
    static_configs:
      - targets: ['backend:3002']
    metrics_path: '/api/metrics'
    scrape_interval: 5s

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

### Backend - Métricas Prometheus

```javascript
// Monitoramento já configurado no starter
// As dependências de monitoramento já estão incluídas
```

**src/infrastructure/monitoring/metrics.js:**

```javascript

const client = require('prom-client');

// Criar registry
const register = new client.Registry();

// Métricas padrão do sistema
client.collectDefaultMetrics({ register });

// Métricas customizadas
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const databaseQueryDuration = new client.Histogram({
  name: 'database_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['operation', 'table'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 3, 5]
});

// Registrar métricas
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestTotal);
register.registerMetric(activeConnections);
register.registerMetric(databaseQueryDuration);

// Middleware para coletar métricas HTTP
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;

    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);

    httpRequestTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });

  next();
};

// Função para métricas de banco de dados
const recordDatabaseQuery = (operation, table, duration) => {
  databaseQueryDuration
    .labels(operation, table)
    .observe(duration);
};

module.exports = {
  register,
  metricsMiddleware,
  recordDatabaseQuery,
  activeConnections
};
```

**src/infrastructure/web/routes/metrics.js:**

```javascript
const express = require('express');
const { register } = require('../../monitoring/metrics');
const router = express.Router();

// Endpoint de métricas para Prometheus
router.get('/', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (error) {
    res.status(500).end(error.message);
  }
});

module.exports = router;
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement Prometheus monitoring with custom metrics and Grafana dashboards"
```

### Error Tracking com Sentry

```javascript
// Error tracking já configurado no starter
// As dependências do Sentry já estão incluídas para backend e frontend
```

**backend/src/infrastructure/monitoring/sentry.js:**

```javascript

const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');

class SentryService {
  constructor() {
    this.init();
  }

  init() {
    if (!process.env.SENTRY_DSN) {
      console.warn('Sentry DSN não configurado');
      return;
    }

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      integrations: [
        new ProfilingIntegration(),
      ],
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      beforeSend(event) {
        // Filtrar informações sensíveis
        if (event.request) {
          delete event.request.cookies;
          delete event.request.headers?.authorization;
        }
        return event;
      }
    });
  }

  captureException(error, context = {}) {
    Sentry.withScope((scope) => {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
      Sentry.captureException(error);
    });
  }

  captureMessage(message, level = 'info', context = {}) {
    Sentry.withScope((scope) => {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
      Sentry.captureMessage(message, level);
    });
  }

  setUser(user) {
    Sentry.setUser({
      id: user.id,
      username: user.username,
      email: user.email
    });
  }

  // Middleware para Express
  requestHandler() {
    return Sentry.Handlers.requestHandler();
  }

  errorHandler() {
    return Sentry.Handlers.errorHandler();
  }
}

module.exports = new SentryService();
```

**frontend/src/services/monitoring.js:**

```javascript
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

class MonitoringService {
  constructor() {
    this.init();
  }

  init() {
    if (!import.meta.env.VITE_SENTRY_DSN) {
      console.warn('Sentry DSN não configurado');
      return;
    }

    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [
        new BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV6Instrumentation(
            React.useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes
          ),
        }),
      ],
      tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
      beforeSend(event) {
        // Filtrar informações sensíveis
        if (event.request?.url?.includes('token=')) {
          event.request.url = event.request.url.replace(/token=[^&]+/, 'token=***');
        }
        return event;
      }
    });
  }

  captureException(error, context = {}) {
    Sentry.withScope((scope) => {
      Object.keys(context).forEach(key => {
        scope.setTag(key, context[key]);
      });
      Sentry.captureException(error);
    });
  }

  setUser(user) {
    Sentry.setUser({
      id: user.id,
      username: user.username,
      email: user.email
    });
  }

  addBreadcrumb(message, category = 'custom', level = 'info') {
    Sentry.addBreadcrumb({
      message,
      category,
      level
    });
  }
}

export default new MonitoringService();
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement error tracking and performance monitoring with Sentry"
```

## 🔒 Segurança Avançada

### Rate Limiting Inteligente

```bash
cd backend
npm install express-rate-limit express-slow-down redis-rate-limit
```

**src/infrastructure/security/rateLimiter.js:**

```javascript

const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

// Rate limiter geral
const generalLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:general:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: 'Muitas requisições. Tente novamente em 15 minutos.',
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter para autenticação
const authLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:auth:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 5, // máximo 5 tentativas de login
  message: {
    error: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    retryAfter: 900
  },
  skipSuccessfulRequests: true
});

// Slow down para requests pesados
const heavyRequestSlowDown = slowDown({
  store: new RedisStore({
    client: redis,
    prefix: 'sd:heavy:'
  }),
  windowMs: 15 * 60 * 1000,
  delayAfter: 2,
  delayMs: 500,
  maxDelayMs: 20000
});

// Rate limiter por usuário autenticado
const createUserLimiter = (maxRequests = 50) => {
  return rateLimit({
    store: new RedisStore({
      client: redis,
      prefix: 'rl:user:'
    }),
    windowMs: 15 * 60 * 1000,
    max: maxRequests,
    keyGenerator: (req) => {
      return req.user?.id || req.ip;
    },
    message: {
      error: 'Limite de requisições por usuário excedido.',
      retryAfter: 900
    }
  });
};

module.exports = {
  generalLimiter,
  authLimiter,
  heavyRequestSlowDown,
  createUserLimiter
};
```

### Validação e Sanitização

```bash
npm install joi express-validator helmet express-mongo-sanitize xss-clean
```

**src/infrastructure/security/validation.js:**

```javascript

const Joi = require('joi');
const { body, param, query, validationResult } = require('express-validator');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// Schemas Joi para validação
const schemas = {
  project: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    category: Joi.string().valid('web', 'mobile', 'desktop', 'api').required(),
    technologies: Joi.array().items(Joi.string()).min(1).required(),
    github_url: Joi.string().uri().optional(),
    demo_url: Joi.string().uri().optional(),
    image_url: Joi.string().uri().optional(),
    featured: Joi.boolean().default(false)
  }),

  skill: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().valid('frontend', 'backend', 'database', 'devops', 'other').required(),
    level: Joi.number().integer().min(1).max(5).required(),
    icon: Joi.string().max(50).optional()
  }),

  contact: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(5).max(200).required(),
    message: Joi.string().min(10).max(2000).required()
  })
};

// Middleware de validação
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: 'Dados inválidos',
        details: errors
      });
    }

    req.body = value;
    next();
  };
};

// Middleware de sanitização
const sanitize = () => {
  return [
    mongoSanitize(),
    xss()
  ];
};

// Validadores Express Validator
const validators = {
  projectId: param('id').isInt({ min: 1 }).withMessage('ID deve ser um número inteiro positivo'),
  pagination: [
    query('page').optional().isInt({ min: 1 }).withMessage('Página deve ser um número positivo'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite deve estar entre 1 e 100')
  ]
};

// Middleware para verificar erros de validação
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};

module.exports = {
  schemas,
  validate,
  sanitize,
  validators,
  checkValidation
};
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement advanced security with rate limiting and input validation"
```

## 🧪 Testes Avançados

### Testes E2E com Playwright

```bash
cd frontend
npm install --save-dev @playwright/test
npx playwright install
```

**tests/e2e/portfolio.spec.js:**

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Portfolio Terminal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display terminal interface', async ({ page }) => {
    // Verificar se o terminal carregou
    await expect(page.locator('.terminal-window')).toBeVisible();

    // Verificar prompt inicial
    await expect(page.locator('text=$ whoami')).toBeVisible();

    // Verificar se as seções estão disponíveis
    await expect(page.locator('text=projects')).toBeVisible();
    await expect(page.locator('text=skills')).toBeVisible();
    await expect(page.locator('text=contact')).toBeVisible();
  });

  test('should navigate to projects section', async ({ page }) => {
    // Clicar na seção de projetos
    await page.click('text=projects');

    // Verificar se navegou para projetos
    await expect(page.locator('text=$ ls -la /projects/')).toBeVisible();

    // Aguardar carregamento dos projetos
    await page.waitForSelector('[data-testid="project-item"]', { timeout: 5000 });

    // Verificar se pelo menos um projeto foi carregado
    const projects = await page.locator('[data-testid="project-item"]').count();
    expect(projects).toBeGreaterThan(0);
  });

  test('should display project details on click', async ({ page }) => {
    // Navegar para projetos
    await page.click('text=projects');
    await page.waitForSelector('[data-testid="project-item"]');

    // Clicar no primeiro projeto
    await page.click('[data-testid="project-item"]:first-child');

    // Verificar se o modal de detalhes abriu
    await expect(page.locator('[data-testid="project-modal"]')).toBeVisible();

    // Verificar elementos do modal
    await expect(page.locator('[data-testid="project-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="project-description"]')).toBeVisible();
    await expect(page.locator('[data-testid="project-technologies"]')).toBeVisible();
  });

  test('should handle contact form submission', async ({ page }) => {
    // Navegar para contato
    await page.click('text=contact');

    // Preencher formulário
    await page.fill('[data-testid="contact-name"]', 'João Silva');
    await page.fill('[data-testid="contact-email"]', 'joao@example.com');
    await page.fill('[data-testid="contact-subject"]', 'Teste E2E');
    await page.fill('[data-testid="contact-message"]', 'Esta é uma mensagem de teste automatizado.');

    // Submeter formulário
    await page.click('[data-testid="contact-submit"]');

    // Verificar mensagem de sucesso
    await expect(page.locator('text=Mensagem enviada com sucesso!')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Definir viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar se o layout se adapta
    await expect(page.locator('.terminal-window')).toBeVisible();

    // Verificar se a navegação mobile funciona
    const menuButton = page.locator('[data-testid="mobile-menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Testar navegação por teclado
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Verificar se a navegação por teclado funciona
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('should load performance metrics', async ({ page }) => {
    // Medir performance
    const startTime = Date.now();

    await page.goto('http://localhost:3000');
    await page.waitForSelector('.terminal-window');

    const loadTime = Date.now() - startTime;

    // Verificar se carregou em menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);

    // Verificar Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries);
        }).observe({ entryTypes: ['navigation', 'paint'] });
      });
    });

    expect(metrics).toBeDefined();
  });
});
```

**playwright.config.js:**

```javascript
module.exports = {
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
};
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement comprehensive E2E testing with Playwright across multiple browsers"
```

### Testes de Carga com Artillery

```bash
npm install --save-dev artillery
```

**tests/load/api-load-test.yml:**

```yaml

config:
  target: 'http://localhost:3002'
  phases:
    - duration: 60
      arrivalRate: 5
      name: "Warm up"
    - duration: 120
      arrivalRate: 10
      name: "Ramp up load"
    - duration: 300
      arrivalRate: 20
      name: "Sustained load"
  payload:
    path: "./test-data.csv"
    fields:
      - "name"
      - "email"
      - "message"

scenarios:
  - name: "API Health Check"
    weight: 20
    flow:
      - get:
          url: "/api/health"
          expect:
            - statusCode: 200
            - hasProperty: "status"

  - name: "Get Projects"
    weight: 40
    flow:
      - get:
          url: "/api/projects"
          expect:
            - statusCode: 200
            - contentType: json
      - think: 2

  - name: "Get Skills"
    weight: 30
    flow:
      - get:
          url: "/api/skills"
          expect:
            - statusCode: 200

  - name: "Contact Form"
    weight: 10
    flow:
      - post:
          url: "/api/contact"
          json:
            name: "{{ name }}"
            email: "{{ email }}"
            subject: "Load Test Message"
            message: "{{ message }}"
          expect:
            - statusCode: 200
      - think: 5
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: add load testing configuration with Artillery for performance validation"
```

## 🚀 Deploy e Produção

### Docker Swarm para Alta Disponibilidade

**docker-stack.yml:**

```yaml

version: '3.8'

services:
  backend:
    image: portfolio-backend:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    environment:
      - NODE_ENV=production
      - DATABASE_URL=sqlite:///data/portfolio.db
      - REDIS_URL=redis://redis:6379
    volumes:
      - portfolio_data:/data
    networks:
      - portfolio_network
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  frontend:
    image: portfolio-frontend:latest
    deploy:
      replicas: 2
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
    networks:
      - portfolio_network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    deploy:
      replicas: 2
      placement:
        constraints:
          - node.role == manager
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    networks:
      - portfolio_network
    depends_on:
      - backend
      - frontend

  redis:
    image: redis:alpine
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
    volumes:
      - redis_data:/data
    networks:
      - portfolio_network
    command: redis-server --appendonly yes

  prometheus:
    image: prom/prometheus:latest
    deploy:
      replicas: 1
      placement:
        constraints:
          - node.role == manager
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    networks:
      - portfolio_network
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

volumes:
  portfolio_data:
  redis_data:
  prometheus_data:

networks:
  portfolio_network:
    driver: overlay
    attachable: true
```

### Nginx com SSL e Load Balancing

**nginx/nginx.conf:**

```nginx
events {
    worker_connections 1024;
}

http {
    upstream backend {
        least_conn;
        server backend:3002 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    upstream frontend {
        least_conn;
        server frontend:80 max_fails=3 fail_timeout=30s;
        keepalive 32;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=static:10m rate=30r/s;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self'; object-src 'none'; child-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';";

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name _;
        return 301 https://$host$request_uri;
    }

    # Main server block
    server {
        listen 443 ssl http2;
        server_name _;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;

        # API routes
        location /api/ {
            limit_req zone=api burst=20 nodelay;

            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;

            # Timeouts
            proxy_connect_timeout 5s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Static files with caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            limit_req zone=static burst=50 nodelay;

            proxy_pass http://frontend;
            proxy_cache_valid 200 1d;
            expires 1d;
            add_header Cache-Control "public, immutable";
        }

        # Frontend routes
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;

            # Handle client-side routing
            try_files $uri $uri/ /index.html;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement production deployment with Docker Swarm and Nginx load balancing"
```

## 📈 Otimizações Finais

### Database Optimization

**backend/src/infrastructure/database/optimizations.js:**

```javascript

const knex = require('knex');

class DatabaseOptimizer {
  constructor(db) {
    this.db = db;
  }

  // Criar índices otimizados
  async createIndexes() {
    const queries = [
      // Índices para projetos
      'CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category)',
      'CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured)',
      'CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC)',

      // Índices para skills
      'CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category)',
      'CREATE INDEX IF NOT EXISTS idx_skills_level ON skills(level DESC)',

      // Índices compostos
      'CREATE INDEX IF NOT EXISTS idx_projects_category_featured ON projects(category, featured)',
      'CREATE INDEX IF NOT EXISTS idx_skills_category_level ON skills(category, level DESC)'
    ];

    for (const query of queries) {
      try {
        await this.db.raw(query);
        console.log(`✅ Índice criado: ${query}`);
      } catch (error) {
        console.error(`❌ Erro ao criar índice: ${error.message}`);
      }
    }
  }

  // Analisar performance das queries
  async analyzeQueries() {
    const slowQueries = await this.db.raw(`
      SELECT sql, COUNT(*) as count
      FROM sqlite_master
      WHERE type = 'table'
    `);

    console.log('📊 Análise de queries:', slowQueries);
  }

  // Otimizar configurações do SQLite
  async optimizeSettings() {
    const optimizations = [
      'PRAGMA journal_mode = WAL',
      'PRAGMA synchronous = NORMAL',
      'PRAGMA cache_size = 10000',
      'PRAGMA temp_store = MEMORY',
      'PRAGMA mmap_size = 268435456' // 256MB
    ];

    for (const pragma of optimizations) {
      try {
        await this.db.raw(pragma);
        console.log(`✅ Otimização aplicada: ${pragma}`);
      } catch (error) {
        console.error(`❌ Erro na otimização: ${error.message}`);
      }
    }
  }

  // Connection pooling otimizado
  static getOptimizedConfig() {
    return {
      client: 'sqlite3',
      connection: {
        filename: process.env.DATABASE_PATH || './portfolio.db'
      },
      useNullAsDefault: true,
      pool: {
        min: 2,
        max: 10,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100
      },
      migrations: {
        directory: './src/migrations'
      },
      seeds: {
        directory: './src/seeds'
      }
    };
  }
}

module.exports = DatabaseOptimizer;
```

### Frontend Performance

**frontend/vite.config.js:**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
          utils: ['axios']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 3000,
    host: true
  }
});
```

💾 **Commit Final:**

```bash
git add .
git commit -m "feat: implement comprehensive performance optimizations and production configurations"
git tag -a v3.0.0 -m "Portfolio Terminal v3.0.0 - Production Ready with Advanced Features"
git push origin main --tags
```

## 🎨 Funcionalidades Avançadas e Inovadoras

### Sistema de Temas Dinâmicos

**frontend/src/contexts/ThemeContext.jsx:**

```javascript

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  terminal: {
    name: 'Terminal Clássico',
    colors: {
      primary: '#00ff00',
      secondary: '#ffffff',
      background: '#000000',
      surface: '#1a1a1a',
      accent: '#ffff00'
    },
    font: 'JetBrains Mono'
  },
  cyberpunk: {
    name: 'Cyberpunk 2077',
    colors: {
      primary: '#ff0080',
      secondary: '#00ffff',
      background: '#0a0a0a',
      surface: '#1a0a1a',
      accent: '#ffff00'
    },
    font: 'Orbitron'
  },
  matrix: {
    name: 'Matrix',
    colors: {
      primary: '#00ff41',
      secondary: '#008f11',
      background: '#000000',
      surface: '#001100',
      accent: '#ffffff'
    },
    font: 'Courier New'
  },
  retro: {
    name: 'Retro Wave',
    colors: {
      primary: '#ff6b9d',
      secondary: '#c44569',
      background: '#2d1b69',
      surface: '#3c2a6b',
      accent: '#f8b500'
    },
    font: 'VT323'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('terminal');
  const [customThemes, setCustomThemes] = useState({});

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }

    const savedCustomThemes = localStorage.getItem('portfolio-custom-themes');
    if (savedCustomThemes) {
      setCustomThemes(JSON.parse(savedCustomThemes));
    }
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('portfolio-theme', themeName);

    // Aplicar CSS custom properties
    const theme = themes[themeName] || customThemes[themeName];
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value);
      });
      document.documentElement.style.setProperty('--font-mono', theme.font);
    }
  };

  const createCustomTheme = (name, themeData) => {
    const newCustomThemes = {
      ...customThemes,
      [name]: themeData
    };
    setCustomThemes(newCustomThemes);
    localStorage.setItem('portfolio-custom-themes', JSON.stringify(newCustomThemes));
  };

  const value = {
    currentTheme,
    themes: { ...themes, ...customThemes },
    changeTheme,
    createCustomTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Sistema de Conquistas (Gamificação)

**frontend/src/hooks/useAchievements.js:**

```javascript
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const achievements = {
  explorer: {
    id: 'explorer',
    name: 'Explorador',
    description: 'Visitou todas as seções do portfólio',
    icon: '🗺️',
    condition: (stats) => stats.sectionsVisited >= 4
  },
  speedster: {
    id: 'speedster',
    name: 'Velocista',
    description: 'Navegou pelo site em menos de 30 segundos',
    icon: '⚡',
    condition: (stats) => stats.totalTime < 30000
  },
  curious: {
    id: 'curious',
    name: 'Curioso',
    description: 'Clicou em mais de 10 projetos',
    icon: '🔍',
    condition: (stats) => stats.projectsViewed >= 10
  },
  social: {
    id: 'social',
    name: 'Social',
    description: 'Enviou uma mensagem de contato',
    icon: '💬',
    condition: (stats) => stats.messagesSent >= 1
  },
  hacker: {
    id: 'hacker',
    name: 'Hacker',
    description: 'Encontrou o easter egg secreto',
    icon: '👨‍💻',
    condition: (stats) => stats.easterEggFound
  },
  persistent: {
    id: 'persistent',
    name: 'Persistente',
    description: 'Passou mais de 5 minutos no site',
    icon: '⏰',
    condition: (stats) => stats.totalTime > 300000
  }
};

export const useAchievements = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [stats, setStats] = useState({
    sectionsVisited: 0,
    totalTime: 0,
    projectsViewed: 0,
    messagesSent: 0,
    easterEggFound: false,
    visitedSections: new Set()
  });

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-achievements');
    if (saved) {
      setUnlockedAchievements(JSON.parse(saved));
    }

    const savedStats = localStorage.getItem('portfolio-stats');
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      setStats({
        ...parsedStats,
        visitedSections: new Set(parsedStats.visitedSections)
      });
    }

    // Timer para tempo total
    const startTime = Date.now();
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalTime: prev.totalTime + (Date.now() - startTime)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkAchievements = (newStats) => {
    Object.values(achievements).forEach(achievement => {
      if (!unlockedAchievements.includes(achievement.id) &&
          achievement.condition(newStats)) {
        unlockAchievement(achievement);
      }
    });
  };

  const unlockAchievement = (achievement) => {
    const newUnlocked = [...unlockedAchievements, achievement.id];
    setUnlockedAchievements(newUnlocked);
    localStorage.setItem('portfolio-achievements', JSON.stringify(newUnlocked));

    toast.success(
      `🏆 Conquista desbloqueada: ${achievement.name}!`,
      {
        duration: 4000,
        icon: achievement.icon
      }
    );
  };

  const updateStats = (updates) => {
    const newStats = { ...stats, ...updates };
    setStats(newStats);
    localStorage.setItem('portfolio-stats', JSON.stringify({
      ...newStats,
      visitedSections: Array.from(newStats.visitedSections)
    }));
    checkAchievements(newStats);
  };

  const visitSection = (sectionName) => {
    const newVisitedSections = new Set(stats.visitedSections);
    newVisitedSections.add(sectionName);
    updateStats({
      visitedSections: newVisitedSections,
      sectionsVisited: newVisitedSections.size
    });
  };

  return {
    achievements,
    unlockedAchievements,
    stats,
    updateStats,
    visitSection
  };
};
```

### Sistema de Comandos Avançados

**frontend/src/hooks/useTerminalCommands.js:**

```javascript
import { useState, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAchievements } from './useAchievements';

export const useTerminalCommands = () => {
  const { changeTheme, themes } = useTheme();
  const { updateStats } = useAchievements();
  const [history, setHistory] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState('/');

  const commands = {
    help: {
      description: 'Mostra todos os comandos disponíveis',
      execute: () => {
        const commandList = Object.entries(commands)
          .map(([cmd, info]) => `${cmd.padEnd(15)} - ${info.description}`)
          .join('\n');
        return `Comandos disponíveis:\n${commandList}`;
      }
    },

    clear: {
      description: 'Limpa o terminal',
      execute: () => {
        setHistory([]);
        return '';
      }
    },

    theme: {
      description: 'Muda o tema (theme list | theme <nome>)',
      execute: (args) => {
        if (args[0] === 'list') {
          return `Temas disponíveis:\n${Object.keys(themes).join('\n')}`;
        }
        if (args[0] && themes[args[0]]) {
          changeTheme(args[0]);
          return `Tema alterado para: ${themes[args[0]].name}`;
        }
        return 'Uso: theme list | theme <nome>';
      }
    },

    whoami: {
      description: 'Mostra informações sobre o desenvolvedor',
      execute: () => {
        return `Desenvolvedor Full Stack\nEspecialista em React, Node.js e DevOps\nApaixonado por tecnologia e inovação`;
      }
    },

    ls: {
      description: 'Lista arquivos e diretórios',
      execute: (args) => {
        const directories = {
          '/': ['projects/', 'skills/', 'about/', 'contact/', 'achievements/'],
          '/projects': ['web-apps/', 'mobile-apps/', 'apis/', 'open-source/'],
          '/skills': ['frontend/', 'backend/', 'devops/', 'databases/'],
          '/about': ['experience.txt', 'education.txt', 'certifications.txt'],
          '/contact': ['email.txt', 'linkedin.txt', 'github.txt']
        };

        const path = args[0] || currentDirectory;
        const items = directories[path] || ['Diretório não encontrado'];
        return items.join('\n');
      }
    },

    cd: {
      description: 'Navega entre diretórios',
      execute: (args) => {
        if (!args[0]) return 'Uso: cd <diretório>';

        const validPaths = ['/', '/projects', '/skills', '/about', '/contact', '/achievements'];
        const newPath = args[0] === '..' ? '/' : args[0];

        if (validPaths.includes(newPath)) {
          setCurrentDirectory(newPath);
          return `Navegado para: ${newPath}`;
        }
        return 'Diretório não encontrado';
      }
    },

    cat: {
      description: 'Mostra o conteúdo de um arquivo',
      execute: (args) => {
        const files = {
          'experience.txt': 'Experiência profissional em desenvolvimento web...\n5+ anos trabalhando com tecnologias modernas',
          'education.txt': 'Formação acadêmica e cursos relevantes...\nBacharelado em Ciência da Computação',
          'email.txt': 'contato@meuportfolio.com',
          'linkedin.txt': 'https://linkedin.com/in/meuportfolio',
          'github.txt': 'https://github.com/meuportfolio'
        };

        const filename = args[0];
        return files[filename] || 'Arquivo não encontrado';
      }
    },

    matrix: {
      description: 'Easter egg - Efeito Matrix',
      execute: () => {
        updateStats({ easterEggFound: true });
        // Trigger matrix effect
        document.body.classList.add('matrix-effect');
        setTimeout(() => {
          document.body.classList.remove('matrix-effect');
        }, 5000);
        return 'Bem-vindo à Matrix... 🕶️';
      }
    },

    stats: {
      description: 'Mostra estatísticas de uso',
      execute: () => {
        const { stats } = useAchievements();
        return `Estatísticas:\nSeções visitadas: ${stats.sectionsVisited}\nProjetos visualizados: ${stats.projectsViewed}\nTempo total: ${Math.floor(stats.totalTime / 1000)}s`;
      }
    },

    achievements: {
      description: 'Mostra conquistas desbloqueadas',
      execute: () => {
        const { achievements, unlockedAchievements } = useAchievements();
        const unlocked = unlockedAchievements.map(id =>
          `${achievements[id].icon} ${achievements[id].name}`
        ).join('\n');
        return unlocked || 'Nenhuma conquista desbloqueada ainda';
      }
    },

    weather: {
      description: 'Mostra o clima atual (simulado)',
      execute: async () => {
        // Simular API call
        const weather = ['☀️ Ensolarado', '🌧️ Chuvoso', '⛅ Nublado', '❄️ Nevando'];
        const random = weather[Math.floor(Math.random() * weather.length)];
        return `Clima atual: ${random}\nTemperatura: ${Math.floor(Math.random() * 30 + 10)}°C`;
      }
    },

    joke: {
      description: 'Conta uma piada de programador',
      execute: () => {
        const jokes = [
          'Por que os programadores preferem o modo escuro?\nPorque a luz atrai bugs! 🐛',
          'Como você chama um programador de 8 bits?\nUm byte-sized developer! 💾',
          'Por que os programadores odeiam a natureza?\nMuitos bugs! 🦟'
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      }
    }
  };

  const executeCommand = useCallback(async (input) => {
    const [command, ...args] = input.trim().split(' ');
    const cmd = commands[command.toLowerCase()];

    if (!cmd) {
      return `Comando não encontrado: ${command}\nDigite 'help' para ver os comandos disponíveis.`;
    }

    try {
      const result = await cmd.execute(args);
      setHistory(prev => [...prev, { input, output: result }]);
      return result;
    } catch (error) {
      const errorMsg = `Erro ao executar comando: ${error.message}`;
      setHistory(prev => [...prev, { input, output: errorMsg }]);
      return errorMsg;
    }
  }, [commands, changeTheme, themes, updateStats]);

  return {
    executeCommand,
    history,
    currentDirectory,
    commands: Object.keys(commands)
  };
};
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement advanced features - dynamic themes, achievements system, and enhanced terminal commands"
```

## 🧠 Inteligência Artificial Integrada

### Chatbot Assistente

```bash
cd frontend
npm install openai
```

**frontend/src/components/AIAssistant.jsx:**

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou o assistente virtual do portfólio. Como posso ajudá-lo?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'projetos': 'Posso te mostrar os projetos mais interessantes! Temos aplicações web, mobile e APIs. Qual tipo te interessa mais?',
    'skills': 'As principais habilidades incluem React, Node.js, Python, Docker e AWS. Quer saber mais sobre alguma específica?',
    'contato': 'Você pode entrar em contato através do formulário na seção de contato ou pelos links das redes sociais.',
    'experiência': 'Tenho mais de 5 anos de experiência em desenvolvimento full-stack, trabalhando com startups e empresas de tecnologia.',
    'tecnologias': 'Trabalho principalmente com JavaScript/TypeScript, React, Node.js, Python, Docker, AWS e bancos de dados SQL/NoSQL.',
    'github': 'Você pode encontrar meus projetos open-source no GitHub. Tem alguns projetos bem interessantes lá!',
    'linkedin': 'Meu perfil no LinkedIn tem mais detalhes sobre minha experiência profissional e certificações.'
  };

  const getAIResponse = async (userMessage) => {
    // Simular resposta da IA
    const lowerMessage = userMessage.toLowerCase();

    // Buscar resposta predefinida
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Resposta padrão inteligente
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi')) {
      return 'Olá! Bem-vindo ao meu portfólio. O que gostaria de saber?';
    }

    if (lowerMessage.includes('obrigado')) {
      return 'De nada! Fico feliz em ajudar. Há mais alguma coisa que gostaria de saber?';
    }

    // Resposta genérica
    return 'Interessante pergunta! Para informações mais específicas, recomendo explorar as seções do portfólio ou entrar em contato diretamente.';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular delay da IA
    setTimeout(async () => {
      const aiResponse = await getAIResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { scale: 0 } : { scale: 1 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-gray-900 border border-green-500 rounded-lg shadow-2xl z-50 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">Assistente IA</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-green-600 p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-800 text-white p-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
```

### Sistema de Recomendações Inteligentes

**frontend/src/hooks/useRecommendations.js:**

```javascript
import { useState, useEffect } from 'react';
import { useAchievements } from './useAchievements';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { stats } = useAchievements();

  const generateRecommendations = () => {
    const recs = [];

    // Baseado no comportamento do usuário
    if (stats.projectsViewed > 5) {
      recs.push({
        type: 'project',
        title: 'Projetos Similares',
        description: 'Baseado no seu interesse, você pode gostar destes projetos',
        action: 'Ver mais projetos',
        priority: 'high'
      });
    }

    if (stats.sectionsVisited >= 3 && stats.messagesSent === 0) {
      recs.push({
        type: 'contact',
        title: 'Entre em Contato',
        description: 'Que tal discutirmos uma oportunidade de colaboração?',
        action: 'Enviar mensagem',
        priority: 'medium'
      });
    }

    if (stats.totalTime > 120000) { // 2 minutos
      recs.push({
        type: 'social',
        title: 'Conecte-se',
        description: 'Siga-me nas redes sociais para mais conteúdo',
        action: 'Ver redes sociais',
        priority: 'low'
      });
    }

    // Recomendações baseadas em tempo
    const hour = new Date().getHours();
    if (hour >= 9 && hour <= 17) {
      recs.push({
        type: 'professional',
        title: 'Horário Comercial',
        description: 'Estou disponível para conversas profissionais agora',
        action: 'Agendar reunião',
        priority: 'high'
      });
    }

    return recs.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  useEffect(() => {
    const newRecs = generateRecommendations();
    setRecommendations(newRecs);
  }, [stats]);

  return { recommendations };
};
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement AI assistant chatbot and intelligent recommendation system"
```

## 🎯 Clean Code e Clean Architecture Avançados

### Domain-Driven Design (DDD)

**backend/src/domain/entities/Project.js:**

```javascript
// Versão ES6+ Moderna (2025)
export class Project {
  constructor({
    id,
    title,
    description,
    category,
    technologies,
    githubUrl,
    demoUrl,
    imageUrl,
    featured = false,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.validateTitle(title);
    this.validateDescription(description);
    this.validateCategory(category);
    this.validateTechnologies(technologies);

    this.#assignProperties({
      id, title, description, category, technologies,
      githubUrl, demoUrl, imageUrl, featured, createdAt, updatedAt
    });
  }

  // Propriedades privadas (ES2022)
  #assignProperties(props) {
    Object.assign(this, props);
  }

  validateTitle(title) {
    if (!title?.trim() || title.trim().length < 3) {
      throw new Error('Título deve ter pelo menos 3 caracteres');
    }
    if (title.length > 100) {
      throw new Error('Título não pode exceder 100 caracteres');
    }
  }

  validateDescription(description) {
    if (!description?.trim() || description.trim().length < 10) {
      throw new Error('Descrição deve ter pelo menos 10 caracteres');
    }
    if (description.length > 1000) {
      throw new Error('Descrição não pode exceder 1000 caracteres');
    }
  }

  validateCategory(category) {
    const validCategories = ['web', 'mobile', 'desktop', 'api', 'other'];
    if (!validCategories.includes(category)) {
      throw new Error(`Categoria deve ser uma das: ${validCategories.join(', ')}`);
    }
  }

  validateTechnologies(technologies) {
    if (!Array.isArray(technologies) || technologies.length === 0) {
      throw new Error('Deve haver pelo menos uma tecnologia');
    }
    if (technologies.length > 20) {
      throw new Error('Máximo de 20 tecnologias permitidas');
    }
  }

  update(data) {
    return new Project({
      ...this,
      ...data,
      id: this.id, // ID não pode ser alterado
      createdAt: this.createdAt, // Data de criação não pode ser alterada
      updatedAt: new Date()
    });
  }

  markAsFeatured() {
    return this.update({ featured: true });
  }

  unmarkAsFeatured() {
    return this.update({ featured: false });
  }

  addTechnology(technology) {
    if (this.technologies.includes(technology)) {
      throw new Error('Tecnologia já existe no projeto');
    }

    return this.update({
      technologies: [...this.technologies, technology]
    });
  }

  removeTechnology(technology) {
    const newTechnologies = this.technologies.filter(tech => tech !== technology);
    if (newTechnologies.length === 0) {
      throw new Error('Projeto deve ter pelo menos uma tecnologia');
    }

    return this.update({ technologies: newTechnologies });
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      technologies: this.technologies,
      githubUrl: this.githubUrl,
      demoUrl: this.demoUrl,
      imageUrl: this.imageUrl,
      featured: this.featured,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data) {
    return new Project(data);
  }
}

// Para compatibilidade com CommonJS (se necessário)
// module.exports = { Project };

// Exportação padrão moderna
export default Project;
```

### Repository Pattern

**backend/src/domain/repositories/ProjectRepository.js:**

```javascript
// Versão ES6+ Moderna (2025) - Interface/Abstract Class
export abstract class ProjectRepository {
  async findAll(filters = {}) {
    throw new Error('Method findAll must be implemented');
  }

  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  async findByCategory(category) {
    throw new Error('Method findByCategory must be implemented');
  }

  async findFeatured() {
    throw new Error('Method findFeatured must be implemented');
  }

  async create(project) {
    throw new Error('Method create must be implemented');
  }

  async update(id, project) {
    throw new Error('Method update must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete must be implemented');
  }

  async exists(id) {
    throw new Error('Method exists must be implemented');
  }

  async count(filters = {}) {
    throw new Error('Method count must be implemented');
  }
}

// Alternativa usando TypeScript-style interface (para projetos TS)
/*
export interface IProjectRepository {
  findAll(filters?: Record<string, any>): Promise<Project[]>;
  findById(id: string | number): Promise<Project | null>;
  findByCategory(category: string): Promise<Project[]>;
  findFeatured(): Promise<Project[]>;
  create(project: Project): Promise<Project>;
  update(id: string | number, project: Project): Promise<Project | null>;
  delete(id: string | number): Promise<boolean>;
  exists(id: string | number): Promise<boolean>;
  count(filters?: Record<string, any>): Promise<number>;
}
*/

export default ProjectRepository;
```

**backend/src/infrastructure/repositories/SqliteProjectRepository.js:**

```javascript
// Versão ES6+ Moderna (2025)
import { ProjectRepository } from '../../domain/repositories/ProjectRepository.js';
import { Project } from '../../domain/entities/Project.js';

export class SqliteProjectRepository extends ProjectRepository {
  #db; // Propriedade privada

  constructor(database) {
    super();
    this.#db = database;
  }

  async findAll(filters = {}) {
    let query = this.#db('projects');

    // Usando optional chaining e nullish coalescing
    if (filters?.category) {
      query = query.where('category', filters.category);
    }

    if (filters?.featured !== undefined) {
      query = query.where('featured', filters.featured);
    }

    if (filters?.technologies) {
      // Busca por tecnologias (JSON contains)
      query = query.whereRaw('json_extract(technologies, "$") LIKE ?', [`%${filters.technologies}%`]);
    }

    // Usando destructuring com defaults
    const { limit, offset } = filters;
    if (limit) query = query.limit(limit);
    if (offset) query = query.offset(offset);

    const rows = await query.orderBy('created_at', 'desc');
    return rows.map(row => this.#mapRowToEntity(row));
  }

  async findById(id) {
    const row = await this.#db('projects').where('id', id).first();
    return row ? this.#mapRowToEntity(row) : null;
  }

  async findByCategory(category) {
    const rows = await this.#db('projects')
      .where('category', category)
      .orderBy('created_at', 'desc');
    return rows.map(row => this.#mapRowToEntity(row));
  }

  async findFeatured() {
    const rows = await this.#db('projects')
      .where('featured', true)
      .orderBy('created_at', 'desc');
    return rows.map(row => this.#mapRowToEntity(row));
  }

  async create(project) {
    const data = this.#mapEntityToRow(project);
    const [id] = await this.#db('projects').insert(data);
    return this.findById(id);
  }

  async update(id, project) {
    const data = this.#mapEntityToRow(project);
    data.updated_at = new Date();

    await this.#db('projects').where('id', id).update(data);
    return this.findById(id);
  }

  async delete(id) {
    const deletedCount = await this.#db('projects').where('id', id).del();
    return deletedCount > 0;
  }

  async exists(id) {
    const { count } = await this.#db('projects')
      .where('id', id)
      .count('id as count')
      .first() ?? { count: 0 };
    return count > 0;
  }

  async count(filters = {}) {
    let query = this.#db('projects');

    if (filters?.category) {
      query = query.where('category', filters.category);
    }

    if (filters?.featured !== undefined) {
      query = query.where('featured', filters.featured);
    }

    const { count } = await query.count('id as count').first() ?? { count: 0 };
    return count;
  }

  // Métodos privados usando # (ES2022)
  #mapRowToEntity(row) {
    return new Project({
      id: row.id,
      title: row.title,
      description: row.description,
      category: row.category,
      technologies: JSON.parse(row.technologies ?? '[]'),
      githubUrl: row.github_url,
      demoUrl: row.demo_url,
      imageUrl: row.image_url,
      featured: Boolean(row.featured),
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    });
  }

  #mapEntityToRow(project) {
    return {
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: JSON.stringify(project.technologies),
      github_url: project.githubUrl,
      demo_url: project.demoUrl,
      image_url: project.imageUrl,
      featured: project.featured ? 1 : 0,
      created_at: project.createdAt,
      updated_at: project.updatedAt
    };
  }
}

export default SqliteProjectRepository;
```

### Use Cases (Application Layer)

**backend/src/application/usecases/CreateProjectUseCase.js:**

```javascript
// Versão ES6+ Moderna (2025)
import { Project } from '../../domain/entities/Project.js';
import { randomUUID } from 'crypto';

export class CreateProjectUseCase {
  #projectRepository;
  #logger;
  #eventBus;

  constructor(projectRepository, logger, eventBus) {
    this.#projectRepository = projectRepository;
    this.#logger = logger;
    this.#eventBus = eventBus;
  }

  async execute(projectData) {
    try {
      // Validar dados de entrada usando método privado
      this.#validateInput(projectData);

      // Criar entidade do domínio com ID moderno
      const project = new Project({
        ...projectData,
        id: randomUUID() // ID gerado com crypto.randomUUID()
      });

      // Verificar regras de negócio
      await this.#validateBusinessRules(project);

      // Persistir no repositório
      const createdProject = await this.#projectRepository.create(project);

      // Log da operação usando structured logging
      this.#logger.info('Projeto criado com sucesso', {
        projectId: createdProject.id,
        title: createdProject.title,
        category: createdProject.category,
        timestamp: new Date().toISOString()
      });

      // Disparar evento usando async/await moderno
      await this.#eventBus.publish('project.created', {
        project: createdProject.toJSON(),
        timestamp: new Date().toISOString(),
        source: 'CreateProjectUseCase'
      });

      return {
        success: true,
        data: createdProject.toJSON(),
        metadata: {
          createdAt: new Date().toISOString(),
          version: '2.0'
        }
      };

    } catch (error) {
      this.#logger.error('Erro ao criar projeto', {
        error: error.message,
        stack: error.stack,
        projectData: this.#sanitizeProjectData(projectData),
        timestamp: new Date().toISOString()
      });

      // Disparar evento de erro
      await this.#eventBus.publish('project.creation.failed', {
        error: error.message,
        projectData: this.#sanitizeProjectData(projectData),
        timestamp: new Date().toISOString()
      });

      return {
        success: false,
        error: error.message,
        code: error.code ?? 'CREATION_FAILED'
      };
    }
  }

  // Métodos privados usando # (ES2022)
  #validateInput(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Dados do projeto são obrigatórios');
    }

    // Validação usando optional chaining
    if (!data?.title?.trim()) {
      throw new Error('Título é obrigatório');
    }

    if (!data?.description?.trim()) {
      throw new Error('Descrição é obrigatória');
    }
  }

  async #validateBusinessRules(project) {
    // Regra: Máximo de 3 projetos em destaque
    if (project.featured) {
      const featuredCount = await this.#projectRepository.count({ featured: true });
      if (featuredCount >= 3) {
        throw new Error('Máximo de 3 projetos em destaque permitidos');
      }
    }

    // Regra: Título único por categoria usando Promise.all para otimização
    const [existingProjects] = await Promise.all([
      this.#projectRepository.findByCategory(project.category)
    ]);

    const titleExists = existingProjects.some(p =>
      p.title.toLowerCase() === project.title.toLowerCase()
    );

    if (titleExists) {
      throw new Error(`Já existe um projeto com o título "${project.title}" na categoria ${project.category}`);
    }
  }

  #sanitizeProjectData(projectData) {
    // Remover dados sensíveis para logs
    const { userId, ...sanitized } = projectData ?? {};
    return sanitized;
  }
}

export default CreateProjectUseCase;
```

### Event-Driven Architecture

**backend/src/infrastructure/events/EventBus.js:**

```javascript
// Versão ES6+ Moderna (2025)
import { EventEmitter } from 'events';
import { performance } from 'perf_hooks';
import { randomUUID } from 'crypto';

export class EventBus extends EventEmitter {
  #logger;
  #handlers = new Map();
  #eventMetrics = new Map();
  #middlewares = [];

  constructor(logger = console) {
    super();
    this.#logger = logger;
    this.setMaxListeners(100); // Limite moderno aumentado

    // Configurar limpeza automática de métricas
    this.#setupMetricsCleanup();
  }

  async publish(eventName, data) {
    const eventId = randomUUID();
    const startTime = performance.now();

    try {
      // Validação de entrada moderna
      if (!eventName?.trim()) {
        throw new Error('Nome do evento é obrigatório');
      }

      // Log estruturado moderno
      this.#logger.info(`📢 Publishing event: ${eventName}`, {
        eventId,
        eventName,
        dataSize: JSON.stringify(data ?? {}).length,
        timestamp: new Date().toISOString(),
        handlersCount: this.#handlers.get(eventName)?.length ?? 0
      });

      // Executar middlewares antes da publicação
      const processedData = await this.#executeMiddlewares(eventName, data);

      // Emit para handlers síncronos do EventEmitter
      this.emit(eventName, processedData);

      // Executar handlers assíncronos customizados
      const handlers = this.#handlers.get(eventName) ?? [];
      const results = await Promise.allSettled(
        handlers.map(handler => this.#executeHandler(handler, processedData, eventId))
      );

      // Verificar falhas nos handlers
      const failures = results.filter(result => result.status === 'rejected');
      if (failures.length > 0) {
        this.#logger.warn(`Alguns handlers falharam para evento ${eventName}`, {
          eventId,
          failures: failures.length,
          total: handlers.length
        });
      }

      // Atualizar métricas
      this.#updateMetrics(eventName, performance.now() - startTime, true);

      return {
        eventId,
        success: true,
        handlersExecuted: handlers.length,
        failures: failures.length
      };

    } catch (error) {
      this.#logger.error(`❌ Error publishing event ${eventName}`, {
        eventId,
        error: error.message,
        stack: error.stack,
        eventName,
        timestamp: new Date().toISOString()
      });

      this.#updateMetrics(eventName, performance.now() - startTime, false);

      // Emitir evento de erro
      this.emit('event.error', {
        eventId,
        originalEvent: eventName,
        error: error.message,
        data
      });

      throw error;
    }
  }

  subscribe(eventName, handler, options = {}) {
    if (!eventName?.trim()) {
      throw new Error('Nome do evento é obrigatório');
    }

    if (typeof handler !== 'function') {
      throw new Error('Handler deve ser uma função');
    }

    // Inicializar array de handlers se não existir
    if (!this.#handlers.has(eventName)) {
      this.#handlers.set(eventName, []);
    }

    // Criar wrapper do handler com metadados
    const wrappedHandler = {
      id: randomUUID(),
      fn: handler,
      options: {
        priority: options.priority ?? 0,
        timeout: options.timeout ?? 5000,
        retries: options.retries ?? 0,
        ...options
      },
      createdAt: new Date().toISOString()
    };

    this.#handlers.get(eventName).push(wrappedHandler);

    // Ordenar por prioridade (maior prioridade primeiro)
    this.#handlers.get(eventName).sort((a, b) => b.options.priority - a.options.priority);

    this.#logger.info(`👂 Handler subscribed to event: ${eventName}`, {
      handlerId: wrappedHandler.id,
      eventName,
      totalHandlers: this.#handlers.get(eventName).length,
      priority: wrappedHandler.options.priority
    });

    // Retornar função de unsubscribe
    return () => this.unsubscribe(eventName, wrappedHandler.id);
  }

  unsubscribe(eventName, handlerId) {
    const handlers = this.#handlers.get(eventName);
    if (!handlers) return false;

    const initialLength = handlers.length;
    const filteredHandlers = handlers.filter(h => h.id !== handlerId);

    this.#handlers.set(eventName, filteredHandlers);

    const removed = initialLength > filteredHandlers.length;
    if (removed) {
      this.#logger.info(`🔇 Handler unsubscribed from event: ${eventName}`, {
        handlerId,
        remainingHandlers: filteredHandlers.length
      });
    }

    return removed;
  }

  // Adicionar middleware para processamento de eventos
  use(middleware) {
    if (typeof middleware !== 'function') {
      throw new Error('Middleware deve ser uma função');
    }

    this.#middlewares.push(middleware);
    this.#logger.info('Middleware adicionado ao EventBus', {
      totalMiddlewares: this.#middlewares.length
    });
  }

  // Métodos privados usando # (ES2022)
  async #executeHandler(wrappedHandler, data, eventId) {
    const { fn, options, id } = wrappedHandler;
    let attempt = 0;

    while (attempt <= options.retries) {
      try {
        // Timeout para execução do handler
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Handler timeout')), options.timeout);
        });

        const handlerPromise = Promise.resolve(fn(data, { eventId, handlerId: id }));

        await Promise.race([handlerPromise, timeoutPromise]);
        return; // Sucesso, sair do loop

      } catch (error) {
        attempt++;

        this.#logger.error('Error executing event handler', {
          handlerId: id,
          eventId,
          attempt,
          maxRetries: options.retries,
          error: error.message,
          stack: error.stack
        });

        if (attempt > options.retries) {
          // Emitir evento de falha do handler
          this.emit('handler.failed', {
            handlerId: id,
            eventId,
            error: error.message,
            attempts: attempt
          });

          throw error; // Re-throw após esgotar tentativas
        }

        // Aguardar antes da próxima tentativa (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
      }
    }
  }

  async #executeMiddlewares(eventName, data) {
    let processedData = data;

    for (const middleware of this.#middlewares) {
      try {
        processedData = await middleware(eventName, processedData) ?? processedData;
      } catch (error) {
        this.#logger.error('Middleware execution failed', {
          eventName,
          error: error.message
        });
        // Continuar com próximo middleware
      }
    }

    return processedData;
  }

  #setupMetricsCleanup() {
    // Limpar métricas antigas a cada hora
    setInterval(() => {
      this.#eventMetrics.clear();
      this.#logger.info('Event metrics cleared');
    }, 60 * 60 * 1000);
  }

  #updateMetrics(eventName, duration, success) {
    if (!this.#eventMetrics.has(eventName)) {
      this.#eventMetrics.set(eventName, {
        count: 0,
        successCount: 0,
        totalDuration: 0,
        avgDuration: 0,
        lastExecuted: null
      });
    }

    const metrics = this.#eventMetrics.get(eventName);
    metrics.count++;
    if (success) metrics.successCount++;
    metrics.totalDuration += duration;
    metrics.avgDuration = metrics.totalDuration / metrics.count;
    metrics.lastExecuted = new Date().toISOString();
  }

  // Getters públicos para métricas
  get metrics() {
    const result = {};
    for (const [eventName, metrics] of this.#eventMetrics) {
      result[eventName] = {
        ...metrics,
        successRate: (metrics.successCount / metrics.count) * 100
      };
    }
    return result;
  }

  get handlersCount() {
    let total = 0;
    for (const handlers of this.#handlers.values()) {
      total += handlers.length;
    }
    return total;
  }
}

export default EventBus;
```

**backend/src/application/handlers/ProjectEventHandlers.js:**

```javascript
// Versão ES6+ Moderna (2025)
import { performance } from 'perf_hooks';
import { randomUUID } from 'crypto';

export class ProjectEventHandlers {
  #emailService;
  #cacheService;
  #analyticsService;
  #logger;
  #handlerMetrics = new Map();

  constructor(emailService, cacheService, analyticsService, logger) {
    this.#emailService = emailService;
    this.#cacheService = cacheService;
    this.#analyticsService = analyticsService;
    this.#logger = logger;

    // Configurar métricas de handlers
    this.#setupMetrics();
  }

  async handleProjectCreated(data, context = {}) {
    const handlerId = randomUUID();
    const startTime = performance.now();
    const { project, timestamp, source } = data;

    try {
      this.#logger.info('🎯 Handling project created event', {
        handlerId,
        projectId: project?.id,
        eventSource: source,
        timestamp: timestamp ?? new Date().toISOString()
      });

      // Executar operações em paralelo para melhor performance
      const operations = await Promise.allSettled([
        this.#invalidateProjectCache(project?.id),
        this.#sendProjectCreatedNotification(project),
        this.#trackProjectCreatedAnalytics(project),
        this.#updateProjectSearchIndex(project)
      ]);

      // Verificar falhas nas operações
      const failures = operations.filter(op => op.status === 'rejected');
      if (failures.length > 0) {
        this.#logger.warn('Algumas operações falharam no handleProjectCreated', {
          handlerId,
          projectId: project?.id,
          failures: failures.map(f => f.reason?.message)
        });
      }

      // Atualizar métricas
      this.#updateHandlerMetrics('handleProjectCreated', performance.now() - startTime, true);

      this.#logger.info('✅ Project created event handled successfully', {
        handlerId,
        projectId: project?.id,
        duration: `${(performance.now() - startTime).toFixed(2)}ms`,
        operationsCompleted: operations.length - failures.length,
        operationsFailed: failures.length
      });

    } catch (error) {
      this.#updateHandlerMetrics('handleProjectCreated', performance.now() - startTime, false);

      this.#logger.error('❌ Error handling project created event', {
        handlerId,
        error: error.message,
        stack: error.stack,
        projectId: project?.id,
        context,
        timestamp: new Date().toISOString()
      });

      // Re-throw para permitir retry em nível superior
      throw error;
    }
  }

  async handleProjectUpdated(data, context = {}) {
    const handlerId = randomUUID();
    const startTime = performance.now();
    const { project, previousData, timestamp, source } = data;

    try {
      this.#logger.info('🔄 Handling project updated event', {
        handlerId,
        projectId: project?.id,
        eventSource: source,
        hasChanges: this.#detectChanges(project, previousData),
        timestamp: timestamp ?? new Date().toISOString()
      });

      // Detectar mudanças específicas
      const changes = this.#detectChanges(project, previousData);

      // Executar operações baseadas nas mudanças
      const operations = [];

      // Sempre invalidar cache
      operations.push(this.#invalidateProjectCache(project?.id));

      // Se mudou para featured
      if (project?.featured && !previousData?.featured) {
        operations.push(
          this.#trackProjectFeaturedAnalytics(project),
          this.#sendProjectFeaturedNotification(project)
        );
      }

      // Se mudou categoria
      if (project?.category !== previousData?.category) {
        operations.push(
          this.#updateCategoryCache(project?.category, previousData?.category),
          this.#trackCategoryChangeAnalytics(project, previousData)
        );
      }

      // Se mudou status
      if (project?.status !== previousData?.status) {
        operations.push(
          this.#trackStatusChangeAnalytics(project, previousData)
        );
      }

      // Executar todas as operações
      const results = await Promise.allSettled(operations);
      const failures = results.filter(r => r.status === 'rejected');

      if (failures.length > 0) {
        this.#logger.warn('Algumas operações falharam no handleProjectUpdated', {
          handlerId,
          projectId: project?.id,
          failures: failures.map(f => f.reason?.message)
        });
      }

      this.#updateHandlerMetrics('handleProjectUpdated', performance.now() - startTime, true);

      this.#logger.info('✅ Project updated event handled successfully', {
        handlerId,
        projectId: project?.id,
        changes,
        duration: `${(performance.now() - startTime).toFixed(2)}ms`,
        operationsCompleted: operations.length - failures.length
      });

    } catch (error) {
      this.#updateHandlerMetrics('handleProjectUpdated', performance.now() - startTime, false);

      this.#logger.error('❌ Error handling project updated event', {
        handlerId,
        error: error.message,
        stack: error.stack,
        projectId: project?.id,
        context,
        timestamp: new Date().toISOString()
      });

      throw error;
    }
  }

  async handleProjectDeleted(data, context = {}) {
    const handlerId = randomUUID();
    const startTime = performance.now();
    const { projectId, project, timestamp, source } = data;

    try {
      this.#logger.info('🗑️ Handling project deleted event', {
        handlerId,
        projectId,
        eventSource: source,
        timestamp: timestamp ?? new Date().toISOString()
      });

      // Executar operações de limpeza em paralelo
      const operations = await Promise.allSettled([
        this.#cleanupProjectCache(projectId),
        this.#cleanupProjectSearchIndex(projectId),
        this.#trackProjectDeletedAnalytics(projectId, project),
        this.#sendProjectDeletedNotification(projectId, project),
        this.#cleanupProjectAssets(projectId)
      ]);

      const failures = operations.filter(op => op.status === 'rejected');
      if (failures.length > 0) {
        this.#logger.warn('Algumas operações de limpeza falharam', {
          handlerId,
          projectId,
          failures: failures.map(f => f.reason?.message)
        });
      }

      this.#updateHandlerMetrics('handleProjectDeleted', performance.now() - startTime, true);

      this.#logger.info('✅ Project deleted event handled successfully', {
        handlerId,
        projectId,
        duration: `${(performance.now() - startTime).toFixed(2)}ms`,
        cleanupOperations: operations.length - failures.length
      });

    } catch (error) {
      this.#updateHandlerMetrics('handleProjectDeleted', performance.now() - startTime, false);

      this.#logger.error('❌ Error handling project deleted event', {
        handlerId,
        error: error.message,
        stack: error.stack,
        projectId,
        context,
        timestamp: new Date().toISOString()
      });

      throw error;
    }
  }

  // Métodos privados usando # (ES2022)
  async #invalidateProjectCache(projectId) {
    if (!projectId) return;

    await Promise.all([
      this.#cacheService.invalidate(`project:${projectId}`),
      this.#cacheService.invalidate('projects:*'),
      this.#cacheService.invalidate('projects:featured'),
      this.#cacheService.invalidate('projects:recent')
    ]);
  }

  async #cleanupProjectCache(projectId) {
    if (!projectId) return;

    await Promise.all([
      this.#cacheService.delete(`project:${projectId}`),
      this.#cacheService.invalidate('projects:*'),
      this.#cacheService.invalidate('projects:count'),
      this.#cacheService.invalidate('categories:*')
    ]);
  }

  async #sendProjectCreatedNotification(project) {
    if (!project || !process.env.ADMIN_EMAIL) return;

    await this.#emailService.sendNotification({
      to: process.env.ADMIN_EMAIL,
      subject: `🎉 Novo Projeto Criado: ${project.title}`,
      template: 'project-created',
      data: {
        project,
        timestamp: new Date().toISOString(),
        dashboardUrl: `${process.env.FRONTEND_URL}/admin/projects/${project.id}`
      }
    });
  }

  async #sendProjectFeaturedNotification(project) {
    if (!project || !process.env.ADMIN_EMAIL) return;

    await this.#emailService.sendNotification({
      to: process.env.ADMIN_EMAIL,
      subject: `⭐ Projeto em Destaque: ${project.title}`,
      template: 'project-featured',
      data: { project }
    });
  }

  async #sendProjectDeletedNotification(projectId, project) {
    if (!process.env.ADMIN_EMAIL) return;

    await this.#emailService.sendNotification({
      to: process.env.ADMIN_EMAIL,
      subject: `🗑️ Projeto Removido: ${project?.title ?? projectId}`,
      template: 'project-deleted',
      data: { projectId, project }
    });
  }

  async #trackProjectCreatedAnalytics(project) {
    if (!project) return;

    await this.#analyticsService.track('project_created', {
      projectId: project.id,
      title: project.title,
      category: project.category,
      featured: project.featured,
      technologies: project.technologies,
      timestamp: new Date().toISOString()
    });
  }

  async #trackProjectFeaturedAnalytics(project) {
    await this.#analyticsService.track('project_featured', {
      projectId: project.id,
      category: project.category,
      timestamp: new Date().toISOString()
    });
  }

  async #trackProjectDeletedAnalytics(projectId, project) {
    await this.#analyticsService.track('project_deleted', {
      projectId,
      category: project?.category,
      wasFeature: project?.featured,
      timestamp: new Date().toISOString()
    });
  }

  async #trackCategoryChangeAnalytics(project, previousData) {
    await this.#analyticsService.track('project_category_changed', {
      projectId: project.id,
      oldCategory: previousData.category,
      newCategory: project.category,
      timestamp: new Date().toISOString()
    });
  }

  async #trackStatusChangeAnalytics(project, previousData) {
    await this.#analyticsService.track('project_status_changed', {
      projectId: project.id,
      oldStatus: previousData.status,
      newStatus: project.status,
      timestamp: new Date().toISOString()
    });
  }

  async #updateProjectSearchIndex(project) {
    // Implementar integração com serviço de busca (Elasticsearch, etc.)
    this.#logger.debug('Search index update would be implemented here', {
      projectId: project?.id
    });
  }

  async #cleanupProjectSearchIndex(projectId) {
    this.#logger.debug('Search index cleanup would be implemented here', {
      projectId
    });
  }

  async #cleanupProjectAssets(projectId) {
    // Implementar limpeza de assets (imagens, arquivos, etc.)
    this.#logger.debug('Asset cleanup would be implemented here', {
      projectId
    });
  }

  async #updateCategoryCache(newCategory, oldCategory) {
    await Promise.all([
      this.#cacheService.invalidate(`category:${newCategory}`),
      this.#cacheService.invalidate(`category:${oldCategory}`),
      this.#cacheService.invalidate('categories:list')
    ]);
  }

  #detectChanges(current, previous) {
    if (!current || !previous) return {};

    const changes = {};
    const fields = ['title', 'description', 'category', 'featured', 'status', 'technologies'];

    for (const field of fields) {
      if (JSON.stringify(current[field]) !== JSON.stringify(previous[field])) {
        changes[field] = {
          from: previous[field],
          to: current[field]
        };
      }
    }

    return changes;
  }

  #setupMetrics() {
    // Limpar métricas antigas periodicamente
    setInterval(() => {
      this.#handlerMetrics.clear();
    }, 60 * 60 * 1000); // 1 hora
  }

  #updateHandlerMetrics(handlerName, duration, success) {
    if (!this.#handlerMetrics.has(handlerName)) {
      this.#handlerMetrics.set(handlerName, {
        count: 0,
        successCount: 0,
        totalDuration: 0,
        avgDuration: 0
      });
    }

    const metrics = this.#handlerMetrics.get(handlerName);
    metrics.count++;
    if (success) metrics.successCount++;
    metrics.totalDuration += duration;
    metrics.avgDuration = metrics.totalDuration / metrics.count;
  }

  // Getter público para métricas
  get metrics() {
    const result = {};
    for (const [handlerName, metrics] of this.#handlerMetrics) {
      result[handlerName] = {
        ...metrics,
        successRate: (metrics.successCount / metrics.count) * 100
      };
    }
    return result;
  }
}

export default ProjectEventHandlers;
```

💾 **Commit:**

```bash
git add .
git commit -m "feat: implement advanced Clean Architecture with DDD, Repository Pattern, Use Cases and Event-Driven Architecture"
```

## 🎓 Conclusão

Com essas melhorias avançadas, seu portfólio se tornará uma aplicação profissional de nível enterprise, seguindo as melhores práticas de desenvolvimento moderno, segurança, performance e observabilidade!

### 🚀 Principais conquistas implementadas:

- ✅ Clean Architecture e SOLID principles aplicados
- ✅ Domain-Driven Design (DDD) completo
- ✅ Repository Pattern e Use Cases
- ✅ Event-Driven Architecture
- ✅ Sistema de temas dinâmicos
- ✅ Gamificação com conquistas
- ✅ Assistente IA integrado
- ✅ Sistema de recomendações inteligentes
- ✅ Comandos de terminal avançados
- ✅ Monitoramento com Prometheus/Grafana
- ✅ Error tracking com Sentry
- ✅ Testes abrangentes (Unit, Integration, E2E, Load)
- ✅ CI/CD pipeline automatizado
- ✅ Segurança avançada com rate limiting
- ✅ Deploy em produção com alta disponibilidade
- ✅ Performance de nível enterprise

### 🎯 Próximos passos sugeridos:

1. Implementar as melhorias gradualmente
2. Monitorar métricas em produção
3. Coletar feedback dos usuários
4. Iterar e melhorar continuamente
5. Documentar lições aprendidas
6. Contribuir para a comunidade open-source
7. Criar conteúdo educativo sobre as implementações

### PWA Meta Tags

```html
<meta name="theme-color" content="#000000">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Portfolio Terminal">
<!-- PWA Meta Tags -->
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
```

### Manifest PWA

**public/manifest.json:**
```json
{
  "name": "Portfolio Terminal",
  "short_name": "Portfolio",
  "description": "Portfólio interativo com terminal responsivo",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#00ff88",
  "orientation": "any",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## 🎯 Conclusão

Parabéns! Você criou um portfólio completo com:

- ✅ Backend API com Node.js e Express (ES6+ 2025)
- ✅ Frontend React com interface terminal responsiva
- ✅ Banco de dados SQLite com migrações
- ✅ Docker para desenvolvimento e produção
- ✅ Nginx para servir em produção
- ✅ Makefile para automação
- ✅ Design Responsivo para mobile, tablet e desktop
- ✅ PWA (Progressive Web App) com suporte offline
- ✅ Arquitetura Limpa com DDD e Event-Driven
- ✅ Hooks React Modernos para responsividade
- ✅ CSS Grid e Flexbox avançados
- ✅ Acessibilidade e usabilidade otimizadas

### Recursos Aprendidos

- Arquitetura Full-Stack Moderna
- API REST Design com ES6+
- React Hooks e Context Avançados
- Docker e Containerização
- Nginx e Proxy Reverso
- Banco de dados e Migrações
- Deploy e DevOps
- Design Responsivo Moderno (2025)
- Progressive Web Apps (PWA)
- Clean Architecture e DDD
- Event-Driven Architecture
- CSS Custom Properties e clamp()
- Media Queries Avançadas
- Touch e Hover Interactions
- Acessibilidade Web (WCAG)

### Próximos Desafios

- Implementar testes automatizados (Jest, Cypress)
- Adicionar autenticação OAuth (Google, GitHub)
- Criar painel administrativo responsivo
- Implementar cache e otimizações de performance
- Configurar CI/CD pipeline completo
- Adicionar Service Worker para cache offline
- Implementar notificações push
- Criar temas personalizáveis
- Adicionar animações e micro-interações
- Implementar analytics e métricas de uso

🚀 Seu portfólio está pronto para impressionar em qualquer dispositivo!

*"O código é poesia em movimento, e cada linha conta uma história."*