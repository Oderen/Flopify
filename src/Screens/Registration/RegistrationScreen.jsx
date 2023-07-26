import React, { useState, useEffect } from "react";

import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config";

import LogoImage from "../../../assets/PhotoBg.png";
import PlusIcon from "../../../assets/add.png";

import CloseButton from "../../../assets/closeButton.png";
import ProfilePhoto from "../../../assets/ProfilePhoto.png";

const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changeButton, setChangeButton] = useState(true);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const [input1Focused, setInput1Focused] = useState(false);
  const [input2Focused, setInput2Focused] = useState(false);
  const [input3Focused, setInput3Focused] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Add data
  const writeDataToFirestore = async (userInfo) => {
    console.log("userInfo", userInfo);
    try {
      const docRef = await addDoc(collection(db, "users"), userInfo);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const onRegister = () => {
    if (login === "") {
      return Alert.alert("Please write your login");
    }

    if (email === "") {
      return Alert.alert("Please write your email");
    }

    if (password === "") {
      return Alert.alert("Please write longer password");
    }

    Alert.alert(
      "Credentials",
      `Name: ${login}, Email: ${email}, Password: ${password}`
    );
    console.log(
      "Credentials",
      `Name: ${login}, Email: ${email}, Password: ${password}`
    );
    setLogin("");
    setEmail("");
    setPassword("");
    navigation.navigate("Home");
  };

  const registerDB = async () => {
    try {
      if (login === "") {
        return Alert.alert("Please write your login");
      }

      if (email === "") {
        return Alert.alert("Please write your email");
      }

      if (password === "") {
        return Alert.alert("Please write longer password");
      }

      Alert.alert(
        "Credentials",
        `Name: ${login}, Email: ${email}, Password: ${password}`
      );
      console.log(
        "Credentials",
        `Name: ${login}, Email: ${email}, Password: ${password}`
      );
      // register
      await createUserWithEmailAndPassword(auth, email, password);
      // add data
      const userInfo = {
        email,
        password,
      };
      await writeDataToFirestore(userInfo);
    } catch (error) {
      throw error;
    }
  };

  const onKeyboardDidShow = () => {
    setIsKeyboardActive(true);
  };

  const onKeyboardDidHide = () => {
    setIsKeyboardActive(false);
  };

  const handleInput1Focus = () => {
    setInput1Focused(true);
    setInput2Focused(false);
    setInput3Focused(false);
  };

  const handleInput2Focus = () => {
    setInput1Focused(false);
    setInput2Focused(true);
    setInput3Focused(false);
  };

  const handleInput3Focus = () => {
    setInput1Focused(false);
    setInput2Focused(false);
    setInput3Focused(true);
  };

  const handleInput1Blur = () => {
    setInput1Focused(false);
  };

  const handleInput2Blur = () => {
    setInput2Focused(false);
  };

  const handleInput3Blur = () => {
    setInput3Focused(false);
  };

  const toggleButton = () => {
    return setChangeButton(!changeButton);
  };

  const showPassword = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={LogoImage}
            resizeMode="cover"
            style={{ height: "100%", justifyContent: "flex-end" }}
          >
            <View
              style={{
                backgroundColor: "white",
                height: isKeyboardActive ? "80%" : "65%",

                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: isKeyboardActive ? "-18%" : "-15%",
                  alignSelf: "center",
                  width: 120,
                  height: 120,
                  borderRadius: 16,
                  backgroundColor: "#F6F6F6",
                }}
              >
                {!changeButton && (
                  <Image
                    source={ProfilePhoto}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
                <TouchableOpacity
                  onPress={toggleButton}
                  style={{
                    position: "relative",
                    top: changeButton ? "67%" : "-33%",

                    left: "90%",
                    height: 25,
                    width: 25,
                    flexShrink: 0,
                  }}
                >
                  <Image
                    source={changeButton ? PlusIcon : CloseButton}
                    style={{ width: "100%", height: "100%" }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginTop: 20,
                  fontFamily: "Roboto",
                  fontSize: 30,
                  color: "#212121",
                  fontWeight: 500,
                  letterSpacing: 0.3,
                }}
              >
                Реєстрація
              </Text>
              <View style={styles.formContainer}>
                <TextInput
                  placeholder="Логін"
                  value={login}
                  onChangeText={setLogin}
                  onFocus={handleInput1Focus}
                  onBlur={handleInput1Blur}
                  placeholderTextColor="#BDBDBD"
                  style={[styles.input, input1Focused && styles.inputFocused]}
                />
                <TextInput
                  placeholder="Адреса електронної пошти"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  onFocus={handleInput2Focus}
                  onBlur={handleInput2Blur}
                  placeholderTextColor="#BDBDBD"
                  style={[
                    styles.input,
                    input2Focused && styles.inputFocused,
                    { marginTop: 16 },
                  ]}
                />
                <TextInput
                  placeholder="Пароль"
                  value={password}
                  secureTextEntry={isPasswordVisible ? false : true}
                  onChangeText={setPassword}
                  onFocus={handleInput3Focus}
                  onBlur={handleInput3Blur}
                  placeholderTextColor="#BDBDBD"
                  style={[
                    styles.input,
                    input3Focused && styles.inputFocused,
                    {
                      marginTop: 16,
                    },
                  ]}
                />

                <Pressable
                  style={{ position: "absolute", left: "76%", top: "53.5%" }}
                  onPress={showPassword}
                >
                  <Text
                    style={{
                      color: "#1B4371",
                      fontSize: 16,
                      fontFamily: "Roboto",
                    }}
                  >
                    {isPasswordVisible ? "Сховати" : "Показати"}
                  </Text>
                </Pressable>

                <TouchableOpacity
                  style={styles.appButtonContainer}
                  onPress={registerDB}
                >
                  <Text style={styles.appButtonText}>Зареєструватися</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 16,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={([styles.haveAccountText], { marginRight: 4 })}>
                  Вже є акаунт?
                </Text>
                <Pressable
                  style={{}}
                  onPress={() => {
                    navigation.navigate("Логін");
                  }}
                >
                  <Text
                    style={{
                      color: "#1B4371",

                      fontSize: 16,
                      fontFamily: "Roboto",
                    }}
                  >
                    Увійти
                  </Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
