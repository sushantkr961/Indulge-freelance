import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';
import { formatValue } from '../../Utils';

const CustomSlider = ({ min, max, step, priceRange, setPriceRange }: any) => {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={priceRange}
        onValueChange={setPriceRange}
        minimumTrackTintColor="#C4963D"
        maximumTrackTintColor="#404040"
        thumbTintColor="#FFFFFF"
        // thumbImage={Platform.OS == 'ios' ? require('../../../assets/screen/FilterRectangle.png') : require('../../../assets/screen/Bg_Light.png')}
      />
      <View style={styles.valueContainer}>
        <Text style={styles.minMaxText}>{min}</Text>
        <Text style={styles.sliderValueText}>{formatValue(priceRange)}</Text>
        <Text style={styles.minMaxText}>{(max / 10000000)}Cr</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  slider: { width: '100%', height: 40 },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  minMaxText: {
    color: colors.WHITE_COLOR_60,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16
  },
  sliderValueText: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_20
  },
  customThumb: {
    // padding: 10,
    width: 190,
    height: 190,
    backgroundColor: colors.YELLO_THEME_COLOR,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.WHITE_COLOR
  },
});

export default CustomSlider;
