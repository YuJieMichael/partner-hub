# PartnerHub 一键启动脚本
# 使用方法：在 PartnerHub 根目录打开 PowerShell，运行 .\start.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PartnerHub - Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 检查 PostgreSQL
Write-Host "[1/3] Checking PostgreSQL..." -ForegroundColor Yellow
if (Get-Process -Name postgres -ErrorAction SilentlyContinue) {
    Write-Host "  PostgreSQL already running" -ForegroundColor Green
} else {
    Write-Host "  PostgreSQL not running" -ForegroundColor Yellow
    Write-Host "  Please ensure PostgreSQL is running on localhost:5432" -ForegroundColor Yellow
    Write-Host "  Options:" -ForegroundColor Cyan
    Write-Host "    1. Start PostgreSQL service (Windows Services or postgresql CLI)" -ForegroundColor Gray
    Write-Host "    2. Use Docker: docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres" -ForegroundColor Gray
    Write-Host "    3. Install PostgreSQL from https://www.postgresql.org/download/windows/" -ForegroundColor Gray
    Write-Host ""
}

# 2. 启动后端（热重载模式）
Write-Host "[2/3] Starting Backend (Nest.js)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$PSScriptRoot\backend`"; npm run start:dev" -WindowStyle Normal
Write-Host "  Backend starting on http://localhost:3001" -ForegroundColor Green
Start-Sleep -Seconds 2

# 3. 启动前端（热重载模式）
Write-Host "[3/3] Starting Frontend (Next.js)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd `"$PSScriptRoot\frontend`"; npm run dev" -WindowStyle Normal
Write-Host "  Frontend starting on http://localhost:3000" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  All services started!" -ForegroundColor Cyan
Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:   http://localhost:3001" -ForegroundColor White
Write-Host "  Health:    http://localhost:3001/api/health" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
