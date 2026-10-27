# Build Verification & Regression Testing

## Overview
This document verifies that Phase 2 & 3 implementations compile correctly and don't introduce regressions to Phase 1 code.

## Build Environment Requirements

### Backend
- Node.js 16+ 
- npm 8+
- MongoDB 4.4+
- Environment variables: MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, CLIENT_URL, PORT

### Web Client
- Node.js 16+
- npm 8+
- Environment variables: VITE_API_URL

### Mobile
- Node.js 16+
- npm 8+
- Expo CLI
- Environment variables: EXPO_PUBLIC_API_URL

---

## Build Verification Checklist

### Backend Compilation Check

#### 1. Dependency Audit
```bash
cd backend
npm install
npm audit
```

**Expected:**
- ✓ All dependencies install without errors
- ✓ No critical vulnerabilities
- ✓ Optional warnings about optional dependencies acceptable

**Status:** [TO BE VERIFIED]

#### 2. Syntax Validation
```bash
cd backend
node -c server.js
```

**Files to check:**
- ✓ server.js
- ✓ middleware/auth.js
- ✓ middleware/errorHandler.js
- ✓ middleware/validate.js
- ✓ controllers/authController.js
- ✓ controllers/franchiseController.js
- ✓ controllers/outletController.js
- ✓ models/User.js
- ✓ models/Franchise.js
- ✓ models/Outlet.js
- ✓ routes/auth.js
- ✓ routes/franchises.js
- ✓ routes/outlets.js

**Expected:**
- ✓ All files parse without syntax errors
- ✓ No require() circular dependencies

**Status:** [TO BE VERIFIED]

#### 3. Linting (Optional but Recommended)
```bash
npm install --save-dev eslint
npm run lint
```

**Expected:**
- ✓ No high-severity issues
- ✓ Warnings acceptable if auto-fixable

**Status:** [OPTIONAL]

---

### Web Client Build

#### 1. Dependency Audit
```bash
cd client
npm install
npm audit
```

**Expected:**
- ✓ All dependencies resolve
- ✓ No critical vulnerabilities
- ✓ React 18.3+ installed
- ✓ React Router 6.24+ installed
- ✓ Vite 5.3+ installed

**Status:** [TO BE VERIFIED]

#### 2. Syntax Check
```bash
npx eslint src --ext .jsx,.js --fix
```

**Expected:**
- ✓ No syntax errors in any .jsx files
- ✓ All components properly formatted

**Status:** [TO BE VERIFIED]

#### 3. Build Compilation
```bash
npm run build
```

**Expected:**
- ✓ Build completes without errors
- ✓ dist/ directory created with bundled files
- ✓ No TypeScript/compilation warnings
- ✓ Bundle size reasonable (<500KB for main bundle)

**Status:** [TO BE VERIFIED]

#### 4. Build Output Verification
After successful build:
```bash
npm run preview
```

**Expected:**
- ✓ Preview server starts on http://localhost:4173
- ✓ Login page loads without 404 errors
- ✓ No console errors in DevTools
- ✓ CSS loads properly (Tailwind styling visible)
- ✓ API calls attempt to correct baseURL

**Status:** [TO BE VERIFIED]

#### 5. React Component Verification
**Files to verify JSX syntax:**
- ✓ src/App.jsx
- ✓ src/pages/Login.jsx
- ✓ src/pages/Dashboard.jsx
- ✓ src/pages/FranchisesPage.jsx
- ✓ src/pages/OutletsPage.jsx
- ✓ src/components/ProtectedRoute.jsx
- ✓ src/components/Topbar.jsx
- ✓ src/layouts/DashboardLayout.jsx
- ✓ src/context/AuthContext.jsx
- ✓ src/hooks/useFranchises.js
- ✓ src/hooks/useOutlets.js

**Expected:**
- ✓ All .jsx files import React properly
- ✓ All hooks follow React rules
- ✓ No missing dependencies in useEffect
- ✓ No prop-types warnings (if using PropTypes)

