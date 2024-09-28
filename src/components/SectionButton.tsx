import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SectionButtonProps = {
  title: string;
  count: string;
  isActive: boolean;
  onPress: () => void;
};

const SectionButton = ({
  title,
  count,
  isActive,
  onPress,
}: SectionButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={onPress}
    >
      <View style={styles.textBox}>
        <Text style={styles.countText}>{count}</Text>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SectionButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#1A1A23",
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#1A1A23",
  },
  textBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#D9D9D9",
    fontSize: 12,
    fontFamily: "JosefinSans-Regular",
    lineHeight: 17,
    fontWeight: "400",
  },
  countText: {
    color: "#D39F3A",
    fontFamily: "JosefinSans-Regular",
    fontWeight: "400",
    lineHeight: 34,
    fontSize: 24,
    marginBottom: 5,
  },
});
