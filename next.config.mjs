/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    // ⚠️ Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
