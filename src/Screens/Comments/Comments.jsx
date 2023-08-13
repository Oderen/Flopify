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
import SendIcon from "../../../assets/send-icon.png";

import { addComment } from "../../redux/api-operations";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Firebase/config";

import { resetPostId } from "../../redux/postReducer";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "react-native";
import { Loader } from "../../Loader/Loader";

import { reset } from "../../redux/api-operations";

const Item = ({ message, photo, messageTime, imageTitle, user }) => {
  const currentUser = auth.currentUser.email;

  return (
    <TouchableWithoutFeedback style={{ width: "100%" }}>
      <View
        style={[
          styles.firstUserComment,
          user === currentUser && styles.secondUserComment,
        ]}
      >
        {photo ? (
          <Image
            source={{
              uri: photo,
            }}
            style={{ width: 28, height: 28, borderRadius: 50 }}
          />
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFDAB9",
              width: 28,
              height: 28,
              borderRadius: 50,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: 500,
                letterSpacing: 0.3,
              }}
            >
              {imageTitle.slice(0, 1)}
            </Text>
          </View>
        )}

        <View
          style={[
            styles.firstUserComment__box,
            user === currentUser && styles.secondUserComment__box,
          ]}
        >
          <Text
            style={{
              color: "#212121",

              fontSize: 13,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: 18,
              marginLeft: 5,
            }}
          >
            {message}
          </Text>
          <Text
            style={[
              styles.firstUserComment__messageTime,
              user === currentUser && styles.secondUserComment__messageTime,
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
  const dispatch = useDispatch();

  const [postData, setpostData] = useState({});
  const [commentText, setCommentText] = useState("");

  const postID = useSelector((state) => state.postID.postId);

  const isCommentSent = useSelector((state) => state.posts.isCommentSent);

  const userData = useSelector((state) => state.auth.user);

  const isLoading = useSelector((state) => state.posts.isLoading);
  const isUpdating = useSelector((state) => state.postID.isUpdating);

  const getPostData = async () => {
    try {
      const docRef = doc(db, "posts", postID);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const postData = docSnap.data();

        return postData;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error finding a document:", error.message);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const data = await getPostData();

      setpostData(data);
    } catch (error) {
      console.log("error: ", error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (postID !== "") {
      fetchData();
    }
  }, [postID, isCommentSent]);

  const sendComment = () => {
    if (commentText === "") {
      Alert.alert("Please enter something to send a comment");
    }
    const user = auth.currentUser;

    const options = {
      timeZone: "Europe/Kiev",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    const date = new Date().toLocaleDateString("uk-UA", options);
    const formattedDate = date.replace(/[р.]/g, "").replace(",", "|");

    const commentData = {
      id: uuidv4(),
      user: user.email,
      userName: user.displayName,
      message: commentText,
      photo: userData.photo,
      time: formattedDate,
    };
    dispatch(addComment({ commentData, postID }));
    setCommentText("");
  };

  const goBack = () => {
    dispatch(reset());
    navigation.navigate("Home");
  };

  return isLoading || isUpdating ? (
    <Loader />
  ) : (
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
        {postData.comments && postData.photo ? (
          <View style={styles.main}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: postData.photo }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
              />
            </View>
            <FlatList
              style={{ marginTop: 10, marginBottom: 5, width: "100%" }}
              data={postData.comments}
              renderItem={({ item }) => (
                <Item
                  key={item.id}
                  message={item.message}
                  photo={item.photo}
                  messageTime={item.time}
                  imageTitle={item.userName}
                  user={item.user}
                />
              )}
            />
          </View>
        ) : (
          <View>
            <Text>No required data</Text>
          </View>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.footer}>
            <TextInput
              placeholder="Коментувати..."
              placeholderTextColor="rgba(189, 189, 189, 1)"
              value={commentText}
              onChangeText={setCommentText}
              style={styles.input}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 24,
                width: 34,
                height: 34,
              }}
              onPress={sendComment}
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
    marginLeft: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 15,
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
