@echo off
echo ========================================
echo La Maison d'Or - Restaurant Booking App
echo Complete Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Minimum version required: Node.js 18.x or higher
    echo.
    echo After installing Node.js, run this script again.
    pause
    exit /b 1
)

REM Display Node.js and npm versions
echo [INFO] Node.js version:
node --version
echo [INFO] npm version:
npm --version
echo.

REM Check if data directory exists
if not exist "data" (
    echo [INFO] Creating data directory...
    mkdir data
    echo [SUCCESS] Data directory created.
) else (
    echo [INFO] Data directory already exists.
)
echo.

REM Check if tables.json exists
if not exist "data\tables.json" (
    echo [WARNING] data\tables.json not found!
    echo [INFO] Creating default tables.json...
    echo [{"id":"table-a","name":"Table A","shape":"round","x":150,"y":150,"radius":50,"seats":[{"id":1,"x":150,"y":90,"angle":0},{"id":2,"x":210,"y":150,"angle":60},{"id":3,"x":150,"y":210,"angle":120},{"id":4,"x":90,"y":150,"angle":180},{"id":5,"x":120,"y":100,"angle":240},{"id":6,"x":180,"y":100,"angle":300}],"available":true},{"id":"table-b","name":"Table B","shape":"rectangle","x":400,"y":200,"width":120,"height":60,"seats":[{"id":1,"x":400,"y":170},{"id":2,"x":520,"y":200},{"id":3,"x":400,"y":230},{"id":4,"x":280,"y":200}],"available":true},{"id":"table-c","name":"Table C","shape":"square","x":250,"y":400,"width":80,"height":80,"seats":[{"id":1,"x":250,"y":360},{"id":2,"x":330,"y":400},{"id":3,"x":250,"y":440},{"id":4,"x":170,"y":400},{"id":5,"x":290,"y":360},{"id":6,"x":330,"y":440},{"id":7,"x":210,"y":440},{"id":8,"x":170,"y":360}],"available":true}] > data\tables.json
    echo [SUCCESS] Default tables.json created.
) else (
    echo [INFO] tables.json already exists.
)
echo.

REM Check if bookings.json exists
if not exist "data\bookings.json" (
    echo [INFO] Creating bookings.json...
    echo [] > data\bookings.json
    echo [SUCCESS] bookings.json created.
) else (
    echo [INFO] bookings.json already exists.
)
echo.

REM Install dependencies
echo [INFO] Installing dependencies...
echo This may take a few minutes...
echo.

call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies.
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo [SUCCESS] Setup completed successfully!
echo ========================================
echo.
echo Your application is ready to use!
echo.
echo Quick start commands:
echo   - Development: Run "start-dev.bat"
echo   - Production build: Run "build.bat"
echo   - Production server: Run "start-prod.bat"
echo.
echo The development server will be available at:
echo   http://localhost:3000
echo.
pause



