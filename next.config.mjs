// GitHub Pages 是纯静态托管，需用 STATIC_EXPORT=1 生成 out/ 目录；
// 其余部署（本地 / Vercel / Docker）保持 standalone 产物。
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = staticExport
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "")
  : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  output: staticExport ? "export" : "standalone",
  ...(basePath ? { basePath, trailingSlash: true } : {}),
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
