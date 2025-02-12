import { Platform, StyleSheet } from 'react-native'
import { colors } from '../../../Utils/Constant/Colors'
import { Fonts, FontSize, FontWeight } from '../../../Utils/Constant/Fonts'

const TAndCStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR
    },
    container0: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    textStyle0: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        fontWeight: FontWeight.F_W_300,
        textAlign: 'left',
        marginTop: 20,
        color: colors.YELLO_THEME_COLOR_TEXT
    },
    textStyle1: {
        marginTop: 16,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        fontWeight: FontWeight.F_W_400,
        color: colors.YELLO_THEME_COLOR_TEXT
    },
    textStyle2: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_400,
        color: colors.WHITE_COLOR,
        marginTop: 16
    },
    headerStyle: {
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        marginTop: Platform.OS === 'ios' ? 0 : 10,
        paddingStart: 20
    },
})

export default TAndCStyle