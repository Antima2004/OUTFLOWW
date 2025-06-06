import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
  updatePhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, isSupported as isMessagingSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDIXQawm6JNyxwt1UnEH8rZhzYyYWhEWYg',
  authDomain: 'expensetracking-73767.firebaseapp.com',
  projectId: 'expensetracking-73767',
  storageBucket: 'expensetracking-73767.appspot.com',
  messagingSenderId: '433052728459',
  appId: '1:433052728459:web:98ef488a9bcd471f92888e',
  measurementId: 'G-4CD1QW7VWT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if supported and in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  isAnalyticsSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log('Firebase Analytics initialized successfully');
      } else {
        console.warn('Firebase Analytics is not supported in this environment');
      }
    })
    .catch((error) => {
      console.error('Error checking Firebase Analytics support:', error);
    });
}

// Initialize Auth
const auth = getAuth(app);

// Google Auth
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore
const db = getFirestore(app);

// Initialize Messaging (only if supported and in browser environment)
let messaging = null;
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  isMessagingSupported()
    .then((supported) => {
      if (supported) {
        messaging = getMessaging(app);
        console.log('Firebase Messaging initialized successfully');
      } else {
        console.warn('Firebase Messaging is not supported in this browser');
      }
    })
    .catch((error) => {
      console.error('Error checking Firebase Messaging support:', error);
    });
}

// Export everything needed
export {
  app,
  auth,
  googleProvider,
  db,
  messaging,
  analytics,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
  updatePhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
};

export default app;