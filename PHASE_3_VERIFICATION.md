# Phase 3 Implementation Verification Checklist

## Backend Models

### ✓ Franchise Model (`backend/models/Franchise.js`)
- [x] Schema includes: name, code, contactPerson, email, phone, address, city, state, country, postalCode, description, status, createdBy
- [x] Name: 3-100 character validation
- [x] Code: 3-10 alphanumeric, uppercase, unique
- [x] Email: Email format validation
- [x] Phone: Phone format validation
- [x] Status: enum ['active', 'inactive'], default 'active'
- [x] createdBy: Required ObjectId reference to User
- [x] Timestamps: createdAt, updatedAt
- [x] Indexes: code, status, createdBy, text search on name/code

### ✓ Outlet Model (`backend/models/Outlet.js`)
- [x] Schema includes: franchise, name, code, address, city, state, country, postalCode, contactPerson, phone, email, description, status, createdBy
- [x] Franchise: Required ObjectId reference
- [x] Name: 3-100 character validation
- [x] Code: 3-10 alphanumeric, uppercase
- [x] Compound unique index: (franchise, code)
- [x] Email/Phone: Format validation
- [x] Status: enum ['active', 'inactive'], default 'active'
- [x] createdBy: Required ObjectId reference
- [x] Timestamps: createdAt, updatedAt
- [x] Indexes: franchise/status, createdBy, text search

---

## Backend API Endpoints

### ✓ Franchise Endpoints (`backend/routes/franchises.js`)

**GET /api/franchises**
- [x] Authorization: Admin, Manager
- [x] Query params: search, status, page, limit
- [x] Manager sees only assignedFranchises
- [x] Pagination implemented
- [x] Response includes createdBy (populated)

**GET /api/franchises/:id**
- [x] Authorization: Admin, Manager
- [x] Manager scope check on assignedFranchises
- [x] Returns 403 if not authorized
- [x] Populates createdBy

**POST /api/franchises**
- [x] Authorization: Admin only
- [x] Validates: name, code, email, phone, description
- [x] Unique code check (409 on duplicate)
- [x] Sets createdBy to authenticated user
- [x] Returns 201 on success

**PUT /api/franchises/:id**
- [x] Authorization: Admin only
- [x] Input validation on fields
- [x] Duplicate code check with exception for same franchise
- [x] Returns 404 if not found
- [x] runValidators: true

**DELETE /api/franchises/:id**
- [x] Authorization: Admin only
- [x] Soft delete (sets status: 'inactive')
- [x] Returns 400 if already inactive
- [x] Returns 404 if not found

### ✓ Outlet Endpoints (`backend/routes/outlets.js`)

**GET /api/outlets**
- [x] Authorization: Admin, Manager
- [x] Query params: search, status, franchise, page, limit
- [x] Manager sees only franchises in assignedFranchises
- [x] Filters by assignedOutlets if present
- [x] Pagination implemented
- [x] Populates franchise and createdBy

**GET /api/outlets/:id**
- [x] Authorization: Admin, Manager
- [x] Manager scope check on franchise
- [x] Alternative check on assignedOutlets
- [x] Returns 403 if not authorized
- [x] Populates franchise and createdBy

**POST /api/outlets**
- [x] Authorization: Admin, Manager
- [x] Validates franchise reference exists
- [x] Manager scope check (must have access to franchise)
- [x] Validates outlet fields
- [x] Compound code uniqueness check
- [x] Sets createdBy to authenticated user
- [x] Returns 201 on success

**PUT /api/outlets/:id**
- [x] Authorization: Admin, Manager
- [x] Manager scope check on outlet's franchise
- [x] Validates franchise if being changed
- [x] Duplicate code check with exceptions
- [x] runValidators: true
- [x] Populates franchise and createdBy in response

**DELETE /api/outlets/:id**
- [x] Authorization: Admin only (with manager scope check in code)
- [x] Manager can only delete within assigned franchise
- [x] Soft delete (sets status: 'inactive')
- [x] Returns 400 if already inactive
- [x] Returns 404 if not found

---

## Backend Validation & Error Handling

### ✓ Input Validation
- [x] express-validator middleware applied to create/update routes
- [x] Franchise: name minlength/maxlength, code regex, email, phone, description
- [x] Outlet: franchise required, name, code, email, phone, description
- [x] Returns 400 with error array on validation failure
- [x] Conditional validation (field exists check)

