import React from 'react';
import { SvgXml } from 'react-native-svg';

const FaqsSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width=${width} height=${height} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.1057 7.35179V2.1876C16.1057 1.87263 15.9805 1.57056 15.7578 1.34784C15.5351 1.12512 15.233 1 14.918 1H5.88475L1 5.44948V18.9591C1 19.1151 1.03072 19.2695 1.0904 19.4136C1.15008 19.5577 1.23756 19.6886 1.34784 19.7989C1.45812 19.9092 1.58904 19.9966 1.73313 20.0563C1.87721 20.116 2.03164 20.1467 2.1876 20.1467H14.918C15.074 20.1467 15.2284 20.116 15.3725 20.0563C15.5166 19.9966 15.6475 19.9092 15.7578 19.7989C15.8681 19.6886 15.9556 19.5577 16.0153 19.4136C16.0749 19.2695 16.1057 19.1151 16.1057 18.9591V17.1804" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.20947 5.52991H5.70194V1.34375" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.48779 10.5703H7.65246" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.48779 13.2852H7.65246" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.48779 15.9922H8.86156" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.3047 17.1748C18.0173 17.1748 20.2163 14.9758 20.2163 12.2632C20.2163 9.55057 18.0173 7.35156 15.3047 7.35156C12.5921 7.35156 10.3931 9.55057 10.3931 12.2632C10.3931 14.9758 12.5921 17.1748 15.3047 17.1748Z" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.6177 11.8606L15.3803 13.2846L17.5674 10.4043" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={svgString} />
};

export default FaqsSvg;
