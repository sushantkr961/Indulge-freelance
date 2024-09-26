import React from 'react';
import { SvgXml } from 'react-native-svg';

const ShopingSvg = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.1136 14.957C21.1136 15.6663 20.5413 16.2413 19.8356 16.2413C19.1298 16.2413 18.5576 15.6663 18.5576 14.957C18.5576 14.2477 19.1298 13.6727 19.8356 13.6727C20.5413 13.6727 21.1136 14.2477 21.1136 14.957Z" fill="white"/>
  <path d="M13.4454 14.957C13.4454 15.6663 12.8732 16.2413 12.1674 16.2413C11.4616 16.2413 10.8894 15.6663 10.8894 14.957C10.8894 14.2477 11.4616 13.6727 12.1674 13.6727C12.8732 13.6727 13.4454 14.2477 13.4454 14.957Z" fill="white"/>
  <path d="M11.8679 8.74079C11.8515 7.18523 12.9045 3.5556 16.0159 3.5556C19.1272 3.5556 20.1481 7.18523 20.1481 8.74079" stroke="#D39F3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.912 9.07783C8.70913 9.07783 6.8018 10.6078 6.32393 12.7583L3.95356 23.4249C3.30129 26.3601 5.53482 29.1445 8.54164 29.1445H23.4576C26.4644 29.1445 28.698 26.3601 28.0457 23.4249L25.6753 12.7583C25.1974 10.6078 23.2901 9.07783 21.0872 9.07783H10.912Z" stroke="#D39F3A" stroke-width="1.4"/>
  <path d="M10.8147 21.1853H21.1851" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.8147 24.2964H21.1851" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={svgString} />
};

export default ShopingSvg;
