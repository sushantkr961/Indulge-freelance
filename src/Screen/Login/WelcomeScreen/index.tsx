import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    View,
    Image,
    Pressable,
    Text,
    ImageBackground,
    StyleSheet,
    Dimensions, Linking, ScrollView
} from "react-native";
import { colors } from "../../../Utils/Constant/Colors";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";

const WelcomeScreen = () => {
    const [isFontLoaded, setFontLoaded] = useState(false);
    const navigation = useNavigation();
    // const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;

    const handleSubmit = () => {
        navigation.navigate("LoginMainScreen" as never);
    };

    const handleData = () => {
        navigation.navigate("RegisterScreen" as never);
    };

    const handleBenifitScreen = () => {
        navigation.navigate("BenifitScreen" as never);
    };
    const handleAccountDeletion = () => {
        // Replace 'https://example.com/account-deletion' with your actual account deletion link
        const accountDeletionLink = 'https://admin-indulge.netlify.app/account-delete';

        // Open the external link in the default web browser
        Linking.openURL(accountDeletionLink);
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../../assets/intro/ChatGPT_NEW_BACKGROUND_LOGIN.png")}
                style={styles.container1}
            >
                {/* <Image
                style={styles.logoImage}
                source={"../../../../asset/intro/LOGO_FOR_LOGIN.png"}
            /> */}
                <ScrollView
                    contentContainerStyle={styles.buttonContainer}
                >
                    <View style={styles.logoContainer}>
                        <Image
                            // style={styles.logoImage}
                            source={require("../../../../assets/intro/LOGO_FOR_LOGIN.png")}
                        />
                    </View>
                    <View
                        style={styles.welcomeTextContainer}
                    >
                        <Text
                            style={styles.welcomeText1}
                        >
                            Welcome to the {"\n"}
                            <Text
                                style={styles.welcomeText2}
                            >
                                World of
                                <Text
                                    style={styles.welcomeText3}
                                >
                                    {` Indulge`}
                                </Text>
                            </Text>
                        </Text>
                    </View>

                    <Pressable style={styles.loginButton} onPress={handleSubmit}>
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </Pressable>
                    <Pressable onPress={handleData} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </Pressable>
                    {/* <Pressable
                                style={styles.benifitButton}
                                onPress={handleBenifitScreen}
                            >
                                <Text style={styles.benifitText}>Benefit's</Text>
                            </Pressable> */}
                    <Pressable
                        style={{}}
                        onPress={handleAccountDeletion}
                    >
                        <Text style={styles.accountDelete}>Account Delete ?</Text>
                    </Pressable>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR
    },
    container1: {
        flex: 1,
        width: "100%",
        resizeMode: "cover"
    },
    welcomeText1: {
        textAlign: "left",
        color: colors.WHITE_FONT_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        fontWeight: FontWeight.F_W_300,
        lineHeight: 42,
    },
    welcomeText2: {
        color: colors.WHITE_FONT_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_36,
        fontWeight: FontWeight.F_W_300

    },
    welcomeText3: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_36,
        fontWeight: FontWeight.F_W_300

    },
    buttonContainer: {
        paddingHorizontal: 15,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: '10%',

    },
    welcomeTextContainer: {
        flex: 1,
        marginTop: '100%',
        justifyContent: "flex-start",
        marginBottom: 30
    },
    mainContainer: {
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logoImageContainer: {
        display: "flex",
        height: "100%",
    },
    logoImage: {
        width: 120,
        height: 90,
    },
    accountDelete: {
        color: colors.WHITE_COLOR,
        textAlign: "right",
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_12,
        padding: 10,
        fontWeight: FontWeight.F_W_300
    },
    loginButton: {
        backgroundColor: "#C4963D",
        width: '100%',
        height: 52,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButtonText: {
        position: "absolute",
        textAlign: "center",
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_300
    },
    registerButton: {
        backgroundColor: "#C4963D",
        width: '100%',
        height: 52,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    registerButtonText: {
        position: "absolute",
        textAlign: "center",
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_300
    },
    benifitButton: {
        borderWidth: 1,
        borderColor: "#A8A8A8",
        borderRadius: 12,
        width: '100%',
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    benifitText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_300,
        textAlign: "center",
        padding: 5,
    },
    imageBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
    }
});
export default WelcomeScreen;
