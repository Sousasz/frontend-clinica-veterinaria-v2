import withPWA from "next-pwa";

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
};

export default withPWA({
  dest: "public",
  disable: !isProd,
  register: true,
  skipWaiting: true,
})(nextConfig);
