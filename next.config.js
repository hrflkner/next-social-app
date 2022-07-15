/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['lh3.googleusercontent.com'],
        minimumCacheTTL: 1500000,
    },
    swcMinify: true,
};

module.exports = nextConfig;
