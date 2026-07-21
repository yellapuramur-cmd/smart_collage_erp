import React, { useState, useContext } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Bell, Shield, Lock, Save, Globe, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useAuth();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);
  const [feeReminders, setFeeReminders] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleSavePreferences = () => {
    toast.success('System preferences saved successfully!');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast.error('Please enter current and new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await api.put('/auth/change-password', { oldPassword, newPassword });
      toast.success('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="text-blue-600 dark:text-blue-400" /> Account Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Manage your system preferences, notifications, and security settings
        </p>
      </div>

      {/* User Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
        <div>
          <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider">
            {user?.role || 'User'} Account
          </span>
          <h2 className="text-xl font-bold mt-2">{user?.name}</h2>
          <p className="text-blue-100 text-sm">{user?.email}</p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-2xl font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          {theme === 'dark' ? <Moon className="text-blue-400" size={18} /> : <Sun className="text-amber-500" size={18} />} Appearance & Theme
        </h3>
        
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">Theme Mode</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Switch between Light and Dark interface appearance</p>
          </div>
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-xl transition-all font-medium text-sm"
          >
            {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="text-blue-600 dark:text-blue-400" size={18} /> Notification Preferences
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">Email Notifications</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive email alerts for academic updates and announcements</p>
            </div>
            <input 
              type="checkbox" 
              checked={emailNotifications} 
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">Attendance Warning Alerts</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when attendance drops below the 75% threshold</p>
            </div>
            <input 
              type="checkbox" 
              checked={attendanceAlerts} 
              onChange={(e) => setAttendanceAlerts(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">Fee Due Reminders</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive reminders for upcoming fee payment due dates</p>
            </div>
            <input 
              type="checkbox" 
              checked={feeReminders} 
              onChange={(e) => setFeeReminders(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
            />
          </div>
        </div>

        <button 
          onClick={handleSavePreferences} 
          className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-md"
        >
          <Save size={16} /> Save Preferences
        </button>
      </div>

      {/* Security & Password Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 space-y-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Shield className="text-green-600 dark:text-green-400" size={18} /> Security & Password
        </h3>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
            <input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={isUpdatingPassword}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-md disabled:opacity-50"
          >
            <Lock size={16} /> {isUpdatingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
