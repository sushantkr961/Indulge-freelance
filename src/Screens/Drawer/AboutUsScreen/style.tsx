import { StyleSheet } from 'react-native'
import { colors } from '../../../Utils/Constant/Colors'
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts'


const AboutUsStyle = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.BLACK_BACKGROUND_COLOR, paddingHorizontal: 20 },
    textStyle: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        marginTop: 10
    }

})

export default AboutUsStyle