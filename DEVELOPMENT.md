# Development Guide

This guide provides detailed information for developers working on the k1ngs-portfolio project.

## 📁 Project Structure

```
k1ngs-portfolio/
├── apps/
│   ├── web/                     # Frontend React Application
│   │   ├── src/
│   │   │   ├── components/      # Reusable UI components
│   │   │   │   ├── ui/         # Base UI components (shadcn/ui)
│   │   │   │   ├── terminal/   # Terminal-specific components
│   │   │   │   └── ...         # Feature components
│   │   │   ├── routes/         # File-based routing (TanStack Router)
│   │   │   ├── lib/            # Utilities and configurations
│   │   │   ├── contexts/       # React contexts (theme, language)
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── services/       # API services and integrations
│   │   │   ├── types/          # TypeScript type definitions
│   │   │   └── utils/          # Helper functions
│   │   ├── public/             # Static assets
│   │   └── package.json
│   ├── server/                  # Backend Fastify Application
│   │   ├── src/
│   │   │   ├── routers/        # tRPC route handlers
│   │   │   │   ├── projects.ts # Project management
│   │   │   │   ├── skills.ts   # Skills management
│   │   │   │   ├── contact.ts  # Contact form handling
│   │   │   │   └── index.ts    # Main router
│   │   │   ├── lib/            # Server utilities
│   │   │   │   ├── auth.ts     # Authentication config
│   │   │   │   ├── context.ts  # tRPC context
│   │   │   │   ├── errors.ts   # Error handling
│   │   │   │   └── trpc.ts     # tRPC setup
│   │   │   └── index.ts        # Server entry point
│   │   ├── prisma/             # Database schema and migrations
│   │   │   ├── schema/         # Modular schema files
│   │   │   │   ├── auth.prisma # Authentication models
│   │   │   │   ├── portfolio.prisma # Portfolio models
│   │   │   │   └── schema.prisma # Main schema
│   │   │   └── seed.ts         # Database seeding
│   │   └── package.json
│   └── docs/                    # Documentation Site (Astro)
└── packages/                    # Shared packages (future)
```

## 🔧 Development Workflow

### 1. Setting Up Your Environment

```bash
# Clone the repository
git clone https://github.com/k1ngS/k1ngs-portfolio.git
cd k1ngs-portfolio

# Install dependencies
bun install  # or npm install

# Copy environment files
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env

# Configure your environment variables
# Edit apps/server/.env and apps/web/.env with your settings
```

### 2. Database Setup

```bash
# Start PostgreSQL (using Docker)
bun db:start

# Generate Prisma client
bun db:generate

# Push schema to database
bun db:push

# Seed database with sample data
bun db:seed
```

### 3. Development Commands

```bash
# Start all services
bun dev

# Start individual services
bun dev:web      # Frontend only
bun dev:server   # Backend only
bun dev:native   # Mobile app (if applicable)

# Database operations
bun db:studio    # Open Prisma Studio
bun db:migrate   # Run migrations
bun db:reset     # Reset database (caution!)

# Code quality
bun check        # Run linter and formatter
bun check-types  # Type checking
```

## 🏗 Architecture Patterns

### Frontend Architecture

#### Component Structure
```typescript
// Component file structure
components/
├── feature-name/
│   ├── index.ts              # Barrel export
│   ├── feature-component.tsx # Main component
│   ├── feature-types.ts      # Component-specific types
│   └── feature-utils.ts      # Component utilities
```

#### Component Best Practices
```typescript
// Good component example
interface ProjectCardProps {
  project: Project;
  onEdit?: (id: string) => void;
  className?: string;
}

export function ProjectCard({ project, onEdit, className }: ProjectCardProps) {
  const { trackUserInteraction } = usePerformanceMonitor();

  const handleEdit = () => {
    trackUserInteraction('project_edit', project.id);
    onEdit?.(project.id);
  };

  return (
    <Card className={cn("project-card", className)}>
      {/* Component content */}
    </Card>
  );
}
```

#### State Management
```typescript
// Use React Query for server state
const { data: projects, isLoading, error } = trpc.projects.list.useQuery({
  limit: 10,
  category: selectedCategory,
});

// Use React state for local component state
const [isModalOpen, setIsModalOpen] = useState(false);

// Use context for global app state
const { theme, toggleTheme } = useTheme();
```

### Backend Architecture

#### Router Structure
```typescript
// tRPC router example
export const projectsRouter = router({
  list: publicProcedure
    .input(projectFilterSchema)
    .query(async ({ input }) => {
      try {
        // Implementation
      } catch (error) {
        throw handleError(error);
      }
    }),

  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ input, ctx }) => {
      // Implementation
    }),
});
```

#### Error Handling
```typescript
// Use the error handling utility
try {
  const result = await someOperation();
  return result;
} catch (error) {
  throw handleError(error);
}

// Custom errors
throw new AppError("Resource not found", 404);
```

