import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../Utils/Constant/Colors';
import { useNavigation } from '@react-navigation/native';

export default function PromptBox({ prompts, sendChatGptRequest }: any) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={() => sendChatGptRequest(prompts)}>
            <LinearGradient
                colors={[colors.WHITE_COLOR, colors.WHITE_COLOR_BLACK_GREY]}
                style={styles.promptContainer}
                start={{ x: 0.5, y: 0.1 }}
                end={{ x: 0.9, y: 1 }}
            >
                <View style={styles.textContainerPrompt}>
                    <Text
                        style={styles.chatgptText1}
                        numberOfLines={4}
                    >
                        {prompts}
                    </Text>
                </View>
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}
                    onPress={() => sendChatGptRequest(prompts)}>
                    <Image
                        source={require('../../assets/screen/Up_Arrow_Indulge.png')}
                        style={styles.arrowImage1}
                    />
                </TouchableOpacity>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    promptContainer: {
        borderRadius: 10,
        backgroundColor: colors.WHITE_COLOR,
        padding: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        borderWidth: 2,
        borderColor: colors.WHITE_COLOR
    },
    textContainerPrompt: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    chatgptText1: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 16,
        fontWeight: '400',
        // marginEnd: 10,
        textAlign: 'left'
    },
    chatgptText21: {
        color: colors.GREY_FONT_FONT_COLOR,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 15,
        fontWeight: '400',
        marginEnd: 10
    },
    arrowImage1: {
        alignSelf: 'left'
    },
})