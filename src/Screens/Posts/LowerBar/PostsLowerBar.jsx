import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import User from "../../../../assets/user.png";
import NewButton from "../../../../assets/new.png";
import Grid from "../../../../assets/grid.png";

const PostsLowerBar = () => {
  return (
    <View style={styles.lowerBar}>
      <TouchableOpacity
        style={{
          width: 24,
          height: 24,
        }}
      >
        <Image
          source={Grid}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 70,
          height: 40,
        }}
      >
        <Image
          source={NewButton}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: 24,
          height: 24,
        }}
      >
        <Image
          source={User}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  lowerBar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 39,
    alignItems: "center",

    height: 71,

    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.30)",
  },
});

export default PostsLowerBar;
