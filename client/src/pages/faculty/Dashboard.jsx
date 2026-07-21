import React from 'react';
import { Users, Clock, FileText, CheckCircle } from 'lucide-react';

const FacultyDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Assigned Classes" value="4" icon={<Clock size={24} />} color="blue" />
        <StatCard title="Total Students" value="180" icon={<Users size={24} />} color="green" />
        <StatCard title="Pending Grading" value="12" icon={<FileText size={24} />} color="yellow" />
        <StatCard title="Attendance Marked" value="100%" icon={<CheckCircle size={24} />} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {[
              { time: '09:00 AM - 10:30 AM', subject: 'Data Structures (CS-301)', room: 'Room 201' },
              { time: '11:00 AM - 12:30 PM', subject: 'Algorithms Lab (CS-302)', room: 'Lab 4' },
              { time: '02:00 PM - 03:30 PM', subject: 'Web Development (CS-305)', room: 'Room 204' },
            ].map((cls, i) => (
              <div key={i} className="flex p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-100 dark:border-slate-600">
                <div className="w-32 flex-shrink-0 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {cls.time}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{cls.subject}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cls.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <ActionButton title="Mark Attendance" icon={<CheckCircle size={20} />} />
            <ActionButton title="Upload Marks" icon={<FileText size={20} />} />
            <ActionButton title="New Assignment" icon={<FileText size={20} />} />
            <ActionButton title="Study Material" icon={<FileText size={20} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
};

const ActionButton = ({ title, icon }) => (
  <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 transition-colors">
    <div className="text-blue-600 dark:text-blue-400 mb-2">{icon}</div>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
  </button>
);

export default FacultyDashboard;
