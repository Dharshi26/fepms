# Phase 3 Implementation - API & Access Control Test Guide

## Overview
This guide provides comprehensive testing procedures for Phase 3 (Franchise & Outlet Management with Role-Based Access Control).

## Prerequisites
- Phase 2 authentication complete and working
- Backend running with MongoDB connected
- Test users created in each role:
  - Admin user (role: admin)
  - Manager user (role: manager, with assignedFranchises and assignedOutlets)
  - Technician user (role: technician, read-only access)

---

## Franchise API Tests

### Test Setup
Create test franchises before running tests:

**POST /api/franchises** (Admin only)

Request:
```json
{
  "name": "Main Franchise - NYC",
  "code": "NYC001",
  "contactPerson": "John Manager",
  "email": "john@mainfr.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Broadway",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "postalCode": "10001",
  "description": "Main franchise headquarters"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Main Franchise - NYC",
    "code": "NYC001",
    "status": "active",
    "createdBy": "..."
  },
  "message": "Franchise created successfully"
}
```

---

## Franchise Access Control Tests

### Test 1: Admin Can Get All Franchises

**Role:** Admin
**Endpoint:** `GET /api/franchises?limit=10&page=1`

**Expected Response (200):**
- ✓ Returns all franchises regardless of createdBy
- ✓ Pagination data included
- ✓ createdBy field populated

---

### Test 2: Manager Can Get Only Assigned Franchises

**Role:** Manager (with assignedFranchises: ["NYC001_id"])
**Endpoint:** `GET /api/franchises?limit=10&page=1`

**Expected Response (200):**
- ✓ Returns only franchises in user.assignedFranchises array
- ✓ Other franchises are not visible
- ✓ Pagination reflects only assigned franchises

---

### Test 3: Technician Cannot Get Franchises

**Role:** Technician
**Endpoint:** `GET /api/franchises`

**Expected Response (403):**
```json
{
  "success": false,
  "message": "Role 'technician' is not authorized to access this resource"
}
```

---

### Test 4: Admin Can Create Franchise

**Role:** Admin
**Endpoint:** `POST /api/franchises`

**Request:**
```json
{
  "name": "West Coast Franchise",
  "code": "LA001",
  "city": "Los Angeles",
  "state": "CA",
  "country": "USA"
}
```

**Expected Response (201):**
- ✓ Franchise created with status: "active"
- ✓ createdBy set to admin's ID

---

### Test 5: Manager Cannot Create Franchise

**Role:** Manager
**Endpoint:** `POST /api/franchises`

**Expected Response (403):**
```json
{
  "success": false,
  "message": "Role 'manager' is not authorized to access this resource"
}
```

---

### Test 6: Duplicate Franchise Code Rejected

**Role:** Admin
**Endpoint:** `POST /api/franchises`

**Request:** (using existing code "NYC001")
```json
{
  "name": "Another NYC Location",
  "code": "NYC001"
}
```

**Expected Response (409):**
```json
{
  "success": false,
  "message": "Franchise code already exists"
}
```

---

### Test 7: Invalid Code Format Rejected

**Role:** Admin
**Endpoint:** `POST /api/franchises`

**Request:**
```json
{
  "name": "Test",
  "code": "invalid-code-123"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Code must be 3-10 alphanumeric characters"
    }
  ]
}
```

---

### Test 8: Manager Can Update Assigned Franchise

**Role:** Manager (with assignedFranchises containing target franchise)
**Endpoint:** `PUT /api/franchises/{franchiseId}`

**Request:**
```json
{
  "city": "Updated City",
  "phone": "+1 (555) 999-9999"
}
```

**Expected Response (200):**
- ✓ Franchise updated successfully

---

### Test 9: Manager Cannot Update Non-Assigned Franchise

**Role:** Manager (with different assignedFranchises)
**Endpoint:** `PUT /api/franchises/{other_franchise_id}`

**Expected Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to access this franchise"
}
```

---

### Test 10: Admin Can Deactivate Franchise

**Role:** Admin
**Endpoint:** `DELETE /api/franchises/{franchiseId}`

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "inactive"
  },
  "message": "Franchise deactivated successfully"
}
```

