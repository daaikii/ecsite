FROM --platform=linux/amd64 node:19-bullseye-slim

WORKDIR /app

COPY . .

RUN yarn install

# ビルド時の引数を受け取る
ARG ENV_FILE
# 環境変数ファイルをコピー
COPY $ENV_FILE .env.production

RUN yarn build

EXPOSE 3000

CMD ["yarn","start"]