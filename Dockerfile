# ---------- Base com deps para build ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV PNPM_HOME=/usr/local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable

# ---------- Instala dependências (com cache) ----------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- Compila o projeto ----------
FROM base AS build
COPY --from=deps /app/node_modules /app/node_modules
COPY tsconfig.json ./
COPY trigger.config.ts ./
COPY src ./src
RUN pnpm build

# ---------- Só deps de produção ----------
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# ---------- Runtime enxuta ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Usuário não-root
RUN addgroup -S app && adduser -S app -G app
USER app

# Copia artefatos necessários
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Porta exposta (a App Platform define $PORT; não hardcode no código)
EXPOSE 3333

# Healthcheck simples (ajuste a rota se quiser)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD wget -qO- http://127.0.0.1:${PORT:-3333}/health || exit 1

# Comando final: executa build compilado
CMD ["node", "dist/api/index.js"]