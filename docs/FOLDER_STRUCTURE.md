# 📂 Project Folder Structure Overview

```
collage/
├── client/                      # React (Vite) + Tailwind CSS Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                 # Axios instance & endpoint definitions
│   │   │   ├── axios.js
│   │   │   └── endpoints.js
│   │   ├── components/          # Reusable UI & Layout Components
│   │   │   ├── chat/            # Floating AI Chatbot components
│   │   │   │   ├── ChatBot.jsx
│   │   │   │   └── ChatMessage.jsx
│   │   │   ├── layout/          # Sidebar, Navbar, DashboardLayout, ProtectedRoute
│   │   │   │   ├── DashboardLayout.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   └── ui/              # Button, Card, Table, Modal, Input, Badge, Chart, etc.
│   │   ├── context/             # AuthContext & ThemeContext
│   │   ├── hooks/               # useAuth, useApi custom hooks
│   │   ├── pages/               # Role-based pages
│   │   │   ├── admin/           # Admin Dashboard, Students, Faculty, Courses, Fees, Timetable, etc.
│   │   │   ├── auth/            # Login, ForgotPassword, ResetPassword
│   │   │   ├── faculty/         # Faculty Dashboard, Attendance, Marks, Assignments, Materials
│   │   │   └── student/         # Student Dashboard, Attendance, Marks, Timetable, Assignments, Fees
│   │   ├── App.jsx              # Main Router setup with protected routes
│   │   ├── index.css            # Tailwind CSS v4 directives & theme styles
│   │   └── main.jsx
│   ├── vercel.json              # Vercel deployment configuration
│   └── vite.config.js
│
├── server/                      # Express.js + Mongoose REST API Backend
│   ├── config/                  # DB connection & Cloudinary setup
│   ├── controllers/             # Express route controllers (Auth, Student, Faculty, Chat, etc.)
│   ├── middleware/              # JWT auth, Multer upload, validator, error handler
│   ├── models/                  # 14 Mongoose Schemas (User, Student, Faculty, Attendance, Fees, etc.)
│   ├── routes/                  # API Express router modules
│   ├── services/                # Gemini AI & Python ML integration services
│   ├── utils/                   # Helper functions & response wrappers
│   ├── .env.example
│   ├── Dockerfile               # Container deployment configuration
│   ├── index.js                 # Express server entry point
│   ├── render.yaml              # Render blueprint deployment setup
│   └── seed.js                  # Database seeder script
│
├── python-ml/                   # FastAPI Machine Learning Microservice
│   ├── models/                  # Scikit-learn models & timetable generator algorithms
│   │   ├── attendance_risk.py
│   │   ├── performance_predictor.py
│   │   └── timetable_generator.py
│   ├── main.py                  # FastAPI server entry point
│   ├── requirements.txt         # Python dependencies
│   ├── train.py                 # ML Model training script
│   └── utils.py                 # Data preprocessing utilities
│
└── docs/                        # Project Documentation
    ├── API.md
    ├── DEPLOYMENT.md
    ├── ENVIRONMENT.md
    ├── FOLDER_STRUCTURE.md
    └── INSTALLATION.md
```
