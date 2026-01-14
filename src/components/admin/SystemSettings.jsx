import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Save,
  Shield,
  Bell,
  Lock,
  Database,
  Globe,
  Users,
  Mail,
  Eye,
  EyeOff,
  Server,
  Zap,
  AlertCircle,
  ChevronDown,
  Copy,
  CheckCircle
} from 'lucide-react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    siteTitle: 'Learning Platform',
    siteDescription: 'Advanced online learning platform',
    siteUrl: 'https://platform.example.com',
    timezone: 'UTC',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    
    // Security Settings
    maintenanceMode: false,
    twoFactorAuth: true,
    requireStrongPasswords: true,
    sessionTimeout: 30,
    ipWhitelist: [],
    rateLimiting: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    adminAlerts: true,
    userWelcomeEmail: true,
    courseUpdateEmails: true,
    
    // Performance Settings
    cacheEnabled: true,
    cdnEnabled: false,
    imageOptimization: true,
    lazyLoading: true,
    
    // User Settings
    allowRegistrations: true,
    requireEmailVerification: true,
    profileVisibility: 'public',
    defaultUserRole: 'student',
    
    // API Settings
    apiEnabled: true,
    apiRateLimit: 100,
    apiKey: 'sk_live_****************',
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Zap className="w-4 h-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { id: 'api', label: 'API', icon: <Database className="w-4 h-4" /> },
  ];

  const timezones = [
    'UTC', 'EST', 'PST', 'CET', 'IST', 'JST', 'AEST'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
  ];

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    toast.success('Setting updated!');
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('All settings saved successfully!');
    setSaving(false);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(settings.apiKey);
    setCopied(true);
    toast.success('API key copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset logic here
      toast.success('Settings reset to default!');
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Site Title
          </label>
          <input
            type="text"
            value={settings.siteTitle}
            onChange={(e) => handleChange('siteTitle', e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Site URL
          </label>
          <input
            type="url"
            value={settings.siteUrl}
            onChange={(e) => handleChange('siteUrl', e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Site Description
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => handleChange('siteDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timezone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date Format
          </label>
          <select
            value={settings.dateFormat}
            onChange={(e) => handleChange('dateFormat', e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <ToggleSetting
        label="Maintenance Mode"
        description="Enable to restrict access to the site"
        icon={<Server className="w-5 h-5" />}
        enabled={settings.maintenanceMode}
        onChange={() => handleToggle('maintenanceMode')}
        warning
      />
      
      <ToggleSetting
        label="Two-Factor Authentication"
        description="Require 2FA for all admin accounts"
        icon={<Lock className="w-5 h-5" />}
        enabled={settings.twoFactorAuth}
        onChange={() => handleToggle('twoFactorAuth')}
      />

      <ToggleSetting
        label="Require Strong Passwords"
        description="Enforce password complexity requirements"
        icon={<Shield className="w-5 h-5" />}
        enabled={settings.requireStrongPasswords}
        onChange={() => handleToggle('requireStrongPasswords')}
      />

      <ToggleSetting
        label="Rate Limiting"
        description="Protect against brute force attacks"
        icon={<AlertCircle className="w-5 h-5" />}
        enabled={settings.rateLimiting}
        onChange={() => handleToggle('rateLimiting')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="range"
          min="5"
          max="120"
          step="5"
          value={settings.sessionTimeout}
          onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>5 min</span>
          <span className="font-medium">{settings.sessionTimeout} min</span>
          <span>120 min</span>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <ToggleSetting
        label="Email Notifications"
        description="Send system notifications via email"
        icon={<Mail className="w-5 h-5" />}
        enabled={settings.emailNotifications}
        onChange={() => handleToggle('emailNotifications')}
      />

      <ToggleSetting
        label="Push Notifications"
        description="Enable browser push notifications"
        icon={<Bell className="w-5 h-5" />}
        enabled={settings.pushNotifications}
        onChange={() => handleToggle('pushNotifications')}
      />

      <ToggleSetting
        label="Admin Alerts"
        description="Send alerts to administrators"
        icon={<AlertCircle className="w-5 h-5" />}
        enabled={settings.adminAlerts}
        onChange={() => handleToggle('adminAlerts')}
      />

      <ToggleSetting
        label="User Welcome Email"
        description="Send welcome email to new users"
        icon={<Mail className="w-5 h-5" />}
        enabled={settings.userWelcomeEmail}
        onChange={() => handleToggle('userWelcomeEmail')}
      />

      <ToggleSetting
        label="Course Update Emails"
        description="Notify users about course updates"
        icon={<Bell className="w-5 h-5" />}
        enabled={settings.courseUpdateEmails}
        onChange={() => handleToggle('courseUpdateEmails')}
      />
    </div>
  );

  const renderPerformanceSettings = () => (
    <div className="space-y-6">
      <ToggleSetting
        label="Enable Caching"
        description="Cache static assets for better performance"
        icon={<Zap className="w-5 h-5" />}
        enabled={settings.cacheEnabled}
        onChange={() => handleToggle('cacheEnabled')}
      />

      <ToggleSetting
        label="CDN Enabled"
        description="Use Content Delivery Network"
        icon={<Globe className="w-5 h-5" />}
        enabled={settings.cdnEnabled}
        onChange={() => handleToggle('cdnEnabled')}
      />

      <ToggleSetting
        label="Image Optimization"
        description="Automatically optimize uploaded images"
        icon={<Zap className="w-5 h-5" />}
        enabled={settings.imageOptimization}
        onChange={() => handleToggle('imageOptimization')}
      />

      <ToggleSetting
        label="Lazy Loading"
        description="Load images only when visible"
        icon={<Eye className="w-5 h-5" />}
        enabled={settings.lazyLoading}
        onChange={() => handleToggle('lazyLoading')}
      />
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <ToggleSetting
        label="Allow New Registrations"
        description="Allow new users to create accounts"
        icon={<Users className="w-5 h-5" />}
        enabled={settings.allowRegistrations}
        onChange={() => handleToggle('allowRegistrations')}
      />

      <ToggleSetting
        label="Require Email Verification"
        description="Users must verify email before accessing"
        icon={<Mail className="w-5 h-5" />}
        enabled={settings.requireEmailVerification}
        onChange={() => handleToggle('requireEmailVerification')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profile Visibility
        </label>
        <select
          value={settings.profileVisibility}
          onChange={(e) => handleChange('profileVisibility', e.target.value)}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="public">Public</option>
          <option value="members">Members Only</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Default User Role
        </label>
        <select
          value={settings.defaultUserRole}
          onChange={(e) => handleChange('defaultUserRole', e.target.value)}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <ToggleSetting
        label="API Enabled"
        description="Enable API access for third-party integrations"
        icon={<Database className="w-5 h-5" />}
        enabled={settings.apiEnabled}
        onChange={() => handleToggle('apiEnabled')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          API Rate Limit (requests/hour)
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={settings.apiRateLimit}
            onChange={(e) => handleChange('apiRateLimit', parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400 min-w-[80px]">
            {settings.apiRateLimit}/hr
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          API Key
        </label>
        <div className="relative">
          <input
            type={showApiKey ? "text" : "password"}
            value={showApiKey ? settings.apiKey : '••••••••••••••••••••••••••••••'}
            readOnly
            className="w-full px-4 py-2 pr-24 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopyApiKey}
              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Keep this key secret. Regenerate if compromised.
        </p>
      </div>

      <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
        Regenerate API Key
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your platform's behavior and preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'general' && renderGeneralSettings()}
                {activeTab === 'security' && renderSecuritySettings()}
                {activeTab === 'notifications' && renderNotificationSettings()}
                {activeTab === 'performance' && renderPerformanceSettings()}
                {activeTab === 'users' && renderUserSettings()}
                {activeTab === 'api' && renderApiSettings()}
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save All Changes</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetSettings}
                className="py-3 px-6 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reset to Defaults
              </button>

              <button className="py-3 px-6 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                Advanced Settings
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
            <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Last Updated</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">Just now</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
            <div className="text-sm text-green-600 dark:text-green-400 mb-1">Active Features</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {Object.values(settings).filter(v => v === true).length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
            <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Settings Modified</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">3 pending</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Toggle Component
const ToggleSetting = ({ label, description, icon, enabled, onChange, warning = false }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-lg ${warning ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{label}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled 
          ? warning ? 'bg-amber-500' : 'bg-blue-600'
          : 'bg-gray-300 dark:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default SystemSettings;