import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const LabelValue = ({ label, value }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        color: colors.GREY_FONT_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16
    },
    value: {
        borderWidth: 0.2,
        borderColor: colors.YELLO_THEME_COLOR,
        padding: 10,
        borderRadius: 5,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18
    },
});

export default LabelValue;
