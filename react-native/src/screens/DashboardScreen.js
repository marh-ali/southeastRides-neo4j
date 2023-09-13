import React, { useEffect, useRef } from "react";
import { ScrollView, Text, Animated, View, Easing } from "react-native";
import { useAppContext } from "../AppContext";
import useUserProfile from "../hooks/useUserProfile";
import RideCard from "../components/RideCard";
import MapView from "react-native-maps";

function DashboardScreen({ navigation, userInfo }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { loading: profileLoading, error, user } = useUserProfile(userInfo);
  const { globalDisplayName, globalBio } = useAppContext();

  const rides = [
    {
      name: "The Iron Throne Tour",
      description:
        "Join Tyrion on a quest to seek the best pub in London that could rival the wines of Casterly Rock.",
      seats: 4,
      status: "UPCOMING",
      startTime: "2020-01-01T10:00:00",
      endTime: "2020-01-01T11:00:00",
      startLocation: {
        longitude: -0.127758,
        latitude: 51.507351,
      },
      endLocation: {
        latitude: 51.515418,
        longitude: -0.1419,
      },
      participantsConnection: {
        totalCount: 0,
      },
      createdByConnection: {
        edges: [],
      },
    },
  ];
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
      <View style={{ marginTop: 20 }}>
        {rides.map((ride, index) => (
          <RideCard key={index} ride={ride} />
        ))}
      </View>
    </ScrollView>
  );
}

export default DashboardScreen;
