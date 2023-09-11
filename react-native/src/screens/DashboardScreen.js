import React, { useEffect, useRef } from "react";
import { ScrollView, Text, Animated, View, Easing } from "react-native";
import { useAppContext } from "../AppContext";
import useUserProfile from "../hooks/useUserProfile";

function DashboardScreen({ navigation, userInfo }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { loading: profileLoading, error, user } = useUserProfile(userInfo);
  const { globalDisplayName, globalBio } = useAppContext();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 1,
        friction: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, userInfo]);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Welcome back, {globalDisplayName}!
        </Text>
        {globalBio && <Text style={{ fontSize: 18 }}>{globalBio}</Text>}
      </Animated.View>
    </ScrollView>
  );
}

export default DashboardScreen;
