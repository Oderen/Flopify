import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Alert,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import LogoImage from "../../../assets/PhotoBg.png";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, redirectingUser } from "../../redux/api-operations";
import { Loader } from "../../Loader/Loader";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const isRefreshing = useSelector((state) => state.auth.isRefreshing);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const [input1Focused, setInput1Focused] = useState(false);
  const [input2Focused, setInput2Focused] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(redirectingUser({ navigation, user }));
      }
    });
  }, []);

  const onLogin = () => {
    if (email === "") {
      return Alert.alert("Please write your email");
    }

    if (password.length <= 5) {
      return Alert.alert("Password must be 6 characters long.");
    }

    const trimmedCredentials = {
      email: email.trim(),
      password: password.trim(),
    };

    dispatch(loginUser({ userCredentials: trimmedCredentials, navigation }));

    setEmail("");
    setPassword("");
  };

  const handleInput1Focus = () => {
    setInput1Focused(true);
    setInput2Focused(false);
  };

  const handleInput2Focus = () => {
    setInput1Focused(false);
    setInput2Focused(true);
  };

  const handleInput1Blur = () => {
    setInput1Focused(false);
  };

  const handleInput2Blur = () => {
    setInput2Focused(false);
  };

  const showPassword = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return isRefreshing ? (
    <Loader />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <ImageBackground
              source={LogoImage}
              resizeMode="cover"
              style={{ height: "100%", justifyContent: "flex-end" }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: "65%",
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginTop: 32,
                    marginBottom: 18,
                    fontFamily: "Roboto",
                    fontSize: 30,
                    color: "#212121",
                    fontWeight: 500,
                    letterSpacing: 0.3,
                  }}
                >
                  Увійти
                </Text>

                <View style={styles.formContainer}>
                  <TextInput
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={handleInput1Focus}
                    onBlur={handleInput1Blur}
                    style={[
                      styles.input,
                      input1Focused && styles.inputFocused,
                      { marginTop: 16 },
                    ]}
                  />
                  <TextInput
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isPasswordVisible ? false : true}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={handleInput2Focus}
                    onBlur={handleInput2Blur}
                    style={[
                      styles.input,
                      input2Focused && styles.inputFocused,
                      { marginTop: 16, textAlign: "left" },
                    ]}
                  />
                  <Pressable
                    style={{ position: "absolute", left: "76%", top: "43%" }}
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
                    onPress={onLogin}
                  >
                    <Text style={styles.appButtonText}>Увійти</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginTop: 16,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.haveAccountText}>Немає акаунту?</Text>
                  <Pressable
                    style={{}}
                    onPress={() => {
                      navigation.navigate("Реєстрація");
                    }}
                  >
                    <Text
                      style={{
                        color: "#1B4371",

                        fontSize: 16,
                        fontFamily: "Roboto",
                      }}
                    >
                      Зареєструватися
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
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

    backgroundColor: "rgba(246, 246, 246, 1)",
    borderColor: "rgba(232, 232, 232, 1)",
    borderRadius: 10,
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
    marginRight: 5,
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

export default LoginScreen;
