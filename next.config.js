/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  ...nextConfig, 
  images: {
    domains: ['sjvdjiblyhtpmryrmrlr.supabase.co'],
  },
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
