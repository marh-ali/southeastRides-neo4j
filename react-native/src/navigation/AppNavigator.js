import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import DashboardScreen from "../screens/DashboardScreen";
import GoogleSignInScreen from "../screens/SignInScreen";

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Sign In"
        onPress={() => navigation.push("GoogleSignIn")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const Stack = createNativeStackNavigator();

function AppNavigator({ promptAsync }) {
  return (
    <Stack.Navigator initialRouteName="GoogleSignIn">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen
        name="GoogleSignIn"
        children={() => <GoogleSignInScreen promptAsync={promptAsync} />}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
