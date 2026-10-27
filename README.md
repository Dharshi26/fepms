# Franchise Equipment Preventative Maintenance System (FEPMS)

A complete MERN (MongoDB, Express, React, React Native) application for managing preventive maintenance of commercial kitchen and refrigeration equipment across franchise businesses.

## Project Architecture

```
Franchise Equipment Preventative Maintenance System/
├── backend/                  # Node.js + Express API
│   ├── config/              # Database configuration
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth, validation, error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # REST API endpoints
│   ├── uploads/             # Uploaded files (certificates, documents)
│   ├── server.js            # Entry point
│   ├── package.json
│   ├── .env                 # NOT in version control
│   └── .env.example         # Template for .env
│
├── client/                  # React + Vite web dashboard
│   ├── src/
│   │   ├── components/      # UI components (Sidebar, Topbar)
│   │   ├── context/         # React context (Auth in Phase 2)
│   │   ├── hooks/           # Custom hooks (useHealthCheck)
│   │   ├── layouts/         # DashboardLayout
│   │   ├── pages/           # Page components (Dashboard, Placeholder)
│   │   ├── services/        # API service (axios instances)
│   │   ├── styles/          # Global CSS + Tailwind
│   │   ├── App.jsx          # Main app with routing
│   │   └── main.jsx         # Entry point
│   ├── vite.config.js       # Vite configuration with API proxy
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── package.json
│   ├── .env                 # Frontend API URL
│   ├── .env.example
│   └── index.html
│
├── mobile/                  # React Native + Expo app
│   ├── src/
│   │   ├── screens/         # App screens (Home, Tasks, Equipment, etc.)
│   │   ├── navigation/      # Navigation structure
│   │   ├── services/        # API service for mobile
│   │   └── utils/           # Configuration and helpers
│   ├── App.js               # Main app component
│   ├── app.json             # Expo configuration
│   ├── package.json
│   ├── .env                 # Mobile API URL
│   ├── .env.example
│   └── node_modules/
│
└── README.md                # This file
```

## Technology Stack

### Backend
- **Node.js** + Express.js (REST API)
- **MongoDB** (Database) via Mongoose
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **Multer** (File uploads)
- **express-validator** (Input validation)

### Web Dashboard
- **React 18** with Hooks
- **Vite** (Build tool)
- **React Router v6** (Navigation)
- **Tailwind CSS** (Styling)
- **Axios** (HTTP client)
- **React Hook Form** (Forms in Phase 2+)

### Mobile App
- **React Native** (Cross-platform UI)
- **Expo** (Development and deployment)
- **React Navigation** (Navigation)
- **Axios** (HTTP client)
- **Expo Secure Store** (Token storage in Phase 2)

## Quick Start

### Prerequisites
- **Node.js** (v18+) and npm
- **MongoDB Atlas** account with connection string
- **Android Studio** + Android Emulator (optional, for mobile testing)
- **Expo CLI** (optional, install via `npm install -g expo-cli`)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file with MongoDB connection string:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fepms?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`.

#### Verify Backend

Test the health endpoint:

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "message": "FEPMS API is running",
  "timestamp": "2026-10-16T...",
  "environment": "development"
}
```

### 2. Frontend Setup

```bash
cd client
npm install
```

Verify `.env` file exists with:

```
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`.

#### Verify Frontend

- Open http://localhost:5173 in your browser.
- You should see the FEPMS dashboard with sidebar and top navigation.
- Dashboard should display a "Backend Status: Connected" indicator (if backend is running).

### 3. Mobile Setup

```bash
cd mobile
npm install
```

Verify `.env` file with:

```
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
```

#### For Android Emulator

```bash
npm run android
```

Or manually start Expo and select Android:

```bash
npm start
```

Then press `a` in the Expo CLI to launch the Android emulator.

#### For iOS (macOS only)

```bash
npm run ios
```

#### For Web Preview

```bash
npm run web
```

## MongoDB Configuration

### What You Need

1. **MongoDB Atlas Account**: https://www.mongodb.com/cloud/atlas
2. **Connection String**: Format is `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### Steps

1. Create a free tier cluster on MongoDB Atlas
2. Create a database user with username and password
3. Whitelist your IP address
4. Get the connection string from the "Connect" button
5. Add the connection string to `backend/.env` as `MONGO_URI`

### Example

```
MONGO_URI=mongodb+srv://admin:mypassword@fepms-cluster.mongodb.net/fepms?retryWrites=true&w=majority
```

**Important**: Never commit the connection string to version control. Keep it in `.env` only.

## Environment Variables

### Backend (`backend/.env`)

```
NODE_ENV=development
PORT=5000
MONGO_URI=<your_mongodb_atlas_connection_string>
JWT_SECRET=<your_strong_random_string>
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env`)

```
VITE_API_URL=http://localhost:5000/api
```

### Mobile (`mobile/.env`)

```
# Android Emulator: 10.0.2.2 is a special alias for the host machine
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api

