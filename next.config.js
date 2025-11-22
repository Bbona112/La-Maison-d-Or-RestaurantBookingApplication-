/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fix for Konva.js with Next.js - prevent canvas module resolution
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
      };
    }
    
    // Ignore canvas module during build
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    
    // Add externals to prevent bundling canvas
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'commonjs canvas',
      });
    }
    
    return config;
  },
}

module.exports = nextConfig
