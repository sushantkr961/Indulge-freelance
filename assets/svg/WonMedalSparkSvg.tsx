import React from 'react';
import { SvgXml } from 'react-native-svg';

const WonMedalSparkSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width="54" height="23" viewBox="0 0 54 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 14C2.84568 14.4815 6.62222 16.6963 6.96296 21.7037" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.9258 10L13.4813 17.7037" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.1479 6L20.4257 13.7037" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27 1V9.66667" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M53.1479 14C51.3023 14.4815 47.5257 16.6963 47.185 21.7037" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M43.2222 10L40.6666 17.7037" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M35 6L33.7222 13.7037" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  return <SvgXml xml={svgString} />
};

export default WonMedalSparkSvg;
