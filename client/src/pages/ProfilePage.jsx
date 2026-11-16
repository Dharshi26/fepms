import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    title: 'Equipment Manager',
    department: 'Operations',
    joinDate: '2023-06-15',
    bio: 'Experienced equipment manager with 8+ years in food service industry',
    avatar: '👤',
  });

  const [editForm, setEditForm] = useState(profile);

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Cover and Avatar */}
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600"></div>
        
        <div className="px-6 pb-6">
          {/* Avatar and Quick Info */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-xl bg-slate-100 border-4 border-white flex items-center justify-center text-5xl shadow-md">
                {profile.avatar}
              </div>
              <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition shadow-md">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full text-2xl font-bold text-slate-900 px-3 py-1 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <h3 className="text-2xl font-bold text-slate-900">{profile.name}</h3>
              )}
              {!isEditing && <p className="text-slate-600">{profile.title}</p>}
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium text-sm"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                >
                  <Edit size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-t border-b border-slate-200">
            <ProfileField
              icon={<Mail size={18} className="text-primary-600" />}
              label="Email"
              value={isEditing ? editForm.email : profile.email}
              editable={isEditing}
              onChange={(value) => handleChange('email', value)}
            />
            <ProfileField
              icon={<Phone size={18} className="text-primary-600" />}
              label="Phone"
              value={isEditing ? editForm.phone : profile.phone}
              editable={isEditing}
              onChange={(value) => handleChange('phone', value)}
            />
            <ProfileField
              icon={<MapPin size={18} className="text-primary-600" />}
              label="Location"
              value={isEditing ? editForm.location : profile.location}
              editable={isEditing}
              onChange={(value) => handleChange('location', value)}
            />
            <ProfileField
              icon={<Briefcase size={18} className="text-primary-600" />}
              label="Department"
              value={isEditing ? editForm.department : profile.department}
              editable={isEditing}
              onChange={(value) => handleChange('department', value)}
            />
            <ProfileField
              icon={<Calendar size={18} className="text-primary-600" />}
              label="Member Since"
              value={new Date(profile.joinDate).toLocaleDateString()}
              editable={false}
            />
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <User size={18} className="text-primary-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-600">Role</p>
                <p className="font-medium text-slate-900">System Administrator</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="py-4 space-y-2">
            <label className="text-sm font-medium text-slate-700">Bio</label>
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                rows="3"
              />
            ) : (
              <p className="text-slate-700">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ActivityCard
          label="Equipment Managed"
          value="47"
          icon="⚙️"
        />
        <ActivityCard
          label="Maintenance Tasks"
          value="156"
          icon="🔧"
        />
        <ActivityCard
          label="System Uptime"
          value="99.8%"
          icon="✅"
        />
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-3">Danger Zone</h3>
        <p className="text-sm text-red-700 mb-4">
          Be careful with these actions. They cannot be undone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition font-medium text-sm">
            Change Password
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
          >
            Logout
          </button>
          <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition font-medium text-sm">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value, editable, onChange }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-600">{label}</p>
        {editable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full font-medium text-slate-900 bg-white px-2 py-1 border border-slate-300 rounded outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
        ) : (
          <p className="font-medium text-slate-900 truncate">{value}</p>
        )}
      </div>
    </div>
  );
}

function ActivityCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 text-center">
      <span className="text-3xl">{icon}</span>
      <p className="text-xs text-slate-600 font-medium mt-2">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}
