import { StyleSheet } from 'react-native'
import { colors } from '../../../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../../../Utils/Constant/Fonts';

const LoginMainScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        paddingHorizontal: 10
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 30
    },
    loginButton: {
        backgroundColor: "#C4963D",
        marginTop: "30%",
        width: 144,
        height: 42,
        padding: 7,
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButtonText: {
        textAlign: "center",
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300,
        textTransform: "capitalize",
    },
    validText: {
        color: "red",
        marginLeft: "48%",
    },
    phnNumber: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300,
        marginLeft: "6%"
    },
    logo: {
        width: 120,
        height: 90,
    },
    header: {
        alignItems: 'center',
        marginTop: '10%',
    },
    welcomeText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        fontWeight: FontWeight.F_W_300,
        textAlign: 'center',
        marginBottom: 5
    },
    signInText: {
        color: colors.YELLO_THEME_COLOR,
        fontFamily: Fonts.REGULAR,
        fontWeight: FontWeight.F_W_300,
        fontSize: FontSize.F_18,
        textAlign: 'center'
    },
    mainContainer: {
        marginTop: "30%"
    },
    innerContainer: {
        flexDirection: "row"
    },
    innerContainer1: {
        textAlign: "center",
        marginTop: 2
    },
    innerContainer2: {
        width: 130,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 9,
        backgroundColor: "#171717",
        borderBottomWidth: 1,
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 170,
        marginTop: 10,
        paddingHorizontal: 5
    },
    flagImage: {
        width: 30,
        height: 30,
        padding: 10,
        // marginTop: "8%",
        marginLeft: "8%",
    },
    callingcodeContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    callingcodeText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_400,
        marginLeft: "15%"
    },
    dropdownContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    phoneNumberContainer: {
        flex: 1,
        marginVertical: 11,
        borderBottomColor: "#111",
        borderBottomWidth: 1,
        height: 50,
        // width: 198,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        borderRadius: 170,
        backgroundColor: "#171717",
        textAlignVertical: "center",
        textAlign: "justify",
        marginLeft: 10,
        paddingLeft: 18,
    },
    digitContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    digitText: {
        textAlign: "center",
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18
    },
    loginContainer: {
        alignItems: "center",
        justifyContent: "center"
    }
})

export default LoginMainScreenStyle