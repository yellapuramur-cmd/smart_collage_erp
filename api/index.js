import app from '../server/index.js';
import connectDB from '../server/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error('Vercel Serverless Error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Vercel Serverless Internal Error'
    });
  }
}
