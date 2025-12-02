import withPWA from "next-pwa";
import path from "path";
import type { Configuration } from 'webpack';

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "picsum.photos",
        pathname: "/id/237/200/300",
      },
    ],
  },
  webpack: (config: Configuration) => {
    // ensure resolve and alias exist on the config object
    // Using typed Configuration avoids `any` in the signature
    const cfg = config as Configuration & { resolve?: { alias?: Record<string, string> } };
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      // alias to workaround package `exports` pointing to a missing .mjs
      'class-variance-authority$': path.resolve(__dirname, 'node_modules', 'class-variance-authority', 'dist', 'index.js'),
    };
    return cfg;
  },
};

export default withPWA({
  dest: "public",
  disable: !isProd,
  register: true,
  skipWaiting: true,
})(nextConfig);
