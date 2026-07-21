import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, GraduationCap, Building2, BookOpen, 
  BookMarked, ClipboardList, FileSpreadsheet, Calendar, 
  CreditCard, BarChart3, FileText, ChevronLeft, LogOut,
  UserCircle, Settings, Menu
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isCollapsed, toggleSidebar, mobileOpen, setMobileOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role || 'student'; // 'admin', 'faculty', 'student'

  const navigation = {
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Students', path: '/admin/students', icon: Users },
      { name: 'Faculty', path: '/admin/faculty', icon: GraduationCap },
      { name: 'Departments', path: '/admin/departments', icon: Building2 },
      { name: 'Courses', path: '/admin/courses', icon: BookOpen },
      { name: 'Subjects', path: '/admin/subjects', icon: BookMarked },
      { name: 'Attendance', path: '/admin/attendance', icon: ClipboardList },
      { name: 'Marks', path: '/admin/marks', icon: FileSpreadsheet },
      { name: 'Assignments', path: '/admin/assignments', icon: FileText },
      { name: 'Fees', path: '/admin/fees', icon: CreditCard },
      { name: 'Timetable', path: '/admin/timetable', icon: Calendar },
      { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
      { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    ],
    faculty: [
      { name: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
      { name: 'Mark Attendance', path: '/faculty/attendance', icon: ClipboardList },
      { name: 'Upload Marks', path: '/faculty/marks', icon: FileSpreadsheet },
      { name: 'Assignments', path: '/faculty/assignments', icon: FileText },
      { name: 'Study Materials', path: '/faculty/materials', icon: BookOpen },
      { name: 'View Students', path: '/faculty/students', icon: Users },
      { name: 'Timetable', path: '/faculty/timetable', icon: Calendar },
      { name: 'Profile', path: '/faculty/profile', icon: UserCircle },
    ],
    student: [
      { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
      { name: 'Attendance', path: '/student/attendance', icon: ClipboardList },
      { name: 'Marks', path: '/student/marks', icon: FileSpreadsheet },
      { name: 'Timetable', path: '/student/timetable', icon: Calendar },
      { name: 'Assignments', path: '/student/assignments', icon: FileText },
      { name: 'Study Materials', path: '/student/materials', icon: BookOpen },
      { name: 'Fees', path: '/student/fees', icon: CreditCard },
      { name: 'Profile', path: '/student/profile', icon: UserCircle },
    ],
  };

  const navItems = navigation[role] || navigation.student;

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out
        bg-surface-dark text-gray-300 border-r border-gray-800
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="font-bold text-lg text-white whitespace-nowrap">
                Smart ERP
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
          )}
          
          <button 
            onClick={toggleSidebar}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-800 transition-colors absolute -right-3 top-5 bg-surface-dark border border-gray-700"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <div className="py-4 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-hide">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`
                      flex items-center rounded-lg transition-all duration-200 group
                      ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary-600/20 to-primary-600/5 text-primary-400 border-l-2 border-primary-500' 
                        : 'hover:bg-gray-800/50 hover:text-white border-l-2 border-transparent'
                      }
                    `}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon className={`
                      flex-shrink-0 transition-colors
                      ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}
                      ${isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-white'}
                    `} />
                    
                    {!isCollapsed && (
                      <span className="font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
