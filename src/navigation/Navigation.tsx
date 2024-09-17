import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Referral from "../screens/Referral";
import ReferFriends from "../screens/ReferFriends";
import TrackReferral from "../screens/TrackReferral";
import Home from "../screens/Home";
import { RootStackParamList } from "./types";
import ReferFriendFrom from "../screens/ReferFriendFrom";

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Referral">
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", headerShown: false }}
      /> */}
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
        name="ReferFriendForm"
        component={ReferFriendFrom}
        options={{
          title: "Refer a Friend",
          headerShown: false,
          presentation: "transparentModal",
          // animation: 'slide_from_bottom',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
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
