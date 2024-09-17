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
import { RootStackParamList } from "../navigation/types";
import BackButton from "../components/BackButton";
import ReferButton from "../components/ReferButton";

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
        source={require("../../assets/images/referralimage.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      ></ImageBackground>

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
            imageSource={require("../../assets/images/money-wings.png")}
          />
          <ReferButton
            onPress={() => navigation.navigate("TrackReferral")}
            title="Track Referral"
            imageSource={require("../../assets/images/map-location.png")}
          />
        </View>
        <ReferButton
          onPress={() => {}}
          title="WhatsApp"
          imageSource={require("../../assets/images/whatsAppIcon.png")}
          backgroundColor={"#32D851"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Referral;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F15",
  },
  imageBackground: {
    flex: 0.5,
  },
  bottomContainer: {
    flex: 0.5,
    backgroundColor: "#0F0F15",
    padding: width * 0.05,
    marginTop: -10,
  },
  textBox: {
    paddingVertical: height * 0.02,
    marginBottom: height * 0.04,
  },
  title: {
    fontFamily: "JosefinSans-Regular",
    fontSize: width * 0.06,
    fontWeight: "400",
    lineHeight: width * 0.09,
    textAlign: "left",
    color: "#D39F3A",
    marginBottom: height * 0.02,
  },
  description: {
    fontFamily: "JosefinSans-Regular",
    fontSize: width * 0.037,
    fontWeight: "400",
    lineHeight: width * 0.05,
    textAlign: "left",
    color: "#ffffff",
  },
  buttonGroup: {
    flexDirection: "column",
    marginBottom: height * 0.02,
  },
});
