import { useState } from 'react';
import { ClipboardList, Upload, CheckCircle, Clock, AlertTriangle, X, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

const mockAssignments = [
  { _id: '1', title: 'Data Structures Lab Report', subject: 'Data Structures', faculty: 'Dr. Ramesh Kumar', dueDate: '2026-07-30', totalMarks: 20, status: 'pending', submission: null },
  { _id: '2', title: 'DBMS ER Diagram', subject: 'DBMS', faculty: 'Dr. Ramesh Kumar', dueDate: '2026-07-25', totalMarks: 25, status: 'submitted', submission: { marks: null, feedback: 'Submission received, pending grading.', submittedAt: '2026-07-20' } },
  { _id: '3', title: 'Networks Assignment', subject: 'Computer Networks', faculty: 'Dr. Suresh Patel', dueDate: '2026-08-05', totalMarks: 15, status: 'pending', submission: null },
  { _id: '4', title: 'OS Process Management', subject: 'Operating Systems', faculty: 'Prof. Anita Singh', dueDate: '2026-07-10', totalMarks: 20, status: 'graded', submission: { marks: 17, feedback: 'Excellent work! Well-explained process lifecycle.', submittedAt: '2026-07-09' } },
];

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock, label: 'Pending' },
  submitted: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: CheckCircle, label: 'Submitted' },
  graded: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle, label: 'Graded' },
  late: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: AlertTriangle, label: 'Late' },
};

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [uploadModal, setUploadModal] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedFile) { toast.error('Please select a file.'); return; }
    setUploading(true);
    await new Promise(r => setTimeout(r, 1200));
    setAssignments(prev => prev.map(a => a._id === uploadModal._id ? { ...a, status: 'submitted', submission: { marks: null, feedback: 'Submission received.', submittedAt: new Date().toISOString().split('T')[0] } } : a));
    toast.success('Assignment submitted successfully!');
    setUploadModal(null);
    setSelectedFile(null);
    setUploading(false);
  };

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View and submit your course assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: assignments.length, color: 'blue' },
          { label: 'Pending', value: assignments.filter(a => a.status === 'pending').length, color: 'yellow' },
          { label: 'Submitted', value: assignments.filter(a => a.status === 'submitted').length, color: 'blue' },
          { label: 'Graded', value: assignments.filter(a => a.status === 'graded').length, color: 'green' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 text-center">
            <p className={`text-2xl font-bold text-${s.color}-600 dark:text-${s.color}-400`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Assignment Cards */}
      <div className="grid gap-4">
        {assignments.map(a => {
          const cfg = statusConfig[a.status] || statusConfig.pending;
          const overdue = isOverdue(a.dueDate) && a.status === 'pending';
          return (
            <div key={a._id} className={`bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border transition-all ${overdue ? 'border-red-300 dark:border-red-700' : 'border-gray-100 dark:border-slate-700'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{a.title}</h3>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${overdue ? statusConfig.late.color : cfg.color}`}>
                      <cfg.icon size={11} /> {overdue ? 'Overdue' : cfg.label}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                    <span>{a.subject}</span>
                    <span>·</span>
                    <span>{a.faculty}</span>
                    <span>·</span>
                    <span className={overdue ? 'text-red-500' : ''}>Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}</span>
                    <span>·</span>
                    <span>Max: {a.totalMarks} marks</span>
                  </div>
                  {a.submission && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-sm">
                      {a.submission.marks !== null ? (
                        <p className="text-green-600 dark:text-green-400 font-medium">Score: {a.submission.marks}/{a.totalMarks} &nbsp;·&nbsp; {a.submission.feedback}</p>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{a.submission.feedback}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">Submitted: {a.submission.submittedAt}</p>
                    </div>
                  )}
                </div>
                {a.status === 'pending' && (
                  <button onClick={() => setUploadModal(a)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0">
                    <Upload size={14} /> Submit
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Submit Assignment</h2>
              <button onClick={() => { setUploadModal(null); setSelectedFile(null); }}><X size={20} className="text-gray-500" /></button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{uploadModal.title}</p>
            <label className="block border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
              {selectedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText size={24} className="text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload size={28} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 10MB</p>
                </div>
              )}
              <input type="file" accept=".pdf,.doc,.docx,.zip" className="hidden" onChange={e => setSelectedFile(e.target.files[0])} />
            </label>
            <button onClick={handleSubmit} disabled={uploading || !selectedFile}
              className="mt-4 w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
              {uploading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</> : <><Upload size={15} /> Submit Assignment</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
