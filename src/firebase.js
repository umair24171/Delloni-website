import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE3vqWd_ReJyeHVcqtGe7uPDN9Gw6IyjY",
  authDomain: "delloni.firebaseapp.com",
  projectId: "delloni",
  storageBucket: "delloni.firebasestorage.app",
  messagingSenderId: "324991894056",
  appId: "1:324991894056:web:3ded49b4babd1aa261eb1d",
  measurementId: "G-L3GET4YLJB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

// Export both names for compatibility
export { app, analytics, firestore, storage, auth };
export const db = firestore; // Our services expect 'db'

export default app;