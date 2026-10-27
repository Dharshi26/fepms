# Phase 2 — Authentication Verification Checklist

## Prerequisites

✅ MongoDB is configured and running (see AUTH_SETUP_GUIDE.md)
✅ Backend dependencies installed: `cd backend && npm install`
✅ Frontend dependencies installed: `cd client && npm install`

## Backend Verification

### Server Startup

```bash
cd backend
npm start
```

**Expected output:**
```
✅  MongoDB connected: localhost
✅  FEPMS Backend running on port 5000 [development]
```

**If MongoDB is not connected:**
- See AUTH_SETUP_GUIDE.md to configure MongoDB
- Update backend/.env with MONGO_URI
- Restart backend

### Health Check

**Command:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "FEPMS API is running",
  "timestamp": "2024-10-20T10:30:00.000Z",
  "environment": "development"
}
```

---

## Authentication API Tests

### Test 1: Register a New User

**Endpoint:** `POST /api/auth/register`

**Command:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Technician",
    "email": "john@example.com",
    "password": "SecurePass123",
    "phone": "+1-555-0100"
  }'
```

**Expected response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Technician",
    "email": "john@example.com",
    "role": "technician",
    "phone": "+1-555-0100",
    "isActive": true
  }
}
```

**Possible errors:**
- ❌ `400 Bad Request`: Missing required fields
- ❌ `409 Conflict`: Email already registered
- ❌ `500 Internal Server Error`: Check backend logs

---

### Test 2: Register with Duplicate Email

**Command:**
```bash
# Use the same email from Test 1
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Technician",
    "email": "john@example.com",
    "password": "AnotherPass123"
  }'
```

**Expected response (409):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### Test 3: Login with Valid Credentials

**Endpoint:** `POST /api/auth/login`

**Command:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Expected response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Technician",
    "email": "john@example.com",
    "role": "technician",
    "phone": "+1-555-0100",
    "isActive": true,
    "assignedFranchises": [],
    "assignedOutlets": []
  }
}
```

---

### Test 4: Login with Wrong Password

**Command:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "WrongPassword"
  }'
```

**Expected response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Test 5: Login with Non-existent Email

**Command:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "SomePassword"
  }'
```

**Expected response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Test 6: Get Current User (Protected)

**Endpoint:** `GET /api/auth/me`

**Command (use token from Test 3):**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Technician",
    "email": "john@example.com",
    "role": "technician",
    "phone": "+1-555-0100",
    "isActive": true,
    "assignedFranchises": [],
    "assignedOutlets": [],
    "createdAt": "2024-10-20T10:30:00.000Z",
    "updatedAt": "2024-10-20T10:30:00.000Z"
  }
}
```

---

### Test 7: Access Protected Route Without Token

**Command:**
```bash
curl http://localhost:5000/api/auth/me
```

**Expected response (401):**
```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

---

### Test 8: Access Protected Route with Invalid Token

