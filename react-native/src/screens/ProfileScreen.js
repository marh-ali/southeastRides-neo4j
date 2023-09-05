import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAppContext } from "../AppContext";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_DISPLAY_NAME } from "../services/Mutations";
import useUserProfile from "../hooks/UseUserProfile";
import styles from "../styles/ProfileScreen.styles";
import formatDate from "../utils/DateUtils";
import Loading from "../components/Loading";
import Error from "../components/Error";
import ProfilePicture from "../components/ProfilePicture";

function ProfileScreen({ userInfo }) {
  const [newDisplayName, setNewDisplayName] = useState("");
  const { globalDisplayName, setGlobalDisplayName } = useAppContext(); // Use custom hook
  const { loading, error, user } = useUserProfile(userInfo);

  const [updateDisplayNameMutation] = useMutation(UPDATE_USER_DISPLAY_NAME, {
    onCompleted: (data) => {
      setGlobalDisplayName(data.updateUsers.users[0].displayName);
    },
  });

  const handleUpdateDisplayName = () => {
    updateDisplayNameMutation({
      variables: {
        where: { uid: userInfo?.uid },
        update: { displayName: newDisplayName },
      },
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <View style={styles.container}>
      <ProfilePicture uri={user?.photoURL} />
      <Text style={styles.displayName}>
        {globalDisplayName || user?.displayName}
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
        User since: {formatDate(user?.createdAt)}
      </Text>
    </View>
  );
}

export default ProfileScreen;
