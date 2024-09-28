import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

type Contact = {
  id: string;
  name: string;
  mobileNo: string | number;
  status?: string;
};

type Props = {
  contacts: Contact[];
  isTouchableEnabled: boolean;
};

const { width, height } = Dimensions.get("window");

const ContactList = ({ contacts, isTouchableEnabled }: Props) => {
  const navigation = useNavigation();
  const getButtonColor = (status?: string) => {
    switch (status) {
      case "Ongoing":
        return "#483DC4";
      case "Onboarded":
      case "paid":
        return "#00A74D";
      case "Declined":
        return "#A73200";
      default:
        return "#C4963D";
    }
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactContainer}>
      <View style={styles.contactInfo}>
        <Image
          source={require("../../assets/images/download.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{`+91 ${item.mobileNo}`}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.referButton,
          { backgroundColor: getButtonColor(item.status) },
        ]}
        onPress={() => {
          if (isTouchableEnabled) {
            navigation.navigate("NewScreen", { contact: item });
          }
        }}
        disabled={!isTouchableEnabled}
      >
        <Text style={styles.referButtonText}>
          {item.status === "paid"
            ? "Onboarded"
            : item.status
            ? item.status
            : "Refer"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={(item, index) => item?.id ?? index.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default ContactList;

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: height * 0.02,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: (width * 0.14) / 2,
    backgroundColor: "#CCCCCC",
    marginRight: width * 0.04,
  },
  name: {
    fontFamily: "JosefinSans-Regular",
    fontSize: width * 0.035,
    fontWeight: "400",
    lineHeight: width * 0.05,
    textAlign: "left",
    color: "#D9D9D9",
  },
  phone: {
    fontFamily: "JosefinSans-Light",
    fontSize: width * 0.035,
    fontWeight: "300",
    lineHeight: width * 0.05,
    textAlign: "left",
    color: "#D9D9D9",
  },
  referButton: {
    borderRadius: width * 0.1,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  referButtonText: {
    fontFamily: "JosefinSans-Regular",
    fontSize: width * 0.03,
    fontWeight: "400",
    lineHeight: width * 0.04,
    textAlign: "center",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  separator: {
    height: 1,
    backgroundColor: "#444444",
    marginHorizontal: width * 0.03,
  },
});
