# Use a base image with Node.js LTS
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "start"]






# # Base イメージ
# FROM node:21-alpine3.18 AS base

# # 必要な依存関係をインストール
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY package*.json ./ 
# RUN npm install

# # ビルドステージ
# FROM base AS builder
# WORKDIR /app

# # DATABASE_URL を確認
# ARG DATABASE_URL
# ENV DATABASE_URL=${DATABASE_URL}
# RUN echo "DATABASE_URL=${DATABASE_URL}"

# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Prisma クライアント生成後の確認
# RUN npx prisma generate
# RUN ls -la node_modules/@prisma/client
# RUN npm run build

# # 実行環境の準備
# FROM base AS runner
# WORKDIR /app

# # 環境変数の定義を追加 (ここに記述します)
# ENV DATABASE_URL=$DATABASE_URL
# ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
# ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
# ENV AWS_REGION=$AWS_REGION
# ENV AWS_S3_BUCKET_NAME=$AWS_S3_BUCKET_NAME
# ENV NEXT_PUBLIC_GOOGLE_MAP_MAPID=$NEXT_PUBLIC_GOOGLE_MAP_MAPID
# ENV NEXT_PUBLIC_GOOGLE_MAP_API_KEY=$NEXT_PUBLIC_GOOGLE_MAP_API_KEY
# ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
# ENV DIRECT_URL=$DIRECT_URL

# # Node.js 実行環境を構築
# ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# # 実行ポートとホスト名を設定
# EXPOSE 3000
# ENV PORT 3000
# ENV HOSTNAME "0.0.0.0"

# # アプリケーションを実行
# CMD ["node", "server.js"]




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