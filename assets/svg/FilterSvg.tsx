import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SvgXml } from 'react-native-svg';

const FilterSvg = ({ width, height }: any) => {
    const svgString = `<svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.5858 1H2.41421C1.52331 1 1.07714 2.07714 1.70711 2.70711L14.2929 15.2929C14.6834 15.6834 15.3166 15.6834 15.7071 15.2929L28.2929 2.70711C28.9229 2.07714 28.4767 1 27.5858 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 15.4453L15 25.4453" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default FilterSvg;

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
    },
});
