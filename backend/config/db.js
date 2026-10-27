const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGO_URI is configured
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<username>')) {
      console.warn('⚠️  MONGO_URI not configured.');
      console.warn('📌 For development: mongodb://localhost:27017/fepms');
      console.warn('📌 For MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/fepms');
      console.warn('');
      console.warn('Set MONGO_URI in backend/.env and restart the server.');
      console.warn('⚠️  Skipping database connection. Auth will not work without MongoDB.');
      return; // Skip connection if not configured
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 8+ handles connection pooling automatically
    });
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB connection error: ${error.message}`);
    console.warn('⚠️  Database is required for authentication to work.');
    console.warn('');
    console.warn('For development with local MongoDB:');
    console.warn('  1. Install MongoDB Community: https://www.mongodb.com/docs/manual/installation/');
    console.warn('  2. Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo');
    console.warn('  3. Update MONGO_URI in backend/.env to: mongodb://localhost:27017/fepms');
    console.warn('  4. Restart the backend server');
    console.warn('');
    console.warn('The backend is running WITHOUT a database. Authentication will fail.');
    // Allow server to start for inspection, but log warning
  }
};

module.exports = connectDB;
