/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma", "bcryptjs"],
  typescript: {
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
