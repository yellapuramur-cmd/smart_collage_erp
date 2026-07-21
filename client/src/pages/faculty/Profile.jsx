import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Lock, Camera, Save, Eye, EyeOff, Phone, Briefcase, GraduationCap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import api from '../../api/axios';

export default function FacultyProfile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user?.name || 'Dr. Ramesh Kumar', phone: '9876543210', designation: 'Assistant Professor', qualification: 'Ph.D. Computer Science', specialization: 'Machine Learning, AI', experience: '8' }
  });
  const pwdForm = useForm();

  const onProfileSave = async (data) => {
    setSaving(true);
    try {
      await api.put('/auth/profile', data);
      updateUser({ ...user, name: data.name });
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile.');
    } finally { setSaving(false); }
  };

  const onPasswordChange = async (data) => {
    if (data.newPassword !== data.confirmPassword) { toast.error('Passwords do not match!'); return; }
    setSaving(true);
    try {
      await api.put('/auth/change-password', { oldPassword: data.oldPassword, newPassword: data.newPassword });
      toast.success('Password changed successfully!');
      pwdForm.reset();
    } catch { toast.error('Failed to change password.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your personal information and account settings</p>
      </div>

      {/* Avatar Card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white flex items-center gap-5 shadow-lg">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold overflow-hidden">
            {avatar ? <img src={avatar} alt="Avatar" className="w-full h-full object-cover" /> : <span>{(user?.name || 'F')[0]}</span>}
          </div>
          <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md">
            <Camera size={14} className="text-blue-600" />
            <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) setAvatar(URL.createObjectURL(f)); }} />
          </label>
        </div>
        <div>
          <p className="text-xl font-bold">{user?.name || 'Dr. Ramesh Kumar'}</p>
          <p className="text-blue-100 text-sm">{user?.email || 'faculty@erp.com'}</p>
          <p className="text-blue-200 text-xs mt-1 bg-white/20 px-2 py-0.5 rounded-full inline-block">Faculty</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700">
        {[{ id: 'profile', label: 'Profile Details', icon: User }, { id: 'password', label: 'Change Password', icon: Lock }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${activeTab === t.id ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {/* Profile Form */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit(onProfileSave)} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { name: 'name', label: 'Full Name', icon: User, placeholder: 'Dr. Ramesh Kumar' },
              { name: 'phone', label: 'Phone Number', icon: Phone, placeholder: '9876543210' },
              { name: 'designation', label: 'Designation', icon: Briefcase, placeholder: 'Assistant Professor' },
              { name: 'qualification', label: 'Qualification', icon: GraduationCap, placeholder: 'Ph.D. Computer Science' },
              { name: 'specialization', label: 'Specialization', icon: GraduationCap, placeholder: 'Machine Learning, AI' },
              { name: 'experience', label: 'Experience (Years)', icon: Briefcase, placeholder: '8' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                <div className="relative">
                  <f.icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input {...register(f.name, { required: true })} placeholder={f.placeholder}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            ))}
          </div>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-70 transition-colors">
            <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}

      {/* Password Form */}
      {activeTab === 'password' && (
        <form onSubmit={pwdForm.handleSubmit(onPasswordChange)} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-5">
          {[
            { name: 'oldPassword', label: 'Current Password', show: showOldPwd, toggle: () => setShowOldPwd(!showOldPwd) },
            { name: 'newPassword', label: 'New Password', show: showNewPwd, toggle: () => setShowNewPwd(!showNewPwd) },
            { name: 'confirmPassword', label: 'Confirm New Password', show: showNewPwd, toggle: () => setShowNewPwd(!showNewPwd) },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={f.show ? 'text' : 'password'} {...pwdForm.register(f.name, { required: true, minLength: 6 })}
                  className="w-full pl-9 pr-10 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="button" onClick={f.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {f.show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-70 transition-colors">
            <Lock size={15} /> {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  );
}
