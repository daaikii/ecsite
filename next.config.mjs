/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    reactStrictMode: true,
    swcMinify: true,
    output:'standalone',
  },
  images: {
    domains: [`${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`]
  },
};

export default nextConfig;
