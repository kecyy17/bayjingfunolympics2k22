// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlG4gu6B7KUu-Z4c7nJplBx_XNBYLzHYs",
  authDomain: "bayjingfunolympics2k22.firebaseapp.com",
  projectId: "bayjingfunolympics2k22",
  storageBucket: "bayjingfunolympics2k22.appspot.com",
  messagingSenderId: "793989014723",
  appId: "1:793989014723:web:bd206ac9015faae0a4ae76",
  measurementId: "G-7D9NYXLHGC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app);
export const fireStorage = getStorage(app)

export default app