import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Filter, Users, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import FacultyForm from './FacultyForm';

const Faculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const response = await api.get('/faculty');
      setFacultyList(response.data?.data || []);
    } catch (error) {
      toast.error('Failed to load faculty members');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingFaculty(null);
    setIsFormOpen(true);
  };

  const handleEdit = (faculty) => {
    setEditingFaculty(faculty);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty member and their login user account?')) return;
    try {
      await api.delete(`/faculty/${id}`);
      toast.success('Faculty member deleted successfully');
      fetchFaculty();
    } catch (error) {
      toast.error('Failed to delete faculty member');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingFaculty) {
        await api.put(`/faculty/${editingFaculty._id}`, formData);
        toast.success('Faculty profile updated successfully!');
      } else {
        await api.post('/faculty', formData);
        toast.success('Faculty created successfully! Login credentials created.');
      }
      setIsFormOpen(false);
      fetchFaculty();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save faculty details');
    }
  };

  const filteredFaculty = facultyList.filter(f => {
    const nameMatch = f.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      f.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      f.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const deptMatch = !deptFilter || (f.department?.name === deptFilter || f.department?.code === deptFilter);
    return nameMatch && deptMatch;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="text-blue-600 dark:text-blue-400" /> Faculty Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage teaching staff, designations, and portal access</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchFaculty} className="p-2.5 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-md font-medium text-sm">
            <Plus size={18} />
            <span>Add New Faculty</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, employee ID, or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee ID</th>
                <th className="px-6 py-4">Faculty Name</th>
                <th className="px-6 py-4">Designation</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Experience / Qual.</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {filteredFaculty.map((faculty) => (
                <tr key={faculty._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-blue-600 dark:text-blue-400 text-xs">
                    {faculty.employeeId || 'EMP'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white">{faculty.name}</div>
                    <div className="text-xs text-gray-400">{faculty.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {faculty.designation || 'Faculty'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                    {faculty.department?.name || 'Department'}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                    <div>{faculty.qualification || 'PhD'}</div>
                    <div className="text-gray-400">{faculty.experience || 0} Years Exp.</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(faculty)} className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(faculty._id)} className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredFaculty.length === 0 && !loading && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400 dark:text-gray-500">
                    No faculty members found. Click "Add New Faculty" to create a faculty account.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FacultyForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        initialData={editingFaculty}
      />
    </div>
  );
};

export default Faculty;
