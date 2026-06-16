import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbBxONA3-5kprTvVkXsL68M7S5NtXXAno",
  authDomain: "bright-spark-academy.firebaseapp.com",
  projectId: "bright-spark-academy",
  storageBucket: "bright-spark-academy.firebasestorage.app",
  messagingSenderId: "895651309752",
  appId: "1:895651309752:web:b8da1689623cf313fc6c4d",
  measurementId: "G-FQJ0Q66PSJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