### ✓ Error Handling
- [x] 400: Bad request (validation)
- [x] 401: Unauthorized (no token/invalid token)
- [x] 403: Forbidden (role/scope not authorized)
- [x] 404: Not found (franchise/outlet doesn't exist)
- [x] 409: Conflict (duplicate code/email)
- [x] Duplicate key error caught and converted to 409
- [x] Proper error messages returned

---

## Authorization Middleware

### ✓ Franchise Authorization
- [x] GET: protect + authorize('admin', 'manager') on routes
- [x] POST: protect + authorize('admin') only
- [x] PUT: protect + authorize('admin') only
- [x] DELETE: protect + authorize('admin') only
- [x] Manager-level filtering in controller (assignedFranchises)

### ✓ Outlet Authorization
- [x] GET: protect + authorize('admin', 'manager') on routes
- [x] POST: protect + authorize('admin', 'manager') on routes
- [x] PUT: protect + authorize('admin', 'manager') on routes
- [x] DELETE: protect + authorize('admin') on routes
- [x] Manager-level filtering in controller (franchise + outlets)

---

## Web Dashboard UI

### ✓ FranchisesPage (`client/src/pages/FranchisesPage.jsx`)
- [x] Table display: name, code, contact, city, status
- [x] Search functionality (by name, code, city)
- [x] Status filter dropdown
- [x] Pagination (previous/next buttons, page indicator)
- [x] Create button (admin only)
- [x] Edit button (admin only)
- [x] Deactivate button (admin only, hidden if inactive)
- [x] Modal form for create/edit
- [x] Form fields: name, code, contactPerson, email, phone, address, city, state, country, postalCode, description
- [x] Form validation (required fields, field limits)
- [x] Error display (form and page level)
- [x] Loading state (spinner)
- [x] Empty state message
- [x] Role-based UI (view-only for technician)

### ✓ OutletsPage (`client/src/pages/OutletsPage.jsx`)
- [x] Table display: name, code, franchise, city, contact, status
- [x] Search functionality
- [x] Status filter dropdown
- [x] Franchise filter dropdown (populated from franchises)
- [x] Pagination controls
- [x] Create button (admin/manager only)
- [x] Edit button (admin/manager only)
- [x] Deactivate button (admin only)
- [x] Modal form for create/edit
- [x] Franchise selector (disabled on edit)
- [x] Form fields: franchise, name, code, contactPerson, email, phone, address, city, state, country, postalCode, description
- [x] Form validation
- [x] Error display
- [x] Loading state
- [x] Empty state message

### ✓ Custom Hooks (`client/src/hooks/`)
- [x] useFranchises: getFranchises, getFranchise, createFranchise, updateFranchise, deleteFranchise
- [x] useOutlets: getOutlets, getOutlet, createOutlet, updateOutlet, deleteOutlet
- [x] Pagination support
- [x] Search/filter support
- [x] Error handling
- [x] Loading states

### ✓ Routing (`client/src/App.jsx`)
- [x] /franchises route renders FranchisesPage
- [x] /outlets route renders OutletsPage
- [x] Both protected by ProtectedRoute wrapper
- [x] Require authentication

---

## Mobile App UI

### ✓ FranchisesScreen (`mobile/src/screens/FranchisesScreen.jsx`)
- [x] Displays franchises in expandable cards
- [x] Shows: name, code, status badge
- [x] Expandable details: city/state, contact, email, phone, description
- [x] Search functionality (by name/code)
- [x] Pull-to-refresh support
- [x] Load more on scroll (pagination)
- [x] Loading spinner
- [x] Empty state message
- [x] Error message display
- [x] Pagination info footer
- [x] Status badge styling (active/inactive)

### ✓ OutletsScreen (`mobile/src/screens/OutletsScreen.jsx`)
- [x] Displays outlets in expandable cards
- [x] Shows: name, code, franchise tag, status badge
- [x] Expandable details: full address (city/state/country), contact info
- [x] Search functionality
- [x] Pull-to-refresh support
- [x] Load more on scroll
- [x] Loading spinner
- [x] Empty state message
- [x] Error message display
- [x] Pagination info footer

### ✓ Mobile Hooks
- [x] useFranchises hook for mobile (pagination, search)
- [x] useOutlets hook for mobile (pagination, search, franchise filter)
- [x] Error handling
- [x] Loading states

### ✓ Navigation (`mobile/App.js`)
- [x] Franchises tab added to bottom navigator
- [x] Outlets tab added to bottom navigator
- [x] Proper tab ordering: Home, Franchises, Outlets, Tasks, Equipment, Alerts, Profile
- [x] AuthProvider wraps entire app
- [x] Protected navigation (Login until authenticated)

---

## API Service Layer

### ✓ Web API Service (`client/src/services/api.js`)
- [x] Request interceptor attaches Bearer token from localStorage
- [x] Response interceptor handles 401 (clears token/user)
- [x] Axios instance configured with baseURL

### ✓ Mobile API Service (`mobile/src/services/api.js`)
- [x] Request interceptor reads token from SecureStore (async)
- [x] Attaches Bearer token to Authorization header
- [x] Response interceptor handles 401
- [x] Clears SecureStore on 401
- [x] Axios instance configured with baseURL for emulator/device

---

## Security & Access Control

### ✓ Authentication
- [x] All endpoints require valid JWT token (via protect middleware)
- [x] Invalid/expired tokens return 401
- [x] No token returns 401

### ✓ Authorization
- [x] Franchise endpoints: Admin full access, Manager read + assigned franchises, Technician denied
- [x] Outlet endpoints: Admin full access, Manager read/create/update for assigned franchises, Technician denied
- [x] Deactivate endpoints: Admin only
- [x] Scope checks prevent managers from accessing unassigned franchises/outlets

### ✓ Input Validation
- [x] All required fields validated
- [x] Field length constraints enforced
- [x] Email/phone format validation
- [x] Code format and uniqueness validation
- [x] Compound uniqueness for outlet code per franchise

### ✓ Data Isolation
- [x] Managers see only their assigned franchises
- [x] Managers see only outlets from their franchises or assigned outlets
- [x] Technicians cannot access franchise/outlet endpoints
- [x] No cross-franchise access for managers

---

## Data Flow & Integration

### ✓ Web Dashboard Flow
1. User logs in → Login page
2. Auth token stored in localStorage
3. Navigate to /franchises
4. ProtectedRoute checks authentication
5. FranchisesPage loads via useFranchises hook
6. Hook calls GET /api/franchises with bearer token
7. Backend applies role-based filtering
8. Table renders with franchises
9. User can create/edit/deactivate based on role
10. Modal form validates and submits
11. Success → franchise list updates

### ✓ Mobile Flow
1. User logs in → LoginScreen
2. Auth token stored in SecureStore
3. Navigate to Franchises/Outlets tabs
4. RootNavigator shows HomeTabs
5. FranchisesScreen loads via useFranchises hook
6. Hook calls GET /api/franchises with bearer token
7. Cards display with details expandable
8. Pull-to-refresh or load more available
9. Same for OutletsScreen

---

## Known Limitations (Phase 3)

- [ ] Mobile create/edit forms (read-only screens only)
- [ ] Real-time updates (WebSocket/polling not implemented)
- [ ] Bulk operations (create/update multiple at once)
- [ ] Advanced filtering (multiple criteria combinations)
- [ ] Audit logging (who changed what when)
- [ ] Approval workflows (all operations immediate)
- [ ] File uploads (images, documents)
- [ ] Email notifications (on franchise/outlet changes)
- [ ] SMS alerts
- [ ] Scheduled tasks
- [ ] Export functionality (CSV/PDF)

---

## Phase 3 Success Criteria - All Met ✅

- [x] Franchise model with full validation
- [x] Outlet model with full validation
- [x] Franchise CRUD API with role-based access
- [x] Outlet CRUD API with role-based access
- [x] Admin can manage all franchises/outlets
- [x] Manager can manage assigned franchises/outlets
- [x] Technician cannot access franchise/outlet management
- [x] Web dashboard screens for franchises/outlets
- [x] Mobile screens for franchises/outlets (read-only)
- [x] Search and filtering functionality
- [x] Pagination support
- [x] Error handling and validation
- [x] Protected routes and API endpoints
- [x] All HTTP status codes appropriate (201, 400, 401, 403, 404, 409)
- [x] Soft delete (deactivate) implemented

---

## Deployment Checklist

Before deploying Phase 3 to production:

- [ ] All test cases passed (see PHASE_3_TEST_GUIDE.md)
- [ ] MongoDB indexes created: `db.franchises.ensureIndex({code: 1})`
- [ ] Database backups configured
- [ ] API rate limiting implemented
- [ ] Request logging configured
- [ ] Error tracking (Sentry/similar) enabled
- [ ] Performance monitoring active
- [ ] Security audit completed
- [ ] Load testing with 1000+ franchises
- [ ] Tested with slow network conditions
- [ ] Browser compatibility verified (web)
- [ ] Mobile device testing (Android/iOS)
- [ ] Production environment variables set
- [ ] JWT_SECRET changed from test value
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented

---

## Performance Notes

- Franchise table with 1000+ franchises: Paginate with limit=10-20
- Search on name/code/city indexes: O(log n) with text index
- Manager filtering: O(m) where m = number of assigned franchises
- Outlet compound index (franchise, code): Efficient lookups per franchise
- Consider caching for manager's assignedFranchises/Outlets arrays

---

## Next Phase (Phase 4) - Roadmap

- User management (create Admin/Manager accounts)
- Franchise/Outlet assignment to managers
- Equipment management (extends Phase 1)
- Maintenance schedules (extends Phase 1)
- Mobile create/edit forms for franchises/outlets
- Real-time notifications
- Audit trail/activity log
- Advanced reporting and exports
- Email/SMS integrations
- Multi-language support

