import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomSnackbar from "../components/Snackbar";
import styles from "../styles/SettingsScreen.styles";
import { useAppContext } from "../AppContext";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER_DISPLAY_NAME,
  UPDATE_USER_BIO,
} from "../services/Mutations";
import useUserProfile from "../hooks/UseUserProfile";
import formatDate from "../utils/DateUtils";
import Loading from "../components/Loading";
import Error from "../components/Error";
import ProfilePicture from "../components/ProfilePicture";

function SettingsScreen({ userInfo, signOutUser }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false); // New state for bio editing

  const [newDisplayName, setNewDisplayName] = useState("");
  const [newBio, setNewBio] = useState(""); // New state variable for bio
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const { globalDisplayName, setGlobalDisplayName, globalBio, setGlobalBio } =
    useAppContext(); // Include bio
  const { loading: profileLoading, error, user } = useUserProfile(userInfo);

  // New useEffect to update newDisplayName and newBio
  useEffect(() => {
    setNewDisplayName(globalDisplayName || user?.displayName || "");
    setNewBio(globalBio || user?.bio || "");
  }, [globalDisplayName, globalBio, user]);

  const [updateDisplayNameMutation] = useMutation(UPDATE_USER_DISPLAY_NAME, {
    onCompleted: (data) => {
      setGlobalDisplayName(data.updateUsers.users[0].displayName);
      setIsEditingName(false);
      setSnackbar({
        open: true,
        message: "Display name updated successfully",
        severity: "success",
      });
    },
  });

  const [updateBioMutation] = useMutation(UPDATE_USER_BIO, {
    onCompleted: (data) => {
      setGlobalBio(data.updateUsers.users[0].bio);
      setIsEditingBio(false);
      setSnackbar({
        open: true,
        message: "Bio updated successfully",
        severity: "success",
      });
    },
  });

  const handleUpdateDisplayName = () => {
    if (newDisplayName.trim() === "") {
      setSnackbar({
        open: true,
        message: "Please enter a new display name",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    updateDisplayNameMutation({
      variables: {
        where: { uid: userInfo?.uid },
        update: { displayName: newDisplayName },
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleUpdateBio = () => {
    if (newBio.trim() === "") {
      setSnackbar({
        open: true,
        message: "Please enter a new bio",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    updateBioMutation({
      variables: {
        where: { uid: userInfo?.uid },
        update: { bio: newBio },
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  if (profileLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <View style={styles.container}>
      <ProfilePicture uri={user?.photoURL} />
      <View style={styles.nameWrapper}>
        {isEditingName ? (
          <>
            <TextInput
              value={newDisplayName}
              onChangeText={setNewDisplayName}
              style={styles.displayNameInput}
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button title="Save" onPress={handleUpdateDisplayName} />
            )}
          </>
        ) : (
          <>
            <Text style={styles.displayName}>
              {globalDisplayName || user?.displayName}
            </Text>
            <TouchableOpacity onPress={() => setIsEditingName(true)}>
              <Text style={styles.editIcon}>Edit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.phoneNumber}>{user?.phoneNumber}</Text>
      <View style={styles.bioWrapper}>
        {isEditingBio ? (
          <>
            <TextInput
              value={newBio}
              onChangeText={setNewBio}
              style={styles.bioInput}
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button title="Save" onPress={handleUpdateBio} />
            )}
          </>
        ) : (
          <>
            <Text style={styles.bio}>
              {globalBio || user?.bio || "Enter your bio..."}
            </Text>
            <TouchableOpacity onPress={() => setIsEditingBio(true)}>
              <Text style={styles.editIcon}>Edit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={styles.createdAt}>
        User since: {formatDate(user?.createdAt)}
      </Text>

      <Button
        style={styles.signOutButton}
        title="Sign Out"
        onPress={signOutUser}
      />
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </View>
  );
}

export default SettingsScreen;
