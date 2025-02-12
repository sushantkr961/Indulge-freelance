import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Alert, SafeAreaView, Platform } from 'react-native';
import DrawerScreensHeader from '../../../Components/DrawerScreensHeader';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { colors } from '../../../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../../../Utils/Constant/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import RazorpayCheckout from 'react-native-razorpay';
import { paymentVerify, setError, setStatus } from '../../../StoreRedux/ToupBalanceSlice';
import { getInitiatePaymentDataApi, getVerifyPaymentDataApi } from '../../../Service/TopUpBalanceApi/TopUpBalanceApiServices';
import { STATUSES } from '../../../StoreRedux/objects';
import { fetchWalletBalanceData } from '../../../StoreRedux/ProfileDetailsSlice';

const TopUpBalance = memo(() => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const goBack = () => navigation.goBack();
    const { mobile_no, profileDetails, region, currency, walletBalance } = useAppSelector((state) => state.profileDetails);
    const [enteredAmount, setEnteredAmount] = useState('');
    const [userName, setUserName] = useState(profileDetails.name);
    const handleAmountChange = (text: string) => {
        // Allow only numbers and dots, but ensure it's a positive number
        let formattedText = text.replace(/[^0-9.]/g, '');
        // Ensure only one dot is allowed
        const dotIndex = formattedText.indexOf('.');
        if (dotIndex !== -1) {
            // If there's already a dot, remove any additional dots
            formattedText = formattedText.slice(0, dotIndex + 1) + formattedText.slice(dotIndex + 1).replace(/\./g, '');
        }

        // Ensure there's only up to four decimal places
        if (formattedText.includes('.')) {
            const parts = formattedText.split('.');
            if (parts[1]?.length > 4) {
                formattedText = `${parts[0]}.${parts[1].slice(0, 4)}`;
            }
        }
        setEnteredAmount(formattedText);
    };

    const paymentInitiate = async () => {
        const body = {
            "amount": enteredAmount,
            "currency": "INR",
            "method": {
                "card": true, // Enable Card payments
                "netbanking": true, // Enable Netbanking
                "upi": true, // Enable UPI
                "wallet": true // Enable Wallets
            },
            callback_url: "https://indulgeconcierge.com/app",
            // "prefill": {
            //     "email": "admin@indulge.global",
            //     "contact": "8917254384",
            //     "name": "Ramesh"
            // }
        }
        try {
            const responseData = await getInitiatePaymentDataApi(body);
            console.log("Errrorrrr====Payment==1111==>", responseData)

            if (responseData.orderId) {
                callPaymentVerify(responseData)
            } else {
                Alert.alert(`Payment Initiate Failed Please Try Again.`);
                return
            }
        } catch (err) {
            console.log("Errrorrrr====Payment====>", err)
            Alert.alert(`Payment Initiate Failed Please Try Again.`);
            return
        }
    }
    const callPaymentVerify = async (responseData: any) => {
        const options = {
            description: 'Indulge Payment Gateway.',
            image: require('../../../../assets/logo/IndulgeLogoWhite.png'),
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
        RazorpayCheckout.open(options).then(async (data: any) => {
            // handle success

            const responseData = await getVerifyPaymentDataApi(data);

            if (responseData) {
                dispatch(fetchWalletBalanceData(mobile_no, region))
                setEnteredAmount('')
                Alert.alert(`Payment Success`);
            }
        }).catch((error: any) => {

            let errorMessage = 'Payment Failed'; // Default error message

            // Handle different Razorpay error codes
            switch (error?.code) {
                case 0:
                    // Example: Payment failed due to a technical issue (bad request)
                    errorMessage = 'Payment Failed: Bad Request. Please try again.';
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
                        errorMessage += `\nDescription: ${error.description ? error.description : 'Unknown Error'}`;
                    }
                    break;
            }

            // Reset the input and show the alert
            setEnteredAmount('');
            Alert.alert(errorMessage);
        });
    }
    // Memoize the balanceAmount rendering logic using useCallback
    const renderBalanceAmount = useCallback(() => {
        return `${currency}${walletBalance?.toLocaleString()}`;
    }, [currency, walletBalance]);
    return (
        <SafeAreaView style={styles.container0}>
            <StatusBar
                translucent={false}
                backgroundColor={colors.YELLO_THEME_COLOR_DARK} // Change this color to match your selection color
                barStyle="light-content" // Change the content to be light on a dark background
            />
            <ScrollView style={styles.container}>
                <DrawerScreensHeader
                    style={{ marginTop: Platform.OS === 'ios' ? 0 : 10 }}
                    title="Top Up Balance"
                    leftButtonAction={goBack} />
                <View style={styles.container1}>
                    <Text style={styles.balanceLabel} numberOfLines={2}>Current Wallet Balance is</Text>
                    <Text style={styles.balanceAmount}>{renderBalanceAmount()}</Text>
                </View>
                <View style={styles.container2} />

                <Text style={styles.prompt}>Would you like to top it up now?</Text>
                <View style={styles.textInputContainer}>
                    <Text style={styles.label}>User Name :</Text>
                    <TextInput
                        selectionColor={colors.YELLO_THEME_COLOR}
                        style={styles.textInput1}
                        placeholder={currency}
                        value={userName}
                        onChangeText={setUserName}
                        editable={false}
                    />
                    <Text style={styles.label}>Amount :</Text>
                    <TextInput
                        selectionColor={colors.YELLO_THEME_COLOR}
                        style={styles.textInput1}
                        placeholder={currency}
                        placeholderTextColor={'#7A7A7A'}
                        value={enteredAmount}
                        onChangeText={handleAmountChange}
                        keyboardType={'decimal-pad'}
                        returnKeyType={'done'}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={paymentInitiate}
                style={styles.processButtonContainer}
            >
                <LinearGradient
                    colors={['#D39F3A', '#BD812D']}
                    style={styles.promptContainer}
                    start={{ x: 0.5, y: 0.1 }}
                    end={{ x: 0.9, y: 1 }}
                >
                    <Text style={styles.processButtonText}>Process Now</Text>
                </LinearGradient>
            </TouchableOpacity >
        </SafeAreaView>
    );
});

