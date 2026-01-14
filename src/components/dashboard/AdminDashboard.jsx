// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiBook,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiArrowUp,
  FiServer
} from 'react-icons/fi';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { databaseService } from '../../services/database';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 452890,
    activeUsers: 3241,
    conversionRate: 23.5
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      console.log('Loading admin dashboard data...');
      
      // Fetch courses
      const fetchedCourses = await databaseService.getCourses(null, 100);
      console.log('Courses loaded:', fetchedCourses);
      setCourses(fetchedCourses);

      // Fetch all users
      const fetchedUsers = await databaseService.getAllUsers(100);
      console.log('Users loaded:', fetchedUsers);
      setUsers(fetchedUsers);

      // Update stats
      setStats(prev => ({
        ...prev,
        totalCourses: fetchedCourses.length,
        totalUsers: fetchedUsers.length
      }));

      const mockActivities = [
        { id: 1, user: 'John Doe', action: 'enrolled', course: 'React Masterclass', time: '2 min ago', icon: '📝' },
        { id: 2, user: 'Jane Smith', action: 'completed', course: 'JavaScript Fundamentals', time: '15 min ago', icon: '✅' },
        { id: 3, user: 'Bob Johnson', action: 'purchased', course: 'Full Stack Development', time: '1 hour ago', icon: '💳' },
        { id: 4, user: 'Alice Brown', action: 'rated', course: 'UI/UX Design', time: '2 hours ago', icon: '⭐' },
        { id: 5, user: 'Charlie Wilson', action: 'commented', course: 'Data Science', time: '3 hours ago', icon: '💬' }
      ];

      setRecentActivities(mockActivities);
      console.log('Admin dashboard data loaded successfully');
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const revenueData = [
    { month: 'Jan', revenue: 40000 },
    { month: 'Feb', revenue: 45000 },
    { month: 'Mar', revenue: 52000 },
    { month: 'Apr', revenue: 58000 },
    { month: 'May', revenue: 62000 },
    { month: 'Jun', revenue: 69000 },
    { month: 'Jul', revenue: 72000 }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 5000 },
    { month: 'Feb', users: 6200 },
    { month: 'Mar', users: 7800 },
    { month: 'Apr', users: 8900 },
    { month: 'May', users: 9800 },
    { month: 'Jun', users: 11200 },
    { month: 'Jul', users: 12543 }
  ];

  const courseDistribution = [
    { name: 'Programming', value: 35 },
    { name: 'Design', value: 25 },
    { name: 'Business', value: 20 },
    { name: 'Marketing', value: 15 },
    { name: 'Other', value: 5 }
  ];

  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const StatCard = ({ icon: Icon, label, value, change, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-${color}-300 dark:hover:border-${color}-600 transition-all`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          <div className="flex items-center mt-3 text-green-600 dark:text-green-400 text-sm font-semibold">
            <FiArrowUp className="w-4 h-4 mr-1" />
            {change} from last month
          </div>
        </div>
        <div className={`p-4 rounded-2xl bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`w-8 h-8 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Header component should be rendered above this component in your layout (App.js or parent) */}

      {/* Dashboard Section Header (now below main header) */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
        >
          <StatCard icon={FiUsers} label="Total Users" value={stats.totalUsers.toLocaleString()} change="↑ 12%" color="blue" />
          <StatCard icon={FiBook} label="Total Courses" value={stats.totalCourses} change="↑ 8%" color="cyan" />
          <StatCard icon={FiDollarSign} label="Total Revenue" value={`$${(stats.totalRevenue / 1000).toFixed(0)}K`} change="↑ 18%" color="emerald" />
          <StatCard icon={FiActivity} label="Active Users" value={stats.activeUsers.toLocaleString()} change="↑ 5%" color="amber" />
          <StatCard icon={FiTrendingUp} label="Conversion" value={`${stats.conversionRate}%`} change="↑ 2.3%" color="rose" />
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Growth</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last 7 months performance</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  fill="url(#colorRevenue)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Growth</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cumulative user sign-ups</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#06b6d4' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Course Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Categories</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Distribution by topic</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2">
              {courseDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activities</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest platform actions</p>
              </div>
              <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-semibold">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {recentActivities.map((activity, idx) => (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="text-2xl mr-4">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      <span className="text-indigo-600 dark:text-indigo-400">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="text-gray-600 dark:text-gray-400">{activity.course}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 capitalize">
                    {activity.action}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Courses List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Courses</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total: {courses.length} courses</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Course Name</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Instructor</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Students Enrolled</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Rating</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, idx) => (
                  <motion.tr 
                    key={course.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-medium">{course.title || course.name || 'Untitled'}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {/* Show instructor, or instructorId, or N/A */}
                      {course.instructor || course.instructorId || 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-white font-semibold">{course.studentsEnrolled || 0}</td>
                    <td className="py-4 px-4 text-sm">
                      <span className="text-amber-500">{'⭐'.repeat(Math.floor(course.rating || 0))}</span>
                      <span className="text-gray-400 ml-2">{(course.rating || 0).toFixed(1)}/5</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {courses.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">No courses found</div>
            )}
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Enrolled Users</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total: {users.length} users</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, idx) => (
              <motion.div 
                key={user.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    {/* Use first letter of fullName, or firstName, or email */}
                    {(user.fullName ? user.fullName.charAt(0) : (user.firstName ? user.firstName.charAt(0) : (user.email ? user.email.charAt(0) : 'U'))).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {/* Prefer fullName, else firstName + lastName, else email */}
                      {user.fullName || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.firstName ? user.firstName : (user.email ? user.email.split('@')[0] : 'User')))}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user.email || 'No email'}</p>
                    {user.role && <p className="text-xs text-indigo-600 dark:text-indigo-400 capitalize mt-1">{user.role}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {users.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">No users found</div>
          )}
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">System Status</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Infrastructure health monitoring</p>
            </div>
            <div className="flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">All Systems Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Database', health: 95, icon: FiServer },
              { name: 'API Server', health: 98, icon: FiActivity },
              { name: 'Storage', health: 78, icon: FiBook },
              { name: 'CDN', health: 99, icon: FiTrendingUp }
            ].map((service, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{service.name}</span>
                  <div className={`w-2 h-2 rounded-full ${service.health >= 90 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${service.health >= 90 ? 'bg-green-500' : 'bg-amber-500'}`}
                    style={{ width: `${service.health}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{service.health}% uptime</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;