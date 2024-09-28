import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const ShareIconSvg = ({ width, height }: any) => {
    const svgString = `<svg width=${width} height=${height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.3451 15.2099C12.3451 17.3917 10.5763 19.1605 8.39446 19.1605C6.2126 19.1605 4.44385 17.3917 4.44385 15.2099C4.44385 13.028 6.2126 11.2593 8.39446 11.2593C10.5763 11.2593 12.3451 13.028 12.3451 15.2099Z" stroke="white" stroke-width="1.2"/>
    <path opacity="0.5" d="M20.7531 23.5879L12.3452 18.0386" stroke="#D9D9D9" stroke-width="1.2" stroke-linecap="round"/>
    <path opacity="0.5" d="M20.9113 7.8457L12.5034 13.395" stroke="#D9D9D9" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M28.1478 26.2719C28.1478 28.4538 26.379 30.2225 24.1972 30.2225C22.0154 30.2225 20.2466 28.4538 20.2466 26.2719C20.2466 24.0901 22.0154 22.3213 24.1972 22.3213C26.379 22.3213 28.1478 24.0901 28.1478 26.2719Z" stroke="white" stroke-width="1.2"/>
    <path d="M28.1478 5.72845C28.1478 7.91031 26.379 9.67907 24.1972 9.67907C22.0154 9.67907 20.2466 7.91031 20.2466 5.72845C20.2466 3.54659 22.0154 1.77783 24.1972 1.77783C26.379 1.77783 28.1478 3.54659 28.1478 5.72845Z" stroke="white" stroke-width="1.2"/>
    </svg>`;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default ShareIconSvg;

const styles = StyleSheet.create({
    container: {
        // width: 25,
        // height: 25,
    },
});