---

### Test 11: Cannot Deactivate Already Inactive Franchise

**Role:** Admin
**Endpoint:** `DELETE /api/franchises/{franchiseId}` (already inactive)

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Franchise is already inactive"
}
```

---

### Test 12: Search Franchises

**Role:** Admin/Manager
**Endpoint:** `GET /api/franchises?search=NYC`

**Expected Response (200):**
- ✓ Returns franchises matching search (name, code, city)
- ✓ Case-insensitive search

---

### Test 13: Filter by Status

**Role:** Admin
**Endpoint:** `GET /api/franchises?status=active`

**Expected Response (200):**
- ✓ Returns only active franchises

---

---

## Outlet API Tests

### Test Setup
Create test outlets:

**POST /api/outlets** (Admin/Manager)

Request:
```json
{
  "franchise": "NYC001_id",
  "name": "NYC Downtown Outlet",
  "code": "OUT001",
  "contactPerson": "Jane Tech",
  "email": "jane@outlet.com",
  "phone": "+1 (555) 234-5678",
  "address": "456 Park Ave",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "postalCode": "10002"
}
```

---

## Outlet Access Control Tests

### Test 14: Admin Can Get All Outlets

**Role:** Admin
**Endpoint:** `GET /api/outlets?limit=10&page=1`

**Expected Response (200):**
- ✓ Returns all outlets
- ✓ Includes franchise reference (populated)
- ✓ Pagination included

---

### Test 15: Manager Can Get Assigned Franchise Outlets

**Role:** Manager (assignedFranchises: ["NYC001_id"])
**Endpoint:** `GET /api/outlets?limit=10&page=1`

**Expected Response (200):**
- ✓ Returns outlets only for assigned franchises
- ✓ Other outlets hidden
- ✓ Filtered by assignedFranchises

---

### Test 16: Technician Cannot Get Outlets

**Role:** Technician
**Endpoint:** `GET /api/outlets`

**Expected Response (403):**
```json
{
  "success": false,
  "message": "Role 'technician' is not authorized to access this resource"
}
```

---

### Test 17: Filter Outlets by Franchise

**Role:** Manager
**Endpoint:** `GET /api/outlets?franchise=NYC001_id`

**Expected Response (200):**
- ✓ Returns only outlets for specified franchise
- ✓ Manager must have access to franchise

---

### Test 18: Admin Can Create Outlet

**Role:** Admin
**Endpoint:** `POST /api/outlets`

**Request:**
```json
{
  "franchise": "NYC001_id",
  "name": "New Outlet",
  "code": "OUT002"
}
```

**Expected Response (201):**
- ✓ Outlet created with status: "active"
- ✓ Outlet linked to franchise

---

### Test 19: Manager Can Create Outlet for Assigned Franchise

**Role:** Manager (assignedFranchises: ["NYC001_id"])
**Endpoint:** `POST /api/outlets`

**Request:**
```json
{
  "franchise": "NYC001_id",
  "name": "Manager-Created Outlet",
  "code": "OUT003"
}
```

**Expected Response (201):**
- ✓ Outlet created successfully

---

### Test 20: Manager Cannot Create Outlet for Unassigned Franchise

**Role:** Manager (assignedFranchises: ["NYC001_id"])
**Endpoint:** `POST /api/outlets`

**Request:**
```json
{
  "franchise": "LA001_id",
  "name": "Unauthorized Outlet",
  "code": "OUT004"
}
```

**Expected Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to create outlets in this franchise"
}
```

---

### Test 21: Invalid Franchise Reference Rejected

**Role:** Admin
**Endpoint:** `POST /api/outlets`

**Request:**
```json
{
  "franchise": "invalid_franchise_id",
  "name": "Test",
  "code": "OUT005"
}
```

**Expected Response (404):**
```json
{
  "success": false,
  "message": "Franchise not found"
}
```

---

### Test 22: Duplicate Outlet Code Within Franchise Rejected

**Role:** Admin
**Endpoint:** `POST /api/outlets` (using same franchise and code)

**Expected Response (409):**
```json
{
  "success": false,
  "message": "Outlet code already exists within this franchise"
}
```

