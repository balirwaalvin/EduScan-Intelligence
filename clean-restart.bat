@echo off
echo ========================================
echo  COMPLETE CACHE CLEAR AND RESTART
echo ========================================
echo.

echo [1/5] Killing all Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo [2/5] Deleting .next cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo .next cache deleted!
) else (
    echo No .next cache found.
)

echo.
echo [3/5] Deleting node_modules cache...
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache"
    echo node_modules cache deleted!
) else (
    echo No node_modules cache found.
)

echo.
echo [4/5] Waiting for file system to settle...
timeout /t 3 /nobreak >nul

echo.
echo [5/5] Starting fresh dev server...
echo.
echo ========================================
echo Server starting with clean cache!
echo Press Ctrl+C to stop when needed
echo ========================================
echo.
npm run dev
