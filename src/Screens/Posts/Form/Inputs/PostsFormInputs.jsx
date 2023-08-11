import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
} from "react-native";
import MapPin from "../../../../../assets/map-pin.png";
import TrashIcon from "../../../../../assets/trash-2.png";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../../redux/api-operations";
import { auth } from "../../../../Firebase/config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { publishPost } from "../../../../redux/api-operations";

const PostsFormInputs = ({ photo, goToPostsScren, discardPhoto }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [locationInput, setlocationInput] = useState("");

  // const state = useSelector((state) => state.posts);
  // console.log("state", state);

  // const getPhotoUrl = async (storageRef) => {
  //   try {
  //     const url = await getDownloadURL(storageRef);
  //     return url;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  const createPost = async () => {
    if (name === "") {
      Alert.alert("Please, fill the name field");
      return;
    }
    if (!photo) {
      Alert.alert("Please, take a photo");
      return;
    }
    if (locationInput === "") {
      Alert.alert("Please, fill the location field");
      return;
    }

    let locationCoords = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: locationCoords.coords.latitude,
      longitude: locationCoords.coords.longitude,
    };
    if (locationCoords === {}) {
      return Alert.alert("Coordinates weren't sent");
    }

    const data = {
      name,
      photo,
      locationInput,
      coords,
      goToPostsScren,
    };

    dispatch(publishPost(data));

    clearInputs();
  };

  const clearInputs = () => {
    setName("");
    setlocationInput("");
    discardPhoto();
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Назва..."
          placeholderTextColor="rgba(189, 189, 189, 1)"
          value={name}
          onChangeText={setName}
          style={[
            styles.input,
            {
              borderBottomWidth: 1,
              borderStyle: "solid",
              borderBottomColor: "rgba(232, 232, 232, 1)",
            },
          ]}
        />
        <View style={styles.secondInputContainer}>
          <Image style={styles.icon} source={MapPin} />
          <TextInput
            placeholder="Місцевість..."
            placeholderTextColor="rgba(189, 189, 189, 1)"
            value={locationInput}
            onChangeText={setlocationInput}
            style={[styles.input, { width: "90%" }]}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            name !== "" && locationInput !== "" && photo && styles.buttonActive,
          ]}
          onPress={createPost}
        >
          <Text
            style={[
              styles.button__text,
              name !== "" &&
                locationInput !== "" &&
                photo &&
                styles.buttonActive__text,
            ]}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>

        <View style={styles.lowerBar}>
          <TouchableOpacity style={styles.trashButton} onPress={clearInputs}>
            <Image
              source={TrashIcon}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginTop: 32,
  },
  secondInputContainer: {
    width: "100%",
    height: 50,

    marginTop: 16,

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",

    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "rgba(232, 232, 232, 1)",
  },
  input: {
    width: "100%",
    height: 50,

    paddingTop: 16,
    paddingBottom: 16,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  button: {
    width: "100%",

    marginTop: 32,

    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRigth: 32,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  buttonActive: {
    backgroundColor: "rgba(255, 108, 0, 1)",
  },
  button__text: {
    color: "#BDBDBD",

    fontSize: 16,
  },
  buttonActive__text: {
    color: "white",
  },
  lowerBar: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  trashButton: {
    width: 70,
    height: 40,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F6F6F6",

    borderRadius: 20,
  },
});

export default PostsFormInputs;
