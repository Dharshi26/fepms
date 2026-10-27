# FEPMS Quick Start — Get Authentication Working in 5 Minutes

## Problem
Authentication (login/registration) isn't working because MongoDB isn't configured.

## Solution: Use Docker (Easiest)

### Step 1: Install Docker Desktop
- Download: https://www.docker.com/products/docker-desktop
- Install and restart your computer
- Verify: Open PowerShell/Terminal and type `docker --version`

### Step 2: Start MongoDB Container
```powershell
# Windows PowerShell
docker run -d --name fepms-mongo -p 27017:27017 mongo

# Verify it's running
docker ps | findstr fepms-mongo
```

You should see:
```
fepms-mongo     mongo     Up 2 minutes     0.0.0.0:27017->27017/tcp
```

### Step 3: Update Backend Configuration
Edit `backend/.env`:

**Change this:**
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fepms?retryWrites=true&w=majority
```

**To this:**
```env
MONGO_URI=mongodb://localhost:27017/fepms
```

### Step 4: Start the Backend
```powershell
cd backend
npm start
```

You should see:
```
✅  MongoDB connected: localhost
✅  FEPMS Backend running on port 5000 [development]
```

### Step 5: Start the Frontend
In a new terminal:
```powershell
cd client
npm run dev
```

Visit: http://localhost:5173

### Step 6: Test Registration
1. Click "Register"
2. Enter:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "Password123"
3. Click "Create Account"

**Expected:** Should redirect to dashboard ✅

### Step 7: Test Login
1. Click profile icon (top right) → Logout
2. Email: test@example.com
3. Password: Password123
4. Click "Sign In"

**Expected:** Should redirect to dashboard ✅

---

## Stopping MongoDB

When you're done:
```powershell
docker stop fepms-mongo
docker rm fepms-mongo
```

## Restarting Next Time

```powershell
# Just restart the container with the same settings
docker run -d --name fepms-mongo -p 27017:27017 mongo
```

---

## If Docker Doesn't Work

See `AUTH_SETUP_GUIDE.md` for alternative options:
- Local MongoDB installation
- MongoDB Atlas (cloud)

---

## Troubleshooting

### "docker: command not found"
- Docker Desktop is not installed or not in PATH
- Restart terminal/computer after installing
- Verify: `docker --version`

### "Port 27017 is already in use"
- Another container is using it
- Kill existing: `docker rm -f fepms-mongo`
- Then run the start command again

### Backend shows "MONGO_URI not configured"
- Edit `backend/.env` and ensure MONGO_URI is set
- Remove `<username>` and `<password>` placeholders
- Use: `mongodb://localhost:27017/fepms`
- Restart backend

### "Connection refused" error in browser
- Backend is not running
- Terminal 1: `cd backend && npm start`
- Terminal 2: `cd client && npm run dev`
- Both must be running

### Registering returns error
- Check backend terminal for detailed error
- Share the error from the backend logs
- Email should be unique (can't register twice with same email)

---

## Next: Phase 4 Development

Once authentication is working:
1. Review PHASE_2_AUTH_VERIFICATION.md to confirm all tests pass
2. You're ready to start Phase 4 — Equipment Management
3. See README.md for project structure overview

Good luck! 🚀
