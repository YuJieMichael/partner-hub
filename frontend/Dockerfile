# 前端 Dockerfile - Next.js 应用

# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制应用代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:20-alpine

WORKDIR /app

# 只复制必要的生产依赖
COPY package*.json ./
RUN npm ci --only=production

# 从构建阶段复制构建输出
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["npm", "start"]
