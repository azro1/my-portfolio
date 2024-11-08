/** 
 * @type {import('next').NextConfig} 
 */

const nextConfig = {
  reactStrictMode: true, 
  swcMinify: true, 
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['localhost', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'cdn.discordapp.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'sjvdjiblyhtpmryrmrlr.supabase.co',
      port: '',
      pathname: '/storage/v1/object/sign/avatars/**'
    }]     
  },
}

module.exports = {
  ...nextConfig, 
    webpack: ( config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack } ) => {
      if (isServer) { 
        config.externals.push({ 
          bufferutil: "bufferutil", 
          "utf-8-validate": "utf-8-validate", 
        }); 
      }
      return config; 
  }
}
