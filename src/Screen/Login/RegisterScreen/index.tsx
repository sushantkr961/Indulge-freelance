import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, ScrollView, View, Text, TextInput, Image, Modal, TouchableWithoutFeedback, Dimensions, FlatList, Alert, SafeAreaView } from "react-native";
import { IconButton } from 'react-native-paper';
const { width } = Dimensions.get("window");
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countryData } from "../../../Utils/Constant/Constant";
import TermsAndConditionsView from "../../../Components/TermAndCondition";
import { setCountryCode } from "../../../StoreRedux/ProfileDetailsSlice";
import { useAppDispatch } from "../../../StoreRedux/hooks/Hooks";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";
import { colors } from "../../../Utils/Constant/Colors";

const RegisterScreen = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isValidUserName, setValidUserName] = useState(true);
    const [isValidPhoneNo, setValidPhoneNo] = useState(true);
    const navigation = useNavigation();
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [checked, setChecked] = useState(false);
    const dispatch = useAppDispatch()
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAreas, setFilteredAreas] = useState([]);

    useEffect(() => {
        setAreas(countryData);

        if (countryData.length > 0) {
            let defaultData = countryData.filter(a => a.code === "IN");

            if (defaultData.length > 0) {
                setSelectedArea(defaultData[0]);
            }
        }
    }, []);


    //add font-family
    useEffect(() => {
        // const loadFont = async () => {
        //     await Font.loadAsync({
        //         'YourFont-Regular': fontName,
        //     });
        //     setFontLoaded(true);
        // };
        // loadFont();
    }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }

    // render countries codes modal
    function renderAreasCodesModal() {
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
                        padding: 10,
                        flexDirection: "row"
                    }}
                    onPress={() => {
                        setSelectedArea(item),
                            setModalVisible(false),
                            setFilteredAreas([]),
                            setSearchQuery('')
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            height: 30,
                            width: 30,
                        }}
                    />

                    <Text style={{
                        marginStart: 10, fontFamily: 'PF Beau Sans Pro-Regular',
                        fontSize: 16, color: "#fff"
                    }}>{item.item}</Text>
                </Pressable>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: '100%' }}
                    >
                        <View
                            style={{
                                height: 300,
                                width: width * 0.8,
                                color: "#fff",
                                backgroundColor: "#342342",
                                borderRadius: 12
                            }}
                        >
                            <FlatList
                                data={searchQuery ? filteredAreas : areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                verticalScrollIndicator={false}
                                style={{
                                    padding: 20,
                                    marginBottom: 20
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
        )
    }

    const verifyUserName = (name) => {
        let regex = new RegExp(/^[A-Za-z ]+$/);
        if (!name) return true;
        if (regex.test(name)) {
            return true;
        }
        return false;
    };

    const verifyPhoneNo = (phone) => {
        let regex = new RegExp(/^([+]\d{2})?\d{10}$/);
        if (!phone) return true;
        if (regex.test(phone)) {
            return true;
        }
        return false;
    };


    const handleLoginScreen = () => {
        navigation.navigate("LoginMainScreen");
    }


    //user signup with fullname and phone number
    const handleSignUp = async () => {
        try {
            if (!checked) {
                Alert.alert('', 'Accept terms and conditions');
                return;
            }
            if (!fullName || !phoneNumber) {
                Alert.alert('Fill all the fields');
                return;
            }
            const response = await axios.post('https://indulgeconcierge.com/sign-up', {
                full_name: fullName,
                mobile_no: phoneNumber,
            });
            if (response.data.success) {
                await AsyncStorage.setItem('fullName', fullName);
                Alert.alert('Signup Successful', 'You have been successfully registered!');
                // navigation.navigate('RegisterOtpScreen');
                handleOtpScreen();

            } else {
                Alert.alert('Signup Failed', 'User signup failed.');
            }
        } catch (error) {
            console.error('Signup Error:', error);
            Alert.alert('Signup Error', 'You have already registered , Please Login');
        }
    };

    //otp api
    const handleOtpScreen = async () => {
        if (!phoneNumber) {
            setPhoneNumberError("Please enter a phone number");
        } else if (!/^\d+$/.test(phoneNumber)) {
            setPhoneNumberError("Enter a valid phone number");
        } else {
            dispatch(setCountryCode(selectedArea?.callingCode.replace('+', '')))
            setPhoneNumberError("");
            try {
                const response = await axios.post(
                    "https://indulgeconcierge.com/send-otp",
                    {
                        countryCode: selectedArea?.callingCode.replace('+', ''),
                        phoneNumber: phoneNumber,
                    }
                );
                if (response.data) {
                    console.log(response.data, "response");
                    navigation.navigate("RegisterOtpScreen", { phoneNumber });
                } else {
                    Alert.alert("Failed to fetch OTP. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching OTP:", error);
                Alert.alert("Failed to fetch OTP. Please try again.");
            }
        }
    }


    return (
        <ScrollView style={styles.continer0}>
            {/* <View style={styles.continer}> */}
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../../../assets/logo/IndulgeLogoWhite.png")}
                    style={styles.logo}
                />
            </View>
            <View>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.loginRegisterText}>Register to continue</Text>
            </View>
            <View>
                <Text style={styles.fullNameText}>Full Name</Text>
                <TextInput
                    style={styles.fullName}
                    value={fullName}
                    onChangeText={(value) => {
                        setFullName(value)
                        const isValid = verifyUserName(value);
                        isValid ? setValidUserName(true) : setValidUserName(false);

                    }}

                />
                <Text style={styles.validText}>
                    {isValidUserName ? "" : "*Please Enter Valid User Name"}
                </Text>
                <View>
                    <View>
                        <Text style={styles.phonenoText}>Phone Number</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ textAlign: 'center' }}>
                            <Pressable
                                style={styles.flagContainer}
                                onPress={() => setModalVisible(true)}>
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode="contain"
                                    style={styles.flagImage}
                                />

                                <View style={styles.callingcodeContainer}>
                                    <Text style={styles.callingcodeText}>{selectedArea?.callingCode}</Text>
                                </View>
                                <View style={styles.dropdownContainer}>
                                    <IconButton icon="chevron-down" size={30} iconColor='white' />
                                </View>
                            </Pressable>
                        </View>

                        {/* Phone Number Text Input */}

                        <TextInput
                            style={styles.phoneNumberContainer}
                            selectionColor='#FFFFFF'
                            keyboardType="numeric"
                            maxLength={10}
                            value={phoneNumber}
                            returnKeyType={'done'}
                            onChangeText={(value) => {
                                setPhoneNumber(value);
                                const isValid = verifyPhoneNo(value);
                                isValid ? setValidPhoneNo(true) : setValidPhoneNo(false);
                            }}
                        />
                        <Text style={styles.validText}>
                            {phoneNumberError}
                        </Text>
                    </View>
                    <View style={styles.digitContainer}>
                        <Text style={styles.digitText}>A 4-digit OTP will be sent to your phone and{"\n"}automatically verified</Text>
                    </View>
                </View>
            </View>
            <TermsAndConditionsView checked={checked} setChecked={setChecked} />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.loginButton}
                    onPress={handleSignUp}
                // onPress={() => onSubmit()}
                >
                    <Text style={styles.loginText1}>Register</Text>
                </Pressable>
            </View>
            <View style={styles.alreadyTextContainer}>
                <Text style={styles.text}>Already have an account? </Text>
                <Pressable onPress={handleLoginScreen}>
                    <Text style={styles.loginText}>Login</Text>
                </Pressable>
            </View>
            {renderAreasCodesModal()}
            {/* </View> */}
        </ScrollView>
    )
}


