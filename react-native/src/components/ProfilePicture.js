import React from "react";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

function ProfilePicture({ uri }) {
  return <Image source={{ uri }} style={styles.image} />;
}

export default ProfilePicture;
