import React from 'react';
import { SvgXml } from 'react-native-svg';

const FilterThumbSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width=${width} height=${height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="28" height="28" rx="14" fill="white" stroke="#C4963D" stroke-width="4"/>
  </svg>
  `;

  return <SvgXml xml={svgString} />
};

export default FilterThumbSvg;
