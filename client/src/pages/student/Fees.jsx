import { DollarSign, CheckCircle, Clock, AlertTriangle, CreditCard, History } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const feeData = {
  semester: 3, academicYear: '2025-26', totalAmount: 85000, paidAmount: 42500, dueDate: '2026-08-31', status: 'partial',
};

const paymentHistory = [
  { _id: '1', amount: 42500, method: 'UPI', transactionId: 'UPI2026041501', date: '2026-04-15', remarks: 'First installment' },
];

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const statusConfig = {
  paid: { label: 'Fully Paid', icon: CheckCircle, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
  partial: { label: 'Partially Paid', icon: Clock, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' },
  pending: { label: 'Unpaid', icon: Clock, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
  overdue: { label: 'Overdue', icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
};

export default function StudentFees() {
  const [paying, setPaying] = useState(false);
  const balance = feeData.totalAmount - feeData.paidAmount;
  const paidPct = Math.round((feeData.paidAmount / feeData.totalAmount) * 100);
  const cfg = statusConfig[feeData.status];

  const handlePayNow = async () => {
    setPaying(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Redirecting to payment gateway... (Demo Mode)');
    setPaying(false);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Fee Status</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Semester {feeData.semester} · {feeData.academicYear}</p>
      </div>

      {/* Fee Status Card */}
      <div className={`rounded-2xl p-6 border shadow-sm ${cfg.bg}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`flex items-center gap-2 ${cfg.color}`}>
              <cfg.icon size={18} />
              <span className="font-semibold">{cfg.label}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Due Date: {new Date(feeData.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          {balance > 0 && (
            <button onClick={handlePayNow} disabled={paying}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-sm hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 transition-all shadow-lg">
              <CreditCard size={15} /> {paying ? 'Processing...' : 'Pay Now'}
            </button>
          )}
        </div>
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-300">Payment Progress</span>
            <span className="font-semibold text-gray-900 dark:text-white">{paidPct}%</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-700" style={{ width: `${paidPct}%` }} />
          </div>
        </div>
        {/* Amounts Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Fee', value: fmt(feeData.totalAmount), color: 'text-gray-900 dark:text-white' },
            { label: 'Paid', value: fmt(feeData.paidAmount), color: 'text-green-600 dark:text-green-400' },
            { label: 'Balance Due', value: fmt(balance), color: balance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400' },
          ].map(s => (
            <div key={s.label} className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 text-center">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-700 flex items-center gap-2">
          <History size={16} className="text-gray-500 dark:text-gray-400" />
          <h2 className="font-semibold text-gray-900 dark:text-white">Payment History</h2>
        </div>
        {paymentHistory.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                {['Date', 'Amount', 'Method', 'Transaction ID', 'Remarks'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {paymentHistory.map(p => (
                <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{new Date(p.date).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">{fmt(p.amount)}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium uppercase">{p.method}</span></td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">{p.transactionId}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-gray-400">No payment records found.</div>
        )}
      </div>
    </div>
  );
}
