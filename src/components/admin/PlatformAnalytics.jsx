import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  DollarSign, 
  Star,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  Eye,
  Clock,
  Award,
  Activity,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const PlatformAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  // Mock data for demonstration
  const mockStats = {
    users: {
      total: 24583,
      active: 18437,
      new: 1234,
      growth: 12.5,
    },
    courses: {
      total: 156,
      active: 142,
      published: 134,
      enrollment: 84567,
      growth: 8.2,
    },
    revenue: {
      total: 1254500,
      monthly: 104542,
      averagePerUser: 51.2,
      growth: 15.7,
    },
    engagement: {
      avgRating: 4.7,
      completionRate: 78.5,
      avgTimeSpent: 42,
      satisfaction: 92,
    }
  };

  const timeRanges = [
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: '90days', label: 'Last Quarter' },
    { id: '1year', label: 'Last Year' },
    { id: 'all', label: 'All Time' },
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 800);
  }, [timeRange]);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const StatCard = ({ icon: Icon, label, value, trend, trendDirection = 'up', isLoading = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        {trend && (
          <span className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
            trendDirection === 'up' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          }`}>
            {trendDirection === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            {trend}%
          </span>
        )}
      </div>
      
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
        </>
      )}
    </motion.div>
  );

  const ChartCard = ({ title, icon: Icon, children, actions }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20">
            <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {actions}
      </div>
      {children}
    </motion.div>
  );

  if (loading || !stats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Platform Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time insights and performance metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>
            
            <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span className="font-medium">Export</span>
            </button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Users"
            value={formatNumber(stats.users.total)}
            trend={stats.users.growth}
            trendDirection="up"
          />
          <StatCard
            icon={BookOpen}
            label="Active Courses"
            value={stats.courses.total}
            trend={stats.courses.growth}
            trendDirection="up"
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={formatCurrency(stats.revenue.total)}
            trend={stats.revenue.growth}
            trendDirection="up"
          />
          <StatCard
            icon={Star}
            label="Avg. Rating"
            value={stats.engagement.avgRating.toFixed(1)}
            trend={stats.engagement.satisfaction}
            trendDirection="up"
          />
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Activity}
            label="Active Users"
            value={formatNumber(stats.users.active)}
            trend={stats.users.growth}
            trendDirection="up"
          />
          <StatCard
            icon={Award}
            label="Course Completion Rate"
            value={`${stats.engagement.completionRate}%`}
            trend={stats.engagement.completionRate - 75}
            trendDirection={stats.engagement.completionRate > 75 ? 'up' : 'down'}
          />
          <StatCard
            icon={Clock}
            label="Avg. Time Spent (min)"
            value={stats.engagement.avgTimeSpent}
            trend={stats.engagement.avgTimeSpent - 35}
            trendDirection={stats.engagement.avgTimeSpent > 35 ? 'up' : 'down'}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Distribution Chart */}
          <ChartCard
            title="User Distribution"
            icon={PieChart}
            actions={
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                Details
              </button>
            }
          >
            <div className="h-72 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Pie Chart Segments */}
                {[
                  { label: 'Students', value: 65, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Instructors', value: 15, color: 'from-purple-500 to-pink-500' },
                  { label: 'Admins', value: 5, color: 'from-green-500 to-emerald-500' },
                  { label: 'Visitors', value: 15, color: 'from-yellow-500 to-orange-500' },
                ].map((segment, i, arr) => {
                  const percentage = segment.value;
                  const rotation = arr.slice(0, i).reduce((sum, s) => sum + s.value, 0) * 3.6;
                  
                  return (
                    <div
                      key={segment.label}
                      className="absolute inset-0"
                      style={{
                        clipPath: `conic-gradient(${segment.color} ${percentage}%, transparent 0)`,
                        transform: `rotate(${rotation}deg)`,
                      }}
                    />
                  );
                })}
                
                <div className="absolute inset-1/4 rounded-full bg-white dark:bg-gray-800" />
              </div>
              
              <div className="ml-8 space-y-4">
                {[
                  { label: 'Students', value: '65%', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
                  { label: 'Instructors', value: '15%', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                  { label: 'Admins', value: '5%', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
                  { label: 'Visitors', value: '15%', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center">
                    <div className={`w-3 h-3 ${item.color} rounded mr-3`} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                    <span className="ml-auto font-medium text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          {/* Revenue Trend Chart */}
          <ChartCard
            title="Revenue Trend"
            icon={BarChart3}
            actions={
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Monthly
              </button>
            }
          >
            <div className="h-72">
              <div className="flex items-end justify-between h-48 mb-4 px-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => {
                  const height = 30 + Math.random() * 70;
                  const revenue = 50000 + Math.random() * 50000;
                  
                  return (
                    <div key={month} className="flex flex-col items-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {formatCurrency(revenue).replace('$', '')}
                      </div>
                      <div
                        className="w-8 rounded-t-lg bg-gradient-to-t from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all"
                        style={{ height: `${height}%` }}
                      />
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{month}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Month</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(104542)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Growth</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    +15.7%
                  </p>
                </div>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Performance */}
          <ChartCard
            title="Top Performing Courses"
            icon={Award}
          >
            <div className="space-y-4">
              {[
                { name: 'Advanced React Patterns', enrollment: 5243, rating: 4.9, revenue: 52430 },
                { name: 'JavaScript Masterclass', enrollment: 4215, rating: 4.8, revenue: 42150 },
                { name: 'Web Development Bootcamp', enrollment: 3892, rating: 4.7, revenue: 38920 },
                { name: 'Data Science Fundamentals', enrollment: 3124, rating: 4.6, revenue: 31240 },
                { name: 'UI/UX Design Principles', enrollment: 2876, rating: 4.8, revenue: 28760 },
              ].map((course, i) => (
                <motion.div
                  key={course.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm mr-4">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {course.name}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {formatNumber(course.enrollment)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(course.revenue)}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      +{Math.floor(Math.random() * 20) + 10}%
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-4 group-hover:text-blue-500" />
                </motion.div>
              ))}
            </div>
          </ChartCard>

          {/* Recent Activity */}
          <ChartCard
            title="Recent Activity"
            icon={Activity}
            actions={
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                View All
              </button>
            }
          >
            <div className="space-y-4">
              {[
                { user: 'Alex Johnson', action: 'completed a course', time: '2 min ago', type: 'success' },
                { user: 'Maria Garcia', action: 'enrolled in new course', time: '15 min ago', type: 'info' },
                { user: 'John Smith', action: 'left a review', time: '1 hour ago', type: 'warning' },
                { user: 'Sarah Miller', action: 'upgraded to premium', time: '2 hours ago', type: 'success' },
                { user: 'David Wilson', action: 'completed assessment', time: '5 hours ago', type: 'info' },
              ].map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Quick Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
            <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Avg. Session Duration</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">24 min</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
            <div className="text-sm text-green-600 dark:text-green-400 mb-1">Bounce Rate</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">12.4%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
            <div className="text-sm text-purple-600 dark:text-purple-400 mb-1">New Users Today</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">184</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-xl">
            <div className="text-sm text-amber-600 dark:text-amber-400 mb-1">Support Tickets</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">42</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlatformAnalytics;