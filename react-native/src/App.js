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

WebBrowser.maybeCompleteAuthSession();

function App() {
  const [userInfo, setUserInfo] = React.useState();
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
    try {
      await AsyncStorage.removeItem("@user");
      await auth.signOut();
      setUserInfo(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const checkLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      console.log("user data", userData);
      if (new Date().getTime() > userData.stsTokenManager.expirationTime)
        console.log("token expired");
      setUserInfo(userData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // create user in db, or locally in this case (set it up w/ apollo client)
  React.useEffect(() => {
    checkLocalUser();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      } else {
        console.log("User is not authenticated");
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  return userInfo ? (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppNavigator signOutUser={signOutUser} />
      </NavigationContainer>
    </ApolloProvider>
  ) : (
    <SignInScreen promptAsync={promptAsync} />
  );
}

export default App;
