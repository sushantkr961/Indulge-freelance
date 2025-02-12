import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../Utils/Constant/Colors'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../StoreRedux/hooks/Hooks'
import LabelValue from '../Drawer/Cart/LabelValue'
import GoldButton from '../../Components/GoldButton'
import { fetchWalletBalanceData } from '../../StoreRedux/ProfileDetailsSlice'
import { createOrderApi } from '../../Service/OrderApi/OrderApiServices'
import OrderPlacedModal from './OrderPlacedModal'
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts'
import LabelTextInput from './LabelTextInput'

const Checkout = () => {
    const route = useRoute();
    const isFromBuyNow = route.params?.isFromBuyNow || false;
    const products = route.params?.products || [];
    const price = route.params?.price || '';

    const navigation = useNavigation()
    const dispatch = useAppDispatch()

    const backPress = () => navigation.goBack()
    const backToShop = () => {
        navigation.navigate('Shop' as never); // Replace 'Shop' with your Tab screen's name
    };
    const [loading, setLoading] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorString, setErrorString] = useState<string>('');

    const { cartList, status, error } = useAppSelector(((state: any) => state.cartList))
    const { totalPrice, cart } = cartList
    const profileAddress = useAppSelector((state) => state.profileAddress);
    const { mobile_no, profileDetails, walletBalance, region, currency } = useAppSelector((state) => state.profileDetails);

    const handlePaymentMethodSelect = (method: any) => {
        if ((isFromBuyNow ? price : totalPrice) > walletBalance && method == 'wallet') {
            // Alert.alert("Your Wallet balance is less please TopUp first")
            Alert.alert(
                "Your Wallet balance is less",
                "Please TopUp first",
                [
                    {
                        text: "OK",
                        onPress: () => handleWalletScreen()
                    }
                ],
                { cancelable: false }
            );
            setSelectedPaymentMethod(null)
        } else {
            setSelectedPaymentMethod(method);
            if (method == 'stripe') {
                handleWalletScreen()
            }
        }
    };
    const handleWalletScreen = () => {
        navigation.navigate('TopUpBalance', { funds: isFromBuyNow ? price : totalPrice });
    }
    const selectAddress = () => {
        navigation.navigate('Address', { isFromCheckout: true });
    }
    const closeModal = () => {
        setModalVisible(false);
        // navigation.goBack();
        backToShop()
    };
    // navigation.navigate('HomeStack'); // Navigate to the HomeStack, which should bring you to the Home screen

    const onSave = async (userInfo: any) => {
        setLoading(true);
        const orderData: any = userInfo

        try {
            const response = await createOrderApi(orderData);
            if (response.message === "Order created successfully") {
                dispatch(fetchWalletBalanceData(mobile_no, region))
                setModalVisible(true); // Show the modal on success
            }
        } catch (error: any) {
            console.error('Failed to create order:', error.message);
        } finally {
            setLoading(false);
            setSelectedPaymentMethod(null)
        }
    };

    const handleSave = () => {
        if (!profileAddress.find((item) => item.isCurrent)?.address && !address) {
            Alert.alert("First add default address in profile.")
        } else if (!selectedPaymentMethod) {
            Alert.alert("First select payment method")
        } else if ((isFromBuyNow ? price : totalPrice) > walletBalance) {
            // Alert.alert("Your Wallet balance is less please TopUp first")
            Alert.alert(
                "Your Wallet balance is less",
                "Please TopUp first",
                [
                    {
                        text: "OK",
                        onPress: () => { }
                    }
                ],
                { cancelable: false }
            );
        } else {

            onSave({
                "products": isFromBuyNow ? products : cart?.map((item: any) => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                })),
                "currency": region,
                "email": email,
                "shippingAddress": profileAddress.find((item) => item.isCurrent)?.address
            })
        }
    }
    const validateEmail = (text: string) => {
        // Regex for validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (text && !emailRegex.test(text)) {
            setErrorString("Please enter a valid email address.");
        } else {
            setErrorString("");
        }
        setEmail(text);
    };
    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <SafeAreaView style={styles.safeArea}>
                <TouchableOpacity onPress={backPress} style={styles.backIconContainer}>
                    <Image
                        source={require('../../../assets/intro/BackArrow3.png')}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> Your Information</Text>
                        <Text style={styles.wallet}> Wallet: <Text style={styles.wallet1}>{currency}{walletBalance?.toLocaleString()}</Text></Text>
                    </View>
                    <LabelValue label="User Name" value={profileDetails?.name} />
                    <LabelValue label="Mobile Number" value={mobile_no} />
                    <LabelTextInput
                        label="Email (optional)"
                        value={email}
                        onChangeText={(email: any) => validateEmail(email)}
                        placeholder="Enter your email"
                    />
                    {errorString ? <Text style={styles.errorText}>{errorString}</Text> : null}
                    {/* <LabelValue label="Current Address" value={profileAddress.find((item) => item.isCurrent)?.address} /> */}
                    {/* {profileAddress.find((item) => item.isCurrent)?.address ? (
                        <LabelValue label="Current Address" value={profileAddress.find((item) => item.isCurrent)?.address} />
                    ) : (
                        <LabelTextInput
                            label="Current Address"
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter your current address"
                        />
                    )} */}
                    <TouchableOpacity onPress={selectAddress}>
                        <LabelValue label="Address" value={profileAddress.find((item) => item.isCurrent)?.address || "Select Address."} />
                    </TouchableOpacity>
                    <LabelValue label="Total Amount" value={`${currency}${isFromBuyNow ? price?.toLocaleString() : totalPrice?.toLocaleString()}`} />
                    <Text style={styles.paymentMethodLabel}>Payment Method:</Text>
                    <View style={styles.paymentMethodContainer}>
                        <TouchableOpacity
                            style={[
                                styles.paymentMethodButton,
                                selectedPaymentMethod === 'wallet' && styles.selectedPaymentMethodButton
                            ]}
                            onPress={() => handlePaymentMethodSelect('wallet')}
                        >
                            <Text style={styles.paymentMethodText}>Pay using Wallet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.paymentMethodButton,
                                selectedPaymentMethod === 'stripe' && styles.selectedPaymentMethodButton
                            ]}
                            onPress={() => handlePaymentMethodSelect('stripe')}
                        >
                            <Text style={styles.paymentMethodText}>Add funds</Text>
                        </TouchableOpacity>
                    </View>
                    {loading ? <View style={styles.subContainer1} >
                        <ActivityIndicator size="small" color={colors.WHITE_COLOR} />
                    </View>
                        :
                        <GoldButton label={"Place Order"} onPress={handleSave} />
                    }
                </ScrollView>
                <OrderPlacedModal
                    visible={modalVisible}
                    onClose={closeModal}
                    message={`Order Placed Successfully. Thank you!`}
                />
            </SafeAreaView>
        </>
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingHorizontal: 20,
        marginTop: 10
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingHorizontal: 20
    },
    imageContainer: {
        flex: 1,
        height: 450,
        width: '100%',
        backgroundColor: 'red'
    },
    backIcon: {

    },
    backIconContainer: {
        marginTop: 10,
        marginHorizontal: 20
    },
    titleContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.WHITE_COLOR
    },
    wallet: {
        textAlign: 'center',
        color: colors.GREY_FONT_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16
    },
    wallet1: {
        textAlign: 'center',
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR
    },
    paymentMethodLabel: {
        marginBottom: 5,
        color: colors.GREY_FONT_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16
    },
    paymentMethodContainer: {
        marginBottom: 20
    },
    paymentMethodButton: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 0.2,
        borderColor: colors.WHITE_COLOR,
        borderRadius: 5
    },
    selectedPaymentMethodButton: {
        borderWidth: 1.5,
        borderColor: colors.YELLO_THEME_COLOR
    },
    paymentMethodText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.SEMIBOLD,
        fontSize: FontSize.F_16,
        textAlign: 'center'
    },
    subContainer1: {
        backgroundColor: colors.YELLO_THEME_COLOR,
        borderRadius: 12,
        padding: 10,
        paddingHorizontal: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2
    },
    errorText: {
        color: 'red',
        fontSize: FontSize.F_14,
        fontFamily: Fonts.REGULAR,
        fontWeight: FontWeight.F_W_300,
        marginBottom: 5
    },
})