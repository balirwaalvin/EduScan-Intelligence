@echo off
echo ========================================
echo  EduScan - Attendance Tracking System
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/4] Installing dependencies...
    call npm install
    echo.
) else (
    echo [1/4] Dependencies already installed.
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo [2/4] Creating .env file...
    copy .env.example .env
    echo Please update the .env file with your database credentials.
    echo.
    pause
) else (
    echo [2/4] Environment file exists.
    echo.
)

REM Generate Prisma Client
echo [3/4] Generating Prisma Client...
call npx prisma generate
echo.

REM Start the development server
echo [4/4] Starting development server...
echo.
echo ========================================
echo  EduScan is running!
echo  Open http://localhost:3000 in your browser
echo ========================================
echo.
call npm run dev