# Physical Android device: use your computer's LAN IP
# Example: http://192.168.1.100:5000/api
# Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
```

## Commands Reference

### Backend

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server with nodemon (http://localhost:5000) |
| `npm start` | Start production server |

### Frontend

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

### Mobile

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm start` | Start Expo dev server |
| `npm run android` | Build and run on Android Emulator |
| `npm run ios` | Build and run on iOS (macOS only) |
| `npm run web` | Preview web version |

## API Health Check

All three applications can verify backend connectivity:

### From Terminal

```bash
curl http://localhost:5000/api/health
```

### From Frontend Dashboard

Open http://localhost:5173 and look for "Backend Status" card showing "Connected" or "Disconnected".

### From Mobile App

Open the Home screen; the API status will display with a connected/disconnected indicator.

## Android Emulator Configuration

The Android Emulator cannot access `localhost` directly. Instead, use `10.0.2.2` which is a special alias:

- **From Android Emulator** → Use `http://10.0.2.2:5000`
- **From Physical Phone on LAN** → Use your computer's IP (e.g., `http://192.168.1.100:5000`)
- **From Cloud/Public** → Use deployed backend HTTPS URL

**Finding Your Computer's IP:**

Windows:
```bash
ipconfig
```
Look for "IPv4 Address" under "Ethernet adapter" or "Wireless LAN adapter".

macOS/Linux:
```bash
ifconfig
```

## Current Phase Status

### Phase 1 ✓ Complete
- [x] Backend API scaffold with all models and routes
- [x] React web dashboard with sidebar and navigation
- [x] React Native mobile app with bottom tab navigation
- [x] Health check endpoints and API connection
- [x] Environment configuration

### Phase 2 (Next)
- [ ] User authentication (JWT login, logout, token refresh)
- [ ] Role-based access control (Admin, Manager, Technician)
- [ ] User management dashboard
- [ ] Protected routes on frontend and mobile

### Phase 3
- [ ] Franchise CRUD
- [ ] Outlet CRUD
- [ ] Equipment CRUD
- [ ] Equipment detail pages

### Phase 4
- [ ] Maintenance scheduling
- [ ] Maintenance status calculation
- [ ] Checklist templates
- [ ] Recurring maintenance

### Phase 5
- [ ] Service logs
- [ ] Certificate uploads
- [ ] Service log approval workflow

### Phase 6
- [ ] Warranty management
- [ ] Warranty expiry tracking
- [ ] Warranty claims

### Phase 7
- [ ] Dashboard analytics
- [ ] Reports and CSV export
- [ ] Notifications system
- [ ] Settings page

## Testing the API

### Login Endpoint (Phase 2)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@fepms.local","password":"password123"}'
```

### Get User Profile (Phase 2)

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/auth/me
```

### Get Franchises (Phase 3+)

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/franchises
```

## Troubleshooting

### Backend won't start

**Error**: `MONGO_URI is not defined`

**Solution**: Add `MONGO_URI` to `backend/.env`

**Error**: `Error: connect ECONNREFUSED`

**Solution**: Ensure MongoDB Atlas connection string is correct and your IP is whitelisted

### Frontend won't connect to backend

**Error**: `Backend Status: Disconnected` on dashboard

**Solution**: 
1. Ensure backend is running: `npm run dev` in `backend/` folder
2. Check `VITE_API_URL` in `client/.env`
3. Check browser console for CORS errors

### Mobile Expo won't start

**Error**: `Cannot find expo command`

**Solution**: Install expo globally: `npm install -g expo-cli`

**Error**: Android Emulator can't connect to backend

**Solution**: Use `10.0.2.2` in `.env` for emulator. Update to your computer's IP for physical device.

## Code Structure Principles

1. **Modular**: Code is organized by feature and responsibility.
2. **DRY**: Axios API services are reused across components.
3. **Backend-driven auth**: Authentication logic is server-side; frontend doesn't trust itself.
4. **Validation**: Input validation happens on both frontend and backend.
5. **Error handling**: Centralized error handling middleware on backend.
6. **Environment config**: No hardcoded URLs or secrets.

## Security Notes

- Never commit `.env` files
- Never expose `JWT_SECRET` or `MONGO_URI` to frontend/mobile
- Always use HTTPS in production
- Validate all inputs on backend (frontend validation is UX only)
- Hash passwords with bcryptjs
- Use strong JWT secret in production
- Implement rate limiting on API endpoints (Phase 2+)

## License

ISC

## Support

For issues, questions, or feature requests, please refer to the project documentation or contact the development team.
