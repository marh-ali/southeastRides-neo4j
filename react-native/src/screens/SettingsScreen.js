import { Button } from "react-native-elements";
import { auth } from "../firebaseConfig";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function SettingsScreen(navigation) {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button title={"Sign Out"} onPress={async () => await signOut(auth)} />
    </View>
  );
}

// Create beautiful UI style for SettingsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
