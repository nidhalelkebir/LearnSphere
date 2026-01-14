// src/services/database.js
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy, 
  limit,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export const databaseService = {
  // User operations
  async getUserData(userId) {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
  },

  async updateUserProfile(userId, data) {
    await updateDoc(doc(db, 'users', userId), {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  // Course operations
  async getCourse(courseId) {
    const courseDoc = await getDoc(doc(db, 'courses', courseId));
    return courseDoc.exists() ? { id: courseDoc.id, ...courseDoc.data() } : null;
  },

  async getCourses(category = null, limit = 20) {
    let coursesQuery = query(
      collection(db, 'courses'),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );

    if (category) {
      coursesQuery = query(coursesQuery, where('category', '==', category));
    }

    const snapshot = await getDocs(coursesQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createCourse(courseData, instructorId) {
    const courseRef = doc(collection(db, 'courses'));
    await setDoc(courseRef, {
      ...courseData,
      instructorId: instructorId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      studentsEnrolled: 0,
      rating: 0,
      lessonsCount: 0
    });
    return courseRef.id;
  },

  async enrollInCourse(userId, courseId) {
    const batch = {
      userRef: doc(db, 'users', userId),
      courseRef: doc(db, 'courses', courseId),
      enrollmentRef: doc(collection(db, 'enrollments'))
    };

    // Update user
    await updateDoc(batch.userRef, {
      enrolledCourses: arrayUnion(courseId)
    });

    // Update course
    await updateDoc(batch.courseRef, {
      studentsEnrolled: increment(1)
    });

    // Create enrollment record
    await setDoc(batch.enrollmentRef, {
      userId,
      courseId,
      enrolledAt: serverTimestamp(),
      progress: 0,
      lastAccessed: serverTimestamp(),
      completed: false
    });

    return batch.enrollmentRef.id;
  },

  // Lesson operations
  async getLesson(lessonId) {
    const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
    return lessonDoc.exists() ? { id: lessonDoc.id, ...lessonDoc.data() } : null;
  },

  async getCourseLessons(courseId) {
    const lessonsQuery = query(
      collection(db, 'lessons'),
      where('courseId', '==', courseId),
      orderBy('order', 'asc')
    );
    
    const snapshot = await getDocs(lessonsQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async markLessonComplete(userId, lessonId) {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      completedLessons: arrayUnion(lessonId),
      lastActivity: serverTimestamp()
    });

    // Update streak
    const userData = await this.getUserData(userId);
    const lastActivity = userData?.lastActivity?.toDate() || new Date(0);
    const today = new Date();
    
    if (today.toDateString() !== lastActivity.toDateString()) {
      await updateDoc(userRef, {
        streak: increment(1)
      });
    }
  },

  // Analytics
  async trackActivity(userId, action, metadata = {}) {
    const analyticsRef = doc(collection(db, 'analytics'));
    await setDoc(analyticsRef, {
      userId,
      action,
      metadata,
      timestamp: serverTimestamp()
    });
  },

  async getCourseAnalytics(courseId) {
    const analyticsQuery = query(
      collection(db, 'analytics'),
      where('metadata.courseId', '==', courseId),
      orderBy('timestamp', 'desc'),
      limit(100)
    );
    
    const snapshot = await getDocs(analyticsQuery);
    return snapshot.docs.map(doc => doc.data());
  },

  // Get teacher courses
  async getTeacherCourses(teacherId) {
    const teacherCoursesQuery = query(
      collection(db, 'courses'),
      where('instructorId', '==', teacherId)
    );
    
    const snapshot = await getDocs(teacherCoursesQuery);
    const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Sort by createdAt on client side
    return courses.sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(0);
      const dateB = b.createdAt?.toDate?.() || new Date(0);
      return dateB - dateA;
    });
  },

  // Get teacher stats
  async getTeacherStats(teacherId) {
    const coursesQuery = query(
      collection(db, 'courses'),
      where('instructorId', '==', teacherId)
    );
    
    const snapshot = await getDocs(coursesQuery);
    const courses = snapshot.docs.map(doc => doc.data());
    
    const totalStudents = courses.reduce((sum, course) => sum + (course.studentsEnrolled || 0), 0);
    const totalCourses = courses.length;
    const avgRating = courses.length > 0 ? courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length : 0;
    
    return {
      totalStudents,
      totalCourses,
      avgRating: avgRating.toFixed(1),
      totalRevenue: 0
    };
  },

  // Get teacher students
  async getTeacherStudents(teacherId) {
    const coursesQuery = query(
      collection(db, 'courses'),
      where('instructorId', '==', teacherId)
    );
    
    const coursesSnapshot = await getDocs(coursesQuery);
    const courseIds = coursesSnapshot.docs.map(doc => doc.id);
    
    if (courseIds.length === 0) return [];
    
    const enrollmentsQuery = query(
      collection(db, 'enrollments'),
      where('courseId', 'in', courseIds)
    );
    
    const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
    const uniqueStudentIds = new Set(enrollmentsSnapshot.docs.map(doc => doc.data().userId));
    
    return Array.from(uniqueStudentIds);
  },

  // File upload
  async uploadFile(file, path) {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
};