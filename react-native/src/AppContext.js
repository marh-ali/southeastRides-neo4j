import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [globalDisplayName, setGlobalDisplayName] = useState("");
  const [globalBio, setGlobalBio] = useState("");

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
