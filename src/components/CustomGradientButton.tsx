import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
  shadow?: boolean;
  borderRadius?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  fullWidth?: boolean;
};

const CustomGradientButton = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  gradientColors = ["#D39F3A", "#BD812D"],
  shadow = true,
  borderRadius = 12,
  paddingVertical = 15,
  paddingHorizontal = 32,
  fullWidth = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        shadow && styles.shadow,
        buttonStyle,
        fullWidth && { alignSelf: "stretch" },
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        style={[
          styles.gradient,
          {
            borderRadius: borderRadius,
            paddingVertical: paddingVertical,
            paddingHorizontal: paddingHorizontal,
          },
        ]}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomGradientButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    fontWeight: '400',
    lineHeight: 20,
    textAlign: "center",
  },
});
