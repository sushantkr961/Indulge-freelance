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
// import { TrackReferralStyles as styles } from "./style";
import { getAllReferralsApi } from "../../Service/ReferralApi/ReferralApiServices";
import { useAppSelector } from "../../StoreRedux/hooks/Hooks";

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
  const { userId } = useAppSelector((state) => state.profileDetails);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        const response = await getAllReferralsApi(userId);
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

