import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import BackButton from "../../Components/BackButton";
import SectionButton from "../../Components/SectionButton";
import referralsData from "../../data/referralsData.json";
import ContactList from "../../Components/ContactList";
import ContactListBar from "../../Components/ContactListBar";
import { TrackReferralStyles as styles } from "./style";
import { getAllReferralsApi } from "../../Service/ReferralApi/ReferralApiServices";

type Referral = {
  id: string;
  name: string;
  phone: string;
  status: string;
  mobileNo: number;
  totalPrice: number;
};

const TrackReferral = () => {
  const [activeSection, setActiveSection] = useState("totalReferrals");
  const [referralsData, setReferralsData] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPriceEarned, setTotalPriceEarned] = useState("");

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        const referredBy = "66702990a7512fefd3cdfb3a";
        const response = await getAllReferralsApi(referredBy);
        console.log(4444, response.referrals);
        setReferralsData(response.referrals);
        const totalPrice = response.referrals.reduce(
          (acc: number, referral: Referral) =>
            acc + (referral?.totalPrice || 0),
          0
        );
        setTotalPriceEarned(totalPrice);
        setLoading(false);
      } catch (err) {
        setError("Failed to load referrals");
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

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
            count={(referralsData?.length).toString()}
            isActive={activeSection === "totalReferrals"}
            onPress={() => setActiveSection("totalReferrals")}
          />
          <SectionButton
            title="Money Earned"
            count={`₹ ${totalPriceEarned}`}
            isActive={activeSection === "moneyEarned"}
            onPress={() => setActiveSection("moneyEarned")}
          />
        </View>

        <Text style={styles.inviteText}>INVITED</Text>
        <View style={styles.contentContainer}>
          {activeSection === "totalReferrals" ? (
            <ContactList contacts={referralsData} isTouchableEnabled={false} />
          ) : (
            <ContactListBar contacts={referralsData} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackReferral;
