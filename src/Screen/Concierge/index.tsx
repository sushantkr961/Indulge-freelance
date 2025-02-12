import {
  Linking,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  ToastAndroid,
  Alert,
  Platform,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import ConciergeStyle from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import VideoPlayModal from "../../Components/VideoPlayModal";
import FaqsQuestion from "../../Components/FaqsQuestion";
import {
  useNavigation,
  DrawerActions,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { FAQSDATA } from "../../Utils/index";
import { colors } from "../../Utils/Constant/Colors";
import CheckIconSvg from "../../../assets/svg/CheckIconSvg";
import DrawerScreensHeader from "../../Components/DrawerScreensHeader";
import CallingIconSvg from "../../../assets/svg/CallingIconSvg";
import ModalComponent from "../../Components/ModalComponent";
import CloseModalSvg from "../../../assets/svg/HelpWithYouSvg/CloseModalSvg";
import BidButton from "../../Components/BidButton";
import AddCouponSvg from "../../../assets/svg/AddCouponSvg";
import { fetchMyCouponData } from "../../StoreRedux/MyCouponSlice";
import { useAppDispatch, useAppSelector } from "../../StoreRedux/hooks/Hooks";
import MyCouponCode from "../../Components/MyCouponCode";
import MyCouponModal from "../../Components/MyCouponModal";
import CouponView from "./CouponView";
import RazorpayCheckout from 'react-native-razorpay';
import { FontWeight } from "../../Utils/Constant/Fonts";
import { getInitiateSubPaymentDataApi, getVerifySubPaymentDataApi } from "../../Service/CouponApi/CouponApiServices";
import QueueModal from "./QueueModal";
import SubscriptionComponent from "./SubscriptionComponent";
import { fetchMyPlansData } from "../../StoreRedux/MyPlansSlice";
const ConciergeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const firstLink = "https://buy.stripe.com/dR62bSaMdfwxa8o2v6";
  const secondLink = "https://buy.stripe.com/8wM03K5rT845fsI3dn";

  const { whatsAppLink }: any = route.params;

  const [storedPhoneNumber, setStoredPhoneNumber] = useState("");
  const [videoModal, setVideoModal] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<number>();
  const [videoLink, setVideoLink] = useState("");
  const [faqsList, setFaqsList] = useState(FAQSDATA);
  const [visible, setVisible] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [coupan, setCoupan] = useState("");
  const [months, setMonths] = useState(24);

  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [coupanApply, setCoupanApply] = useState(false);
  const { myCouponData } = useAppSelector((state: any) => state.myCouponData);
  const { myPlansData } = useAppSelector((state: any) => state.myPlans);

  const { mobile_no, profileDetails } = useAppSelector((state) => state.profileDetails);
  console.log("profileDetails=============", profileDetails)
  useEffect(() => {
    fetchCouponData()
    setCoupanApply(false)
    setAppliedCoupon(null)
    if (whatsAppLink) {
      goBack();
    }
  }, [isFocused, whatsAppLink]);
  const goBack = () => {
    navigation.goBack();
  }
  const fetchCouponData = () => {

    dispatch(fetchMyPlansData())
    dispatch(fetchMyCouponData())
  }
  const cancelCoupon = (couponCode: any) => {
    Alert.alert(
      "",
      "Do you want to cancel this coupon?",
      [
        {
          text: "Cancel",
          style: "cancel", // No action for cancel
        },
        {
          text: "OK",
          onPress: () => setAppliedCoupon(null), // Set coupon to null if confirmed
        },
      ]
    );
  };

  const callApplyCoupon = (couponCode: any) => {
    // Find the coupon that matches the provided couponCode
    const matchedCoupon = myCouponData.find((coupon: any) => coupon.code === couponCode);
    setVisible(false)

    // If a matching coupon is found, set it to the applied coupon state
    if (matchedCoupon) {
      setAppliedCoupon(matchedCoupon);
      return matchedCoupon; // Optionally return the matched object
    } else {
      // If no match, handle the case (e.g., show an error message)
      Alert.alert("Coupon code not found.");
      setAppliedCoupon(null);
      return null;
    }
  };
  const calculateDiscountedValue = (actualValue: any) => {
    if (!appliedCoupon || !actualValue) {
      console.error("Invalid coupon or actual value");
      return actualValue.toLocaleString();
    }

    const { isFixed, amount, max } = appliedCoupon;
    let discountedValue;

    if (isFixed) {
      // Apply fixed discount
      discountedValue = actualValue - amount;
    } else {
      // Apply percentage discount if `amount` is less than 100 (considered as a percentage)
      if (amount > 0 && amount <= 100) {
        const discountAmount = (actualValue * amount) / 100;
        discountedValue = max
          ? discountAmount < max ? actualValue - discountAmount : actualValue - max : actualValue - discountAmount
        // discountedValue = actualValue - discountAmount;
      } else {
        console.error("Invalid percentage amount in coupon");
        return actualValue.toLocaleString();
      }
    }
    // console.log("maxmaxmaxmax======", discountedValue < max, actualValue, discountedValue, max,)

    // Ensure the discounted value doesn't exceed max
    // const finalDiscountedValue = max
    //   ? (discountedValue < max ? discountedValue : actualValue - max)
    //   : discountedValue;

    // console.log("discountedValue======", actualValue, discountedValue, finalDiscountedValue)

    return discountedValue.toLocaleString(); // Ensure the discounted value is not negative
  };

  const handleLinkPress = () => {
    // Linking.openURL(selectedButton);
    console.log("selectedButton:::", selectedButton)
    // if (!appliedCoupon) {
    //   Alert.alert("Apply coupon first.")
    //   return
    // }
    paymentInitiate()
  };
  const paymentInitiate = async () => {
    let body;
    if (!appliedCoupon) {
      body = {
        "amount": selectedButton,
        "currency": "INR",
        // "amount": enteredAmount,
        // "currency": "INR",
        "method": {
          "card": true, // Enable Card payments
          "netbanking": true, // Enable Netbanking
          "upi": true, // Enable UPI
          "wallet": true // Enable Wallets
        },
        callback_url: "https://indulgeconcierge.com/app",
      }
    } else {
      body = {
        "amount": selectedButton,
        "currency": "INR",
        "code": appliedCoupon._id,
        // "amount": enteredAmount,
        // "currency": "INR",
        "method": {
          "card": true, // Enable Card payments
          "netbanking": true, // Enable Netbanking
          "upi": true, // Enable UPI
          "wallet": true // Enable Wallets
        },
        callback_url: "https://indulgeconcierge.com/app",
      }
    }
    console.log("Bodyyyyyyy======", body)
    try {
      const responseData = await getInitiateSubPaymentDataApi(body);
      if (responseData.orderId) {
        callPaymentVerify(responseData)
      } else {
        Alert.alert(`Payment Initiate Failed Please Try Again.`);
        return
      }
    } catch (err) {
      console.log("Error======", err)
      Alert.alert(`Payment Failed: ${err}`);
      return
    }
  }
  const callPaymentVerify = async (responseData: any) => {
    const options = {
      description: 'Indulge Payment Gateway.',
      image: require('../../../assets/logo/IndulgeLogoWhite.png'),
      currency: responseData.currency,
      key: 'rzp_live_ONUiigzmQWNudo', //'rzp_test_JCF64UCvscV4ay',
      amount: responseData.amount,
      name: 'Indulge',
      order_id: responseData.orderId,
      prefill: {
        contact: mobile_no,
        name: profileDetails.name
      },
      theme: { color: '#C4963D', FontWeight: FontWeight.F_W_300 }
    }
    console.log("options========", options)
    RazorpayCheckout.open(options).then(async (data: any) => {
      // handle success
      console.log("error========VERIFYYYYYY===000011111", data)

      const responseData = await getVerifySubPaymentDataApi(data);
      console.log("error========VERIFYYYYYY===0000000", responseData)

      if (responseData) {
        // dispatch(fetchWalletBalanceData(mobile_no, region))
        // Alert.alert(`Payment successful. Our team will contact you soon.`);
        openModal()
      }
    }).catch((error: any) => {
      console.log("error========VERIFYYYYYY===111111", error)
      let errorMessage = 'Payment Failed'; // Default error message

      // Handle different Razorpay error codes
      switch (error?.code) {
        case 0:
          // Example: Payment failed due to a technical issue (bad request)
          errorMessage = 'Payment Failed: Please try again.';
          break;

        case 1:
          // Payment canceled by the user
          errorMessage = 'Payment Canceled by User';
          break;

        case 2:
          // Example: Network error
          errorMessage = 'Payment Failed: Network Error. Please check your internet connection and try again.';
          break;

        default:
          // Unknown or undefined errors
          try {
            const errorDetails = JSON.parse(error.description).error;
            const { code, description, source, step, reason } = errorDetails;
            errorMessage = `Payment Failed\nCode: ${code}\nDescription: ${description}\nSource: ${source}\nStep: ${step}\nReason: ${reason}`;
          } catch (parseError) {
            // Fallback if error parsing fails
            errorMessage += `\nDescription: ${error.message ? error.message : 'Unknown Error'}`;
          }
          break;
      }

      // Reset the input and show the alert
      Alert.alert(errorMessage);
    });
  }
  const openWhatsApp = (phoneNumber: string) => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(whatsappUrl);
        } else {
          if (Platform.OS === "android") {
            // Android: Show toast message
            ToastAndroid.showWithGravity(
              "WhatsApp is not installed on your device.",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            );
          } else {
            // iOS: Show alert dialog
            Alert.alert(
              "WhatsApp Not Installed",
              "WhatsApp is not installed on your device."
            );
          }
        }
      })
      .catch((err) => console.error("An error occurred", err))
      .finally(() => {
        setTimeout(() => {
          opendrawer()
        }, 20000);
      })
  };
  const onPressPriceButton = (link: string) => {
    setSelectedButton(link);
  };

  const openVideoModel = (videoName: any) => {
    setVideoLink(videoName);
    setVideoModal(true);
  };
  const opendrawer = () => {
    // navigation.dispatch(DrawerActions.openDrawer());
    navigation.navigate("Feed" as never);
  };
  const onNotificationPress = () => {
    navigation.navigate("CalendarNotifications" as never);
  };
  const onChangeSearchText = (text: string) => {
    // setSearchText(text);
    setCoupan(text);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);

  };
  const closeModalOnly = () => {
    // setModalVisible(false);
    openWhatsApp("+918483977708")

  };
  console.log("myPlansData.length", myPlansData?.length)
  return (
    <SafeAreaView style={ConciergeStyle.container}>
      <DrawerScreensHeader
        style={ConciergeStyle.headerStyle}
        title="Concierge"
        leftButtonAction={opendrawer}
      />
      <ScrollView nestedScrollEnabled={true}>
        <View style={ConciergeStyle.conciergeContainer}>
          <Text style={ConciergeStyle.conciergeText}>Concierge</Text>
          <Image
            source={require("../../../assets/screen/Concierge_First_Image.png")}
            style={ConciergeStyle.imageStyle1}
          />
          <Text style={ConciergeStyle.conciergeText1}>Concierge Benefits:</Text>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>
              Available 24/7, 365 days.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>
              Dedicated team of 7 Concierge Managers.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>
              Support across 180+ countries.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>
              Unlimited requests -Dining, Shopping, Travel, Global events and
              more.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>0 service charge.</Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>
              Annual Membership (Auto calculated every 2nd Jan).
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>
              Ease of use with Whatsapp.
            </Text>
          </View>
          <TouchableOpacity onPress={() => openVideoModel("VIDEO1.mp4")}>
            <Image
              source={require("../../../assets/screen/Concierge_Second_Image.png")}
              style={ConciergeStyle.imageStyle}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={ConciergeStyle.conciergeText3}>Access Your </Text>
          <Text style={ConciergeStyle.conciergeText31}>Private Concierge</Text>
          <Text style={ConciergeStyle.conciergeText32}>How it works? :</Text>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>
              INDULGE is an annual membership program.
            </Text>
          </View>
          <View style={ConciergeStyle.conciergeText2View}>
            <Text style={ConciergeStyle.conciergeText21}>.</Text>
            <Text style={ConciergeStyle.conciergeText2}>
              We have zero service charge for any of your requests.
            </Text>
          </View>
          <TouchableOpacity onPress={() => openVideoModel("VIDEO2.mp4")}>
            <Image
              source={require("../../../assets/screen/Concierge_Third_Image.png")}
              style={ConciergeStyle.imageStyle}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={ConciergeStyle.conciergeText1}>
            Activate Membership:
          </Text>
          {/* {appliedCoupon ? (
            <View style={ConciergeStyle.coupanCodeContainer1}>
              <View style={ConciergeStyle.addCouponVIew}>
                <AddCouponSvg />
                <Text style={[ConciergeStyle.planViewText, { paddingStart: 10 }]}>Add Coupon</Text>
              </View>
              <View style={ConciergeStyle.appliedView}>
                <Text style={ConciergeStyle.applyText}>Applied</Text>
                <Image
                  source={require("../../../assets/screen/Right_Arrow_YELLOW.png")}
                  style={ConciergeStyle.rightArrowIcon}
                />
              </View>
            </View>
          ) : ( */}
          <>
            <TouchableOpacity
              style={[ConciergeStyle.coupanCodeContainer]}
              onPress={() => {
                setVisible(true);
              }}
            >
              <Text style={[ConciergeStyle.planViewText]}>Add Coupon</Text>
              <Text style={[ConciergeStyle.applyText]}>APPLY</Text>
            </TouchableOpacity>
          </>
          {/* )} */}
          {appliedCoupon && <MyCouponCode
            item={appliedCoupon}
            appliedCoupon={appliedCoupon}
            callApplyCoupon={callApplyCoupon}
            cancelCoupon={cancelCoupon} />
          }
          {/* <SubscriptionComponent calculateDiscountedValue={calculateDiscountedValue} /> */}
          {myPlansData && myPlansData.length > 0 && (
            <SubscriptionComponent setSelectedButton={setSelectedButton} months={months} setMonths={setMonths} calculateDiscountedValue={calculateDiscountedValue} />
          )}

          {/* <View style={ConciergeStyle.conciergeText6View}>
            <ImageBackground
              source={require("../../../assets/screen/Logo_Icon_Concierge_screen.png")}
              style={ConciergeStyle.backgroundLogo}
            ></ImageBackground>
          </View> */}
          {myPlansData && myPlansData.length > 0 && (
            <TouchableOpacity onPress={handleLinkPress} style={{ zIndex: 1 }}>
              <LinearGradient
                colors={["#D39F3A", "#BD812D"]}
                style={ConciergeStyle.conciergeButtonView1}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={ConciergeStyle.conciergeButtonText2}>
                  Activate Now
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => openWhatsApp("+918483977708")}
            style={ConciergeStyle.speakToTeamView}
          >
            <CallingIconSvg width={26} height={26} />
            <Text style={ConciergeStyle.conciergeText233}>
              Speak to the team
            </Text>
          </TouchableOpacity>
          <Text style={ConciergeStyle.conciergeText4}>FAQs</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={faqsList}
            renderItem={(item) => <FaqsQuestion item={item} />}
            keyExtractor={(item) => item.id.toString()}
          // extraData={eventsSuggestedData} // You can directly pass the state here
          />

          <VideoPlayModal
            videoModal={videoModal}
            setVideoModal={setVideoModal}
            videoLink={videoLink}
          />
        </View>
      </ScrollView>

      <MyCouponModal
        setVisible={setVisible}
        coupan={coupan}
        setCoupanApply={callApplyCoupon}
        onChangeSearchText={onChangeSearchText}
        visible={visible}
        myCouponData={myCouponData}
        appliedCoupon={appliedCoupon}
        callApplyCoupon={callApplyCoupon}
        fetchCouponData={fetchCouponData}
        cancelCoupon={cancelCoupon}
      />
      <QueueModal
        visible={isModalVisible}
        onClose={closeModal}
        closeModalOnly={closeModalOnly}
        selectedButton={selectedButton}
        calculateDiscountedValue={calculateDiscountedValue}
      />
    </SafeAreaView>
  );
};

