import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import React, { useEffect } from "react";

import LogoImage from "../../../assets/PhotoBg.png";
import PlusIcon from "../../../assets/add.png";

import CloseButton from "../../../assets/closeButton.png";

import LogOut from "../../../assets/log-out.png";

import MessageIcon from "../../../assets/message-circle.png";
import ColoredMessageIcon from "../../../assets/colored-message-circle.png";
import MapPin from "../../../assets/map-pin.png";
import thumbsUp from "../../../assets/thumbs-up.png";

import { useSelector } from "react-redux";
import { logOutUser, addPhoto } from "../../redux/api-operations";
import { useDispatch } from "react-redux";

import { auth } from "../../Firebase/config";

import { addPostID } from "../../redux/postReducer";
import * as ImagePicker from "expo-image-picker";

import { resetPhoto } from "../../redux/slices/authSlice";
import { Loader } from "../../Loader/Loader";
import { fetchPosts } from "../../redux/api-operations";
import { Ionicons } from "@expo/vector-icons";

const Item = ({ title, photo, location, navigation, id, commentCount }) => {
  const dispatch = useDispatch();

  const goToComments = () => {
    dispatch(addPostID(id));
    navigation.navigate("Comments");
  };

  const goToMap = () => {
    dispatch(addPostID(id));
    navigation.navigate("Map");
  };
  return (
    <SafeAreaView
      style={{
        marginBottom: 32,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 32,
          marginBottom: 32,
        }}
      >
        <View style={{ width: 370, height: 240 }}>
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
          />
          <Text
            style={{
              marginTop: 8,

              color: "#212121",
              fontSize: 16,
              fontFamily: "Roboto",
              fontWeight: 500,
            }}
          >
            {title}
          </Text>
          <View
            style={{
              width: "100%",

              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",

              marginTop: 8,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={goToComments}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 6,
                  }}
                >
                  <Image
                    source={commentCount > 0 ? ColoredMessageIcon : MessageIcon}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    color: "#BDBDBD",
                    fontSize: 16,
                    fontFamily: "Roboto",
                  }}
                >
                  {commentCount}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 24,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 6,
                  }}
                >
                  <Image
                    source={thumbsUp}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    color: "#BDBDBD",
                    fontSize: 16,
                    fontFamily: "Roboto",
                  }}
                >
                  0
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={goToMap} style={{ marginRight: 4 }}>
                <Image source={MapPin} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>

              <Text
                style={{
                  color: "#212121",
                  fontSize: 16,
                  fontFamily: "Roboto",
                  textDecorationLine: "underline",
                }}
              >
                {location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  const isPostPublished = useSelector((state) => state.posts.isPostPublished);
  const isIdReseted = useSelector((state) => state.postID.postId);

  const login = useSelector((state) => state.auth.user.login);
  const posts = useSelector((state) => state.posts.items);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, isPostPublished, isIdReseted]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(addPhoto(result.assets[0].uri));
    }
  };

  const addNewAvatar = async () => {
    try {
      await pickImage();
    } catch (error) {
      console.log(error.message);
    }
  };

  const resetAvatar = async () => {
    try {
      dispatch(resetPhoto());
    } catch (error) {
      console.log(error.message);
    }
  };

  const profileLogOut = () => {
    dispatch(logOutUser(navigation));
  };

  const refreshPosts = () => {
    dispatch(fetchPosts());
  };

  const user = auth.currentUser;
  const userEmail = user?.email || "preventing error";

  if (userEmail) {
    filteredData = posts.filter((post) => post.data.user === userEmail);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <ImageBackground
        source={LogoImage}
        resizeMode="cover"
        style={{ height: "100%", justifyContent: "flex-end" }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: "70%",

            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            justifyContent: posts.length > 0 ? "center" : "",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.logOutButton} onPress={profileLogOut}>
            <Image source={LogOut} width={24} height={24} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.refreshButton} onPress={refreshPosts}>
            <Ionicons
              name={"refresh-outline"}
              size={24}
              color={"rgba(189, 189, 189, 1)"}
            />
          </TouchableOpacity>

          <View
            style={{
              position: "absolute",
              top: "-10%",
              alignSelf: "center",
              width: 120,
              height: 120,
              borderRadius: 16,
              backgroundColor: "#F6F6F6",
            }}
          >
            {userData.photo ? (
              <Image
                source={{
                  uri: userData.photo,
                }}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
              />
            ) : (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#FFDAB9",
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 70,
                    color: "black",
                    fontWeight: 500,
                    letterSpacing: 0.3,
                  }}
                >
                  {userData.login ? userData.login.slice(0, 1) : "U"}
                </Text>
              </View>
            )}
            {userData.photo ? (
              <TouchableOpacity
                onPress={resetAvatar}
                style={{
                  position: "relative",
                  top: "-35%",

                  left: "90%",
                  height: 25,
                  width: 25,
                  flexShrink: 0,
                }}
              >
                <Image
                  source={CloseButton}
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={addNewAvatar}
                style={{
                  position: "relative",
                  top: "-33%",

                  left: "90%",
                  height: 25,
                  width: 25,
                  flexShrink: 0,
                }}
              >
                <Image
                  source={PlusIcon}
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={{
              fontSize: 30,
              color: "#212121",
              fontWeight: 500,
              letterSpacing: 0.3,
              marginTop: 80,
            }}
          >
            {login}
          </Text>
          {posts.length > 0 && (
            <FlatList
              style={{ marginTop: 32, marginBottom: 43 }}
              data={filteredData}
              renderItem={({ item }) => (
                <Item
                  title={item.data.name}
                  photo={item.data.photo}
                  location={item.data.locationInput}
                  navigation={navigation}
                  id={item.id}
                  commentCount={item.data.comments.length}
                />
              )}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logOutButton: {
    position: "absolute",
    top: "4.5%",
    left: "90%",
  },
  refreshButton: {
    position: "absolute",
    top: "4.5%",
    right: "90%",
  },
  input: {
    height: 50,
    width: "90%",
    borderWidth: 1,
    padding: 16,

    fontSize: 16,
    fontFamily: "Roboto",
    borderRadius: 10,
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderColor: "rgba(232, 232, 232, 1)",
  },
  inputFocused: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(255, 108, 0, 1)",
  },
  appButtonContainer: {
    width: "90%",
    height: 50,

    marginTop: 43,

    justifyContent: "center",
    textAlign: "center",

    borderRadius: 100,

    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,

    backgroundColor: "rgba(255, 108, 0, 1)",
  },
  appButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  haveAccountText: {
    color: "#1B4371",

    fontSize: 16,
    fontFamily: "Roboto",
  },
  formContainer: {
    width: "100%",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
