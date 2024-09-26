import React from 'react';
import { SvgXml } from 'react-native-svg';

const AirportProtocol = ({ width, height, activeColor }: any) => {
  const svgString = `<svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.42896 23.5854L7.21478 22.3524" stroke="white" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.42896 11.6324L9.20994 9.68317" stroke="white" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.45044 27.5179L12.2025 25.6445" stroke="white" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.2957 21.5694L14.9599 25.3273C14.8213 25.7173 15.1904 26.0964 15.5834 25.9687L16.8384 25.5617C16.9382 25.5288 17.0259 25.4659 17.0868 25.3811L22.9266 17.3905" stroke="#D39F3A" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M27.4675 11.6185L21.9748 13.4031L14.0201 7.80671C13.8944 7.71094 13.7308 7.69099 13.5792 7.74087L12.0519 8.23667C11.7486 8.33643 11.6159 8.70354 11.7875 8.97288L15.8078 15.4073L9.70754 17.3885C9.07208 17.596 8.38176 17.4743 7.85803 17.0563L6.07934 15.6517C5.95065 15.5479 5.77408 15.52 5.61347 15.5729L4.64581 15.8861C4.31362 15.9949 4.19092 16.3909 4.40639 16.6672L6.34968 19.1931C7.64654 20.8591 9.84022 21.5414 11.8414 20.891L31.4618 14.5154C32.1451 14.293 32.5162 13.5638 32.2938 12.8814C32.1591 12.4654 31.8269 12.1532 31.4079 12.0265L29.7799 11.5696C29.0187 11.3561 28.2177 11.3751 27.4675 11.6185Z" stroke="#D39F3A" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={svgString} />
};

export default AirportProtocol;
