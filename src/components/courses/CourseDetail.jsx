import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    // Fetch course details
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return <div className="text-center py-8">Loading course details...</div>;
  }

  if (!course) {
    return <div className="text-center py-8">Course not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Course Title</h1>
          <p className="text-xl opacity-90">Learn amazing skills in this comprehensive course</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Course Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This course provides comprehensive training on the subject matter with hands-on projects and real-world examples.
              </p>

              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">What you'll learn</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                <li>Fundamental concepts and principles</li>
                <li>Practical implementation techniques</li>
                <li>Best practices and industry standards</li>
                <li>Real-world project experience</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Course Content</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
                  <p className="font-semibold text-gray-800 dark:text-white">Module 1: Introduction</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">5 lessons</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 sticky top-4"
            >
              <div className="mb-6">
                <img src="/placeholder.jpg" alt="course" className="w-full h-48 object-cover rounded-lg mb-4" />
                <p className="text-4xl font-bold text-indigo-600 mb-4">$99</p>
              </div>

              <button
                onClick={() => setEnrolled(!enrolled)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  enrolled
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {enrolled ? 'Already Enrolled' : 'Enroll Now'}
              </button>

              <div className="mt-6 space-y-4 border-t dark:border-gray-700 pt-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
                  <p className="font-semibold text-gray-800 dark:text-white">Course Instructor</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-semibold text-gray-800 dark:text-white">8 weeks</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Level</p>
                  <p className="font-semibold text-gray-800 dark:text-white">Beginner</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetail;
