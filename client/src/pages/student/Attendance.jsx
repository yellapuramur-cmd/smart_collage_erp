import React from 'react';
import { AlertCircle, CheckCircle2, XCircle, Calendar, Clock, BookOpen, Activity } from 'lucide-react';

export default function Attendance() {
  const subjects = [
    { id: 1, name: 'Data Structures', code: 'CS301', total: 45, attended: 40 },
    { id: 2, name: 'Operating Systems', code: 'CS302', total: 40, attended: 28 },
    { id: 3, name: 'Computer Networks', code: 'CS303', total: 42, attended: 35 },
    { id: 4, name: 'Database Systems', code: 'CS304', total: 38, attended: 36 },
  ];

  const history = [
    { id: 1, date: '2026-07-21', subject: 'Data Structures', status: 'Present', time: '10:00 AM' },
    { id: 2, date: '2026-07-21', subject: 'Operating Systems', status: 'Absent', time: '11:30 AM' },
    { id: 3, date: '2026-07-20', subject: 'Computer Networks', status: 'Present', time: '09:00 AM' },
    { id: 4, date: '2026-07-20', subject: 'Database Systems', status: 'Present', time: '02:00 PM' },
    { id: 5, date: '2026-07-19', subject: 'Data Structures', status: 'Present', time: '10:00 AM' },
  ];

  const totalClasses = subjects.reduce((acc, curr) => acc + curr.total, 0);
  const totalAttended = subjects.reduce((acc, curr) => acc + curr.attended, 0);
  const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(1);
  const isLowAttendance = overallPercentage < 75;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-8">Attendance Overview</h1>

        {isLowAttendance && (
          <div className="flex items-center p-4 mb-6 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 shadow-sm animate-pulse">
            <AlertCircle className="w-5 h-5 mr-3" />
            <span className="font-medium">Warning:</span>
            <span className="ml-2">Your overall attendance is below 75%. Please ensure you attend upcoming classes to meet the minimum requirement.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Attendance Card */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
             <h2 className="text-lg font-semibold mb-6 self-start w-full flex items-center gap-2"><Activity className="w-5 h-5 text-blue-500"/> Overall Attendance</h2>
             
             <div className="relative w-48 h-48">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-200 dark:text-gray-700" />
                 <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" 
                   strokeDasharray="251.2" 
                   strokeDashoffset={251.2 - (251.2 * overallPercentage) / 100}
                   className={`${isLowAttendance ? 'text-red-500' : 'text-blue-500'} transition-all duration-1000 ease-out`}
                   strokeLinecap="round"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className={`text-4xl font-bold ${isLowAttendance ? 'text-red-500' : 'text-blue-500'}`}>{overallPercentage}%</span>
                 <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{totalAttended}/{totalClasses} Classes</span>
               </div>
             </div>
          </div>

          {/* Subject Wise Progress */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500"/> Subject-wise Attendance</h2>
            <div className="space-y-6">
              {subjects.map(subject => {
                const percentage = Math.round((subject.attended / subject.total) * 100);
                const isWarning = percentage < 75;
                return (
                  <div key={subject.id}>
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{subject.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{subject.code}</p>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold ${isWarning ? 'text-red-500' : 'text-green-500'}`}>{percentage}%</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{subject.attended}/{subject.total} Present</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full ${isWarning ? 'bg-red-500' : 'bg-green-500'} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* History Log */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
             <h2 className="text-lg font-semibold flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-500"/> Recent Attendance History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Time</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {history.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {record.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {record.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{record.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                        ${record.status === 'Present' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {record.status === 'Present' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
