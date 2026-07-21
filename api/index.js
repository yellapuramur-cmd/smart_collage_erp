import app from '../server/index.js';
import connectDB from '../server/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.error('Vercel DB Connection Error:', err);
  }
  return app(req, res);
}
