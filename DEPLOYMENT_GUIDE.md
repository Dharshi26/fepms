# FEPMS Vercel Deployment Guide

## Prerequisites
1. **GitHub Account**: Your project should be on GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas Account**: For production database
4. **Node.js**: Installed locally for testing

## Step 1: Prepare Your GitHub Repository

1. Push your FEPMS project to GitHub:
   ```bash
   cd "D:\ricoz\Franchise Equipment Preventative Maintenance System"
   git init
   git add .
   git commit -m "Initial commit for FEPMS deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/fepms.git
   git push -u origin main
   ```

## Step 2: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Get your connection string:
   - Go to "Database" > "Connect" > "Drivers"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `fepms_production`

Example connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/fepms_production?retryWrites=true&w=majority
```

## Step 3: Deploy Backend to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: Select `backend/`
   - **Build Command**: Leave empty (Vercel will auto-detect)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. Set Environment Variables (in Vercel project settings):
   ```
   NODE_ENV = production
   PORT = 3000
   MONGO_URI = [Your MongoDB Atlas connection string]
   JWT_SECRET = [Generate a strong random string]
   JWT_EXPIRES_IN = 7d
   CLIENT_URL = https://fepms-frontend.vercel.app
   ```

6. Click "Deploy"

### Option B: Deploy via Vercel CLI
```bash
cd backend
npm install -g vercel
vercel login
vercel
```

## Step 4: Get Backend URL

After deployment, Vercel will provide a URL like:
```
https://fepms-backend.vercel.app
```

Test the backend:
```
https://fepms-backend.vercel.app/api/health
```

## Step 5: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" > "Project"
3. Import the same GitHub repository
4. Configure:
   - **Root Directory**: Select `client/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Set Environment Variables:
   ```
   VITE_API_URL = https://fepms-backend.vercel.app/api
   VITE_FRONTEND_AUTH_MODE = api
   ```

6. Click "Deploy"

### Option B: Deploy via Vercel CLI
```bash
cd client
vercel
```

## Step 6: Update Frontend with Backend URL

After backend deployment, update the frontend environment variable:

1. In Vercel frontend project settings
2. Go to "Environment Variables"
3. Update `VITE_API_URL` to match your backend URL

## Step 7: Test the Deployed Application

### Test Backend API
```
GET https://fepms-backend.vercel.app/api/health
```

### Test Frontend
1. Open your frontend URL: `https://fepms-frontend.vercel.app`
2. Test registration and login
3. Test franchise and outlet management

## Step 8: Configure CORS

Ensure your backend CORS configuration includes the frontend URL:

In `backend/server.js`, update:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',  // Local development
    'https://fepms-frontend.vercel.app'  // Production
  ],
  credentials: true,
}));
```

## Environment Variables Reference

### Backend (`.env` for Vercel)
```
NODE_ENV=production
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fepms_production?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=https://fepms-frontend.vercel.app
```

### Frontend (Vercel Environment Variables)
```
VITE_API_URL=https://fepms-backend.vercel.app/api
VITE_FRONTEND_AUTH_MODE=api
```

## Troubleshooting

### 1. Backend Deployment Fails
- Check MongoDB Atlas connection string
- Ensure all required environment variables are set
- Check Vercel logs for specific errors

### 2. Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is correct
- Check CORS configuration in backend
- Test backend API directly with Postman

### 3. Authentication Issues
- Ensure JWT_SECRET is the same for all deployments
- Check token expiration settings
- Verify frontend is sending correct headers

### 4. Database Connection Issues
- Check MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0)
- Verify database user credentials
- Check cluster is running

## Security Notes

1. **Never commit `.env` files to GitHub**
2. **Use strong JWT secrets** (generate with: `openssl rand -base64 32`)
3. **Restrict MongoDB Atlas IP access** in production
4. **Enable Vercel preview deployments** for testing
5. **Set up monitoring** for both frontend and backend

## URLs After Deployment

- **Frontend**: `https://fepms-frontend.vercel.app`
- **Backend API**: `https://fepms-backend.vercel.app`
- **API Health Check**: `https://fepms-backend.vercel.app/api/health`

## Next Steps

1. Set up custom domains (optional)
2. Configure SSL certificates (automatic with Vercel)
3. Set up monitoring and alerts
4. Configure backup for MongoDB Atlas
5. Set up CI/CD pipeline

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Test API endpoints with Postman
3. Verify environment variables
4. Check MongoDB Atlas connection

Remember to update your sir with:
- Frontend URL: `https://fepms-frontend.vercel.app`
- Backend URL: `https://fepms-backend.vercel.app`
- Status: Working authentication and CRUD operations