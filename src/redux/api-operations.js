//react-native
import { Alert } from "react-native";
// redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// firebase
import { auth } from "../Firebase/config";
import { db } from "../Firebase/config";
import {
  collection,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  try {
    const { login, email, password, image } = data.userCredentials;

    // reg email and password
    const user = await createUserWithEmailAndPassword(auth, email, password);

    // reg token
    const tokenId = user._tokenResponse.idToken;

    // reg login and photo
    await updateProfile(auth.currentUser, {
      displayName: login,
      photoURL: image,
    });

    // put all in redux
    const userData = {
      login,
      email,
      password,
      tokenId,
      image,
    };

    data.navigation.navigate("Home");

    return userData;
  } catch (error) {
    console.log("error code", error.code);

    if (error.code === "auth/email-already-in-use") {
      throw Alert.alert(
        "Authintification error",
        "Email is already in use. Please use another one."
      );
    } else if (error.code === "auth/invalid-email") {
      throw Alert.alert("Authintification error", "Invalid email");
    }

    console.log("error message", error.message);
    throw Alert.alert(`Something went wrong /n Please try again`);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  try {
    const { email, password } = data.userCredentials;

    const user = await signInWithEmailAndPassword(auth, email, password);

    const login = user._tokenResponse.displayName;
    const tokenId = user._tokenResponse.idToken;
    const image = user.user.photoURL;

    const userData = {
      login,
      email,
      password,
      tokenId,
      image,
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
    } else if (error.code === "auth/user-not-found") {
      throw Alert.alert("Authintification error", "User doesn't exist");
    }
    throw Alert.alert(`Something went wrong Please try again`);
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

export const redirectingUser = createAsyncThunk(
  "auth/redirection",
  async (data, { rejectWithValue }) => {
    try {
      const { displayName, email, accessToken, photoURL } = data.user;

      const userData = {
        displayName,
        email,
        accessToken,
        image: photoURL,
      };
      data.navigation.navigate("Home");
      return userData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));

    const dataArr = [];
    snapshot.forEach((doc) => dataArr.push({ id: doc.id, data: doc.data() }));

    return dataArr;
  } catch (error) {
    console.log("Error", error.message);
  }
});

export const publishPost = createAsyncThunk(
  "post/add",

  async (data, { rejectWithValue }) => {
    try {
      // Fetch the file as a Blob
      const response = await fetch(data.photo);
      const fileBlob = await response.blob();

      // Upload the file to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, fileBlob._data.name);
      await uploadBytes(storageRef, fileBlob);

      // get uploaded photo url
      const photoUrl = await getDownloadURL(storageRef);

      // get user data
      const user = auth.currentUser;

      // prepeare postData for sending
      const postData = {
        user: user.email,
        name: data.name,
        photo: photoUrl,
        locationInput: data.locationInput,
        locCoords: data.coords,
        comments: [],
      };

      // send postData
      const docRef = await addDoc(collection(db, "posts"), postData);
      postData.id = docRef.id;

      console.log("postData", postData);
      data.goToPostsScren();
    } catch (error) {
      console.error("Error adding document: ", e);
      return rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",

  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const docRef = doc(db, "posts", data.postID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();

        await updateDoc(docRef, {
          comments: [...postData.comments, data.commentData],
        });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      return rejectWithValue(error);
    }
  }
);

export const addPhoto = createAsyncThunk("user/addPhoto", async (photo) => {
  console.log("photo", photo);
  try {
    await updateProfile(auth.currentUser, {
      photoURL: photo,
    });

    return photo;
  } catch (error) {
    console.error("Error adding document: ", error);
    return rejectWithValue(error);
  }
});
