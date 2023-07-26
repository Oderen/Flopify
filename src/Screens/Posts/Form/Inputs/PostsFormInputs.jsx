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

const PostsFormInputs = ({ photo, goToPostsScren, discardPhoto }) => {
  const [name, setName] = useState("");
  const [locationInput, setlocationInput] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const publishPost = () => {
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

    Alert.alert("The post is published successfully");
    async () => {
      let locationCoords = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: locationCoords.coords.latitude,
        longitude: locationCoords.coords.longitude,
        // latitude: 49.59786378345425,
        // longitude: 25.59472866019018,
      };
      setUserLocation(coords);
    };

    setName("");
    setlocationInput("");
    discardPhoto();
    return goToPostsScren();
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
          onPress={publishPost}
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
});

export default PostsFormInputs;
