import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Lock, Camera, Save, Eye, EyeOff, Phone, MapPin, Users, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import api from '../../api/axios';

const studentInfo = {
  enrollmentNo: 'CS2023001', course: 'B.Tech Computer Science', semester: 3, year: 2,
  dateOfBirth: '2004-05-15', gender: 'Male', bloodGroup: 'O+',
  guardianName: 'Ramesh Sharma', guardianPhone: '9876543000',
  address: '123, MG Road, Bangalore, Karnataka - 560001',
};

export default function StudentProfile() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const { register, handleSubmit } = useForm({
    defaultValues: { name: user?.name || 'Arjun Sharma', phone: '9876543210', address: studentInfo.address }
  });
  const pwdForm = useForm();

  const onSave = async (data) => {
    setSaving(true);
    try {
      await api.put('/auth/profile', data);
      updateUser({ ...user, name: data.name });
      toast.success('Profile updated!');
    } catch { toast.error('Failed to update profile.'); }
    finally { setSaving(false); }
  };

  const onPasswordChange = async (data) => {
    if (data.newPassword !== data.confirm) { toast.error('Passwords do not match'); return; }
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
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your personal information</p>
      </div>

      {/* Profile Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white flex items-center gap-5 shadow-lg">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold overflow-hidden">
            {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" /> : <span>{(user?.name || 'S')[0]}</span>}
          </div>
          <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md">
            <Camera size={14} className="text-blue-600" />
            <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) setAvatar(URL.createObjectURL(f)); }} />
          </label>
        </div>
        <div className="flex-1">
          <p className="text-xl font-bold">{user?.name || 'Arjun Sharma'}</p>
          <p className="text-blue-200 text-sm">{user?.email || 'student@erp.com'}</p>
          <p className="text-blue-200 text-xs mt-1">{studentInfo.enrollmentNo} · {studentInfo.course}</p>
        </div>
        <div className="hidden sm:grid grid-cols-2 gap-3 text-center text-xs">
          {[
            { label: 'Semester', value: studentInfo.semester },
            { label: 'Year', value: studentInfo.year },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-xl px-4 py-2">
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-blue-200">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { icon: Users, label: 'Blood Group', value: studentInfo.bloodGroup },
          { icon: Calendar, label: 'Date of Birth', value: new Date(studentInfo.dateOfBirth).toLocaleDateString('en-IN') },
          { icon: User, label: 'Gender', value: studentInfo.gender },
          { icon: User, label: 'Guardian', value: studentInfo.guardianName },
          { icon: Phone, label: 'Guardian Phone', value: studentInfo.guardianPhone },
          { icon: MapPin, label: 'Address', value: studentInfo.address.slice(0, 30) + '...' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={13} className="text-blue-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700">
        {[{ id: 'profile', label: 'Edit Profile', icon: User }, { id: 'password', label: 'Change Password', icon: Lock }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${activeTab === t.id ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400'}`}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit(onSave)} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'name', label: 'Full Name', icon: User },
              { name: 'phone', label: 'Phone Number', icon: Phone },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                <div className="relative">
                  <f.icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input {...register(f.name)} className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <textarea {...register('address')} rows={3} className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-70 transition-colors">
            <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}

      {activeTab === 'password' && (
        <form onSubmit={pwdForm.handleSubmit(onPasswordChange)} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 space-y-4">
          {[
            { name: 'oldPassword', label: 'Current Password' },
            { name: 'newPassword', label: 'New Password' },
            { name: 'confirm', label: 'Confirm Password' },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showNewPwd ? 'text' : 'password'} {...pwdForm.register(f.name, { required: true })}
                  className="w-full pl-9 pr-10 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                <button type="button" onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showNewPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          ))}
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-70 transition-colors">
            <Lock size={15} /> {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  );
}
