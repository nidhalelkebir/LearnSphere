import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Course Available', message: 'A new course has been added to your favorite category', read: false },
    { id: 2, title: 'Course Completed', message: 'Congratulations! You have completed a course', read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Notifications</h1>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">No notifications</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-lg shadow-lg ${
                notif.read
                  ? 'bg-gray-100 dark:bg-gray-800'
                  : 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-600'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-white">{notif.title}</h3>
                {!notif.read && (
                  <span className="inline-block w-3 h-3 bg-blue-600 rounded-full"></span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{notif.message}</p>
              <div className="flex space-x-2">
                {!notif.read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;
