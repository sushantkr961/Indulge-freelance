import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import BackButton from "../../Components/BackButton";
import ReferButton from "../../Components/ReferButton";
import { ReferralStyles as styles } from "./style";

type ReferralScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Referral"
>;

type Props = {
  navigation: ReferralScreenNavigationProp;
};

const { width, height } = Dimensions.get("window");

const Referral = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#626059"
        barStyle="dark-content"
        translucent={true}
      />
      <BackButton />

      <ImageBackground
        source={require("../../../assets/images/referralimage.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      />

      <View style={styles.bottomContainer}>
        <View style={styles.textBox}>
          <Text style={styles.title}>Refer and Earn</Text>
          <Text style={styles.description}>
            If you haven't registered for bidding with us before, we recommend
            initiating the registration process at least four business days
            before the auction to ensure a smooth experience.
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <ReferButton
            onPress={() => navigation.navigate("ReferFriend")}
            title="Invite your Friends"
            imageSource={require("../../../assets/images/money-wings.png")}
          />
          <ReferButton
            onPress={() => navigation.navigate("TrackReferral")}
            title="Track Referral"
            imageSource={require("../../../assets/images/map-location.png")}
          />
        </View>
        <ReferButton
          onPress={() => {}}
          title="WhatsApp"
          imageSource={require("../../../assets/images/whatsAppIcon.png")}
          backgroundColor={"#32D851"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Referral;
