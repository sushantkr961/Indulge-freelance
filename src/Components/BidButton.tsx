import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { FC } from "react";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../Utils/Constant/Fonts";

const BidButton = ({ label, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#D39F3A", "#BD812D"]}
        style={styles.promptContainer}
        start={{ x: 0.5, y: 0.1 }}
        end={{ x: 0.9, y: 1 }}
      >
        <Text style={styles.chatgptText1}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BidButton;

const styles = StyleSheet.create({
  promptContainer: {
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  chatgptText1: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16,
    fontWeight: FontWeight.F_W_400
  },
  card: {
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    paddingVertical: 5,
    height: 40,
    marginTop: 30,
    borderColor: "transparent",
    flex: 1
  },
});
