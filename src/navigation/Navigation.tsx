import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Referral from "../screens/Referral";
import ReferFriends from "../screens/ReferFriends";
import TrackReferral from "../screens/TrackReferral";
import Home from "../screens/Home";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="Referral"
        component={Referral}
        options={{ title: "Referral", headerShown: false }}
      />
      <Stack.Screen
        name="ReferFriend"
        component={ReferFriends}
        options={{ title: "Refer a Friend", headerShown: false }}
      />
      <Stack.Screen
        name="TrackReferral"
        component={TrackReferral}
        options={{ title: "Track Referral", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
