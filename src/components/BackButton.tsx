import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BackButton = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.backButton, { marginTop: insets.top + 10 }]}
      accessible={true}
      accessibilityLabel="Go back"
    >
      <Image
        source={require("../../assets/images/BackArrow.png")}
        style={styles.backImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 99,
    left: 15,
    // borderWidth: 1,
  },
  backImage: {
    width: 40,
    height: 40,
  },
});

export default BackButton;
