import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';

const LabelTextInput = ({ label, value, onChangeText, placeholder }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
                style={styles.textInput}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.GREY_FONT_FONT_COLOR}
            />
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
        fontSize: FontSize.F_16,
    },
    textInput: {
        borderWidth: 0.2,
        borderColor: colors.YELLO_THEME_COLOR,
        padding: 10,
        borderRadius: 5,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR, // Optional: Add background for better contrast
    },
});

export default LabelTextInput;