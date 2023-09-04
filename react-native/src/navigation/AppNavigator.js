import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();

function AppNavigator({ signOutUser }) {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings">
        {(props) => <SettingsScreen {...props} signOutUser={signOutUser} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AppNavigator;
