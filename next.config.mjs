/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 静态导出，用于 GitHub Pages 等纯静态托管
  output: "export",
  // GitHub Pages 项目站点子路径
  basePath: "/agent-engineer-roadmap",
  assetPrefix: "/agent-engineer-roadmap",
  // 静态导出无需图片优化
  images: { unoptimized: true },
  // 尾斜杠便于 GitHub Pages 以目录形式提供页面
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
