/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    NEXT_AUTH_SECRET:process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY:process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  },
  images: {
    domains: [`${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`]
  },
};

export default nextConfig;
