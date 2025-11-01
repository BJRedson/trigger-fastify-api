FROM node:20-alpine
WORKDIR /app

# deps
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile

# fonte
COPY tsconfig.json trigger.config.ts ./
COPY src ./src

# build só se quiser compilar (aqui rodamos tsx em dev)
# RUN pnpm build

EXPOSE 3333
CMD ["pnpm", "dev:api"]