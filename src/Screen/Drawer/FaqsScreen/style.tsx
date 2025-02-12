import { Platform, StyleSheet } from 'react-native'
import { colors } from '../../../Utils/Constant/Colors'


const FAQSStyle = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: colors.BLACK_BACKGROUND_COLOR, paddingHorizontal: 20 },
    textStyle: {
        fontFamily: 'PF Beau Sans Pro-Bold',
        fontSize: 20, //fontWeight: 'bold',
        color: colors.YELLO_THEME_COLOR,
    },
    headerStyle: {
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        marginTop: Platform.OS === 'ios' ? 0 : 10,
        // paddingStart: 20
    },

})

export default FAQSStyle