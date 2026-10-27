# 🚀 START HERE — Login/Registration Not Working? Here's Why & How to Fix

## The Problem (2 Minutes to Understand)

Your FEPMS system has 3 parts:

1. ✅ **Backend API** (running on port 5000)
2. ✅ **Frontend App** (ready on port 5173)
3. ❌ **MongoDB Database** (NOT running)

**Without a database, login and registration CANNOT work.**

---

## The Solution (Choose ONE)

### ⭐ FASTEST: MongoDB Atlas (No Installation)

**Time: 10-15 minutes**

MongoDB Atlas is a free cloud database. Takes just 5 steps:

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0)
4. Create user: `fepms_user`
5. Get connection string

Then:
- Update `backend/.env` with the connection string
- Restart backend: `Ctrl+C`, then `npm start`
- Test at http://localhost:5173

**Done! ✅**

---

### Option 2: Docker Desktop

Download Docker: https://www.docker.com/products/docker-desktop

Then in PowerShell:
```powershell
docker run -d -p 27017:27017 --name fepms-mongo mongo
```

Update `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/fepms
```

Restart backend, then test.

**Time: 15 minutes**

---

### Option 3: MongoDB Community (Local)

Download: https://www.mongodb.com/try/download/community

Update `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/fepms
```

Restart backend, then test.

**Time: 20 minutes**

---

## Step-by-Step for MongoDB Atlas (RECOMMENDED)

### 1. Create Account (2 minutes)

- Go to https://www.mongodb.com/cloud/atlas
- Click "Try Free"
- Enter email and password
- Verify your email
- Login

### 2. Create Cluster (3 minutes)

- Click "Create a Deployment"
- Choose "M0 Free" (completely free)
- Select your region
- Click "Create"
- Wait for cluster to be created

### 3. Create Database User (1 minute)

- Go to "Database Access" (left menu)
- Click "Add New Database User"
- Username: `fepms_user`
- Password: Generate or create your own
- **COPY THE PASSWORD** (you'll need it!)
- Click "Add User"

### 4. Allow Network Access (1 minute)

- Go to "Network Access" (left menu)
- Click "Add IP Address"
- Select "Allow Access from Anywhere"
- Click "Confirm"

### 5. Get Connection String (2 minutes)

- Go to "Clusters" or "Databases"
- Click "Connect"
- Choose "Drivers"
- Select "Node.js" and version "5.x or later"
- Copy the connection string

**Example (don't use this, make your own):**
```
mongodb+srv://fepms_user:MyPassword123@fepms-cluster.abc123.mongodb.net/?retryWrites=true&w=majority
```

### 6. Update Backend Configuration (1 minute)

Open file: `backend/.env`

Find this line:
```env
MONGO_URI=mongodb://localhost:27017/fepms
```

Replace with your connection string from Step 5:
```env
MONGO_URI=mongodb+srv://fepms_user:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/fepms?retryWrites=true&w=majority
```

Save file: `Ctrl+S`

### 7. Restart Backend (1 minute)

In your backend terminal:
- Press `Ctrl+C`
- Run: `npm start`

Wait for:
```
✅  MongoDB connected: ac-xxxxx.mongodb.net
✅  FEPMS Backend running on port 5000 [development]
```

### 8. Test Registration (2 minutes)

1. Open: http://localhost:5173
2. Click "Register"
3. Fill in:
   - Name: TestUser
   - Email: test@example.com
   - Password: TestPass123
4. Click "Create Account"

**Should redirect to dashboard ✅**

### 9. Test Login (1 minute)

1. Click profile (top right) → Logout
2. Enter:
   - Email: test@example.com
   - Password: TestPass123
3. Click "Sign In"

**Should redirect to dashboard ✅**

---

## Troubleshooting

### "Authentication failed" or connection error
- Double-check your password in the connection string
- Make sure no special characters were accidentally removed
- Verify username is `fepms_user`

### "Connection timed out"
- Go to Network Access in Atlas
- Verify "Allow Access from Anywhere" is enabled

### "MONGO_URI not configured"
- Edit `backend/.env`
- Make sure connection string has NO `<username>` or `<password>` placeholders
- Restart backend

### Still not working?
- Check backend terminal for error messages
- Open browser console (F12) and look for JavaScript errors
- Refer to PHASE_2_AUTH_VERIFICATION.md for detailed troubleshooting

---

## Quick Checklist

After setup:

- [ ] MongoDB Atlas account created
- [ ] Connection string copied
- [ ] `backend/.env` updated
- [ ] Backend restarted
- [ ] Backend shows "MongoDB connected: ..."
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Session persists on page refresh

**If all checked ✅ → Authentication is working!**

---

## Next Steps

1. ✅ Setup MongoDB (10-15 minutes using this guide)
2. ✅ Test registration and login
3. ✅ Phase 2 authentication is complete
4. 🚀 Ready for Phase 4 — Equipment Management

---

## Where to Find Help

- **Setting up MongoDB Atlas?** → Read this file (you're here!)
- **Testing after setup?** → See PHASE_2_AUTH_VERIFICATION.md
- **Detailed setup guide?** → See AUTH_SETUP_GUIDE.md
- **Quick reference?** → See QUICK_START.md

---

## Total Time Estimate

- Setup MongoDB: 10-15 minutes
- Test authentication: 5 minutes
- **Total: 20-25 minutes**

Then you're ready to start Phase 4!

---

## Questions?

**Most common issues:**

1. **"Can't find my password"** → Use "Generate Secure Password" in Atlas
2. **"Connection string too long"** → That's normal, copy the whole thing
3. **"Still seeing placeholder values"** → Make sure you saved `backend/.env`
4. **"Backend won't restart"** → Kill old process and try again

**Still stuck?** Check the troubleshooting section above.

---

## You've Got This! 🎉

Once MongoDB is set up:
- Registration will work
- Login will work
- Sessions will persist
- Error messages will display correctly

Then Phase 4 development can begin!

**Good luck!** 🚀
