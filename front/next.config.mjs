/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REGION: process.env.REGION,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    NEXT_AUTH_SECRET:process.env.NEXTAUTH_SECRET
  }
};

export default nextConfig;
