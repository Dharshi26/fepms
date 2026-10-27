# Frontend Authentication Testing Guide

## Setup Complete! 🎉

Your FEPMS frontend authentication is now fully implemented with mock mode. Here's what you can test:

## 📋 Test Scenarios

### **Test 1: Fresh Application (Clear Storage)**
```javascript
// Clear mock data
localStorage.removeItem('fepms_mock_users');
localStorage.removeItem('fepms_mock_session');
```

**Expected:** Login page appears

### **Test 2: Register New Account**
1. Open: http://localhost:5173
2. Click "Register"
3. Fill:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
   - Phone: +1-555-0001 (optional)
4. Click "Create Account"

**Expected:**
- ✅ Redirects to dashboard
- ✅ Topbar shows "Test User" and "technician" badge
- ✅ User stored in `fepms_mock_users`
- ✅ Session created in `fepms_mock_session`

### **Test 3: Logout**
1. Click user profile (top right)
2. Click "Sign Out"

**Expected:**
- ✅ Redirects to login page
- ✅ Session cleared
- ✅ Cannot access dashboard

### **Test 4: Login with Registered Account**
1. Enter:
   - Email: test@example.com
   - Password: password123
2. Click "Sign In"

**Expected:**
- ✅ Redirects to dashboard
- ✅ User session restored

### **Test 5: Wrong Password**
1. Enter:
   - Email: test@example.com
   - Password: wrongpassword
2. Click "Sign In"

**Expected:**
- ✅ Shows: "Invalid email or password"
- ✅ Stays on login page

### **Test 6: Duplicate Registration**
1. Try to register again with: test@example.com

**Expected:**
- ✅ Shows: "An account with this email already exists"

### **Test 7: Session Persistence (Refresh)**
1. Login successfully
2. Refresh browser (F5 or Ctrl+R)

**Expected:**
- ✅ Dashboard remains visible
- ✅ User session persists

### **Test 8: Protected Route Access**
1. Logout
2. Try to manually open: http://localhost:5173/franchises

**Expected:**
- ✅ Automatically redirects to login page

### **Test 9: Form Validation**
**Login Validation:**
- Empty email → "Please enter a valid email address"
- Invalid email → "Please enter a valid email address"
- Empty password → "Password must be at least 6 characters"
- Short password → "Password must be at least 6 characters"

**Register Validation:**
- Empty name → "Name is required"
- Password mismatch → "Passwords do not match"
- All fields show required indicators (*)

## 🛠️ Technical Details

### **Files Created/Modified:**

1. **Environment Configuration:**
   - `client/.env` → Added `VITE_FRONTEND_AUTH_MODE=mock`
   - `client/.env.example` → Added configuration comments

2. **Mock Authentication Service:**
   - `client/src/services/mockAuth.js` → Complete frontend-only auth

3. **Auth Context:**
   - `client/src/context/AuthContext.jsx` → Updated for mock/API mode

4. **Login Page:**
   - `client/src/pages/Login.jsx` → Added validation, confirm password

### **Storage Keys:**
- `fepms_mock_users` → Array of registered users
- `fepms_mock_session` → Current logged-in user

### **Default User Role:**
All registered users get `role: 'technician'`

## 🔄 Switching to Backend Mode Later

When MongoDB/backend is ready:

1. **Update `.env`:**
   ```env
   VITE_FRONTEND_AUTH_MODE=api
   ```

2. **Backend must be running:**
   ```powershell
   cd backend
   npm start
   ```

3. **No code changes needed!** The AuthContext automatically switches to API mode.

## 🧪 Manual Testing Commands

### **Check Mock Storage:**
```javascript
// In browser console (F12)
console.log('Mock Users:', JSON.parse(localStorage.getItem('fepms_mock_users')));
console.log('Mock Session:', JSON.parse(localStorage.getItem('fepms_mock_session')));
```

### **Clear Mock Data:**
```javascript
localStorage.removeItem('fepms_mock_users');
localStorage.removeItem('fepms_mock_session');
location.reload();
```

## 🚀 How to Start Testing

### **Terminal 1 - Start Web Server:**
```powershell
cd "d:\ricoz\Franchise Equipment Preventative Maintenance System\client"
npm run dev
```

### **Browser:**
Open: http://localhost:5173

## ✅ Success Indicators

- [ ] Register creates account → Dashboard
- [ ] Login works with credentials → Dashboard
- [ ] Logout clears session → Login page
- [ ] Wrong password shows error → Stays on login
- [ ] Duplicate email shows error
- [ ] Session persists on refresh
- [ ] Protected routes redirect unauthenticated users
- [ ] Form validation works for all fields
- [ ] Topbar shows user info when logged in
- [ ] Build completes without errors

## 🐛 Troubleshooting

### **Issue: "Login failed" even with correct credentials**
- Check console for errors (F12)
- Verify `VITE_FRONTEND_AUTH_MODE=mock` in `.env`
- Clear browser storage and try again

### **Issue: Build errors**
```powershell
cd client
npm install
npm run build
```

### **Issue: Form not submitting**
- Check browser console for validation errors
- Ensure all required fields are filled
- Check password length (min 6 characters)

### **Issue: Session not persisting**
- Check `fepms_mock_session` in localStorage
- Verify AuthContext initialization

## 📊 Verification Checklist

| Test | Status | Notes |
|------|--------|-------|
| Fresh app → Login page | | |
| Register → Dashboard | | |
| Logout → Login page | | |
| Login → Dashboard | | |
| Wrong password → Error | | |
| Duplicate email → Error | | |
| Refresh → Session persists | | |
| Protected route → Redirect | | |
| Form validation → Works | | |
| Build → No errors | | |

## 🎯 Ready for Phase 4

Once all tests pass, you have:
- ✅ Complete frontend authentication flow
- ✅ Mock mode for development
- ✅ API mode ready for backend
- ✅ Protected routes
- ✅ User session management
- ✅ Form validation

**Next: Phase 4 - Equipment Management** 🚀