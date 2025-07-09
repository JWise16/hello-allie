import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["openai"],
  webpack: (config, { isServer }) => {
    // Handle the missing module issue
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Ignore the problematic module
    config.externals = config.externals || [];
    config.externals.push({
      '@modelcontextprotocol/sdk/types.js': 'commonjs @modelcontextprotocol/sdk/types.js',
    });
    
    // Add node polyfills for browser environment
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
