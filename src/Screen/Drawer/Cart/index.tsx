import { View, StyleSheet, Text, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../../../Utils/Constant/Colors';
import { useNavigation, useFocusEffect, useIsFocused, CommonActions } from '@react-navigation/native';
import CartList from './CartList';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { fetchCartListData } from '../../../StoreRedux/CartListSlice';
import { STATUSES } from '../../../StoreRedux/objects';
import CheckoutModal from './CheckoutModal';
import { CreateOrderRequest } from '../../../Service/OrderApi/Types';
import { createOrderApi } from '../../../Service/OrderApi/OrderApiServices';
import { fetchWalletBalanceData } from '../../../StoreRedux/ProfileDetailsSlice';
import { Fonts, FontSize, FontWeight } from '../../../Utils/Constant/Fonts';

const CartScreen = () => {
    // const route = useRoute();
    // const { item }: any = route.params;
    const [loading, setLoading] = useState(false);
    const [continueShop, setContinueShop] = useState(false);
    const isFocused = useIsFocused();

    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    // const [confirmCheck, setConfirmCheck] = useState<boolean>(false)
    // const [bidConfirm, setBidConfirm] = useState<boolean>(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const navigation = useNavigation()
    const { cartList, status, error } = useAppSelector(((state: any) => state.cartList))
    const { totalPrice, cart } = cartList
    const { mobile_no, profileDetails, walletBalance, region, currency } = useAppSelector((state) => state.profileDetails);


    const backPress = () => navigation.goBack()
    const backToShop = () => {
        navigation.navigate('Shop'); // Replace 'Shop' with your Tab screen's name
    };

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCartListData(region))
        dispatch(fetchWalletBalanceData(mobile_no, region));
    }, [isFocused]);
    const handlePayNow = () => {
        navigation.navigate('Checkout' as never);
    };
    const handleModalDismiss = () => {
        setSelectedPaymentMethod(null)
        setVisibleModal(false);
    };
    const handleWalletScreen = (method: any) => {
        handleModalDismiss()
        navigation.navigate('TopUpBalance' as never);
        setSelectedPaymentMethod(method)
    }
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={backPress} style={styles.backIconContainer}>
                    <Image
                        source={require('../../../../assets/intro/BackArrow3.png')}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <CartList cart={cart} status={status} error={error} />
            </View >
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={backPress} style={styles.cartButtonView}>
                    <Text style={styles.buttonTitle}>Total</Text>
                    {
                        status !== STATUSES.LOADING && <Text style={styles.buttonTitle1}>{currency}{totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={backToShop} style={styles.cartButtonView0}>
                    <Text style={styles.buttonTitle0}>Continue Shoping</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePayNow} style={styles.cartButtonView1}>
                    <Text style={styles.buttonTitle}>Pay Now</Text>
                </TouchableOpacity>
            </View>
            {/* <CheckoutModal
                visible={visibleModal}
                onDismiss={handleModalDismiss}
                onSave={handleModalSave}
                totalAmount={totalPrice}
                // currency={getCurrencySymbol(currency)}
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                products={cart?.map((item: any) => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                }))}
                loading={loading}
                // continueShoping={continueShoping}
                handleWalletScreen={handleWalletScreen}
            /> */}
        </>
    )
};

export default CartScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingTop: Platform.OS == 'ios' ? 50 : 0
    },
    backIconContainer: {
        marginTop: 10,
        marginHorizontal: 20
    },
    backIcon: {
    },
    buttonContainer: {
        backgroundColor: colors.BLACK_BLUE_DARK,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: Platform.OS == 'ios' ? 20 : 5

    },
    cartButtonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 8,
        borderRadius: 10,
        marginEnd: 5,
    },
    cartButtonView0: {
        // flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.YELLO_THEME_COLOR_DARK,
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderRadius: 10,
        marginStart: 5,
        borderWidth: 1,
        borderColor: colors.YELLO_THEME_COLOR
    },
    cartButtonView1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.YELLO_THEME_COLOR_DARK,
        paddingHorizontal: 12,
        paddingVertical: 15,
        borderRadius: 10,
        marginStart: 5
    },
    buttonTitle: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        textAlign: 'left'
    },
    buttonTitle0: {
        color: colors.YELLO_THEME_COLOR_DARK,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_10,
        fontWeight: FontWeight.F_W_300,
        textAlign: 'left'
    },
    buttonTitle1: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        textAlign: 'left'
    }
})
