import React from 'react';
import { motion } from 'framer-motion';

const ProgressRing = ({ progress = 0, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="text-gray-200 dark:text-gray-700"
        />
        <motion.circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="text-indigo-600"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5 }}
          strokeDasharray={circumference}
          strokeLinecap="round"
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
      >
        {Math.round(progress)}%
      </motion.span>
    </div>
  );
};

export default ProgressRing;
