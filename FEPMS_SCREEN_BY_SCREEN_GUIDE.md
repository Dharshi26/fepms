# FEPMS Screen-by-Screen Guide

Every screen in the application explained in detail.

---

## 1. Login Screen

### Route: `/login`
### File: `client/src/pages/Login.jsx`
### Purpose
User authentication gateway. New users can register, existing users can log in.

### Who Uses It
- All users before accessing the application
- New franchise users creating an account for the first time

### Information Displayed
- FEPMS logo and branding
- Two tabs: "Sign In" and "Register"
- Form fields based on selected tab

#### Sign In Tab
- Email address field
- Password field (with show/hide toggle)
- Error message display (if login fails)
- Submit button "Sign In"

#### Register Tab
- Full Name field
- Email address field
- Phone number field (optional)
- Password field (with strength indicator)
- Confirm Password field
- Password strength meter (shows Weak/Fair/Good/Strong)
- Validation message if passwords match
- Submit button "Create Account"

### User Actions

#### Login Flow
1. Enter email address
2. Enter password
3. Click "Sign In" button
4. System validates credentials against mock user database
5. If valid → User logged in, redirected to Dashboard
6. If invalid → Error message displayed (e.g., "Invalid email or password")

#### Registration Flow
1. Click "Register" tab
2. Enter full name
3. Enter email address
4. Enter phone number (optional)
5. Enter password (6+ characters minimum)
6. Password strength indicator shows up to 4 levels
7. Enter confirm password
8. System validates:
   - Email is unique (not already registered)
   - Password is at least 6 characters
   - Passwords match
   - Name is not empty
9. Click "Create Account"
10. If valid → Account created, user automatically logged in, redirected to Dashboard
11. If invalid → Error message displayed above form

### Navigation After Login
- **Success** → Redirected to Dashboard (`/`)
- **If already logged in** → Visiting `/login` redirects to Dashboard automatically

### Data Persistence
- **Mock Mode**: Credentials stored in browser localStorage
- **Test Credentials**: 
  - Email: `admin@fepms.local`
  - Password: `password123`
  - Role: Admin (all permissions)

### Functionality Status
- ✅ **IMPLEMENTED** - Registration and login fully functional
- ✅ **IMPLEMENTED** - Password strength validation working
- ✅ **IMPLEMENTED** - Form validation working
- ✅ **IMPLEMENTED** - Session management working
- ⚠️ **MOCK ONLY** - Uses localStorage instead of backend API

---

## 2. Dashboard

### Route: `/`
### File: `client/src/pages/Dashboard.jsx`
### Purpose
Main landing page showing system-wide overview and key metrics.

### Who Uses It
- Admin, Managers, Technicians (everyone sees customized view)

### Information Displayed

#### Frontend Status Banner
- Indicator that mock data is active
- Note that data resets on page refresh

#### Key Performance Indicator (KPI) Cards - Tier 1
| Card | Shows | Example Value |
|------|-------|---|
| Franchises | Total number of registered franchises | 10 |
| Outlets | Total number of franchise locations | 45 |
| Equipment | Total equipment managed | 327 |
| Total Assets | Sum of outlets + equipment | 372 |

#### Key Performance Indicator Cards - Tier 2 (Maintenance Status)
| Card | Shows | Example Value |
|------|-------|---|
| Maintenance Due | Tasks scheduled for today or future (not yet completed) | 5 |
| Overdue | Maintenance tasks past due date and not completed | 2 |
| Completed (30d) | Maintenance work completed in last 30 days | 23 |
| Pending Tasks | Sum of Due + Overdue | 7 |

#### Warranty Status Cards
| Card | Shows | Example Value |
|------|-------|---|
| Warranties Expiring (30d) | Warranties expiring within 30 days | 3 |
| Expired Warranties | Warranties that have already expired | 1 |

#### Recent Activity Section (Two Cards)

**Upcoming Maintenance Card**
- Lists next 5 maintenance tasks
- Shows: Equipment name, Maintenance type, Status badge, Scheduled date
- Status indicators: Red if overdue, Amber if due soon
- "View All →" link navigates to `/maintenance`

**Recent Service Logs Card**
- Lists last 5 completed service work records
- Shows: Description, Service date, Status badge
- Status indicators: Green if completed, Amber if pending, Blue if in-progress
- "View All →" link navigates to `/service-logs`

### User Actions
- Click "View All →" on Upcoming Maintenance → Navigate to `/maintenance`
- Click "View All →" on Recent Service Logs → Navigate to `/service-logs`

### Data Calculation
All metrics calculated from mock data in real-time:
```javascript
Franchises = Count of mockFranchises
Outlets = Count of mockOutlets
Equipment = Count of mockEquipment
Maintenance Due = Count of mockMaintenance where status != "completed"
Overdue = Count of mockMaintenance where scheduledDate < today AND status != "completed"
Completed (30d) = Count of mockServiceLogs where status == "completed"
Warranties Expiring = Count of mockWarranties where expiryDate <= today + 30 days
```

### Navigation
- Sidebar navigation allows going to any other page
- Topbar breadcrumb shows: ["Dashboard"]
- No detail pages for individual items (all KPIs are read-only)

### Functionality Status
- ✅ **IMPLEMENTED** - All KPIs calculated and display correctly
- ✅ **IMPLEMENTED** - Navigation links work
- ⚠️ **MOCK DATA ONLY** - Data resets on page refresh
- ❌ **NOT CONNECTED** - Not connected to backend API

---

## 3. Franchises Page

### Route: `/franchises`
### File: `client/src/pages/FranchisesPage.jsx`
### Purpose
Manage franchise organizations (corporate headquarters, master franchises, individual franchisees).

### Who Uses It
- Admin: Full access to all franchises
- Manager: Full access to assigned franchises
- Technician: Read-only view

### Information Displayed

#### Summary Cards (Top Row)
| Card | Shows | Example |
|------|-------|---------|
| Total Franchises | Count of all franchises | 12 |
| Total Outlets | Count of all outlets across all franchises | 245 |
| Total Equipment | Count of all equipment across all franchises | 1,847 |
| Maintenance Due | Count of maintenance tasks due or overdue | 23 |

#### Performance Metrics
- **Average Uptime %**: Average equipment uptime across all franchises (e.g., 98.5%)
- **Compliance Rate %**: Average compliance percentage (e.g., 95.3%)
- **Satisfaction Score**: Average rating from 1-5 stars (e.g., 4.2/5)

#### Data Table (Main Content)
| Column | Shows | Example |
|--------|-------|---------|
| Checkbox | Select multiple franchises | ☐ |
| Franchise | Franchise name + code | McDonald's (MCD) |
| Contact | Contact person name + email + phone | John Smith / john@mcds.com / 555-0100 |
| Outlets | Count of outlets under this franchise | 45 |
| Equipment | Count of equipment in all outlets | 327 |
| Maintenance Due | Count of maintenance tasks due | 8 |
| Status | Badge showing franchise status | Active/Pending/Inactive |
| Performance | Uptime % and Compliance % | 98% / 95% |
| Actions | View / Edit buttons | [👁️] [✏️] |

