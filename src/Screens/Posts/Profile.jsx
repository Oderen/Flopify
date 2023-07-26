import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import React, { useState } from "react";

import LogoImage from "../../../assets/PhotoBg.png";
import PlusIcon from "../../../assets/add.png";

import CloseButton from "../../../assets/closeButton.png";
import ProfilePhoto from "../../../assets/ProfilePhoto.png";

import LogOut from "../../../assets/log-out.png";

import MessageIcon from "../../../assets/message-circle.png";
import MapPin from "../../../assets/map-pin.png";
import thumbsUp from "../../../assets/thumbs-up.png";

import ForestImage from "../../../assets/Rectangle23.png";
import sunSet from "../../../assets/sun-set.png";
import home from "../../../assets/Home.png";

const Item = ({ title, photo, location, navigation }) => {
  const goToComments = () => {
    navigation.navigate("Comments");
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
                  }}
                >
                  0
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
              <Image
                source={MapPin}
                style={{ width: 24, height: 24, marginRight: 4 }}
              />
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

const Profile = ({ navigation }) => {
  const [changeButton, setChangeButton] = useState(true);

  const toggleButton = () => {
    setChangeButton(!changeButton);
  };

  const profileLogOut = () => {
    navigation.navigate("Логін");
  };
  return (
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.logOutButton} onPress={profileLogOut}>
            <Image source={LogOut} width={24} height={24} />
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
            {changeButton && (
              <Image
                source={ProfilePhoto}
                style={{ width: "100%", height: "100%" }}
              />
            )}

            <TouchableOpacity
              onPress={toggleButton}
              style={{
                position: "relative",
                top: !changeButton ? "67%" : "-33%",

                left: "90%",
                height: 25,
                width: 25,
                flexShrink: 0,
              }}
            >
              <Image
                source={!changeButton ? PlusIcon : CloseButton}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 30,
              color: "#212121",
              fontWeight: 500,
              letterSpacing: 0.3,
              marginTop: 80,
            }}
          >
            Natali Romanova
          </Text>
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
