import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import DashboardScreen from "../screens/DashboardScreen";
import SignInScreen from "../screens/SignInScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

function AppNavigator({ promptAsync }) {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      {/* <Stack.Screen
        name="GoogleSignIn"
        children={() => <GoogleSignInScreen promptAsync={promptAsync} />}
      /> */}
    </Stack.Navigator>
  );
}

export default AppNavigator;