#### Bottom Charts
- **Franchise Distribution**: Bar chart showing franchise type breakdown
- **Performance Leaders**: Top 5 performing franchises ranked by uptime %
- **Geographic Distribution**: Map showing franchise locations by region

### Filters & Search

#### Search Bar
- Search by: Franchise name, Code, or Contact person name
- Real-time filtering as you type
- Example: Search "McDonald" → shows only McDonald's franchise

#### Status Filter
- All Franchises (default)
- Active Only
- Pending Only
- Inactive Only

#### Franchise Type Filter
- All Types (default)
- Corporate
- Master Franchise
- Area Developer
- Individual
- Each option shows count

#### Quick Filter Chips
- All Franchises
- Active Only
- High Maintenance (franchises with > 5 due maintenance tasks)
- Corporate Franchises

### User Actions

#### Browse Franchises
1. Page loads showing all 12 mock franchises
2. Search by name, code, or contact → Filters results instantly
3. Select Status filter → Shows only matching franchises
4. Select Franchise Type → Shows only matching types
5. View metrics in summary cards

#### Add Franchise
1. Click "Add Franchise" button
2. Modal dialog opens with form fields:
   - Franchise Name *required
   - Code *required
   - Contact Person Name
   - Email
   - Phone
   - Status (dropdown: Active/Pending/Inactive)
   - Type (dropdown: Corporate/Master/Area Developer/Individual)
   - Country/Region
   - Number of Outlets
   - Number of Equipment
3. Fill in form fields
4. Click "Create Franchise" button
5. **Result**: Shows toast/alert "Franchise added successfully" (mock operation)
6. Modal closes, new franchise appears in list (session only)

#### Select Multiple Franchises
1. Click checkbox in header row to select all visible franchises
2. Or click individual checkboxes to select specific franchises
3. When items selected, toolbar appears with bulk actions

#### Bulk Actions (when franchises selected)
| Action | What Happens |
|--------|---|
| Export Selected | Console log with franchise IDs, shows message "Exported X franchises" |
| Delete Selected | Shows confirmation dialog "Delete X franchises?" → If confirmed, franchises removed from list (session only) |

#### View Franchise
1. Click "View" action button for a franchise
2. **Current Behavior**: Shows alert with franchise details
3. **Expected**: Should navigate to franchise detail page with full information

#### Edit Franchise
1. Click "Edit" action button for a franchise
2. **Current Behavior**: Console log only (no visual feedback)
3. **Expected**: Should open edit modal or navigate to edit page

#### Export
1. Click "Export" button (top right)
2. **Current Behavior**: Console log only (no file download)
3. **Expected**: Should generate CSV or Excel file

#### Reset Filters
1. Click "Reset Filters" button
2. All filters cleared, showing all franchises again

### Pagination
- Page size selector: 10, 25, 50 items per page
- Default: 10 items per page
- Navigation: Previous/Next buttons and page number indicator
- Example: "Page 1 of 2" with navigation controls

### Data Model (Franchise Object)
```javascript
{
  id: "f001",
  name: "McDonald's",
  code: "MCD",
  contactPerson: "John Smith",
  email: "john@mcds.com",
  phone: "555-0100",
  status: "active",        // active, pending, inactive
  type: "corporate",       // corporate, master_franchise, area_developer, individual
  outletCount: 45,
  equipmentCount: 327,
  maintenanceDue: 8,
  uptime: 98.5,            // percentage
  compliance: 95.3,        // percentage
  satisfaction: 4.2,       // out of 5
  address: "123 Oak St, Chicago, IL"
}
```

### Functionality Status
- ✅ **SEARCH & FILTER** - Working correctly
- ✅ **PAGINATION** - Working correctly
- ⚠️ **ADD FRANCHISE** - Modal works, data added to session only (resets on refresh)
- ⚠️ **VIEW/EDIT** - Buttons exist but don't navigate to detail pages
- ⚠️ **DELETE** - Shows dialog, removes from session, resets on refresh
- ⚠️ **EXPORT** - Console log only (no file generated)
- ❌ **PERSISTENCE** - No backend integration, data resets on page refresh

---

## 4. Outlets Page

### Route: `/outlets`
### File: `client/src/pages/OutletsPage.jsx`
### Purpose
Manage franchise locations/outlets (individual restaurants, stores, etc.).

### Who Uses It
- Admin: Full access to all outlets
- Manager: Access to outlets in assigned franchises
- Technician: View-only of assigned outlet(s)

### Information Displayed

#### Summary Cards (Top Row)
| Card | Shows | Example |
|------|-------|---------|
| Total Outlets | Count of all franchise locations | 45 |
| Avg Equipment Per Outlet | Average equipment count | 7.3 |
| Maintenance Due (Overdue) | Count of overdue maintenance tasks | 12 |
| Avg Outlet Rating | Average customer/performance rating | 4.6/5 |

#### Map Visualization
- Interactive map showing outlet locations (mock geographic data)
- Click on location marker to view outlet details card on the right
- Details card shows:
  - Outlet name
  - Address
  - Equipment count
  - Maintenance due
  - Revenue
  - "Clear" button to deselect

#### Data Table (Main Content)
| Column | Shows | Example |
|--------|-------|---------|
| Checkbox | Select multiple outlets | ☐ |
| Outlet | Outlet name + code + address | McDonald's #45 (NYC-45) / 123 5th Ave, NY |
| Franchise | Franchise name + code | McDonald's (MCD) |
| Contact | Manager name + email + phone | Jane Doe / jane@outlet45.com / 555-0201 |
| Equipment | Count of equipment + revenue + maintenance due | 8 / $450K / 2 |
| Status | Badge showing outlet status | Active/Pending/Inactive |
| Type | Outlet type | Franchise/Company-Owned |
| Last Service | Date of last service + next scheduled date | 2026-10-15 / 2026-10-22 |
| Actions | View / Edit buttons | [👁️] [✏️] |

#### Bottom Charts
- **Outlet Type Distribution**: Pie chart of Franchise vs Company-Owned
- **Top Revenue Outlets**: Bar chart of highest-revenue outlets
- **Equipment by Outlet Type**: Breakdown of equipment counts

### Filters & Search

#### Search Bar
- Search by: Outlet name, Code, City, or Franchise name
- Real-time filtering

#### Status Filter
- All Outlets (default)
- Active Only
- Pending Only
- Inactive Only

#### Outlet Type Filter
- All Types (default)
- Franchise
- Company-Owned
- Each option shows count

#### Region Filter
- All Regions (default)
- Northeast
- Midwest
- South
- West
- Pacific
- Each region shows count

#### Quick Filter Chips
- All Outlets
- Active Only
- High Maintenance (outlets with > 5 due tasks)
- Midwest Region
- Restaurants Only

### User Actions

