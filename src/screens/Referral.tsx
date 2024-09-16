import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import BackButton from "../components/BackButton";
// import { SafeAreaView } from "react-native-safe-area-context";

type ReferralScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Referral"
>;

type Props = {
  navigation: ReferralScreenNavigationProp;
};

const Referral = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar translucent={true} backgroundColor={"#65635A"} /> */}
      <BackButton />

      <ImageBackground
        source={require("../../assets/images/referralimage.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      ></ImageBackground>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Refer and Earn</Text>
        <Text style={styles.description}>
          If you haven't registered for bidding with us before, we recommend
          initiating the registration process at least four business days before
          the auction to ensure a smooth experience.
        </Text>
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
    // justifyContent: "flex-start",
  },
  bottomContainer: {
    flex: 0.5, // Takes up the remaining half
    backgroundColor: "#0F0F15",
    padding: 20, // Add padding for content inside the bottom view
  },
  title: {
    fontSize: 24,
    color: "#D4AF37", // Gold color for title
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#ffffff",
    lineHeight: 22,
  },
});
