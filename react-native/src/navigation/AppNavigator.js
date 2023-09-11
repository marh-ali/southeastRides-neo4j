import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Platform } from "react-native";
import { signOut } from "firebase/auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ userInfo, signOutUser }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          const platform = Platform.OS === "ios" ? "ios" : "md";

          if (route.name === "Dashboard") {
            iconName = `${platform}-home`;
          } else if (route.name === "Settings") {
            iconName = `${platform}-settings`;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard">
        {(props) => <DashboardScreen {...props} userInfo={userInfo} />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {(props) => (
          <SettingsScreen
            {...props}
            userInfo={userInfo}
            signOutUser={signOutUser}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function AppNavigator({ signOutUser, userInfo }) {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        children={(props) => (
          <TabNavigator
            {...props}
            userInfo={userInfo}
            signOutUser={signOutUser}
          />
        )}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