#### Browse Outlets
1. Page loads showing all 45 mock outlets
2. Search by name, code, city → Filters results
3. Select Status/Type/Region filters → Filters combine
4. Click location on map to see outlet details

#### Add Outlet
1. Click "Add Outlet" button
2. Modal dialog opens with form fields:
   - Outlet Name *required
   - Code *required
   - Franchise (dropdown)
   - Manager Name
   - Email
   - Phone
   - Address *required
   - City, State, Zip
   - Country
   - Status (dropdown)
   - Type (dropdown: Franchise/Company-Owned)
3. Fill in form
4. Click "Create Outlet" button
5. **Result**: Toast message "Outlet added successfully" (mock)
6. Modal closes, new outlet appears in list

#### Select Multiple Outlets
1. Click header checkbox to select all visible outlets
2. Or click individual checkboxes
3. Toolbar appears with bulk actions

#### Bulk Actions (when outlets selected)
| Action | What Happens |
|--------|---|
| Export All | Console log, shows message |
| Export Selected | Console log with selected outlet IDs |
| Send Notification | Shows alert: "Notification sent to X outlets" |
| Deactivate Selected | Shows confirmation dialog → Removes from list if confirmed |

#### View Outlet
1. Click "View" action button
2. **Current Behavior**: Shows alert with outlet details
3. **Expected**: Should navigate to outlet detail page

#### Edit Outlet
1. Click "Edit" action button
2. **Current Behavior**: Console log only
3. **Expected**: Should open edit modal

#### Use Map
1. Map displays all outlet locations
2. Click any location marker on map
3. Outlet details card appears on right side
4. Details show outlet info and key metrics
5. Click "Clear" button on details card to deselect

### Pagination
- Page size selector: 10, 25, 50 items per page
- Default: 10 items per page
- Full pagination controls

### Data Model (Outlet Object)
```javascript
{
  id: "o001",
  name: "McDonald's #45",
  code: "NYC-45",
  franchiseId: "f001",
  franchiseName: "McDonald's",
  managerName: "Jane Doe",
  email: "jane@outlet45.com",
  phone: "555-0201",
  address: "123 5th Avenue",
  city: "New York",
  state: "NY",
  zip: "10001",
  status: "active",
  type: "franchise",
  equipmentCount: 8,
  revenue: 450000,
  maintenanceDue: 2,
  rating: 4.6,
  latitude: 40.7128,
  longitude: -74.0060,
  lastServiceDate: "2026-10-15",
  nextServiceDate: "2026-10-22"
}
```

### Functionality Status
- ✅ **SEARCH & FILTER** - Working correctly
- ✅ **PAGINATION** - Working correctly
- ✅ **MAP VISUALIZATION** - Interactive map works
- ⚠️ **ADD OUTLET** - Modal works, session only
- ⚠️ **BULK ACTIONS** - Alerts show, no actual operations
- ⚠️ **VIEW/EDIT** - Buttons exist but don't navigate
- ❌ **PERSISTENCE** - Session only, resets on refresh

---

## 5. Equipment Page

### Route: `/equipment`
### File: `client/src/pages/EquipmentPage.jsx`
### Purpose
View and manage all commercial equipment across all outlets.

### Who Uses It
- Admin: Full access to all equipment
- Manager: View equipment in assigned franchises/outlets
- Technician: View assigned equipment

### Information Displayed

#### Summary Cards (Top Row)
| Card | Shows | Example |
|------|-------|---------|
| Total Equipment | Count of all equipment | 327 |
| Operational | Equipment in working condition | 312 (95%) |
| Needs Maintenance | Equipment scheduled for or due for maintenance | 10 (3%) |
| Requires Repair | Equipment with issues | 5 (2%) |

#### Data Table (Main Content)
| Column | Shows | Example |
|--------|-------|---------|
| Equipment Name | Equipment name + model number | Walk-in Freezer XL-2000 |
| Category | Equipment category | Refrigeration |
| Serial Number | Unique serial identifier | WIF-2000-A12345 |
| Outlet | Outlet where equipment is located | McDonald's #45 (NYC-45) |
| Status | Equipment status badge | Operational/Maintenance/Repair/Retired |
| Purchase Date | When equipment was purchased | 2024-03-15 |
| Actions | View / Edit / Delete buttons | [👁️] [✏️] [🗑️] |

#### Equipment Categories Used
- Refrigeration (Walk-in freezers, reach-in fridges)
- Cold Storage (Specialized cold storage)
- Cooking (Fryers, grills, ovens)
- Beverage (Soda fountains, coffee makers)
- Washing (Dishwashers, sanitizers)
- Climate Control (HVAC, AC units)
- Ventilation (Hood systems, exhaust fans)

### Filters & Search

#### Search Bar
- Search by: Equipment name, Serial number, or Outlet name
- Real-time filtering

#### Status Filter
- All Status (default)
- Operational
- Needs Maintenance
- Requires Repair
- Retired
- Each shows count

#### Category Filter
- All Categories (default)
- Dynamically populated from equipment data
- Example options: Refrigeration, Cold Storage, Cooking, etc.

#### Sort Options
- Name (A-Z)
- Category
- Status
- Purchase Date (newest first)

#### Quick Controls
- Reset Filters button (clears all filters)

### User Actions

#### Browse Equipment
1. Page loads showing all 327 mock equipment pieces
2. Search by name, serial number, or outlet
3. Select Status and Category filters
4. Sort by different columns
5. View filtered results

#### Add Equipment
1. Click "Add Equipment" button
2. **Current Behavior**: No handler (button does nothing)
3. **Expected**: Should open form to register new equipment

#### View Equipment
1. Click [👁️] View icon for any equipment
2. **Current Behavior**: No handler (button does nothing)
3. **Expected**: Should navigate to equipment detail page showing:
   - Full equipment information
   - Warranty details
   - Maintenance history
   - Service logs
   - Assigned technician

#### Edit Equipment
1. Click [✏️] Edit icon for any equipment
2. **Current Behavior**: No handler (button does nothing)
3. **Expected**: Should open form to edit equipment details

#### Delete Equipment
1. Click [🗑️] Delete icon for any equipment
2. **Current Behavior**: No handler (button does nothing)
3. **Expected**: Should show confirmation dialog

### Data Model (Equipment Object)
```javascript
{
  id: "eq001",
  name: "Walk-in Freezer XL-2000",
  category: "refrigeration",           // refrigeration, cold_storage, cooking, beverage, washing, climate, ventilation
  brand: "ColdTech",
  model: "XL-2000",
  serialNumber: "WIF-2000-A12345",
  outletId: "o001",
  franchiseId: "f001",
  purchaseDate: "2024-03-15",
  purchasePrice: 25000,
  status: "operational",               // operational, needs_maintenance, requires_repair, retired
  warrantyStartDate: "2024-03-15",
  warrantyExpiryDate: "2026-03-15",
  maintenanceSchedule: "monthly",      // daily, weekly, monthly, quarterly, yearly
  assignedTechnician: "John Tech",
  criticality: "high",                 // high, medium, low
  lastMaintenanceDate: "2026-10-01",
  nextMaintenanceDate: "2026-11-01"
}
```

