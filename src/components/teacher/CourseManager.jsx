import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { databaseService } from '../../services/database';

const CourseManager = () => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });

  // Fetch teacher's courses on mount
  useEffect(() => {
    const fetchTeacherCourses = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const teacherCourses = await databaseService.getTeacherCourses(currentUser.uid);
        console.log('Fetched courses:', teacherCourses);
        setCourses(teacherCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherCourses();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    
    console.log('Current user:', currentUser);
    
    if (!currentUser) {
      toast.error('You must be logged in to create a course');
      return;
    }

    try {
      console.log('Creating course with instructorId:', currentUser.uid);
      const courseId = await databaseService.createCourse(
        {
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          image: 'https://via.placeholder.com/400x300'
        },
        currentUser.uid
      );

      toast.success('Course created successfully!');
      setCourses(prev => [...prev, { id: courseId, ...formData }]);
      setFormData({ title: '', description: '', price: '', category: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Full error details:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      toast.error('Failed to create course: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Course Manager</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Create Course
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleCreateCourse}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter course description"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Category"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Create Course
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Your Courses</h2>
        {loading ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No courses yet. Create one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 dark:bg-gray-700 h-40 flex items-center justify-center">
                  {course.image ? (
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">No image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-indigo-600">${course.price}</span>
                    <span className="text-sm text-gray-500">{course.studentsEnrolled || 0} students</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-700 py-2 rounded text-sm font-medium transition">Edit</button>
                    <button className="flex-1 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 py-2 rounded text-sm font-medium transition">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseManager;
