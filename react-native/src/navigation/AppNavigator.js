import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

function AppNavigator({ signOutUser, userInfo }) {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Settings">
        {(props) => <SettingsScreen {...props} signOutUser={signOutUser} />}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {(props) => <ProfileScreen {...props} userInfo={userInfo} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AppNavigator;
