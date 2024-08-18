#base
FROM node:21-alpine3.18 AS base


# deps
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci


#builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npn run build


#runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --gid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV  HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

# dev ステージ
FROM base AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 環境変数 PATH を設定
ENV PATH /app/node_modules/.bin:$PATH

# next コマンドが存在するか確認
RUN ls /app/node_modules/.bin
RUN which next

CMD ["npm", "run", "dev"]