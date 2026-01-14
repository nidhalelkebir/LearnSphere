// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBv_LR4luD38AhUMTn-5n_f1mx_wxrG0TY",
  authDomain: "learnul.firebaseapp.com",
  projectId: "learnul",
  storageBucket: "learnul.firebasestorage.app",
  messagingSenderId: "156945730226",
  appId: "1:156945730226:web:852dbdd2be49bb3b15d7ab",
  measurementId: "G-WEGFTVZWJB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export default app;