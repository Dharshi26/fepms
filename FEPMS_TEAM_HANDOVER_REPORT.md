# FEPMS Team Handover Report

Quick-start guide for team members joining FEPMS development.

---

## What is FEPMS?

**Franchise Equipment Preventative Maintenance System** - A web and mobile application that helps franchise businesses manage equipment maintenance, warranties, and service across multiple locations.

**Core Purpose:** Track when equipment needs maintenance, manage warranties, log service work, and prevent costly equipment downtime.

**Target Users:** Franchise administrators, outlet managers, technicians

---

## Current Project Status (October 2026)

### Completed ✅
- Frontend UI/UX scaffolding (all 13 pages designed and styled)
- Authentication system (register/login working)
- Navigation structure (sidebar, topbar, breadcrumbs)
- Mock data integration (realistic test data)
- Search and filtering (functional on all pages)
- Dashboard with KPI cards
- Responsive design (mobile-friendly)

### In Progress 🚧
- Backend API integration (not yet connected)
- CRUD operations (partially implemented)
- Data persistence (currently session-only)

### Not Started ❌
- Detail pages for items
- Advanced features (reports, analytics, exports)
- Mobile app
- Production deployment

---

## Technology Stack

**Frontend:**
- React 18, Vite 5.3.1
- React Router v6 for navigation
- Tailwind CSS for styling
- Axios for HTTP requests (not yet integrated with backend)

**Backend:** (Separate folder, Node.js + Express, MongoDB)

**State Management:** React Context (Authentication)

**Version Control:** Git (project is in GitHub)

---

## Project Structure

```
project-root/
├── client/                          # React frontend
│   ├── src/
│   │   ├── pages/                   # 13 page components
│   │   ├── components/              # Reusable UI components
│   │   ├── layouts/                 # Dashboard layout
│   │   ├── context/                 # Authentication context
│   │   ├── mock/                    # Mock data (franchises.js, outlets.js, etc.)
│   │   ├── services/                # API service (mockAuth.js)
│   │   ├── App.jsx                  # Main app with routes
│   │   └── main.jsx                 # Entry point
│   ├── vite.config.js               # Vite config
│   ├── tailwind.config.js           # Tailwind config
│   ├── package.json
│   └── .env (VITE_API_URL=...)
│
├── backend/                         # Node.js API (not covered here)
└── mobile/                          # React Native app (not started)
```

---

## Getting Started for Developers

### Setup
1. Clone repository
2. Navigate to `client/` folder
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
5. Open http://localhost:5173

### Test Credentials (Mock Auth)
- Email: `admin@fepms.local`
- Password: `password123`
- Role: Administrator

### Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Route definitions, main entry point |
| `src/context/AuthContext.jsx` | Authentication state management |
| `src/services/mockAuth.js` | Mock login/register logic |
| `src/pages/*.jsx` | All page components |
| `src/mock/*.js` | Test data (franchises, outlets, equipment) |
| `src/layouts/PremiumDashboardLayout.jsx` | Sidebar + topbar layout |
| `src/components/layout/PremiumSidebar.jsx` | Left sidebar navigation |
| `tailwind.config.js` | Design system tokens (colors, spacing) |

---

## How Developers Should Approach Changes

### Adding a New Feature
1. **Check if page exists** - Most pages already exist
2. **Understand current implementation** - Read the feature analysis document
3. **Mock the data first** - Add test data in `src/mock/*.js`
4. **Build UI component** - Use existing components as templates
5. **Add routing** - Update `App.jsx` if new page
6. **Test in browser** - Verify navigation and display
7. **Commit with message** - "Add XYZ feature"

### Fixing a Bug
1. **Reproduce the issue** - Find steps to recreate
2. **Check the component** - Locate file in `src/pages/` or `src/components/`
3. **Identify root cause** - Add console logs if needed
4. **Fix the code** - Make minimal changes
5. **Test fix** - Verify in browser
6. **Commit with message** - "Fix: description of bug"

### Connecting to Backend
1. **Define API endpoint** - What data endpoint returns
2. **Replace mock import** - Change `mockFranchises` to API call
3. **Add useEffect hook** - Fetch data when component mounts
4. **Handle loading/error** - Show spinners and error messages
5. **Update state** - Store API response in useState
6. **Test with backend** - Make sure data flows correctly

---

## Current Pages & Status

### ✅ Fully Functional
- Login Page → Register & login working
- Dashboard → KPI cards displaying
- Notifications → Mark read/delete working
- Settings → Save preferences working
- Profile → Edit profile & logout working

