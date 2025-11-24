@echo off
echo ========================================
echo La Maison d'Or - Restaurant Booking App
echo Installation Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    echo Minimum version required: Node.js 18.x or higher
    pause
    exit /b 1
)

REM Check Node.js version
echo [INFO] Checking Node.js version...
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [INFO] Found Node.js version: %NODE_VERSION%
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed or not in PATH.
    pause
    exit /b 1
)

echo [INFO] npm version:
npm --version
echo.

REM Check if node_modules exists
if exist "node_modules" (
    echo [INFO] node_modules directory found.
    echo [INFO] Running npm install to update dependencies...
) else (
    echo [INFO] Installing dependencies...
)

REM Install dependencies
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Installation completed successfully!
echo.
echo Next steps:
echo   1. Run "start-dev.bat" to start the development server
echo   2. Or run "build.bat" to build for production
echo   3. Or run "deploy.bat" for production deployment
echo.
pause



