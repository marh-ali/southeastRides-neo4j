import React from "react";
import { View, Text } from "react-native";

function Error({ message }) {
  return (
    <View>
      <Text>Error: {message}</Text>
    </View>
  );
}

export default Error;
