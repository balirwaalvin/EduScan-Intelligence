@echo off
echo ================================================
echo  Restarting EduScan Dev Server with Clean Cache
echo ================================================
echo.

echo [1/3] Stopping any running Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo [2/3] Clearing Next.js cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo Cache cleared!
) else (
    echo No cache found.
)

echo.
echo [3/3] Starting dev server...
echo.
npm run dev
