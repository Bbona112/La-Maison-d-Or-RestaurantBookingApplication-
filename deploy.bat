@echo off
echo ========================================
echo La Maison d'Or - Restaurant Booking App
echo Deployment Script
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

echo [INFO] This script will prepare your application for deployment.
echo.
echo Options:
echo   1. Install dependencies only
echo   2. Build for production
echo   3. Full deployment (install + build)
echo   4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto install_only
if "%choice%"=="2" goto build_only
if "%choice%"=="3" goto full_deploy
if "%choice%"=="4" goto end
goto invalid_choice

:install_only
echo.
echo [INFO] Installing dependencies...
call install.bat
goto end

:build_only
echo.
echo [INFO] Building for production...
call build.bat
goto end

:full_deploy
echo.
echo [INFO] Running full deployment...
echo.

REM Install dependencies
echo [STEP 1/2] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)

REM Build
echo.
echo [STEP 2/2] Building for production...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Deployment preparation completed!
echo.
echo Your application is ready for deployment:
echo   - Production build: .next directory
echo   - Dependencies: node_modules directory
echo   - Configuration files: All present
echo.
echo Next steps:
echo   1. Copy the entire project to your server
echo   2. Ensure Node.js is installed on the server
echo   3. Run "npm start" on the server
echo   4. Or use a process manager like PM2
echo.
goto end

:invalid_choice
echo [ERROR] Invalid choice. Please select 1-4.
pause
goto end

:end
pause


