import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Sparkles, 
  Zap, 
  Brain, 
  Rocket, 
  Cloud,
  Star,
  Moon,
  Sun,
  GraduationCap
} from 'lucide-react';

const PageLoader = ({ variant = 'default', message = null, fullScreen = true }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    message || "Preparing your learning journey...",
    "Loading course materials...",
    "Connecting to knowledge base...",
    "Almost ready to begin...",
    "Optimizing your experience..."
  ];

  const loadingIcons = [
    <BookOpen key="book" className="w-8 h-8" />,
    <Brain key="brain" className="w-8 h-8" />,
    <Rocket key="rocket" className="w-8 h-8" />,
    <GraduationCap key="grad" className="w-8 h-8" />,
    <Zap key="zap" className="w-8 h-8" />,
  ];

  // Simulate progress for progress bar variant
  useEffect(() => {
    if (variant === 'progress') {
      setShowProgress(true);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [variant]);

  // Rotate loading messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    default: <DefaultLoader message={loadingMessages[currentMessage]} />,
    minimal: <MinimalLoader />,
    creative: <CreativeLoader />,
    particles: <ParticlesLoader />,
    progress: <ProgressLoader progress={progress} message={loadingMessages[currentMessage]} />,
    gradient: <GradientLoader />,
    floating: <FloatingLoader />,
    orbit: <OrbitLoader />,
  };

  const loaderContent = variants[variant] || variants.default;

  if (!fullScreen) {
    return loaderContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-50"
    >
      {loaderContent}
    </motion.div>
  );
};

// Different loader variants
const DefaultLoader = ({ message }) => (
  <>
    <div className="relative">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-24 h-24 border-4 border-blue-500/30 border-t-blue-500 dark:border-blue-400/30 dark:border-t-blue-400 rounded-full"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [0.8, 1, 0.8]
        }}
        transition={{ 
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute inset-4 border-2 border-purple-500/20 border-b-purple-500 dark:border-purple-400/20 dark:border-b-purple-400 rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-8 flex items-center justify-center"
      >
        <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-400" />
      </motion.div>
    </div>
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-8 text-center max-w-md"
    >
      <motion.p
        key={message}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className="text-gray-700 dark:text-gray-300 font-medium text-lg"
      >
        {message}
      </motion.p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        This will only take a moment...
      </p>
    </motion.div>
  </>
);

const MinimalLoader = () => (
  <div className="flex flex-col items-center space-y-4">
    <motion.div
      animate={{ 
        rotate: 360,
      }}
      transition={{ 
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
      className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full"
    />
    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
  </div>
);

const CreativeLoader = () => (
  <div className="relative">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        style={{
          left: `${Math.cos((i * Math.PI) / 3) * 40}px`,
          top: `${Math.sin((i * Math.PI) / 3) * 40}px`,
        }}
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.1,
        }}
      />
    ))}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="w-20 h-20 border-2 border-dashed border-blue-500/30 rounded-full"
    />
  </div>
);

const ParticlesLoader = () => (
  <div className="relative w-64 h-64">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-blue-500 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, (Math.random() - 0.5) * 50],
          y: [0, (Math.random() - 0.5) * 50],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 1 + Math.random(),
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        scale: { duration: 2, repeat: Infinity },
        rotate: { duration: 4, repeat: Infinity, ease: "linear" }
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <Sparkles className="w-12 h-12 text-blue-500" />
    </motion.div>
  </div>
);

const ProgressLoader = ({ progress, message }) => (
  <div className="w-96 max-w-full">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Loading</span>
      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
    </div>
    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
      >
        <motion.div
          animate={{
            x: ['0%', '100%'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </motion.div>
    </div>
    <motion.p
      key={message}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-gray-600 dark:text-gray-400 mt-4 text-sm"
    >
      {message}
    </motion.p>
  </div>
);

const GradientLoader = () => (
  <div className="relative">
    <motion.div
      animate={{
        background: [
          'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          'conic-gradient(from 90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          'conic-gradient(from 180deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          'conic-gradient(from 270deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          'conic-gradient(from 360deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
        ],
        rotate: 360,
      }}
      transition={{
        background: { duration: 4, repeat: Infinity, ease: 'linear' },
        rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
      }}
      className="w-32 h-32 rounded-full p-1"
    >
      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
        <Rocket className="w-12 h-12 text-blue-500" />
      </div>
    </motion.div>
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="absolute -inset-4 border-4 border-blue-500/20 rounded-full"
    />
  </div>
);

const FloatingLoader = () => (
  <div className="relative">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      >
        <Star className="w-6 h-6 text-yellow-400 fill-current" />
      </motion.div>
    ))}
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative z-10"
    >
      <Cloud className="w-24 h-24 text-blue-400" />
    </motion.div>
  </div>
);

const OrbitLoader = () => (
  <div className="relative w-40 h-40">
    {/* Center planet */}
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: 360,
      }}
      transition={{
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
      }}
      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
    >
      <Brain className="w-8 h-8 text-white" />
    </motion.div>

    {/* Orbiting elements */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center"
        animate={{
          rotate: 360,
          x: [0, Math.cos((i * Math.PI * 2) / 3) * 60],
          y: [0, Math.sin((i * Math.PI * 2) / 3) * 60],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          x: { duration: 2, repeat: Infinity, ease: "linear" },
          y: { duration: 2, repeat: Infinity, ease: "linear" },
        }}
      >
        {i === 0 && <BookOpen className="w-4 h-4 text-white" />}
        {i === 1 && <GraduationCap className="w-4 h-4 text-white" />}
        {i === 2 && <Zap className="w-4 h-4 text-white" />}
      </motion.div>
    ))}
  </div>
);

// Optional: LoadingSpinner component for reuse
export const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const colors = {
    primary: 'border-blue-500 border-t-transparent',
    secondary: 'border-purple-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizes[size]} ${colors[color]} border-4 rounded-full`}
    />
  );
};

// Optional: Skeleton loader for content placeholders
export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const CardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  );

  const TextSkeleton = () => (
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  );

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={type === 'card' ? 'mb-4' : ''}
        >
          {type === 'card' ? <CardSkeleton /> : <TextSkeleton />}
        </motion.div>
      ))}
    </>
  );
};

export default PageLoader;