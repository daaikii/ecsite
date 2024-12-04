# Base イメージ
FROM node:21-alpine3.18 AS base

# 必要な依存関係をインストール
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 依存関係をインストールするステージ
FROM base AS deps
COPY package*.json ./
RUN npm install

# ビルドステージ
FROM base AS builder
WORKDIR /app

# deps ステージの依存関係をコピー
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# .env ファイルをコピー (ただし dotenvを使わず直接環境変数に設定)
COPY .env .env

RUN export $(grep -v '^#' .env | xargs) && \
    echo "DATABASE_URL=${DATABASE_URL}" && \
    echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" && \
    echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" && \
    echo "AWS_REGION=${AWS_REGION}" && \
    echo "AWS_S3_BUCKET_NAME=${AWS_S3_BUCKET_NAME}" && \
    echo "NEXT_PUBLIC_GOOGLE_MAP_MAPID=${NEXT_PUBLIC_GOOGLE_MAP_MAPID}" && \
    echo "NEXT_PUBLIC_GOOGLE_MAP_API_KEY=${NEXT_PUBLIC_GOOGLE_MAP_API_KEY}" && \
    echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" && \
    echo "DIRECT_URL=${DIRECT_URL}"

# Prisma クライアント生成
RUN npx prisma generate

# アプリケーションをビルド
RUN npm run build

# 実行環境の準備
FROM base AS runner
WORKDIR /app

# ビルド済みのアプリケーションをコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 必要な環境変数を手動で設定
# .env から取得した環境変数を Dockerfile 内で手動で指定
ENV DATABASE_URL=${DATABASE_URL}
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
ENV AWS_REGION=${AWS_REGION}
ENV AWS_S3_BUCKET_NAME=${AWS_S3_BUCKET_NAME}
ENV NEXT_PUBLIC_GOOGLE_MAP_MAPID=${NEXT_PUBLIC_GOOGLE_MAP_MAPID}
ENV NEXT_PUBLIC_GOOGLE_MAP_API_KEY=${NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV DIRECT_URL=${DIRECT_URL}

# Node.js 実行環境を構築
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 実行ユーザーを設定
USER nextjs

# ポートとホスト名を設定
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# アプリケーションを起動
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