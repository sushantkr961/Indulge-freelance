import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

const SearchSvg = ({ width, height }: any) => {
    const svgString = `
    <svg width="45" height="45" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.0915 24.3493C19.2601 24.3493 23.45 20.1518 23.45 14.974C23.45 9.79611 19.2601 5.59863 14.0915 5.59863C8.92297 5.59863 4.73303 9.79611 4.73303 14.974C4.73303 20.1518 8.92297 24.3493 14.0915 24.3493Z" stroke="#373737" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M9.14307 10.6666C9.84636 9.53316 12.1907 7.71968 15.2383 8.62643" stroke="#C4963D" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M26.5757 27.4243C26.8101 27.6586 27.1899 27.6586 27.4243 27.4243C27.6586 27.1899 27.6586 26.8101 27.4243 26.5757L26.5757 27.4243ZM20.5757 21.4243L26.5757 27.4243L27.4243 26.5757L21.4243 20.5757L20.5757 21.4243Z" fill="#373737"/>
    </svg>
  `;

    return (
        <View style={[styles.container, { width, height }]}>
            <SvgXml xml={svgString} />
        </View>
    );
};

export default SearchSvg;

const styles = StyleSheet.create({
    container: {
        width: 25,
        height: 25,
    },
});
