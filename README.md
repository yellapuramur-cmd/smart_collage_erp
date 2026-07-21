# 🎓 AI-Enabled Smart College ERP System — Complete Guide

Welcome to the **AI-Enabled Smart College ERP System** — a modern, scalable, production-ready full-stack enterprise web application built for educational institutions to streamline administration, faculty workflows, student portals, and AI-driven insights.

---

## 🌟 1. Executive Summary & Features

### 👑 Admin Management Suite
- **Student & Faculty Account Creation**: Admin can add new Students and Faculty with full profile details **AND login credentials** (email & password), granting immediate portal login access.
- **Institutional Analytics**: Real-time KPI dashboards, attendance risk heatmaps, fee collections, and enrollment trends using **Recharts**.
- **User & Academic Management**: Live CRUD operations for Students, Faculty, Departments, Courses, and Subjects.
- **Attendance & Marks Monitoring**: Department-wide pass percentages and low-attendance warning systems.
- **Fee Management**: Fee structure creation, partial/overdue tracking, and payment recording modal.
- **AI Timetable Generator**: Constraint-satisfaction algorithm for collision-free schedule creation.
- **Report Generation**: One-click PDF/CSV export and print view for attendance, marks, fees, and student directories.

### 👨‍🏫 Faculty Portal
- **Attendance Marking**: Interactive bulk attendance matrix (Present / Absent / Late).
- **Marks Upload**: Examination scoring (Internal, Midterm, Final, Quiz) with auto-grading breakdown.
- **Assignment Management**: Post assignments, view student file submissions, and provide grades/feedback.
- **Study Resource Library**: Upload and manage subject-wise lecture notes, slides, and references.
- **Personalized Schedule**: Weekly class schedule view with room assignments and student counts.

### 🎓 Student Portal
- **Academic Dashboard**: Real-time CGPA tracking, subject-wise attendance progress bars, and fee status.
- **Transcript & Score Breakdown**: Interactive grade charts and semester transcripts.
- **Assignment Submissions**: Drag-and-drop file uploader with status badges and faculty feedback.
- **Fee Payment Portal**: Fee breakdown, payment progress tracker, online payment simulation, and transaction receipts.
- **Resource Downloads**: One-click download for faculty lecture notes and study links.

### 🤖 Built-In AI & Machine Learning Features
- **Floating AI Assistant (Gemini API)**: Persistent chatbot available on all pages to query attendance, timetable, marks, and fees.
- **Predictive Performance Model (Python / Scikit-learn)**: Classifies academic standing (High Performer / Average / At Risk).
- **Attendance Risk Analyzer**: Calculates risk thresholds (<75%) and generates automated warning banners.
- **Smart Timetable Generator (FastAPI)**: Greedy collision-avoidance algorithm for rooms, faculty, and subject slots.

---

## 🛠️ 2. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React.js (Vite 5) | Lightning-fast SPA client architecture |
| **Styling & Design** | Tailwind CSS (v4) | Dark/Light theme system, glassmorphism, responsive UI |
| **Icons & Charts** | Lucide React & Recharts | Modern visual iconography & interactive analytics |
| **HTTP Client** | Axios | Request interceptors, JWT authorization bearer token headers |
| **State & Auth** | Context API & Hooks | Global `AuthContext`, `ThemeContext`, `useAuth`, `useApi` |
| **Form Handling** | React Hook Form & Toast | Client-side validation & notification alerts |
| **Backend Runtime** | Node.js (v18+) & Express 5 | High-performance RESTful API micro-services |
| **Database & ORM** | MongoDB Atlas & Mongoose | Cloud NoSQL document database with strict Schema validation |
| **Security & Auth** | JWT & Bcrypt.js | Password hashing (salt 10) & Role-Based Access Control |
| **File Storage** | Cloudinary & Multer | Secure cloud media upload for avatars and assignments |
| **AI Microservice** | Python 3.9+ & FastAPI | Machine Learning inference & Constraint Timetable solver |
| **ML Framework** | Scikit-learn, Pandas, NumPy | RandomForest student performance classifier |
| **GenAI Integration** | Google Gemini 1.5 API | Natural Language Processing ERP query assistant |

---

## 🔑 3. Seeded Indian Demo Accounts (Ready to Login)

The MongoDB database has been pre-seeded with test data featuring **realistic Indian names**. Use the following credentials on the login screen (`http://localhost:5174/login`):

