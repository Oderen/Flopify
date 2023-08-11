import "react-native-gesture-handler";

import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./src/Screens/Registration/RegistrationScreen";
import LoginScreen from "./src/Screens/Login/LoginScreen";
import PostsScreen from "./src/Screens/Posts/PostsScreen";
import Comments from "./src/Screens/Comments/Comments";
import Map from "./src/Screens/Map/Map";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux/store";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    console.log("Font doesnt' load");
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName={"Логін"}>
            <MainStack.Screen
              name="Реєстрація"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Логін"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={PostsScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Comments"
              component={Comments}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Map"
              component={Map}
              options={{ headerShown: false }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
