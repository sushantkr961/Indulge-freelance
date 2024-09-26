import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../Utils/Constant/Colors';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';

const GoldButton = ({ label, onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={['#D39F3A', '#BD812D']}
                style={styles.promptContainer}
                start={{ x: 0.5, y: 0.1 }}
                end={{ x: 0.9, y: 1 }}
            >
                <Text style={styles.chatgptText1}>{label}</Text>
            </LinearGradient>
        </TouchableOpacity >
    )
}

export default GoldButton

const styles = StyleSheet.create({
    promptContainer: {
        marginTop: 10,
        borderRadius: 12,
        padding: 10,
        paddingHorizontal: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: colors.WHITE_COLOR
    },
    chatgptText1: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16
    }
})