import React from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const MobileNav = ({ isOpen, onClose }) => {
  return (
    <motion.nav
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-40 md:hidden"
    >
      <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
        <h1 className="text-xl font-bold text-indigo-600">ELearning</h1>
        <button onClick={onClose} className="p-2">
          <FiX size={24} />
        </button>
      </div>
      <div className="p-4 space-y-4">
        {/* Mobile navigation items will be added here */}
      </div>
    </motion.nav>
  );
};

export default MobileNav;
