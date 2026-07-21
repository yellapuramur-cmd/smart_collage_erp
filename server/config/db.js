import mongoose from 'mongoose';

/**
 * Connect to MongoDB with retry logic
 */
const connectDB = async () => {
  let retries = 5;
  const options = {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    family: 4, // Force IPv4
    tls: true,
    tlsInsecure: true, // Fix for SSL cert verification on Windows
  };

  while (retries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, options);
      console.log('✅ MongoDB connected successfully');
      break;
    } catch (err) {
      console.error(`❌ MongoDB connection failed. Retries left: ${retries - 1}`, err.message);
      retries -= 1;
      if (retries > 0) await new Promise(res => setTimeout(res, 5000));
    }
  }
  
  if (retries === 0) {
    console.error('Could not connect to MongoDB after multiple retries. Exiting...');
    process.exit(1);
  }
};

export default connectDB;
