import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_BY_ID } from "../services/Queries";
import { UPDATE_USER_DISPLAY_NAME } from "../services/Mutations";
import { useAppContext } from "../AppContext"; // Import the custom hook

function ProfileScreen({ userInfo }) {
  const [newDisplayName, setNewDisplayName] = useState("");
  const { globalDisplayName, setGlobalDisplayName } = useAppContext(); // Use custom hook

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { where: { uid: userInfo?.uid } },
  });

  const [updateDisplayName] = useMutation(UPDATE_USER_DISPLAY_NAME, {
    onCompleted: (data) => {
      setGlobalDisplayName(data.updateUsers.users[0].displayName); // Update global state
    },
  });

  const handleUpdateDisplayName = () => {
    updateDisplayName({
      variables: {
        where: { uid: userInfo?.uid },
        update: { displayName: newDisplayName },
      },
    });
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data?.users[0];

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.photoURL }} style={styles.profileImage} />
      <Text style={styles.displayName}>
        {globalDisplayName || user?.displayName}{" "}
        {/* Use global state if available */}
      </Text>
      <TextInput
        placeholder="New display name"
        value={newDisplayName}
        onChangeText={setNewDisplayName}
      />
      <Button title="Update Display Name" onPress={handleUpdateDisplayName} />
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.phoneNumber}>{user?.phoneNumber}</Text>
      <Text style={styles.bio}>{user?.bio}</Text>
      <Text style={styles.createdAt}>
        User since: {new Date(user?.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  createdAt: {
    fontSize: 14,
    color: "grey",
  },
});

export default ProfileScreen;
