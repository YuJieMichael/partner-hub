# PartnerHub 快速启动指南

## ⚡ 30 秒快速开始

复制粘贴以下命令，一键启动项目：

```powershell
cd c:\Users\yujie\Documents\GitHub\partner-hub
.\start.ps1 -UseDocker
```

完成后访问：
- 🌐 前端：http://localhost:3000
- 🔧 后端：http://localhost:3001

### 测试账户
- 邮箱：`admin@example.com` 
- 密码：`password123`

---

## 📋 Project 改进摘要

### 新增功能
✅ Docker 支持 - 一键启动整个环境  
✅ 数据库自动初始化 - 自动运行迁移和种子数据  
✅ 启动脚本增强 - 支持 Docker 或本地 PostgreSQL  
✅ 完整文档 - 中文快速开始和故障排除指南  
✅ 安全修复 - 0 个已知漏洞  

### 文件清单
| 文件 | 状态 | 说明 |
|---|---|---|
| `backend/.env` | ✅ 新增 | 环境变量 |
| `backend/.env.example` | ✅ 新增 | 配置模板 |
| `backend/prisma/seed.mjs` | ✅ 新增 | 数据库种子 |
| `backend/Dockerfile` | ✅ 新增 | 后端镜像 |
| `frontend/Dockerfile` | ✅ 新增 | 前端镜像 |
| `docker-compose.yml` | ✅ 新增 | Docker 编排 |
| `start.ps1` | ✅ 改进 | 增强启动脚本 |
| `stop.ps1` | ✅ 改进 | 改进停止脚本 |
| `README.md` | ✅ 改进 | 完整文档 |
| `IMPROVEMENTS.md` | ✅ 新增 | 改进总结 |
| `QUICKSTART.md` | ✅ 新增 | 本文件 |

---

## 🎯 下一步操作

### 1. 启动项目
```powershell
.\start.ps1 -UseDocker
```

### 2. 等待服务启动
- 📊 数据库：自动启动（约 3-5 秒）
- 🔨 后端：自动初始化并启动（约 10-15 秒）
- 🎨 前端：自动构建并启动（约 20-30 秒）

### 3. 打开浏览器
- 访问 http://localhost:3000
- 输入邮箱：`admin@example.com`
- 输入密码：`password123`

### 4. 停止服务
```powershell
.\stop.ps1
```

---

## ⚙️ 其他启动方式

### 使用本地 PostgreSQL
```powershell
# 需要先安装并启动 PostgreSQL
.\start.ps1
```

### 手动启动（调试用）
```powershell
# 终端 1 - 后端
cd backend
npm run start:dev

# 终端 2 - 前端
cd frontend
npm run dev
```

### Docker Compose
```powershell
# 启动
docker-compose up --build

# 后台运行
docker-compose up -d --build

# 停止
docker-compose down
```

---

## 🔑 测试账户

| 角色 | 邮箱 | 密码 |
|---|---|---|
| Admin | admin@example.com | password123 |
| Owner | owner@example.com | password123 |
| Applicant | applicant@example.com | password123 |

---

## 📖 完整文档

详见 [README.md](README.md) 和 [IMPROVEMENTS.md](IMPROVEMENTS.md)

---

**祝使用愉快！** 🎉
