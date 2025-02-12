import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, Pressable } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';
import { colors } from '../../../Utils/Constant/Colors';
import { setFcmToken, setIsFromReginster } from '../../../StoreRedux/ProfileDetailsSlice';
import { getFcmToken } from '../../../Utils/FcmHelper';

const RegisterOtpScreen = () => {
    const [value, setValue] = useState("");
    const CELL_COUNT = 4;
    const navigation = useNavigation();
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const RESEND_OTP_TIME_LIMIT = 60;
    const { countryCode } = useAppSelector((state) => state.profileDetails);
    const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
        RESEND_OTP_TIME_LIMIT
    );
    const MAX_TRIAL_ATTEMPTS = 3;
    const [failedAttempts, setFailedAttempts] = useState(0);
    let resendOtpTimerInterval;
    const route = useRoute();
    const phoneNumber = route.params?.phoneNumber;
    const dispatch = useAppDispatch()
    // Format time as "00:00"
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    //to start resent otp option
    const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
            if (resendButtonDisabledTime <= 0) {
                clearInterval(resendOtpTimerInterval);
            } else {
                setResendButtonDisabledTime(resendButtonDisabledTime - 1);
            }
        }, 1000);
    };


    const onResendOtpButtonPress = () => {
        setValue("");
        setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
        startResendOtpTimer();
        resendOtp(phoneNumber)
    }

    //start timer on screen on launch
    useEffect(() => {
        startResendOtpTimer();
        return () => {
            if (resendOtpTimerInterval) {
                clearInterval(resendOtpTimerInterval);
            }
        };
    }, [resendButtonDisabledTime]);

    //back to LoginScreen
    const handleLoginScreen = () => {
        // navigation.navigate("LoginMainScreen");
        navigation.reset({
            index: 0,
            routes: [{ name: 'WelComeScreen' }],
        });
    }

    //Resend Otp Api
    const resendOtp = async (phoneNumber) => {
        try {
            const response = await axios.post("https://indulgeconcierge.com/send-otp", {
                countryCode: countryCode,
                phoneNumber: phoneNumber,
            });
            if (response.data) {
                console.log(response.data, "response");
            } else {
                Alert.alert("Failed to fetch OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching OTP:", error);
            Alert.alert("Failed to fetch OTP. Please try again.");
        }
    };

    //verifyOtp
    const verifyOtp = async () => {
        if (value.length === CELL_COUNT) {
            try {
                const response = await axios.post(
                    "https://indulgeconcierge.com/verify-otp",
                    {
                        countryCode: countryCode,
                        mobile_no: phoneNumber,
                        otp: value,
                    }
                );

                if (response.status === 200) {
                    const token = response.data.token;
                    await AsyncStorage.setItem("phoneNumber", phoneNumber.toString());
                    await AsyncStorage.setItem('token', token)
                    await AsyncStorage.setItem('profilePictureURI', "");
                    dispatch(setIsFromReginster(true));
                    const fcmtoken = await getFcmToken();
                    console.log('fcmtoken---Register-->', fcmtoken);
                    fcmtoken && dispatch(setFcmToken(fcmtoken))

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MyDrawer' }],
                    });

                    // navigation.navigate('TypeformScreen');
                }
            } catch (error) {
                setFailedAttempts(failedAttempts + 1);
                if (failedAttempts + 1 === MAX_TRIAL_ATTEMPTS) {
                    navigation.goBack();
                } else {
                    Alert.alert('Invalid OTP. Please try again.');
                }
            }
        }
    };

    return (
        <View style={Styles.container}>
            <View style={Styles.backButton}>
                <Pressable onPress={handleLoginScreen}>
                    <Image source={require("../../../../assets/intro/Back.png")} />
                </Pressable>
            </View>
            <View style={Styles.logoContainer}>
                <Image source={require("../../../../assets/logo/IndulgeLogoWhite.png")} style={Styles.logo} />
            </View>
            <View style={{ marginTop: '30%' }}>
                <Text style={Styles.otpText}>Enter the OTP you received to +{countryCode}{phoneNumber}</Text>
            </View>
            <View style={Styles.otpDiv}>
                <View style={Styles.textFieldDiv}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={Styles.codeFieldRoot}
                        keyboardType="number-pad"
                        autoComplete="sms-otp"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[Styles.cell, isFocused && Styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />

                </View>
            </View>
            <View style={{ marginTop: '50%', alignItems: 'center', justifyContent: 'center' }} >

                {resendButtonDisabledTime > 0 ? (
                    <Text style={Styles.resendCodeText}>
                        Send again in {" "}
                        {formatTime(resendButtonDisabledTime)}
                    </Text>
                ) : (
                    <View>
                        <Pressable
                            disabled={resendButtonDisabledTime > 0}
                            onPress={onResendOtpButtonPress}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '3%' }}>
                                <Text style={{
                                    marginTop: '15%',
                                    fontFamily: Fonts.REGULAR,
                                    color: colors.WHITE_COLOR,
                                    fontSize: FontSize.F_18
                                }}>
                                    Didn’t get the OTP?
                                </Text>
                                <Text style={{
                                    marginTop: '15%',
                                    marginLeft: '2%',
                                    fontFamily: Fonts.REGULAR,
                                    color: colors.YELLO_THEME_COLOR,
                                    fontSize: FontSize.F_18
                                }}>Resend OTP</Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '35%' }}>
                <Pressable style={Styles.verifyOtpButton} onPress={verifyOtp}>
                    <Text style={Styles.verifyOtpText}>Verify OTP</Text>
                </Pressable>
            </View>

        </View>
    )
}
export default RegisterOtpScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpText: {
        textAlign: 'center',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_20
    },
    otpDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "110%",
        position: 'absolute',

    },
    textFieldDiv: {
        width: "75%",
        color: "#FFFFFF"
    },
    root: { flex: 1 },
    codeFieldRoot: { marginTop: 0 },
    cell: {
        width: 55,
        height: 58,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_24,
        textAlign: "center",
        padding: 9,
        backgroundColor: "#171717",
        borderRadius: 10
    },
    focusCell: {
        borderColor: "#000",
    },
    resendCodeText: {
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_18,
        marginTop: '15%',
    },
    verifyOtpButton: {
        backgroundColor: '#C4963D',
        width: 144,
        height: 42,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    verifyOtpText: {
        textAlign: 'center',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16
    },
    backButton: {
        marginTop: '10%',
        marginLeft: '3%'
    },
    logo: {
        width: 95,
        height: 75
    }
})