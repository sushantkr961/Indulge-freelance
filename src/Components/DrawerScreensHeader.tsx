import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React from 'react'
import { colors } from '../Utils/Constant/Colors'
import { Fonts, FontSize, FontWeight } from '../Utils/Constant/Fonts'
import BackArrowSvg from '../../assets/svg/BackArrow';

interface DrawerScreensHeaderProps {
    title: string;
    leftButtonAction: () => void;
    style?: object;  // Optional style prop
    titleStyle?: object; // Optional title text style prop
}

const DrawerScreensHeader: React.FC<DrawerScreensHeaderProps> = ({ title, leftButtonAction, style, titleStyle }) => {
    return (
        <View style={[styles.mainView, style]}>
            <TouchableOpacity onPress={leftButtonAction}>
                {/* <Image source={require("../../assets/intro/BackArrow3.png")} /> */}
                <BackArrowSvg />
            </TouchableOpacity>
            <Text style={[styles.headerText, titleStyle]}>
                {title}
            </Text>
        </View>
    )
}
export default DrawerScreensHeader

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.BLACK_BLUE_DARK,
        marginTop: Platform.OS === 'ios' ? 45 : 10,
        alignItems: 'center'
    },
    headerText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300,
        color: colors.WHITE_COLOR,
        marginStart: 20
    }
})