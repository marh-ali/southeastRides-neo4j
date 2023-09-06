import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalUserCheck = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkLocalUser = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      if (
        userData &&
        new Date().getTime() > userData.stsTokenManager.expirationTime
      ) {
        await AsyncStorage.removeItem("@user");
        setUserInfo(null);
      } else {
        setUserInfo(userData);
      }
    } catch (error) {
      console.error("Error checking local user: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const syncUserInfo = async (user) => {
    if (user) {
      setUserInfo(user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem("@user");
      setUserInfo(null);
    }
  };

  useEffect(() => {
    checkLocalUser();
  }, []);

  return [userInfo, loading, syncUserInfo];
};

export default useLocalUserCheck;