### ⚠️ Display Only (No Operations)
- Franchises → Can view & search, cannot edit
- Outlets → Can view & search, cannot edit
- Equipment → Can view & search, cannot edit
- Maintenance → Can view & search, cannot edit
- Service Logs → Can view & search, cannot edit
- Warranties → Can view & search, cannot edit
- Claims → Can view & search, cannot edit
- Reports → Can view reports, no generation

### ❌ Missing Detail Pages
- No franchise detail page (route: `/franchises/:id`)
- No outlet detail page (route: `/outlets/:id`)
- No equipment detail page
- No maintenance detail page
- (These routes not defined, will cause 404)

---

## Common Tasks & How To Do Them

### Task 1: Add a New Sidebar Menu Item
1. Open `src/components/layout/PremiumSidebar.jsx`
2. Find `NAVIGATION_GROUPS` array
3. Add new item:
   ```javascript
   {
     path: '/new-page',
     label: 'New Feature',
     icon: 'your-icon-name',
     badge: '5'
   }
   ```
4. Update router in `App.jsx`

### Task 2: Add a Filter to a Page
1. Open page file (e.g., `FranchisesPage.jsx`)
2. Find JSX with filter buttons
3. Add new filter state:
   ```javascript
   const [filterValue, setFilterValue] = useState('all');
   ```
4. Add filter buttons/dropdown
5. Update filter logic in `.filter()` call

### Task 3: Connect API Endpoint
1. Create axios instance in `src/services/api.js`
2. Define API function:
   ```javascript
   export const getFranchises = () => {
     return axios.get('/api/franchises');
   };
   ```
3. Replace mock import in component
4. Add useEffect to fetch data
5. Handle loading and error states

### Task 4: Create a Detail Page
1. Create new component: `src/pages/FranchiseDetail.jsx`
2. Get ID from route params: `useParams()`
3. Fetch item data
4. Render detail view
5. Add route in `App.jsx`:
   ```javascript
   <Route path="/franchises/:id" element={<FranchiseDetail />} />
   ```

### Task 5: Add Validation to Form
1. Find form component
2. Create validation object or function
3. Check validation before submit
4. Show error message if invalid
5. Prevent form submission if errors

---

## Code Standards & Conventions

### File Naming
- **Pages:** PascalCase (FranchisesPage.jsx)
- **Components:** PascalCase (Modal.jsx, Card.jsx)
- **Utilities:** camelCase (formatDate.js)
- **Styles:** Use Tailwind classes (avoid custom CSS)

