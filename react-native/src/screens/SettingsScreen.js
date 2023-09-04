import { Button } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SettingsScreen({ navigation, signOutUser }) {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button title={"Sign Out"} onPress={signOutUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
