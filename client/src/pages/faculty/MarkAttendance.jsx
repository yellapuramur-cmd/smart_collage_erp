import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, XCircle, Clock, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function MarkAttendance() {
  const { register, handleSubmit } = useForm();
  const [students, setStudents] = useState([
    { id: '1', name: 'Alice Smith', rollNo: 'CS001', status: 'present' },
    { id: '2', name: 'Bob Johnson', rollNo: 'CS002', status: 'present' },
    { id: '3', name: 'Charlie Brown', rollNo: 'CS003', status: 'absent' },
    { id: '4', name: 'Diana Prince', rollNo: 'CS004', status: 'late' },
  ]);

  const onSubmit = (data) => {
    console.log('Attendance data to save:', { metadata: data, students });
    alert('Attendance saved successfully!');
  };

  const handleStatusChange = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, status: newStatus } : student))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mark Attendance</h1>
            <p className="text-gray-500 dark:text-gray-400">Record daily student attendance</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course
              </label>
              <select
                {...register('course')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="btech">B.Tech Computer Science</option>
                <option value="mca">MCA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select
                {...register('subject')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="cs101">Data Structures (CS101)</option>
                <option value="cs102">Operating Systems (CS102)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  {...register('date')}
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Student List
            </h2>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" /> Present: {students.filter(s => s.status === 'present').length}
              </span>
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4" /> Absent: {students.filter(s => s.status === 'absent').length}
              </span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Roll No</th>
                  <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{student.rollNo}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{student.name}</td>
                    <td className="p-4 text-right">
                      <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-600 p-1 bg-gray-50 dark:bg-gray-900">
                        <button
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors ${
                            student.status === 'present'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shadow-sm'
                              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                          }`}
                        >
                          <CheckCircle className="h-4 w-4" /> Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors ${
                            student.status === 'absent'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 shadow-sm'
                              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                          }`}
                        >
                          <XCircle className="h-4 w-4" /> Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors ${
                            student.status === 'late'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 shadow-sm'
                              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                          }`}
                        >
                          <Clock className="h-4 w-4" /> Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end bg-gray-50 dark:bg-gray-800/50">
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <Save className="h-5 w-5" />
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
