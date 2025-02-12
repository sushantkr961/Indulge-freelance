import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const ListSvg = ({
  width = 25,
  height = 25,
  color = '#000',
  bulletWidth = 6, // Width of the bullet rectangles
  bulletSpacing = 4, // Space between bullets and rows
}: {
  width?: number;
  height?: number;
  color?: string;
  bulletWidth?: number;
  bulletSpacing?: number;
}) => {
  const rectHeight = height / 3 - 4; // Height for each list row
  const spacing = 6; // Spacing between rows
  const bulletHeight = rectHeight; // Bullet matches row height

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width + bulletWidth + bulletSpacing} ${height}`} fill="none">
      {/* Top row with bullet */}
      <Rect x="0" y="0" width={bulletWidth} height={bulletHeight} fill={color} rx="2" />
      <Rect x={bulletWidth + bulletSpacing} y="0" width={width} height={rectHeight} fill={color} rx="2" />
      {/* Second row with bullet */}
      <Rect x="0" y={rectHeight + spacing} width={bulletWidth} height={bulletHeight} fill={color} rx="2" />
      <Rect x={bulletWidth + bulletSpacing} y={rectHeight + spacing} width={width} height={rectHeight} fill={color} rx="2" />
      {/* Third row with bullet */}
      <Rect x="0" y={2 * (rectHeight + spacing)} width={bulletWidth} height={bulletHeight} fill={color} rx="2" />
      <Rect x={bulletWidth + bulletSpacing} y={2 * (rectHeight + spacing)} width={width} height={rectHeight} fill={color} rx="2" />
      {/* Fourth row with bullet */}
      {/* <Rect x="0" y={3 * (rectHeight + spacing)} width={bulletWidth} height={bulletHeight} fill={color} rx="2" />
      <Rect x={bulletWidth + bulletSpacing} y={3 * (rectHeight + spacing)} width={width} height={rectHeight} fill={color} rx="2" /> */}
    </Svg>
  );
};

export default ListSvg;
