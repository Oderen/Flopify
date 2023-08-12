import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import ArrowLeft from "../../../assets/arrow-left.png";

import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPostId } from "../../redux/postReducer";
import { getPostData } from "../../redux/api-operations";

import { Loader } from "../../Loader/Loader";

const Map = ({ navigation }) => {
  const dispatch = useDispatch();
  const locCoords = useSelector((state) => state.posts.locCoords);
  const postID = useSelector((state) => state.postID.postId);

  const isLoading = useSelector((state) => state.posts.isLoading);

  const goBack = () => {
    dispatch(resetPostId());
    navigation.navigate("Home");
  };

  useEffect(() => {
    dispatch(getPostData(postID));
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header__text}>Локація</Text>
        <TouchableOpacity
          onPress={goBack}
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            top: 58,
            left: 20,
          }}
        >
          <Image
            source={ArrowLeft}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </TouchableOpacity>
      </View>
      {locCoords.latitude && locCoords.longitude ? (
        <MapView
          style={styles.mapStyle}
          region={{
            ...locCoords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          <Marker
            title="The place where picture was taken"
            coordinate={locCoords}
          />
        </MapView>
      ) : (
        <Text>There is no location yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: "100%",

    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
  },
  header__text: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",

    color: "rgba(33, 33, 33, 1)",
    textAlign: "center",
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
