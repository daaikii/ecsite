# Base イメージ
FROM node:21-alpine3.18 AS base

# デフォルトの依存関係
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 依存関係のインストール
FROM base AS deps
COPY package*.json ./
RUN npm ci            

# ビルド用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules  
COPY . .                                         

RUN npx prisma generate                         
RUN npm run build                                 

# 実行環境
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# 実行用ユーザーとグループの作成
RUN addgroup --system --gid 1001 nodejs          
RUN adduser --system --uid 1001 --ingroup nodejs nextjs  

# ビルド成果物のコピー
COPY --from=builder /app/public ./public         
COPY --from=builder /app/.next/standalone ./     
COPY --from=builder /app/.next/static ./.next/static  

# 実行ユーザーを設定
USER nextjs

# ポート公開
EXPOSE 3000

# アプリケーション起動
CMD ["npm", "run", "start"]


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