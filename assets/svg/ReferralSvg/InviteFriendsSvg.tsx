import React from "react";
import { SvgXml } from "react-native-svg";

const InviteFriendsSvg = ({ width, height, activeColor }: any) => {
  const svgString = `
    <svg 
      width="${width}" 
      height="${height}" 
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)" fill="#C4963D">
        <path d="M9 6.942c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25 2.25-1.01 2.25-2.25-1.01-2.25-2.25-2.25zm0 3a.751.751 0 010-1.5.751.751 0 010 1.5z" />
        <path d="M15.618 10.755a7.573 7.573 0 01-.522-.231c.754-.795 1.445-1.833 2-3.336a2.524 2.524 0 00-.755-2.8l-3.716-3.122A2.182 2.182 0 0010.71.808a2.133 2.133 0 00-1.482 1.23A7.764 7.764 0 018.05 3.97a6.265 6.265 0 01-.834-1.542C6.65.954 5.272 0 3.71 0H1.583C.835 0 .141.51.02 1.25a1.496 1.496 0 001 1.664c-.165.24-.27.524-.27.837 0 .654.423 1.205 1.008 1.41-.213.314-.31.712-.23 1.134.138.717.817 1.205 1.547 1.205h.33a9.857 9.857 0 00-2.345 2.91 2.561 2.561 0 00.59 3.171L5.41 16.74a2.164 2.164 0 001.77.476 2.232 2.232 0 001.545-1.094 8.291 8.291 0 011.773-2.18v.983c0 .73.488 1.41 1.205 1.546.422.081.82-.016 1.134-.229a1.496 1.496 0 001.41 1.008c.313 0 .597-.105.837-.27.226.665.9 1.125 1.665 1 .738-.121 1.248-.816 1.248-1.563v-2.172a3.737 3.737 0 00-2.382-3.49h.002zM3.228 3a.768.768 0 01-.722-.563.741.741 0 01.716-.937h.487c.938 0 1.765.576 2.109 1.468a7.557 7.557 0 001.15 2.041c-.482.379-.994.707-1.534 1.049l-.328.21c-1.002.292-1.436-.72-1.601-1.12-.252-.61.245-.648.245-.648a.75.75 0 000-1.5h-.523zm8.428 8.283c-1.387.879-2.958 1.875-4.23 4.092a.735.735 0 01-.507.364.652.652 0 01-.543-.147l-3.762-3.159a1.057 1.057 0 01-.235-1.309c1.114-2.058 2.447-2.903 3.859-3.799 1.575-1 3.204-2.032 4.365-4.686a.636.636 0 01.449-.37.69.69 0 01.607.145l3.718 3.123c.329.276.458.74.314 1.13-.993 2.687-2.403 3.581-4.035 4.616zm4.844 3.494c0 .49-.464.846-.938.716a.766.766 0 01-.562-.72v-.523a.75.75 0 10-1.5 0s-.092.458-.563.245c-.255-.115-1.18-.41-.95-1.643l.472-.302c.481-.305.967-.615 1.443-.97.346.206.732.4 1.164.57a2.244 2.244 0 011.434 2.095v.533z" />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H18V18H0z" />
        </clipPath>
      </defs>
    </svg>
  `;

  return <SvgXml xml={svgString} width={width} height={height} />;
};

export default InviteFriendsSvg;
