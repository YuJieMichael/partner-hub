# PartnerHub Quick Start Guide

## ⚡ Get Started in 30 Seconds

Copy and paste the command below to start the project in one click:

```powershell
cd c:\Users\yujie\Documents\GitHub\partner-hub
.\start.ps1 -UseDocker
```

After completion, visit:
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:3001

### Test Account
- Email: `admin@example.com` 
- Password: `password123`

---

## 📋 Project Improvements Summary

### New Features
✅ Docker Support - Start the entire environment with one click  
✅ Automatic Database Initialization - Auto-run migrations and seed data  
✅ Enhanced Startup Script - Support Docker or local PostgreSQL  
✅ Complete Documentation - English and French quick-start guide  
✅ Security Fixes - 0 known vulnerabilities  

### File Checklist
| File | Status | Description |
|---|---|---|
| `backend/.env` | ✅ New | Environment variables |
| `backend/.env.example` | ✅ New | Configuration template |
| `backend/prisma/seed.mjs` | ✅ New | Database seed |
| `backend/Dockerfile` | ✅ New | Backend image |
| `frontend/Dockerfile` | ✅ New | Frontend image |
| `docker-compose.yml` | ✅ New | Docker orchestration |
| `start.ps1` | ✅ Improved | Enhanced startup script |
| `stop.ps1` | ✅ Improved | Improved stop script |
| `README.md` | ✅ Improved | Complete documentation |
| `README.en.md` | ✅ New | English documentation |
| `README.fr.md` | ✅ New | French documentation |
| `IMPROVEMENTS.md` | ✅ New | Improvement summary |
| `QUICKSTART.md` | ✅ New | Original quick start |
| `QUICKSTART.en.md` | ✅ New | This file |
| `QUICKSTART.fr.md` | ✅ New | French quick start |

---

## 🎯 Next Steps

### 1. Start the Project
```powershell
.\start.ps1 -UseDocker
```

### 2. Wait for Services to Start
- 📊 Database: Auto-start (3-5 seconds)
- 🔨 Backend: Auto-initialize and start (10-15 seconds)
- 🎨 Frontend: Auto-build and start (20-30 seconds)

### 3. Open in Browser
- Visit http://localhost:3000
- Enter email: `admin@example.com`
- Enter password: `password123`

### 4. Stop Services
```powershell
.\stop.ps1
```

---

## ⚙️ Other Startup Methods

### Using Local PostgreSQL
```powershell
# PostgreSQL must be installed and running first
.\start.ps1
```

### Manual Start (for debugging)
```powershell
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Docker Compose
```powershell
# Start
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop
docker-compose down
```

---

## 🔑 Test Accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@example.com | password123 |
| Owner | owner@example.com | password123 |
| Applicant | applicant@example.com | password123 |

---

## 📖 Full Documentation

See [README.en.md](README.en.md) and [IMPROVEMENTS.md](IMPROVEMENTS.md)

---

**Enjoy!** 🎉
