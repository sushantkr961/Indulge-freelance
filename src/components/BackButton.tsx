import React from "react";
import { TouchableOpacity, Image, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackArrowSvg from "../../assets/svg/ReferralSvg/BackArrowSvg";

type Props = {
  title?: string;
};

const BackButton = ({ title }: Props) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top + 10 }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        accessible={true}
        accessibilityLabel="Go back"
      >
        <BackArrowSvg height={35} width={35} />
      </TouchableOpacity>
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 99,
    flexDirection: "row",
    alignItems: "center",
    left: 20,
    top: 10,
    // borderWidth: 1,
    // borderColor: "white",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTitle: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    fontWeight: "400",
    // lineHeight: 20,
    textAlign: "left",
    color: "#ffffff",
  },
});

export default BackButton;
