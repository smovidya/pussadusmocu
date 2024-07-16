/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        pathname: "/images/*",
        hostname: "smo-api.bunyawatapp37204.workers.dev",
      },
    ],
  },
  output: "export",
};

export default config;
