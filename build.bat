@echo off
echo ========================================
echo La Maison d'Or - Restaurant Booking App
echo Building for Production
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

REM Check if node_modules exists
if not exist "node_modules" (
    echo [WARNING] Dependencies not installed. Running installation...
    call install.bat
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Installation failed. Cannot build.
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

echo [INFO] Building Next.js application...
echo.

REM Build the application
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Build completed successfully!
echo [INFO] Production build is ready in the .next directory
echo.
echo Next steps:
echo   1. Run "start-prod.bat" to start the production server
echo   2. Or deploy the .next directory to your hosting provider
echo.
pause