| Role | Name | Email Address | Password | Privileges |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | System Admin | `admin@erp.com` | `admin123` | Full access to create students, faculty, departments, subjects, timetable & reports |
| **Faculty** | Dr. Ramesh Chander | `ramesh@erp.com` | `password123` | Head of CSE Department - Attendance, marks, study materials, student monitoring |
| **Faculty** | Dr. Sunita Kulkarni | `sunita@erp.com` | `password123` | Professor (ECE) - Electronics attendance, marks & timetable |
| **Faculty** | Prof. Rajesh Kumar | `rajesh@erp.com` | `password123` | Assoc. Professor (IT) - Web development notes & assignment grading |
| **Student** | Aarav Sharma | `aarav@erp.com` | `password123` | B.Tech CSE Student (Sem 3) - Attendance, CGPA, assignment submission & fee portal |
| **Student** | Ananya Iyer | `ananya@erp.com` | `password123` | B.Tech CSE Student (Sem 3) - Academic transcript & class schedule |
| **Student** | Rohan Gupta | `rohan@erp.com` | `password123` | B.Tech CSE Student (Sem 3) - Study material downloads |
| **Student** | Priya Nair | `priya@erp.com` | `password123` | B.Tech IT Student (Sem 3) - IT Portal access |

---

## 📂 4. Project Directory Architecture

```
collage/
├── client/                         # React.js Vite Frontend
│   ├── src/
│   │   ├── api/                    # Axios instance & ENDPOINTS dictionary
│   │   ├── components/             # Reusable UI library (Card, Table, Button, Input, Modal, ChatBot)
│   │   ├── context/                # AuthContext & ThemeContext providers
│   │   ├── hooks/                  # useAuth, useApi custom hooks
│   │   ├── pages/                  # Admin, Faculty, Student & Auth page components
│   │   ├── App.jsx                 # Full routing, ProtectedRoute & Layout bindings
│   │   └── main.jsx                # Entry point
│   ├── index.html                  # HTML5 template
│   └── vite.config.js              # Vite server & API proxy config
│
├── server/                         # Node.js Express Backend
│   ├── config/                     # DB connection & Cloudinary setup
│   ├── controllers/                # 13 Controllers handling business logic
│   ├── middleware/                 # JWT Auth, Upload, Validation & Error handlers
│   ├── models/                     # 14 Mongoose Data Schemas
│   ├── routes/                     # 13 Express Route files
│   ├── utils/                      # Helper functions & ApiResponse wrapper
│   ├── .env                        # Environment credentials (MongoDB URI, JWT Secret)
│   ├── seed.js                     # Database Seeder script
│   └── index.js                    # Express Application entry
│
└── python-ml/                      # Python FastAPI ML Microservice
    ├── models/                     # ML Model logic (Performance, Risk, Timetable)
    ├── main.py                     # FastAPI routes (/predict, /attendance-risk, /generate-timetable)
    └── requirements.txt            # Python dependencies
```

---

## 🖥️ 5. How to Run in VS Code — Step-by-Step Guide

Follow these exact steps to open and run the complete full-stack project in **Visual Studio Code**.

### Step 1: Open Project Folder in VS Code
1. Launch **VS Code**.
2. Click **File → Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select the folder: `c:\Users\admin\OneDrive\Desktop\collage`
4. Click **Select Folder**.

---

### Step 2: Open Integrated Terminal
1. In VS Code, press `Ctrl + \`` (backtick) or go to **Terminal → New Terminal**.

---

### Step 3: Run Backend Server
In the VS Code terminal, run:

```powershell
# Navigate to server directory
cd server

# Make sure dependencies are installed
npm install

# Start the Node.js Express backend server
node index.js
```

> **Expected Terminal Output:**
> ```
> ✅ MongoDB connected successfully
> Server running in development mode on port 5000
> ```

---

### Step 4: Run Frontend Client (New Terminal Tab)
1. In the VS Code terminal panel, click the **`+` (New Terminal)** button at the top right of the terminal window to open a second terminal tab.
2. Run:

```powershell
# Navigate to client directory
cd client

# Start the Vite React development server
npm run dev
```

> **Expected Terminal Output:**
> ```
> VITE v5.4.21 ready in 714 ms
> ➜ Local: http://localhost:5174/
> ```

---

### Step 5: Launch Application in Browser
Open your web browser and navigate to:
👉 **`http://localhost:5174`**

1. Enter **`admin@erp.com`** and **`admin123`** → Click **Sign In**.
2. Go to **Students Management** or **Faculty Management** → Click **`+ Add New Student`** or **`+ Add New Faculty`**.
3. Fill in their name, email, and password to create a new user account live in MongoDB!
4. Log out and immediately sign in with the new user's email and password!

---

*Project generated & configured with ❤️ — AI-Enabled Smart College ERP System*
