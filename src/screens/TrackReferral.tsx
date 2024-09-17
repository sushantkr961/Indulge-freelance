import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import BackButton from "../components/BackButton";
import SectionButton from "../components/SectionButton";
import referralsData from "../data/referralsData.json";
import moneyEarnedData from "../data/moneyEarnedData.json";
import ContactList from "../components/ContactList";
import ContactListBar from "../components/ContactListBar";

type Referral = {
  id: string;
  name: string;
  phone: string;
  status: string;
};

type MoneyEarned = {
  id: string;
  name: string;
  phone: string;
  amount: string;
};

const TrackReferral = () => {
  const [activeSection, setActiveSection] = useState("totalReferrals");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0F0F15"
        translucent={true}
        showHideTransition={"slide"}
      />
      <BackButton />
      <View style={styles.content}>
        <Text style={styles.title}>Track your Referral</Text>
        <View style={styles.topButtonsContainer}>
          <SectionButton
            title="Total Referrals"
            count={"12"}
            isActive={activeSection === "totalReferrals"}
            onPress={() => setActiveSection("totalReferrals")}
          />
          <SectionButton
            title="Money Earned"
            count={"₹ 2,49,388"}
            isActive={activeSection === "moneyEarned"}
            onPress={() => setActiveSection("moneyEarned")}
          />
        </View>

        <Text style={styles.inviteText}>INVITED</Text>
        <View style={styles.contentContainer}>
          {activeSection === "totalReferrals" ? (
            <ContactList contacts={referralsData} onPress={() => {}} />
          ) : (
            <ContactListBar contacts={referralsData} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackReferral;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F15",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 100,
  },
  title: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 34,
    textAlign: "left",
    color: "#D39F3A",
  },
  inviteText: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    textAlign: "left",
    color: "#D39F3A",
    textTransform: "uppercase",
    marginBottom: 15,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
  },
  referralItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#CCCCCC",
    marginRight: 15,
  },
  name: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 14,
    color: "#FFFFFF",
  },
  phone: {
    fontFamily: "JosefinSans-Light",
    fontSize: 14,
    color: "#888888",
  },
  statusBadge: {
    backgroundColor: "#444",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  amountBadge: {
    backgroundColor: "#444",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  amountText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#333",
  },
});
