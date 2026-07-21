# 🛠️ Installation & Setup Guide

This guide walks you through setting up the **AI-Enabled Smart College ERP System** on your local development environment.

---

## 📋 Prerequisites

Make sure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Python**: v3.10 or higher ([Download](https://www.python.org/))
- **Git**: Latest version ([Download](https://git-scm.com/))
- **MongoDB**: Active MongoDB Atlas cluster or local MongoDB server instance.

---

## 🚀 Step-by-Step Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-org/college-erp.git
cd college-erp
```

---

### Step 2: Configure & Start Backend API Server

```bash
cd server
npm install
```

Create a `.env` file from the provided example:
```bash
cp .env.example .env
```

Configure your `.env` variables:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/college-erp?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key_for_development_12345
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
ML_SERVICE_URL=http://localhost:8000
GEMINI_API_KEY=your_gemini_api_key_from_google_ai_studio
```

Seed initial demo data (Admins, Faculty, Students, Courses, Departments):
```bash
npm run seed
```

Start the Backend Development Server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

---

### Step 3: Configure & Start Frontend Client

In a new terminal window:
```bash
cd client
npm install
npm run dev
```
The React frontend application will open on `http://localhost:5173`.

---

### Step 4: Configure & Start Python Machine Learning Service

In another terminal window:
```bash
cd python-ml
pip install -r requirements.txt
python main.py
```
The FastAPI Machine Learning microservice will start on `http://localhost:8000`.

---

## 🔑 Default Login Credentials

Once seeded, you can log in using these demo credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@erp.com` | `admin123` |
| **Faculty** | `faculty@erp.com` | `faculty123` |
| **Student** | `student@erp.com` | `student123` |

---

## 🧪 Verification

1. Open your browser and navigate to `http://localhost:5173/login`.
2. Login with `admin@erp.com` / `admin123`.
3. Check the Admin Dashboard metrics and test creating a new student or checking attendance analytics.
4. Open the floating AI Chatbot in the bottom right corner and type `Show my attendance`.
