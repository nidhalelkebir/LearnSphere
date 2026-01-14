import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { databaseService } from '../../services/database';
import { 
  Edit2, 
  Save, 
  X, 
  Upload, 
  Camera, 
  Mail, 
  User, 
  BookOpen, 
  Award, 
  Calendar, 
  Globe, 
  Lock, 
  Bell, 
  Shield,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Link as LinkIcon,
  Github,
  Twitter,
  Linkedin,
  Globe as Earth,
  Eye,
  EyeOff
} from 'lucide-react';

const Profile = () => {
  const { currentUser, userData, updateUserProfile, updateUserPhoto } = useAuth();
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    bio: '',
    role: '',
    photoURL: null,
    location: '',
    website: '',
    socialLinks: {
      github: '',
      twitter: '',
      linkedin: '',
    },
    preferences: {
      emailNotifications: true,
      publicProfile: true,
      showActivity: true,
    },
  });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    hoursLearned: 0,
    currentStreak: 0,
    achievements: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  useEffect(() => {
    if (userData) {
      setProfile({
        displayName: userData.displayName || '',
        email: userData.email || currentUser?.email || '',
        bio: userData.bio || '',
        role: userData.role || 'student',
        photoURL: userData.photoURL || null,
        location: userData.location || '',
        website: userData.website || '',
        socialLinks: userData.socialLinks || {
          github: '',
          twitter: '',
          linkedin: '',
        },
        preferences: userData.preferences || {
          emailNotifications: true,
          publicProfile: true,
          showActivity: true,
        },
      });
    }
  }, [userData, currentUser]);

  useEffect(() => {
    fetchUserStats();
    fetchRecentActivity();
  }, []);

  const fetchUserStats = async () => {
    try {
      const userStats = await databaseService.getUserStats(currentUser?.uid);
      setStats(userStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const activity = await databaseService.getUserActivity(currentUser?.uid);
      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handlePreferenceChange = (key) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key]
      }
    }));
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingPhoto(true);
    try {
      const photoURL = await updateUserPhoto(file);
      setProfile(prev => ({ ...prev, photoURL }));
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    if (!profile.displayName.trim()) {
      toast.error('Display name is required');
      return;
    }

    setSaving(true);
    try {
      const result = await updateUserProfile({
        displayName: profile.displayName,
        bio: profile.bio,
        location: profile.location,
        website: profile.website,
        socialLinks: profile.socialLinks,
        preferences: profile.preferences,
      });

      if (result.success) {
        toast.success('Profile updated successfully!');
        setEditing(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="w-5 h-5" /> },
    { id: 'edit', label: 'Edit Profile', icon: <Edit2 className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.coursesCompleted}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.hoursLearned}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.currentStreak}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.achievements}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
            </div>
            <Award className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Bio & Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {profile.bio || 'No bio added yet. Tell others about yourself!'}
        </p>
        
        <div className="space-y-3">
          {profile.location && (
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Globe className="w-5 h-5 mr-3" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.website && (
            <div className="flex items-center text-blue-500 hover:text-blue-600">
              <LinkIcon className="w-5 h-5 mr-3" />
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="truncate">
                {profile.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {/* Social Links */}
        {showSocialLinks && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex space-x-4">
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-blue-500" />
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-blue-700" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
        </div>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mr-4">
                  {activity.type === 'course' ? <BookOpen className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderEditProfile = () => (
    <div className="space-y-6">
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
            {profile.photoURL ? (
              <img 
                src={profile.photoURL} 
                alt={profile.displayName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-5xl">
                {profile.displayName?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <label className="absolute bottom-2 right-2 p-3 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
            <Camera className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={uploadingPhoto}
            />
          </label>
          {uploadingPhoto && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Click camera icon to upload new photo
        </p>
      </div>

      {/* Edit Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Name *
          </label>
          <input
            type="text"
            name="displayName"
            value={profile.displayName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-900 dark:text-white">{profile.email}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Contact support to change your email
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Tell us about yourself..."
          />
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Brief description about yourself (max 500 characters)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="City, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website
          </label>
          <div className="flex">
            <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-lg">
              <Earth className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="website"
              value={profile.website}
              onChange={handleInputChange}
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Social Links</h4>
            <button
              onClick={() => setShowSocialLinks(!showSocialLinks)}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              {showSocialLinks ? 'Hide' : 'Show'}
            </button>
          </div>
          
          <AnimatePresence>
            {showSocialLinks && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center">
                  <Github className="w-8 h-8 mr-3 text-gray-700 dark:text-gray-300" />
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={profile.socialLinks.github}
                    onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-center">
                  <Twitter className="w-8 h-8 mr-3 text-blue-500" />
                  <input
                    type="url"
                    placeholder="https://twitter.com/username"
                    value={profile.socialLinks.twitter}
                    onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex items-center">
                  <Linkedin className="w-8 h-8 mr-3 text-blue-700" />
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={profile.socialLinks.linkedin}
                    onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-6">
        <button
          onClick={handleSave}
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
              <span>Save Changes</span>
            </>
          )}
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className="py-3 px-6 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <ToggleSetting
        label="Email Notifications"
        description="Receive email updates about courses and activities"
        icon={<Bell className="w-5 h-5" />}
        enabled={profile.preferences.emailNotifications}
        onChange={() => handlePreferenceChange('emailNotifications')}
      />
      
      <ToggleSetting
        label="Public Profile"
        description="Allow others to view your profile"
        icon={<Eye className="w-5 h-5" />}
        enabled={profile.preferences.publicProfile}
        onChange={() => handlePreferenceChange('publicProfile')}
      />
      
      <ToggleSetting
        label="Show Activity"
        description="Display your learning activity to others"
        icon={<TrendingUp className="w-5 h-5" />}
        enabled={profile.preferences.showActivity}
        onChange={() => handlePreferenceChange('showActivity')}
      />
      
      <div className="pt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl">
        <div className="flex items-start">
          <Shield className="w-8 h-8 text-blue-500 mr-4" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Account Security</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last password change: 2 weeks ago
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center">
            <Lock className="w-5 h-5 text-gray-500 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Change Password</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Update your password regularly</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-green-600 dark:text-green-400 mr-2">Enabled</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>
      </div>
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
            My Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-6">
              {/* User Info Card */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                    {profile.photoURL ? (
                      <img 
                        src={profile.photoURL} 
                        alt={profile.displayName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl">
                        {profile.displayName?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile.displayName || 'User'}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{profile.email}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium capitalize">
                  {profile.role}
                </span>
              </div>

              {/* Tabs */}
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                      activeTab === tab.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && renderOverview()}
                  {activeTab === 'edit' && renderEditProfile()}
                  {activeTab === 'preferences' && renderPreferences()}
                  {activeTab === 'security' && renderSecurity()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Toggle Component
const ToggleSetting = ({ label, description, icon, enabled, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
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

export default Profile;