import React from "react";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import client from "./services/ApolloClient";
import { AppProvider } from "./AppContext";
import AppNavigator from "./navigation/AppNavigator";
import SignInScreen from "./screens/SignInScreen"; // Import SignInScreen here

const AppProviders = ({ children, userInfo, signOutUser, promptAsync }) => {
  return userInfo ? (
    <ApolloProvider client={client}>
      <AppProvider>
        <NavigationContainer>
          <AppNavigator signOutUser={signOutUser} userInfo={userInfo} />
          {children}
        </NavigationContainer>
      </AppProvider>
    </ApolloProvider>
  ) : (
    <SignInScreen promptAsync={promptAsync} />
  );
};

export default AppProviders;
