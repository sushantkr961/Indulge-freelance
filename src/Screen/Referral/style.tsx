import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");



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
    flex: 0.4,
  },
  bottomContainer: {
    flex: 0.6,
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
  title1: {
    fontFamily: "JosefinSans-Regular",
    fontSize: width * 0.037,
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

