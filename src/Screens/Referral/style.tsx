import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const ReferFriendFormstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  screenModalView: {
    flex: 0.6,
    justifyContent: "flex-start",
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: "#1A1A23",
    padding: 20,
    //   borderWidth: 1, borderColor: 'white'
  },
  dragHandle: {
    width: 60,
    height: 3,
    backgroundColor: "#566D80",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: "#D4AF37",
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelButtonText: {
    fontFamily: "JosefinSans-Regular",
    textDecorationLine: "underline",
  },
});

export const ReferFriendStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F15",
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.11,
  },
});

export const ReferralStyles = StyleSheet.create({
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

  export const TrackReferralStyles = StyleSheet.create({
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
  