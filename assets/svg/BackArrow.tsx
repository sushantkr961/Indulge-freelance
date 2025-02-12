import React from "react";
import { View, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

const BackArrowSvg = ({ width, height }: any) => {
  const svgString = `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.243 21.5637H10.1362" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.1896 32.6369L10.1362 21.5637L21.1896 10.4904" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`;

  return (
    <View style={[styles.container, { width, height }]}>
      <SvgXml xml={svgString} />
    </View>
  );
};

export default BackArrowSvg;

const styles = StyleSheet.create({
  container: {
    // width: 25,
    // height: 25,
  },
});
