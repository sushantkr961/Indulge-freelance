import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const GridSvg = ({ width = 24, height = 24, color = '#000' }: { width?: number; height?: number; color?: string }) => {
  const rectSize = width / 2 - 2; // Calculate size for grid cells dynamically
  const spacing = 4; // Spacing between cells

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      {/* Top-left cell */}
      <Rect x="0" y="0" width={rectSize} height={rectSize} fill={color} rx="2" />
      {/* Top-right cell */}
      <Rect x={rectSize + spacing} y="0" width={rectSize} height={rectSize} fill={color} rx="2" />
      {/* Bottom-left cell */}
      <Rect x="0" y={rectSize + spacing} width={rectSize} height={rectSize} fill={color} rx="2" />
      {/* Bottom-right cell */}
      <Rect x={rectSize + spacing} y={rectSize + spacing} width={rectSize} height={rectSize} fill={color} rx="2" />
    </Svg>
  );
};

export default GridSvg;
