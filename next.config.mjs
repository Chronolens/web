/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
   {
      protocol: "https",
      hostname: "**",
    },
   ],
    domains: ["10.0.0.50"],
  },
};

export default nextConfig;
