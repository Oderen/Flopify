import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";

import * as Location from "expo-location";

import PostsFormInputs from "./Form/Inputs/PostsFormInputs";
import CreatePostsLowerBar from "./LowerBar/CreatePostsLowerBar";

import ArrowLeft from "../../../assets/arrow-left.png";
import PhotoIcon2 from "../../../assets/photoIcon2.png";

import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

  const goBack = () => {
    navigation.goBack();
  };

  const takeAndSafePhoto = async () => {
    if (photo) {
      setPhoto(null);
      return;
    }
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhoto(uri);
    }
    return;
  };

  const discardPhoto = () => {
    setPhoto(null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
      setPhoto(null);

      let locationPermission =
        await Location.requestForegroundPermissionsAsync();
      if (locationPermission.status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  if (hasPermission === null) {
    console.log("No permission");
    return <View />;
  }
  if (hasPermission === false) {
    console.log("No permission");
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.upperBar}>
          <Text style={styles.upperBar__text}>Створити публікацію</Text>
          <TouchableOpacity
            style={{
              width: 24,
              height: 24,
              position: "absolute",
              left: 16,
            }}
            onPress={goBack}
          >
            <Image
              source={ArrowLeft}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.contentBlock}>
            {photo ? (
              <View
                style={styles.imageContainer}
                type={type}
                ref={setCameraRef}
              >
                {photo ? (
                  <ImageBackground
                    source={{ uri: photo }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : null}
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    width: 60,
                    height: 60,
                  }}
                  onPress={takeAndSafePhoto}
                >
                  <Image
                    source={PhotoIcon2}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Camera
                style={styles.imageContainer}
                type={type}
                ref={setCameraRef}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    width: 60,
                    height: 60,
                  }}
                  onPress={takeAndSafePhoto}
                >
                  <Image
                    source={PhotoIcon2}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </TouchableOpacity>
              </Camera>
            )}

            <Text style={styles.contentBlock__text}>
              {photo ? "Редагувати фото" : "Зробити фото"}
            </Text>
            <PostsFormInputs
              photo={photo}
              goToPostsScren={goBack}
              discardPhoto={discardPhoto}
            />
          </View>
        </View>
        <CreatePostsLowerBar />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  upperBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 83,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
  },
  upperBar__text: {
    marginLeft: "auto",
    marginRight: "auto",

    color: "rgba(33, 33, 33, 1)",
    textAlign: "center",
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  main: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  user: {
    width: 171,
    heitgh: 60,
    marginTop: 32,
    marginLeft: 16,
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  userphotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userphotoContainer__icon: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    marginLeft: 8,
  },

  userInfo__name: {
    color: "#212121",
    fontSize: 13,
    fontWeight: 700,
  },

  userInfo__email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
  },

  contentBlock: {
    width: "100%",
    height: 498,
  },
  imageContainer: {
    width: "100%",
    height: 240,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 8,
    backgroundColor: "rgba(232, 232, 232, 1)",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
  },
  contentBlock__text: {
    marginTop: 11,
    color: "rgba(189, 189, 189, 1)",
    fontSize: 16,
  },
});
