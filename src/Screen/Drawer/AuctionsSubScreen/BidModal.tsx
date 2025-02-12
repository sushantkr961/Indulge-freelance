import React, { useState, useRef } from 'react';
import {
  Modal, View, Text, TouchableOpacity,
  StyleSheet, PanResponder, Animated,
  Image,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';
import BidButton from '../../../Components/BidButton';
import RenderSubTextView from '../../../Components/RenderSubTextView';
import { colors } from '../../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const BidModal = ({
  visible, onClose,
  item, myBidValue,
  setMyBidValue,
  confirmCheck,
  setConfirmCheck,
  onConfirm,
  bidConfirm,
  setBidConfirm, category, name, timeLeft, startingBid, currentBid
}: any) => {
  const panY = useRef(new Animated.Value(0)).current;
  const [validationError, setValidationError] = useState<string>('')
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dy: panY }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
          Animated.timing(panY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
          }).start();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            bounciness: 10,
            useNativeDriver: false
          }).start();
        }
      },
    })
  ).current;

  const translateY = panY.interpolate({
    inputRange: [-500, 0, 500],
    outputRange: [-500, 0, 500],
    // extrapolate: 'clamp'
  });
  const onClickOnConfirm = () => {
    if (item.lastBiddedAmount > myBidValue) {
      setValidationError("Set value gretar than starting bid and current bid!")
      return;
    } else {
      setValidationError('')
    }
    if (confirmCheck) {
      onConfirm(item)
    } else {
      Alert.alert("Please confirm you are above 18+ and you read T&C");
    }
  }
  const CloseIcon = () => {
    return (
      <TouchableOpacity
        onPress={onClose}
        style={styles.closeIcon}
      >
        <Image
          source={require('../../../../assets/drawer/Close.png')}
          style={styles.plusIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    )
  }
  const setBidValue = (text: any) => {
    setMyBidValue(text)
    if (item.lastBiddedAmount > text) {
      setValidationError("Set value gretar than starting bid and current bid!")
    } else {
      setValidationError('')
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >{
        bidConfirm ?
          <View style={styles.modalBackground}>
            <View style={styles.halfContainer} />
            <View style={[styles.modalContainer, { backgroundColor: colors.WHITE_COLOR }]}>
              <View style={styles.barLineStyle} />
              <View style={styles.rightIconContainer}>

                <Image
                  source={require('../../../../assets/drawer/auction/RightYellowCircle.png')}
                  resizeMode="contain"
                />
                <Text style={styles.thanksTextStyle}>
                  {`Thank you for submitting your bid.

We will review all proposals and notify the successful bidder for further steps in the process`}</Text>
              </View>
              <CloseIcon />
            </View>
          </View>
          :
          <ScrollView contentContainerStyle={styles.modalBackground}>
            <View style={styles.halfContainer} />
            <Animated.View
              style={[styles.modalContainer, //{ transform: [{ translateY }] }
              ]}
            // {...panResponder.panHandlers}
            >
              <View style={styles.barLineStyle} />
              <View style={styles.subcontainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.title1}>{category}</Text>
                <View style={styles.subTitleContainer}>
                  <RenderSubTextView string1={'Starting Bid'} string2={startingBid} />
                  <RenderSubTextView string1={'Current Bid'} string2={currentBid} />
                  {item?.auctionStartTime && <RenderSubTextView string1={'Hours Left'} string2={timeLeft} />}
                </View>
                <View style={styles.ourBidContainerStyle}>
                  {/* <Text style={styles.myBidValueStyle}>$</Text> */}
                  <TextInput
                    focusable
                    style={styles.myBidValueStyle}
                    placeholder={'$25'}
                    value={`${myBidValue}`}
                    onChangeText={(text: any) => setBidValue(text)}
                  />
                  <TouchableOpacity onPress={() => { setMyBidValue(myBidValue + 10) }}>
                    <Image
                      source={require('../../../../assets/drawer/auction/PlusYellow.png')}
                      style={styles.plusIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                {validationError && <Text style={styles.myBidValueStyle1}>
                  {validationError}
                </Text>}
                <View style={styles.tAndCContainerStyle}>
                  <TouchableOpacity onPress={() => { setConfirmCheck(!confirmCheck) }}>
                    {confirmCheck ? <Image
                      source={require('../../../../assets/drawer/auction/RightYellow.png')}
                      style={styles.plusIcon}
                      resizeMode="contain"
                    />
                      :
                      <View style={styles.confirmCheckIconBlankStyle} />
                    }
                  </TouchableOpacity>
                  <Text style={styles.tAndCTextStyle}>
                    {`I confirm I am 18+ years of age and by continuing, I agree to Indulge's`}
                  </Text>
                </View>
                <Text style={styles.tAndCTextStyle1}>
                  {`Terms of Service | T&Cs | Privacy Policy`}
                </Text>
                <BidButton label='Confirm' onPress={onClickOnConfirm} />
                <View style={{ marginTop: 20 }} />
              </View>
              <CloseIcon />
            </Animated.View>
          </ScrollView>
      }
    </Modal >
  );
};

export default BidModal

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
  },
  halfContainer: { flex: 0.35 },
  modalContainer: {
    flex: 0.65,
    backgroundColor: colors.BLACK_BLUE_DARK,
    padding: 20,
    borderRadius: 10,
    width: '100%'
  },
  barLineStyle: {
    backgroundColor: colors.GREY_DARK_LINE_COLOR,
    borderWidth: 2,
    width: '30%',
    borderColor: colors.GREY_DARK_LINE_COLOR,
    borderRadius: 10,
    marginStart: '35%'
  },
  confirmCheckIconBlankStyle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.YELLO_THEME_COLOR
  },
  subcontainer: {
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_24,
    textAlign: 'left'
  },
  title1: {
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16,
    textAlign: 'left'
  },
  ourBidContainerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.BACK_BLUE_DARK,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  myBidValueStyle: {
    flex: 1,
    textAlign: 'center',
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_18
  },
  myBidValueStyle1: {
    textAlign: 'center',
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_12
  },
  tAndCContainerStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 60
  },
  tAndCTextStyle: {
    flex: 1,
    textAlign: 'left',
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16,
    marginStart: 10
  },
  tAndCTextStyle1: {
    textAlign: 'left',
    color: colors.YELLO_THEME_COLOR_TEXT,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.F_16,
    marginStart: 45,
    marginTop: 20,
    marginBottom: 40
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40
  },
  plusIcon: {
    width: 35,
    height: 35
  },
  rightIconContainer: {
    marginTop: 80
  },
  thanksTextStyle: {
    fontFamily: Fonts.REGULAR,
    fontSize: 20,
    textAlign: 'left',
    color: colors.BLACK_BACKGROUND_COLOR,
    marginTop: 25
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.BLACK_GREY_DIVIDER,
    borderRadius: 100
  },
});

