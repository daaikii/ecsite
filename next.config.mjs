/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
  swcMinify: true,
  output:'standalone',
  experimental:{
    appDir: true,
  },
    // // webpack設定を直接次のように定義
    // webpack(config, { isServer }) {
    //   config.watchOptions = {
    //     aggregateTimeout: 300, // 300ms待ってから再ビルド
    //     poll: 1000, // 1秒ごとにポーリング
    //   };
  
    //   // 追加の設定が必要な場合はここに記述
  
    //   return config;
    // },
  

  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  },

  images: {
    domains: [`${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`]
  },
};

export default nextConfig;
