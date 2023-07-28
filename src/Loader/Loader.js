import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
export const Loader = () => {
  return (
    <AnimatedLoader
      visible
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}
    ></AnimatedLoader>
  );
};
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
