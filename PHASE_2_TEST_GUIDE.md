# Phase 2 Authentication & Authorization - Test Guide

## Overview
This guide provides manual testing steps to verify Phase 2 implementation (Authentication, Authorization, Roles).

## Prerequisites
- Backend running on `http://localhost:5000`
- MongoDB connected (or local memory database if not available)
- Frontend running on `http://localhost:5173`
- Mobile app configured to use backend API

## Test Environment Setup

### 1. Backend Environment Variables
Verify `.env` has these critical variables:
```
MONGO_URI=mongodb://localhost:27017/fepms
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 2. Frontend Environment Variables
Verify `client/.env` has:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Mobile Environment Variables
Verify `mobile/.env` has:
```
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
```

---

## Backend API Tests

### Test 1: User Registration (Public - Technician Only)

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "name": "John Technician",
  "email": "john.tech@fepms.local",
  "password": "password123",
  "phone": "+1 (555) 000-1234"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Technician",
    "email": "john.tech@fepms.local",
    "role": "technician",
    "phone": "+1 (555) 000-1234",
    "isActive": true
  }
}
```

**Verification Points:**
- ✓ User created with role = 'technician'
- ✓ JWT token issued
- ✓ Token is valid JWT format
- ✓ Password is hashed (not stored in plain text)

---

### Test 2: Duplicate Email Registration

**Endpoint:** `POST /api/auth/register`

**Request:** (using email from Test 1)
```json
{
  "name": "Another User",
  "email": "john.tech@fepms.local",
  "password": "password456"
}
```

**Expected Response (409):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Verification Points:**
- ✓ Prevents duplicate email registration
- ✓ Returns proper HTTP 409 status

---

### Test 3: Invalid Registration (Missing Required Fields)

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "email": "test@example.com"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Name is required"
}
```

**Verification Points:**
- ✓ Validates required fields
- ✓ Returns validation error messages

---

### Test 4: User Login

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "john.tech@fepms.local",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Technician",
    "email": "john.tech@fepms.local",
    "role": "technician",
    "phone": "+1 (555) 000-1234",
    "isActive": true,
    "assignedFranchises": [],
    "assignedOutlets": []
  }
}
```

**Verification Points:**
- ✓ Login successful with correct credentials
- ✓ JWT token issued
- ✓ User data returned with assigned franchises/outlets

---

### Test 5: Invalid Login (Wrong Password)

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "john.tech@fepms.local",
  "password": "wrongpassword"
}
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Verification Points:**
- ✓ Login fails with wrong password
- ✓ No token issued
- ✓ Returns 401 status

---

### Test 6: Invalid Login (Non-existent User)

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "nonexistent@fepms.local",
  "password": "password123"
}
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Verification Points:**
- ✓ Login fails with non-existent email
- ✓ Does not reveal whether user exists (security)

---

### Test 7: Get Current User (Protected)

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <token_from_login>
```

**Expected Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "John Technician",
    "email": "john.tech@fepms.local",
    "role": "technician",
    "phone": "+1 (555) 000-1234",
    "isActive": true,
    "assignedFranchises": [],
    "assignedOutlets": []
  }
}
```

**Verification Points:**
- ✓ Protected endpoint requires token
- ✓ Returns current user data
- ✓ Token is validated correctly

---

### Test 8: Get Current User (No Token)

**Endpoint:** `GET /api/auth/me`

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

**Verification Points:**
- ✓ Protected endpoint denies access without token
- ✓ Returns 401 status

---

### Test 9: Get Current User (Invalid Token)

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer invalid_token_here
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized, invalid token"
}
```

**Verification Points:**
- ✓ Invalid JWT tokens are rejected
- ✓ Returns 401 status

---

### Test 10: Logout (Protected)

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer <token_from_login>
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Verification Points:**
- ✓ Logout endpoint is protected
- ✓ Requires valid token
- ✓ Token is still valid for this call (stateless design)

---

## Web Dashboard Tests

### Test 11: Unauthenticated Access to Dashboard

1. Open browser to `http://localhost:5173`
2. Clear browser localStorage (DevTools → Application → Storage → Clear Site Data)

