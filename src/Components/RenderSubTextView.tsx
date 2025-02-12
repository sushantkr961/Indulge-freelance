import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Utils/Constant/Colors'
import { Fonts, FontSize } from '../Utils/Constant/Fonts'

const RenderSubTextView = ({ string1, string2 }: any) => {
    return (
        <View>
            <Text style={styles.title1}>{string1}</Text>
            <Text style={styles.title2}>{string2}</Text>
        </View>
    )
}

export default RenderSubTextView

const styles = StyleSheet.create({
    title1: {
        color: colors.GREY_DARK_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_14,
        textAlign: 'left'
    },
    title2: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        textAlign: 'left'
    },
})