#### Database Patterns
```typescript
// Use transactions for complex operations
await prisma.$transaction(async (tx) => {
  const project = await tx.project.create({ data: projectData });
  await tx.projectTechnology.createMany({
    data: technologies.map(techId => ({
      projectId: project.id,
      technologyId: techId,
    })),
  });
});
```

## 🎨 Styling Guidelines

### TailwindCSS Patterns
```typescript
// Use the cn utility for conditional classes
import { cn } from "@/lib/utils";

const buttonClasses = cn(
  "px-4 py-2 rounded-md font-medium transition-colors",
  variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
  variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300",
  disabled && "opacity-50 cursor-not-allowed"
);
```

### Component Variants
```typescript
// Use class-variance-authority for component variants
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## 🧪 Testing Guidelines

### Component Testing
```typescript
// Use React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  it('renders project information', () => {
    const project = { id: '1', title: 'Test Project', description: 'Description' };
    render(<ProjectCard project={project} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    const project = { id: '1', title: 'Test Project' };
    render(<ProjectCard project={project} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledWith('1');
  });
});
```

### API Testing
```typescript
// Test tRPC procedures
import { createTRPCMsw } from 'msw-trpc';
import { projectsRouter } from './routers/projects';

const trpcMsw = createTRPCMsw(projectsRouter);

// Mock API responses
const handlers = [
  trpcMsw.projects.list.query(() => {
    return [{ id: '1', title: 'Test Project' }];
  }),
];
```

## 🔒 Security Best Practices

### Input Validation
```typescript
// Always validate inputs with Zod
const createProjectSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  technologies: z.array(z.string()).max(10),
});

// Sanitize user inputs
const sanitizedTitle = input.title.trim();
```

### Authentication
```typescript
// Use protected procedures for sensitive operations
const deleteProject = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    // ctx.session.user is guaranteed to exist
    const userId = ctx.session.user.id;
    // Implementation
  });
```

### Environment Variables
```typescript
// Never expose sensitive data to the client
// Use VITE_ prefix for client-side variables only
const publicConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
};

// Server-side secrets
const serverConfig = {
  databaseUrl: process.env.DATABASE_URL,
  authSecret: process.env.BETTER_AUTH_SECRET,
};
```

## 🚀 Performance Guidelines

### Code Splitting
```typescript
// Lazy load components
const AdminPanel = lazy(() => import('./admin-panel'));

// Use React.Suspense
<Suspense fallback={<Loader />}>
  <AdminPanel />
</Suspense>
```

### Memoization
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);

// Memoize callback functions
const handleClick = useCallback((id: string) => {
  onEdit(id);
}, [onEdit]);
```

### Query Optimization
```typescript
// Use proper cache configuration
const { data } = trpc.projects.list.useQuery(
  { limit: 10 },
  {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  }
);
```

## 📝 Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use union types for variants
- Add JSDoc comments for complex functions

### React
- Use functional components with hooks
- Keep components small and focused
- Extract custom hooks for reusable logic
- Use TypeScript for all prop interfaces

### File Naming
- Use kebab-case for file names
- Use PascalCase for component files
- Use camelCase for utility functions
- Use UPPER_CASE for constants

### Import Order
```typescript
// 1. Node modules
import React from 'react';
import { motion } from 'framer-motion';

// 2. Internal utilities
import { cn } from '@/lib/utils';
import { trpc } from '@/utils/trpc';

// 3. Components
import { Button } from '@/components/ui/button';
import { ProjectCard } from './project-card';

// 4. Types
import type { Project } from '@/types/portfolio';
```

## 🐛 Debugging Guidelines

### Client-Side Debugging
```typescript
// Use the performance monitor
const { trackError } = usePerformanceMonitor();

try {
  // Code that might fail
} catch (error) {
  trackError(error, 'ProjectCard:handleEdit');
  throw error;
}
```

### Server-Side Debugging
```typescript
// Use structured logging
import { logError } from '@/lib/errors';

try {
  // Server operation
} catch (error) {
  logError(error, 'projectsRouter:create');
  throw handleError(error);
}
```

## 🚢 Deployment Guidelines

### Environment Setup
- Set up staging and production environments
- Use environment-specific configuration
- Enable monitoring and logging
- Set up health checks

### Database Migrations
```bash
# Create migration
npx prisma migrate dev --name add_new_feature

# Deploy to production
npx prisma migrate deploy
```

### Docker Deployment
```bash
# Build and deploy with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f server
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TanStack Router](https://tanstack.com/router)
- [tRPC Documentation](https://trpc.io/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing Guidelines

1. **Fork the repository** and create a feature branch
2. **Follow the code style** guidelines outlined above
3. **Write tests** for new functionality
4. **Update documentation** for significant changes
5. **Submit a pull request** with a clear description

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Added tests for new functionality
- [ ] All tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```