import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const CheckIconSvg = ({ width, height, activeColor }: any) => {
    const svgString = `<svg width=${width} height=${height} viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" width="24" height="24" rx="12" fill="#D39F3A"/>
<g filter="url(#filter0_d_4160_10296)">
<path d="M6.99902 11.851L10.724 15.498L18.6737 7.71484" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"/>
</g>
<defs>
<filter id="filter0_d_4160_10296" x="0.198975" y="2.91406" width="25.2748" height="21.3848" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4160_10296"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4160_10296" result="shape"/>
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

export default CheckIconSvg;

const styles = StyleSheet.create({
    container: {
        // width: 25,
        // height: 25,
    },
});
