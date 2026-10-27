# FEPMS — Authentication Setup Guide

## Prerequisites

The FEPMS system requires a MongoDB database for authentication and data persistence. Without MongoDB, login and registration will **fail**.

## Option 1: Local MongoDB (Recommended for Development)

### Windows: Using WSL2 + Docker

1. **Install Docker Desktop** (includes Docker engine and optional WSL2 backend)
   - Download: https://www.docker.com/products/docker-desktop
   - Run the installer and restart your computer

2. **Start MongoDB in Docker**
   ```cmd
   docker run -d --name fepms-mongo -p 27017:27017 mongo
   ```

3. **Update backend/.env**
   ```env
   MONGO_URI=mongodb://localhost:27017/fepms
   ```

4. **Restart the backend server**
   ```cmd
   cd backend
   npm start
   ```

5. **Verify MongoDB is running**
   ```cmd
   docker ps | findstr fepms-mongo
   ```

### Windows: Using MongoDB Community Edition (Local Installation)

1. **Download MongoDB Community Server**
   - https://www.mongodb.com/try/download/community
   - Choose your OS (Windows)
   - Run the MSI installer

2. **Start MongoDB Service**
   - Windows Search: "Services"
   - Find "MongoDB Server"
   - Verify it shows "Running"

3. **Update backend/.env**
   ```env
   MONGO_URI=mongodb://localhost:27017/fepms
   ```

4. **Restart the backend server**
   ```cmd
   cd backend
   npm start
   ```

### macOS/Linux: Using Docker

1. **Install Docker**
   - https://docs.docker.com/get-docker/

2. **Start MongoDB**
   ```bash
   docker run -d --name fepms-mongo -p 27017:27017 mongo
   ```

3. **Update backend/.env**
   ```env
   MONGO_URI=mongodb://localhost:27017/fepms
   ```

4. **Restart backend**
   ```bash
   cd backend
   npm start
   ```

## Option 2: MongoDB Atlas (Cloud, No Local Installation)

### Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Create a Database"
   - Choose "Free Tier"
   - Select your region
   - Cluster name: `fepms-cluster`
   - Wait for creation (~5 min)

3. **Create Database User**
   - In Atlas, go to "Database Access"
   - Click "Add New Database User"
   - Username: `fepms_user`
   - Password: Use the auto-generate option or create a strong one
   - Click "Add User"

4. **Get Connection String**
   - Go to "Databases"
   - Click "Connect"
   - Choose "Drivers"
   - Select Node.js
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Example: `mongodb+srv://fepms_user:mypassword123@fepms-cluster.abc123.mongodb.net/fepms?retryWrites=true&w=majority`

5. **Allow Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" for development
   - (For production, use specific IPs)

6. **Update backend/.env**
   ```env
   MONGO_URI=mongodb+srv://fepms_user:yourpassword@fepms-cluster.abc123.mongodb.net/fepms?retryWrites=true&w=majority
   ```

7. **Restart backend**
   ```cmd
   cd backend
   npm start
   ```

## Verify Setup

1. **Backend logs should show:**
   ```
   ✅  MongoDB connected: localhost
   ```
   or
   ```
   ✅  MongoDB connected: ac-xxxxx.mongodb.net
   ```

2. **Test registration and login**
   - Start the frontend: `cd client && npm run dev`
   - Visit http://localhost:5173
   - Click "Register"
   - Enter email, password, name
   - Click "Create Account"
   - Should redirect to dashboard

3. **Test login**
   - Click logout (profile icon → Logout)
   - Login page appears
   - Enter the credentials you just created
   - Should redirect to dashboard

## Troubleshooting

### "MONGO_URI not configured"
- **Cause**: `MONGO_URI` in `.env` still has `<username>` or `<password>` placeholders
- **Fix**: Replace with actual connection string (see options above)
- **Action**: Restart backend after updating `.env`

### "MongoDB connection error"
- **Cause**: MongoDB service is not running
- **Docker check**:
  ```cmd
  docker ps | findstr fepms-mongo
  ```
  If empty, start it: `docker run -d --name fepms-mongo -p 27017:27017 mongo`

- **Local MongoDB check** (Windows):
  - Open Services (search "Services")
  - Look for "MongoDB Server"
  - If stopped, right-click → Start

- **Check connection string**:
  - Verify host (localhost vs. network host)
  - Verify port (27017 is default)
  - Verify username/password (if using Atlas)

### "Email already registered" / "Invalid credentials"
- **Cause**: User already exists or password is wrong
- **Solution**: Use a different email or reset password (not yet implemented)

### "Cannot register / Backend error 500"
- **Cause**: Mongoose model or validation error
- **Fix**: Check backend console for detailed error
- **Action**: Share the error with development team

## First Admin Account

Public registration creates **technician** accounts only. To create an admin account:

1. **Via Backend API** (during development):
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Admin User",
       "email": "admin@example.com",
       "password": "Admin123",
       "role": "admin"
     }'
   ```

   This will be rejected by the current validation. For Phase 4+, an admin-only endpoint will be created.

2. **Temporary workaround** (development only):
   - Register as technician first
   - Manually update the user's role in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

3. **Production**: Set up automated admin creation during deployment (Phase 5+)

## Next Steps

After MongoDB is configured and tested:
1. Backend: `cd backend && npm start`
2. Web Frontend: `cd client && npm run dev`
3. Mobile Frontend: `cd mobile && npm install && npx expo start`

## Questions?

Refer to:
- MongoDB Setup: https://docs.mongodb.com/
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- Docker: https://docs.docker.com/
