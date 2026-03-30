# PartnerHub 一键启动脚本
# 使用方法：在 PartnerHub 根目录打开 PowerShell，运行 .\start.ps1
# 
# 功能：
# 1. 检查和启动 PostgreSQL（支持 Docker 或本地）
# 2. 初始化数据库（迁移 + 种子数据）
# 3. 启动后端（NestJS）
# 4. 启动前端（Next.js）

param(
    [switch]$UseDocker = $false,
    [switch]$SkipDb = $false,
    [switch]$SkipSeed = $false
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PartnerHub - Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 配置
$PostgresContainer = "partnerhub-postgres"
$PostgresPort = 5432
$PostgresDb = "partnerhub"
$PostgresUser = "postgres"
$PostgresPassword = "postgres"
$MaxWaitTime = 30

# 1. 检查和启动 PostgreSQL
Write-Host "[1/5] Checking PostgreSQL..." -ForegroundColor Yellow

$PostgresRunning = $false

if ($UseDocker) {
    # Docker 模式
    Write-Host "  Using Docker PostgreSQL" -ForegroundColor Cyan
    
    # 检查容器是否存在并运行
    $containerExists = docker ps -a --format "table {{.Names}}" | Select-String "^$PostgresContainer$"
    
    if ($containerExists) {
        $containerRunning = docker ps --format "table {{.Names}}" | Select-String "^$PostgresContainer$"
        if ($containerRunning) {
            Write-Host "  ✅ Docker container '$PostgresContainer' already running" -ForegroundColor Green
            $PostgresRunning = $true
        } else {
            Write-Host "  Starting Docker container '$PostgresContainer'..." -ForegroundColor Cyan
            docker start $PostgresContainer | Out-Null
            Start-Sleep -Seconds 2
            $PostgresRunning = $true
        }
    } else {
        Write-Host "  Creating and starting Docker PostgreSQL container..." -ForegroundColor Cyan
        docker run `
            --name $PostgresContainer `
            -e "POSTGRES_USER=$PostgresUser" `
            -e "POSTGRES_PASSWORD=$PostgresPassword" `
            -e "POSTGRES_DB=$PostgresDb" `
            -p "$PostgresPort`:5432" `
            -d `
            postgres:latest | Out-Null
        
        Write-Host "  Waiting for PostgreSQL to be ready..." -ForegroundColor Cyan
        Start-Sleep -Seconds 3
        $PostgresRunning = $true
    }
} else {
    # 本地 PostgreSQL 模式
    if (Get-Process -Name postgres -ErrorAction SilentlyContinue) {
        Write-Host "  ✅ PostgreSQL already running" -ForegroundColor Green
        $PostgresRunning = $true
    } else {
        Write-Host "  ⚠️  PostgreSQL not running" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  Options to start PostgreSQL:" -ForegroundColor Cyan
        Write-Host "    1. Use Docker (recommended):" -ForegroundColor White
        Write-Host "       .\start.ps1 -UseDocker" -ForegroundColor Gray
        Write-Host ""
        Write-Host "    2. Start PostgreSQL service:" -ForegroundColor White
        Write-Host "       - Windows Services: net start postgresql-x64-15" -ForegroundColor Gray
        Write-Host "       - Or use pgAdmin" -ForegroundColor Gray
        Write-Host ""
        Write-Host "    3. Install PostgreSQL:" -ForegroundColor White
        Write-Host "       https://www.postgresql.org/download/windows/" -ForegroundColor Gray
        Write-Host ""
    }
}

if (-not $PostgresRunning) {
    Write-Host "  ❌ PostgreSQL not available. Please start it manually or use -UseDocker flag" -ForegroundColor Red
    exit 1
}

# 2. 初始化数据库
if (-not $SkipDb) {
    Write-Host ""
    Write-Host "[2/5] Initializing Database..." -ForegroundColor Yellow
    
    try {
        Push-Location "$PSScriptRoot\backend"
        
        # 2a. 运行 Prisma 迁移
        Write-Host "  Running database migrations..." -ForegroundColor Cyan
        npm run prisma:migrate 2>&1 | Select-String "^(?!npm)" -ErrorAction SilentlyContinue
        
        # 2b. 运行种子数据（如果未跳过）
        if (-not $SkipSeed) {
            Write-Host "  Seeding database with initial data..." -ForegroundColor Cyan
            npm run seed 2>&1 | Select-String "^(?!npm)" -ErrorAction SilentlyContinue
            Write-Host "  ✅ Database initialized" -ForegroundColor Green
        }
        
        Pop-Location
    } catch {
        Write-Host "  ❌ Database initialization failed: $_" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "[3/5] Starting Backend (NestJS)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$PSScriptRoot\backend`"; npm run start:dev" -WindowStyle Normal
Write-Host "  ✅ Backend starting on http://localhost:3001" -ForegroundColor Green
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "[4/5] Starting Frontend (Next.js)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$PSScriptRoot\frontend`"; npm run dev" -WindowStyle Normal
Write-Host "  ✅ Frontend starting on http://localhost:3000" -ForegroundColor Green

Write-Host ""
Write-Host "[5/5] Installation Complete" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ All services started successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  🌐 Frontend:      http://localhost:3000" -ForegroundColor White
Write-Host "  🔧 Backend API:   http://localhost:3001" -ForegroundColor White
Write-Host "  ❤️  Health Check:  http://localhost:3001/api/health" -ForegroundColor White
Write-Host ""
Write-Host "  📝 Default Test Accounts:" -ForegroundColor Cyan
Write-Host "     Admin:     admin@example.com / password123" -ForegroundColor Gray
Write-Host "     Owner:     owner@example.com / password123" -ForegroundColor Gray
Write-Host "     Applicant: applicant@example.com / password123" -ForegroundColor Gray
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