---

### Test 23: Same Code Allowed in Different Franchises

**Role:** Admin
**Endpoint:** `POST /api/outlets`

Request 1: Create OUT001 in NYC franchise
Request 2: Create OUT001 in LA franchise (different franchise)

**Expected Response (201):**
- ✓ Both requests succeed
- ✓ Compound index (franchise, code) allows same code in different franchises

---

### Test 24: Manager Can Update Assigned Outlet

**Role:** Manager (assignedFranchises: ["NYC001_id"], with outlet in NYC)
**Endpoint:** `PUT /api/outlets/{outletId}`

**Request:**
```json
{
  "city": "Updated City",
  "phone": "+1 (555) 888-8888"
}
```

**Expected Response (200):**
- ✓ Outlet updated successfully

---

### Test 25: Manager Cannot Update Unassigned Outlet

**Role:** Manager (assignedFranchises: ["NYC001_id"], outlet in LA franchise)
**Endpoint:** `PUT /api/outlets/{outletId}`

**Expected Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to update this outlet"
}
```

---

### Test 26: Admin Can Deactivate Outlet

**Role:** Admin
**Endpoint:** `DELETE /api/outlets/{outletId}`

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "inactive"
  },
  "message": "Outlet deactivated successfully"
}
```

---

### Test 27: Manager Cannot Deactivate Unassigned Outlet

**Role:** Manager (without access to outlet's franchise)
**Endpoint:** `DELETE /api/outlets/{outletId}`

**Expected Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to delete this outlet"
}
```

---

### Test 28: Search Outlets

**Role:** Admin
**Endpoint:** `GET /api/outlets?search=downtown`

**Expected Response (200):**
- ✓ Returns outlets matching search (name, code, city)

---

### Test 29: Filter Outlets by Status

**Role:** Admin
**Endpoint:** `GET /api/outlets?status=active`

**Expected Response (200):**
- ✓ Returns only active outlets

---

## Authorization Middleware Tests

### Test 30: Invalid Token Rejected

**Endpoint:** `GET /api/franchises`
**Authorization Header:** `Bearer invalid_token_here`

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized, invalid token"
}
```

---

### Test 31: No Token Rejected

**Endpoint:** `GET /api/franchises`
**Authorization Header:** (missing)

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

---

### Test 32: Expired Token Rejected

