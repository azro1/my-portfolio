/** 
 * @type {import('next').NextConfig} 
 */

const nextConfig = {
  reactStrictMode: true, 
  swcMinify: true, 
  images: {  
    domains: [
      'sjvdjiblyhtpmryrmrlr.supabase.co',  
    ],     
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
