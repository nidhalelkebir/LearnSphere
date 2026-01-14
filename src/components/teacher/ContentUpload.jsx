import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ContentUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploads, setUploads] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setUploading(true);
    try {
      // Simulate file upload
      setTimeout(() => {
        toast.success('File uploaded successfully!');
        setUploads([...uploads, { name: file.name, date: new Date().toLocaleDateString() }]);
        setFile(null);
        setUploading(false);
      }, 1500);
    } catch (error) {
      toast.error('Upload failed');
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Content Upload</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
      >
        <form onSubmit={handleUpload}>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Drag and drop your files here or click to select</p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
              accept=".pdf,.doc,.docx,.mp4,.mp3"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <span className="text-indigo-600 hover:text-indigo-700 font-semibold">Click to select files</span>
            </label>
            {file && <p className="mt-4 text-sm text-green-600">Selected: {file.name}</p>}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">File Type</label>
            <select className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2">
              <option>Video</option>
              <option>Document</option>
              <option>Audio</option>
              <option>Presentation</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={uploading || !file}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Uploaded Files</h2>
        {uploads.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No files uploaded yet</p>
        ) : (
          <div className="space-y-4">
            {uploads.map((upload, index) => (
              <div key={index} className="flex justify-between items-center border dark:border-gray-700 rounded-lg p-4">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{upload.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{upload.date}</p>
                </div>
                <button className="text-red-600 hover:underline">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContentUpload;
