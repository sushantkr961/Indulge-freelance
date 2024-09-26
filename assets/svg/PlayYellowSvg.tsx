import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const PlayYellowSvg = ({ width, height }: any) => {
    const svgString = `
    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1956_4470)">
    <circle cx="31" cy="29" r="27" fill="#D39F3A"/>
    </g>
    <path d="M39.7131 27.2852L26.3146 19.2461C24.9816 18.4463 23.2856 19.4065 23.2856 20.9611V37.0392C23.2856 38.5938 24.9816 39.554 26.3146 38.7542L39.713 30.7151C41.0077 29.9383 41.0077 28.062 39.7131 27.2852Z" fill="white"/>
    <defs>
    <filter id="filter0_d_1956_4470" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="2"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1956_4470"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1956_4470" result="shape"/>
    </filter>
    </defs>
    </svg>
  `;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default PlayYellowSvg;

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
    },
});
