import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl opacity-90">Empowering learners worldwide with quality education</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            We believe that education should be accessible to everyone, everywhere. Our platform connects learners
            with expert instructors to deliver high-quality courses that help people achieve their goals.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Founded in 2024, we started with a simple idea: make quality education affordable and accessible to all.
            Today, we serve millions of learners across the globe.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Values</h2>
          <ul className="space-y-4 text-gray-600 dark:text-gray-400 text-lg">
            <li>• <strong>Quality:</strong> We maintain the highest standards for our courses</li>
            <li>• <strong>Accessibility:</strong> Education should be available to everyone</li>
            <li>• <strong>Innovation:</strong> We continuously improve our platform</li>
            <li>• <strong>Community:</strong> We believe in the power of learning together</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
