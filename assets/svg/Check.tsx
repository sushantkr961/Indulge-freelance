import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const Check = () => {
    const svgString = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_51_2639)">
<path d="M0.0771266 3.73507L1.22188 4.87982C1.54379 5.20163 2.0656 5.20163 2.38751 4.87982L5.92287 1.34446C6.0283 1.2353 6.02527 1.06135 5.91611 0.955922C5.80963 0.853072 5.6408 0.853072 5.53432 0.955922L1.99897 4.49129C1.89166 4.59855 1.71772 4.59855 1.61043 4.49129L0.465678 3.34653C0.356517 3.24111 0.182566 3.24414 0.0771394 3.3533C-0.025711 3.45978 -0.025711 3.62859 0.0771266 3.73507Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_51_2639">
<rect width="6" height="6" fill="white"/>
</clipPath>
</defs>
</svg>
  `;

    return (
        <View style={[styles.container]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default Check;

const styles = StyleSheet.create({
    container: {
        width: 10,
        height: 10,
    },
});
