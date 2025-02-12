import { StyleSheet } from 'react-native'
import { colors } from '../../../Utils/Constant/Colors'
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts'


const FavoriteStyle = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.BLACK_BACKGROUND_COLOR },
    textStyle: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.YELLO_THEME_COLOR
    }

})

export default FavoriteStyle