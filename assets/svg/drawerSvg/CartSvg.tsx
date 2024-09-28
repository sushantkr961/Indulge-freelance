import React from 'react';
import { SvgXml } from 'react-native-svg';

const CartSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width=${width} height=${height} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5166 2.73633H4.05142L6.24058 12.2995H16.8407V6.65378" stroke="#C4963D" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4461 10.226L9.582 6.30859M13.0386 10.226L12.1744 6.30859" stroke="#D39F3A" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="8.4103" cy="15.3908" r="1.36343" stroke="#C4963D"/>
<circle cx="14.6325" cy="15.3908" r="1.36343" stroke="#C4963D"/>
</svg>
  `;

  return <SvgXml xml={svgString} />
};

export default CartSvg;
