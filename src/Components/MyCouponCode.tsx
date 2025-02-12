import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../Utils/Constant/Fonts";

const MyCouponCode = ({ item, appliedCoupon, callApplyCoupon, cancelCoupon }: any) => {
  const isCouponApplied = appliedCoupon?.code === item?.code;

  return (
    <View
      style={[
        styles.couponCodeContainer,
        { borderColor: isCouponApplied ? colors.YELLO_THEME_COLOR : colors.BACK_BLUE_DARK },
      ]}
    >
      <TouchableOpacity
        style={styles.couponCodeContainer1}
        onPress={() => {
          callApplyCoupon(item?.code);
        }}
      >
        <Text style={styles.planViewText}>{item?.code}</Text>
        <Text
          style={[
            styles.applyText,
            { color: isCouponApplied ? colors.GREEN_DARK_COLOR : colors.YELLO_THEME_COLOR_TEXT },
          ]}
        >
          {isCouponApplied ? "Applied" : "APPLY"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.answerText}>{item?.description}</Text>

      {isCouponApplied && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={cancelCoupon} // Call the cancel function on press
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MyCouponCode;

const styles = StyleSheet.create({
  couponCodeContainer: {
    backgroundColor: colors.BACK_BLUE_DARK,
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
    marginEnd: 20,
  },
  couponCodeContainer1: {
    flexDirection: "row",
    alignItems: "center",
  },
  planViewText: {
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontSize: FontSize.F_12,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_400,
    backgroundColor: colors.YELLOW_LIGHT_BALCK,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  answerText: {
    color: colors.WHITE_COLOR_80,
    fontSize: FontSize.F_12,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_400,
    marginTop: 10,
  },
  applyText: {
    flex: 1,
    fontSize: FontSize.F_12,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_600,
    textAlign: "right",
  },
  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.YELLO_THEME_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cancelText: {
    color: colors.BACK_BLUE_DARK,
    fontSize: FontSize.F_10,
    fontWeight: FontWeight.F_W_600,
  },
});
