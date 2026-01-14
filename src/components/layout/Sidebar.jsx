// src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiBook,
  FiBookOpen,
  FiVideo,
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiSettings,
  FiAward,
  FiBell,
  FiMessageSquare,
  FiCalendar,
  FiFolder,
  FiFileText,
  FiDollarSign,
  FiHelpCircle,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiTarget,
  FiClock,
  FiStar,
  FiLayers,
  FiBriefcase,
  FiGlobe,
  FiCode,
  FiMusic,
  FiCamera,
  FiCpu
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, userRole, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userData } = useAuth();
  
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [userStats, setUserStats] = useState({
    progress: 0,
    streak: 0,
    level: 1
  });

  // Fetch user stats
  useEffect(() => {
    // Mock data - replace with actual API call
    const stats = {
      progress: userData?.progress || 45,
      streak: userData?.streak || 7,
      level: Math.floor((userData?.progress || 0) / 20) + 1
    };
    setUserStats(stats);
  }, [userData]);

  // Navigation items based on user role
  const getNavigationItems = () => {
    const commonItems = [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: <FiHome />,
        badge: null
      },
      {
        path: '/courses',
        label: 'Browse Courses',
        icon: <FiBook />,
        badge: 'New'
      }
    ];

    const studentItems = [
      {
        section: 'Learning',
        items: [
          { path: '/my-courses', label: 'My Courses', icon: <FiBookOpen /> },
          { path: '/progress', label: 'Learning Path', icon: <FiTarget /> },
          { path: '/calendar', label: 'Schedule', icon: <FiCalendar /> },
          { path: '/assignments', label: 'Assignments', icon: <FiFileText />, badge: '3' },
          { path: '/quizzes', label: 'Quizzes', icon: <FiLayers /> }
        ]
      },
      {
        section: 'Community',
        items: [
          { path: '/discussions', label: 'Discussions', icon: <FiMessageSquare />, badge: '12' },
          { path: '/study-groups', label: 'Study Groups', icon: <FiUsers /> }
        ]
      },
      {
        section: 'Achievements',
        items: [
          { path: '/achievements', label: 'Badges', icon: <FiAward /> },
          { path: '/certificates', label: 'Certificates', icon: <FiStar /> },
          { path: '/leaderboard', label: 'Leaderboard', icon: <FiTrendingUp /> }
        ]
      }
    ];

    const teacherItems = [
      {
        section: 'Teaching',
        items: [
          { path: '/teacher/courses', label: 'My Courses', icon: <FiVideo /> },
          { path: '/teacher/create-course', label: 'Create Course', icon: <FiFolder /> },
          { path: '/teacher/students', label: 'Students', icon: <FiUsers /> },
          { path: '/teacher/assignments', label: 'Assignments', icon: <FiFileText /> },
          { path: '/teacher/analytics', label: 'Analytics', icon: <FiBarChart2 /> }
        ]
      },
      {
        section: 'Content',
        items: [
          { path: '/teacher/content', label: 'Content Library', icon: <FiBook /> },
          { path: '/teacher/resources', label: 'Resources', icon: <FiFolder /> },
          { path: '/teacher/schedule', label: 'Live Sessions', icon: <FiCalendar /> }
        ]
      },
      {
        section: 'Earnings',
        items: [
          { path: '/teacher/earnings', label: 'Revenue', icon: <FiDollarSign /> },
          { path: '/teacher/payouts', label: 'Payouts', icon: <FiBriefcase /> }
        ]
      }
    ];

    const adminItems = [
      {
        section: 'Management',
        items: [
          { path: '/admin/dashboard', label: 'Overview', icon: <FiGrid /> },
          { path: '/admin/users', label: 'Users', icon: <FiUsers /> },
          { path: '/admin/courses', label: 'Courses', icon: <FiBook /> },
          { path: '/admin/teachers', label: 'Instructors', icon: <FiBriefcase /> },
          { path: '/admin/content', label: 'Content', icon: <FiFolder /> }
        ]
      },
      {
        section: 'Analytics',
        items: [
          { path: '/admin/analytics', label: 'Platform Analytics', icon: <FiBarChart2 /> },
          { path: '/admin/revenue', label: 'Revenue', icon: <FiDollarSign /> },
          { path: '/admin/engagement', label: 'Engagement', icon: <FiTrendingUp /> }
        ]
      },
      {
        section: 'System',
        items: [
          { path: '/admin/settings', label: 'Settings', icon: <FiSettings /> },
          { path: '/admin/moderation', label: 'Moderation', icon: <FiHelpCircle /> },
          { path: '/admin/logs', label: 'Activity Logs', icon: <FiClock /> }
        ]
      }
    ];

    let roleItems = [];
    switch (userRole) {
      case 'teacher':
        roleItems = teacherItems;
        break;
      case 'admin':
        roleItems = adminItems;
        break;
      default:
        roleItems = studentItems;
    }

    return { commonItems, roleItems };
  };

  const { commonItems, roleItems } = getNavigationItems();

  // Category icons for course browse
  const categoryIcons = {
    'programming': <FiCode className="text-blue-500" />,
    'design': <FiCamera className="text-purple-500" />,
    'business': <FiBriefcase className="text-green-500" />,
    'music': <FiMusic className="text-red-500" />,
    'technology': <FiCpu className="text-cyan-500" />,
    'marketing': <FiTrendingUp className="text-orange-500" />
  };

  const categories = [
    { id: 'programming', name: 'Programming', count: 42 },
    { id: 'design', name: 'Design', count: 28 },
    { id: 'business', name: 'Business', count: 35 },
    { id: 'music', name: 'Music', count: 19 },
    { id: 'technology', name: 'Technology', count: 31 },
    { id: 'marketing', name: 'Marketing', count: 24 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getActiveParent = (path) => {
    const currentPath = location.pathname;
    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : (collapsed ? 0 : -280),
          width: collapsed ? 80 : 280
        }}
        transition={{ type: 'spring', damping: 25 }}
        className={`fixed left-0 top-0 h-screen z-40 flex flex-col ${
          collapsed ? 'w-20' : 'w-72'
        } bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 shadow-2xl`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            {!collapsed && (
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <FiBook className="text-white text-xl" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-500 to-pink-500 rounded-full border-2 border-gray-900"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">LearnSphere</h1>
                  <p className="text-xs text-gray-400">Elevate Learning</p>
                </div>
              </Link>
            )}
            {collapsed && (
              <Link to="/dashboard" className="flex justify-center">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <FiBook className="text-white text-xl" />
                </div>
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <FiChevronRight className="text-gray-400" />
              ) : (
                <FiChevronLeft className="text-gray-400" />
              )}
            </button>
          </div>

          {/* User Profile - Only show when expanded */}
          {!collapsed && userData && (
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-lg">
                    {userData.fullName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  {userData.role === 'admin' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <span className="text-[10px] text-white">A</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{userData.fullName || 'User'}</h3>
                  <p className="text-sm text-gray-400 truncate">{userData.email}</p>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-1 text-xs bg-primary-500/20 text-primary-400 rounded capitalize">
                      {userData.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Level {userStats.level}</span>
                  <span>{userStats.progress}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${userStats.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <FiClock className="text-yellow-500" />
                    <span className="text-xs text-gray-300">{userStats.streak} day streak</span>
                  </div>
                  <FiTrendingUp className="text-green-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          {/* Common Items */}
          <div className="mb-6">
            {commonItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? 'justify-center px-0' : 'px-4'} py-3 mb-1 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30'
                      : 'hover:bg-gray-800'
                  }`
                }
              >
                <div className={`${collapsed ? '' : 'mr-3'} relative`}>
                  <div className={`${getActiveParent(item.path) ? 'text-primary-400' : 'text-gray-400'}`}>
                    {item.icon}
                  </div>
                  {item.badge && !collapsed && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`font-medium ${getActiveParent(item.path) ? 'text-white' : 'text-gray-300'}`}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Role-specific Sections */}
          {roleItems.map((section) => (
            <div key={section.section} className="mb-6">
              {!collapsed && (
                <button
                  onClick={() => toggleSection(section.section)}
                  className="flex items-center justify-between w-full px-4 py-2 mb-2 text-sm font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
                >
                  <span>{section.section}</span>
                  <FiChevronRight
                    className={`transition-transform ${expandedSections[section.section] ? 'rotate-90' : ''}`}
                  />
                </button>
              )}

              <AnimatePresence>
                {(collapsed || expandedSections[section.section]) && (
                  <motion.div
                    initial={collapsed ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    animate={collapsed ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                    exit={collapsed ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    className="space-y-1"
                  >
                    {section.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center ${collapsed ? 'justify-center px-0' : 'px-4'} py-2.5 rounded-lg transition-all ${
                            isActive
                              ? 'bg-primary-500/10 text-primary-400'
                              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                          }`
                        }
                      >
                        <div className={`${collapsed ? '' : 'mr-3'} relative`}>
                          {item.icon}
                          {item.badge && !collapsed && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {!collapsed && (
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-sm">{item.label}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Categories Section (Only for students, expanded) */}
          {userRole === 'student' && !collapsed && (
            <div className="mb-6">
              <h3 className="px-4 py-2 mb-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <NavLink
                    key={category.id}
                    to={`/courses/category/${category.id}`}
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {categoryIcons[category.id] || <FiGlobe />}
                      </div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <span className="px-2 py-1 text-xs bg-gray-700 rounded group-hover:bg-gray-600">
                      {category.count}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          {/* Quick Actions */}
          {!collapsed && (
            <div className="mb-4 grid grid-cols-2 gap-2">
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <FiBell className="text-gray-400 mx-auto" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <FiSettings className="text-gray-400 mx-auto" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <FiHelpCircle className="text-gray-400 mx-auto" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
              >
                <FiLogOut className="text-red-400 mx-auto" />
              </button>
            </div>
          )}

          {/* Collapsed Footer */}
          {collapsed && (
            <div className="flex justify-center space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <FiSettings className="text-gray-400" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-500/30 rounded-lg transition-colors"
              >
                <FiLogOut className="text-red-400" />
              </button>
            </div>
          )}

          {/* Theme Toggle and Status */}
          {!collapsed && (
            <div className="flex items-center justify-between px-2 py-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Online</span>
              </div>
              <button
                onClick={() => {}}
                className="text-xs text-gray-400 hover:text-gray-300"
              >
                v1.0.0
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mini Sidebar Indicator (when collapsed) */}
      {collapsed && (
        <div className="fixed left-20 top-1/2 transform -translate-y-1/2 z-30">
          <button
            onClick={() => setCollapsed(false)}
            className="p-2 bg-gray-800 border border-gray-700 rounded-r-lg shadow-lg hover:bg-gray-700 transition-colors"
          >
            <FiChevronRight className="text-gray-400" />
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;

// Helper Link component for sidebar
const Link = ({ to, children, className }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};