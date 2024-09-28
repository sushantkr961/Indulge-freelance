import React from 'react';
import { SvgXml } from 'react-native-svg';

const ProfileSvg = ({ width, height, activeColor }: any) => {
    const svgString = `<svg width=${width} height=${height} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3504 10.2751C12.9117 10.2751 14.988 8.19881 14.988 5.63756C14.988 3.07631 12.9117 1 10.3504 1C7.7892 1 5.71289 3.07631 5.71289 5.63756C5.71289 8.19881 7.7892 10.2751 10.3504 10.2751Z" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.8619 20.1675C18.5883 15.5676 14.8482 12.2305 10.431 12.2305C6.01372 12.2305 2.27358 15.5676 1 20.1675" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;

    return <SvgXml xml={svgString} />
};

export default ProfileSvg;
