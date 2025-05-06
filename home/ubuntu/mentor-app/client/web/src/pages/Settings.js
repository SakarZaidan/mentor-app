import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { theme, updateTheme } = useTheme();

  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://via.placeholder.com/100',
      timezone: 'America/New_York',
      bio: 'Full-stack developer passionate about learning and building great software.'
    },
    preferences: {
      darkMode: true,
      emailNotifications: true,
      pushNotifications: false,
      soundEffects: true,
      autoStartPomodoro: false,
      language: 'en',
      showTaskEstimates: true
    },
    privacy: {
      profileVisibility: 'public',
      showProgress: true,
      showAchievements: true,
      shareActivity: true
    },
    integrations: {
      github: true,
      gitlab: false,
      slack: true,
      discord: false
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(settings);

  const handleSave = () => {
    setSettings(editedSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSettings(settings);
    setIsEditing(false);
  };

  const themeSettings = (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Theme Settings</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Color</label>
            <select
              value={theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="indigo">Indigo</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="pink">Pink</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</label>
            <select
              value={theme.fontSize}
              onChange={(e) => updateTheme({ fontSize: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Border Radius</label>
            <select
              value={theme.borderRadius}
              onChange={(e) => updateTheme({ borderRadius: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="none">None</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={theme.reducedMotion}
              onChange={(e) => updateTheme({ reducedMotion: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Reduce Motion
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Customize your app experience</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Settings Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            {['profile', 'preferences', 'privacy', 'integrations', 'theme'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <img
                  src={settings.profile.avatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                  Change Avatar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editedSettings.profile.name}
                    onChange={(e) => setEditedSettings({
                      ...editedSettings,
                      profile: { ...editedSettings.profile, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editedSettings.profile.email}
                    onChange={(e) => setEditedSettings({
                      ...editedSettings,
                      profile: { ...editedSettings.profile, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={editedSettings.profile.bio}
                    onChange={(e) => setEditedSettings({
                      ...editedSettings,
                      profile: { ...editedSettings.profile, bio: e.target.value }
                    })}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Settings */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(settings.preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <button
                      onClick={() => setEditedSettings({
                        ...editedSettings,
                        preferences: { ...editedSettings.preferences, [key]: !value }
                      })}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                        value ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Control who can see your {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditedSettings({
                      ...editedSettings,
                      privacy: { ...editedSettings.privacy, [key]: !value }
                    })}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                      value ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Integrations Settings */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              {Object.entries(settings.integrations).map(([platform, isConnected]) => (
                <div key={platform} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isConnected ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {platform.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-medium capitalize">
                        {platform}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isConnected ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditedSettings({
                      ...editedSettings,
                      integrations: { ...editedSettings.integrations, [platform]: !isConnected }
                    })}
                    className={`px-4 py-2 rounded-lg ${
                      isConnected
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Theme Settings */}
          {activeTab === 'theme' && themeSettings}

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
