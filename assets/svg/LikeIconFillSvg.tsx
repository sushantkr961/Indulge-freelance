import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SvgXml } from 'react-native-svg';

const LikeIconFillSvg = ({ width, height }: any) => {
    const svgString = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_2320_5014)">
    <path d="M6.77836 13.2446C6.77836 8.99811 10.2093 5.55566 14.4414 5.55566C17.2277 5.55566 19.6593 7.05269 21.0005 9.28396C22.3418 7.05269 24.7734 5.55566 27.5597 5.55566C31.7918 5.55566 35.2227 8.99811 35.2227 13.2446C35.2227 14.2153 35.0358 15.1403 34.7087 15.9955C32.1748 23.3085 21.0005 31.3334 21.0005 31.3334C21.0005 31.3334 9.82618 23.3085 7.29223 15.9955C6.96512 15.1403 6.77836 14.2153 6.77836 13.2446Z" fill="#C4963D"/>
    <path d="M6.77836 13.2446C6.77836 8.99811 10.2093 5.55566 14.4414 5.55566C17.2277 5.55566 19.6593 7.05269 21.0005 9.28396C22.3418 7.05269 24.7734 5.55566 27.5597 5.55566C31.7918 5.55566 35.2227 8.99811 35.2227 13.2446C35.2227 14.2153 35.0358 15.1403 34.7087 15.9955C32.1748 23.3085 21.0005 31.3334 21.0005 31.3334C21.0005 31.3334 9.82618 23.3085 7.29223 15.9955C6.96512 15.1403 6.77836 14.2153 6.77836 13.2446Z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <filter id="filter0_d_2320_5014" x="0.178345" y="0.955566" width="41.6443" height="38.978" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="2"/>
    <feGaussianBlur stdDeviation="3"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2320_5014"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2320_5014" result="shape"/>
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

export default LikeIconFillSvg;

const styles = StyleSheet.create({
    container: {
        // width: 25,
        // height: 25,
    },
});
