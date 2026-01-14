// src/components/layout/Header.jsx - COMPLETE FIXED VERSION
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  Moon, 
  Sun,
  MessageSquare,
  ChevronDown,
  Menu,
  X,
  Home,
  Book,
  BarChart2,
  Users,
  Video,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { databaseService } from '../../services/database';

const Header = ({ user, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Only need theme and toggleTheme
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userData = await databaseService.getUserData(user.uid);
          setUserData(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const fetchNotifications = async () => {
      if (user) {
        try {
          // Fetch notifications
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    if (user) {
      fetchUserData();
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await databaseService.getUserData(user.uid);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      // Mock notifications - replace with actual API call
      const mockNotifications = [
        {
          id: 1,
          title: 'New Course Available',
          message: 'Advanced React Patterns is now available',
          time: '2 hours ago',
          read: false,
          type: 'course',
          link: '/course/123'
        },
        {
          id: 2,
          title: 'Assignment Due',
          message: 'JavaScript Fundamentals assignment due tomorrow',
          time: '1 day ago',
          read: true,
          type: 'assignment',
          link: '/lesson/456'
        },
        {
          id: 3,
          title: 'New Message',
          message: 'You have a new message from your instructor',
          time: '2 days ago',
          read: false,
          type: 'message',
          link: '/messages'
        },
        {
          id: 4,
          title: 'Course Completed',
          message: 'Congratulations! You completed Web Development Basics',
          time: '3 days ago',
          read: true,
          type: 'achievement',
          link: '/achievements'
        }
      ];
      
      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      try {
        // Simulate search results - replace with actual API call
        const results = [
          { id: 1, title: 'React Masterclass', type: 'course', category: 'Programming' },
          { id: 2, title: 'JavaScript Fundamentals', type: 'course', category: 'Programming' },
          { id: 3, title: 'John Doe', type: 'instructor', category: 'Web Development' },
          { id: 4, title: 'State Management Tutorial', type: 'lesson', category: 'React' }
        ].filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
        
        setSearchResults(results);
        setShowSearchResults(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getNavigationItems = () => {
    const baseItems = [
      { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
      { path: '/courses', label: 'Courses', icon: <Book className="w-5 h-5" /> },
    ];

    if (userData?.role === 'teacher') {
      return [
        ...baseItems,
        { path: '/teacher/courses', label: 'My Courses', icon: <Video className="w-5 h-5" /> },
        { path: '/teacher/analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5" /> },
      ];
    }

    if (userData?.role === 'admin') {
      return [
        ...baseItems,
        { path: '/admin/users', label: 'Users', icon: <Users className="w-5 h-5" /> },
        { path: '/admin/analytics', label: 'Analytics', icon: <BarChart2 className="w-5 h-5" /> },
      ];
    }

    return baseItems;
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo & Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="text-white w-6 h-6" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full border-2 border-white dark:border-gray-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    LearnSphere
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Elevate Your Learning</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {getNavigationItems().map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Section - Search & Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses, lessons, instructors..."
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => setShowSearchResults(true)}
                    className="pl-12 pr-4 py-2.5 w-64 lg:w-80 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        {searchResults.map((result) => (
                          <Link
                            key={`${result.type}-${result.id}`}
                            to={`/${result.type === 'course' ? 'course' : 'search'}/${result.id}`}
                            onClick={() => setShowSearchResults(false)}
                            className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className={`p-2 rounded-lg mr-3 ${
                              result.type === 'course' 
                                ? 'bg-blue-500/10 text-blue-500'
                                : result.type === 'instructor'
                                ? 'bg-purple-500/10 text-purple-500'
                                : 'bg-pink-500/10 text-pink-500'
                            }`}>
                              {result.type === 'course' ? <Book className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{result.title}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                {result.type} • {result.category}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
                        <Link
                          to={`/search?q=${searchQuery}`}
                          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                        >
                          View all results
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle - FIXED */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>

              {/* Notifications */}
              {user && (
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg">Notifications</h3>
                            {unreadCount > 0 && (
                              <button
                                onClick={clearAllNotifications}
                                className="text-sm text-blue-500 hover:text-blue-600"
                              >
                                Mark all as read
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <div
                                key={notification.id}
                                onClick={() => {
                                  markNotificationAsRead(notification.id);
                                  navigate(notification.link);
                                  setShowNotifications(false);
                                }}
                                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-750 ${
                                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                                }`}
                              >
                                <div className="flex items-start">
                                  <div className={`p-2 rounded-lg mr-3 ${
                                    notification.type === 'course'
                                      ? 'bg-blue-500/10 text-blue-500'
                                      : notification.type === 'achievement'
                                      ? 'bg-green-500/10 text-green-500'
                                      : 'bg-yellow-500/10 text-yellow-500'
                                  }`}>
                                    {notification.type === 'course' ? (
                                      <Book className="w-5 h-5" />
                                    ) : notification.type === 'achievement' ? (
                                      <User className="w-5 h-5" />
                                    ) : (
                                      <MessageSquare className="w-5 h-5" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-semibold">{notification.title}</h4>
                                      {!notification.read && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      {notification.message}
                                    </p>
                                    <span className="text-xs text-gray-500 mt-2 block">
                                      {notification.time}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-8 text-center">
                              <Bell className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                              <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                            </div>
                          )}
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                          <Link
                            to="/notifications"
                            className="block text-center text-blue-500 hover:text-blue-600 font-medium"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* User Menu or Auth Buttons */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {userData?.fullName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                      {userData?.role === 'admin' && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                          <span className="text-[8px] text-white">A</span>
                        </div>
                      )}
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="font-medium text-sm">{getGreeting()}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userData?.fullName || user.email?.split('@')[0]}
                      </p>
                    </div>
                    <ChevronDown className={`text-gray-500 w-5 h-5 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Menu Dropdown */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                              {userData?.fullName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-bold">{userData?.fullName || 'User'}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                              <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded capitalize">
                                {userData?.role || 'student'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Home className="w-5 h-5 text-gray-500" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            to="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <User className="w-5 h-5 text-gray-500" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/settings"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Settings className="w-5 h-5 text-gray-500" />
                            <span>Settings</span>
                          </Link>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="relative mb-4" ref={searchRef}>
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-12 pr-4 py-3 w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {getNavigationItems().map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMobileMenu(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Breadcrumb Navigation */}
      {user && location.pathname !== '/dashboard' && (
        <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                to="/dashboard"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Dashboard
              </Link>
              {location.pathname.split('/').filter(Boolean).map((segment, index, array) => {
                const path = `/${array.slice(0, index + 1).join('/')}`;
                const name = segment.replace(/-/g, ' ');
                
                return (
                  <React.Fragment key={path}>
                    <span className="text-gray-400">/</span>
                    {index === array.length - 1 ? (
                      <span className="text-blue-600 dark:text-blue-400 capitalize">
                        {name}
                      </span>
                    ) : (
                      <Link
                        to={path}
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 capitalize"
                      >
                        {name}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;