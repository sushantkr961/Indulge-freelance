import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SvgXml } from 'react-native-svg';

const LikeIconSvg = ({ width, height, color }: any) => {
    const svgString = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.77836 11.2446C1.77836 6.99811 5.20928 3.55566 9.44143 3.55566C12.2277 3.55566 14.6593 5.05269 16.0005 7.28396C17.3418 5.05269 19.7734 3.55566 22.5597 3.55566C26.7918 3.55566 30.2227 6.99811 30.2227 11.2446C30.2227 12.2153 30.0358 13.1403 29.7087 13.9955C27.1748 21.3085 16.0005 29.3334 16.0005 29.3334C16.0005 29.3334 4.82618 21.3085 2.29223 13.9955C1.96512 13.1403 1.77836 12.2153 1.77836 11.2446Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill=${color}/>
</svg>    
  `;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default LikeIconSvg;

const styles = StyleSheet.create({
    container: {
        // width: 25,
        // height: 25,
    },
});
