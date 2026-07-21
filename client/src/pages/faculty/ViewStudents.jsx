import { useState } from 'react';
import { Users, Search, Eye, TrendingUp, AlertCircle } from 'lucide-react';

const mockStudents = [
  { _id: '1', name: 'Arjun Sharma', enrollmentNo: 'CS2023001', subject: 'Data Structures', attendance: 87, avgMarks: 78, grade: 'A', status: 'good' },
  { _id: '2', name: 'Priya Patel', enrollmentNo: 'CS2023002', subject: 'Data Structures', attendance: 67, avgMarks: 62, grade: 'B', status: 'warning' },
  { _id: '3', name: 'Ravi Kumar', enrollmentNo: 'CS2023003', subject: 'DBMS', attendance: 90, avgMarks: 85, grade: 'A+', status: 'good' },
  { _id: '4', name: 'Sneha Reddy', enrollmentNo: 'CS2023004', subject: 'Data Structures', attendance: 55, avgMarks: 45, grade: 'C', status: 'critical' },
  { _id: '5', name: 'Amit Verma', enrollmentNo: 'CS2023005', subject: 'DBMS', attendance: 78, avgMarks: 70, grade: 'B+', status: 'good' },
];

const statusConfig = {
  good: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'On Track' },
  warning: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', label: 'Low Attendance' },
  critical: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'At Risk' },
};

export default function ViewStudents() {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const subjects = ['all', ...new Set(mockStudents.map(s => s.subject))];
  const filtered = mockStudents.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.enrollmentNo.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === 'all' || s.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">View Students</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Students enrolled in your subjects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Students', value: mockStudents.length, color: 'blue' },
          { label: 'Low Attendance', value: mockStudents.filter(s => s.attendance < 75).length, color: 'yellow' },
          { label: 'At Risk', value: mockStudents.filter(s => s.status === 'critical').length, color: 'red' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 text-center">
            <p className={`text-2xl font-bold text-${s.color}-600 dark:text-${s.color}-400`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
          {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
        </select>
      </div>

      {/* Student Cards */}
      <div className="grid gap-4">
        {filtered.map(s => {
          const cfg = statusConfig[s.status];
          return (
            <div key={s._id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {s.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{s.name}</h3>
                  <span className="text-xs text-gray-400 font-mono">{s.enrollmentNo}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{s.subject}</p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className={`text-lg font-bold ${s.attendance >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{s.attendance}%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Attendance</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{s.avgMarks}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Avg Marks</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{s.grade}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Grade</p>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">No students found matching your search.</div>
        )}
      </div>
    </div>
  );
}
