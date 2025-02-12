import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../../Utils/Constant/Fonts";
import { useAppSelector } from "../../StoreRedux/hooks/Hooks";

interface SubscriptionProps {
  onValueChange?: (value: number) => void;
  calculateDiscountedValue?: (value: number) => any;
  months?: number;
  setMonths?: (value: number) => void;
  setSelectedButton?: (value: number) => void;
}

const SubscriptionComponent: React.FC<SubscriptionProps> = ({
  onValueChange, calculateDiscountedValue, months, setMonths, setSelectedButton
}) => {
  // Default selected months
  const { myPlansData } = useAppSelector((state: any) => state.myPlans);

  const handleValueChange = (value: number) => {

    setMonths(value);

    // if (onValueChange) {
    //   onValueChange(value);
    // }
  };

  // Get current pricing based on months
  const currentPrice = (month: any, data: any) => {
    const selectedPlan = data.find((plan: any) => plan.months === month);
    if (selectedPlan) {
      setSelectedButton(selectedPlan?.totalPrice)
      return {
        strike: selectedPlan.totalPrice,
        discounted: selectedPlan.discountedPrice
      };
    }
    return { strike: 0, discounted: 0 }; // Default value if no match is found
  };

  return (
    <View style={styles.container}>
      {/* Price Section */}
      <View style={styles.priceSection}>
        <Text style={styles.rsSymbolStyle}>₹ </Text>
        <Text style={styles.currentPrice}>
          {/* {currentPrice.discounted.toLocaleString()} */}
          {calculateDiscountedValue(currentPrice(months, myPlansData).discounted)}
        </Text>
        <Text style={styles.taxText}>+ GST</Text>
      </View>
      <View style={styles.strikedPriceSection}>
        <Text style={styles.strikedPrice}>
          ₹ {currentPrice(months, myPlansData).strike.toLocaleString()}
        </Text>
        <Text style={styles.strikedTaxText}>+ GST</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Subscription Selection */}
      <Text style={styles.selectText}>Select month for subscription</Text>

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={36}
          step={1}
          value={months}
          minimumTrackTintColor="#DAA520" // Gold color for active track
          maximumTrackTintColor="#EDEDED" // Light gray for inactive track
          thumbTintColor="#DAA520" // Gold color for the slider thumb
          onValueChange={handleValueChange}
        // thumbImage={Platform.OS == 'ios' ? require('../../../assets/screen/FilterRectangle.png') : require('../../../assets/screen/Bg_Light.png')}
        />
      </View>
      <View style={styles.monthContainer}>
        <Text style={styles.sliderValue}>1</Text>
        <Text style={styles.sliderValue}>36</Text>
      </View>

      {/* Counter */}
      <View style={styles.counterContainer}>
        <TouchableOpacity
          onPress={() => handleValueChange(Math.max(1, months - 1))}
          style={styles.counterButton}
        >
          <Text style={styles.counterText}>−</Text>
        </TouchableOpacity>
        <View style={styles.sliderTextContainer}>
          <Text style={styles.monthText}>{months}</Text>
          <Text style={styles.monthText1}>months</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleValueChange(Math.min(36, months + 1))}
          style={styles.counterButton}
        >
          <Text style={[styles.counterText, Platform.OS === "android" && { marginTop: -5 }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubscriptionComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BACK_BLUE_DARK, // Dark background
    borderRadius: 15,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
    zIndex: 1
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  rsSymbolStyle: {
    fontSize: FontSize.F_14,
    color: colors.WHITE_COLOR, // Gold color
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.REGULAR,
  },
  currentPrice: {
    color: colors.YELLO_THEME_COLOR_TEXT, // Gold color
    fontSize: FontSize.F_18,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.SEMIBOLD,
    marginTop: 10,
  },
  taxText: {
    color: colors.WHITE_COLOR_78,
    marginLeft: 8,
    fontSize: FontSize.F_14,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.SEMIBOLD,
  },
  strikedPriceSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  strikedPrice: {
    fontSize: FontSize.F_14,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.SEMIBOLD,
    color: colors.WHITE_COLOR,
    textDecorationLine: "line-through",
  },
  strikedTaxText: {
    fontSize: FontSize.F_14,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.SEMIBOLD,
    color: colors.WHITE_COLOR_78,
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.WHITE_COLOR_78,
    marginVertical: 15,
  },
  selectText: {
    fontSize: FontSize.F_15,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.REGULAR,
    color: colors.WHITE_COLOR,
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flex: 1,
    width: '100%'
  },
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sliderValue: {
    fontSize: FontSize.F_16,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.REGULAR,
    color: colors.WHITE_COLOR,
  },
  sliderTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  counterButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    fontSize: FontSize.F_24,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.REGULAR,
    color: colors.BLACK_BACKGROUND_COLOR,
  },
  monthText: {
    fontSize: FontSize.F_16,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.REGULAR,
    color: colors.YELLO_THEME_COLOR_TEXT,
    paddingHorizontal: 10,
  },
  monthText1: {
    fontSize: FontSize.F_16,
    fontWeight: FontWeight.F_W_400,
    fontFamily: Fonts.REGULAR,
    color: colors.WHITE_COLOR,
    paddingHorizontal: 10,
  },
});
