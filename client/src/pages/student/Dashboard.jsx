import React from 'react';
import { Book, Award, CreditCard, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'DS', marks: 85 },
  { subject: 'Algo', marks: 78 },
  { subject: 'Web', marks: 92 },
  { subject: 'DB', marks: 88 },
  { subject: 'OS', marks: 76 },
];

const StudentDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
          High Performer
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Attendance" value="88%" icon={<Book size={24} />} color="blue" />
        <StatCard title="Current CGPA" value="8.9" icon={<Award size={24} />} color="purple" />
        <StatCard title="Fee Status" value="Paid" icon={<CreditCard size={24} />} color="green" />
        <StatCard title="Pending Assignments" value="2" icon={<Bell size={24} />} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="subject" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip cursor={{fill: '#334155', opacity: 0.2}} />
                <Bar dataKey="marks" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Today's Classes</h2>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', subject: 'Data Structures', room: 'Room 201' },
              { time: '11:00 AM', subject: 'Algorithms Lab', room: 'Lab 4' },
              { time: '02:00 PM', subject: 'Web Development', room: 'Room 204' },
            ].map((cls, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <div className="w-2 h-10 rounded bg-purple-500"></div>
                <div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{cls.time}</p>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{cls.subject}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cls.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
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

export default StudentDashboard;
