import React, { useState } from 'react';
import { Save, Bell, Lock, Users, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    appNotifications: true,
    emailNotifications: true,
    maintenanceAlerts: true,
    warrantyAlerts: true,
    weeklyReports: false,
    monthlyReports: true,
    twoFactorAuth: false,
    sessionTimeout: '30',
    theme: 'light',
    language: 'en',
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaved(false);
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your account preferences and system settings
        </p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <span className="text-lg">✅</span>
          <p className="text-sm text-green-700 font-medium">Settings saved successfully</p>
        </div>
      )}

      {/* Notifications Settings */}
      <SettingSection
        title="Notifications"
        icon={<Bell size={20} className="text-primary-600" />}
      >
        <SettingItem
          label="App Notifications"
          description="Receive notifications within the application"
          enabled={settings.appNotifications}
          onChange={() => handleToggle('appNotifications')}
        />
        <SettingItem
          label="Email Notifications"
          description="Send notifications to your email address"
          enabled={settings.emailNotifications}
          onChange={() => handleToggle('emailNotifications')}
        />
        <SettingItem
          label="Maintenance Alerts"
          description="Notify about upcoming and overdue maintenance"
          enabled={settings.maintenanceAlerts}
          onChange={() => handleToggle('maintenanceAlerts')}
        />
        <SettingItem
          label="Warranty Alerts"
          description="Notify about expiring or expired warranties"
          enabled={settings.warrantyAlerts}
          onChange={() => handleToggle('warrantyAlerts')}
        />

        <div className="pt-4 space-y-3 border-t border-slate-200">
          <ToggleOption
            label="Weekly Report Email"
            checked={settings.weeklyReports}
            onChange={() => handleToggle('weeklyReports')}
          />
          <ToggleOption
            label="Monthly Report Email"
            checked={settings.monthlyReports}
            onChange={() => handleToggle('monthlyReports')}
          />
        </div>
      </SettingSection>

      {/* Security Settings */}
      <SettingSection
        title="Security"
        icon={<Lock size={20} className="text-primary-600" />}
      >
        <SettingItem
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          enabled={settings.twoFactorAuth}
          onChange={() => handleToggle('twoFactorAuth')}
        />

        <div className="pt-4 border-t border-slate-200">
          <label className="block text-sm font-medium text-slate-900 mb-2">Session Timeout</label>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => handleChange('sessionTimeout', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="never">Never</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Automatically log out after inactivity</p>
        </div>
      </SettingSection>

      {/* Display Settings */}
      <SettingSection
        title="Display"
        icon={<Eye size={20} className="text-primary-600" />}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Theme</label>
            <div className="space-y-2">
              <RadioOption
                label="Light"
                value="light"
                checked={settings.theme === 'light'}
                onChange={(value) => handleChange('theme', value)}
              />
              <RadioOption
                label="Dark"
                value="dark"
                checked={settings.theme === 'dark'}
                onChange={(value) => handleChange('theme', value)}
              />
              <RadioOption
                label="System"
                value="system"
                checked={settings.theme === 'system'}
                onChange={(value) => handleChange('theme', value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </SettingSection>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          <Save size={18} />
          Save Changes
        </button>
        <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium">
          Discard
        </button>
      </div>
    </div>
  );
}

function SettingSection({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="px-6 py-5 space-y-4">
        {children}
      </div>
    </div>
  );
}

function SettingItem({ label, description, enabled, onChange }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="font-medium text-slate-900">{label}</p>
        <p className="text-sm text-slate-600 mt-0.5">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex w-11 h-6 flex-shrink-0 rounded-full transition ${
          enabled ? 'bg-primary-600' : 'bg-slate-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

function ToggleOption({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

function RadioOption({ label, value, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-500"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}
