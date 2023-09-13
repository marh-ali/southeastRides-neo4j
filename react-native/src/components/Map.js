import React from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const Map = ({ startLocation, endLocation }) => {
  const GOOGLE_MAPS_APIKEY =
    process.env.EXPO_PUBLIC_ANDROID_GOOGLE_MAPS_API_KEY;
  return (
    <MapView
      style={{ height: 300, margin: 8 }}
      initialRegion={{
        latitude: startLocation.latitude,
        longitude: startLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <MapViewDirections
        origin={startLocation}
        destination={endLocation}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="hotpink"
        mode="BICYCLING"
      />
    </MapView>
  );
};

export default Map;
