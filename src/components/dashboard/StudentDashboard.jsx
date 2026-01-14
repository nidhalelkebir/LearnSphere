// src/components/dashboard/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBookOpen, 
  FiTrendingUp, 
  FiAward, 
  FiStar
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ProgressRing from '../ui/ProgressRing';
import CourseCard from '../courses/CourseCard';
import ActivityFeed from '../dashboard/ActivityFeed';

const StudentDashboard = () => {
  const { userData } = useAuth();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedLessons: 0,
    totalLessons: 0,
    streak: 0,
    avgScore: 0,
    timeSpent: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!userData) return;

      try {
        // Fetch student data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [userData]);

  const statCards = [
    {
      title: 'Enrolled Courses',
      value: stats.totalCourses,
      icon: <FiBookOpen className="text-2xl" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Completion Rate',
      value: `${stats.progress}%`,
      icon: <FiTrendingUp className="text-2xl" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Learning Streak',
      value: `${stats.streak} days`,
      icon: <FiAward className="text-2xl" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Avg. Score',
      value: `${stats.avgScore}%`,
      icon: <FiStar className="text-2xl" />,
      color: 'from-purple-500 to-pink-500'
    }
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
            Welcome back, {userData?.fullName?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Learning Progress</h2>
              <span className="text-primary-500 font-semibold">
                {stats.completedLessons}/{stats.totalLessons} lessons
              </span>
            </div>
            
            {/* Progress Rings */}
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <ProgressRing
                  progress={stats.progress}
                  size={120}
                  strokeWidth={10}
                  gradient={['#3b82f6', '#8b5cf6']}
                />
                <p className="mt-4 font-semibold">Overall Progress</p>
              </div>
              
              {courses.slice(0, 3).map((course, index) => {
                const courseProgress = Math.floor(Math.random() * 100); // Replace with actual progress
                return (
                  <div key={course.id} className="text-center">
                    <ProgressRing
                      progress={courseProgress}
                      size={100}
                      strokeWidth={8}
                      gradient={index % 2 === 0 ? ['#10b981', '#34d399'] : ['#f59e0b', '#fbbf24']}
                    />
                    <p className="mt-3 text-sm font-medium truncate max-w-[100px]">{course.title}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <ActivityFeed userId={userData?.uid} />
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Courses</h2>
            <button className="btn-primary text-sm">
              Browse More Courses
            </button>
          </div>
          
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} showProgress={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass-card rounded-2xl">
              <FiBookOpen className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Courses Enrolled</h3>
              <p className="text-gray-500 mb-6">Start your learning journey by enrolling in courses</p>
              <button className="btn-primary">Browse Courses</button>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Recommendation cards would go here */}
            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-4 rounded-xl border border-primary-500/20">
              <div className="h-40 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mb-4"></div>
              <h3 className="font-semibold">Advanced React Patterns</h3>
              <p className="text-sm text-gray-500 mt-1">Master advanced React concepts</p>
            </div>
            {/* Add more recommendations */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;