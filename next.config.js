/** 
 * @type {import('next').NextConfig} 
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sjvdjiblyhtpmryrmrlr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/avatars/**'
      },
      {
        protocol: 'https',
        hostname: 'sjvdjiblyhtpmryrmrlr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/sign/messages/**'
      }
    ]
  },
}

module.exports = {
  ...nextConfig,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    if (isServer) {
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
      });
    }
    return config;
  }
}
