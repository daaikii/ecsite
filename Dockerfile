FROM --platform=linux/amd64 node:19-bullseye-slim

WORKDIR /app

# プロジェクトのファイルをコピー
COPY . .

# 必須の環境変数ファイルをコピー
ARG ENV_FILE
COPY ${ENV_FILE} .env.production 

RUN yarn install
RUN npx prisma generate
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
