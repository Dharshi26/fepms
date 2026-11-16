# FEPMS Business Workflows

Complete step-by-step business processes.

---

## Workflow 1: User Registration & Login

1. Navigate to login page
2. Click "Register" tab
3. Enter: Name, Email, Phone (optional), Password
4. System validates (email unique, password 6+ chars, password confirm match)
5. Click "Create Account"
6. Account created, user auto-logged in
7. Redirected to Dashboard
8. Session stored in localStorage

**Storage:** Session only, lost on refresh

---

## Workflow 2: Adding a Franchise

1. Go to Franchises page (`/franchises`)
2. Click "Add Franchise" button
3. Modal opens, fill form:
   - Name, Code, Contact Person, Email, Phone
   - Status (Active/Pending/Inactive)
   - Type (Corporate/Master/Area Developer/Individual)
   - Number of Outlets and Equipment
4. Click "Create Franchise"
5. Success message shown
6. Franchise added to list
7. Summary cards update (Franchise count +1)

**Limitations:** Session-only storage, no persistence, no duplicate prevention

---

## Workflow 3: Adding an Outlet

1. Go to Outlets page (`/outlets`)
2. Click "Add Outlet" button
3. Fill outlet form:
   - Outlet Name, Code, Franchise
   - Manager Name, Email, Phone
   - Address, City, State, Zip, Country
   - Status, Type
4. Click "Create Outlet"
5. Outlet added to list
6. Shows on interactive map (if coordinates valid)

**Limitations:** Session-only storage

---

## Workflow 4: Finding Equipment by Outlet & Category

1. Go to Equipment page (`/equipment`)
2. Search by outlet: Type "NYC-45"
3. Filter by category: Select "Refrigeration"
4. Filter by status: Select "Needs Maintenance"
5. Results show matching equipment
6. Can sort by: Name, Category, Status, Purchase Date

**Example Result:** 1 piece of refrigeration equipment at NYC-45 needing maintenance

---

## Workflow 5: Checking Maintenance Status

1. Go to Maintenance page (`/maintenance`)
2. View alert cards: Overdue, Due This Week, In Progress, Completed
3. Search by technician name (optional)
4. Filter by status: "Overdue" to see late tasks
5. System calculates "Days Until" (negative = overdue)
6. Red row background highlights overdue tasks
7. Sort by Scheduled Date to see urgent tasks first

**Key:** Red background + negative days = task is late

---

## Workflow 6: Checking Warranty Expiry

1. Go to Warranties page (`/warranties`)
2. Alert banner shows if warranties expiring soon
3. Summary cards show: Total, Active, Expiring Soon, Expired
4. Expiry date color coding:
   - Red = Expired
   - Amber = Expiring within 30 days
   - Gray = 30+ days remaining
5. Filter: Status = "Expiring Soon" to find critical items
6. Status auto-calculated based on dates

**Actions Needed:** Renew expiring warranties, file claims before expiry

---

## Workflow 7: Reviewing Service Work

1. Go to Service Logs page (`/service-logs`)
2. View summary: Total, Completed, Pending, In Progress
3. Card grid shows service records
4. Search by equipment name, technician, or description
5. Filter by status: "Completed" to see finished work
6. Sort by Service Date (Latest first)
7. Each card shows: Equipment, Work Description, Status, Date, Technician

**Limitation:** Cannot view full service history details

---

## Workflow 8: Managing Notifications

1. Go to Notifications page (`/notifications`)
2. View unread count and notification types
3. Filter options: All, Unread, Alerts, Updates
4. Each notification shows: Icon, Title, Message, Timestamp
5. Unread notifications have blue dot (●) indicator
6. Click notification to mark as read (dot disappears)
7. Click "Mark All as Read" for all notifications
8. Click "Delete" to remove notification (permanent)

**Types:** Maintenance Due, Warranty Expiring, Service Completed, Franchise Added

---

## Workflow 9: Configuring Settings

1. Go to Settings page (`/settings`)
2. Toggle Notifications: App, Email, Maintenance, Warranty, Reports
3. Security: Two-Factor Auth toggle, Session Timeout dropdown
4. Display: Light/Dark Mode, Theme Color, Language
5. Click "Save Changes"
6. Success message: "Settings saved successfully" (green, 3 seconds)
7. Settings persist in session

**Limitations:** No backend persistence, theme/language changes not applied

---

## Workflow 10: Managing User Profile

1. Go to Profile page (`/profile`)
2. View mode: All fields read-only
3. Click "Edit Profile" to edit:
   - Email, Phone, Location, Department
   - Bio (text area)
   - **Note:** Role field is read-only
4. Click "Save" to apply changes or "Cancel" to discard
5. Click "Logout" to clear session and return to login
6. Change Password / Delete Account buttons exist but unimplemented

**Logout:** Clears session, returns to login page

---

## Workflow 11: Search & Filter Capabilities

### Franchises
- Search: Name, Code, Contact person
- Filters: Status, Type
- Results filter real-time

### Outlets
- Search: Name, Code, City, Franchise
- Filters: Status, Type, Region
- Map visualization available

### Equipment
- Search: Name, Serial number, Outlet
- Filters: Category, Status
- Sort options available

### Maintenance
- Search: Equipment name, Technician
- Filters: Status, Type
- Auto-calculates days until due

