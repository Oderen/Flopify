import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import ArrowLeft from "../../../assets/arrow-left.png";

import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  const logOut = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    (async () => {
      let locationCoords = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: locationCoords.coords.latitude,
        longitude: locationCoords.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header__text}>Локація</Text>
        <TouchableOpacity
          onPress={logOut}
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
      {location ? (
        <MapView
          style={styles.mapStyle}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {location && (
            <Marker
              title="I am here"
              coordinate={location}
              description="Hello"
            />
          )}
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
