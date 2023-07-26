import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import TrashIcon from "../../../../assets/trash-2.png";

const CreatePostLowerBar = () => {
  return (
    <View style={styles.lowerBar}>
      <TouchableOpacity style={styles.button}>
        <Image
          source={TrashIcon}
          style={{
            width: 24,
            height: 24,
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
  },
  button: {
    width: 70,
    height: 40,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F6F6F6",

    borderRadius: 20,
  },
});

export default CreatePostLowerBar;
