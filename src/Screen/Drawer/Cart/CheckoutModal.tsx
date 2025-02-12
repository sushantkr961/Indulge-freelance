import React from 'react';
import { View, StyleSheet, ScrollView, Text, Modal, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { colors } from '../../../Utils/Constant/Colors';
import LabelValue from './LabelValue';
import LinearGradient from 'react-native-linear-gradient';
import GoldButton from '../../../Components/GoldButton';
import { useNavigation } from '@react-navigation/native';

const CheckoutModal = ({ products, visible, onDismiss, onSave, handleWalletScreen, totalAmount, selectedPaymentMethod, loading, setSelectedPaymentMethod }: any) => {
    const navigation = useNavigation();
    const profileAddress = useAppSelector((state) => state.profileAddress);
    const { mobile_no, profileDetails, walletBalance, region, currency } = useAppSelector((state) => state.profileDetails);

    const handlePaymentMethodSelect = (method: any) => {
        if (totalAmount > walletBalance) {
            Alert.alert("Your Wallet balance is less please TopUp first")
        } else {
            setSelectedPaymentMethod(method);
            if (method == 'stripe') {
                handleWalletScreen(method)
            }
        }
    };

    const handleSave = () => {
        if (!selectedPaymentMethod) {
            Alert.alert("First select payment method")
        } else {
            onSave({
                "products": products,
                "currency": region,
                "shippingAddress": profileAddress.find((item) => item.isCurrent)?.address
            })
        }
    }
    return (
        <Modal visible={visible} onDismiss={onDismiss} transparent={true}>
            <LinearGradient
                colors={["#1A1A23", 'rgba(26, 26, 35, 0)']}
                style={styles.gradientContainer}
                start={{ x: 1, y: 0.1 }}
                end={{ x: 1, y: 0.1 }}
            >
                <ScrollView contentContainerStyle={styles.modalContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}> Your Information</Text>
                        <Text style={styles.wallet}> Wallet: <Text style={styles.wallet1}>{currency}{walletBalance}</Text></Text>
                    </View>
                    <LabelValue label="User Name" value={profileDetails?.name} />
                    <LabelValue label="Mobile Number" value={mobile_no} />
                    <LabelValue label="Current Address" value={profileAddress.find((item) => item.isCurrent)?.address} />
                    <LabelValue label="Total Amount" value={`${currency}${totalAmount}`} />

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
                            <Text style={styles.paymentMethodText}>Pay using Stripe</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer} >
                        <GoldButton label={"Back"} onPress={onDismiss} />
                        {loading ? <View style={styles.subContainer1} >
                            <ActivityIndicator size="small" color={colors.WHITE_COLOR} />
                        </View>
                            :
                            <GoldButton label={"Proceed"} onPress={handleSave} />
                        }
                    </View>
                </ScrollView>
            </LinearGradient>
        </Modal>
    );
};

export default CheckoutModal;

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        borderRadius: 10,
        marginTop: 50,
        marginBottom: 20,
        backgroundColor: colors.BLACK_BLUE_DARK
    },
    titleContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'PF Beau Sans Pro-SemiBold',
        fontSize: 20,
        textAlign: 'center',
        color: colors.WHITE_COLOR,
        // fontWeight: '600'
    },
    wallet: {
        fontFamily: 'PF Beau Sans Pro-SemiBold',
        fontSize: 16,
        textAlign: 'center',
        color: colors.GREY_FONT_FONT_COLOR,
        // fontWeight: '600'
    },
    wallet1: {
        fontFamily: 'PF Beau Sans Pro-SemiBold',
        fontSize: 16,
        textAlign: 'center',
        color: colors.WHITE_COLOR,
        // fontWeight: '600'
    },
    input: {
        marginBottom: 15,
        fontFamily: 'PF Beau Sans Pro-Regular',
        fontSize: 16,
        // fontWeight: '400',
        color: colors.WHITE_COLOR
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    whiteBackground: {
        backgroundColor: colors.BLACK_BACKGROUND_COLOR
    },
    addressTypeText: {
        fontFamily: 'PF Beau Sans Pro-Regular',
        fontSize: 16,
        // fontWeight: '400',
        color: colors.WHITE_COLOR,
        marginBottom: 15
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginTop: -10
    },
    paymentMethodLabel: {
        fontFamily: 'PF Beau Sans Pro-Regular',
        fontSize: 18,
        // fontWeight: '400',
        marginBottom: 5,
        color: colors.GREY_FONT_FONT_COLOR
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
        borderColor: colors.YELLO_THEME_COLOR // Change this to your desired highlight color
    },
    paymentMethodText: {
        fontFamily: 'PF Beau Sans Pro-SemiBold',
        fontSize: 16,
        // fontWeight: '600',
        color: colors.WHITE_COLOR,
        textAlign: 'center'
    },
    subContainer1: {
        // paddingHorizontal: 20,
        // marginTop: 20,
        backgroundColor: colors.YELLO_THEME_COLOR,
        borderRadius: 12,
        padding: 10,
        paddingHorizontal: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },
});
