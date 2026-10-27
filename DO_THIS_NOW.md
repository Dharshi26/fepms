# ⚡ DO THIS NOW — Fix Login/Registration

## ❌ YOUR PROBLEM
- Login shows "Login failed"
- Registration shows "Registration failed"

## ✅ THE SOLUTION
MongoDB is not running. Fix it in 3 steps:

---

## 📍 STEP 1: CHOOSE MONGODB OPTION

### OPTION A: MongoDB Atlas (FREE, No Install) — ⭐ RECOMMENDED
**Go to:** https://www.mongodb.com/cloud/atlas
1. Sign up FREE
2. Create M0 FREE cluster
3. Create user: `fepms_user` (copy password!)
4. Allow IP: "Allow from Anywhere"
5. Get connection string

### OPTION B: Docker MongoDB
**Install:** https://www.docker.com/products/docker-desktop
Then run:
```powershell
docker run -d -p 27017:27017 --name fepms-mongo mongo
```

---

## 📍 STEP 2: UPDATE CONFIGURATION

### For OPTION A (MongoDB Atlas):
Open file: `backend/.env`
**Change** line 13 from:
```env
MONGO_URI=mongodb://localhost:27017/fepms
```
**To** (use YOUR connection string):
```env
MONGO_URI=mongodb+srv://fepms_user:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/fepms?retryWrites=true&w=majority
```

### For OPTION B (Docker):
File stays the same:
```env
MONGO_URI=mongodb://localhost:27017/fepms
```

**Save file:** `Ctrl+S`

---

## 📍 STEP 3: START SYSTEM

### TERMINAL 1 — Backend
```powershell
cd "d:\ricoz\Franchise Equipment Preventative Maintenance System\backend"
npm start
```
**Wait for:**
```
✅  MongoDB connected: ...
✅  FEPMS Backend running on port 5000
```

### TERMINAL 2 — Web Frontend
```powershell
cd "d:\ricoz\Franchise Equipment Preventative Maintenance System\client"
npm run dev
```
**Wait for:**
```
Local: http://localhost:5173/
```

---

## 🧪 QUICK TEST

### Test in Browser:
1. Open: http://localhost:5173
2. Click "Register"
3. Fill: Name, Email, Password (min 6 chars)
4. Click "Create Account"

**✅ Should redirect to dashboard**

### Test Login:
1. Logout (profile icon → Logout)
2. Login with same credentials
3. Click "Sign In"

**✅ Should redirect to dashboard**

---

## 🚨 IF STILL FAILING

### Check Backend Terminal:
If you see:
```
⚠️  MONGO_URI not configured.
⚠️  Skipping database connection.
```
→ Your `.env` is wrong. Fix Step 2.

### Check Browser Console (F12):
If network error:
→ Backend not running. Fix Step 3.

### Check Docker:
```powershell
docker ps | findstr mongo
```
If empty:
→ MongoDB not running. Run Docker container.

---

## 📞 NEED HELP?

**Tell me:**
1. Which option you tried (A or B)
2. Backend terminal output (copy-paste)
3. What happens when you test

**I'll help you fix it!**

---

## ✅ WHEN IT WORKS

Authentication will:
- ✅ Register new accounts
- ✅ Login with credentials
- ✅ Store JWT token
- ✅ Keep session on refresh
- ✅ Logout properly

**Then Phase 2 is complete!** 🎉
**Then we start Phase 4 (Equipment Management)!** 🚀