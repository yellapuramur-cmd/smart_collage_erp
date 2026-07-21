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

// Enable security headers
app.use(helmet({ contentSecurityPolicy: false }));

// Enable CORS for all origins
app.use(cors({
  origin: true,
  credentials: true
}));

// Auto DB Connection Middleware
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300
});
app.use('/api', limiter);

// Mount routers
const apiPrefix = '/api/v1';
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/students`, studentRoutes);
app.use(`${apiPrefix}/faculty`, facultyRoutes);
app.use(`${apiPrefix}/departments`, departmentRoutes);
app.use(`${apiPrefix}/courses`, courseRoutes);
app.use(`${apiPrefix}/subjects`, subjectRoutes);
app.use(`${apiPrefix}/attendance`, attendanceRoutes);
app.use(`${apiPrefix}/marks`, marksRoutes);
app.use(`${apiPrefix}/assignments`, assignmentRoutes);
app.use(`${apiPrefix}/fees`, feeRoutes);
app.use(`${apiPrefix}/timetable`, timetableRoutes);
app.use(`${apiPrefix}/dashboard`, dashboardRoutes);
app.use(`${apiPrefix}/chat`, chatRoutes);

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
