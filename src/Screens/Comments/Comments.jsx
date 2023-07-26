import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";

import ArrowIcon from "../../../assets/arrow-left.png";
import SunSetImage from "../../../assets/sun-set.png";
import SendIcon from "../../../assets/send-icon.png";
import AvatarIcon from "../../../assets/avatar.png";
import ProfilePhoto from "../../../assets/ProfilePhoto.png";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    message:
      "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    photo: AvatarIcon,
    messageTime: "09 червня, 2020 | 08:40",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    message:
      "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    photo: ProfilePhoto,
    messageTime: "09 червня, 2020 | 09:14",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    message: "Thank you! That was very helpful!",
    photo: AvatarIcon,
    messageTime: "09 червня, 2020 | 09:20",
  },
];

const Item = ({ message, photo, messageTime }) => {
  return (
    <TouchableWithoutFeedback style={{ width: "100%" }}>
      <View
        style={[
          styles.firstUserComment,
          photo === ProfilePhoto && styles.secondUserComment,
        ]}
      >
        <Image
          source={photo}
          style={{ width: 28, height: 28, borderRadius: 50 }}
        />

        <View
          style={[
            styles.firstUserComment__box,
            photo === ProfilePhoto && styles.secondUserComment__box,
          ]}
        >
          <Text
            style={{
              color: "#212121",

              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: 18,
            }}
          >
            {message}
          </Text>
          <Text
            style={[
              styles.firstUserComment__messageTime,
              photo === ProfilePhoto && styles.secondUserComment__messageTime,
            ]}
          >
            {messageTime}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Comments = ({ navigation }) => {
  const [comment, setComment] = useState("");
  const goBack = () => {
    navigation.navigate("Home");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.header__text}>Коментарі</Text>
          <TouchableOpacity
            onPress={goBack}
            style={{
              width: 24,
              height: 24,
              position: "absolute",
              left: 16,
            }}
          >
            <Image
              source={ArrowIcon}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.imageContainer}>
            <Image
              source={SunSetImage}
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
            />
          </View>
          <FlatList
            style={{ marginTop: 32, marginBottom: 15, width: "100%" }}
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Item
                key={item.id}
                id={index}
                message={item.message}
                photo={item.photo}
                messageTime={item.messageTime}
              />
            )}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.footer}>
            <TextInput
              placeholder="Коментувати..."
              placeholderTextColor="rgba(189, 189, 189, 1)"
              value={comment}
              onChangeText={setComment}
              style={styles.input}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 24,
                width: 34,
                height: 34,
              }}
            >
              <Image
                source={SendIcon}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Comments;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 83,
    width: "100%",

    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
  },
  header__text: {
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

    backgroundColor: "transparent",
  },
  imageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  firstUserComment: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 24,
  },
  firstUserComment__box: {
    display: "flex",
    justifyContent: "center",

    padding: 16,

    width: "90%",
    height: 103,
    marginLeft: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
  },
  firstUserComment__messageTime: {
    marginTop: 8,
    marginLeft: "auto",

    color: "#BDBDBD",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 18,
  },
  secondUserComment: {
    flexDirection: "row-reverse",
  },
  secondUserComment__box: {
    marginLeft: 0,
    marginRight: 16,
  },
  secondUserComment__messageTime: {
    marginLeft: 0,
    marginRight: "auto",
  },
  footer: {
    width: "100%",
    height: 66,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "tranparent",
  },
  input: {
    position: "relative",
    width: "93%",
    height: 50,

    padding: 16,
    marginTop: "auto",
    marginBottom: "auto",

    borderRadius: 50,
    backgroundColor: "rgba(246, 246, 246, 1)",
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
  },
});
