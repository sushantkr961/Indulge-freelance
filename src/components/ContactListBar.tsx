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
};

type Props = {
  contacts: Contact[];
};

const { width, height } = Dimensions.get("window");

const ContactListBar = ({ contacts }: Props) => {
  const CircleWithTriangle = ({
    position,
    backgroundColor,
    innerColor,
    showLeftTriangle,
    showRightTriangle,
    offset,
  }: {
    position: "left" | "right";
    backgroundColor: string;
    innerColor: string;
    showLeftTriangle?: boolean;
    showRightTriangle?: boolean;
    offset?: string;
  }) => (
    <View
      style={[
        styles.progressOuterCircle,
        { [position]: offset ?? 0, backgroundColor: backgroundColor },
      ]}
    >
      {showLeftTriangle && (
        <View
          style={[styles.leftTriangle, { borderRightColor: backgroundColor }]}
        />
      )}
      {showRightTriangle && (
        <View
          style={[styles.rightTriangle, { borderLeftColor: backgroundColor }]}
        />
      )}
      <View
        style={[styles.progressInnerCircle, { backgroundColor: innerColor }]}
      />
    </View>
  );

  const renderItem = ({ item }: { item: Contact }) => {
    let progress = 0.0;
    if (item.status === "Ongoing") {
      progress = 0.5;
    } else if (item.status === "Onboarded") {
      progress = 1.0;
    }

    const outerCircleColor1 = ["Referred", "Ongoing", "Onboarded"].includes(
      item.status ?? ""
    )
      ? "#D9D9D9"
      : "#1A1A23";
    const outerCircleColor2 = ["Ongoing", "Onboarded"].includes(
      item.status ?? ""
    )
      ? "#D9D9D9"
      : "#1A1A23";
    const outerCircleColor3 =
      item.status === "Onboarded" ? "#D9D9D9" : "#1A1A23";

    return (
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

        <View style={styles.progressBarContainer}>
          <View style={styles.progressLineContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressBarBackground} />
              <View
                style={[
                  styles.progressBarForeground,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>

            <CircleWithTriangle
              position="left"
              backgroundColor={outerCircleColor1}
              innerColor={
                ["Referred", "Ongoing", "Onboarded"].includes(item.status ?? "")
                  ? "#00A74D"
                  : "#1A1A23"
              }
              showRightTriangle
            />
            <CircleWithTriangle
              position="left"
              backgroundColor={outerCircleColor2}
              innerColor={
                ["Ongoing", "Onboarded"].includes(item.status ?? "")
                  ? "#D39F3A"
                  : "#1A1A23"
              }
              showLeftTriangle
              showRightTriangle
              offset="50%"
            />
            <CircleWithTriangle
              position="right"
              backgroundColor={outerCircleColor3}
              innerColor={item.status === "Onboarded" ? "#00A74D" : "#1A1A23"}
              showLeftTriangle
            />
          </View>

          <View style={styles.statusLabels}>
            <Text style={styles.statusLabel}>Referred</Text>
            <Text style={styles.statusLabel}>Ongoing</Text>
            <Text style={styles.statusLabel}>Onboarded</Text>
          </View>
        </View>
      </View>
    );
  };

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
    flexDirection: "column",
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
  progressBarContainer: {},
  progressLineContainer: {
    position: "relative",
    height: 25,
    justifyContent: "center",
  },
  progressBar: {
    height: 2,
    width: "100%",
    backgroundColor: "#1A1A23",
    position: "relative",
    overflow: "hidden",
  },
  progressBarBackground: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1A1A23",
    position: "absolute",
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: "#D9D9D9",
    position: "absolute",
    left: 0,
  },
  progressOuterCircle: {
    position: "absolute",
    top: "50%",
    width: 12,
    height: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -6 }],
    zIndex: 1,
  },
  progressInnerCircle: {
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  rightTriangle: {
    position: "absolute",
    right: -3,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  leftTriangle: {
    position: "absolute",
    left: -3,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  statusLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -2,
  },
  statusLabel: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 10,
    color: "#D9D9D9",
    lineHeight: 14,
    fontWeight: "300",
  },
  separator: {
    height: 1,
    backgroundColor: "#444444",
    marginHorizontal: width * 0.03,
  },
});
