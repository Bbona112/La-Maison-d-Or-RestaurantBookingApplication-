@echo off
echo ========================================
echo La Maison d'Or - Restaurant Booking App
echo Starting Production Server
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if build exists
if not exist ".next" (
    echo [WARNING] Production build not found. Building now...
    call build.bat
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Build failed. Cannot start production server.
        pause
        exit /b 1
    )
)

REM Check if data directory exists
if not exist "data" (
    echo [INFO] Creating data directory...
    mkdir data
)

REM Check if tables.json exists
if not exist "data\tables.json" (
    echo [ERROR] data\tables.json not found!
    echo Please ensure the data directory and tables.json file exist.
    pause
    exit /b 1
)

echo [INFO] Starting Next.js production server...
echo [INFO] Server will be available at http://localhost:3000
echo [INFO] Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

REM Start the production server
call npm start

pause