**Status:** [TO BE VERIFIED]

---

### Mobile App Build

#### 1. Dependency Audit
```bash
cd mobile
npm install
npm audit
```

**Expected:**
- ✓ All Expo dependencies install
- ✓ expo-secure-store installed (v12.8.1+)
- ✓ react-native 0.73.6 installed
- ✓ No critical vulnerabilities

**Status:** [TO BE VERIFIED]

#### 2. Syntax Check
```bash
npx eslint src --ext .jsx,.js --fix
```

**Expected:**
- ✓ No syntax errors in screens/hooks
- ✓ All React Native components properly formatted

**Status:** [TO BE VERIFIED]

#### 3. Expo Check
```bash
npx expo doctor
```

**Expected:**
- ✓ Expo project healthy
- ✓ All required packages present
- ✓ SDK version compatible

**Status:** [TO BE VERIFIED]

#### 4. Type Checking (Optional)
```bash
npm run type-check
```

**Expected:**
- ✓ No TypeScript errors (if using TypeScript)
- ✓ All prop types correct

**Status:** [OPTIONAL]

#### 5. React Native Component Verification
**Files to verify:**
- ✓ App.js (Main entry point)
- ✓ src/screens/LoginScreen.jsx
- ✓ src/screens/ProfileScreen.jsx
- ✓ src/screens/FranchisesScreen.jsx
- ✓ src/screens/OutletsScreen.jsx
- ✓ src/context/AuthContext.js
- ✓ src/hooks/useFranchises.js
- ✓ src/hooks/useOutlets.js
- ✓ src/services/api.js

**Expected:**
- ✓ All screens use React Native components (View, Text, etc.)
- ✓ All hooks follow React rules
- ✓ No browser APIs (localStorage, window, etc.)
- ✓ SecureStore used instead of AsyncStorage for tokens

**Status:** [TO BE VERIFIED]

---

## Regression Testing

### Phase 1 Feature Verification

#### Backend - Phase 1 Features (Still Work)

**1. Health Check Endpoint**
```bash
curl http://localhost:5000/api/health
```

**Expected:**
```json
{
  "status": "ok",
  "message": "FEPMS API is running",
  "timestamp": "...",
  "environment": "development"
}
```

**Status:** [TO BE VERIFIED]

**2. User Model Still Has All Phase 1 Fields**
- ✓ name, email, password (hashed)
- ✓ role (enum: admin, manager, technician)
- ✓ phone, isActive
- ✓ assignedFranchises, assignedOutlets (new in Phase 2)
- ✓ createdAt, updatedAt

**Status:** [TO BE VERIFIED]

#### Web Client - Phase 1 Features (Still Work)

**1. Dashboard Still Renders**
```bash
npm run dev
# Login and navigate to /
```

**Expected:**
- ✓ Dashboard page loads
- ✓ Placeholder pages for equipment, maintenance, etc. still accessible
- ✓ Sidebar navigation works

**Status:** [TO BE VERIFIED]

**2. API Service Still Works**
- ✓ Axios instance configured
- ✓ Token interceptor attaches Bearer token
- ✓ 401 handler clears auth state
- ✓ baseURL correctly set from env var

**Status:** [TO BE VERIFIED]

#### Mobile - Phase 1 Features (Still Work)

**1. Navigation Tabs Still Present**
- ✓ Home tab loads HomeScreen
- ✓ Tasks tab loads TasksScreen
- ✓ Equipment tab loads EquipmentScreen
- ✓ Alerts tab loads NotificationsScreen
- ✓ Profile tab loads ProfileScreen (updated for Phase 2)
- ✓ Plus new: Franchises tab, Outlets tab

**Status:** [TO BE VERIFIED]

**2. API Service Configuration**
- ✓ Correct API_URL for emulator/device
- ✓ Token attached from SecureStore
- ✓ 401 handling clears tokens

