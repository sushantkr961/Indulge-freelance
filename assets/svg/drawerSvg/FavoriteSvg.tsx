import React from 'react';
import { SvgXml } from 'react-native-svg';

const FavoriteSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width=${width} height=${height} viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.282 3.60834C10.282 3.60834 7.44469 -0.0189534 4.04847 1.2815C3.3384 1.55398 2.70414 1.99298 2.19901 2.56157C1.69389 3.13016 1.33267 3.81172 1.14573 4.54895C0.958792 5.28617 0.951598 6.05751 1.12475 6.79809C1.29791 7.53867 1.64635 8.22686 2.14079 8.80477C3.09732 9.83116 10.282 17.1932 10.282 17.1932L18.2728 9.13257C18.2728 9.13257 21.2069 5.90831 18.5039 2.77003C15.8009 -0.368248 11.7383 1.42122 10.282 3.60834Z" stroke="#C4963D" stroke-width="1.2" stroke-linejoin="round"/>
    </svg>
  `;

  return <SvgXml xml={svgString} />
};

export default FavoriteSvg;
