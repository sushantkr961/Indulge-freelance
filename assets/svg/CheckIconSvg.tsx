import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const CheckIconSvg = ({ width = 26, height = 25, activeColor = "#D39F3A" }) => {
    const svgString = `
    <svg width="${width}" height="${height}" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" width="24" height="24" rx="12" fill="${activeColor}"/>
        <path d="M7 11.85L10.72 15.5L18.67 7.71" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default CheckIconSvg;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
