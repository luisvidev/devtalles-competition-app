/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["media.licdn.com", "pbs.twimg.com", "cdn.sanity.io"],
  },
};

export default nextConfig;