export default RegisterScreen;


const styles = StyleSheet.create({
    continer0: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        paddingBottom: 25,

    },
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 20
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        paddingTop: 50
    },
    logo: {
        width: 95,
        height: 75
    },
    welcomeText: {
        textAlign: 'center',
        padding: 10,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_32,
        fontWeight: FontWeight.F_W_300
    },
    loginRegisterText: {
        textAlign: 'center',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_14,
        fontWeight: FontWeight.F_W_300

    },
    fullName: {
        borderWidth: 1,
        borderRadius: 170,
        margin: 10,
        padding: 12,
        backgroundColor: '#171717',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300

    },
    fullNameText: {
        marginTop: '20%',
        marginLeft: '5%',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300

    },
    phonenoText: {
        marginTop: '5%',
        marginLeft: '5%',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300

    },
    phoneno: {
        borderWidth: 1,
        borderColor: '#171717',
        borderRadius: 170,
        margin: 10,
        padding: 12,
        color: '#FFFFFF'
    },
    loginButton: {
        backgroundColor: '#C4963D',
        marginTop: '5%',
        width: '50%',
        padding: 15,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText1: {
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300

    },
    text: {
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300

    },
    validText: {
        color: "#ff0000",
        marginLeft: '6%'
    },
    otpMessage: {
        color: "#FFFFFF",
        fontFamily: 'PF Beau Sans Pro-Regular',
        fontSize: 16,
        marginTop: '15%',
    },
    flagContainer: {
        width: 130,
        height: 50,
        marginHorizontal: 5,
        backgroundColor: '#171717',
        borderBottomWidth: 1,
        flexDirection: "row",
        fontSize: 12,
        borderWidth: 1,
        borderRadius: 170,
        marginTop: 10,
        paddingHorizontal: 5
    },
    flagImage: {
        width: 30,
        height: 30,
        marginTop: '8%',
        marginLeft: '8%'
    },
    callingcodeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    callingcodeText: {
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_400,
        marginLeft: '15%'
    },
    dropdownContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    phoneNumberContainer: {
        flex: 1,
        marginVertical: 10,
        borderBottomColor: "#111",
        borderBottomWidth: 1,
        height: 50,
        // width: '100%',
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_18,
        fontWeight: FontWeight.F_W_300,
        borderRadius: 170,
        backgroundColor: '#171717',
        paddingLeft: 13
    },
    digitContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%'
    },
    digitText: {
        textAlign: 'center',
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_300

    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    alreadyTextContainer: {
        flexDirection: 'row',
        marginTop: '13%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        marginLeft: '10%',
        fontFamily: Fonts.REGULAR,
        color: colors.YELLO_THEME_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300

    }
})