**Command:**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer invalid.token.here"
```

**Expected response (401):**
```json
{
  "success": false,
  "message": "Not authorized, invalid token"
}
```

---

## Web Frontend Verification

### Prerequisites

```bash
cd client
npm install
npm run dev
```

Visit: http://localhost:5173

### Test 9: Web Registration Flow

**Steps:**
1. See the login page with "Register" mode toggle
2. Click "Register" link at bottom
3. Enter:
   - Full Name: "Web Test User"
   - Email: "web-test@example.com"
   - Password: "TestPass123"
   - Phone: "+1-555-0200"
4. Click "Create Account"

**Expected:**
- ✅ Request sent to backend
- ✅ Token stored in localStorage
- ✅ Redirected to dashboard
- ✅ User info displayed in profile menu

**Verification in browser console:**
```javascript
localStorage.getItem('token')       // Should return JWT
localStorage.getItem('user')        // Should return user JSON
```

---

### Test 10: Web Login Flow

**Steps:**
1. Logout first (if logged in)
2. Should see login form
3. Enter:
   - Email: "john@example.com"
   - Password: "SecurePass123"
4. Click "Sign In"

**Expected:**
- ✅ Request sent to backend
- ✅ Token stored in localStorage
- ✅ Redirected to dashboard
- ✅ Franchises/Outlets/Equipment pages accessible

---

### Test 11: Web Error Messages

**Steps:**
1. Enter invalid email: "test@test.com"
2. Enter wrong password: "WrongPassword"
3. Click "Sign In"

**Expected:**
- ✅ Error message: "Invalid credentials"
- ✅ Remains on login page
- ✅ Fields are not cleared (user can modify)

---

### Test 12: Web Session Persistence

**Steps:**
1. Login successfully
2. Refresh the page (Ctrl+R)
3. Dashboard should still be displayed

**Expected:**
- ✅ Token loaded from localStorage
- ✅ No redirect to login
- ✅ User data retained in profile

---

### Test 13: Web Logout

**Steps:**
1. Click profile icon (top right)
2. Click "Logout"
3. Confirm logout

**Expected:**
- ✅ Token cleared from localStorage
- ✅ Redirected to login page
- ✅ Cannot access dashboard without re-login

---

### Test 14: Web Protected Route Redirect

**Steps:**
1. Logout
2. Try to access: http://localhost:5173/franchises
3. Should be redirected to /login

**Expected:**
- ✅ Redirect happens automatically
- ✅ Login page is displayed

---

## Mobile Frontend Verification (Optional)

### Prerequisites

```bash
cd mobile
npm install
npx expo start
```

Then scan QR code or press 'w' for web preview.

### Test 15: Mobile Registration

**Steps:**
1. See login screen
2. Tap "Register" link
3. Enter:
   - Full Name: "Mobile Test User"
   - Email: "mobile-test@example.com"
   - Password: "MobilePass123"
   - Phone: "+1-555-0300" (optional)
4. Tap "Create Account"

**Expected:**
- ✅ Token stored in SecureStore
- ✅ Navigate to main app
- ✅ Profile shows correct user

---

### Test 16: Mobile Login

**Steps:**
1. Logout first
2. Enter valid credentials
3. Tap "Sign In"

**Expected:**
- ✅ Token stored in SecureStore
- ✅ Access to Franchises/Outlets/Equipment tabs
- ✅ Can switch between tabs

---

### Test 17: Mobile Session Persistence

**Steps:**
1. Login successfully
2. Close and reopen the app
3. Should see main app (not login screen)

**Expected:**
- ✅ Token loaded from SecureStore
- ✅ User session restored automatically

---

### Test 18: Mobile Logout

**Steps:**
1. Open Profile screen
2. Tap logout button
3. Confirm logout

**Expected:**
- ✅ Token cleared from SecureStore
- ✅ Return to login screen
- ✅ Cannot access other screens

---

## JWT Token Verification

### Decode JWT (Optional Advanced)

Use https://jwt.io or this command:

```bash
# Extract and decode the JWT payload
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
$parts = $token.Split('.')
$payload = $parts[1]
# Add padding if necessary
$padding = $payload.Length % 4
if ($padding) { $payload += ('=' * (4 - $padding)) }
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($payload))
```

**Expected JWT payload:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "iat": 1697800200,
  "exp": 1698405000
}
```

Where:
- `id` = MongoDB user._id
- `iat` = issued at timestamp
- `exp` = expiration timestamp (7 days)

---

## Troubleshooting

### ❌ "MONGO_URI not configured"
**Cause:** MongoDB connection string not set
**Fix:** See AUTH_SETUP_GUIDE.md
**Action:** Update backend/.env and restart

### ❌ Registration returns 400 "Name is required"
**Cause:** Missing required field in request
**Fix:** Include all required fields: name, email, password
**Verification:** Check request payload

### ❌ Login returns 401 "Invalid credentials"
**Cause 1:** Email not found
**Fix 1:** Register first or use correct email

**Cause 2:** Password mismatch
**Fix 2:** Verify password was typed correctly

**Cause 3:** User account deactivated
**Fix 3:** Contact admin to reactivate

### ❌ Web login returns CORS error
**Cause:** Backend not running or CLIENT_URL mismatch
**Fix:** 
- Start backend: `cd backend && npm start`
- Verify backend/.env CLIENT_URL = http://localhost:5173

### ❌ Web shows "Cannot POST /api/auth/login"
**Cause:** Backend not running or API URL mismatch
**Fix:**
- Start backend
- Verify client/.env VITE_API_URL = http://localhost:5000/api

### ❌ Mobile shows "Cannot connect"
**Cause:** Emulator cannot reach backend localhost
**Fix:** Update EXPO_PUBLIC_API_URL in mobile/.env to http://10.0.2.2:5000/api

### ❌ Token stored but login still fails
**Cause:** Backend restarted or token expired
**Fix:** 
- Re-login to get fresh token
- Token expiry is 7 days (check JWT expiration)

---

## Success Criteria

✅ All 18 tests pass
✅ Backend connects to MongoDB
✅ Register creates technician accounts
✅ Login returns valid JWT tokens
✅ Protected routes require authentication
✅ Web and mobile apps persist sessions
✅ Logout clears authentication state
✅ Error messages are user-friendly

---

## Summary

If you can complete tests 1-8 (Backend API), tests 9-14 (Web Frontend), and optionally 15-18 (Mobile), Phase 2 authentication is working correctly.

Document any failures with:
- Test number
- Expected vs actual result
- Backend logs/error messages
- Frontend console errors
