import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import marksRoutes from './routes/marksRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import timetableRoutes from './routes/timetableRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

// Disable helmet CSP for smooth API execution
app.use(helmet({ contentSecurityPolicy: false }));

// Enable CORS for all origins & credentials
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300
});
app.use('/api', limiter);

// Helper function to mount routes on multiple path prefixes (Vercel Serverless compatibility)
const mountRoutes = (prefix) => {
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/students`, studentRoutes);
  app.use(`${prefix}/faculty`, facultyRoutes);
  app.use(`${prefix}/departments`, departmentRoutes);
  app.use(`${prefix}/courses`, courseRoutes);
  app.use(`${prefix}/subjects`, subjectRoutes);
  app.use(`${prefix}/attendance`, attendanceRoutes);
  app.use(`${prefix}/marks`, marksRoutes);
  app.use(`${prefix}/assignments`, assignmentRoutes);
  app.use(`${prefix}/fees`, feeRoutes);
  app.use(`${prefix}/timetable`, timetableRoutes);
  app.use(`${prefix}/dashboard`, dashboardRoutes);
  app.use(`${prefix}/chat`, chatRoutes);
};

mountRoutes('/api/v1');
mountRoutes('/v1');
mountRoutes('/api');

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'College ERP API is running...', status: 'OK' });
});

// Error Handler Middleware
app.use(errorHandler);

// Standalone Server Execution
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || process.env.RUN_STANDALONE === 'true') {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

export default app;
