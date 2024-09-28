import React from 'react';
import { SvgXml } from 'react-native-svg';

const ShopTolltipArrowSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width="116" height="126" viewBox="0 0 116 126" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.146447 121.646C-0.0488155 121.842 -0.0488155 122.158 0.146447 122.354L3.32843 125.536C3.52369 125.731 3.84027 125.731 4.03553 125.536C4.2308 125.34 4.2308 125.024 4.03553 124.828L1.20711 122L4.03553 119.172C4.2308 118.976 4.2308 118.66 4.03553 118.464C3.84027 118.269 3.52369 118.269 3.32843 118.464L0.146447 121.646ZM115 0C115 32.3241 97.8385 62.7027 74.9014 85.0166C51.9549 107.34 23.3232 121.5 0.5 121.5V122.5C23.6768 122.5 52.5451 108.16 75.5986 85.7334C98.6615 63.2973 116 32.6759 116 0H115Z" fill="white"/>
  </svg>
  `;

  return <SvgXml xml={svgString} />
};

export default ShopTolltipArrowSvg;
