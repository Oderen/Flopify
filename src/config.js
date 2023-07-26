// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbnJDlVzyZpZBQJ_Ma0QWpMLLIj5K62ao",
  authDomain: "react-native-19492.firebaseapp.com",
  projectId: "react-native-19492",
  storageBucket: "react-native-19492.appspot.com",
  messagingSenderId: "537426878735",
  appId: "1:537426878735:web:8d0c2d2f1581235c135e7a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
