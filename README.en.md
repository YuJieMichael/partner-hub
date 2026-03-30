# PartnerHub - Full-Stack Job Recruitment Platform

A comprehensive full-stack job recruitment platform built with **Next.js 16** + **NestJS 11** + **PostgreSQL**. Supports three user roles — **Applicant**, **Project Owner**, and **Admin** — with complete workflows for job posting, application, review, role-based access control, and real-time notifications.

> **Complete Demo Project** — Demonstrates full-stack development capabilities, including system architecture design, permission management, notification systems, and production-grade code practices.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Ant Design 6, Tailwind CSS 4, Zustand |
| **Backend** | NestJS 11, Prisma 5, Passport JWT, bcrypt |
| **Database** | PostgreSQL (local or cloud Neon) |
| **Internationalization** | English, French |
| **Containerization** | Docker, Docker Compose |

---

## Key Features

### Applicant
- 🔍 Browse and search all active job posts
- ⭐ Collect (favorite) job posts
- 📝 Apply for jobs - Complete custom questionnaires + upload files (resume, portfolio)
- 👤 Auto-fill saved personal information
- 📊 Track application status (applied → reviewed / rejected)
- 🔔 Receive status change notifications
- 🌍 Country/State cascading selection

### Project Owner
- ✍️ Create job posts from scratch or import from templates
- 📋 Manage reusable job post templates
- 📱 View application list (sorted by unreviewed count)
- ✅ One-click review/reject applications
- 🔴 Badge indicator for posts with pending applications
- 🔔 Receive notifications when new applications arrive

### Admin
- 👥 User management (CRUD + audit trail)
- 🔐 Role and permission management
- 📚 Dictionary management (countries, regions, configuration)
- 📋 Complete audit trail (all change records)

### System Features
- 🔑 JWT authentication + session management
- 🛡️ Role-based navigation and page access control
- 🔔 Notification system (bell icon, unread count, mark as read)
- 📊 Responsive data tables (search, filter, sort, pagination)
- 📤 File upload (UUID naming)
- 💾 Auto-save job post drafts
- 🎯 Cross-page navigation (highlight and scroll to target)
- 🎓 Interactive guided tour (Ant Design Tour)
- 📖 Help documentation (8-page paginated in-app manual)
- 🌐 Full English and French support

---

## Project Structure

```
PartnerHub/
├── backend/                     # NestJS 11 Backend
│   ├── src/
│   │   ├── auth/                # JWT authentication
│   │   ├── users/               # User management
│   │   ├── roles/               # Role management
│   │   ├── permissions/         # Permission management
│   │   ├── job-post/            # Job post CRUD
│   │   ├── job-post-template/   # Job post templates
│   │   ├── application/         # Application management
│   │   ├── applicant-info/      # Applicant information
│   │   ├── notification/        # Notification system
│   │   ├── dictionary/          # Dictionary management
│   │   ├── audit-trail/         # Change logging
│   │   ├── upload/              # File upload
│   │   └── prisma/              # Database service
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema (10 models)
│   │   ├── seed.mjs             # Initialize roles, permissions, dictionary
│   │   └── migrations/          # 21 migration files
│   ├── Dockerfile               # Production image
│   └── package.json
│
├── frontend/                    # Next.js 16 Frontend
│   ├── app/                     # Pages
│   │   ├── login/               # Authentication
│   │   ├── admin/               # Users, roles, permissions, dictionary
│   │   ├── applicant/           # Applicant profile
│   │   ├── template/            # Job post templates
│   │   ├── post/                # Job post creation and details
│   │   └── application/         # Application review details
│   ├── components/              # Shared components
│   │   ├── home/                # Role-based home views (with Tour)
│   │   ├── layout/              # Navigation, menu, breadcrumb
│   │   └── table/               # Reusable data table
│   ├── api/                     # API client functions
│   ├── lib/                     # Utilities, i18n, state, interceptors
│   ├── Dockerfile               # Production image
│   └── package.json
│
├── docker-compose.yml           # Docker Compose configuration
├── start.ps1                    # One-click startup script (PowerShell)
├── stop.ps1                     # One-click stop script (PowerShell)
├── .gitignore
└── README.en.md                 # This file
```

