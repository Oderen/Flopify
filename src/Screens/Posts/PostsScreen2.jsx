import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Pressable,
} from "react-native";

import MessageIcon from "../../../assets/message-circle.png";
import MapPin from "../../../assets/map-pin.png";

import LogOut from "../../../assets/log-out.png";

import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/api-operations";

import { useEffect } from "react";

import { addPostID } from "../../redux/postReducer";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../redux/api-operations";
import { Loader } from "../../Loader/Loader";
import { Ionicons } from "@expo/vector-icons";

const Item = ({ title, photo, location, navigation, id }) => {
  const dispatch = useDispatch();

  const goToComments = () => {
    dispatch(addPostID(id));
    navigation.navigate("Comments");
  };

  const goToMap = () => {
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
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
          marginBottom: 32,
        }}
      >
        <View style={{ width: "100%", height: 240 }}>
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
                  source={MessageIcon}
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
                  marginRight: 49,
                }}
              >
                0
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={goToMap}>
                <Image
                  source={MapPin}
                  style={{ width: 24, height: 24, marginRight: 4 }}
                />
              </TouchableOpacity>

              <Pressable onPress={goToMap}>
                <Text
                  style={{
                    color: "#1B4371",
                    fontSize: 16,
                    fontFamily: "Roboto",
                    textDecorationLine: "underline",
                  }}
                >
                  {location ? location : "No Location"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const PostsScreen2 = ({ navigation }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.items);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  // const isLoading = useSelector((state) => state.posts.isLoading);
  const userData = useSelector((state) => state.auth.user);

  const logOut = () => {
    dispatch(logOutUser(navigation));
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const refreshPosts = () => {
    dispatch(fetchPosts());
  };

  return isRefreshing ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperBar}>
        <Text style={styles.upperBar__text}>Публікації</Text>
        <TouchableOpacity
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            left: "90%",
          }}
          onPress={logOut}
        >
          <Image
            source={LogOut}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.userContainer}>
          <View style={styles.user}>
            {userData.photo ? (
              <Image
                source={{
                  uri: userData.photo,
                }}
                style={styles.userphotoContainer__icon}
              />
            ) : (
              <View
                style={[
                  styles.userphotoContainer__icon,
                  {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: userData.login ? "#FFDAB9" : "",
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 40,
                    color: "black",
                    fontWeight: 500,
                    letterSpacing: 0.3,
                  }}
                >
                  {userData.login ? userData.login.slice(0, 1) : ""}
                </Text>
              </View>
            )}

            <View style={styles.userInfo}>
              <Text style={styles.userInfo__name}>{userData.login}</Text>
              <Text style={styles.userInfo__email}>{userData.email}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={refreshPosts}>
            <Ionicons name={"refresh-outline"} size={24} color={"black"} />
          </TouchableOpacity>
        </View>
        {posts.length > 0 && (
          <FlatList
            style={{ marginTop: 15, marginBottom: 15 }}
            data={posts}
            renderItem={({ item }) => (
              <Item
                title={item.data.name}
                photo={item.data.photo}
                location={item.data.locationInput}
                id={item.id}
                navigation={navigation}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PostsScreen2;

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
  userContainer: {
    width: "100%",
    height: 60,
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  user: {
    width: 171,
    flexDirection: "row",
    alignItems: "center",
  },
  userphotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userphotoContainer__icon: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userInfo: {
    marginLeft: 8,
  },

  userInfo__name: {
    color: "#212121",
    fontSize: 16,

    fontWeight: 700,
  },

  userInfo__email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 14,
  },
});
