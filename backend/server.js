require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('Please configure the following in your .env file:');
  missingEnvVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  process.exit(1);
}

// Validate CORS configuration
const clientUrl = process.env.CLIENT_URL;
if (process.env.NODE_ENV === 'production' && !clientUrl) {
  console.error('❌ CLIENT_URL must be configured in production environment');
  process.exit(1);
}

// Route imports
const authRoutes = require('./routes/auth');
const franchiseRoutes = require('./routes/franchises');
const outletRoutes = require('./routes/outlets');
const equipmentRoutes = require('./routes/equipment');
const maintenanceRoutes = require('./routes/maintenance');
const serviceLogRoutes = require('./routes/serviceLogs');
const warrantyRoutes = require('./routes/warranties');
const warrantyClaimRoutes = require('./routes/warrantyClaims');
const notificationRoutes = require('./routes/notifications');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/users');

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
// Configure CORS with environment variable
const corsOptions = {
  origin: clientUrl || 'http://localhost:5173',
  credentials: true,
};

if (process.env.NODE_ENV === 'production' && clientUrl) {
  corsOptions.origin = clientUrl.split(',').map(url => url.trim());
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/franchises', franchiseRoutes);
app.use('/api/outlets', outletRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/service-logs', serviceLogRoutes);
app.use('/api/warranties', warrantyRoutes);
app.use('/api/warranty-claims', warrantyClaimRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'FEPMS API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Centralized error handler ────────────────────────────────────────────────
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅  FEPMS Backend running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
