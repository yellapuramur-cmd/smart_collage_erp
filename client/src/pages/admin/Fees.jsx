import { useState, useEffect } from 'react';
import { DollarSign, Plus, X, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const STATUSES = ['all', 'pending', 'partial', 'paid', 'overdue'];

const mockFees = [
  { _id: '1', student: { name: 'Arjun Sharma', enrollmentNo: 'CS2023001' }, semester: 3, academicYear: '2025-26', totalAmount: 85000, paidAmount: 85000, dueDate: '2026-06-30', status: 'paid' },
  { _id: '2', student: { name: 'Priya Patel', enrollmentNo: 'CS2023002' }, semester: 3, academicYear: '2025-26', totalAmount: 85000, paidAmount: 42500, dueDate: '2026-06-30', status: 'partial' },
  { _id: '3', student: { name: 'Ravi Kumar', enrollmentNo: 'ECE2023001' }, semester: 2, academicYear: '2025-26', totalAmount: 80000, paidAmount: 0, dueDate: '2026-05-31', status: 'overdue' },
  { _id: '4', student: { name: 'Sneha Reddy', enrollmentNo: 'CS2023003' }, semester: 3, academicYear: '2025-26', totalAmount: 85000, paidAmount: 0, dueDate: '2026-08-31', status: 'pending' },
];

const statusConfig = {
  paid: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle },
  partial: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock },
  pending: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Clock },
  overdue: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: AlertCircle },
};

export default function AdminFees() {
  const [fees, setFees] = useState(mockFees);
  const [filter, setFilter] = useState('all');
  const [showPayModal, setShowPayModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('cash');

  const filtered = filter === 'all' ? fees : fees.filter(f => f.status === filter);

  const totalRevenue = fees.reduce((s, f) => s + f.paidAmount, 0);
  const totalDue = fees.reduce((s, f) => s + (f.totalAmount - f.paidAmount), 0);

  const handlePayment = () => {
    setFees(prev => prev.map(f => {
      if (f._id !== selectedFee._id) return f;
      const newPaid = Math.min(f.paidAmount + Number(payAmount), f.totalAmount);
      return { ...f, paidAmount: newPaid, status: newPaid >= f.totalAmount ? 'paid' : newPaid > 0 ? 'partial' : f.status };
    }));
    setShowPayModal(false);
    setPayAmount('');
    setSelectedFee(null);
  };

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fee Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage fee structures and payment records</p>
        </div>
        <button onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-md">
          <Plus size={16} /> Create Fee Structure
        </button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: fmt(totalRevenue), color: 'green' },
          { label: 'Total Pending', value: fmt(totalDue), color: 'orange' },
          { label: 'Paid Students', value: fees.filter(f => f.status === 'paid').length, color: 'blue' },
          { label: 'Overdue', value: fees.filter(f => f.status === 'overdue').length, color: 'red' },
        ].map(s => (
          <div key={s.label} className={`bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-700`}>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold text-${s.color}-600 dark:text-${s.color}-400`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === s ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'}`}>
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                {['Student', 'Enrollment No', 'Semester', 'Year', 'Total Fee', 'Paid', 'Balance', 'Due Date', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filtered.map(f => {
                const balance = f.totalAmount - f.paidAmount;
                const Cfg = statusConfig[f.status] || statusConfig.pending;
                return (
                  <tr key={f._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{f.student?.name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">{f.student?.enrollmentNo}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Sem {f.semester}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{f.academicYear}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{fmt(f.totalAmount)}</td>
                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">{fmt(f.paidAmount)}</td>
                    <td className="px-4 py-3 text-red-600 dark:text-red-400 font-medium">{fmt(balance)}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{new Date(f.dueDate).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${Cfg.color}`}>{f.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      {f.status !== 'paid' && (
                        <button onClick={() => { setSelectedFee(f); setShowPayModal(true); }}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                          Record Payment
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayModal && selectedFee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Record Payment</h2>
              <button onClick={() => setShowPayModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-sm">
                <p className="font-medium text-gray-900 dark:text-white">{selectedFee.student?.name}</p>
                <p className="text-gray-500 dark:text-gray-400">Balance: {fmt(selectedFee.totalAmount - selectedFee.paidAmount)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (₹)</label>
                <input type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)}
                  max={selectedFee.totalAmount - selectedFee.paidAmount}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
                <select value={payMethod} onChange={e => setPayMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  {['cash', 'card', 'upi', 'netbanking'].map(m => <option key={m} value={m} className="capitalize">{m.toUpperCase()}</option>)}
                </select>
              </div>
              <button onClick={handlePayment} disabled={!payAmount || Number(payAmount) <= 0}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Fee Modal (simplified) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Create Fee Structure</h2>
              <button onClick={() => setShowCreateModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Connect to the backend API to create fee structures for students. Set student, semester, academic year, total amount, and due date.</p>
            <button onClick={() => setShowCreateModal(false)}
              className="mt-4 w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
