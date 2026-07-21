import { useState } from 'react';
import { FileText, Download, Printer, Filter } from 'lucide-react';

const reportTypes = [
  { id: 'attendance', label: 'Attendance Report', desc: 'Department/student-wise attendance summaries', color: 'blue' },
  { id: 'marks', label: 'Marks / Exam Report', desc: 'Exam-type & subject-wise performance tables', color: 'purple' },
  { id: 'fees', label: 'Fee Collection Report', desc: 'Paid, partial, and overdue fee details', color: 'green' },
  { id: 'students', label: 'Student Directory', desc: 'Complete enrolled student information list', color: 'orange' },
];

const mockData = {
  attendance: [
    { name: 'Arjun Sharma', dept: 'CS', subject: 'Data Structures', attended: 28, total: 32, pct: 87 },
    { name: 'Priya Patel', dept: 'CS', subject: 'DBMS', attended: 20, total: 30, pct: 67 },
    { name: 'Ravi Kumar', dept: 'ECE', subject: 'Circuit Theory', attended: 25, total: 28, pct: 89 },
  ],
  marks: [
    { name: 'Arjun Sharma', subject: 'DS', type: 'Internal', obtained: 38, total: 50, grade: 'A' },
    { name: 'Priya Patel', subject: 'DBMS', type: 'Midterm', obtained: 22, total: 30, grade: 'B+' },
  ],
  fees: [
    { name: 'Arjun Sharma', enrollment: 'CS2023001', total: 85000, paid: 85000, balance: 0, status: 'Paid' },
    { name: 'Priya Patel', enrollment: 'CS2023002', total: 85000, paid: 42500, balance: 42500, status: 'Partial' },
    { name: 'Ravi Kumar', enrollment: 'ECE2023001', total: 80000, paid: 0, balance: 80000, status: 'Overdue' },
  ],
  students: [
    { name: 'Arjun Sharma', enrollment: 'CS2023001', course: 'B.Tech CS', sem: 3, gender: 'Male', phone: '9876543210' },
    { name: 'Priya Patel', enrollment: 'CS2023002', course: 'B.Tech CS', sem: 3, gender: 'Female', phone: '9876543211' },
    { name: 'Ravi Kumar', enrollment: 'ECE2023001', course: 'B.Tech ECE', sem: 2, gender: 'Male', phone: '9876543212' },
  ],
};

const columns = {
  attendance: ['Name', 'Dept', 'Subject', 'Attended', 'Total', '%'],
  marks: ['Name', 'Subject', 'Type', 'Obtained', 'Total', 'Grade'],
  fees: ['Name', 'Enrollment', 'Total', 'Paid', 'Balance', 'Status'],
  students: ['Name', 'Enrollment', 'Course', 'Semester', 'Gender', 'Phone'],
};

function exportCSV(type) {
  const rows = mockData[type];
  if (!rows?.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => r[k]).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${type}_report.csv`; a.click();
  URL.revokeObjectURL(url);
}

export default function AdminReports() {
  const [activeReport, setActiveReport] = useState('attendance');

  const data = mockData[activeReport] || [];
  const cols = columns[activeReport] || [];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Generate and export institutional reports</p>
      </div>

      {/* Report Type Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map(r => (
          <button key={r.id} onClick={() => setActiveReport(r.id)}
            className={`p-4 rounded-2xl text-left transition-all border-2 ${activeReport === r.id ? `border-${r.color}-500 bg-${r.color}-50 dark:bg-${r.color}-900/20` : 'border-transparent bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm'}`}>
            <FileText size={20} className={`text-${r.color}-600 dark:text-${r.color}-400 mb-2`} />
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{r.desc}</p>
          </button>
        ))}
      </div>

      {/* Report Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{activeReport} Report</h2>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(activeReport)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors">
            <Printer size={14} /> Print
          </button>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                {cols.map(c => (
                  <th key={c} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  {Object.values(row).map((v, j) => (
                    <td key={j} className="px-4 py-3 text-gray-700 dark:text-gray-300">{String(v)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