### Functionality Status
- ✅ **SEARCH & FILTER** - Working correctly
- ✅ **SORT** - Working correctly
- ❌ **ADD BUTTON** - No handler
- ❌ **VIEW BUTTON** - No handler
- ❌ **EDIT BUTTON** - No handler
- ❌ **DELETE BUTTON** - No handler
- ⚠️ **PERSISTENCE** - Session only, resets on refresh

---

## 6. Maintenance Page (Preventive Maintenance)

### Route: `/maintenance`
### File: `client/src/pages/MaintenancePage.jsx`
### Purpose
Manage preventive maintenance schedules and track maintenance task status.

### Who Uses It
- Admin: Full access to all maintenance tasks
- Manager: Tasks for assigned franchises/outlets
- Technician: Assigned maintenance tasks for their area

### Information Displayed

#### Alert Cards (Top Row)
| Card | Shows | Color | Example |
|------|-------|-------|---------|
| Overdue | Maintenance past due date | Red | 2 |
| Due This Week | Tasks scheduled for next 7 days | Amber | 5 |
| In Progress | Currently being performed | Blue | 3 |
| Completed (30d) | Tasks completed in last 30 days | Green | 23 |

#### Data Table (Main Content)
| Column | Shows | Example |
|--------|-------|---------|
| Equipment | Equipment name being maintained | Walk-in Freezer XL-2000 |
| Type | Type of maintenance | Quarterly inspection |
| Scheduled Date | When maintenance was scheduled | 2026-10-15 |
| Technician | Assigned technician name | John Smith |
| Status | Task status badge | Scheduled/In Progress/Completed/Cancelled |
| Days Until | Countdown to due date (negative if overdue) | Due 5 days / Overdue 3 days |
| Actions | View / Edit / Delete buttons | [👁️] [✏️] [🗑️] |

#### Maintenance Types
- Daily inspection
- Weekly cleaning
- Monthly inspection
- Quarterly inspection
- Annual certification
- Emergency service

### Filters & Search

#### Search Bar
- Search by: Equipment name or Technician name
- Real-time filtering

#### Status Filter
- All Status (default)
- Scheduled
- In Progress
- Completed
- Cancelled
- Each shows count

#### Type Filter
- All Types (default)
- Dynamically populated from maintenance types
- Shows count for each type

#### Sort Options
- Scheduled Date (earliest first)
- Status
- Type

#### Quick Controls
- Reset Filters button

### User Actions

#### Browse Maintenance Tasks
1. Page loads showing all 10 mock maintenance tasks
2. Search by equipment name or technician
3. Select Status and Type filters
4. Sort by different columns
5. View filtered results
6. **Important**: Overdue rows highlighted in red background

#### Schedule Maintenance
1. Click "Schedule Maintenance" button
2. **Current Behavior**: No handler (button does nothing)
3. **Expected**: Should open form to create new maintenance task

#### View Maintenance Task
1. Click [👁️] View icon
2. **Current Behavior**: No handler
3. **Expected**: Should show task details

#### Edit Maintenance Task
1. Click [✏️] Edit icon
2. **Current Behavior**: No handler
3. **Expected**: Should open form to edit task

#### Delete Maintenance Task
1. Click [🗑️] Delete icon
2. **Current Behavior**: No handler
3. **Expected**: Should show confirmation dialog

### Data Calculation
- **Days Until**: Calculated as difference between Scheduled Date and today
  - Positive number = days until due
  - Negative number = days overdue
  - If overdue and not completed: row background turns red

### Data Model (Maintenance Task Object)
```javascript
{
  id: "m001",
  equipmentId: "eq001",
  equipmentName: "Walk-in Freezer XL-2000",
  outletId: "o001",
  franchiseId: "f001",
  maintenanceType: "quarterly_inspection",
  frequency: "quarterly",
  scheduledDate: "2026-10-15",
  technicianId: "t001",
  technicianName: "John Smith",
  status: "scheduled",                 // scheduled, in_progress, completed, cancelled
  priority: "high",                    // high, medium, low
  description: "Inspect compressor and thermostat",
  estimatedDuration: "2 hours",
  lastCompletedDate: "2026-07-15",
  nextScheduledDate: "2027-01-15"
}
```

### Functionality Status
- ✅ **SEARCH & FILTER** - Working correctly
- ✅ **SORT** - Working correctly
- ✅ **DAYS UNTIL CALCULATION** - Working correctly
- ✅ **OVERDUE HIGHLIGHTING** - Red background for overdue tasks
- ❌ **SCHEDULE BUTTON** - No handler
- ❌ **VIEW/EDIT/DELETE** - No handlers
- ⚠️ **PERSISTENCE** - Session only

---

## 7. Service Logs Page

### Route: `/service-logs`
### File: `client/src/pages/ServiceLogsPage.jsx`
### Purpose
View and record actual maintenance work performed by technicians.

### Who Uses It
- Admin: View all service logs
- Manager: View service logs for assigned locations
- Technician: View and create service logs

### Information Displayed

#### Summary Cards (Top Row)
| Card | Shows | Example |
|------|-------|---------|
| Total Logs | Total service records | 142 |
| Completed | Successfully completed work | 128 |
| Pending | Awaiting approval | 10 |
| In Progress | Currently being worked on | 4 |

#### Card Grid Layout (Main Content)
Each service log displayed as a card with:
| Field | Shows | Example |
|-------|-------|---------|
| Equipment | Equipment that was serviced | Walk-in Freezer XL-2000 |
| Description | Work description | Replaced compressor and tested refrigerant |
| Status | Service status badge | Completed/Pending/In Progress |
| Service Date | When work was performed | 2026-10-20 |
| Technician | Who performed the work with icon | John Smith 👨‍🔧 |
| Notes | Additional notes | "Unit now running at optimal temperature" |
| Actions | View / Edit buttons | [👁️] [✏️] |

#### Grid Responsive Layout
- 1 column on mobile devices
- 2 columns on large screens (lg)

### Filters & Search

#### Search Bar
- Search by: Description, Technician name, or Equipment name
- Real-time filtering

#### Status Filter
- All Status (default)
- Completed
- Pending
- In Progress
- Cancelled
- Each shows count

#### Sort Options
- Service Date (Latest first)
- Status
- Technician

#### Results Counter
- Shows number of matching results
- Example: "Showing 8 service logs"

#### Reset Filters
- Clears all filters and search

### User Actions

#### Browse Service Logs
1. Page loads showing all 142 mock service logs in card grid
2. Search by description, technician, or equipment
3. Select Status filter
4. Sort by Service Date, Status, or Technician
5. View filtered results
6. Cards update dynamically

#### Create New Service Log
1. Click "New Service Log" button
2. **Current Behavior**: No handler
3. **Expected**: Should open form to record new service work

