import React, { useState, useEffect } from "react";

import {
  Text,
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

import LogoImage from "../../../assets/PhotoBg.png";
import PlusIcon from "../../../assets/add.png";

import CloseButton from "../../../assets/closeButton.png";
import ProfilePhoto from "../../../assets/ProfilePhoto.png";

import styles from "./RegistrationStyles";

import { registerUser, redirectingUser } from "../../redux/api-operations";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../Loader/Loader";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import * as ImagePicker from "expo-image-picker";

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const isRefreshing = useSelector((state) => state.auth.isRefreshing);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changeButton, setChangeButton] = useState(true);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const [input1Focused, setInput1Focused] = useState(false);
  const [input2Focused, setInput2Focused] = useState(false);
  const [input3Focused, setInput3Focused] = useState(false);

  const [image, setImage] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(redirectingUser(navigation));
      }
    });

    setChangeButton(true);
    setImage(null);

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

  const registerAccount = async () => {
    if (login === "") {
      return Alert.alert("Please write your login");
    }

    if (email === "") {
      return Alert.alert("Please write your email");
    }

    if (password.length <= 5) {
      return Alert.alert("Password must be 6 characterі long.");
    }

    const trimmedCredentials = {
      login: login.trim(),
      email: email.trim(),
      password: password.trim(),
      image,
    };

    dispatch(registerUser({ userCredentials: trimmedCredentials, navigation }));

    setLogin("");
    setEmail("");
    setPassword("");
    setImage(null);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleButton = async () => {
    try {
      await pickImage();
      setChangeButton(!changeButton);
    } catch (error) {
      console.log(error.message);
    }
  };

  const showPassword = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return isRefreshing ? (
    <Loader />
  ) : (
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
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 16,
                    }}
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
                  onPress={registerAccount}
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