**Endpoint:** `GET /api/franchises`
**Authorization Header:** `Bearer <expired_token>`

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized, invalid token"
}
```

---

## Data Validation Tests

### Test 33: Name Length Validation

**Endpoint:** `POST /api/franchises`

Request (too short):
```json
{
  "name": "AB",
  "code": "TEST001"
}
```

**Expected Response (400):**
- ✓ Error: "Name must be 3-100 characters"

---

### Test 34: Code Format Validation

**Endpoint:** `POST /api/franchises`

Request (lowercase code):
```json
{
  "name": "Test Franchise",
  "code": "test001"
}
```

**Expected Response (400):**
- ✓ Error: "Code must be 3-10 alphanumeric characters"

---

### Test 35: Email Format Validation

**Endpoint:** `POST /api/franchises`

Request (invalid email):
```json
{
  "name": "Test",
  "code": "TEST001",
  "email": "not-a-valid-email"
}
```

**Expected Response (400):**
- ✓ Error: "Valid email is required"

---

### Test 36: Phone Format Validation

**Endpoint:** `POST /api/franchises`

Request (invalid phone):
```json
{
  "name": "Test",
  "code": "TEST001",
  "phone": "12"
}
```

**Expected Response (400):**
- ✓ Error: "Valid phone number is required"

---

## Frontend Integration Tests

### Test 37: Franchises Page Load (Web)

1. Login as Admin
2. Navigate to /franchises
3. Verify franchises table populated

**Expected:**
- ✓ Page loads without errors
- ✓ Franchises displayed in table
- ✓ Search/filter working
- ✓ Pagination controls visible

---

### Test 38: Create Franchise (Web)

1. Login as Admin
2. Click "Add Franchise"
3. Fill form and submit
4. Verify new franchise appears in list

**Expected:**
- ✓ Modal opens
- ✓ Form validates on submit
- ✓ Success message shown
- ✓ New franchise appears in table

---

### Test 39: Manager Cannot Create Franchise (Web)

1. Login as Manager
2. Navigate to /franchises
3. Verify "Add Franchise" button not visible

**Expected:**
- ✓ Button absent or disabled
- ✓ Cannot access POST endpoint

---

### Test 40: Outlets Page Load (Web)

1. Login as Manager
2. Navigate to /outlets
3. Verify outlets table showing assigned franchises only

**Expected:**
- ✓ Page loads
- ✓ Outlets filtered by assignedFranchises
- ✓ Franchise filter dropdown populated
- ✓ Can search/filter within permissions

---

## Mobile App Integration Tests

### Test 41: Franchises Tab Load (Mobile)

1. Login to mobile app
2. Tap "Franchises" tab
3. Verify list loads

**Expected:**
- ✓ Franchises screen displays
- ✓ Cards shown with name, code, status
- ✓ Search/refresh working
- ✓ Tap expands card to show details

---

### Test 42: Outlets Tab Load (Mobile)

1. Login to mobile app
2. Tap "Outlets" tab
3. Verify list loads with franchise info

**Expected:**
- ✓ Outlets screen displays
- ✓ Franchise tag shown for each outlet
- ✓ Details expandable
- ✓ Pagination info displayed

---

### Test 43: Pull-to-Refresh (Mobile)

1. Open Franchises tab
2. Pull down to refresh
3. Verify data reloads

**Expected:**
- ✓ Spinner appears
- ✓ Data refreshed from API
- ✓ Spinner disappears

---

## Pagination Tests

### Test 44: Pagination Navigation (API)

1. Request: `GET /api/franchises?page=1&limit=5`
2. Verify: pagination.total, pagination.page, pagination.pages
3. Request: `GET /api/franchises?page=2&limit=5`
4. Verify: Different franchises returned

**Expected:**
- ✓ page field accurate
- ✓ limit respected
- ✓ pages calculated correctly
- ✓ Data changes per page

---

## Error Handling Tests

### Test 45: Graceful Error Display

**Scenario:** Network error during franchise load

**Expected (Web):**
- ✓ Error message shown
- ✓ Retry button available
- ✓ No app crash

**Expected (Mobile):**
- ✓ Error message in empty state
- ✓ Pull-to-refresh allows retry
- ✓ No crash

---

### Test 46: Validation Error Display

**Scenario:** Create franchise with invalid data

**Expected (Web):**
- ✓ Form shows validation errors
- ✓ Specific field highlighted
- ✓ Submit disabled until fixed

**Expected (Mobile):**
- ✓ Error message shown (if mobile supports forms in Phase 3+)

---

## Summary Checklist

- [ ] All franchise CRUD operations work correctly
- [ ] All outlet CRUD operations work correctly
- [ ] Role-based access control enforced (Admin/Manager/Technician)
- [ ] Manager scope limitations working (assignedFranchises/Outlets)
- [ ] Input validation all fields
- [ ] Duplicate code prevention working
- [ ] Soft delete (deactivate) functioning
- [ ] Pagination working (web and API)
- [ ] Search/filter working
- [ ] Web dashboard pages load and function
- [ ] Mobile tabs display and refresh
- [ ] Error messages clear and helpful
- [ ] No permission bypass vulnerabilities
- [ ] Token expiration handled
- [ ] All status codes correct (201, 400, 401, 403, 404, 409)

---

## Notes

### Known Limitations (Phase 3)
- No bulk operations (planned for Phase 4)
- No advanced filtering by multiple criteria (Phase 4)
- Mobile screens are read-only (create/edit in Phase 4+)
- No real-time updates/WebSocket (Phase 4+)
- No audit logging (Phase 4+)

### Production Readiness
Before deploying Phase 3 to production:
1. Conduct full access control security review
2. Load test with 1000+ franchises/outlets
3. Test MongoDB indexes performance
4. Implement rate limiting on API endpoints
5. Add request logging and monitoring
6. Setup automated backup procedures