#### View Service Log
1. Click "View" button on any card
2. **Current Behavior**: No handler
3. **Expected**: Should navigate to detail page showing full service record including:
   - Equipment details
   - Technician information
   - Work description
   - Start/end times
   - Parts replaced
   - Certification/approval status

#### Edit Service Log
1. Click "Edit" button on any card
2. **Current Behavior**: No handler
3. **Expected**: Should open form to edit service log details

#### Card Interactions
- Card has hover effect (shadow increases on hover)
- Responsive grid automatically adjusts columns based on screen size

### Data Model (Service Log Object)
```javascript
{
  id: "sl001",
  equipmentId: "eq001",
  equipmentName: "Walk-in Freezer XL-2000",
  outletId: "o001",
  franchiseId: "f001",
  description: "Replaced compressor and tested refrigerant",
  status: "completed",                 // completed, pending, in_progress, cancelled
  serviceDate: "2026-10-20",
  startTime: "09:00",
  endTime: "11:30",
  durationHours: 2.5,
  technicianId: "t001",
  technicianName: "John Smith",
  notes: "Unit now running at optimal temperature",
  partsReplaced: ["Compressor", "Thermostat"],
  certificateUploaded: true,
  approvalStatus: "approved",
  approvedBy: "Jane Manager"
}
```

### Functionality Status
- ✅ **SEARCH & FILTER** - Working correctly
- ✅ **SORT** - Working correctly
- ✅ **CARD LAYOUT** - Responsive grid working
- ❌ **NEW SERVICE LOG** - No handler
- ❌ **VIEW/EDIT** - No handlers
- ⚠️ **PERSISTENCE** - Session only

---

## 8. Warranty Page

### Route: `/warranties`
### File: `client/src/pages/WarrantyPage.jsx`
### Purpose
Track equipment warranties and manage warranty coverage.

### Who Uses It
- Admin: View all warranties
- Manager: View warranties for assigned equipment
- Technician: View warranty status of equipment they service

### Information Displayed

#### Summary Cards (Top Row)
| Card | Shows | Example |
|------|-------|---------|
| Total Warranties | Total warranties in system | 23 |
| Active | Currently active/valid warranties | 20 |
| Expiring Soon | Expiring within 30 days | 2 |
| Expired | Already expired | 1 |

#### Alert Banner
- Shows if any warranties are expiring soon
- Example: "⚠️ 2 warranties expiring within 30 days - Action required"

#### Data Table (Main Content)
| Column | Shows | Example |
|--------|-------|---------|
| Equipment | Equipment name + model | Walk-in Freezer XL-2000 |
| Provider | Warranty provider company | ColdTech Warranty |
| Coverage Type | What's covered | Parts and Labor |
| Start Date | When warranty began | 2024-03-15 |
| Expiry Date | When warranty ends (color-coded) | 2026-03-15 |
| Status | Warranty status badge | Active/Expiring Soon/Expired |
| Actions | View / Edit / Delete buttons | [👁️] [✏️] [🗑️] |

#### Expiry Date Color Coding
- **Red text**: Warranty has expired
- **Amber text**: Warranty expiring within 30 days
- **Gray text**: Warranty has 30+ days remaining

### Filters & Search

#### Search Bar
- Search by: Equipment name, Model number, or Provider name
- Real-time filtering

#### Status Filter
- All Status (default)
- Active (not expired yet)
- Expiring Soon (expires within 30 days)
- Expired (already expired)

#### Sort Options
- Expiry Date (earliest first)
- Provider
- Coverage Type

#### Reset Filters

### User Actions

#### Browse Warranties
1. Page loads showing all 23 mock warranties
2. Search by equipment, model, or provider
3. Select Status filter (automatically calculated based on dates)
4. Sort by Expiry Date, Provider, or Coverage Type
5. View filtered results
6. Alert banner shows if any warranties expiring soon

#### Add Warranty
1. Click "Add Warranty" button
2. **Current Behavior**: No handler
3. **Expected**: Should open form to register new warranty

#### View Warranty
1. Click [👁️] View icon
2. **Current Behavior**: No handler
3. **Expected**: Should show warranty details including:
   - Equipment information
   - Warranty terms
   - Coverage details
   - Claim history

#### Edit Warranty
1. Click [✏️] Edit icon
2. **Current Behavior**: No handler
3. **Expected**: Should open form to edit warranty details

#### Delete Warranty
1. Click [🗑️] Delete icon
2. **Current Behavior**: No handler
3. **Expected**: Should show confirmation dialog

### Data Calculation
- **Status** is automatically calculated based on Expiry Date:
  - If expiryDate < today → "Expired"
  - If expiryDate >= today AND expiryDate <= today + 30 days → "Expiring Soon"
  - Otherwise → "Active"

### Data Model (Warranty Object)
```javascript
{
  id: "w001",
  equipmentId: "eq001",
  equipmentName: "Walk-in Freezer XL-2000",
  equipmentModel: "XL-2000",
  provider: "ColdTech Warranty",
  startDate: "2024-03-15",
  expiryDate: "2026-03-15",
  coverageType: "parts_and_labor",     // parts_and_labor, parts_only, labor_only
  coverageDetails: "Full coverage for parts and labor, excluding normal wear and tear",
  maxClaimAmount: 10000,
  claimsCount: 2,
  status: "active"                      // auto-calculated
}
```

### Functionality Status
- ✅ **SEARCH & FILTER** - Working correctly
- ✅ **SORT** - Working correctly
- ✅ **EXPIRY DATE COLOR CODING** - Red/Amber/Gray working
- ✅ **STATUS CALCULATION** - Automatic based on dates
- ✅ **ALERT BANNER** - Shows when warranties expiring
- ❌ **ADD/VIEW/EDIT/DELETE** - No handlers
- ⚠️ **PERSISTENCE** - Session only

---

## 9. Claims Page (Warranty Claims)

### Route: `/claims`
### File: `client/src/pages/ClaimsPage.jsx`
### Purpose
File and track warranty claims for equipment repairs and replacements.

### Who Uses It
- Admin: Manage all warranty claims
- Manager: File and view claims for assigned locations
- Technician: View claim status for repairs

### Information Displayed

#### Summary Cards (Top Row)
| Card | Shows | Example |
|------|-------|---------|
| Total Claims | Total warranty claims filed | 5 |
| Approved | Claims approved for payment | 3 |
| In Review | Currently being reviewed | 1 |
| Pending | Awaiting review start | 1 |
| Total Claim Value | Sum of all claim amounts | $18,500 |
| Approved Amount | Sum of approved claim amounts | $15,000 |

#### Data Table (Main Content)
| Column | Shows | Example |
|--------|-------|---------|
| Claim Number | Unique claim identifier | WC-2026-0001 |
| Equipment | Equipment for which claim was filed | Walk-in Freezer XL-2000 |
| Claim Date | When claim was filed | 2026-10-15 |
| Amount | Claim amount requested | $5,000 |
| Status | Claim status badge | Approved/In Review/Pending/Rejected |
| Description | What happened / reason for claim | "Compressor failure - unit not cooling" |
| Actions | View / Edit / Delete buttons | [👁️] [✏️] [🗑️] |

