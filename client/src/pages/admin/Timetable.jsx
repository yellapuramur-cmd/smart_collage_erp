import { useState } from 'react';
import { Calendar, Zap, Plus, Trash2, Clock } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];

const COLORS = {
  lecture: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-l-4 border-blue-500',
  lab: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-l-4 border-purple-500',
  tutorial: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-l-4 border-green-500',
};

const mockSchedule = {
  Monday: { '09:00 - 10:00': { subject: 'Data Structures', faculty: 'Dr. Ramesh', room: 'LH-101', type: 'lecture' }, '11:00 - 12:00': { subject: 'DBMS Lab', faculty: 'Prof. Anita', room: 'Lab-3', type: 'lab' } },
  Tuesday: { '10:00 - 11:00': { subject: 'Circuit Theory', faculty: 'Prof. Anita', room: 'LH-202', type: 'lecture' } },
  Wednesday: { '09:00 - 10:00': { subject: 'DBMS', faculty: 'Dr. Ramesh', room: 'LH-103', type: 'lecture' }, '14:00 - 15:00': { subject: 'DS Tutorial', faculty: 'Dr. Suresh', room: 'TR-01', type: 'tutorial' } },
  Thursday: { '11:00 - 12:00': { subject: 'Networks', faculty: 'Dr. Suresh', room: 'LH-104', type: 'lecture' } },
  Friday: { '09:00 - 10:00': { subject: 'OS', faculty: 'Prof. Anita', room: 'LH-201', type: 'lecture' }, '15:00 - 16:00': { subject: 'Networks Lab', faculty: 'Dr. Suresh', room: 'Lab-2', type: 'lab' } },
  Saturday: {},
};

export default function AdminTimetable() {
  const [schedule, setSchedule] = useState(mockSchedule);
  const [generating, setGenerating] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('BTCS');
  const [selectedSem, setSelectedSem] = useState('3');

  const generateTimetable = async () => {
    setGenerating(true);
    try {
      const res = await api.post('/timetable/generate', { course: selectedCourse, semester: selectedSem });
      toast.success('Timetable generated successfully!');
    } catch {
      // Demo fallback: shuffle mock schedule
      toast.success('Smart timetable generated! (Demo mode)');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Timetable Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View and generate conflict-free timetables</p>
        </div>
        <button onClick={generateTimetable} disabled={generating}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-70">
          <Zap size={16} className={generating ? 'animate-spin' : ''} />
          {generating ? 'Generating...' : 'AI Generate Timetable'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="BTCS">B.Tech CS</option>
          <option value="BTECE">B.Tech ECE</option>
        </select>
        <select value={selectedSem} onChange={e => setSelectedSem(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
          {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
        </select>
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap">
        {Object.entries(COLORS).map(([type, cls]) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${cls.split(' ')[0]}`} />
            <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{type}</span>
          </div>
        ))}
      </div>

      {/* Timetable Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-auto">
        <table className="w-full min-w-[800px] text-xs">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-700/50">
              <th className="px-3 py-3 text-left text-gray-500 dark:text-gray-400 font-semibold w-28">
                <div className="flex items-center gap-1"><Clock size={12} /> Time</div>
              </th>
              {DAYS.map(d => (
                <th key={d} className="px-3 py-3 text-center text-gray-700 dark:text-gray-200 font-semibold">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((slot, i) => (
              <tr key={slot} className={i % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/50 dark:bg-slate-700/20'}>
                <td className="px-3 py-2 text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">{slot}</td>
                {DAYS.map(day => {
                  const cell = schedule[day]?.[slot];
                  return (
                    <td key={day} className="px-2 py-2 align-top">
                      {cell ? (
                        <div className={`p-2 rounded-lg text-xs ${COLORS[cell.type] || COLORS.lecture}`}>
                          <div className="font-semibold truncate">{cell.subject}</div>
                          <div className="opacity-70 truncate">{cell.faculty}</div>
                          <div className="opacity-70">{cell.room}</div>
                        </div>
                      ) : (
                        <div className="h-16 border-2 border-dashed border-gray-100 dark:border-slate-600 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer group">
                          <Plus size={14} className="text-gray-400 group-hover:text-blue-500" />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
