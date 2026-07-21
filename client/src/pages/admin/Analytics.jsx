import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';

const enrollmentData = [
  { month: 'Jan', CS: 45, ECE: 30 }, { month: 'Feb', CS: 48, ECE: 32 },
  { month: 'Mar', CS: 52, ECE: 35 }, { month: 'Apr', CS: 50, ECE: 33 },
  { month: 'May', CS: 55, ECE: 38 }, { month: 'Jun', CS: 60, ECE: 40 },
];

const attendanceData = [
  { week: 'W1', avg: 82 }, { week: 'W2', avg: 78 }, { week: 'W3', avg: 85 },
  { week: 'W4', avg: 88 }, { week: 'W5', avg: 75 }, { week: 'W6', avg: 90 },
];

const performancePie = [
  { name: 'High Performer', value: 35, color: '#22c55e' },
  { name: 'Average', value: 45, color: '#f59e0b' },
  { name: 'At Risk', value: 20, color: '#ef4444' },
];

const feeCollection = [
  { month: 'Apr', collected: 420000, pending: 80000 },
  { month: 'May', collected: 380000, pending: 120000 },
  { month: 'Jun', collected: 450000, pending: 50000 },
  { month: 'Jul', collected: 280000, pending: 220000 },
];

const attendanceRisk = [
  { dept: 'CS', safe: 38, warning: 8, critical: 4 },
  { dept: 'ECE', safe: 22, warning: 5, critical: 3 },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Comprehensive institutional performance insights</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Attendance', value: '83.4%', trend: '+2.1%', icon: Users, color: 'blue' },
          { label: 'Pass Rate', value: '87.2%', trend: '+4.5%', icon: TrendingUp, color: 'green' },
          { label: 'At-Risk Students', value: '20', trend: '-3', icon: BookOpen, color: 'red' },
          { label: 'Fee Collection', value: '₹15.3L', trend: '+8.2%', icon: DollarSign, color: 'purple' },
        ].map(k => (
          <div key={k.label} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">{k.label}</p>
              <div className={`p-1.5 bg-${k.color}-100 dark:bg-${k.color}-900/30 rounded-lg`}>
                <k.icon size={14} className={`text-${k.color}-600 dark:text-${k.color}-400`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{k.value}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">{k.trend} this month</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="CS" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="ECE" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={performancePie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {performancePie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Collection */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Fee Collection (₹)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={feeCollection}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={v => `${v/1000}K`} />
              <Tooltip formatter={v => `₹${v.toLocaleString('en-IN')}`} />
              <Legend />
              <Bar dataKey="collected" fill="#22c55e" radius={[4,4,0,0]} name="Collected" />
              <Bar dataKey="pending" fill="#f59e0b" radius={[4,4,0,0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Risk Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Attendance Risk by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attendanceRisk} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="safe" fill="#22c55e" radius={[0,4,4,0]} name="Safe (>75%)" />
              <Bar dataKey="warning" fill="#f59e0b" radius={[0,4,4,0]} name="Warning (60-75%)" />
              <Bar dataKey="critical" fill="#ef4444" radius={[0,4,4,0]} name="Critical (<60%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Attendance Trend */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Weekly Attendance Average (%)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Tooltip formatter={v => `${v}%`} />
            <Bar dataKey="avg" fill="#3b82f6" radius={[4,4,0,0]} name="Avg Attendance %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