### Filters & Search

#### Search Bar
- Search by: Claim number, Equipment name, or Description
- Real-time filtering

#### Status Filter
- All Status (default)
- Approved
- In Review
- Pending
- Rejected
- Each shows count

#### Sort Options
- Claim Date (Latest first)
- Status
- Claim Amount (highest first)

#### Results Counter
- Shows number of matching claims

#### Reset Filters

### User Actions

#### Browse Claims
1. Page loads showing all 5 mock warranty claims
2. Search by claim number, equipment, or description
3. Select Status filter
4. Sort by Claim Date, Status, or Amount
5. View filtered results and financial summary

#### File New Claim
1. Click "New Claim" button
2. **Current Behavior**: No handler
3. **Expected**: Should open form to file warranty claim with fields:
   - Equipment selection
   - Claim date
   - Description of issue
   - Requested amount
   - Supporting documentation upload

#### View Claim
1. Click [👁️] View icon
2. **Current Behavior**: No handler
3. **Expected**: Should show full claim details including:
   - Equipment information
   - Claim history
   - Supporting documents
   - Status timeline
   - Decision details (if approved/rejected)

#### Edit Claim
1. Click [✏️] Edit icon
2. **Current Behavior**: No handler
3. **Expected**: Should allow editing claim details if still pending

#### Delete Claim
1. Click [🗑️] Delete icon
2. **Current Behavior**: No handler
3. **Expected**: Should show confirmation dialog

### Data Model (Warranty Claim Object)
```javascript
{
  id: "wc001",
  claimNumber: "WC-2026-0001",
  equipmentId: "eq001",
  equipmentName: "Walk-in Freezer XL-2000",
  warrantyId: "w001",
  claimDate: "2026-10-15",
  requestedAmount: 5000,
  approvedAmount: 5000,
  status: "approved",                  // approved, in_review, pending, rejected
  description: "Compressor failure - unit not cooling",
  issueDate: "2026-10-10",
  resolution: "Compressor replaced under warranty",
  supportingDocuments: ["invoice.pdf", "repair_report.pdf"],
  filledBy: "Jane Manager",
  reviewedBy: "Admin User",
  reviewDate: "2026-10-18"
}
```

### Functionality Status
- ✅ **SEARCH & FILTER** - Working correctly
- ✅ **SORT** - Working correctly
- ✅ **FINANCIAL TOTALS** - Calculated correctly
- ❌ **NEW CLAIM** - No handler
- ❌ **VIEW/EDIT/DELETE** - No handlers
- ⚠️ **PERSISTENCE** - Session only

---

## 10. Reports Page

### Route: `/reports`
### File: `client/src/pages/ReportsPage.jsx`
### Purpose
Generate and view business intelligence reports and analytics.

### Who Uses It
- Admin: Full access to all reports
- Manager: Reports for assigned locations
- Technician: View performance reports

### Information Displayed

#### Key Metrics Section (Top)
| Metric | Shows | Example |
|--------|-------|---------|
| Total Equipment | All equipment in system | 327 |
| Maintenance Completed | Tasks completed in period | 234 |
| Avg Response Time | Average time to respond to maintenance requests | 2.5 days |
| Equipment Availability % | Percentage of time equipment operational | 98.5% |

#### Date Range Selector
- Last 7 Days (default)
- Last 30 Days
- Last 90 Days
- This Year
- Custom Range (opens date picker)
- Selected range affects all report data

#### Report Cards (Grid Layout)
Each report shows as a card with: Icon, Category badge, Title, Description, Last generated date

| Report | Category | Purpose | Shows |
|--------|----------|---------|-------|
| Equipment Status Report | Operations | Equipment health overview | Status breakdown by category |
| Maintenance Summary | Maintenance | Maintenance work performed | Tasks completed, in progress, pending |
| Warranty Claims Report | Warranty | Claims overview | Approved, pending, rejected claims |
| Service Activity Report | Maintenance | Technician activities | Services performed, by technician |
| Franchise Performance | Analytics | Franchise comparison | Uptime %, compliance %, satisfaction |
| Cost Analysis | Finance | Spending analysis | Maintenance costs, warranty costs |

#### Report Card Details
- **Icon**: Visual identifier for report type
- **Category Badge**: Colored label (Operations, Maintenance, Warranty, Analytics, Finance)
- **Title**: Report name
- **Description**: What the report shows
- **Last Generated**: When report was last created
- **Download Button**: Opens file generation dialog
- **Preview Button**: Shows report preview

### Filter & Configuration

#### Advanced Filters Button
- **Current Behavior**: No handler
- **Expected**: Should open filter dialog to:
  - Select specific franchises/outlets
  - Select equipment categories
  - Select technicians
  - Apply custom date ranges

### User Actions

#### Select Date Range
1. Click date range selector buttons (Last 7 Days, Last 30 Days, etc.)
2. **Current Behavior**: State changes but has no effect on displayed reports
3. **Expected**: Reports should recalculate based on selected date range

#### View Report Preview
1. Click "Preview" button on any report card
2. **Current Behavior**: No handler
3. **Expected**: Should display preview of report data with visualizations

#### Download Report
1. Click "Download" button on any report card
2. **Current Behavior**: No handler
3. **Expected**: Should generate and download report as:
   - PDF (formatted report document)
   - CSV (spreadsheet data)
   - Excel (formatted spreadsheet)

#### Apply Advanced Filters
1. Click "Advanced Filters" button
2. **Current Behavior**: No handler
3. **Expected**: Should open dialog to apply custom filters

### Data Model (Report Configuration)
```javascript
{
  reportId: "r001",
  title: "Equipment Status Report",
  category: "operations",
  description: "Overview of equipment status across all franchises",
  dateRange: "last_7_days",            // last_7_days, last_30_days, last_90_days, this_year, custom
  startDate: "2026-10-20",
  endDate: "2026-10-27",
  metrics: ["total_equipment", "operational", "maintenance_due", "requires_repair"],
  lastGenerated: "2026-10-27 14:30",
  generatedBy: "System"
}
```

### Functionality Status
- ✅ **REPORT CARDS DISPLAY** - Reports visible
- ✅ **KEY METRICS DISPLAY** - Hardcoded metrics show
- ⚠️ **DATE RANGE SELECTOR** - Changes state but no effect
- ❌ **PREVIEW BUTTON** - No handler
- ❌ **DOWNLOAD BUTTON** - No handler
- ❌ **ADVANCED FILTERS** - No handler
- ❌ **NO REPORT GENERATION** - Reports don't recalculate

---

## 11. Notifications Page

### Route: `/notifications`
### File: `client/src/pages/NotificationsPage.jsx`
### Purpose
View system notifications and alerts.

### Who Uses It
- All users (Admin, Manager, Technician)

### Information Displayed

