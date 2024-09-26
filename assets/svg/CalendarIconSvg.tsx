import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const CalendarIconSvg = ({ width, height, activeColor }: any) => {
    const svgString = `<svg width=${width} height=${height} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.17383 12.7437H13.4882" stroke=${activeColor} stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M8.1748 16.6646H19.6809" stroke=${activeColor} stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M8.17383 20.6284H19.6799" stroke=${activeColor} stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M9.11311 1.99951V6.91277M19.2207 1.99951V6.91277M22.6369 4.62883H5.04626C4.41567 4.63015 3.81131 4.86651 3.36542 5.28618C2.91952 5.70585 2.6684 6.27465 2.66699 6.86815V23.4241C2.6684 24.0175 2.91952 24.5864 3.36542 25.006C3.81131 25.4257 4.41567 25.662 5.04626 25.6634H22.6369C23.2675 25.662 23.8719 25.4257 24.3178 25.006C24.7637 24.5864 25.0148 24.0175 25.0162 23.4241V6.86815C25.0148 6.27465 24.7637 5.70585 24.3178 5.28618C23.8719 4.86651 23.2675 4.63015 22.6369 4.62883Z" stroke=${activeColor} stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round"/>
</svg>
  `;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default CalendarIconSvg;

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
    },
});
