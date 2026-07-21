import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Shared Settings Page
import Settings from './pages/Settings';

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminFaculty from './pages/admin/Faculty';
import AdminDepartments from './pages/admin/Departments';
import AdminCourses from './pages/admin/Courses';
import AdminSubjects from './pages/admin/Subjects';
import AdminAttendance from './pages/admin/Attendance';
import AdminMarks from './pages/admin/Marks';
import AdminAssignments from './pages/admin/Assignments';
import AdminFees from './pages/admin/Fees';
import AdminTimetable from './pages/admin/Timetable';
import AdminReports from './pages/admin/Reports';
import AdminAnalytics from './pages/admin/Analytics';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyMarkAttendance from './pages/faculty/MarkAttendance';
import FacultyUploadMarks from './pages/faculty/UploadMarks';
import FacultyAssignments from './pages/faculty/Assignments';
import FacultyStudyMaterials from './pages/faculty/StudyMaterials';
import FacultyViewStudents from './pages/faculty/ViewStudents';
import FacultyTimetable from './pages/faculty/Timetable';
import FacultyProfile from './pages/faculty/Profile';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAttendance from './pages/student/Attendance';
import StudentMarks from './pages/student/Marks';
import StudentTimetable from './pages/student/Timetable';
import StudentAssignments from './pages/student/Assignments';
import StudentStudyMaterials from './pages/student/StudyMaterials';
import StudentFees from './pages/student/Fees';
import StudentProfile from './pages/student/Profile';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="subjects" element={<AdminSubjects />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="marks" element={<AdminMarks />} />
              <Route path="assignments" element={<AdminAssignments />} />
              <Route path="fees" element={<AdminFees />} />
              <Route path="timetable" element={<AdminTimetable />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Settings />} />
            </Route>

            {/* Faculty Routes */}
            <Route
              path="/faculty"
              element={
                <ProtectedRoute role="faculty">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<FacultyDashboard />} />
              <Route path="attendance" element={<FacultyMarkAttendance />} />
              <Route path="marks" element={<FacultyUploadMarks />} />
              <Route path="assignments" element={<FacultyAssignments />} />
              <Route path="materials" element={<FacultyStudyMaterials />} />
              <Route path="students" element={<FacultyViewStudents />} />
              <Route path="timetable" element={<FacultyTimetable />} />
              <Route path="profile" element={<FacultyProfile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Student Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute role="student">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="marks" element={<StudentMarks />} />
              <Route path="timetable" element={<StudentTimetable />} />
              <Route path="assignments" element={<StudentAssignments />} />
              <Route path="materials" element={<StudentStudyMaterials />} />
              <Route path="fees" element={<StudentFees />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Default Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
