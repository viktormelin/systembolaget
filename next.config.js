/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'product-cdn.systembolaget.se',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sb-product-media-prod.azureedge.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
