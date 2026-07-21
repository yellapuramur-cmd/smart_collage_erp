import mongoose from 'mongoose';

let isConnected = false;

/**
 * Connect to MongoDB with connection caching for Serverless & Standalone
 */
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  const options = {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    family: 4, // Force IPv4
    tls: true,
    tlsInsecure: true, // Fix for SSL cert verification on Windows / Vercel
  };

  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};

export default connectDB;
