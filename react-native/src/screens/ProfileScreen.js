// create tempalte profile screen
import React from "react";
import { View, Text } from "react-native";

function ProfileScreen({ userInfo }) {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
    </View>
  );
}

export default ProfileScreen;
