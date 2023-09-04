// A dashboard screen to be exported to AppNavigator.js

import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

function DashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dashboard Screen!</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

export default DashboardScreen;
