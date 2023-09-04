import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const SignInScreen = ({ promptAsync }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In with Google</Text>
      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Image
          style={styles.buttonIcon}
          source={require("../../assets/google-icon.png")}
        />
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 5,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default SignInScreen;
