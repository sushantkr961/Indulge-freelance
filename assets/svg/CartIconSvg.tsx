import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const CartIconSvg = ({ width, height }: any) => {
    const svgString = `<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.55444 2.60742H5.82361L9.51062 18.7138H27.3635V9.20523" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.5939 15.2209L15.1385 8.62305M20.9601 15.2209L19.5047 8.62305" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="13.1652" cy="23.9213" r="2.2963" stroke="white" stroke-width="1.4"/>
    <circle cx="23.6444" cy="23.9213" r="2.2963" stroke="white" stroke-width="1.4"/>
    </svg>
    `;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default CartIconSvg;

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
    },
});
