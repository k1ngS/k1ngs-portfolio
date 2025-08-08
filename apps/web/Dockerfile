# Web App Dockerfile
FROM oven/bun:1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY apps/web/package.json ./apps/web/
COPY turbo.json ./

# Install dependencies
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the web app
RUN bun run build --filter=web

# Production image with nginx
FROM nginx:alpine AS runner

# Copy nginx configuration
COPY apps/web/nginx.conf /etc/nginx/nginx.conf

# Copy built application
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001 || exit 1

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]