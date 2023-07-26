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

import ProfilePhoto from "../../../assets/ProfilePhoto.png";
import LogOut from "../../../assets/log-out.png";

import ForestImage from "../../../assets/Rectangle23.png";
import sunSet from "../../../assets/sun-set.png";
import home from "../../../assets/Home.png";

import { useDispatch } from "react-redux";
import { logOutUser } from "../../redux/api-operations";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Ліс",
    photo: ForestImage,
    location: "Ukraine",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Захід на Чорному морі",
    photo: sunSet,
    location: "Ukraine",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Старий будиночок у Венеції",
    photo: home,
    location: "Italy",
  },
];

const Item = ({ title, photo, location, navigation }) => {
  const goToComments = () => {
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
          marginTop: 32,
          marginBottom: 32,
        }}
      >
        <View style={{ width: "100%", height: 240 }}>
          <Image
            source={photo}
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

  const logOut = () => {
    dispatch(logOutUser(navigation));
  };

  return (
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
        <View style={styles.user}>
          <TouchableOpacity style={styles.userphotoContainer}>
            <Image
              source={ProfilePhoto}
              style={styles.userphotoContainer__icon}
            />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userInfo__name}>Natali Romanova</Text>
            <Text style={styles.userInfo__email}>email@example.com</Text>
          </View>
        </View>
        <FlatList
          style={{ marginTop: 32, marginBottom: 43 }}
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              photo={item.photo}
              location={item.location}
              navigation={navigation}
            />
          )}
        />
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
    fontFamily: "Roboto",
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
    height: 60,
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
