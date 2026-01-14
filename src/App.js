// src/App.js
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Firebase
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';

// Loading Components
import LoadingSpinner from './components/ui/LoadingSpinner';
import PageLoader from './components/ui/PageLoader';

// Lazy-loaded Components for better performance
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));

const StudentDashboard = lazy(() => import('./components/dashboard/StudentDashboard'));
const TeacherDashboard = lazy(() => import('./components/dashboard/TeacherDashboard'));
const AdminDashboard = lazy(() => import('./components/dashboard/AdminDashboard'));

const CourseCatalog = lazy(() => import('./components/courses/CourseCatalog'));
const CourseDetail = lazy(() => import('./components/courses/CourseDetail'));
const InteractiveLesson = lazy(() => import('./components/courses/InteractiveLesson'));

const CourseManager = lazy(() => import('./components/teacher/CourseManager'));
const ContentUpload = lazy(() => import('./components/teacher/ContentUpload'));
const TeacherAnalytics = lazy(() => import('./components/teacher/AnalyticsDashboard'));
const CreateCourse = lazy(() => import('./components/teacher/CreateCourse'));

const UserManagement = lazy(() => import('./components/admin/UserManagement'));
const PlatformAnalytics = lazy(() => import('./components/admin/PlatformAnalytics'));
const SystemSettings = lazy(() => import('./components/admin/SystemSettings'));
const ContentManagement = lazy(() => import('./components/admin/ContentManagement'));

const Profile = lazy(() => import('./components/user/Profile'));
const Notifications = lazy(() => import('./components/user/Notifications'));
const Settings = lazy(() => import('./components/user/Settings'));
const Achievements = lazy(() => import('./components/user/Achievements'));

const HomePage = lazy(() => import('./components/home/HomePage'));
const About = lazy(() => import('./components/home/About'));
const Contact = lazy(() => import('./components/home/Contact'));
const Pricing = lazy(() => import('./components/home/Pricing'));
const FAQ = lazy(() => import('./components/home/FAQ'));

const NotFound = lazy(() => import('./components/error/NotFound'));
const Maintenance = lazy(() => import('./components/error/Maintenance'));

// Protected Route Component
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'));

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        try {
          // Fetch user role and data from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
            
            // Store user data in localStorage for quick access
            localStorage.setItem('userData', JSON.stringify(userData));
          } else {
            // If user document doesn't exist, create it
            console.log('User document not found, creating one...');
            // You would typically create the document here
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('userData');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check maintenance mode (you can fetch this from Firestore)
  useEffect(() => {
    // Simulate checking maintenance mode
    const checkMaintenance = async () => {
      try {
        // In production, fetch from Firestore
        // const maintenanceDoc = await getDoc(doc(db, 'system', 'maintenance'));
        // setMaintenanceMode(maintenanceDoc.exists() && maintenanceDoc.data().active);
        
        setMaintenanceMode(false); // Set to false by default
      } catch (error) {
        console.error('Error checking maintenance mode:', error);
      }
    };
    
    checkMaintenance();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show maintenance page if in maintenance mode
  if (maintenanceMode) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Maintenance />
      </Suspense>
    );
  }

  // Render different layouts based on authentication and screen size
  const renderLayout = () => {
    // Public routes (no auth required)
    const publicRoutes = [
      '/', '/login', '/register', '/forgot-password',
      '/about', '/contact', '/pricing', '/faq'
    ];

    const currentPath = window.location.pathname;
    const isPublicRoute = publicRoutes.includes(currentPath);

    // Don't show sidebar/header on auth pages
    if (currentPath === '/login' || currentPath === '/register' || currentPath === '/forgot-password') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Suspense>
        </div>
      );
    }

    // Public home page layout
    if (!user && isPublicRoute) {
      return (
        <div className="min-h-screen flex flex-col">
          <Header user={user} toggleSidebar={toggleSidebar} />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      );
    }

    // Authenticated user layout
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        {user && <Header user={user} toggleSidebar={toggleSidebar} />}
        
        {/* Mobile Navigation */}
        {user && isMobile && <MobileNav userRole={userRole} />}
        
        <div className="flex">
          {/* Sidebar for desktop */}
          {user && !isMobile && (
            <Sidebar 
              isOpen={sidebarOpen} 
              userRole={userRole} 
              onClose={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Main Content */}
          <main className={`flex-1 transition-all duration-300 ${
            user && !isMobile && sidebarOpen ? 'ml-64' : ''
          }`}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    {userRole === 'student' ? <StudentDashboard /> :
                     userRole === 'teacher' ? <TeacherDashboard /> :
                     userRole === 'admin' ? <AdminDashboard /> :
                     <Navigate to="/login" />}
                  </ProtectedRoute>
                } />
                
                {/* Course Routes */}
                <Route path="/courses" element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <CourseCatalog />
                  </ProtectedRoute>
                } />
                
                <Route path="/course/:id" element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <CourseDetail />
                  </ProtectedRoute>
                } />
                
                <Route path="/lesson/:courseId/:lessonId" element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <InteractiveLesson />
                  </ProtectedRoute>
                } />
                
                {/* Teacher Routes */}
                <Route path="/teacher/courses" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <CourseManager />
                  </ProtectedRoute>
                } />
                
                <Route path="/teacher/create-course" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <CreateCourse />
                  </ProtectedRoute>
                } />
                
                <Route path="/teacher/upload/:courseId" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <ContentUpload />
                  </ProtectedRoute>
                } />
                
                <Route path="/teacher/analytics" element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <TeacherAnalytics />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/users" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserManagement />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/analytics" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <PlatformAnalytics />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/settings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SystemSettings />
                  </ProtectedRoute>
                } />
                
                <Route path="/admin/content" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ContentManagement />
                  </ProtectedRoute>
                } />
                
                {/* User Routes */}
                <Route path="/profile" element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                <Route path="/notifications" element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <Notifications />
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                <Route path="/achievements" element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <Achievements />
                  </ProtectedRoute>
                } />
                
                {/* Auth Redirection */}
                <Route path="/login" element={
                  user ? <Navigate to="/dashboard" /> : <Login />
                } />
                
                <Route path="/register" element={
                  user ? <Navigate to="/dashboard" /> : <Register />
                } />
                
                {/* Redirect root to appropriate page */}
                <Route path="/" element={
                  user ? <Navigate to="/dashboard" /> : <Navigate to="/" />
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        
        {/* Footer for public pages */}
        {!user && <Footer />}
      </div>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AnimatePresence mode="wait">
              <div className="App">
                {/* Toast Notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'rgba(17, 24, 39, 0.9)',
                      color: '#fff',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                    success: {
                      iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#EF4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                
                {renderLayout()}
              </div>
            </AnimatePresence>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;