**Status:** [TO BE VERIFIED]

---

## Integration Testing

### Authentication Flow (Phase 2 - No Regression)

**1. Register as Technician**
```bash
POST /api/auth/register
{
  "name": "Test Tech",
  "email": "tech@test.com",
  "password": "testpass123",
  "phone": "+1 (555) 123-4567"
}
```

**Expected:**
- ✓ Response 201
- ✓ Role set to 'technician'
- ✓ JWT token returned
- ✓ Password hashed (not plain text in response)

**Status:** [TO BE VERIFIED]

**2. Login Returns Complete User Data**
```bash
POST /api/auth/login
{
  "email": "tech@test.com",
  "password": "testpass123"
}
```

**Expected:**
- ✓ Response 200
- ✓ User object includes: _id, name, email, role, phone, isActive, assignedFranchises, assignedOutlets
- ✓ JWT token valid for 7 days

**Status:** [TO BE VERIFIED]

**3. Protected Endpoints Require Token**
```bash
GET /api/franchises
# Without Authorization header

GET /api/franchises
Authorization: Bearer <valid_token>
```

**Expected:**
- ✓ First request returns 401
- ✓ Second request returns 200 or 403 (based on role)

**Status:** [TO BE VERIFIED]

---

### Franchise/Outlet API (Phase 3 - No Regression to Phase 2)

**1. Admin Can Create Franchise**
```bash
POST /api/franchises
Authorization: Bearer <admin_token>

{
  "name": "Test Franchise",
  "code": "TEST001",
  "city": "Test City"
}
```

**Expected:**
- ✓ Response 201
- ✓ Franchise created with status: "active"
- ✓ createdBy set to admin's ID

**Status:** [TO BE VERIFIED]

**2. Manager Can See Only Assigned Franchises**
```bash
GET /api/franchises
Authorization: Bearer <manager_token>
```

**Expected:**
- ✓ Response 200
- ✓ Only franchises in user.assignedFranchises returned
- ✓ Other franchises not visible

**Status:** [TO BE VERIFIED]

**3. Technician Cannot Access Franchises**
```bash
GET /api/franchises
Authorization: Bearer <tech_token>
```

**Expected:**
- ✓ Response 403
- ✓ Error message: "Role 'technician' is not authorized..."

**Status:** [TO BE VERIFIED]

---

## Frontend Integration Testing

### Web Dashboard (Phase 3 - No Regression to Phase 2)

**1. Login Flow Still Works**
- ✓ Unauthenticated redirect to /login
- ✓ Login form accepts email/password
- ✓ Register form accepts name/email/password/phone
- ✓ Token stored in localStorage
- ✓ Redirect to dashboard on success

**Status:** [TO BE VERIFIED]

**2. Franchises Page Loads (New)**
```bash
# After login as Admin
Navigate to /franchises
```

**Expected:**
- ✓ Table of franchises displays
- ✓ Search functionality works
- ✓ Status filter works
- ✓ Pagination controls present
- ✓ Create/Edit/Deactivate buttons visible (admin only)
- ✓ No console errors

**Status:** [TO BE VERIFIED]

**3. Outlets Page Loads (New)**
```bash
# After login as Admin
Navigate to /outlets
```

**Expected:**
- ✓ Table of outlets displays
- ✓ Search functionality works
- ✓ Franchise filter dropdown populated
- ✓ Pagination controls present
- ✓ Create/Edit/Deactivate buttons visible (admin/manager)
- ✓ No console errors

**Status:** [TO BE VERIFIED]

**4. Logout Still Works**
- ✓ Dropdown menu appears in Topbar
- ✓ Sign Out button clears localStorage
- ✓ Redirects to /login
- ✓ Dashboard inaccessible after logout

**Status:** [TO BE VERIFIED]

---

### Mobile App (Phase 3 - No Regression to Phase 2)

**1. Login/Register Still Works**
- ✓ Toggle between login/register modes
- ✓ Register creates technician user
- ✓ Token stored in SecureStore
- ✓ Navigate to HomeTabs on success

