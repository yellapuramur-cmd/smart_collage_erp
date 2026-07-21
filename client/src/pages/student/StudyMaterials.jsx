import { useState } from 'react';
import { BookOpen, Download, FileText, Link, Search, Filter } from 'lucide-react';

const mockMaterials = [
  { _id: '1', title: 'Data Structures - Complete Notes', subject: 'Data Structures', type: 'pdf', uploadedBy: 'Dr. Ramesh Kumar', uploadedAt: '2026-07-15', size: '2.4 MB', url: '#' },
  { _id: '2', title: 'DBMS Lecture Slides - Unit 1-3', subject: 'DBMS', type: 'ppt', uploadedBy: 'Dr. Ramesh Kumar', uploadedAt: '2026-07-12', size: '5.1 MB', url: '#' },
  { _id: '3', title: 'Computer Networks Reference Book', subject: 'Computer Networks', type: 'link', uploadedBy: 'Dr. Suresh Patel', uploadedAt: '2026-07-10', url: 'https://example.com' },
  { _id: '4', title: 'OS Lab Manual 2025-26', subject: 'Operating Systems', type: 'pdf', uploadedBy: 'Prof. Anita Singh', uploadedAt: '2026-07-08', size: '1.8 MB', url: '#' },
  { _id: '5', title: 'DS Algorithm Animations', subject: 'Data Structures', type: 'link', uploadedBy: 'Dr. Ramesh Kumar', uploadedAt: '2026-07-05', url: 'https://visualgo.net' },
];

const typeConfig = {
  pdf: { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: FileText, label: 'PDF' },
  ppt: { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: FileText, label: 'PPT' },
  doc: { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: FileText, label: 'DOC' },
  link: { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Link, label: 'Link' },
};

export default function StudentStudyMaterials() {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const subjects = ['all', ...new Set(mockMaterials.map(m => m.subject))];
  const filtered = mockMaterials.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === 'all' || m.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Materials</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Course resources and reference materials</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search materials..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
          {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
        </select>
      </div>

      {/* Subject Groups */}
      {subjectFilter === 'all' ? (
        subjects.filter(s => s !== 'all').map(subject => {
          const items = filtered.filter(m => m.subject === subject);
          if (!items.length) return null;
          return (
            <div key={subject}>
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen size={14} /> {subject}
              </h2>
              <div className="grid gap-3">
                {items.map(m => <MaterialCard key={m._id} material={m} />)}
              </div>
            </div>
          );
        })
      ) : (
        <div className="grid gap-3">
          {filtered.map(m => <MaterialCard key={m._id} material={m} />)}
          {!filtered.length && <div className="text-center py-12 text-gray-400">No materials found.</div>}
        </div>
      )}
    </div>
  );
}

function MaterialCard({ material: m }) {
  const cfg = typeConfig[m.type] || typeConfig.pdf;
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl ${cfg.color} flex-shrink-0`}>
        <cfg.icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 dark:text-white truncate">{m.title}</h3>
        <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex-wrap">
          <span>By {m.uploadedBy}</span>
          <span>·</span>
          <span>{new Date(m.uploadedAt).toLocaleDateString('en-IN')}</span>
          {m.size && <><span>·</span><span>{m.size}</span></>}
        </div>
      </div>
      <a href={m.url} target={m.type === 'link' ? '_blank' : undefined} rel="noreferrer"
        download={m.type !== 'link'}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors flex-shrink-0">
        {m.type === 'link' ? <><Link size={12} /> Open</> : <><Download size={12} /> Download</>}
      </a>
    </div>
  );
}
