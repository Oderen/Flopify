import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen2 from "./PostsScreen2";
import CreatePostsScreen from "./CreatePostsScreen";
import Profile from "./Profile";

import { Ionicons } from "@expo/vector-icons";
// import { useEffect, useSelector } from "react";

const Tabs = createBottomTabNavigator();

const PostsScreen = ({ navigation }) => {
  // const isLogged = useSelector((state) => state.auth.isLogged);

  // useEffect(() => {
  //   if (isLogged) {
  //     navigation.navigate("Логін");
  //   }
  // });

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 83,
          borderTopColor: "rgba(189, 189, 189, 1)",
          borderTopWidth: 1,
          boxShadow: "0px -0.5px 0px 0px rgba(0, 0, 0, 0.30)",
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          let bgColor;

          if (route.name === "PostsScreen2") {
            iconName = "grid-outline";
            color = focused ? "white" : "rgba(33, 33, 33, 0.8)";
            bgColor = focused ? "rgba(255, 108, 0, 1)" : "transparent";
          } else if (route.name === "CreatePostsScreen") {
            iconName = "add-outline";

            color = focused ? "white" : "rgba(33, 33, 33, 0.8)";
            bgColor = focused ? "rgba(255, 108, 0, 1)" : "transparent";
          } else if (route.name === "Profile") {
            iconName = "person";
            color = focused ? "white" : "rgba(33, 33, 33, 0.8)";
            bgColor = focused ? "rgba(255, 108, 0, 1)" : "transparent";
          }
          return (
            <View
              style={{
                dispay: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                height: 40,
                borderRadius: 50,

                backgroundColor: bgColor,
              }}
            >
              <Ionicons name={iconName} size={24} color={color} />
            </View>
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tabs.Screen name="PostsScreen2" component={PostsScreen2} />
      <Tabs.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
};

export default PostsScreen;

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
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  main: {
    flex: 1,
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
    fontFamily: "Roboto",
    fontWeight: 700,
  },

  userInfo__email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
    fontFamily: "Roboto",
  },
});
