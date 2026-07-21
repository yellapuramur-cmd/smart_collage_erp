# 🌐 Deployment Guide (Vercel, Render & MongoDB Atlas)

This guide explains how to deploy the **AI-Enabled Smart College ERP System** to production using 100% free-tier services.

---

## 1. Database Setup: MongoDB Atlas (Free Tier)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Shared Cluster (`M0 Free`).
3. Under **Database Access**, create a database user with read & write permissions.
4. Under **Network Access**, add IP `0.0.0.0/0` (allow access from anywhere).
5. Click **Connect** -> **Connect your application** and copy your connection string:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/college-erp?retryWrites=true&w=majority`

---

## 2. Frontend Deployment: Vercel

1. Push your project repository to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New** -> **Project** and import your repository.
4. Set **Root Directory** to `client`.
5. Framework Preset: **Vite**.
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Add Environment Variable:
   - `VITE_API_BASE_URL`: Your deployed Render Backend URL (e.g. `https://college-erp-api.onrender.com/api/v1`)
9. Click **Deploy**.

---

## 3. Backend Deployment: Render Web Service

1. Sign in to [Render](https://render.com).
2. Click **New** -> **Web Service**.
3. Connect your GitHub repository.
4. Set **Root Directory** to `server`.
5. Environment: **Node**.
6. Build Command: `npm install`
7. Start Command: `node index.js`
8. Add Environment Variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: Secure secret string
   - `CLIENT_URL`: Your Vercel application domain
   - `GEMINI_API_KEY`: Google Gemini API key
   - `ML_SERVICE_URL`: Your Render Python ML Service URL
9. Click **Create Web Service**.

---

## 4. Python ML Microservice Deployment: Render Web Service

1. On Render, click **New** -> **Web Service**.
2. Connect your GitHub repository.
3. Set **Root Directory** to `python-ml`.
4. Environment: **Python 3**.
5. Build Command: `pip install -r requirements.txt`
6. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Click **Create Web Service**.
