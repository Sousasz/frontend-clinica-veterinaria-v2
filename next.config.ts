import withPWA from "next-pwa";
import path from "path";

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
  webpack: (config: any) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // alias to workaround package `exports` pointing to a missing .mjs
      'class-variance-authority$': path.resolve(__dirname, 'node_modules', 'class-variance-authority', 'dist', 'index.js'),
    };
    return config;
  },
};

export default withPWA({
  dest: "public",
  disable: !isProd,
  register: true,
  skipWaiting: true,
})(nextConfig);