---

## Database Schema

**Core Relationships:**
```
User ──< JobPost ──< Application >── User (applicant)
  │         │
  │         └── questions (JSON)
  │
  ├──< JobPostTemplate
  ├──< Notification
  ├──1 ApplicantInformation
  ├──< AuditTrail
  └──<> Role ──<> Permission

Dictionary (key-value configuration)
```

**10 Models**: User, Role, Permission, Dictionary, AuditTrail, JobPostTemplate, JobPost, ApplicantInformation, Application, Notification

**Enums**: `JobPostState` (active, closed) · `ApplicationState` (applied, reviewed, rejected)

---

## Quick Start

### Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/)) **OR** **Docker** + **Docker Compose**
- **npm** 10+ (automatically installed with Node.js)
- **Git**

### Option 1: Local Startup (Windows PowerShell)

#### 1. Clone and Install Dependencies

```powershell
# Clone the project
git clone <repository-url>
cd partner-hub

# Install root dependencies
npm install

# Install backend dependencies
npm install --prefix backend

# Install frontend dependencies
npm install --prefix frontend
```

#### 2. Configure Database

**Option A: Use Local PostgreSQL**
- Install and start PostgreSQL
- Verify connection string: `postgresql://postgres:postgres@localhost:5432/partnerhub`
- Edit `backend/.env` with the correct connection string

**Option B: Use Docker** (Recommended)
```powershell
# Start the project with Docker and auto-initialization
.\start.ps1 -UseDocker
```

#### 3. Start the Project

```powershell
# Standard startup (PostgreSQL must be running)
.\start.ps1

# Use Docker PostgreSQL (Recommended)
.\start.ps1 -UseDocker

# Skip database initialization
.\start.ps1 -SkipDb

# Skip seed data
.\start.ps1 -SkipSeed
```

### Option 2: Docker Compose (Easiest) ⭐

```powershell
# Build and start all services (PostgreSQL + Backend + Frontend)
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Clean up all data and start fresh
docker-compose down -v
```

### Access the Application

After startup, access in your browser:

| Service | URL | Remark |
|---|---|---|
| **Frontend** | http://localhost:3000 | Main application |
| **Backend API** | http://localhost:3001 | REST API |
| **API Docs** | http://localhost:3001/api | Swagger (if configured) |
| **Health Check** | http://localhost:3001/api/health | Backend status |

### Test Accounts

After running `npm run seed --prefix backend` (or auto-initialization):

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Admin** | admin@example.com | password123 | All permissions |
| **Project Owner** | owner@example.com | password123 | Job and application management |
| **Applicant** | applicant@example.com | password123 | Browse and apply |

---

## Development Workflow

### Frontend Only

```powershell
cd frontend
npm run dev
# Access http://localhost:3000
```

### Backend Only

```powershell
cd backend
npm run start:dev
# API runs on http://localhost:3001
```

### Both Frontend and Backend

```powershell
# Method 1: Use startup script
.\start.ps1

# Method 2: Use npm command
npm run dev
```

### Database Operations

```bash
# Run pending migrations
cd backend && npm run prisma:migrate

# Deploy migrations to production
npm run prisma:migrate:deploy

# Reset database (deletes all data) ⚠️
cd backend
npx prisma migrate reset

# Seed test data
npm run seed --prefix backend

# Open Prisma Studio (visual database editor)
cd backend && npx prisma studio
```

---

## Build for Production

### Local Build

```powershell
# Build frontend
npm run build:frontend

# Build backend
npm run build:backend

# Or build both
npm run build:frontend && npm run build:backend
```

### Build Docker Images

