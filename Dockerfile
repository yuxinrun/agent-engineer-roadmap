# ---- 依赖安装阶段 ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install

# ---- 构建阶段（静态导出到 out/）----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV STATIC_EXPORT=1
ENV NEXT_PUBLIC_BASE_PATH=/agent-engineer-roadmap
ENV NEXT_PUBLIC_SITE_URL=https://yuxinrun.github.io/agent-engineer-roadmap
RUN npm run build

# ---- 运行阶段：nginx 托管静态文件 ----
FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
