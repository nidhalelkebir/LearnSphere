import React from 'react';
import { motion } from 'framer-motion';

const AnalyticsDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '0', icon: '👥' },
          { label: 'Course Views', value: '0', icon: '👁️' },
          { label: 'Avg Rating', value: '0', icon: '⭐' },
          { label: 'Total Revenue', value: '$0', icon: '💰' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Student Engagement</h2>
        <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">Analytics chart goes here</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