**Expected Behavior:**
- ✓ Redirected to `/login` page
- ✓ Cannot access any dashboard routes
- ✓ Login form is displayed

---

### Test 12: Login Flow on Web Dashboard

1. On login page, enter credentials:
   - Email: `john.tech@fepms.local`
   - Password: `password123`
2. Click "Sign In"

**Expected Behavior:**
- ✓ Login request sent to backend
- ✓ Token stored in localStorage
- ✓ Redirected to dashboard homepage
- ✓ User name and role displayed in Topbar
- ✓ Page title matches route

---

### Test 13: Register New Technician on Web

1. On login page, click "Register"
2. Fill in:
   - Name: `Jane Technician`
   - Email: `jane.tech@fepms.local`
   - Password: `password456`
   - Phone: `+1 (555) 000-5678`
3. Click "Create Account"

**Expected Behavior:**
- ✓ New user account created
- ✓ Automatically logged in
- ✓ Redirected to dashboard
- ✓ User data displayed in Topbar

---

### Test 14: Logout from Web Dashboard

1. Login to dashboard
2. Click user pill (Topbar top-right)
3. Click "Sign Out"

**Expected Behavior:**
- ✓ Dropdown menu appears with Sign Out option
- ✓ Clicking Sign Out clears localStorage
- ✓ Redirected to login page
- ✓ User cannot access dashboard routes

---

### Test 15: Token Persistence on Page Reload

1. Login to dashboard
2. Navigate to different page (e.g., `/franchises`)
3. Refresh page (F5)

**Expected Behavior:**
- ✓ User remains logged in
- ✓ Page still loads with same route
- ✓ Topbar shows correct user data
- ✓ Token restored from localStorage

---

### Test 16: Protected Routes Redirect

1. Manually edit localStorage to remove token:
   - DevTools → Application → localStorage → delete 'token' and 'user'
2. Refresh page or navigate to any dashboard route

**Expected Behavior:**
- ✓ Redirected to `/login`
- ✓ Cannot access protected routes
- ✓ No errors in console

---

## Mobile App Tests

### Test 17: Mobile App Login

1. Start mobile app (emulator or device)
2. Verify on login screen
3. Enter credentials:
   - Email: `john.tech@fepms.local`
   - Password: `password123`
4. Tap "Sign In"

**Expected Behavior:**
- ✓ Login request sent to backend
- ✓ Token stored in SecureStore
- ✓ User data stored in SecureStore
- ✓ Navigates to HomeTabs (main app)
- ✓ Profile screen shows correct user name and role

---

### Test 18: Mobile App Registration

1. On login screen, tap "Register"
2. Fill in:
   - Full Name: `Bob Mobile`
   - Email: `bob.mobile@fepms.local`
   - Phone: `+1 (555) 000-9999`
   - Password: `password789`
3. Tap "Create Account"

**Expected Behavior:**
- ✓ Account created as technician
- ✓ Automatically logged in
- ✓ Navigates to HomeTabs
- ✓ Profile shows new user details

---

### Test 19: Mobile App Profile Screen

1. Login to mobile app
2. Navigate to Profile tab

**Expected Behavior:**
- ✓ Avatar shows first letter of user name
- ✓ User name displayed
- ✓ Email displayed
- ✓ Role badge shown with correct color
- ✓ "Sign Out" button available

---

### Test 20: Mobile App Logout

1. On Profile tab, tap "Sign Out" button
2. Confirm logout in alert dialog

**Expected Behavior:**
- ✓ Token cleared from SecureStore
- ✓ Redirected to login screen
- ✓ Cannot access app tabs
- ✓ Can login again normally

---

### Test 21: Mobile Token Persistence on App Restart

1. Login to mobile app
2. Note user is logged in (Profile tab shows user data)
3. Kill app (swipe away / close app)
4. Reopen app

**Expected Behavior:**
- ✓ App loads directly to HomeTabs
- ✓ User is still logged in
- ✓ Token restored from SecureStore
- ✓ Profile shows same user data

---

### Test 22: Mobile API Token Attachment

1. Login to mobile app
2. Open browser DevTools or proxy (like Fiddler/Charles)
3. Observe API requests to backend

