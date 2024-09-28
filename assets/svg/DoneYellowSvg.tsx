import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const DoneYellowSvg = ({ width, height }: any) => {
    const svgString = `
    <svg width="56" height="56" viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="86" height="86" rx="43" fill="#C4973E"/>
    <path d="M19.1846 43.3309L34.8421 58.2155L66.1538 28.4463" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default DoneYellowSvg;

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
    },
});
