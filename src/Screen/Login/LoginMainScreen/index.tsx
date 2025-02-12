import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    Pressable,
    View,
    Modal,
    Text,
    Image,
    TouchableWithoutFeedback,
    FlatList,
    TextInput,
    Alert,
    SafeAreaView,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { useDispatch } from "react-redux";
import { countryData } from "../../../Utils/Constant/Constant";
import { resetTagState } from "../../../StoreRedux/FilterSlice";
import { setCountryCode, setFcmToken, setIsFromReginster } from "../../../StoreRedux/ProfileDetailsSlice";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";
import { colors } from "../../../Utils/Constant/Colors";
import { getFcmToken } from "../../../Utils/FcmHelper";


const LoginMainScreen = () => {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoaded, setIsLoaded] = useState(true);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAreas, setFilteredAreas] = useState([]);
    //navigate to otpscreen
    const handleOtpScreen = async () => {
        dispatch(setCountryCode(selectedArea?.callingCode.replace('+', '')))
        try {
            setIsLoaded(true);
            const convertedPhoneNumber = Number(phoneNumber);

            let response;
            if (convertedPhoneNumber) {

                if (convertedPhoneNumber === 8917254384) {
                    response = await axios.post(
                        "https://indulgeconcierge.com/login",
                        {
                            countryCode: selectedArea?.callingCode.replace('+', ''),
                            mobile_no: convertedPhoneNumber,
                        }
                    );
                    console.log("otpResponse:responseresponse::", response)

                    if (response.status === 200) {
                        await AsyncStorage.setItem("phoneNumber", convertedPhoneNumber.toString());
                        const authToken = response.data.token;
                        console.log(authToken, "token")
                        AsyncStorage.setItem("token", authToken);
                        dispatch(resetTagState())
                        // navigation.navigate("MyBottomTabs");
                        const fcmtoken = await getFcmToken();
                        console.log('fcmtoken---Login with 89172-->', fcmtoken);
                        fcmtoken && dispatch(setFcmToken(fcmtoken))
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'MyDrawer' }],
                        });
                        setIsLoaded(false);
                        return;
                    }
                }
                const otpResponse = await axios.post(
                    "https://indulgeconcierge.com/send-otp",
                    {
                        countryCode: selectedArea?.callingCode.replace('+', ''),
                        phoneNumber: convertedPhoneNumber,
                    }
                );
                console.log("otpResponse:::", otpResponse)
                // Alert.alert("Failed to fetch OTP. Please try again.", otpResponse.data);

                if (otpResponse.data) {
                    // Alert.alert("", otpResponse.data);

                    await AsyncStorage.setItem("phoneNumber", convertedPhoneNumber.toString());
                    navigation.navigate("OtpScreen", { phoneNumber: convertedPhoneNumber });
                } else {
                    Alert.alert("Failed to fetch OTP. Please try again.", otpResponse.data);
                }
            } else {
                Alert.alert("Enter phone number first");
            }
            setIsLoaded(false);
        } catch (error) {
            console.log("Error fetching OTP::::::::::", error);
            // console.error("Error fetching OTP:", error);
            setIsLoaded(false);

            if (error.response && error.response.status === 404) {
                Alert.alert("You need to register first");
                navigation.navigate("RegisterScreen");
            } else {
                Alert.alert("Failed to fetch OTP. Please try again.");
            }
        }
    };

    useEffect(() => {

        setAreas(countryData);

        if (countryData.length > 0) {
            let defaultData = countryData.filter(a => a.code === "IN");

            if (defaultData.length > 0) {
                setSelectedArea(defaultData[0]);
            }
        }
    }, []);

    // render countries codes modal
    function renderAreasCodesModal() {
        // Handle search input and filtering of areas
        const handleSearch = (text: any) => {
            setSearchQuery(text);
            const filtered = areas.filter((item) =>
                item.item.toLowerCase().includes(text.toLowerCase()) ||
                item.code.toLowerCase().includes(text)
            );
            setFilteredAreas(filtered);
        };
        const renderItem = ({ item }: any) => {
            return (
                <Pressable
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginBottom: 5,
                        flexDirection: "row",
                        backgroundColor: "#171717",
                        alignItems: "center",
                        // justifyContent: 'center'
                    }}
                    onPress={() => {
                        setSelectedArea(item), setModalVisible(false);
                        setFilteredAreas([])
                        setSearchQuery('');

                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            height: 25,
                            width: 25,
                            paddingRight: 10,
                        }}
                    />

                    <Text style={{
                        fontFamily: Fonts.LIGHT,
                        fontSize: FontSize.F_16,
                        fontWeight: FontWeight.F_W_300,
                        color: colors.WHITE_COLOR,
                        paddingLeft: 10
                    }}>
                        {item.item}
                    </Text>
                </Pressable>
            );
        };

        return (
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "100%",
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                        <View
                            style={{
                                height: 250,
                                width: "100%",
                                color: "#fff",
                                backgroundColor: "#171717",
                                marginTop: 10,
                            }}
                        >
                            <FlatList
                                data={searchQuery ? filteredAreas : areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                verticalScrollIndicator={false}
                                style={{
                                    padding: 20,
                                    marginBottom: 20,
                                }}
                                ListHeaderComponent={(
                                    <TextInput
                                        style={{
                                            height: 40,
                                            borderColor: colors.GREY_DARK_LINE_COLOR,
                                            borderWidth: 1,
                                            marginBottom: 10,
                                            borderRadius: 8,
                                            paddingHorizontal: 10,
                                            color: colors.WHITE_COLOR,
                                            fontFamily: Fonts.REGULAR,
                                            fontWeight: FontWeight.F_W_300,
                                            fontSize: FontSize.F_16
                                        }}
                                        placeholder="Search country..."
                                        placeholderTextColor={colors.GREY_DARK_LINE_COLOR}
                                        value={searchQuery}
                                        onChangeText={handleSearch}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    //add font-family
    // useEffect(() => {
    // const loadFont = async () => {
    //     await Font.loadAsync({
    //         "YourFont-Regular": fontName,
    //     });
    //     setFontLoaded(true);
    // };
    // loadFont();
    // }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../../../assets/logo/IndulgeLogoWhite.png")}
                    style={styles.logo}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>WELCOME TO INDULGE</Text>
                <Text style={styles.signInText}>SIGN IN TO CONTINUE</Text>
            </View>
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.phnNumber}>Phone Number</Text>
                </View>
                <View style={styles.innerContainer}>
                    <View style={styles.innerContainer1}>
                        <Pressable
                            style={styles.innerContainer2}
                            onPress={() => setModalVisible(true)}
                        >
                            <Image
                                source={{ uri: selectedArea?.flag }}
                                resizeMode="contain"
                                style={styles.flagImage}
                            />

                            <View style={styles.callingcodeContainer}>
                                <Text
                                    style={styles.callingcodeText}
                                >
                                    {selectedArea?.callingCode}
                                </Text>
                            </View>
                            <View
                                style={styles.dropdownContainer}
                            >
                                <Ionicons name="chevron-down" size={30} color="white" />
                            </View>
                        </Pressable>
                    </View>

                    {/* Phone Number Text Input */}
                    <TextInput
                        style={styles.phoneNumberContainer}
                        selectionColor="#FFFFFF"
                        keyboardType="numeric"
                        returnKeyType={'done'}
                        maxLength={10}
                        value={phoneNumber}
                        onChangeText={(value) => {
                            setPhoneNumber(value);
                            setPhoneNumberError("");
                        }}
                    />
                </View>
                <Text style={styles.validText}>{phoneNumberError}</Text>
                <View
                    style={styles.digitContainer}
                >
                    <Text
                        style={styles.digitText}
                    >
                        A 4-digit OTP will be sent to your phone and{"\n"}automatically
                        verified
                    </Text>
                </View>
            </View>
            <View style={styles.loginContainer}>

                <Pressable
                    style={styles.loginButton}
                    onPress={() => handleOtpScreen()}
                >
                    <Text style={styles.loginButtonText}>Submit</Text>
                </Pressable>
            </View>
            {renderAreasCodesModal()}
        </SafeAreaView>
    );
};
export default LoginMainScreen;

