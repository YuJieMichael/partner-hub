# PartnerHub 一键停止脚本
# 使用方法：在 PartnerHub 根目录打开 PowerShell，运行 .\stop.ps1
# 
# 功能：
# 1. 停止前端进程
# 2. 停止后端进程
# 3. 停止/移除 Docker 容器（可选）

param(
    [switch]$RemoveDocker = $false
)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PartnerHub - Stopping All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. 停止 Node.js 进程（前端 + 后端）
Write-Host "[1/3] Stopping Node.js processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "  ✅ Frontend & Backend stopped" -ForegroundColor Green
} else {
    Write-Host "  ℹ️  No Node.js processes running" -ForegroundColor DarkGray
}

# 2. 尝试停止 PostgreSQL
Write-Host ""
Write-Host "[2/3] Stopping PostgreSQL..." -ForegroundColor Yellow
$postgresProcess = Get-Process -Name postgres -ErrorAction SilentlyContinue
if ($postgresProcess) {
    $postgresProcess | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "  ✅ PostgreSQL stopped" -ForegroundColor Green
} else {
    Write-Host "  ℹ️  PostgreSQL not running (local)" -ForegroundColor DarkGray
}

# 3. 停止 Docker 容器（可选）
if ($RemoveDocker) {
    Write-Host ""
    Write-Host "[3/3] Removing Docker containers..." -ForegroundColor Yellow
    
    # 停止容器
    docker stop partnerhub-postgres partnerhub-backend partnerhub-frontend -ErrorAction SilentlyContinue | Out-Null
    Write-Host "  ✅ Docker containers stopped" -ForegroundColor Green
    
    # 移除容器
    docker rm partnerhub-postgres partnerhub-backend partnerhub-frontend -ErrorAction SilentlyContinue | Out-Null
    Write-Host "  ✅ Docker containers removed" -ForegroundColor Green
}

# 4. 清理锁文件
$lockFile = "$PSScriptRoot\frontend\.next\dev\lock"
if (Test-Path $lockFile) {
    Remove-Item -Force $lockFile -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ All services stopped" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
