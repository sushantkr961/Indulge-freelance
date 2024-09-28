import React from 'react';
import { SvgXml } from 'react-native-svg';

const TopArrowTooltipSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width="33" height="34" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 1.53702V13C0 13.5523 0.447716 14 1 14H11.6988C12.5732 14 13.0264 12.9569 12.4298 12.3177L1.73106 0.854702C1.11177 0.191181 0 0.6294 0 1.53702Z" fill="#D9D9D9"/>
  </svg>
  `;

  return <SvgXml xml={svgString} />
};

export default TopArrowTooltipSvg;