**Status:** [TO BE VERIFIED]

**2. Franchises Tab Loads (New)**
```bash
# After login
Tap "Franchises" tab
```

**Expected:**
- ✓ Franchises list displays
- ✓ Search field works
- ✓ Refresh works (pull down)
- ✓ Tap card expands details
- ✓ No crashes

**Status:** [TO BE VERIFIED]

**3. Outlets Tab Loads (New)**
```bash
# After login
Tap "Outlets" tab
```

**Expected:**
- ✓ Outlets list displays with franchise tag
- ✓ Search field works
- ✓ Refresh works
- ✓ Tap card expands details
- ✓ No crashes

**Status:** [TO BE VERIFIED]

**4. Logout Still Works**
- ✓ Navigate to Profile tab
- ✓ Tap "Sign Out"
- ✓ Confirm in alert
- ✓ SecureStore cleared
- ✓ Return to LoginScreen

**Status:** [TO BE VERIFIED]

---

## Performance Verification

### Web Client Build Size

**Expected:**
- ✓ Main JS bundle: <200KB (gzipped)
- ✓ CSS bundle: <50KB (gzipped)
- ✓ Total: <300KB (gzipped)

**Actual:**
```
# After: npm run build
# Check dist/ folder size
```

**Status:** [TO BE VERIFIED]

### API Response Times

**Expected:**
- ✓ Login: <500ms
- ✓ Get franchises (admin): <200ms (for 10 items)
- ✓ Get franchises (manager): <200ms
- ✓ Create franchise: <300ms
- ✓ Search franchises: <200ms

**Status:** [TO BE VERIFIED]

### Mobile App Startup

**Expected:**
- ✓ Cold start: <3 seconds
- ✓ Warm start: <1 second
- ✓ Auth context initialization: <500ms

**Status:** [TO BE VERIFIED]

---

## Security Verification

### Backend Security

**1. Passwords Hashed**
```bash
# Create user and verify password hash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"testpass123"}'

# Check MongoDB - password field should be hashed, not plain text
```

**Expected:**
- ✓ Password starts with $2a$ (bcrypt hash)
- ✓ Password never logged or returned in responses

**Status:** [TO BE VERIFIED]

**2. JWT Tokens Valid**
```bash
# Decode JWT token (using jwt.io or command line)
# Check: exp, id, iat claims present
```

**Expected:**
- ✓ exp: current_time + 7 days
- ✓ id: User ObjectId
- ✓ iat: current timestamp

**Status:** [TO BE VERIFIED]

**3. CORS Configured**
```bash
curl -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS http://localhost:5000/api/auth/login
```

**Expected:**
- ✓ Access-Control-Allow-Origin: http://localhost:5173 (or CLIENT_URL)
- ✓ Access-Control-Allow-Methods: GET, POST, PUT, DELETE
- ✓ Access-Control-Allow-Headers: Content-Type, Authorization

**Status:** [TO BE VERIFIED]

---

## Browser Compatibility (Web Client)

**Tested Browsers:**
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

**Expected:**
- ✓ Login page responsive
- ✓ Dashboard loads
- ✓ Tables sort/paginate
- ✓ Forms submit
- ✓ No console errors
- ✓ CSS displays correctly (Tailwind)

**Status:** [TO BE VERIFIED]

---

## Device Compatibility (Mobile)

**Tested Devices:**
- [ ] iOS 14+
- [ ] Android 10+
- [ ] Android emulator
- [ ] iOS simulator

**Expected:**
- ✓ App launches
- ✓ Login works
- ✓ Tab navigation works
- ✓ Screens render properly
- ✓ SecureStore works
- ✓ API calls succeed

**Status:** [TO BE VERIFIED]

---

## Code Quality Checks

### No Breaking Changes to Phase 1

