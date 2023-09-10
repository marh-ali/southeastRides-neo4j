import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../services/Queries";

function DashboardScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  const fetchUsers = () => {
    if (loading) {
      console.log("Loading...");
      return;
    }
    if (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
      return;
    }
    console.log("Users:", data.users);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dashboard Screen!</Text>
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />

      <Button title="Fetch Users" onPress={fetchUsers} />
    </View>
  );
}

export default DashboardScreen;