```powershell
# Build individual images
docker build -t partnerhub-backend:latest ./backend
docker build -t partnerhub-frontend:latest ./frontend

# Or use Docker Compose
docker-compose build
```

### Deploy to Production

```bash
# Set production environment variables
set DATABASE_URL="your-production-database-url"
set JWT_SECRET="generate-a-strong-random-key"
set FRONTEND_URL="your-domain.com"

# Run migrations and initialization
cd backend && npm run start:prod

# Using Docker (Recommended)
docker-compose -f docker-compose.prod.yml up -d
```

---

## Stop Services

```powershell
# Stop all local services
.\stop.ps1

# Stop and remove Docker containers
.\stop.ps1 -RemoveDocker

# Or manually stop:
# 1. Press Ctrl+C in the startup PowerShell window
# 2. PostgreSQL will shut down automatically
```

---

## API Endpoints Overview

| Module | Main Endpoints |
|---|---|
| **Authentication** | `POST /api/auth/login` · `GET /api/auth/me` |
| **Users** | `GET /api/users` · `POST /api/users` · `PUT /api/users/:id` |
| **Roles** | `GET /api/roles` · `POST /api/roles` · `DELETE /api/roles/:id` |
| **Permissions** | `GET /api/permissions` · `POST /api/permissions` |
| **Job Posts** | `GET /api/job-posts` · `POST /api/job-posts` · `PATCH /api/job-posts/:id` |
| **Templates** | `GET /api/job-post-templates` · `POST /api/job-post-templates` |
| **Applications** | `POST /api/applications` · `PATCH /api/applications/:id/state` |
| **Notifications** | `GET /api/notifications` · `PATCH /api/notifications/:id/reviewed` |
| **Dictionary** | `GET /api/dictionary` · `POST /api/dictionary` |
| **Upload** | `POST /api/upload` · `GET /api/upload/:filename` |
| **Audit Trail** | `GET /api/audit-trail` |

---

## Environment Variables

### Backend (`backend/.env`)

```env
# Database connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/partnerhub"

# Service configuration
PORT=3001
FRONTEND_URL="http://localhost:3000"

# JWT authentication
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRATION="24h"
```

### Frontend (`frontend/.env.local`)

```env
# API address
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

## Troubleshooting

### PostgreSQL Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution:**
1. Verify PostgreSQL is running
2. Check `DATABASE_URL` in `backend/.env`
3. Use `.\start.ps1 -UseDocker` to run Docker version

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE :::3000` or `:::3001`

**Solution:**
```powershell
# Find process using specific port
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Get-Process -Id <ProcessId> | Stop-Process -Force
```

### Module Not Found Error

**Problem:** `Error: Cannot find module '@nestjs/common'`

**Solution:**
```bash
# Clear and reinstall dependencies
rm -r backend/node_modules backend/package-lock.json
cd backend && npm install
```

### Database Migration Failed

**Problem:** `Error: Migration X failed`

**Solution:**
```bash
# Reset database and rerun migrations ⚠️ deletes all data
cd backend
npx prisma migrate reset
```

---

## Contributing Guide

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is for demonstration purposes. See [LICENSE](LICENSE) for details.

---

## Contact

- **Project Link:** [GitHub Repository](https://github.com/your-username/partner-hub)
- **Bug Reports:** [Issues](https://github.com/your-username/partner-hub/issues)

---

## Related Resources

- 📘 [Next.js Documentation](https://nextjs.org/docs)
- 📘 [NestJS Documentation](https://docs.nestjs.com)
- 📘 [Prisma Documentation](https://www.prisma.io/docs)
- 📘 [PostgreSQL Documentation](https://www.postgresql.org/docs)
- 🐳 [Docker Documentation](https://docs.docker.com)
- 🎨 [Ant Design](https://ant.design)
- 🎨 [Tailwind CSS](https://tailwindcss.com)

---

**Last Updated:** March 30, 2026  
**Version:** 1.0.0  
**Status:** 🔧 In Development
