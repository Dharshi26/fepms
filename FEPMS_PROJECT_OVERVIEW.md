# FEPMS Project Overview

## What Is FEPMS?

**FEPMS** (Franchise Equipment Preventative Maintenance System) is a complete business management application designed to help franchise businesses manage the maintenance and lifecycle of their commercial kitchen and refrigeration equipment across multiple locations.

FEPMS is a **MERN-stack** application (MongoDB, Express, React, React Native) that provides three interfaces:
1. **Web Dashboard** - For managers and administrators to manage franchises, outlets, equipment, and view reports
2. **Backend API** - Centralized REST API for data management and business logic
3. **Mobile App** - For technicians in the field to view maintenance tasks and log service work

---

## Business Problem FEPMS Solves

### The Challenge
Commercial franchise businesses (like McDonald's, KFC, Subway) operate hundreds of outlets across different cities. Each outlet has multiple pieces of equipment:
- Industrial refrigerators and freezers
- Cooking equipment
- Beverage dispensers
- Washing systems
- Climate control systems
- Ventilation equipment

**Problems without FEPMS:**
1. **Equipment Downtime** - No visibility into which equipment needs maintenance, leading to unexpected failures
2. **Warranty Compliance** - Missing warranty deadlines and losing coverage
3. **Service Tracking** - No record of maintenance work completed, creating audit and compliance issues
4. **Safety & Regulations** - Commercial equipment must be regularly certified (health departments require this)
5. **Franchise Coordination** - Corporate office can't track maintenance across all franchise locations
6. **Technician Communication** - Technicians don't know what equipment needs service or what work was done previously

### How FEPMS Solves It
FEPMS provides:
- **Preventive Maintenance Scheduling** - Automatically schedule regular maintenance based on equipment type
- **Maintenance Alerts** - Notify when maintenance is due, overdue, or coming up soon
- **Warranty Tracking** - Track warranty expiration dates and warranty claims
- **Service History** - Complete record of all service work and technician visits
- **Multi-Location Management** - See all franchises, outlets, and equipment in one place
- **Real-Time Notifications** - Alerts for maintenance needs, warranty expiries, and service completions
- **Compliance Reporting** - Generate reports for audits and health inspections

---

## Why Does a Franchise Need This System?

### 1. **Reduce Equipment Downtime**
   - A broken refrigerator in a restaurant = lost food and lost sales
   - Preventive maintenance keeps equipment running longer
   - Planned maintenance is cheaper than emergency repairs

### 2. **Warranty Management**
   - Equipment comes with warranties (1-3 years typically)
   - Missing warranty deadlines = paying for repairs that were covered
   - FEPMS tracks expiry dates and reminds before expiration

### 3. **Legal & Health Compliance**
   - Health departments require equipment maintenance records
   - Food safety regulations mandate inspections and certifications
   - FEPMS provides documented proof of maintenance

### 4. **Cost Control**
   - Track maintenance costs across franchises
   - Identify equipment that breaks frequently (replace instead of keep repairing)
   - Budget planning with maintenance history

### 5. **Franchise Accountability**
   - Corporate office ensures franchisees are maintaining equipment
   - Franchisees prove they're following maintenance standards
   - Fair comparison of performance across locations

### 6. **Technician Efficiency**
   - Technicians know exactly what equipment to service (no guessing)
   - Technicians see previous service history (context for repairs)
   - Field technicians can update status without returning to office

---

## What Types of Equipment Does FEPMS Manage?

FEPMS tracks these equipment categories (with examples):

### 1. **Refrigeration & Cold Storage**
   - Walk-in freezers
   - Reach-in refrigerators
   - Under-counter refrigerators
   - Display cases

### 2. **Cooking Equipment**
   - Fryers (gas and electric)
   - Grills
   - Ovens
   - Steamers

### 3. **Beverage Equipment**
   - Soda fountain dispensers
   - Coffee makers
   - Ice machines

### 4. **Washing Equipment**
   - Commercial dishwashers
   - Handwashing stations
   - Sanitizers

### 5. **Climate Control**
   - HVAC systems
   - Air conditioners

### 6. **Ventilation**
   - Hood systems
   - Exhaust fans
   - Air filters

Each piece of equipment has:
- Serial number
- Installation date
- Purchase price
- Warranty information
- Maintenance schedule
- Service history

---

## Main Objectives of FEPMS

### Short-term (Phase 1-2)
1. Create a functional web dashboard for planning and management
2. Implement user authentication and role-based access control
3. Enable data entry for franchises, outlets, and equipment

### Medium-term (Phase 3-5)
4. Provide preventive maintenance scheduling and alerts
5. Track service work through service logs
6. Manage warranty lifecycle and claims

### Long-term (Phase 6-7)
7. Generate analytics and performance reports
8. Provide real-time notifications and alerts
9. Create mobile app for field technicians
10. Integrate all systems (web, API, mobile) into unified platform

---

## Who Are the Intended Users?

### 1. **System Administrator**
   - **Role**: Manages the entire system
   - **Responsibilities**: User account management, system configuration, settings
   - **Permissions**: Full access to all features
   - **Example**: IT person at corporate franchise headquarters

### 2. **Franchise Manager / Area Manager**
   - **Role**: Oversees one or more franchises/outlets
   - **Responsibilities**: Register outlets, assign equipment, schedule maintenance, view reports
   - **Permissions**: Full access to assigned franchises (cannot see other franchises)
   - **Example**: Person managing 10 McDonald's locations in a region

### 3. **Outlet Manager / Shift Supervisor**
   - **Role**: Manages one specific outlet/location
   - **Responsibilities**: Report equipment issues, request maintenance, view maintenance schedule
   - **Permissions**: Access to only their outlet's equipment and maintenance schedule
   - **Example**: Restaurant manager at one location

### 4. **Technician**
   - **Role**: Performs on-site maintenance and repairs
   - **Responsibilities**: Check equipment, perform maintenance, log service work, upload certificates
   - **Permissions**: View assigned maintenance tasks, log completed work
   - **Example**: Service technician who visits multiple outlets

### 5. **Corporate Admin**
   - **Role**: Executive overview and strategy
   - **Responsibilities**: View system-wide reports, analytics, performance metrics
   - **Permissions**: View-only access to all data (read-only analytics)
   - **Example**: VP of Operations at franchise headquarters

---

## Core Modules of FEPMS

### 1. **Franchise Management**
   - Register and manage franchise organizations
   - Track franchise type (Corporate, Master Franchise, Area Developer, Individual)
   - Monitor franchise performance (uptime %, compliance %)
   - Link franchises to multiple outlets

### 2. **Outlet Management**
   - Register individual franchise locations
   - Assign address, contact information, operating hours
   - Track equipment counts per outlet
   - Monitor outlet performance and revenue

### 3. **Equipment Management**
   - Register commercial equipment in the system
   - Assign equipment to outlets
   - Track warranty status and expiry dates
   - Monitor equipment criticality (how important is this equipment?)

### 4. **Preventive Maintenance**
   - Create maintenance schedules (daily, weekly, monthly, quarterly, annually)
   - Auto-generate maintenance tasks based on schedule
   - Assign technicians to maintenance tasks
   - Track maintenance status (Scheduled, Due, In Progress, Completed, Overdue)

### 5. **Service Logs**
   - Record every maintenance visit and repair work
   - Capture maintenance date, technician name, description of work
   - Track approval status of service work
   - Store certificates and documentation

### 6. **Warranty Management**
   - Register warranties for equipment
   - Track warranty expiry dates
   - Alert when warranty expires (lose coverage)
   - Track warranty coverage type (parts & labor vs. parts only)

### 7. **Warranty Claims**
   - File warranty claims for equipment needing repair under warranty
   - Track claim status (Pending, In Review, Approved, Rejected)
   - Record claim amount and approval amount
   - Manage warranty claim workflow

### 8. **Notifications & Alerts**
   - Maintenance Due alerts
   - Warranty Expiring Soon alerts
   - Service Completion notifications
   - Equipment Failure alerts

### 9. **Reports & Analytics**
   - Equipment status reports
   - Maintenance history reports
   - Warranty claim reports
   - Service performance reports
   - Cost analysis reports
   - Franchise/outlet performance metrics

### 10. **Settings & Configuration**
   - User account settings
   - Notification preferences
   - Display preferences (theme, language)
   - Security settings

---

## Data Relationships

Here's how the core entities relate to each other:

```
Franchise (e.g., McDonald's)
    └── Outlet 1 (Location in New York)
    │       └── Equipment 1 (Walk-in Freezer)
    │       │   └── Maintenance Schedule (Monthly maintenance)
    │       │   └── Warranty (Expires Dec 2026)
    │       │   └── Service Logs (Record of all maintenance)
    │       │
    │       └── Equipment 2 (Fryer)
    │           └── Maintenance Schedule
    │           └── Warranty Claims (If something breaks)
    │
    └── Outlet 2 (Location in Boston)
            └── Equipment 3, 4, 5...
```

---

## Current Project Status

### Phase 1: Infrastructure & UI Scaffolding ✅ **COMPLETE**
- Backend API routes defined
- Database models created
- React frontend with layout and navigation
- Authentication scaffolding
- Mock data for testing UI

### Phase 2-7: Feature Implementation 🚧 **IN PROGRESS**
- Phase 2: User Authentication & Roles
- Phase 3: Franchise/Outlet/Equipment CRUD
- Phase 4: Preventive Maintenance
- Phase 5: Service Logs
- Phase 6: Warranties & Claims
- Phase 7: Reports & Analytics

---

## Technical Architecture

### Three-Tier Architecture

```
Client Layer (Frontend)
├── Web Dashboard (React + Vite)
│   └── Displays data, manages user interactions
│
├── Mobile App (React Native + Expo)
│   └── Field technicians access maintenance tasks
│
└── (Both communicate via REST API)

↓↓↓ HTTP/REST API ↓↓↓

Application Layer (Backend)
├── Express.js REST API
├── Business logic controllers
├── Input validation & error handling
└── JWT authentication

↓↓↓ Queries/Updates ↓↓↓

Data Layer (Database)
├── MongoDB (NoSQL database)
├── Collections: Franchises, Outlets, Equipment, etc.
└── Persistent data storage
```

### Key Technologies

**Frontend (Web Dashboard)**
- React 18 with Hooks
- Vite (fast build tool)
- React Router v6 (navigation)
- Tailwind CSS (styling)
- Axios (API communication)
- Lucide React (icons)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose (database driver)
- JWT (authentication)
- bcryptjs (password hashing)
- Multer (file uploads)
- express-validator (input validation)

**Mobile**
- React Native + Expo
- React Navigation (mobile routing)
- Axios (API communication)

---

## Current Frontend Status

### Implemented ✅
- Login page with registration
- Dashboard with KPI cards
- Sidebar navigation (6 sections)
- Topbar with breadcrumbs
- Premium page layout components
- Search and filter functionality (multiple pages)
- Mock data for all modules
- Responsive design

### Partially Implemented ⚠️
- Page screens exist but use mock data only
- No actual CRUD operations yet
- No backend API integration
- Buttons exist but most don't perform actions

### Not Yet Implemented ❌
- Real data persistence
- Backend API integration
- Role-based access control (backend enforcement)
- Notifications system
- Reports generation
- File upload (certificates)
- Mobile app

---

## Next Development Steps

1. **Connect Frontend to Backend API** (Phase 2+)
   - Replace mock data with real API calls
   - Implement actual CRUD operations
   - Add error handling for API failures

2. **Implement Role-Based Access Control** (Phase 2)
   - Admin can manage all users
   - Manager can manage assigned franchises
   - Technician can only see assigned tasks

3. **Build Mobile App** (After Phase 2)
   - Create React Native interfaces
   - Implement field technician workflows
   - Add offline support for maintenance logs

4. **Advanced Features** (Phase 6-7)
   - Analytics dashboard
   - Report generation and export
   - Notification system
   - Settings and preferences

---

## Summary

FEPMS is a comprehensive equipment maintenance management system designed to help franchise businesses:
- **Maintain Equipment** through preventive maintenance scheduling
- **Comply with Regulations** by tracking service history and certifications
- **Manage Warranties** and reduce repair costs
- **Coordinate Across Locations** with centralized visibility
- **Support Field Technicians** with mobile access to work orders

The application is built as a modern SaaS system with a web dashboard for managers, a backend API for data management, and a mobile app for field technicians, all connected through a unified database of franchise operations, equipment, and service records.

