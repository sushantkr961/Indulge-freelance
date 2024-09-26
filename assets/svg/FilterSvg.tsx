import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SvgXml } from 'react-native-svg';

const FilterSvg = ({ width, height }: any) => {
    const svgString = `
  <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_2016_4464)">
  <rect x="6" y="4" width="64" height="64" rx="32" fill="url(#paint0_linear_2016_4464)"/>
  </g>
  <path d="M50.5858 24H25.4142C24.5233 24 24.0771 25.0771 24.7071 25.7071L37.2929 38.2929C37.6834 38.6834 38.3166 38.6834 38.7071 38.2929L51.2929 25.7071C51.9229 25.0771 51.4767 24 50.5858 24Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M38 38.4443L38 48.4443" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <defs>
  <filter id="filter0_d_2016_4464" x="0" y="0" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="2"/>
  <feGaussianBlur stdDeviation="3"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2016_4464"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2016_4464" result="shape"/>
  </filter>
  <linearGradient id="paint0_linear_2016_4464" x1="6" y1="36" x2="70" y2="36" gradientUnits="userSpaceOnUse">
  <stop stop-color="#D39F3A"/>
  <stop offset="1" stop-color="#BD812D"/>
  </linearGradient>
  </defs>
  </svg>
  `;

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
