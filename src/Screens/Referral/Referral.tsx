import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Linking,
  ToastAndroid,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import BackButton from "../../Components/BackButton";
import ReferButton from "../../Components/ReferButton";
import { ReferralStyles as styles } from "./style";
import WhatsappIconSvg from "../../../assets/svg/WhatsappIconSvg";
import AuctionIconSvg from "../../../assets/svg/AuctionIconSvg";
import GiftingSvg from "../../../assets/svg/HelpWithYouSvg/GiftingSvg";
import TravelSvg from "../../../assets/svg/HelpWithYouSvg/TravelSvg";
import ArrowTooltipSvg from "../../../assets/svg/ArrowTooltipSvg";
import AuctionSvg from "../../../assets/svg/drawerSvg/AuctionSvg";

type ReferralScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Referral"
>;

type Props = {
  navigation: ReferralScreenNavigationProp;
};

const { width, height } = Dimensions.get("window");

const Referral = ({ navigation }: Props) => {
  const openWhatsApp = (phoneNumber: string) => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappUrl);
        } else {
          ToastAndroid.showWithGravity(
            "WhatsApp is not installed on your device.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

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
          {/* <ReferButton
            onPress={() => navigation.navigate("ReferFriend")}
            title="Invite your Friends"
            imageSource={require("../../../assets/images/money-wings.png")}
          />
          <ReferButton
            onPress={() => navigation.navigate("TrackReferral")}
            title="Track Referral"
            imageSource={require("../../../assets/images/map-location.png")}
          /> */}
          <ReferButton
            onPress={() => navigation.navigate("ReferFriend")}
            title="Invite your Friends"
            Icon={WhatsappIconSvg}
            iconHeight={25}
            iconWidth={25}
            iconColor={"#FFFFFF"}
          />
          <ReferButton
            onPress={() => navigation.navigate("TrackReferral")}
            title="Track Referral"
            Icon={AuctionSvg}
            iconHeight={25}
            iconWidth={25}
            iconColor={"#FFFFFF"}
          />
        </View>
        <ReferButton
          onPress={() => openWhatsApp("+1234567890")}
          title="WhatsApp"
          backgroundColor={"#32D851"}
          Icon={WhatsappIconSvg}
          iconHeight={25}
          iconWidth={25}
          iconColor={"#FFFFFF"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Referral;
