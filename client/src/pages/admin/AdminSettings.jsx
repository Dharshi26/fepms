import React, { useState } from 'react';
import { ChevronRight, Save, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Company Settings
    companyName: 'FEPMS Corporation',
    companyEmail: 'admin@fepms.com',
    companyPhone: '+1 (800) 123-4567',
    headquarters: '123 Business Ave, New York, NY 10001',
    
    // Notification Settings
    emailNotifications: true,
    maintenanceReminders: true,
    warrantyExpiry: true,
    systemAlerts: true,
    dailyReport: false,
    weeklyReport: true,
    
    // Display Settings
    itemsPerPage: '25',
    theme: 'light',
    language: 'English',
    dateFormat: 'MM/DD/YYYY',
    timeZone: 'America/New_York',
    
    // Security Settings
    sessionTimeout: '30',
    passwordExpiry: '90',
    twoFactorAuth: false,
    apiKeyRotation: '90',
  });

  const [saveMessage, setSaveMessage] = useState('');
  const [editingSection, setEditingSection] = useState(null);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
    setEditingSection(null);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const settingsSection = (title, icon, children, isEditing = false) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        {isEditing && (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Save size={16} />
            Save Changes
          </button>
        )}
      </div>
      <div className="border-t border-gray-200 pt-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage system configuration, notifications, and preferences</p>
        </div>
      </div>

      {/* Success Message */}
      {saveMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="text-green-500">✓</div>
            <p className="text-green-700">{saveMessage}</p>
          </div>
        </div>
      )}

      {/* Settings Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Information */}
        {settingsSection(
          'Company Information',
          '🏢',
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={settings.companyEmail}
                onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={settings.companyPhone}
                onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headquarters</label>
              <input
                type="text"
                value={settings.headquarters}
                onChange={(e) => handleInputChange('headquarters', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>,
          editingSection === 'company'
        )}

        {/* Notification Settings */}
        {settingsSection(
          'Notification Settings',
          '🔔',
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive alerts via email</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleCheckboxChange('emailNotifications')}
                  className="w-5 h-5 text-primary-600 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Maintenance Reminders</p>
                <p className="text-sm text-gray-600">Get notified about scheduled maintenance</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceReminders}
                  onChange={() => handleCheckboxChange('maintenanceReminders')}
                  className="w-5 h-5 text-primary-600 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Warranty Expiry Alerts</p>
                <p className="text-sm text-gray-600">Notify when warranties are about to expire</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.warrantyExpiry}
                  onChange={() => handleCheckboxChange('warrantyExpiry')}
                  className="w-5 h-5 text-primary-600 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">System Alerts</p>
                <p className="text-sm text-gray-600">Critical system notifications</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.systemAlerts}
                  onChange={() => handleCheckboxChange('systemAlerts')}
                  className="w-5 h-5 text-primary-600 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Daily Reports</p>
                <p className="text-sm text-gray-600">Receive daily summary reports</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dailyReport}
                  onChange={() => handleCheckboxChange('dailyReport')}
                  className="w-5 h-5 text-primary-600 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Weekly Reports</p>
                <p className="text-sm text-gray-600">Receive weekly summary reports</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.weeklyReport}
                  onChange={() => handleCheckboxChange('weeklyReport')}
                  className="w-5 h-5 text-primary-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>,
          editingSection === 'notifications'
        )}

        {/* Display Settings */}
        {settingsSection(
          'Display Settings',
          '🎨',
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Items Per Page</label>
              <select
                value={settings.itemsPerPage}
                onChange={(e) => handleInputChange('itemsPerPage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <select
                value={settings.timeZone}
                onChange={(e) => handleInputChange('timeZone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
          </div>,
          editingSection === 'display'
        )}

        {/* Security Settings */}
        {settingsSection(
          'Security Settings',
          '🔒',
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
              <p className="text-sm text-blue-700">Security settings help protect your system and user data. Changes take effect immediately.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                  min="5"
                  max="480"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                <input
                  type="number"
                  value={settings.passwordExpiry}
                  onChange={(e) => handleInputChange('passwordExpiry', e.target.value)}
                  min="0"
                  max="365"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key Rotation (days)</label>
                <input
                  type="number"
                  value={settings.apiKeyRotation}
                  onChange={(e) => handleInputChange('apiKeyRotation', e.target.value)}
                  min="0"
                  max="365"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleCheckboxChange('twoFactorAuth')}
                  className="w-5 h-5 text-primary-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>,
          editingSection === 'security'
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          {editingSection ? (
            <>
              <button
                onClick={() => setEditingSection(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                Save All Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditingSection('company')}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit Company Info
              </button>
              <button
                onClick={() => setEditingSection('notifications')}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit Notifications
              </button>
              <button
                onClick={() => setEditingSection('display')}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit Display
              </button>
              <button
                onClick={() => setEditingSection('security')}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit Security
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
