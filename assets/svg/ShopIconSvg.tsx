import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const ShopIconSvg = ({ width, height, activeColor }: any) => {
    const svgString = `<svg width=${width} height=${height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.66699 8H6.45708C5.43798 8 4.58185 8.76627 4.46931 9.77914L2.91375 23.7791C2.78212 24.9639 3.7095 26 4.90152 26H23.0991C24.2912 26 25.2185 24.9639 25.0869 23.7791L23.5313 9.77914C23.4188 8.76627 22.5627 8 21.5436 8H20.0003" stroke=${activeColor} stroke-width="1.4" stroke-linecap="round"/>
<path d="M11.333 8H16.6663" stroke=${activeColor} stroke-width="1.4" stroke-linecap="round"/>
<path d="M10 17.333H18" stroke=${activeColor} stroke-width="1.4" stroke-linecap="round"/>
<path d="M10 21H18" stroke=${activeColor} stroke-width="1.4" stroke-linecap="round"/>
<path d="M9.33301 10V5.66667C9.33301 4.33333 10.7997 2 13.9997 2C17.1997 2 18.6663 4.33333 18.6663 5.66667V10" stroke=${activeColor} stroke-width="1.4" stroke-linecap="round"/>
</svg>
  `;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default ShopIconSvg;

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
    },
});
