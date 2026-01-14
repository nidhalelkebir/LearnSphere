// src/components/courses/InteractiveLesson.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { 
  FiChevronLeft, 
  FiChevronRight,
  FiDownload,
  FiBookOpen,
  FiMessageSquare,
  FiCheckCircle
} from 'react-icons/fi';
import { databaseService } from '../../services/database';
import { useAuth } from '../../context/AuthContext';
import QuizComponent from './QuizComponent';

const InteractiveLesson = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { userData } = useAuth();
  
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadLessonData = async () => {
    try {
      const [lessonData, courseLessons] = await Promise.all([
        databaseService.getLesson(lessonId),
        databaseService.getCourseLessons(courseId)
      ]);

      setLesson(lessonData);
      setLessons(courseLessons);
      
      const currentIndex = courseLessons.findIndex(l => l.id === lessonId);
      setCurrentLessonIndex(currentIndex);

      // Check if lesson is completed
      if (userData?.completedLessons?.includes(lessonId)) {
        setCompleted(true);
      }

      // Show quiz if lesson type is quiz
      if (lessonData?.type === 'quiz') {
        setShowQuiz(true);
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLessonData();
  }, [lessonId, courseId, loadLessonData]);

  const handleCompleteLesson = async () => {
    if (!userData || completed) return;

    try {
      await databaseService.markLessonComplete(userData.uid, lessonId);
      await databaseService.trackActivity(userData.uid, 'lesson_completed', {
        courseId,
        lessonId,
        lessonTitle: lesson?.title
      });
      
      setCompleted(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextLesson = lessons[currentLessonIndex + 1];
      navigate(`/lesson/${courseId}/${nextLesson.id}`);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = lessons[currentLessonIndex - 1];
      navigate(`/lesson/${courseId}/${prevLesson.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
          <button 
            onClick={() => navigate(`/course/${courseId}`)}
            className="btn-primary"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Lesson Navigation Bar */}
      <div className="glass-card p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/course/${courseId}`)}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <FiChevronLeft className="mr-2" />
            Back to Course
          </button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Lesson {currentLessonIndex + 1} of {lessons.length}
            </span>
            <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentLessonIndex + 1) / lessons.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
              />
            </div>
          </div>

          <button
            onClick={handleCompleteLesson}
            disabled={completed}
            className={`flex items-center px-4 py-2 rounded-lg ${
              completed 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-primary-500 hover:bg-primary-600'
            } transition-colors`}
          >
            {completed ? (
              <>
                <FiCheckCircle className="mr-2" />
                Completed
              </>
            ) : (
              'Mark as Complete'
            )}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Lesson Header */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                  {lesson.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-300">
                  <span className="flex items-center">
                    <FiBookOpen className="mr-2" />
                    {lesson.type}
                  </span>
                  <span>•</span>
                  <span>{lesson.duration} min</span>
                </div>
              </div>

              {/* Video Player */}
              {lesson.type === 'video' && lesson.videoUrl && (
                <div className="relative rounded-2xl overflow-hidden bg-black">
                  <ReactPlayer
                    url={lesson.videoUrl}
                    playing={playing}
                    controls={true}
                    width="100%"
                    height="auto"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={handleCompleteLesson}
                  />
                </div>
              )}

              {/* Article Content */}
              {lesson.type === 'article' && (
                <div className="glass-card rounded-2xl p-8">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                  />
                </div>
              )}

              {/* Quiz Component */}
              {showQuiz && (
                <QuizComponent 
                  quizId={lesson.quizId}
                  onComplete={handleCompleteLesson}
                />
              )}

              {/* Attachments */}
              {lesson.attachments && lesson.attachments.length > 0 && (
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Downloadable Resources</h3>
                  <div className="space-y-3">
                    {lesson.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        download
                        className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-primary-500/20 rounded-lg mr-4">
                            <FiDownload className="text-primary-400" />
                          </div>
                          <div>
                            <p className="font-medium">{attachment.name}</p>
                            <p className="text-sm text-gray-400">{attachment.size}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">Download</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussion/Comments */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Discussion</h3>
                  <button className="flex items-center text-primary-400 hover:text-primary-300">
                    <FiMessageSquare className="mr-2" />
                    Add Comment
                  </button>
                </div>
                {/* Comments would go here */}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Lesson Navigation */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Course Lessons</h3>
              <div className="space-y-2">
                {lessons.map((lessonItem, index) => (
                  <button
                    key={lessonItem.id}
                    onClick={() => navigate(`/lesson/${courseId}/${lessonItem.id}`)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      lessonItem.id === lessonId
                        ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30'
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        userData?.completedLessons?.includes(lessonItem.id)
                          ? 'bg-green-500/20 text-green-400'
                          : lessonItem.id === lessonId
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                          : 'bg-gray-700'
                      }`}>
                        {userData?.completedLessons?.includes(lessonItem.id) ? (
                          <FiCheckCircle />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium truncate">{lessonItem.title}</p>
                        <p className="text-sm text-gray-400">{lessonItem.duration} min</p>
                      </div>
                      {lessonItem.type === 'quiz' && (
                        <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded">
                          Quiz
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-700 space-y-4">
                <button
                  onClick={handlePreviousLesson}
                  disabled={currentLessonIndex === 0}
                  className={`w-full flex items-center justify-center py-3 rounded-xl ${
                    currentLessonIndex === 0
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <FiChevronLeft className="mr-2" />
                  Previous Lesson
                </button>
                
                <button
                  onClick={handleNextLesson}
                  disabled={currentLessonIndex === lessons.length - 1}
                  className={`w-full flex items-center justify-center py-3 rounded-xl ${
                    currentLessonIndex === lessons.length - 1
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  Next Lesson
                  <FiChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLesson;