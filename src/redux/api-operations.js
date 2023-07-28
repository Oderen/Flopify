//react-native
import { Alert } from "react-native";
// redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// firebase
import { auth } from "../Firebase/config";
import { db } from "../Firebase/config";
import { addDoc, collection } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  try {
    const { login, email, password } = data.userCredentials;

    // reg email and password
    const user = await createUserWithEmailAndPassword(auth, email, password);

    // reg tokem
    const tokenId = user._tokenResponse.idToken;

    // reg login
    await updateProfile(auth.currentUser, {
      displayName: login,
    });

    // put all in redux
    const userData = {
      login,
      email,
      password,
      tokenId,
    };

    data.navigation.navigate("Home");

    return userData;
  } catch (error) {
    console.log("error", error.code);

    if (error.code === "auth/email-already-in-use") {
      throw Alert.alert(
        "Authintification error",
        "Email is already in use. Please use another one."
      );
    } else if (error.code === "auth/invalid-email") {
      throw Alert.alert("Authintification error", "Invalid email");
    }

    throw Alert.alert(`Something went wrong /n Please try again`);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  try {
    const { email, password } = data.userCredentials;

    const user = await signInWithEmailAndPassword(auth, email, password);

    const login = user._tokenResponse.displayName;
    const tokenId = user._tokenResponse.idToken;

    const userData = {
      login,
      email,
      password,
      tokenId,
    };

    data.navigation.navigate("Home");

    return userData;
  } catch (error) {
    console.log("error", error.code);

    if (error.code === "auth/email-already-in-use") {
      throw Alert.alert(
        "Authintification error",
        "Email is already in use. Please use another one."
      );
    } else if (error.code === "auth/invalid-email") {
      throw Alert.alert("Authintification error", "Invalid email");
    }

    throw Alert.alert(`Something went wrong /n Please try again`);
  }
});

export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (navigation) => {
    try {
      await signOut(auth);
      navigation.navigate("Логін");
    } catch (error) {
      console.log(error);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/add",

  async (postData, { rejectWithValue }) => {
    console.log("postData", postData);
    try {
      const docRef = await addDoc(collection(db, "posts"), postData);
      console.log("Document written with ID: ", docRef.id);

      return postData;
    } catch (error) {
      console.error("Error adding document: ", e);
      return rejectWithValue(error);
    }
  }
);
