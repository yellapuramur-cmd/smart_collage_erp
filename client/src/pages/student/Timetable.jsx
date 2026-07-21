import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const schedule = {
  Monday: [{ time: '09:00 - 10:00', subject: 'Data Structures', faculty: 'Dr. Ramesh', room: 'LH-101', type: 'Lecture' }, { time: '11:00 - 12:00', subject: 'DBMS Lab', faculty: 'Dr. Ramesh', room: 'Lab-2', type: 'Lab' }],
  Tuesday: [{ time: '10:00 - 11:00', subject: 'Circuit Theory', faculty: 'Prof. Anita', room: 'LH-202', type: 'Lecture' }],
  Wednesday: [{ time: '09:00 - 10:00', subject: 'DBMS', faculty: 'Dr. Ramesh', room: 'LH-103', type: 'Lecture' }, { time: '14:00 - 15:00', subject: 'DS Tutorial', faculty: 'Dr. Suresh', room: 'TR-01', type: 'Tutorial' }],
  Thursday: [{ time: '11:00 - 12:00', subject: 'Networks', faculty: 'Dr. Suresh', room: 'LH-104', type: 'Lecture' }],
  Friday: [{ time: '09:00 - 10:00', subject: 'OS', faculty: 'Prof. Anita', room: 'LH-201', type: 'Lecture' }, { time: '15:00 - 17:00', subject: 'Networks Lab', faculty: 'Dr. Suresh', room: 'Lab-3', type: 'Lab' }],
  Saturday: [],
};

const typeColors = {
  Lecture: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-l-4 border-blue-500',
  Lab: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-l-4 border-purple-500',
  Tutorial: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-l-4 border-green-500',
};

export default function StudentTimetable() {
  const today = DAYS[new Date().getDay() - 1] || 'Monday';
  const todayClasses = schedule[today] || [];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Timetable</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Weekly class schedule</p>
      </div>

      {/* Today Highlight */}
      {todayClasses.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} />
            <span className="font-semibold">Today — {today}</span>
            <span className="ml-auto text-blue-200 text-sm">{todayClasses.length} classes</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {todayClasses.map((c, i) => (
              <div key={i} className="flex-1 min-w-44 bg-white/10 backdrop-blur rounded-xl p-3">
                <p className="font-semibold">{c.subject}</p>
                <p className="text-blue-200 text-xs mt-1 flex items-center gap-1"><Clock size={10} /> {c.time}</p>
                <p className="text-blue-200 text-xs flex items-center gap-1"><MapPin size={10} /> {c.room}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Week */}
      <div className="grid gap-4">
        {DAYS.map((day) => {
          const classes = schedule[day] || [];
          const isToday = day === today;
          return (
            <div key={day} className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border overflow-hidden ${isToday ? 'border-blue-300 dark:border-blue-500' : 'border-gray-100 dark:border-slate-700'}`}>
              <div className={`px-5 py-3 flex items-center justify-between ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-slate-700/40'}`}>
                <span className={`font-semibold text-sm ${isToday ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'}`}>{day}{isToday && <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Today</span>}</span>
                <span className="text-xs text-gray-400">{classes.length} class{classes.length !== 1 ? 'es' : ''}</span>
              </div>
              {classes.length > 0 ? (
                <div className="p-4 flex flex-wrap gap-3">
                  {classes.map((c, j) => (
                    <div key={j} className={`p-3 rounded-xl flex-1 min-w-40 ${typeColors[c.type] || typeColors.Lecture}`}>
                      <p className="font-bold text-sm">{c.subject}</p>
                      <p className="text-xs opacity-70 mt-1">{c.faculty}</p>
                      <div className="flex gap-3 mt-2 text-xs opacity-70">
                        <span className="flex items-center gap-0.5"><Clock size={10} /> {c.time}</span>
                        <span className="flex items-center gap-0.5"><MapPin size={10} /> {c.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-3 text-sm text-gray-400 italic">No classes scheduled</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
