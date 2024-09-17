import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";

type LabeledInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: TextInputProps["keyboardType"];
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  multiline?: boolean;
  editable?: boolean;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
};

const LabeledInput = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  placeholder = "",
  placeholderTextColor = "#888888",
  secureTextEntry = false,
  maxLength,
  multiline = false,
  editable = true,
  errorMessage,
  containerStyle,
  labelStyle,
  inputStyle,
}: LabeledInputProps) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        multiline={multiline}
        editable={editable}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 24,
    color: "#888888",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#000000",
    borderRadius: 12,
    color: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontFamily: "JosefinSans-Regular",
    fontWeight: "400",
    fontSize: 16,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontFamily: "JosefinSans-Regular",
    marginTop: 5,
  },
});