### Component Structure
```javascript
import { useState, useEffect } from 'react';

export default function ComponentName() {
  // State declarations
  const [data, setData] = useState([]);
  
  // Effects
  useEffect(() => {
    // Load data
  }, []);
  
  // Event handlers
  const handleClick = () => {};
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Tailwind CSS (No Custom CSS)
- Use utility classes: `className="p-4 bg-white rounded-lg"`
- Use design tokens: `bg-primary-600`, `text-danger-500`
- Responsive: `sm:`, `md:`, `lg:` prefixes
- States: `hover:`, `focus:`, `disabled:`

### Comments
- Add comments for complex logic
- Explain WHY, not WHAT (code shows what)
- Use JSDoc for functions:
  ```javascript
  /**
   * Calculate days until due date
   * @param {Date} dueDate - The due date
   * @returns {number} Days remaining (negative if overdue)
   */
  ```

---

## Common Mistakes to Avoid

1. **Don't modify mock data directly**
   - Mock data is imported and immutable
   - Work with cloned/mapped arrays

2. **Don't forget useEffect dependencies**
   - Always specify dependency array `[]`
   - Add variables that affect the effect

3. **Don't use `index` as key in lists**
   - Use unique ID instead: `key={item.id}`
   - React needs stable keys for proper rendering

4. **Don't hardcode colors/sizes**
   - Use design tokens: `bg-primary-500`, not `bg-blue-500`
   - Maintains consistency

5. **Don't forget error handling**
   - Show error message to user
   - Don't silently fail
   - Log to console for debugging

6. **Don't mix mock and real API calls**
   - Either all mock or all real
   - Choose one approach per page

---

## Testing Workflow

### Manual Testing (Current)
1. Start dev server: `npm run dev`
2. Open browser: http://localhost:5173
3. Register new account or use test credentials
4. Navigate pages, test search/filter
5. Check console for errors (F12)

### What to Test
- ✅ Can you navigate to page?
- ✅ Does search/filter work?
- ✅ Do buttons do expected action?
- ✅ Do error messages show?
- ✅ Does it work on mobile (resize browser)?
- ✅ Are console errors/warnings?

### Browser DevTools
- Press F12 to open DevTools
- Console tab shows errors/warnings
- Network tab shows API calls
- Elements tab shows HTML
- Application tab shows localStorage

---

## Debugging Tips

### Check These First
1. **Browser Console (F12)**
   - Syntax errors?
   - Missing imports?
   - API errors?

2. **React DevTools**
   - Install React DevTools extension
   - Inspect component state
   - View component tree

3. **Mock Data**
   - Check if mock data exists
   - Print data to console: `console.log(mockFranchises)`
   - Verify data structure

4. **Routes**
   - Is route defined in `App.jsx`?
   - Is component imported?
   - Does path match sidebar?

5. **State**
   - Use React DevTools to inspect state
   - Add console.log in setState calls
   - Check if state updating correctly

### Common Issues & Fixes

**Issue:** "Cannot read property 'map' of undefined"
- **Fix:** Check if data is loaded before rendering
- **Solution:** Add conditional: `{data && data.map(...)}`

**Issue:** Search/filter not working
- **Fix:** Check filter logic in `.filter()` function
- **Solution:** Add console.log to see what's happening

**Issue:** Page shows blank/white
- **Fix:** Check React console for errors
- **Solution:** Open DevTools and read error message

**Issue:** Button click does nothing
- **Fix:** Check if event handler is defined
- **Solution:** Add `console.log` in handler to confirm it runs

---

## Documentation Files

After reading this file, read these for more detail:

1. **FEPMS_PROJECT_OVERVIEW.md** ← Start here
   - Explains what FEPMS is
   - Business purpose and users
   - System architecture

2. **FEPMS_SCREEN_BY_SCREEN_GUIDE.md** ← Then read this
   - Every page explained in detail
   - What each button does
   - What data displays on each page

3. **FEPMS_NAVIGATION_FLOW.md** ← For navigation understanding
   - How users move through app
   - All routes defined
   - Navigation structure

4. **FEPMS_BUSINESS_WORKFLOWS.md** ← For business context
   - Real-world workflows
   - Step-by-step processes
   - What works and what doesn't

5. **FEPMS_FEATURE_AND_GAP_ANALYSIS.md** ← For development
   - What's implemented vs. missing
   - Gaps and limitations
   - Priority list for next phase

---

## Next Steps for Development

### Immediate (This Sprint)
- [ ] Read FEPMS_PROJECT_OVERVIEW.md to understand business
- [ ] Read FEPMS_SCREEN_BY_SCREEN_GUIDE.md to know all pages
- [ ] Run application and test all pages
- [ ] Identify which page/feature to work on

### Short-Term (Next Sprint)
- [ ] Choose one incomplete page/feature
- [ ] Implement detail page or edit form
- [ ] Connect to backend API endpoint
- [ ] Test end-to-end workflow

### Medium-Term (Phase 2)
- [ ] Implement all CRUD operations
- [ ] Connect all pages to backend API
- [ ] Implement role-based access control
- [ ] Add loading and error states

### Long-Term (Phase 3+)
- [ ] Advanced features (reports, analytics)
- [ ] Mobile app development
- [ ] Performance optimization
- [ ] Production deployment

---

## Questions & Support

### For Questions About:
- **Business Logic** → Read FEPMS_PROJECT_OVERVIEW.md
- **Screen Details** → Read FEPMS_SCREEN_BY_SCREEN_GUIDE.md
- **Navigation** → Read FEPMS_NAVIGATION_FLOW.md
- **Workflows** → Read FEPMS_BUSINESS_WORKFLOWS.md
- **What's Needed Next** → Read FEPMS_FEATURE_AND_GAP_ANALYSIS.md
- **How to Code a Feature** → This document

### Debugging Help
1. Check browser console (F12)
2. Add console.log() to trace issue
3. Use React DevTools to inspect state
4. Search codebase for similar patterns
5. Ask team lead if stuck

---

## Key Contacts & Responsibilities

**Project Lead:** [Name] - Overall direction, decisions
**Frontend Lead:** [Name] - React/UI implementation
**Backend Lead:** [Name] - API development
**QA Lead:** [Name] - Testing and bug reporting

---

## Useful Resources

- React Docs: https://react.dev
- React Router: https://reactrouter.com
- Tailwind CSS: https://tailwindcss.com
- Axios: https://axios-http.com
- Vite: https://vitejs.dev

---

## Summary

**FEPMS is a franchise equipment maintenance management system.** The frontend is 70% complete with all pages designed and mock data integrated. The main work ahead is connecting to backend APIs and implementing CRUD operations.

**You can help by:**
1. Reading the documentation to understand the system
2. Running the app and testing it
3. Picking one incomplete feature and implementing it
4. Connecting pages to backend endpoints
5. Creating detail pages and edit forms

**First step:** Read FEPMS_PROJECT_OVERVIEW.md to understand what FEPMS does. Then read FEPMS_SCREEN_BY_SCREEN_GUIDE.md to see every page. Then read this file again for specific tasks.

**Welcome to the team!** 🚀

