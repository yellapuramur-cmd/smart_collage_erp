import app from '../server/index.js';
import connectDB from '../server/config/db.js';

export default async function handler(req, res) {
  try {
    // 1. Ensure DB connection is established
    await connectDB();

    // 2. Pass request to Express app
    return app(req, res);
  } catch (err) {
    console.error('Vercel Serverless Exception:', err);
    return res.status(500).json({
      success: false,
      message: `Serverless Database / Execution Error: ${err.message || 'Unknown Error'}`,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
