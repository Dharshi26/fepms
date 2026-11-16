# FEPMS Admin Panel - Quick Start Guide

## 🚀 Getting Started

### Build & Run
```bash
cd client
npm install  # if needed
npm run dev  # start dev server on localhost:5173
npm run build # production build
```

### Access Admin Panel
1. Open http://localhost:5173 in browser
2. Login with any credentials (mock auth)
3. Click "Admin Panel" (NEW) in the main sidebar
4. Navigate using the Admin Sidebar

---

## 📍 Admin Routes (13 Total)

| Route | Page | Purpose |
|-------|------|---------|
| `/admin` | Admin Dashboard | System overview with KPIs |
| `/admin/users` | User Management | Create/edit/manage users |
| `/admin/franchises` | Franchise Management | Manage franchise data |
| `/admin/outlets` | Outlet Management | Manage outlet locations |
| `/admin/equipment` | Equipment Management | Manage all equipment |
| `/admin/maintenance` | Maintenance Management | Schedule & track maintenance |
| `/admin/service-logs` | Service Logs | View service history |
| `/admin/warranties` | Warranty Management | Track warranties |
| `/admin/claims` | Claims Management | Manage warranty claims |
| `/admin/reports` | Reports | Generate & export reports |
| `/admin/notifications` | Notifications | Manage system notifications |
| `/admin/audit-logs` | Audit Logs | View activity logs |
| `/admin/settings` | Admin Settings | System configuration |

---

## 🎯 Key Features by Page

### Admin Dashboard
- **KPI Cards**: Total Users (10), Active Users (8), Franchises (12), etc.
- **Charts**: User breakdown, maintenance status, equipment status
- **Feeds**: Recent activities, user registrations

### User Management
- **Add**: Click "Add New User" → Fill form → Submit
- **Edit**: Click edit icon → Modify fields → Save
- **Delete**: Click delete → Confirm deletion
- **Search**: Type in search box for real-time filtering
- **Filter**: By Role (Admin/Manager/Technician) or Status (Active/Inactive/Suspended)

### Franchise Management
- **Table**: Shows all franchises with outlet counts
- **Search**: Find franchises by name
- **Status**: Active/Inactive filtering
- **Actions**: Edit, view details, or delete

### Reports Page
- **CSV Export**: Download data as CSV files
  - Franchises Report
  - Outlets Report
  - Equipment Report
- **Date Filtering**: Select date range for reports
- **Report Cards**: 6 different report types with metrics

---

## 🔧 Common Tasks

### Add a New User
1. Go to `/admin/users`
2. Click "Add New User" button
3. Fill in form fields
4. Select Role, Franchise, Outlet
5. Click "Add User"

### Export Equipment Data
1. Go to `/admin/reports`
2. (Optional) Select date range
3. Click "Export Equipment" button
4. CSV file downloads to your computer

### Search for Equipment
1. Go to `/admin/equipment`
2. Type equipment name in search box
3. Results filter automatically
4. Use category filter to narrow further

### Check Warranty Status
1. Go to `/admin/warranties`
2. View status indicators:
   - 🟢 Green = Active (>60 days)
   - 🟡 Yellow = Expiring Soon (0-60 days)
   - 🔴 Red = Expired
3. Click warranty to view details

### Mark Notification as Read
1. Go to `/admin/notifications`
2. Click notification to view
3. Click "Mark as Read" button
4. Notification moves to read section

---

## 📊 Dashboard Overview

### KPI Cards
- **Total Users**: Count of all system users
- **Active Users**: Currently active user accounts
- **Total Franchises**: Number of franchise partners
- **Total Outlets**: Number of store locations
- **Total Equipment**: Number of managed equipment items
- **Upcoming Maintenance**: Scheduled maintenance pending
- **Overdue Maintenance**: Maintenance that needs immediate attention
- **Pending Service Requests**: Awaiting technician assignment

### Data Displayed
- Real numbers calculated from mock data
- Updated as you make changes
- Session-based (resets on page refresh)

---

## 🔍 Search & Filter Tips

### Search Across Pages
- User Management: Search by name or email
- Franchises: Search by franchise name
- Equipment: Search by equipment name
- Service Logs: Search by equipment name

### Filter Options
- **By Status**: Active, Inactive, Suspended, etc.
- **By Role**: Admin, Manager, Technician
- **By Category**: Kitchen, Electrical, etc.
- **By Maintenance Type**: Preventive, Corrective, etc.

### Combining Search + Filter
- Search narrows results by text
- Filter further refines by category
- Both work together for precise results

---

## 📋 Pagination

- **Items Per Page**: 10 (configurable in settings)
- **Navigation**: Next/Previous buttons at bottom
- **Total Count**: Shows "1-10 of 45 items" format
- **Quick Jump**: Click page numbers to jump ahead

---

## 📥 CSV Export

### Supported Exports
1. **Franchises**: Name, Code, Contact, Email, Phone, Outlets, Status
2. **Outlets**: Name, Code, Franchise, Address, Contact, Phone, Status
3. **Equipment**: Name, ID, Category, Brand, Model, Status

### How to Export
1. Go to `/admin/reports`
2. (Optional) Set date range
3. Click "Export [Type]" button
4. File downloads to your Downloads folder
5. Open in Excel, Google Sheets, or text editor

### CSV File Format
- Headers in first row
- Data in subsequent rows
- Comma-separated values
- Quoted fields with special characters

