import React from "react";
import { SvgXml } from "react-native-svg";

const BackArrowSvg = ({ width, height, activeColor }: any) => {
  const svgString = `
   <svg xmlns="http://www.w3.org/2000/svg" width=${width}
      height=${height} viewBox="0 0 24 24"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" fill="#FFFFFF" /></svg>
  `;

  return <SvgXml xml={svgString} width={width} height={height} />;
};

export default BackArrowSvg;
