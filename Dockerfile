# ---- Dev stage (hot reload; used by docker-compose target: dev) ----
FROM node:20-slim AS dev
WORKDIR /app
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install
COPY . .
EXPOSE 3002
CMD ["npm", "run", "dev"]

# ---- Build stage (production) ----
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3002
CMD ["npm", "run", "start", "--", "-p", "3002"]
