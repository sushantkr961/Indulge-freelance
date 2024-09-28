import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Referral from "../Screens/Referral/Referral";
import ReferFriends from "../Screens/Referral/ReferFriends";
import TrackReferral from "../Screens/Referral/TrackReferral";
import { RootStackParamList } from "./types";
import ReferFriendFrom from "../Screens/Referral/ReferFriendFrom";

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Referral">
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
