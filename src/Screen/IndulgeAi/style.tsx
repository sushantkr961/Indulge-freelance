import { StyleSheet } from 'react-native'
import { colors } from '../../Utils/Constant/Colors'
import { Platform } from 'react-native'


const IndulgeAiStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 24,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        paddingHorizontal: 20
    },
    announcementContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    announcementText: {
        color: "#000000",
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 18
    },
    indulgeGptText: {
        color: "#000000",
        fontWeight: "600",
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 25
    },
    indulgeText: {
        color: "#000000",
        lineHeight: 18,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    searchContainer: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingStart: 15,
        borderRadius: 10
    },
    seachImage: {
        width: 32,
        height: 32,
        marginLeft: "3%",
        tintColor: '#373737'
    },
    search: {
        padding: "3%",
        color: "#373737",
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 16,
        flex: 1
    },
    sendIcon: {
        width: 32,
        height: 32,
        marginRight: "3%"
    },
    promptsContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3%"
    },

    chatgptText: {
        color: "#FFFFFF",
        backgroundColor: "#2828288C",
        width: 140,
        height: 70,
        marginLeft: "5%",
        textAlignVertical: "center",
        textAlign: "left",
        paddingLeft: 20,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 13,
        lineHeight: 18,
        borderRadius: 20
    },

    chatgptText2: {
        color: "#FFFFFF",
        backgroundColor: "#2828288C",
        width: 140,
        height: 70,
        marginLeft: "5%",
        textAlignVertical: "center",
        textAlign: "left",
        paddingLeft: 20,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 13,
        lineHeight: 18,
        borderRadius: 20
    },
    chatgptText3: {
        color: "#FFFFFF",
        backgroundColor: "#2828288C",
        width: 140,
        height: 70,
        marginLeft: "5%",
        borderRadius: 20,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 13,
        lineHeight: 18,
        textAlignVertical: "center",
        textAlign: "left",
        paddingLeft: 15
    },
    chatgptResponse: {
        backgroundColor: "#2828288C",
        borderRadius: 11,
        width: 300,
        height: 250,
        alignSelf: "center",
        marginTop: "2%"
    },
    chatgptResponseText: {
        color: "#FFFFFF",
        lineHeight: 18,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 15,
        margin: 10
    },
    concerienceContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    conciergeText: {
        color: "#ffffff",
        textAlign: 'center',
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 15,
        lineHeight: 20,
        padding: 15,
        fontWeight: '600'
    },
    headerContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        marginTop: 5
    },
    conciergeTextWelcome: {
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 16,
        fontWeight: "600",
        color: colors.WHITE_COLOR
    },
    conciergeTextIndulgeTo: {
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 24,
        fontWeight: "600",
        color: colors.WHITE_COLOR
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    promptRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3%"
    },

    promptContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: colors.WHITE_COLOR,
        padding: 10,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        borderWidth: 2,
        borderColor: colors.WHITE_COLOR
    },
    textContainerPrompt: {
    },
    chatgptText1: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 16,
        fontWeight: '400',
        marginEnd: 10
    },
    chatgptText21: {
        color: colors.GREY_FONT_FONT_COLOR,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 15,
        fontWeight: '400',
        marginEnd: 10
    },
    arrowImage1: {
        alignSelf: 'left'
    },
    helpContainer: {
        paddingTop: '18%',
        paddingLeft: '9%'
    },
    searchIcon: {
    },
    searchText: {
        color: '#373737',
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 18,
        fontWeight: '400'
    },
    exploreTextContainer: {
        marginTop: '5%'
    },
    exploreText: {
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 20,
        fontWeight: '400',
        color: '#FFFFFF',
    },
    responseText: {
        color: '#ffffff',
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 18,
        fontWeight: '400',
        marginTop: '10%'
    },
    promptContainer1: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginTop: "5%"
    },
    iconViewProfile: {
        height: 45,
        width: 45,
        tintColor: colors.WHITE_COLOR,
        resizeMode: 'contain'
    },
})

export default IndulgeAiStyle