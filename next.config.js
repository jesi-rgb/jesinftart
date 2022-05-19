/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ipfs.io", // IPFS links
    ],
  },
};

module.exports = nextConfig;
