// src/services/database.js
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc,
  query, 
  where, 
  orderBy, 
  limit,
  arrayUnion,
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

  async getCourses(category = null, limitNum = 20) {
    try {
      let coursesQuery;
      
      if (category) {
        coursesQuery = query(
          collection(db, 'courses'),
          where('category', '==', category),
          limit(limitNum)
        );
      } else {
        coursesQuery = query(
          collection(db, 'courses'),
          limit(limitNum)
        );
      }

      const snapshot = await getDocs(coursesQuery);
      console.log('Firestore snapshot docs count:', snapshot.docs.length);
      
      const courses = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Course data:', data);
        return { id: doc.id, ...data };
      });
      
      console.log(`Fetched ${courses.length} courses from Firestore`);
      return courses;
    } catch (error) {
      console.warn('Warning: Unable to fetch courses:', error.message);
      console.log('Returning mock courses due to error');
      return [
        {
          id: 'mock-1',
          title: 'React Masterclass',
          description: 'Learn React from basics to advanced',
          instructor: 'John Smith',
          category: 'Programming',
          studentsEnrolled: 245,
          rating: 4.8,
          price: 99.99
        }
      ];
    }
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

  // Get all users
  async getAllUsers(limitNum = 100) {
    try {
      const usersQuery = query(
        collection(db, 'users'),
        limit(limitNum)
      );
      
      const snapshot = await getDocs(usersQuery);
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(`Fetched ${users.length} users from Firestore`);
      
      // Return mock data if no users found (for development)
      if (users.length === 0) {
        console.log('No users found in Firestore, returning mock data');
        return [
          {
            id: 'mock-user-1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: 'student',
            enrolledCourses: ['mock-1', 'mock-2'],
            createdAt: new Date()
          },
          {
            id: 'mock-user-2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'teacher',
            createdAt: new Date()
          },
          {
            id: 'mock-user-3',
            firstName: 'Bob',
            lastName: 'Johnson',
            email: 'bob.johnson@example.com',
            role: 'student',
            enrolledCourses: ['mock-3'],
            createdAt: new Date()
          },
          {
            id: 'mock-user-4',
            firstName: 'Alice',
            lastName: 'Brown',
            email: 'alice.brown@example.com',
            role: 'admin',
            createdAt: new Date()
          },
          {
            id: 'mock-user-5',
            firstName: 'Charlie',
            lastName: 'Wilson',
            email: 'charlie.wilson@example.com',
            role: 'student',
            enrolledCourses: ['mock-1'],
            createdAt: new Date()
          }
        ];
      }
      
      return users;
    } catch (error) {
      console.warn('Warning: Unable to fetch users:', error.message);
      console.log('Returning mock users due to error');
      return [
        {
          id: 'mock-user-1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role: 'student'
        },
        {
          id: 'mock-user-2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          role: 'teacher'
        },
        {
          id: 'mock-user-3',
          firstName: 'Bob',
          lastName: 'Johnson',
          email: 'bob.johnson@example.com',
          role: 'student'
        },
        {
          id: 'mock-user-4',
          firstName: 'Alice',
          lastName: 'Brown',
          email: 'alice.brown@example.com',
          role: 'admin'
        },
        {
          id: 'mock-user-5',
          firstName: 'Charlie',
          lastName: 'Wilson',
          email: 'charlie.wilson@example.com',
          role: 'student'
        }
      ];
    }
  },

  // File upload
  async uploadFile(file, path) {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
};
