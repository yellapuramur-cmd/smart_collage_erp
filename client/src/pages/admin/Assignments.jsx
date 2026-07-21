import { useState, useEffect } from 'react';
import { ClipboardList, Plus, Eye, Trash2, BookOpen, Clock, Users, CheckCircle } from 'lucide-react';
import api from '../../api/axios';

export default function AdminAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const mockAssignments = [
    { _id: '1', title: 'Data Structures Lab Report', subject: { name: 'Data Structures' }, faculty: { name: 'Dr. Ramesh Kumar' }, course: { name: 'B.Tech CS' }, semester: 3, dueDate: '2026-07-30', totalMarks: 20, status: 'active', submissions: 18, totalStudents: 25 },
    { _id: '2', title: 'Circuit Analysis Problem Set', subject: { name: 'Circuit Theory' }, faculty: { name: 'Prof. Anita Singh' }, course: { name: 'B.Tech ECE' }, semester: 2, dueDate: '2026-07-25', totalMarks: 30, status: 'active', submissions: 12, totalStudents: 20 },
    { _id: '3', title: 'Database ER Diagram', subject: { name: 'DBMS' }, faculty: { name: 'Dr. Ramesh Kumar' }, course: { name: 'B.Tech CS' }, semester: 4, dueDate: '2026-07-15', totalMarks: 25, status: 'closed', submissions: 22, totalStudents: 23 },
    { _id: '4', title: 'Network Topology Assignment', subject: { name: 'Computer Networks' }, faculty: { name: 'Dr. Suresh Patel' }, course: { name: 'B.Tech CS' }, semester: 5, dueDate: '2026-08-05', totalMarks: 15, status: 'active', submissions: 5, totalStudents: 22 },
  ];

  useEffect(() => {
    setAssignments(mockAssignments);
    setLoading(false);
  }, []);

  const filtered = filter === 'all' ? assignments : assignments.filter(a => a.status === filter);

  const stats = {
    total: assignments.length,
    active: assignments.filter(a => a.status === 'active').length,
    closed: assignments.filter(a => a.status === 'closed').length,
    totalSubmissions: assignments.reduce((s, a) => s + a.submissions, 0),
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Monitor all assignments across departments</p>
        </div>
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium">
          <ClipboardList size={16} /> Assignment Monitor
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: ClipboardList, color: 'blue' },
          { label: 'Active', value: stats.active, icon: Clock, color: 'green' },
          { label: 'Closed', value: stats.closed, icon: CheckCircle, color: 'gray' },
          { label: 'Total Submissions', value: stats.totalSubmissions, icon: Users, color: 'purple' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-${s.color}-100 dark:bg-${s.color}-900/30`}>
                <s.icon size={18} className={`text-${s.color}-600 dark:text-${s.color}-400`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'active', 'closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600'}`}>
            {f === 'all' ? 'All Assignments' : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                {['Title', 'Subject', 'Faculty', 'Course / Sem', 'Due Date', 'Marks', 'Submissions', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filtered.map((a) => {
                const pct = Math.round((a.submissions / a.totalStudents) * 100);
                const isOverdue = new Date(a.dueDate) < new Date() && a.status === 'active';
                return (
                  <tr key={a._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{a.title}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.subject?.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.faculty?.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.course?.name} / Sem {a.semester}</td>
                    <td className="px-4 py-3">
                      <span className={isOverdue ? 'text-red-500 font-medium' : 'text-gray-600 dark:text-gray-300'}>
                        {new Date(a.dueDate).toLocaleDateString('en-IN')}
                        {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.totalMarks}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-slate-600 rounded-full h-1.5 w-16">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-300">{a.submissions}/{a.totalStudents}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${a.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400'}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-gray-400 dark:text-gray-500">No assignments found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
