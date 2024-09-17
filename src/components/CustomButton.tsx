import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const CustomButton = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "JosefinSans-Regular",
    color: "#FFFFFF",
    fontWeight: '400',
  },
});
