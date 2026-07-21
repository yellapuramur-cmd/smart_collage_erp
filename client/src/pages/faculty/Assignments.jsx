import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, FileText, Calendar, Clock, MoreVertical, Eye, Download, X } from 'lucide-react';

export default function Assignments() {
  const { register, handleSubmit, reset } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [assignments, setAssignments] = useState([
    {
      id: '1',
      title: 'React Fundamentals Assessment',
      subject: 'Web Development (CS301)',
      dueDate: '2023-11-15',
      totalMarks: 50,
      submissions: 24,
      totalStudents: 30,
    },
    {
      id: '2',
      title: 'Database Schema Design',
      subject: 'Database Management (CS302)',
      dueDate: '2023-11-20',
      totalMarks: 100,
      submissions: 15,
      totalStudents: 30,
    },
  ]);

  const onSubmit = (data) => {
    const newAssignment = {
      id: Date.now().toString(),
      ...data,
      submissions: 0,
      totalStudents: 30,
    };
    setAssignments([newAssignment, ...assignments]);
    reset();
    alert('Assignment created successfully!');
  };

  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="h-6 w-6 text-emerald-500" />
              Manage Assignments
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Create and grade student assignments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5 text-emerald-500" />
                Create New Assignment
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <select
                    {...register('subject')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                  >
                    <option value="CS301">Web Development (CS301)</option>
                    <option value="CS302">Database Management (CS302)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      {...register('dueDate', { required: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Total Marks
                    </label>
                    <input
                      type="number"
                      {...register('totalMarks', { required: true })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                      placeholder="100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Enter instructions..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Attachment (Optional)
                  </label>
                  <input
                    type="file"
                    {...register('file')}
                    className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-900/30 dark:file:text-emerald-400 hover:file:bg-emerald-100 dark:hover:file:bg-emerald-900/50 transition-colors cursor-pointer"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  <Plus className="h-5 w-5" />
                  Post Assignment
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {assignment.title}
                    </h3>
                  </div>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    {assignment.subject}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Due: {assignment.dueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" /> Marks: {assignment.totalMarks}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Submissions</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {assignment.submissions} / {assignment.totalStudents}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex sm:flex-col gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleViewSubmissions(assignment)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    <Eye className="h-4 w-4" />
                    View Submissions
                  </button>
                </div>
              </div>
            ))}
            
            {assignments.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No assignments yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Create an assignment to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Submissions</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedAssignment.title}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold">
                        S{i}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Student {i}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Submitted 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                        <Download className="h-4 w-4" /> File
                      </button>
                      <input
                        type="number"
                        placeholder={`/${selectedAssignment.totalMarks}`}
                        className="w-20 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end bg-gray-50 dark:bg-gray-800/50">
               <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Save Grades
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
