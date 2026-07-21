import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, BookOpen, Target, FileText, ChevronRight } from 'lucide-react';

export default function Marks() {
  const chartData = [
    { semester: 'Sem 1', sgpa: 8.5 },
    { semester: 'Sem 2', sgpa: 8.2 },
    { semester: 'Sem 3', sgpa: 8.8 },
    { semester: 'Sem 4', sgpa: 9.1 },
    { semester: 'Sem 5', sgpa: 8.9 },
  ];

  const currentSemSubjects = [
    { id: 1, name: 'Data Structures', internal: 25, mid: 20, quiz: 8, final: 40, total: 93, grade: 'A+' },
    { id: 2, name: 'Operating Systems', internal: 22, mid: 18, quiz: 7, final: 35, total: 82, grade: 'A' },
    { id: 3, name: 'Computer Networks', internal: 24, mid: 22, quiz: 9, final: 38, total: 93, grade: 'A+' },
    { id: 4, name: 'Database Systems', internal: 20, mid: 15, quiz: 6, final: 30, total: 71, grade: 'B+' },
  ];

  const cgpa = 8.7;

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Academic Performance</h1>
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
             <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
               <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
             </div>
             <div>
               <p className="text-sm text-gray-500 dark:text-gray-400">Current CGPA</p>
               <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{cgpa}</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Target className="w-5 h-5 text-blue-500"/> SGPA Progress</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} vertical={false} />
                  <XAxis dataKey="semester" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem', color: '#f3f4f6' }}
                    itemStyle={{ color: '#60a5fa' }}
                  />
                  <Line type="monotone" dataKey="sgpa" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between">
               <BookOpen className="w-8 h-8 opacity-75 mb-4" />
               <div>
                 <p className="text-blue-100 text-sm font-medium">Total Credits Earned</p>
                 <p className="text-3xl font-bold mt-1">112</p>
               </div>
             </div>
             <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
               <FileText className="w-8 h-8 text-emerald-500 opacity-75 mb-4" />
               <div>
                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed Courses</p>
                 <p className="text-3xl font-bold mt-1 text-gray-800 dark:text-gray-100">28</p>
               </div>
             </div>
             <div className="col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
               <div>
                 <h3 className="font-semibold">Download Full Transcript</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get your complete academic record as PDF</p>
               </div>
               <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                 <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
               </div>
             </div>
          </div>
        </div>

        {/* Current Semester Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
             <h2 className="text-lg font-semibold flex items-center gap-2"><Award className="w-5 h-5 text-purple-500"/> Semester 5 Results Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Internal (30)</th>
                  <th className="px-6 py-4 font-medium">Midterm (20)</th>
                  <th className="px-6 py-4 font-medium">Quiz (10)</th>
                  <th className="px-6 py-4 font-medium">Final (40)</th>
                  <th className="px-6 py-4 font-medium">Total (100)</th>
                  <th className="px-6 py-4 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {currentSemSubjects.map(sub => (
                  <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4 font-medium">{sub.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{sub.internal}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{sub.mid}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{sub.quiz}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{sub.final}</td>
                    <td className="px-6 py-4 font-semibold">{sub.total}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold">
                        {sub.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
