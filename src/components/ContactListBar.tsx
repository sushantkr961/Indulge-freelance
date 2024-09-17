import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

type Contact = {
  id: string;
  name: string;
  phone: string;
  status?: string;
  //   status: "Referred" | "Ongoing" | "Onboarded" | "Declined";
};

type Props = {
  contacts: Contact[];
};

const { width, height } = Dimensions.get("window");

const ContactListBar = ({ contacts }: Props) => {
  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactContainer}>
      <View style={styles.contactInfo}>
        <Image
          source={require("../../assets/images/download.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.phone}>{item.phone}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressLine}>
          {/* Status: Referred */}
          <View
            style={[
              styles.progressDot,
              {
                backgroundColor:
                  item.status === "Referred" ? "#00AA00" : "#888",
              },
            ]}
          />
          {/* Line for Ongoing */}
          <View style={styles.progressSegment}>
            {/* Status: Ongoing */}
            <View
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    item.status === "Ongoing" ? "#D39F3A" : "#888",
                },
              ]}
            />
          </View>
          {/* Line for Onboarded */}
          <View style={styles.progressSegment}>
            {/* Status: Onboarded */}
            <View
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    item.status === "Onboarded" ? "#333" : "#888",
                },
              ]}
            />
          </View>
        </View>

        {/* Status Labels */}
        <View style={styles.statusLabels}>
          <Text style={styles.statusLabel}>Referred</Text>
          <Text style={styles.statusLabel}>Ongoing</Text>
          <Text style={styles.statusLabel}>Onboarded</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default ContactListBar;

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: "column", // Change to column to place progress bar under the contact info
    padding: height * 0.02,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  progressBarContainer: {
    marginTop: 10,
  },
  progressLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 20,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: "#444444",
    marginHorizontal: 5,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#888", // Default color
  },
  statusLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  statusLabel: {
    fontFamily: "JosefinSans-Regular",
    fontSize: width * 0.03,
    color: "#888888",
  },
  separator: {
    height: 1,
    backgroundColor: "#444444",
    marginHorizontal: width * 0.03,
  },
});
