import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadCloud, File, Download, Trash2, Link as LinkIcon, BookOpen, FileText } from 'lucide-react';

export default function StudyMaterials() {
  const { register, handleSubmit, reset } = useForm();
  
  const [materials, setMaterials] = useState([
    {
      id: '1',
      title: 'React Hooks Cheat Sheet',
      subject: 'Web Development (CS301)',
      description: 'A comprehensive guide to built-in React hooks.',
      type: 'pdf',
      date: '2023-10-25',
      size: '2.4 MB',
    },
    {
      id: '2',
      title: 'Database Normalization Slides',
      subject: 'Database Management (CS302)',
      description: 'Lecture slides covering 1NF, 2NF, 3NF, and BCNF.',
      type: 'presentation',
      date: '2023-10-28',
      size: '5.1 MB',
    },
    {
      id: '3',
      title: 'Official React Documentation',
      subject: 'Web Development (CS301)',
      description: 'Link to the new React docs (react.dev).',
      type: 'link',
      date: '2023-11-01',
      url: 'https://react.dev',
    },
  ]);

  const onSubmit = (data) => {
    const newMaterial = {
      id: Date.now().toString(),
      ...data,
      type: data.type || 'document',
      date: new Date().toISOString().split('T')[0],
      size: '1.2 MB',
    };
    setMaterials([newMaterial, ...materials]);
    reset();
    alert('Material uploaded successfully!');
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="h-8 w-8 text-red-500" />;
      case 'presentation': return <BookOpen className="h-8 w-8 text-orange-500" />;
      case 'link': return <LinkIcon className="h-8 w-8 text-blue-500" />;
      default: return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <UploadCloud className="h-6 w-6 text-purple-500" />
              Study Materials
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Share resources with your students</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-purple-500" />
                Upload Resource
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Resource Title
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: true })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="e.g., Chapter 1 Notes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <select
                    {...register('subject')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="CS301">Web Development (CS301)</option>
                    <option value="CS302">Database Management (CS302)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Resource Type
                  </label>
                  <select
                    {...register('type')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="presentation">Presentation</option>
                    <option value="document">Word Document</option>
                    <option value="link">External Link</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Brief description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    File or URL
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                        <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" {...register('file')} />
                        </label>
                        <p className="pl-1">or enter URL</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        PDF, PPT, DOC up to 50MB
                      </p>
                    </div>
                  </div>
                  <input
                    type="url"
                    {...register('url')}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm"
                    placeholder="https://..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  <UploadCloud className="h-5 w-5" />
                  Share Resource
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {getIconForType(material.type)}
                    </div>
                    <button
                      onClick={() => handleDelete(material.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {material.title}
                    </h3>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
                      {material.subject}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                      {material.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span>{material.date}</span>
                      {material.size && <span className="mx-2">•</span>}
                      {material.size && <span>{material.size}</span>}
                    </div>
                    {material.type === 'link' ? (
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      >
                        <LinkIcon className="h-5 w-5" />
                      </a>
                    ) : (
                      <button className="p-2 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {materials.length === 0 && (
                <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                  <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No materials yet</h3>
                  <p className="text-gray-500 dark:text-gray-400">Upload documents or share links with your students.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
