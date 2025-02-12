import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const GuideToAuctionSvg = ({ width, height, activeColor }: any) => {
    const svgString = `<svg width=${width} height=${height} viewBox="0 0 382 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 0C10.8605 0 15.4773 5 20.3379 5H176.662C181.523 5 186.139 0 191 0C195.861 0 200.477 5 205.338 5H361.662C366.523 5 371.139 0 376 0C378.96 0 381.419 2.14321 381.911 4.96241C381.914 4.98403 381.933 5 381.955 5C381.98 5 382 5.02011 382 5.04493V6V6.95507C382 6.97989 381.98 7 381.955 7C381.933 7 381.914 7.01597 381.911 7.03759C381.419 9.85679 378.96 12 376 12C371.139 12 366.523 7 361.662 7H205.338C200.477 7 195.861 12 191 12C186.139 12 181.523 7 176.662 7H20.3379C15.4773 7 10.8605 12 6 12C3.04015 12 0.580867 9.85679 0.0893891 7.0376C0.0856198 7.01597 0.0668821 7 0.0449345 7C0.0201179 7 0 6.97988 0 6.95507V6V5.04493C0 5.02012 0.0201179 5 0.0449345 5C0.0668821 5 0.0856197 4.98403 0.0893891 4.9624C0.580867 2.14321 3.04015 0 6 0Z" fill="#D9D9D9"/>
</svg>
  `;
 
    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default GuideToAuctionSvg;

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
    },
});
