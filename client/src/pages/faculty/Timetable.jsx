import { Calendar, Clock, BookOpen, MapPin } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const COLORS = ['blue', 'purple', 'green', 'orange', 'pink', 'teal'];

const schedule = {
  Monday: [{ time: '09:00 - 10:00', subject: 'Data Structures', room: 'LH-101', type: 'Lecture', students: 25 }],
  Tuesday: [{ time: '10:00 - 11:00', subject: 'DBMS', room: 'LH-203', type: 'Lecture', students: 23 }, { time: '14:00 - 16:00', subject: 'DBMS Lab', room: 'Lab-2', type: 'Lab', students: 12 }],
  Wednesday: [{ time: '09:00 - 10:00', subject: 'Data Structures', room: 'LH-101', type: 'Lecture', students: 25 }],
  Thursday: [{ time: '11:00 - 12:00', subject: 'DS Tutorial', room: 'TR-01', type: 'Tutorial', students: 25 }],
  Friday: [{ time: '10:00 - 11:00', subject: 'DBMS', room: 'LH-203', type: 'Lecture', students: 23 }],
  Saturday: [],
};

const typeColors = {
  Lecture: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-l-4 border-blue-500',
  Lab: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-l-4 border-purple-500',
  Tutorial: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-l-4 border-green-500',
};

export default function FacultyTimetable() {
  const totalClasses = Object.values(schedule).flat().length;
  const today = DAYS[new Date().getDay() - 1] || 'Monday';

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Timetable</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your weekly teaching schedule</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalClasses}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Classes/Week</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{Object.values(schedule).filter(d => d.length > 0).length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Working Days</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{schedule[today]?.length || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Classes Today</p>
        </div>
      </div>

      {/* Day-wise Schedule Cards */}
      <div className="grid gap-4">
        {DAYS.map((day, i) => {
          const classes = schedule[day] || [];
          const isToday = day === today;
          return (
            <div key={day} className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border overflow-hidden transition-all ${isToday ? 'border-blue-300 dark:border-blue-500 ring-1 ring-blue-200 dark:ring-blue-800' : 'border-gray-100 dark:border-slate-700'}`}>
              <div className={`px-5 py-3 flex items-center justify-between ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-slate-700/40'}`}>
                <div className="flex items-center gap-2">
                  <Calendar size={15} className={isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} />
                  <span className={`font-semibold ${isToday ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'}`}>{day}</span>
                  {isToday && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">Today</span>}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{classes.length} class{classes.length !== 1 ? 'es' : ''}</span>
              </div>
              {classes.length > 0 ? (
                <div className="p-4 flex flex-wrap gap-3">
                  {classes.map((c, j) => (
                    <div key={j} className={`p-4 rounded-xl flex-1 min-w-48 ${typeColors[c.type] || typeColors.Lecture}`}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Clock size={12} className="opacity-70" />
                        <span className="text-xs font-medium opacity-80">{c.time}</span>
                        <span className="ml-auto text-xs font-medium opacity-70 bg-white/30 px-1.5 py-0.5 rounded">{c.type}</span>
                      </div>
                      <p className="font-bold text-sm">{c.subject}</p>
                      <div className="flex items-center gap-3 mt-2 opacity-75 text-xs">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {c.room}</span>
                        <span className="flex items-center gap-1"><BookOpen size={10} /> {c.students} students</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-4 text-sm text-gray-400 dark:text-gray-500 italic">No classes scheduled</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
