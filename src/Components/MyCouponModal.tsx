import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import React from 'react'
import { colors } from '../Utils/Constant/Colors';
import { Checkbox } from 'react-native-paper';
import { Fonts, FontSize, FontWeight } from '../Utils/Constant/Fonts';
import ModalComponent from './ModalComponent';
import CloseModalSvg from '../../assets/svg/HelpWithYouSvg/CloseModalSvg';
import BidButton from './BidButton';
import CouponView from '../Screen/Concierge/CouponView';

const MyCouponModal = ({ visible, setVisible, coupan, onChangeSearchText, setCoupanApply,
  myCouponData, appliedCoupon, callApplyCoupon, fetchCouponData, cancelCoupon }: any) => {
  return (
    <ModalComponent
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>
          <View style={styles.lineView} />
          <View style={styles.modalFirestVIew}>
            <Text style={styles.modalTitel}>Add Coupon</Text>
            <TouchableOpacity style={styles.closeIconContainer}
              onPress={() => setVisible(false)}>
              <CloseModalSvg
                width={30}
                height={30}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.modalFirestVIew,
              {
                // marginBottom: '50%',
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
                alignContent: 'center'
              },
            ]}
          >
            <TextInput
              style={styles.searchInput}
              value={coupan}
              onChangeText={onChangeSearchText}
              placeholder="Coupan Code"
              placeholderTextColor={colors.GREY_DARK_LINE_COLOR}
            />
            <TouchableOpacity style={styles.closeIconContainer} onPress={() => { setCoupanApply(coupan) }}>
              <Text style={styles.applyText}>APPLY</Text>
            </TouchableOpacity>
          </View>
          {Array.isArray(myCouponData) && myCouponData.length > 0 && (
            <CouponView
              appliedCoupon={appliedCoupon}
              callApplyCoupon={callApplyCoupon}
              fetchCouponData={fetchCouponData}
              myCouponData={myCouponData}
              cancelCoupon={cancelCoupon} />
          )}
          {/* <BidButton
            label={"Know More"}
            onPress={() => {
              setCoupanApply(true), setVisible(false);
            }}
          /> */}
        </View>
      </View>
    </ModalComponent>
  )
}

export default MyCouponModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.BLACK_BACKGROUND_COLOR,
  },
  bottomSheet: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 23,
    paddingHorizontal: 24,
    bottom: 0,
    borderWidth: 1,
    // paddingBottom: '50%',
    backgroundColor: colors.BLACK_BLUE_DARK,
    // height:'50%'
  },
  lineView: {
    // flex: 0.5,
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
    flexDirection: 'row', position: 'absolute', right: 10
  },
  applyText: {
    flex: 1,
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontSize: FontSize.F_12,
    fontFamily: Fonts.REGULAR,
    fontWeight: FontWeight.F_W_600,
    textAlign: 'right',
    marginTop: 10
  },

})