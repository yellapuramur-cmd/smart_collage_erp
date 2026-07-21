# 🔌 REST API Documentation

Base URL: `http://localhost:5000/api/v1`

All requests except Authentication endpoints require a valid JWT Bearer token passed in the header:
```http
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Module (`/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/login` | Public | Authenticate user & get JWT token |
| `POST` | `/auth/register` | Admin | Register new system user |
| `GET` | `/auth/me` | Private | Get profile of logged-in user |
| `PUT` | `/auth/profile` | Private | Update logged-in user profile details |
| `POST` | `/auth/forgot-password` | Public | Send password reset token email |
| `PUT` | `/auth/reset-password/:token` | Public | Reset password with token |
| `PUT` | `/auth/change-password` | Private | Change account password |

---

## 👨‍🎓 Student Management (`/students`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/students` | Admin, Faculty | List all students (with search, pagination & filters) |
| `GET` | `/students/:id` | Private | Get detailed student profile |
| `POST` | `/students` | Admin | Create student profile and associated user |
| `PUT` | `/students/:id` | Admin | Update student information |
| `DELETE` | `/students/:id` | Admin | Remove student record |
| `GET` | `/students/department/:deptId` | Admin, Faculty | Get students by department |

---

## 👩‍🏫 Faculty Management (`/faculty`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/faculty` | Admin | List all faculty members |
| `GET` | `/faculty/:id` | Private | Get detailed faculty profile |
| `POST` | `/faculty` | Admin | Create faculty member record |
| `PUT` | `/faculty/:id` | Admin | Update faculty member record |
| `DELETE` | `/faculty/:id` | Admin | Delete faculty member record |

---

## 🏛️ Departments & Courses (`/departments`, `/courses`, `/subjects`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/departments` | All Roles | List all academic departments |
| `POST` | `/departments` | Admin | Create department |
| `GET` | `/courses` | All Roles | List all courses |
| `POST` | `/courses` | Admin | Create new course |
| `GET` | `/subjects` | All Roles | List subjects (filter by course/semester) |
| `POST` | `/subjects` | Admin | Create subject |

---

## 📅 Attendance Module (`/attendance`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/attendance/mark` | Faculty, Admin | Bulk mark attendance for a class |
| `GET` | `/attendance/student/:studentId` | Admin, Faculty | Get student attendance history |
| `GET` | `/attendance/my` | Student | Get logged-in student's attendance summary |
| `GET` | `/attendance/report` | Admin | Generate attendance analytics report |

---

## 📝 Marks & Examination Module (`/marks`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/marks/upload` | Faculty, Admin | Bulk upload internal/exam marks |
| `GET` | `/marks/student/:studentId` | Admin, Faculty | View student exam transcript |
| `GET` | `/marks/my` | Student | View logged-in student marks |

---

## 🤖 AI & Chatbot Endpoints (`/chat`, `/ml`)

| Method | Endpoint | Location | Description |
|--------|----------|----------|-------------|
| `POST` | `/chat/message` | Express Backend | Process user query using Gemini AI + DB context |
| `GET` | `/chat/history` | Express Backend | Get stored AI chat history |
| `POST` | `/predict` | Python ML (8000) | Predict student performance category |
| `POST` | `/attendance-risk` | Python ML (8000) | Evaluate student attendance risk percentage |
| `POST` | `/generate-timetable` | Python ML (8000) | Generate conflict-free smart timetable |
