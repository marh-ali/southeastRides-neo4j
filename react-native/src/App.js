import * as React from "react";
import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import client from "./services/ApolloClient";
import { ApolloProvider } from "@apollo/client";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import SignInScreen from "./screens/SignInScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import UserHandler from "./UserHandler";

WebBrowser.maybeCompleteAuthSession();

function App() {
  const [userInfo, setUserInfo] = React.useState(null); // Initialize to null
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const signOutUser = async () => {
    console.log("Attempting to sign out");
    try {
      await AsyncStorage.removeItem("@user");
      console.log("Removed user from AsyncStorage");
      await auth.signOut();
      console.log("Signed out from Firebase");
      setUserInfo(null);
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  const checkLocalUser = async () => {
    setLoading(true);
    console.log("Checking local user");
    try {
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;

      if (
        userData &&
        new Date().getTime() > userData.stsTokenManager.expirationTime
      ) {
        console.log("Token expired, removing user");
        await AsyncStorage.removeItem("@user");
        setUserInfo(null);
      } else {
        console.log("Setting user info");
        setUserInfo(userData);
      }
    } catch (error) {
      console.error("Error checking local user: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.log("Running checkLocalUser");
    checkLocalUser();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated via Firebase, updating AsyncStorage");
        setUserInfo(user);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      } else {
        console.log("User is not authenticated via Firebase");
        setUserInfo(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return userInfo ? (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppNavigator signOutUser={signOutUser} userInfo={userInfo} />
        {userInfo && <UserHandler userInfo={userInfo} />}
      </NavigationContainer>
    </ApolloProvider>
  ) : (
    <SignInScreen promptAsync={promptAsync} />
  );
}

export default App;
