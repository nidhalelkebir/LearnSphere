// src/components/dashboard/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiBook, 
  FiDollarSign,
  FiBarChart2
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const TeacherDashboard = () => {
  const { userData } = useAuth();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    avgRating: 0,
    engagementRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!userData) return;

      try {
        // Fetch teacher data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, [userData]);

  // Sample chart data
  const enrollmentData = [
    { month: 'Jan', enrollments: 65 },
    { month: 'Feb', enrollments: 78 },
    { month: 'Mar', enrollments: 90 },
    { month: 'Apr', enrollments: 81 },
    { month: 'May', enrollments: 56 },
    { month: 'Jun', enrollments: 55 },
    { month: 'Jul', enrollments: 40 }
  ];

  const revenueData = [
    { name: 'Course A', revenue: 4000 },
    { name: 'Course B', revenue: 3000 },
    { name: 'Course C', revenue: 2000 },
    { name: 'Course D', revenue: 2780 },
    { name: 'Course E', revenue: 1890 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your courses and track student performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold mt-2">{stats.totalStudents}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                <FiUsers className="text-2xl text-white" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Courses</p>
                <p className="text-2xl font-bold mt-2">{stats.totalCourses}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <FiBook className="text-2xl text-white" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold mt-2">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <FiDollarSign className="text-2xl text-white" />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Rating</p>
                <p className="text-2xl font-bold mt-2">{stats.avgRating.toFixed(1)}</p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500">
                <FiBarChart2 className="text-2xl text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enrollment Trend */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Enrollment Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="enrollments" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Course */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Revenue by Course</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px'
                  }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Courses List */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Courses</h2>
            <button className="btn-primary">
              Create New Course
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Course</th>
                  <th className="text-left py-3 px-4">Students</th>
                  <th className="text-left py-3 px-4">Rating</th>
                  <th className="text-left py-3 px-4">Revenue</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mr-4"></div>
                        <div>
                          <p className="font-semibold">{course.title}</p>
                          <p className="text-sm text-gray-400">{course.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FiUsers className="mr-2" />
                        {course.studentsEnrolled || 0}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="text-yellow-400 mr-2">★</div>
                        {course.rating?.toFixed(1) || '4.5'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      ${((course.price || 0) * (course.studentsEnrolled || 0)).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-secondary-500/20 text-secondary-400 rounded-lg hover:bg-secondary-500/30">
                          Analytics
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Reviews</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <div key={review} className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">2 days ago</span>
                  </div>
                  <p className="mt-2 text-gray-300">
                    Excellent course! The content is well-structured and easy to follow.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;