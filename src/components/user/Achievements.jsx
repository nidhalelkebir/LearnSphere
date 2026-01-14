import React from 'react';
import { motion } from 'framer-motion';

const Achievements = () => {
  const achievements = [
    { id: 1, title: 'First Step', description: 'Complete your first course', icon: '🎓', unlocked: true },
    { id: 2, title: 'Quick Learner', description: 'Complete a course in 7 days', icon: '⚡', unlocked: false },
    { id: 3, title: 'Consistent', description: 'Learn for 30 consecutive days', icon: '🔥', unlocked: false },
    { id: 4, title: 'Expert', description: 'Complete 10 courses', icon: '🏆', unlocked: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Achievements</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-lg shadow-lg ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900'
                : 'bg-gray-100 dark:bg-gray-800 opacity-50'
            }`}
          >
            <div className="text-5xl mb-4">{achievement.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{achievement.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{achievement.description}</p>
            {achievement.unlocked ? (
              <span className="inline-block px-4 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                Unlocked
              </span>
            ) : (
              <span className="inline-block px-4 py-1 bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full text-sm font-semibold">
                Locked
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Achievements;
