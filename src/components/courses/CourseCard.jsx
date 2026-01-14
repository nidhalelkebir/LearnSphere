import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaUsers } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const { id, title, image, instructor, rating, students, price } = course;

  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <Link to={`/course/${id}`} className="block">
        <div className="relative overflow-hidden h-48">
          <img
            src={image || '/placeholder.jpg'}
            alt={title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full">
            ${price}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{instructor}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1 text-yellow-500">
              <FaStar />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <FaUsers size={14} />
              <span className="text-sm">{students}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
