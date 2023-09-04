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

WebBrowser.maybeCompleteAuthSession();

function App() {
  const [userInfo, setUserInfo] = React.useState();
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

  // create user in db, or locally in this case (set it up w/ apollo client)
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log("no user");
      }
    });
    return () => unsubscribe();
  }, []);

  return userInfo ? (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ApolloProvider>
  ) : (
    <SignInScreen promptAsync={promptAsync} />
  );
}

export default App;