export default ConciergeScreen;




{/* <View style={ConciergeStyle.conciergeText61View}>
              <TouchableOpacity
                onPress={() => onPressPriceButton(40000)}
                style={[
                  ConciergeStyle.activeButtonContainer,
                  { marginEnd: 10 },
                  selectedButton === 40000 && {
                    borderColor: colors.YELLO_THEME_COLOR,
                  },
                ]}
              > */}
// <Text style={ConciergeStyle.conciergeButtonText}>
//   {appliedCoupon ? (
//     <>
{/* Original Price with strikethrough */ }
// <Text style={[ConciergeStyle.conciergeButtonText, { textDecorationLine: 'line-through', color: 'gray' }]}>
//   ₹40k
// </Text>
{/* Spacer between the original and discounted price */ }
// <Text> {"\n"}</Text>
// {/* Discounted Price */}
// <Text style={ConciergeStyle.conciergeButtonText}>
//   ₹{calculateDiscountedValue(40000)}
// </Text>
//   </>
// ) : (
// Show only the original price if no coupon is applied
// '₹40k'
//     )}
//   </Text>
//   <Text style={ConciergeStyle.conciergeButtonText1}>
//     + 18% tax
//   </Text>
//   {selectedButton === 40000 && (
//     <View style={ConciergeStyle.conciergeCheckButton}>
//       <CheckIconSvg
//         width={24}
//         height={24}
//         activeColor={colors.YELLO_THEME_COLOR}
//       />
//     </View>
//   )}
//   <View style={ConciergeStyle.planView}>
//     <View style={ConciergeStyle.roundView} />
//     <Text style={ConciergeStyle.planViewText1}>Monthy membership.</Text>
//   </View>
//   <View style={ConciergeStyle.planView}>
//     <View style={ConciergeStyle.roundView} />
//     <Text style={ConciergeStyle.planViewText1}>
//       ⁠Dedicated WhatsApp Group
//     </Text>
//   </View>
// </TouchableOpacity>
// <TouchableOpacity
//   onPress={() => onPressPriceButton(400000)}
//   style={[
//     ConciergeStyle.activeButtonContainer,
//     { marginStart: 10 },
//     selectedButton === 400000 && {
//       borderColor: colors.YELLO_THEME_COLOR,
//     },
//   ]}
// ><Text style={ConciergeStyle.conciergeButtonText}>
//     {appliedCoupon ? (
//       <>
{/* Original Price with strikethrough */ }
// <Text style={[ConciergeStyle.conciergeButtonText, { textDecorationLine: 'line-through', color: 'gray' }]}>
//   ₹3 lakh
// </Text>
{/* Spacer between the original and discounted price */ }
// <Text> {"\n"}</Text>
{/* Discounted Price */ }
                      // <Text style={ConciergeStyle.conciergeButtonText}>
                      //   ₹{calculateDiscountedValue(400000)}
                      // </Text>
                  //   </>
                  // ) : (
                    // Show only the original price if no coupon is applied
                    // '₹4 lakh'
                  // )}
                // </Text>
                // <Text style={ConciergeStyle.conciergeButtonText1}>
                //   + 18% tax
                // </Text>
                // {selectedButton === 400000 && (
                //   <View style={ConciergeStyle.conciergeCheckButton}>
                //     <CheckIconSvg
                //       width={24}
                //       height={24}
                //       activeColor={colors.YELLO_THEME_COLOR}
                //     />
                //   </View>
                // )}
                // <View style={ConciergeStyle.planView}>
                //   <View style={ConciergeStyle.roundView} />
                //   <Text style={ConciergeStyle.planViewText1}>
                //     Annual Membership
                //   </Text>
                // </View>
                // <View style={ConciergeStyle.planView}>
                //   <View style={ConciergeStyle.roundView} />
                //   <Text style={ConciergeStyle.planViewText1}>
                //     Dedicated WhatsApp Group
                //   </Text>
                // </View>
            //   </TouchableOpacity>
            // </View>