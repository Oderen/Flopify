import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbnJDlVzyZpZBQJ_Ma0QWpMLLIj5K62ao",
  authDomain: "react-native-19492.firebaseapp.com",
  projectId: "react-native-19492",
  storageBucket: "react-native-19492.appspot.com",
  messagingSenderId: "537426878735",
  appId: "1:537426878735:web:8d0c2d2f1581235c135e7a",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
