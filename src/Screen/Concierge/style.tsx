import { Platform, StyleSheet } from 'react-native'
import { colors } from '../../Utils/Constant/Colors'
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts'

const ConciergeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
  },
  conciergeContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  conciergeText: {
    color: colors.WHITE_COLOR_30,
    fontSize: FontSize.F_28,
    fontFamily: Fonts.REGULAR
  },
  imageStyle: {
    width: '100%',
    height: 550,
    borderRadius: 16,
    marginTop: 30
  },
  imageStyle1: {
    width: '100%',
    height: 355,
    borderRadius: 16,
    marginTop: 30
  },
  conciergeText1: {
    color: colors.WHITE_COLOR,
    fontSize: FontSize.F_24,
    fontFamily: Fonts.REGULAR,
    marginTop: 30
  },
  conciergeText2View: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  conciergeText21: {
    color: colors.WHITE_COLOR_80,
    fontSize: FontSize.F_20,
    fontFamily: Fonts.REGULAR
  },
  conciergeText2: {
    color: colors.WHITE_COLOR_80,
    fontSize: FontSize.F_16,
    fontFamily: Fonts.REGULAR,
    marginTop: 10,
    marginStart: 10
  },
  conciergeText233: {
    color: colors.WHITE_COLOR_80,
    fontSize: FontSize.F_16,
    fontFamily: Fonts.REGULAR,
    borderBottomWidth: 1,
    borderColor: colors.WHITE_COLOR,
    marginStart: 10
  },
  speakToTeamView: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  conciergeText3: {
    color: colors.WHITE_COLOR_30,
    fontSize: FontSize.F_20,
    fontFamily: Fonts.REGULAR,
    marginTop: 10
  },
  conciergeText31: {
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontSize: FontSize.F_26,
    fontFamily: Fonts.REGULAR
  },
  conciergeText32: {
    color: colors.WHITE_COLOR_80,
    fontSize: FontSize.F_16,
    fontFamily: Fonts.REGULAR,
    marginTop: 20
  },
  conciergeText4: {
    color: colors.WHITE_COLOR_78,
    fontSize: FontSize.F_20,
    fontFamily: Fonts.REGULAR,
    marginTop: 20,
  },
  conciergeText50View: {
    flexDirection: 'row',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: "#202020"
  },
  rightArrowIcon: {
    marginStart: 10
  },
  conciergeButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.YELLO_THEME_COLOR,
    borderRadius: 5,
    marginHorizontal: 50,
    padding: 5,
    marginBottom: 5
  },
  conciergeButtonView1: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 5
  },
  conciergeButtonText: {
    color: colors.WHITE_COLOR,
    fontSize: FontSize.F_20,
    fontFamily: Fonts.REGULAR,
  },
  conciergeButtonText1: {
    color: colors.WHITE_COLOR_78,
    fontSize: FontSize.F_16,
    fontFamily: Fonts.REGULAR,
  },
  conciergeButtonText2: {
    color: colors.WHITE_COLOR,
    fontSize: FontSize.F_16,
    fontFamily: Fonts.REGULAR
  },
  activeButtonContainer: {
    backgroundColor: colors.BACK_BLUE_DARK,
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 2
  },
  conciergeCheckButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    // backgroundColor: colors.WHITE_COLOR
  },
  conciergeText6View: {
    marginTop: 20,
    zIndex: 1,
    alignItems: 'flex-end'
  },
  conciergeText61View: {
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  backgroundLogo: {
    zIndex: 1,
    marginTop: -100,
    flexDirection: 'row',
    width: 180,
    height: 180
  },
  webView: {
    marginTop: 20,
    width: '100%',
    height: 300
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    marginHorizontal: 20
  },
  logoProfile: {
    width: 36,
    height: 36,
    resizeMode: 'contain'
  },
  logoClose: {
    width: 42,
    height: 42,
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  addButton: {
    marginStart: 20
  },
  logo: {
    height: 60,
    width: 60,
    tintColor: colors.WHITE_COLOR,
    resizeMode: 'contain'
  },
  conciergeTextLink: {
    fontFamily: 'PF Beau Sans Pro-Regular',
    fontSize: 16,
    color: colors.BLUE_DARK,
    marginTop: 10
  },
  planView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 20
  },
  roundView: {
    height: 8,
    width: 8,
    borderRadius: 100,
    backgroundColor: colors.YELLO_THEME_COLOR,
    marginEnd: 10,
    marginTop: 4
  },
  planViewText: {
    flex: 1,
    color: colors.WHITE_COLOR,
    fontSize: FontSize.F_14,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_500
  },
  planViewText1: {
    flex: 1,
    color: colors.WHITE_COLOR,
    fontSize: FontSize.F_14,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_300
  },
  headerStyle: {
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    // paddingStart: 20
  },
  coupanCodeContainer: {
    backgroundColor: colors.BACK_BLUE_DARK,
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 15,
    flexDirection: 'row'
  },
  applyText: {
    flex: 1,
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontSize: FontSize.F_12,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_600,
    textAlign: 'right',
  },
  coupanCodeContainer1: {
    backgroundColor: colors.BACK_BLUE_DARK,
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 23,
    paddingHorizontal: 24,
    bottom: 0,
    borderWidth: 1,
    backgroundColor: colors.BLACK_BLUE_DARK,
    paddingBottom: '60%'
  },
  lineView: {
    height: 5,
    justifyContent: "center",
    borderRadius: 2,
    marginBottom: 20,
    width: 80,
    alignSelf: "center",
    top: 5,
    backgroundColor: colors.GREY_DARK_LINE_COLOR,
  },
  modalFirestVIew: {
    flexDirection: 'row', flex: 1
  },
  modalTitel: {
    color: colors.WHITE_COLOR,
    fontSize: FontSize.F_20,
    fontFamily: Fonts.BOLD,
    marginTop: 10
  },
  closeIconContainer: {
    position: 'absolute',
    padding: 10,
    right: 0
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
    fontSize: FontSize.F_16,
    borderRadius: 8,
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    marginTop: 10,
    paddingStart: 20
  },
  addCouponVIew: { flexDirection: 'row', flex: 1, paddingStart: 10 },
  appliedView: {
    flexDirection: 'row', position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center'
  }
})


export default ConciergeStyle