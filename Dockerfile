FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY apps/api ./apps/api
RUN npm -w apps/api run build
EXPOSE 3333
CMD ["node", "apps/api/dist/index.js"]