**Phase 1 Models Still Work:**
- [x] User model unchanged (fields added, no removal)
- [x] Equipment model (not modified)
- [x] MaintenanceSchedule (not modified)
- [x] Notification (not modified)
- [x] ServiceLog (not modified)
- [x] Warranty (not modified)
- [x] WarrantyClaim (not modified)

**Phase 1 Routes Still Work:**
- [x] Auth routes (register/login/me/logout all present)
- [x] Equipment routes (not modified)
- [x] Dashboard routes (not modified)

**Phase 1 Middleware Still Works:**
- [x] protect middleware (unchanged)
- [x] authorize middleware (unchanged)
- [x] errorHandler middleware (unchanged)

**Phase 1 Frontend Still Works:**
- [x] AuthContext (enhanced, not broken)
- [x] API service (enhanced, not broken)
- [x] App routing (enhanced with new routes)
- [x] Login page (completely replaced, still functional)

### No Console Errors

**Expected (Web):**
- ✓ No red error messages in DevTools console
- ✓ Only warnings acceptable (e.g., unhandled promise)
- ✓ Network requests to correct API endpoint

**Expected (Mobile):**
- ✓ No red errors in Expo debugger console
- ✓ Network requests show Bearer tokens
- ✓ SecureStore operations logged correctly

**Status:** [TO BE VERIFIED]

---

## Final Build Checklist

- [ ] Backend dependencies install without errors
- [ ] Backend syntax valid (no parse errors)
- [ ] Web client dependencies install
- [ ] Web client builds without errors
- [ ] Web client build preview works
- [ ] Mobile dependencies install
- [ ] Mobile Expo doctor passes
- [ ] All React/React Native files have valid syntax
- [ ] Phase 1 features still work (no regression)
- [ ] Phase 2 features work (auth flow)
- [ ] Phase 3 features work (franchise/outlet)
- [ ] Frontend pages load without console errors
- [ ] Mobile screens load without console errors
- [ ] No security vulnerabilities (npm audit)
- [ ] Performance acceptable (response times, build sizes)
- [ ] Cross-browser compatible (web)
- [ ] Cross-device compatible (mobile)

---

## Build Commands Reference

### Backend
```bash
cd backend
npm install
npm start           # Development server
npm run dev         # With nodemon auto-reload
```

### Web Client
```bash
cd client
npm install
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview production build
```

### Mobile
```bash
cd mobile
npm install
npm start           # Expo dev client
expo android        # Run on Android
expo ios           # Run on iOS (macOS only)
expo web           # Run on web
```

---

## Troubleshooting

### Build Errors

**"Cannot find module 'express'"**
- Solution: Run `npm install` in backend directory

**"Cannot find module 'react'"**
- Solution: Run `npm install` in client directory

**"Module not found: 'SecureStore'"**
- Solution: Run `npm install` in mobile directory, ensure expo-secure-store 12.8.1+

**"Port 5000 already in use"**
- Solution: Kill process on port 5000 or set PORT env var: `PORT=5001 npm start`

**"VITE_API_URL not defined"**
- Solution: Create `client/.env.local` with `VITE_API_URL=http://localhost:5000/api`

**"Tailwind CSS not loading"**
- Solution: Run `npm run build` instead of dev, or restart dev server

### Runtime Errors

**"401 Unauthorized" on /franchises endpoint**
- Solution: Ensure token present in localStorage, login first

**"403 Forbidden" on /franchises endpoint (as technician)**
- Solution: This is expected - technicians don't have access, use admin/manager account

**"Cannot read property 'data' of undefined"**
- Solution: API response structure check, ensure backend returns `{success, data, ...}`

**"SecureStore operation failed"**
- Solution: Ensure app has permissions, reinstall app on device

---

## Sign-Off

Phase 2 & 3 Build Verification Complete

**Date:** [TODAY]
**Verified By:** [YOUR NAME]
**Status:** ✅ PASS / ❌ FAIL

### Notes:
(Add any issues found and how they were resolved)