---

## ⚙️ Settings Page Guide

### Company Information
- Update company details
- Click "Edit Company Info"
- Modify fields
- Click "Save Changes"

### Notification Settings
- Toggle email notifications on/off
- Enable/disable report reminders
- Configure alert preferences
- Settings update immediately

### Display Settings
- Items per page (10, 25, 50, 100)
- Theme selection (Light/Dark/Auto)
- Language preference (English, Spanish, French, German)
- Date format selection
- Timezone configuration

### Security Settings
- Session timeout duration
- Password expiry policy
- Two-factor authentication option
- API key rotation schedule

---

## 🔐 Important Notes

### Session-Based Data
- Changes don't persist across page refreshes
- All data resets when you refresh the browser
- This is demo mode - not connected to database
- Perfect for testing UI/UX

### Mock Data
- Users, franchises, outlets are all sample data
- Equipment and maintenance records are simulated
- Audit logs are demonstration records only
- No real system data is modified

### User Roles
- **Admin**: Full access to all admin features
- **Manager**: Franchise/outlet level access (future)
- **Technician**: Service-level access (future)

---

## 🎨 UI Features

### Status Indicators
- **Green**: Active, Completed, Approved
- **Yellow**: Warning, Expiring Soon, Due
- **Red**: Error, Expired, Overdue

### Modal Dialogs
- Forms for Add/Edit operations
- View Details popup
- Confirmation dialogs for deletions
- Keyboard-friendly (ESC to close)

### Loading States
- Smooth transitions
- Loading indicators where appropriate
- Responsive to user actions

---

## 📱 Mobile Friendly

- **Responsive Design**: Works on phones, tablets, desktop
- **Touch Optimized**: Buttons sized for touch
- **Mobile Tables**: Swipe to scroll
- **Full Functionality**: All features available on mobile

### Mobile Tips
- Use landscape orientation for tables
- Modals adapt to screen size
- Sidebar collapses on small screens
- Pagination adjusts for readability

---

## 🔗 Navigation

### From Admin to Main App
- Click "Back to Main" button in topbar
- Returns to main FEPMS dashboard
- All admin changes preserved in session

### From Main App to Admin
- Click "Admin Panel" (NEW) in main sidebar
- Under Administration section
- Takes you to Admin Dashboard

### Sidebar Navigation
- 13 items in admin sidebar
- Emoji icons for quick recognition
- Active item highlighted
- Mobile hamburger menu on small screens

---

## ❓ FAQ

**Q: Will my changes save after I close the browser?**  
A: No, this is a demo. Changes are session-only and reset on refresh.

**Q: Can I really export to CSV?**  
A: Yes! Download works for Franchises, Outlets, and Equipment reports.

**Q: What if I get an error?**  
A: Check browser console (F12) for details. All data is validation on input.

**Q: Can I delete all users?**  
A: Yes, but each deletion requires confirmation. You can restore by refreshing.

**Q: How do I go back to the main FEPMS app?**  
A: Click the "Back to Main" button in the admin topbar.

**Q: Can multiple users edit the same record?**  
A: Yes - each edit is session-based, last change wins (demo mode).

---

## 🛠️ Troubleshooting

### Routes Not Loading
- Check that all 13 admin routes are in App.jsx
- Verify imports are correct
- Clear browser cache and refresh

### Search Not Working
- Make sure you're typing in the search field
- Check that mock data is loaded
- Search is case-insensitive

### CSV Export Not Working
- Make sure browser allows downloads
- Check popup blocker settings
- Try a different browser

### Sidebar Not Showing
- On mobile, click hamburger menu
- Check that AdminSidebar.jsx is imported
- Verify AdminLayout wrapper is used

---

## 📚 File Structure

```
client/
├── src/
│   ├── pages/admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminUsers.jsx
│   │   ├── AdminFranchises.jsx
│   │   ├── AdminOutlets.jsx
│   │   ├── AdminEquipment.jsx
│   │   ├── AdminMaintenance.jsx
│   │   ├── AdminServiceLogs.jsx
│   │   ├── AdminWarranties.jsx
│   │   ├── AdminClaims.jsx
│   │   ├── AdminReports.jsx
│   │   ├── AdminNotifications.jsx
│   │   ├── AdminAuditLogs.jsx
│   │   └── AdminSettings.jsx
│   ├── components/admin/
│   │   ├── AdminSidebar.jsx
│   │   └── AdminTopbar.jsx
│   ├── layouts/
│   │   └── AdminLayout.jsx
│   ├── mock/
│   │   ├── adminUsers.js
│   │   └── auditLogs.js
│   └── App.jsx (modified)
```

---

## ✅ Quick Checklist

Before deploying Admin Panel:
- [ ] Run `npm run build` successfully
- [ ] Test all 13 routes
- [ ] Test search/filter on 3+ pages
- [ ] Test CSV export
- [ ] Test CRUD operations
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1920px)
- [ ] Verify back button works
- [ ] Check existing FEPMS routes still work

---

## 🎓 Learn More

- **Complete Features**: See ADMIN_PANEL_FEATURES.md
- **Verification Report**: See ADMIN_PANEL_VERIFICATION.md
- **Implementation Details**: See ADMIN_PANEL_COMPLETION.md

---

**Version**: 1.0.0  
**Last Updated**: October 31, 2026  
**Status**: ✅ Complete and Tested

Happy exploring! 🚀
