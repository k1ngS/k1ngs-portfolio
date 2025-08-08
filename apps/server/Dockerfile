# Server Dockerfile
FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY apps/server/package.json ./apps/server/
COPY turbo.json ./

# Install dependencies
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN cd apps/server && bun run db:generate

# Build the server
RUN bun run build --filter=server

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server

# Copy built application
COPY --from=builder --chown=server:nodejs /app/apps/server/dist ./dist
COPY --from=builder --chown=server:nodejs /app/apps/server/prisma ./prisma
COPY --from=builder --chown=server:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=server:nodejs /app/apps/server/package.json ./package.json

# Create uploads directory
RUN mkdir -p uploads && chown server:nodejs uploads

USER server

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["bun", "run", "dist/index.js"]