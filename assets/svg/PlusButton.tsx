import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const PlusButton = () => {
    const svgString = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="24" fill="#373737"/>
    <path d="M14 24H34M24 14V34" stroke="#D9D9D9" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    return (
        <SvgXml xml={svgString} />
    );
};

export default PlusButton;