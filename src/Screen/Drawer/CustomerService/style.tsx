import { StyleSheet } from 'react-native'
import { colors } from '../../../Utils/Constant/Colors'


const CustomerServiceStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    textStyle0: {
        fontFamily: 'PF Beau Sans Pro-SemiBold',
        fontSize: 18,
        // fontWeight: '600',
        marginTop: 20,
        color: colors.BLACK_BACKGROUND_COLOR
    },
    textStyle1: {
        fontFamily: 'PF Beau Sans Pro-Bold',
        fontSize: 18,
        // fontWeight: 'bold',
        marginTop: 16,
        color: colors.BLACK_BACKGROUND_COLOR

    },
    textStyle2: {
        fontFamily: 'PF Beau Sans Pro-Light',
        fontSize: 18,
        // fontWeight: '300',
        marginTop: 16,
        color: colors.BLACK_BACKGROUND_COLOR

    }
})

export default CustomerServiceStyle