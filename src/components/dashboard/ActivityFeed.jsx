import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCheckCircle } from 'react-icons/fa';

const ActivityFeed = ({ activities = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 pb-4 border-b dark:border-gray-700 last:border-b-0"
            >
              <div className="flex-shrink-0 mt-1">
                <FaCheckCircle className="text-green-500" size={20} />
              </div>
              <div className="flex-grow">
                <p className="text-gray-800 dark:text-white font-medium">{activity.title}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.description}</p>
                <div className="flex items-center space-x-1 text-gray-500 text-xs mt-2">
                  <FaClock size={12} />
                  <span>{activity.timestamp}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No recent activity</p>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
