#base
FROM node:21-alpine3.18 AS base


# deps
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./ 
RUN npm install


#builder
FROM base AS builder
WORKDIR /app

# DATABASE_URL を確認
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN echo "DATABASE_URL=${DATABASE_URL}"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma クライアント生成後の確認
RUN npx prisma generate
RUN ls -la node_modules/@prisma/client
RUN npm run build


#runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 追加された環境変数
ENV DATABASE_URL ${DATABASE_URL}
ENV AWS_ACCESS_KEY_ID ${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY ${AWS_SECRET_ACCESS_KEY}
ENV AWS_REGION ${AWS_REGION}
ENV AWS_S3_BUCKET_NAME ${AWS_S3_BUCKET_NAME}
ENV NEXT_PUBLIC_GOOGLE_MAP_MAPID ${NEXT_PUBLIC_GOOGLE_MAP_MAPID}
ENV NEXT_PUBLIC_GOOGLE_MAP_API_KEY ${NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
ENV NEXTAUTH_SECRET ${NEXTAUTH_SECRET}
ENV DIRECT_URL ${DIRECT_URL}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]





# # dev ステージ
# FROM base AS dev
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .

# # 環境変数 PATH を設定
# ENV PATH /app/node_modules/.bin:$PATH

# # next コマンドが存在するか確認
# RUN ls /app/node_modules/.bin
# RUN which next

# CMD ["npm", "run", "dev"]