#### Summary Cards (Top Row)
| Card | Shows | Example |
|------|-------|---------|
| Unread | Count of unread notifications | 3 |
| Total Notifications | Total notifications in system | 47 |
| Alerts | Count of alert-type notifications | 8 |

#### Filter Buttons (Horizontal Tabs)
- **All** (shows all notifications)
- **Unread** (only unread, shows count)
- **Alerts** (only alert-type notifications)
- **Updates** (only update-type notifications)

#### Notification List (Main Content)
Scrollable list of notifications, each showing:

| Element | Shows | Example |
|---------|-------|---------|
| Icon/Emoji | Notification type icon | 🔔 Notification, ⚠️ Alert, ✅ Success |
| Title | Notification title | "Maintenance Due" |
| Message | Full notification text | "Equipment EQ-001 at Outlet NYC-45 needs maintenance" |
| Timestamp | When notification was sent | "2 hours ago", "Today at 3:30 PM" |
| Unread Indicator | Blue dot if unread | • (dot appears) |
| Unread Ring | Visual ring around unread notifications | Blue ring |

#### Notification Types
- **Maintenance Due**: Equipment needs scheduled maintenance
- **Warranty Expiring**: Warranty coverage expiring soon
- **Service Log Updates**: Service work completed
- **New Franchise Added**: New franchise registered in system

### User Actions