export default React.memo(TopUpBalance);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    container0: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,

    },
    container1: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container2: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.LIGHT_LINE_COLOR
    },
    balanceLabel: {
        flex: 1,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300,
        color: colors.GREY_WHITE_TEXT
    },
    balanceAmount: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        fontWeight: FontWeight.F_W_300,
        color: colors.WHITE_COLOR
    },
    prompt: {
        alignSelf: 'center',
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        fontWeight: FontWeight.F_W_300,
        color: colors.WHITE_COLOR,
        marginVertical: 20
    },
    textInputContainer: {
        backgroundColor: colors.BACK_BLUE_DARK,
        padding: 10,
        borderRadius: 10
    },
    label: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300,
        color: colors.GREY_WHITE_TEXT,
        marginBottom: 10
    },
    textInput1: {
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_14,
        fontWeight: FontWeight.F_W_300,
        color: colors.WHITE_COLOR,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },
    paymentOption: {
        paddingVertical: 10,
        marginBottom: 10,
        backgroundColor: colors.GREY_DARK_LINE_COLOR,
        alignItems: 'center',
        borderRadius: 5
    },
    paymentText: {
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16
    },
    input: {
        backgroundColor: colors.BACK_BLUE_DARK,
        color: colors.WHITE_COLOR,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },
    processButtonContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    processButton: {
        backgroundColor: colors.YELLO_THEME_COLOR,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    promptContainer: {
        marginTop: 20,
        borderRadius: 12,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.WHITE_COLOR,
    },
    processButtonText: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        fontWeight: FontWeight.F_W_300
    }
});