### Service Logs
- Search: Description, Technician, Equipment
- Filters: Status
- Sort by date, status, technician

### Warranties
- Search: Equipment, Provider
- Filters: Status (auto-calculated)
- Color-coded expiry dates

### Claims
- Search: Claim number, Equipment, Description
- Filters: Status
- Shows total claim values

---

## Workflow 12: Pagination & Navigation

**Pagination Available:**
- Franchises, Outlets pages have pagination
- Page size selector: 10, 25, 50 items per page
- Default: 10 items per page
- Navigation: Previous/Next buttons + page counter

**Sidebar Navigation:**
- 6 main groups: Management, Maintenance, Warranty, Analytics, Account
- Each has 2-3 pages
- Active link highlighted with dot indicator
- Mobile: Sidebar slides in/out with hamburger button

**Breadcrumbs:**
- Display navigation hierarchy
- Example: ["Management", "Franchises"]
- Updated when navigating to different pages

---

## Workflow 13: Form Submission & Modals

**Add/Edit Modals:**
1. Click Add button (e.g., "Add Franchise")
2. Modal dialog appears with form
3. Fill required fields (marked with *)
4. Click "Create" or "Save"
5. System validates required fields
6. If valid: Success message, modal closes, data added
7. If invalid: Error message shows, user corrects

**Modal Actions:**
- Click outside modal: Closes (no action)
- Click Cancel: Closes without saving
- Click Create/Save: Submits form
- Click X button: Closes without saving

**Current Modals:**
- Add Franchise (working)
- Add Outlet (working)
- Modals persist data in session only

---

## Workflow 14: Error Handling & Validation

**Login Page Validation:**
- Email: Must be valid email format (user@domain.com)
- Password: Minimum 6 characters
- Registration: Email must be unique, passwords must match

**Form Validation:**
- Required fields (*) must be filled
- Form shows error message if validation fails
- User corrects and resubmits

**Navigation Errors:**
- Invalid URL route: Shows 404 Not Found page
- Click "Go Back" or navigate via sidebar

**Data Errors:**
- No results: Shows "No matching results" message
- Empty state: Gracefully handles empty data

---

## Workflow 15: Session & Data Management

**Session Storage (localStorage):**
- User session: `fepms_mock_session`
- Mock users: `fepms_mock_users`
- Persists during: Current browser session
- Lost on: Browser close or refresh

**Data Persistence:**
- Franchises, Outlets, Equipment: Session only (added/deleted within session)
- Notifications: Session only (marked read/deleted within session)
- Settings: Session only (changes lost on refresh)
- Profile: Session only (edits lost on refresh)

**Refresh Behavior:**
- User remains logged in (session in localStorage)
- All mock data resets to initial state
- Any unsaved changes lost
- User returned to same route

---

## Workflow 16: Bulk Actions

**Available Bulk Actions:**

### Franchises Page
- Select multiple franchises (checkbox)
- "Export Selected": Console log only
- "Delete Selected": Shows confirmation, removes from list
- "Select All" checkbox selects all visible franchises

### Outlets Page
- Select multiple outlets (checkbox)
- "Send Notification": Alert shows count of outlets notified
- "Deactivate Selected": Confirmation dialog, removes from list
- "Export Selected": Console log only

**Process:**
1. Check individual franchise/outlet checkboxes
2. Or check header "Select All" checkbox
3. Bulk action toolbar appears
4. Click action button (Export, Delete, etc.)
5. For delete: Confirmation dialog shows
6. Action performed on selected items

---

## Summary: What Works & What Doesn't

### ✅ Implemented & Working
- Registration & Login
- Navigation (all pages accessible)
- Search & Filtering (real-time)
- Pagination (Franchises, Outlets)
- Add Franchise & Outlet (session-only)
- Viewing data (all pages display mock data)
- Notifications (mark read, delete functional)
- Settings (save preferences)
- Profile (edit profile, logout)
- 404 error page

### ⚠️ Partially Working
- Add Modal (works but data session-only)
- Delete (shows confirmation, removes from session)
- Bulk Actions (alerts shown but limited function)

### ❌ Not Implemented
- View/Edit buttons (no handlers)
- Equipment Add/Edit/Delete (no handlers)
- Maintenance actions (no handlers)
- Warranty actions (no handlers)
- Claims actions (no handlers)
- Reports generation (no handlers)
- Export to file (console log only)
- Detail pages for any item
- Backend API integration
- Actual data persistence

---

## File References

- **App Routing**: `client/src/App.jsx`
- **Franchises**: `client/src/pages/FranchisesPage.jsx`
- **Outlets**: `client/src/pages/OutletsPage.jsx`
- **Equipment**: `client/src/pages/EquipmentPage.jsx`
- **Maintenance**: `client/src/pages/MaintenancePage.jsx`
- **Service Logs**: `client/src/pages/ServiceLogsPage.jsx`
- **Warranties**: `client/src/pages/WarrantyPage.jsx`
- **Claims**: `client/src/pages/ClaimsPage.jsx`
- **Notifications**: `client/src/pages/NotificationsPage.jsx`
- **Settings**: `client/src/pages/SettingsPage.jsx`
- **Profile**: `client/src/pages/ProfilePage.jsx`
- **Mock Data**: `client/src/mock/` (franchises.js, outlets.js, etc.)

