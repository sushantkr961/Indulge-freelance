import React from 'react';
import { SvgXml } from 'react-native-svg';

const ArrowTooltipSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width="33" height="34" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 12.463V1C0 0.447715 0.447716 0 1 0H11.6988C12.5732 0 13.0264 1.0431 12.4298 1.68232L1.73106 13.1453C1.11177 13.8088 0 13.3706 0 12.463Z" fill="#D9D9D9"/>
  </svg>
  `;

  return <SvgXml xml={svgString} />
};

export default ArrowTooltipSvg;
