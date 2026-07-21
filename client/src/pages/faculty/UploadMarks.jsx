import React, { useState } from 'react';
import { Save, BookOpen, GraduationCap, Calculator } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function UploadMarks() {
  const { register, handleSubmit } = useForm();
  const [students, setStudents] = useState([
    { id: '1', name: 'Alice Smith', rollNo: 'CS001', marks: '' },
    { id: '2', name: 'Bob Johnson', rollNo: 'CS002', marks: '' },
    { id: '3', name: 'Charlie Brown', rollNo: 'CS003', marks: '' },
    { id: '4', name: 'Diana Prince', rollNo: 'CS004', marks: '' },
  ]);

  const onSubmit = (data) => {
    console.log('Marks data to save:', { metadata: data, students });
    alert('Marks saved successfully!');
  };

  const handleMarksChange = (id, value) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, marks: value } : student))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-indigo-500" />
              Upload Marks
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Record academic performance</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course
              </label>
              <select
                {...register('course')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
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
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              >
                <option value="cs101">Data Structures (CS101)</option>
                <option value="cs102">Operating Systems (CS102)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Exam Type
              </label>
              <select
                {...register('examType')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              >
                <option value="internal">Internal Assessment</option>
                <option value="midterm">Midterm</option>
                <option value="final">Final Semester</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Marks
              </label>
              <div className="relative">
                <Calculator className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  {...register('totalMarks')}
                  defaultValue="100"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              Student Marks Entry
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                  <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Roll No</th>
                  <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400 w-48">Marks Obtained</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{student.rollNo}</td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{student.name}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={student.marks}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end bg-gray-50 dark:bg-gray-800/50">
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <Save className="h-5 w-5" />
              Save & Update Marks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
