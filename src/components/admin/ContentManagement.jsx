import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContentManagement = () => {
  const [contents, setContents] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleDeleteContent = (id) => {
    setContents(contents.filter(c => c.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Content Management</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Content</option>
          <option value="videos">Videos</option>
          <option value="documents">Documents</option>
          <option value="images">Images</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Course</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {contents.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-600 dark:text-gray-400">
                  No content found
                </td>
              </tr>
            ) : (
              contents.map((content) => (
                <tr key={content.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{content.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{content.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{content.course}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDeleteContent(content.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ContentManagement;
