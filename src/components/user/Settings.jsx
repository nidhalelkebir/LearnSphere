import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';
import { 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  Globe, 
  User, 
  Shield, 
  Palette,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  LogOut,
  Save,
  RefreshCw,
  ChevronRight,
  Check,
  Upload,
  Database,
  Headphones
} from 'lucide-react';

const Settings = () => {
  const { theme, themeType, setTheme, toggleTheme, isSystemTheme, THEME_TYPES } = useTheme();
  const [activeSection, setActiveSection] = useState('appearance');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('user-settings');
    return saved ? JSON.parse(saved) : {
      // Appearance
      theme: 'system',
      fontSize: 'medium',
      reduceMotion: false,
      
      // Notifications
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      courseUpdates: true,
      
      // Privacy
      privateProfile: false,
      showOnlineStatus: true,
      allowMessaging: true,
      dataSharing: false,
      
      // Account
      language: 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      currency: 'USD',
      
      // Security
      twoFactorEnabled: false,
      loginAlerts: true,
      sessionTimeout: 30,
      
      // Data
      autoBackup: true,
      dataRetention: '6months',
      
      // Accessibility
      highContrast: false,
      screenReader: false,
      keyboardShortcuts: true,
    };
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('user-settings', JSON.stringify(settings));
  }, [settings]);

  const sections = [
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield className="w-5 h-5" /> },
    { id: 'account', label: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-5 h-5" /> },
    { id: 'data', label: 'Data', icon: <Database className="w-5 h-5" /> },
    { id: 'accessibility', label: 'Accessibility', icon: <Headphones className="w-5 h-5" /> },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  ];

  const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ];

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast.success('Setting updated!', {
      icon: '⚙️',
      duration: 1500,
    });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('All settings saved successfully!', {
      icon: '✅',
    });
    setSaving(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default values?')) {
      localStorage.removeItem('user-settings');
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'settings-backup.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success('Settings exported successfully!');
  };

  const handleSignOut = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Are you sure you want to sign out?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              // Sign out logic here
              toast.success('Signed out successfully!');
            }}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sign Out
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const ToggleSwitch = ({ enabled, onChange, label, description, icon, warning }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
      <div className="flex items-center gap-4">
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
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
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

  const renderAppearance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { theme: THEME_TYPES.LIGHT, label: 'Light', icon: <Sun className="w-6 h-6" /> },
          { theme: THEME_TYPES.DARK, label: 'Dark', icon: <Moon className="w-6 h-6" /> },
          { theme: THEME_TYPES.SYSTEM, label: 'System', icon: <Smartphone className="w-6 h-6" /> },
        ].map((option) => (
          <button
            key={option.theme}
            onClick={() => setTheme(option.theme)}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
              themeType === option.theme
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
            }`}
          >
            <div className={`p-3 rounded-lg ${
              themeType === option.theme
                ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
              {option.icon}
            </div>
            <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
            {themeType === option.theme && (
              <Check className="w-5 h-5 text-blue-500" />
            )}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Font Size
        </label>
        <div className="flex gap-2">
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => handleChange('fontSize', size)}
              className={`flex-1 py-3 rounded-lg border ${
                settings.fontSize === size
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <span className={`${
                size === 'small' ? 'text-sm' :
                size === 'medium' ? 'text-base' : 'text-lg'
              } font-medium`}>
                Aa
              </span>
              <div className="text-xs mt-1 capitalize">{size}</div>
            </button>
          ))}
        </div>
      </div>

      <ToggleSwitch
        enabled={settings.reduceMotion}
        onChange={() => handleChange('reduceMotion', !settings.reduceMotion)}
        label="Reduce Motion"
        description="Minimize animations and transitions"
        icon={<RefreshCw className="w-5 h-5" />}
      />
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      <ToggleSwitch
        enabled={settings.emailNotifications}
        onChange={() => handleChange('emailNotifications', !settings.emailNotifications)}
        label="Email Notifications"
        description="Receive updates via email"
        icon={<Mail className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.pushNotifications}
        onChange={() => handleChange('pushNotifications', !settings.pushNotifications)}
        label="Push Notifications"
        description="Get browser notifications"
        icon={<Bell className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.marketingEmails}
        onChange={() => handleChange('marketingEmails', !settings.marketingEmails)}
        label="Marketing Emails"
        description="Receive promotional content"
        icon={<Mail className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.courseUpdates}
        onChange={() => handleChange('courseUpdates', !settings.courseUpdates)}
        label="Course Updates"
        description="Notifications about enrolled courses"
        icon={<Bell className="w-5 h-5" />}
      />
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-4">
      <ToggleSwitch
        enabled={settings.privateProfile}
        onChange={() => handleChange('privateProfile', !settings.privateProfile)}
        label="Private Profile"
        description="Hide your profile from other users"
        icon={<User className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.showOnlineStatus}
        onChange={() => handleChange('showOnlineStatus', !settings.showOnlineStatus)}
        label="Show Online Status"
        description="Let others see when you're online"
        icon={<Eye className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.allowMessaging}
        onChange={() => handleChange('allowMessaging', !settings.allowMessaging)}
        label="Allow Messaging"
        description="Receive messages from other users"
        icon={<Mail className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.dataSharing}
        onChange={() => handleChange('dataSharing', !settings.dataSharing)}
        label="Data Sharing"
        description="Share anonymous usage data"
        icon={<Database className="w-5 h-5" />}
        warning
      />
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Language
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange('language', lang.code)}
              className={`p-4 rounded-lg border flex items-center gap-3 ${
                settings.language === lang.code
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left flex-1">
                <div className="font-medium text-gray-900 dark:text-white">{lang.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{lang.code.toUpperCase()}</div>
              </div>
              {settings.language === lang.code && (
                <Check className="w-5 h-5 text-blue-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Timezone
        </label>
        <select
          value={settings.timezone}
          onChange={(e) => handleChange('timezone', e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          {timezones.map(tz => (
            <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Currency
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => handleChange('currency', curr.code)}
              className={`p-3 rounded-lg border ${
                settings.currency === curr.code
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="text-lg font-bold text-gray-900 dark:text-white">{curr.symbol}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{curr.code}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <ToggleSwitch
        enabled={settings.twoFactorEnabled}
        onChange={() => handleChange('twoFactorEnabled', !settings.twoFactorEnabled)}
        label="Two-Factor Authentication"
        description="Add an extra layer of security"
        icon={<Shield className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.loginAlerts}
        onChange={() => handleChange('loginAlerts', !settings.loginAlerts)}
        label="Login Alerts"
        description="Get notified about new logins"
        icon={<Bell className="w-5 h-5" />}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Session Timeout
          <span className="ml-2 font-bold text-blue-600 dark:text-blue-400">
            {settings.sessionTimeout} min
          </span>
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
          <span>60 min</span>
          <span>120 min</span>
        </div>
      </div>
    </div>
  );

  const renderData = () => (
    <div className="space-y-6">
      <ToggleSwitch
        enabled={settings.autoBackup}
        onChange={() => handleChange('autoBackup', !settings.autoBackup)}
        label="Auto Backup"
        description="Automatically backup your data"
        icon={<Database className="w-5 h-5" />}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Data Retention
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['30days', '6months', '1year', 'forever'].map(period => (
            <button
              key={period}
              onClick={() => handleChange('dataRetention', period)}
              className={`p-4 rounded-lg border ${
                settings.dataRetention === period
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {period === '30days' ? '30 Days' :
                 period === '6months' ? '6 Months' :
                 period === '1year' ? '1 Year' : 'Forever'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={handleExportData}
          className="p-4 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <Download className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Export Data</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Download your settings</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </button>

        <button className="p-4 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Delete Account</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Permanently remove account</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </button>
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="space-y-4">
      <ToggleSwitch
        enabled={settings.highContrast}
        onChange={() => handleChange('highContrast', !settings.highContrast)}
        label="High Contrast"
        description="Increase color contrast"
        icon={<Eye className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.screenReader}
        onChange={() => handleChange('screenReader', !settings.screenReader)}
        label="Screen Reader"
        description="Optimize for screen readers"
        icon={<Headphones className="w-5 h-5" />}
      />

      <ToggleSwitch
        enabled={settings.keyboardShortcuts}
        onChange={() => handleChange('keyboardShortcuts', !settings.keyboardShortcuts)}
        label="Keyboard Shortcuts"
        description="Enable keyboard navigation"
        icon={<Smartphone className="w-5 h-5" />}
      />
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
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your experience and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sticky top-6">
              <div className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {section.icon}
                    <span className="font-medium">{section.label}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                      activeSection === section.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3">
                  {sections.find(s => s.id === activeSection)?.icon}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {sections.find(s => s.id === activeSection)?.label}
                  </h2>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {activeSection === 'appearance' && renderAppearance()}
                    {activeSection === 'notifications' && renderNotifications()}
                    {activeSection === 'privacy' && renderPrivacy()}
                    {activeSection === 'account' && renderAccount()}
                    {activeSection === 'security' && renderSecurity()}
                    {activeSection === 'data' && renderData()}
                    {activeSection === 'accessibility' && renderAccessibility()}
                  </motion.div>
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleSaveAll}
                    disabled={saving}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    onClick={handleReset}
                    className="py-3 px-6 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Reset to Defaults
                  </button>
                </div>

                {/* Sign Out Button */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSignOut}
                    className="w-full py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out of All Devices</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Current Theme</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {theme}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
                <div className="text-sm text-green-600 dark:text-green-400 mb-1">Active Features</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {Object.values(settings).filter(v => v === true).length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
                <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">Last Updated</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  Just now
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;