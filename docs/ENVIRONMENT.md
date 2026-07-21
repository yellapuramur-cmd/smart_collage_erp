# 🔐 Environment Variables Reference

Reference list of environment variables used across the frontend, backend, and machine learning services.

---

## 🖥️ Server Environment Variables (`server/.env`)

| Variable Name | Description | Example / Required |
|---------------|-------------|-------------------|
| `PORT` | HTTP Port for Express Server | `5000` |
| `MONGODB_URI` | MongoDB Atlas Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/college-erp` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `super_secret_key_123` |
| `JWT_EXPIRE` | Expiry duration for JWT tokens | `7d` |
| `CLIENT_URL` | Frontend client origin URL for CORS | `http://localhost:5173` |
| `ML_SERVICE_URL` | URL of Python FastAPI ML Service | `http://localhost:8000` |
| `GEMINI_API_KEY` | Google Gemini API Key | `AIzaSy...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Account Name | `mycloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `abcdef12345` |
| `SMTP_HOST` | Nodemailer SMTP Server | `smtp.gmail.com` |
| `SMTP_PORT` | Nodemailer SMTP Port | `587` |
| `SMTP_USER` | Email username | `noreply@college.edu` |
| `SMTP_PASS` | Email app password | `app_password_here` |

---

## 💻 Client Environment Variables (`client/.env`)

| Variable Name | Description | Default |
|---------------|-------------|---------|
| `VITE_API_BASE_URL` | Express API Base Endpoint URL | `/api/v1` (Proxy enabled) |

---

## 🐍 Python ML Microservice Environment Variables (`python-ml/.env`)

| Variable Name | Description | Default |
|---------------|-------------|---------|
| `PORT` | FastAPI Service Port | `8000` |
| `HOST` | FastAPI Bind Address | `0.0.0.0` |
