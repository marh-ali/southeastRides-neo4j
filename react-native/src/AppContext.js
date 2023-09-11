import React, { createContext, useState, useContext, useEffect } from "react";
import useUserProfile from "./hooks/useUserProfile";

const AppContext = createContext();

export function AppProvider({ children, userInfo }) {
  const [globalDisplayName, setGlobalDisplayName] = useState("");
  const [globalBio, setGlobalBio] = useState("");

  const { loading, error, user } = useUserProfile(userInfo);

  useEffect(() => {
    if (user) {
      setGlobalDisplayName(user.displayName);
      setGlobalBio(user.bio);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        globalDisplayName,
        setGlobalDisplayName,
        globalBio,
        setGlobalBio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
