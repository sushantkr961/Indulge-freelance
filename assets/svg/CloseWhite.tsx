import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const CloseWhite = ({ stroke = "#D9D9D9" }) => {
    const svgString = `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9999 11L30.9999 31M30.9999 11L10.9999 31" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    return (
        <View style={[styles.container]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default CloseWhite;

const styles = StyleSheet.create({
    container: {
        width: 10,
        height: 10,
    },
});