#### View All Notifications
1. Page loads showing all notifications
2. Scroll through notification list
3. Each notification shows context (what it's about)

#### Filter Notifications
1. Click "All" tab → Shows all notifications
2. Click "Unread" tab → Shows only unread notifications with count
3. Click "Alerts" tab → Shows only alert-type notifications
4. Click "Updates" tab → Shows only update-type notifications
5. List filters instantly

#### Mark Single Notification as Read
1. Click notification in list
2. **Current Behavior**: Notification marked as read (blue dot disappears)
3. Unread count decreases

#### Mark All as Read
1. Click "Mark All as Read" button (top of page)
2. **Current Behavior**: All notifications marked as read
3. Unread count goes to 0
4. All unread indicators disappear

#### Delete Notification
1. Click "Delete" button on any notification
2. **Current Behavior**: Notification removed from list immediately
3. **Note**: No confirmation dialog (permanent deletion)

### Data Persistence
- **Local Session Only**: Data persists during browsing session
- **Resets on Refresh**: Page refresh resets to initial mock data
- **No Backend**: Data not persisted to database

### Data Model (Notification Object)
```javascript
{
  id: "n001",
  type: "maintenance_due",            // maintenance_due, warranty_expiring, service_log_update, franchise_added, alert
  title: "Maintenance Due",
  message: "Equipment EQ-001 at Outlet NYC-45 needs maintenance",
  timestamp: "2026-10-27T14:30:00Z",
  read: false,                         // unread notifications have dot indicator
  severity: "warning",                 // info, warning, error, success
  relatedEntity: {
    type: "equipment",
    id: "eq001"
  }
}
```

### Functionality Status
- ✅ **FILTER TABS** - All four filter options working
- ✅ **MARK AS READ** - Individual notifications mark as read
- ✅ **MARK ALL AS READ** - All notifications mark as read
- ✅ **DELETE NOTIFICATION** - Removes notification from list
- ✅ **UNREAD INDICATOR** - Blue dot shows for unread
- ✅ **LOCAL STATE MANAGEMENT** - State updates in session
- ⚠️ **PERSISTENCE** - Session only, resets on refresh

---

## 12. Settings Page

### Route: `/settings`
### File: `client/src/pages/SettingsPage.jsx`
### Purpose
Configure user preferences and application settings.

### Who Uses It
- All users (individual user settings)

### Information Displayed

#### Settings Sections

##### 1. Notifications Settings
**Toggle Options** (enable/disable):
- [ ] App Notifications (on/off)
- [ ] Email Notifications (on/off)
- [ ] Maintenance Alerts (on/off)
- [ ] Warranty Alerts (on/off)
- [ ] New Report Notifications (on/off)

**Checkboxes**:
- [ ] Weekly Reports (receive weekly summary)
- [ ] Monthly Reports (receive monthly summary)

**Result**: Green toast message appears for 3 seconds: "Notification settings updated"

##### 2. Security Settings
**Checkboxes**:
- [ ] Two-Factor Authentication (enable 2FA)

**Dropdown Selectors**:
- Session Timeout: 15 minutes / 30 minutes / 1 hour / 2 hours (default: 15 minutes)

**Result**: Save shows success message

##### 3. Display Settings
**Radio Buttons** (choose one):
- ◉ Light Mode (default)
- ◯ Dark Mode
- ◯ System Default

**Dropdown Selectors**:
- Theme Color: Default / Blue / Green / Purple
- Language: English / Spanish / French / German

### User Actions

#### Modify Notifications Settings
1. Check/uncheck notification toggle switches
2. Check/uncheck weekly/monthly reports
3. Settings change in real-time

#### Modify Security Settings
1. Check/uncheck two-factor authentication
2. Select session timeout duration from dropdown
3. Settings change

#### Modify Display Settings
1. Select Light Mode, Dark Mode, or System Default
2. Select theme color preference
3. Select language preference
4. Changes apply

#### Save Settings
1. Click "Save Changes" button
2. **Current Behavior**: Success toast appears: "Settings saved successfully" (green message for 3 seconds)
3. Settings are saved to local state (session only)
4. Page does not reload

#### Discard Settings
1. Click "Discard" button
2. **Current Behavior**: No handler (button does nothing)
3. **Expected**: Should revert form to last saved state

### Data Persistence
- **Local Session Only**: Settings stored in component state
- **Resets on Refresh**: Page refresh reverts to defaults
- **No Backend**: Not persisted to database

### Data Model (Settings Object)
```javascript
{
  userId: "u001",
  notifications: {
    appNotifications: true,
    emailNotifications: true,
    maintenanceAlerts: true,
    warrantyAlerts: true,
    newReportNotifications: true,
    weeklyReports: true,
    monthlyReports: false
  },
  security: {
    twoFactorAuthentication: false,
    sessionTimeout: "15_minutes"       // 15_minutes, 30_minutes, 1_hour, 2_hours
  },
  display: {
    theme: "light",                    // light, dark, system
    themeColor: "default",             // default, blue, green, purple
    language: "english"                // english, spanish, french, german
  }
}
```

### Functionality Status
- ✅ **TOGGLE SWITCHES** - All toggles work and change state
- ✅ **CHECKBOXES** - All checkboxes work
- ✅ **DROPDOWN SELECTS** - All dropdowns work
- ✅ **RADIO BUTTONS** - All radio buttons work
- ✅ **SAVE BUTTON** - Shows success toast for 3 seconds
- ⚠️ **DISCARD BUTTON** - No handler
- ⚠️ **PERSISTENCE** - Session only, no backend
- ❌ **ACTUAL THEME APPLICATION** - Theme changes don't actually change app theme
- ❌ **LANGUAGE APPLICATION** - Language selection doesn't change app language

---

## 13. Profile Page

### Route: `/profile`
### File: `client/src/pages/ProfilePage.jsx`
### Purpose
View and edit user account information.

### Who Uses It
- All logged-in users

### Information Displayed

#### Profile Header Section
- **Avatar**: User initials in colored circle (e.g., "JD" for John Doe)
- **Camera Button**: On avatar (no handler)
- **User Name**: Editable in edit mode
- **User Title**: Job title (e.g., "Administrator")
- **Buttons**: Edit / Save / Cancel (Edit visible when not editing)

#### Information Grid (View Mode)
| Field | Shows | Example |
|-------|-------|---------|
| Email | User email address | john.doe@fepms.local |
| Phone | User phone number | 555-0100 |
| Location | User location | Chicago, IL |
| Department | User department | Operations |
| Member Since | Account creation date | March 15, 2026 |
| Role | User role (read-only) | Administrator |

#### Bio Section (View Mode)
- Text area showing user bio/description
- Editable in edit mode

#### Activity Summary (View Mode)
| Metric | Shows | Example |
|--------|-------|---------|
| Equipment Managed | Count of equipment managed by user | 48 |
| Maintenance Tasks | Count of maintenance tasks assigned | 12 |
| System Uptime | Percentage of time system available | 99.2% |

#### Danger Zone (Bottom Section)
Three buttons:
- **Change Password** (no handler)
- **Logout** (functional - logs out user)
- **Delete Account** (no handler)

### User Actions

#### View Profile
1. Page loads showing user information in read-only view
2. All fields are not editable
3. Edit button visible

#### Edit Profile
1. Click "Edit Profile" button
2. **Current Behavior**: All fields become editable
3. Avatar section shows with Camera button
4. Bio becomes text area
5. Save and Cancel buttons appear
6. Edit button disappears

#### Make Changes (Edit Mode)
1. Click any field to edit:
   - Email: Text input
   - Phone: Text input (with phone format)
   - Location: Text input
   - Department: Text input
   - Bio: Large text area
2. **Note**: Role field remains read-only (cannot change role)
3. Changes are temporary (not yet saved)

#### Save Changes
1. Click "Save" button
2. **Current Behavior**: Changes are applied to profile view
3. Edit mode exits, returns to view mode
4. Fields are no longer editable
5. Updated information is now displayed

#### Cancel Editing
1. Click "Cancel" button
2. **Current Behavior**: Exits edit mode without saving changes
3. Returns to view mode with original values
4. Any unsaved changes are discarded

#### Change Password
1. Click "Change Password" button
2. **Current Behavior**: No handler (button does nothing)
3. **Expected**: Should open dialog to change password with:
   - Current password field
   - New password field
   - Confirm password field
   - Password strength indicator

#### Logout
1. Click "Logout" button
2. **Current Behavior**: Logs out user immediately
3. Redirects to login page (`/login`)
4. Session is cleared
5. User must log in again to access dashboard

#### Delete Account
1. Click "Delete Account" button
2. **Current Behavior**: No handler
3. **Expected**: Should show confirmation dialog requiring user confirmation before permanently deleting account

### Data Model (User Profile Object)
```javascript
{
  id: "u001",
  name: "John Doe",
  email: "john.doe@fepms.local",
  phone: "555-0100",
  location: "Chicago, IL",
  department: "Operations",
  role: "admin",                       // admin, manager, technician (read-only)
  bio: "Senior operations manager with 10 years of experience in restaurant equipment maintenance",
  memberSince: "2026-03-15",
  avatar: "https://...", // or initials like "JD"
  activityMetrics: {
    equipmentManaged: 48,
    maintenanceTasks: 12,
    systemUptime: 99.2                // percentage
  }
}
```

### Functionality Status
- ✅ **VIEW MODE** - Profile displays correctly
- ✅ **EDIT MODE** - Fields become editable
- ✅ **SAVE CHANGES** - Changes applied and persisted in session
- ✅ **CANCEL EDITING** - Discards unsaved changes
- ✅ **LOGOUT BUTTON** - Actually logs out user and redirects
- ⚠️ **PERSISTENCE** - Changes stored in session only, reset on refresh
- ❌ **CHANGE PASSWORD** - No handler
- ❌ **DELETE ACCOUNT** - No handler
- ❌ **CAMERA BUTTON** - No handler (no avatar upload)

---

## 14. 404 Not Found Page

### Route: `*` (any unmatched route)
### File: `client/src/pages/NotFoundPage.jsx`
### Purpose
Display error message for routes that don't exist.

### Who Uses It
- Users who try to access non-existent routes

### Information Displayed
- **404 Error Code**: "404"
- **Error Message**: "Page Not Found"
- **Description**: "The page you're looking for doesn't exist or has been moved."
- **Back Button**: "Go Back" or "Return to Dashboard"

### User Actions
1. User navigates to invalid URL (e.g., `/nonexistent`)
2. Page displays 404 error
3. Click "Return to Dashboard" or "Go Back" button
4. Navigates back to previous page or home page

### Functionality Status
- ✅ **DISPLAYS** - 404 page shows for unmatched routes
- ✅ **BACK NAVIGATION** - Returns to previous page

---

## Summary of Screen Implementation Status

| Screen | Purpose | Status | Data | Navigation | CRUD |
|--------|---------|--------|------|-----------|------|
| Login | Authentication | ✅ Implemented | ✅ Session | ✅ Works | ✅ Register/Login |
| Dashboard | Overview/KPIs | ✅ Implemented | ✅ Calculated | ✅ Works | ❌ Read-only |
| Franchises | Manage franchises | ✅ Designed | ⚠️ Mock | ✅ Works | ⚠️ Add only |
| Outlets | Manage outlets | ✅ Designed | ⚠️ Mock | ✅ Works | ⚠️ Add only |
| Equipment | Manage equipment | ✅ Designed | ⚠️ Mock | ✅ Works | ❌ No operations |
| Maintenance | Manage maintenance | ✅ Designed | ⚠️ Mock | ✅ Works | ❌ No operations |
| Service Logs | Record services | ✅ Designed | ⚠️ Mock | ✅ Works | ❌ No operations |
| Warranties | Manage warranties | ✅ Designed | ⚠️ Mock | ✅ Works | ❌ No operations |
| Claims | File claims | ✅ Designed | ⚠️ Mock | ✅ Works | ❌ No operations |
| Reports | Generate reports | ✅ Designed | ⚠️ Hardcoded | ✅ Works | ❌ No operations |
| Notifications | View alerts | ✅ Designed | ✅ Functional | ✅ Works | ✅ Delete/Mark |
| Settings | User preferences | ✅ Designed | ✅ Functional | ✅ Works | ✅ Save toggles |
| Profile | User account | ✅ Designed | ✅ Functional | ✅ Works | ✅ Edit/Logout |
| 404 | Error handling | ✅ Designed | ✅ Static | ✅ Works | ❌ Read-only |

