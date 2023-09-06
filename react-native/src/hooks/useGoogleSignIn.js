import { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useGoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      console.log("Google authentication successful.");
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          console.log("Successfully signed in with Firebase.");
        })
        .catch((error) => {
          console.error("Error during Firebase authentication:", error);
        });
    }
  }, [response]);

  const signOutUser = async () => {
    console.log("Attempting to sign out.");
    try {
      await AsyncStorage.removeItem("@user");
      console.log("Removed user from AsyncStorage.");
      await firebaseSignOut(auth);
      console.log("Successfully signed out from Firebase.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const subscribeAuthChange = (syncUserInfo) => {
    console.log("Subscribing to Firebase auth changes.");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated via Firebase, updating local state.");
      } else {
        console.log("User is not authenticated via Firebase.");
      }
      syncUserInfo(user);
    });
    return () => {
      console.log("Unsubscribing from Firebase auth changes.");
      unsubscribe();
    };
  };

  return { promptAsync, signOutUser, subscribeAuthChange };
};

export default useGoogleSignIn;
