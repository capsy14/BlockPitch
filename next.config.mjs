/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features (if necessary)
    experimental: {
      esmExternals: true, // To ensure support for ES Modules
    },
  
    // Webpack configuration for resolving paths
    webpack(config) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'), // Set up the alias for @ to point to src/
      };
      return config;
    },
  
    // Any other Next.js configurations
  };
  
  export default nextConfig;
  