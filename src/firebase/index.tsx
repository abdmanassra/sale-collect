import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

console.log(process.env);
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APP_API_KEY,
  authDomain: process.env.FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_APP_MESSIGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_APP_ID,
  measurementId: process.env.FIREBASE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();

export default {
  firebase,
  db,
  auth,
  storage,
};
