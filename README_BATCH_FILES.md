# Batch Files for Windows Installation & Deployment

This project includes several batch files (`.bat`) to simplify installation, development, and deployment on Windows systems.

## 📋 Available Batch Files

### 🚀 Quick Start

#### `setup.bat` - Complete Setup (Recommended for First Time)
**Use this if:** You're setting up the project for the first time.

**What it does:**
- Checks Node.js installation
- Creates data directory structure
- Creates default configuration files
- Installs all dependencies

**Usage:**
```batch
setup.bat
```

---

### 🔧 Development

#### `install.bat` - Install Dependencies Only
**Use this if:** You only need to install/update dependencies.

**What it does:**
- Checks Node.js and npm
- Installs/updates npm packages
- Verifies installation

**Usage:**
```batch
install.bat
```

#### `start-dev.bat` - Start Development Server
**Use this if:** You want to run the app in development mode.

**What it does:**
- Checks prerequisites
- Installs dependencies if needed
- Starts Next.js development server
- Opens at http://localhost:3000

**Usage:**
```batch
start-dev.bat
```

---

### 🏗️ Production

#### `build.bat` - Build for Production
**Use this if:** You want to create a production build.

**What it does:**
- Checks prerequisites
- Installs dependencies if needed
- Creates optimized production build
- Outputs to `.next` directory

**Usage:**
```batch
build.bat
```

#### `start-prod.bat` - Start Production Server
**Use this if:** You want to run the production build locally.

**What it does:**
- Checks if build exists (builds if needed)
- Starts Next.js production server
- Optimized for production

**Usage:**
```batch
start-prod.bat
```

---

### 🚢 Deployment

#### `deploy.bat` - Deployment Preparation
**Use this if:** You're preparing to deploy to a server.

**What it does:**
- Interactive menu for deployment options
- Option 1: Install dependencies only
- Option 2: Build for production only
- Option 3: Full deployment (install + build)

**Usage:**
```batch
deploy.bat
```

---

## 📝 Typical Workflows

### First Time Setup
```batch
1. Run: setup.bat
2. Wait for installation to complete
3. Run: start-dev.bat
4. Open browser to http://localhost:3000
```

### Daily Development
```batch
1. Run: start-dev.bat
2. Make your changes
3. Server auto-reloads on file changes
```

### Production Deployment
```batch
1. Run: deploy.bat
2. Select option 3 (Full deployment)
3. Copy entire project to server
4. On server, run: npm start
```

### Update Dependencies
```batch
1. Run: install.bat
2. Dependencies will be updated
```

---

## ⚙️ Prerequisites

All batch files check for:
- ✅ Node.js (version 18.x or higher)
- ✅ npm (comes with Node.js)

**If Node.js is not installed:**
1. Download from: https://nodejs.org/
2. Install Node.js (includes npm)
3. Restart your command prompt
4. Run the batch files again

---

## 🔍 What Each Script Checks

### Prerequisites Check
- Node.js installation
- npm availability
- Node.js version display

### File Structure Check
- `data/` directory existence
- `data/tables.json` existence
- `data/bookings.json` existence
- `node_modules/` directory

### Auto-Fix Features
- Creates `data/` directory if missing
- Creates `bookings.json` if missing
- Installs dependencies if `node_modules/` is missing
- Builds project if `.next/` is missing (for production)

---

## 🐛 Troubleshooting

### "Node.js is not installed"
- Install Node.js from https://nodejs.org/
- Restart command prompt after installation
- Verify with: `node --version`

### "npm install failed"
- Check internet connection
- Try running: `npm install` manually
- Check if antivirus is blocking npm

### "Port 3000 already in use"
- Close other applications using port 3000
- Or modify `package.json` scripts to use a different port
- Or set environment variable: `set PORT=3001`

### "Build failed"
- Ensure all dependencies are installed: `install.bat`
- Check for TypeScript errors
- Verify all files are present

---

## 💡 Tips

1. **Always run `setup.bat` first** when cloning the repository
2. **Use `start-dev.bat`** for development (includes hot reload)
3. **Use `build.bat` + `start-prod.bat`** to test production build locally
4. **Use `deploy.bat`** before deploying to production servers

---

## 📞 Support

If you encounter issues:
1. Check the error message in the command prompt
2. Verify Node.js is installed: `node --version`
3. Check npm: `npm --version`
4. Review the troubleshooting section above

---

**Note:** These batch files are designed for Windows. For Linux/Mac, use the equivalent shell scripts or run npm commands directly.