**Expected Behavior:**
- ✓ Every API request includes `Authorization: Bearer <token>` header
- ✓ Token matches stored token in SecureStore

---

## Error Handling Tests

### Test 23: Network Error During Login

1. On web/mobile login screen
2. Disconnect network (airplane mode, disable WiFi)
3. Try to login

**Expected Behavior:**
- ✓ Error message displayed
- ✓ User can retry after reconnecting network
- ✓ No app crashes

---

### Test 24: Backend Validation Errors

**Test Case:** Register with weak password (< 6 chars)

**Request:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Password must be at least 6 characters"
}
```

**Verification Points:**
- ✓ Backend validates password length
- ✓ Error displayed on frontend

---

### Test 25: JWT Expiration Handling

**Manual Test:**
1. Set `JWT_EXPIRES_IN=10s` in `.env` (temporarily)
2. Restart backend
3. Login to get a token
4. Wait 15 seconds
5. Try to access protected route (`GET /api/auth/me`)

**Expected Behavior:**
- ✓ After 10 seconds, token is invalid
- ✓ API returns 401 response
- ✓ Frontend/mobile clears token and redirects to login

**Reset:** Change `JWT_EXPIRES_IN` back to `7d` and restart backend

---

## Role-Based Access Tests (Phase 2 Foundation)

### Test 26: Verify User Role is 'technician'

1. Register a new user via public registration
2. Login
3. Check user object in `/api/auth/me`

**Expected Response:**
```json
{
  "role": "technician"
}
```

**Verification Points:**
- ✓ Public registration always creates technician role
- ✓ Technician role is stored correctly

---

## Summary Checklist

- [ ] Backend Auth API: Registration, Login, Get Me, Logout
- [ ] Password Hashing: Passwords are bcryptjs hashed
- [ ] JWT Tokens: Valid JWT format, proper expiration
- [ ] Protected Routes: Require valid Bearer token
- [ ] Web Dashboard: Login, Protected Routes, Logout
- [ ] Mobile App: Login via SecureStore, Logout, Persistence
- [ ] Error Handling: Proper error messages and status codes
- [ ] Token Persistence: Survives page reload / app restart
- [ ] Role Support: Technician role created on public registration
- [ ] API Interceptors: Token attached to all requests

---

## Test Results

| Test # | Description | Status | Notes |
|--------|-------------|--------|-------|
| 1 | User Registration | ☐ | |
| 2 | Duplicate Email Registration | ☐ | |
| 3 | Invalid Registration | ☐ | |
| 4 | User Login | ☐ | |
| 5 | Invalid Login - Wrong Password | ☐ | |
| 6 | Invalid Login - Non-existent User | ☐ | |
| 7 | Get Current User | ☐ | |
| 8 | Get Current User - No Token | ☐ | |
| 9 | Get Current User - Invalid Token | ☐ | |
| 10 | Logout | ☐ | |
| 11 | Unauthenticated Dashboard Access | ☐ | |
| 12 | Web Dashboard Login Flow | ☐ | |
| 13 | Web Dashboard Register | ☐ | |
| 14 | Web Dashboard Logout | ☐ | |
| 15 | Token Persistence (Page Reload) | ☐ | |
| 16 | Protected Routes Redirect | ☐ | |
| 17 | Mobile App Login | ☐ | |
| 18 | Mobile App Register | ☐ | |
| 19 | Mobile App Profile Screen | ☐ | |
| 20 | Mobile App Logout | ☐ | |
| 21 | Mobile Token Persistence (App Restart) | ☐ | |
| 22 | Mobile API Token Attachment | ☐ | |
| 23 | Network Error During Login | ☐ | |
| 24 | Backend Validation Errors | ☐ | |
| 25 | JWT Expiration Handling | ☐ | |
| 26 | User Role (Technician) | ☐ | |

---

## Notes for Phase 3
- Role-based endpoints (franchise/outlet endpoints) will use `authorize('admin', 'manager')` middleware
- Admin and Manager user creation will require separate admin endpoints (not public registration)
- Phase 3 tests will verify access control based on roles and assigned resources
