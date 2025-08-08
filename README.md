# k1ngs-portfolio-v3

A modern, interactive portfolio built with cutting-edge technologies. Features a unique terminal-style interface that allows visitors to explore projects, skills, and contact information through command-line interactions.

## 🚀 Features

- **Interactive Terminal Interface** - Navigate the portfolio using terminal commands
- **TypeScript First** - Complete type safety across the stack
- **Modern Architecture** - Monorepo structure with optimized build system
- **Real-time Data** - Dynamic content powered by tRPC and Prisma
- **Responsive Design** - Works seamlessly on all devices
- **Authentication** - Secure admin panel for content management
- **Contact System** - Built-in contact form with backend processing
- **Multi-language Support** - Internationalization ready
- **Performance Optimized** - Fast loading with efficient caching

## 🛠 Tech Stack

### Frontend
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TanStack Start](https://tanstack.com/start)** - Modern React framework with SSR
- **[TanStack Router](https://tanstack.com/router)** - Type-safe client-side routing
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, reusable UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions

### Backend
- **[Fastify](https://www.fastify.io/)** - Fast, low-overhead web framework
- **[tRPC](https://trpc.io/)** - End-to-end type-safe APIs
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust, scalable database
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication solution

### Development Tools
- **[Bun](https://bun.sh/)** - Ultra-fast JavaScript runtime and package manager
- **[Turborepo](https://turbo.build/)** - High-performance build system
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for code quality
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety everywhere

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **Bun** 1.2.19 or higher (recommended) or **npm**/**yarn**
- **PostgreSQL** 14.0 or higher
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/k1ngS/k1ngs-portfolio.git
cd k1ngs-portfolio
```

### 2. Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Setup

Copy the environment files and configure them:

```bash
# Server environment
cp apps/server/.env.example apps/server/.env

# Web environment  
cp apps/web/.env.example apps/web/.env
```

Edit `apps/server/.env` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# CORS Configuration
CORS_ORIGIN="http://localhost:3001"

# Authentication
BETTER_AUTH_SECRET="your-super-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Optional: Logging
LOG_LEVEL="info"
NODE_ENV="development"
```

### 4. Database Setup

```bash
# Start PostgreSQL (if using Docker)
bun db:start

# Generate Prisma client
bun db:generate

# Push database schema
bun db:push

# Seed the database (optional)
bun db:seed
```

### 5. Start Development

```bash
# Start all applications
bun dev

# Or start individual apps:
bun dev:web      # Frontend only (http://localhost:3001)
bun dev:server   # Backend only (http://localhost:3000)
bun dev:docs     # Documentation (http://localhost:4321)
```

## 📖 Available Scripts

### Root Scripts
- `bun dev` - Start all applications in development mode
- `bun build` - Build all applications for production
- `bun check` - Run linting and formatting with Biome
- `bun check-types` - Type check all applications

### Database Scripts
- `bun db:push` - Push schema changes to database
- `bun db:studio` - Open Prisma Studio (database GUI)
- `bun db:generate` - Generate Prisma client
- `bun db:migrate` - Run database migrations
- `bun db:seed` - Seed database with sample data
- `bun db:reset` - Reset database (caution: deletes all data)

### Development Scripts
- `bun dev:web` - Start frontend development server
- `bun dev:server` - Start backend development server
- `bun dev:native` - Start mobile app (if applicable)

## 🏗 Project Structure

```
k1ngs-portfolio/
├── apps/
│   ├── web/                    # Frontend React application
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── routes/         # Application routes
│   │   │   ├── lib/           # Utilities and configurations
│   │   │   ├── contexts/      # React contexts
│   │   │   └── utils/         # Helper functions
│   │   └── package.json
│   ├── server/                 # Backend Fastify application
│   │   ├── src/
│   │   │   ├── routers/       # tRPC route handlers
│   │   │   ├── lib/           # Server utilities
│   │   │   └── index.ts       # Server entry point
│   │   ├── prisma/            # Database schema and migrations
│   │   └── package.json
│   └── docs/                   # Documentation site (Astro)
├── packages/                   # Shared packages (if any)
├── turbo.json                 # Turborepo configuration
├── biome.json                 # Biome linter/formatter config
└── package.json               # Root package.json
```

## 🖥 Terminal Commands

The portfolio features an interactive terminal interface. Available commands:

- `help` - Show all available commands
- `about` - Learn about the developer
- `projects` - View portfolio projects
- `skills` - Display technical skills
- `contact` - Open contact form
- `clear` - Clear terminal history
- `theme` - Toggle color theme

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the existing code style enforced by Biome
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Component Guidelines
- Create reusable components in `apps/web/src/components/`
- Use TypeScript interfaces for component props
- Implement proper error boundaries
- Use React hooks appropriately

### API Development
- Define tRPC routers in `apps/server/src/routers/`
- Use Zod for input validation
- Implement proper error handling
- Add rate limiting for public endpoints

### Database
- Define models in `apps/server/prisma/schema/`
- Use migrations for schema changes
- Always backup before running destructive operations

## 🚀 Deployment

### Build for Production

```bash
# Build all applications
bun build

# Test production build locally
bun start
```

### Environment Variables

Ensure these are set in production:

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
BETTER_AUTH_SECRET=your_production_secret
BETTER_AUTH_URL=your_production_domain
CORS_ORIGIN=your_frontend_domain
```

### Docker Support

Docker configuration is available for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🔒 Security

- Rate limiting implemented on all endpoints
- Input validation with Zod schemas
- SQL injection protection via Prisma
- XSS protection with secure headers
- CSRF protection enabled
- Environment variables for sensitive data

## 📊 Performance

- Server-side rendering for fast initial loads
- Code splitting and lazy loading
- Database query optimization
- Image optimization
- Caching strategies implemented

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and commit: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Workflow

1. Run `bun check` before committing
2. Ensure all tests pass
3. Update documentation if needed
4. Follow conventional commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Issues:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify database exists and is accessible

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && bun install`
- Clear build cache: `bun clean`
- Check TypeScript errors: `bun check-types`

**Port Conflicts:**
- Default ports: 3000 (server), 3001 (web), 4321 (docs)
- Change ports in package.json scripts if needed

**Authentication Issues:**
- Regenerate BETTER_AUTH_SECRET
- Check BETTER_AUTH_URL matches your domain
- Clear browser cookies and try again

### Getting Help

- 📧 Email: your.email@example.com
- 💬 Create an issue on GitHub
- 📖 Check the documentation site
- 🔍 Search existing issues first

## 🚀 Roadmap

- [ ] Mobile app with React Native
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Blog system integration
- [ ] Multi-theme support
- [ ] Advanced search functionality
- [ ] Integration with external APIs
- [ ] Performance monitoring dashboard

---

Built with ❤️ by k1ngS
