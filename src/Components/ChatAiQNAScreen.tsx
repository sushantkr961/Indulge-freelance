import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, TextInput, TouchableOpacity, FlatList, SafeAreaView, Pressable, Image } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../Utils/Constant/Colors';
import LinearGradient from 'react-native-linear-gradient';

const ChatAiQNAScreen = ({ route }) => {
    const { promptText } = route.params;
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const [storedToken, setStoredToken] = useState('');
    const [isFontLoaded, setFontLoaded] = useState(false);
    const [inputText, setInputText] = useState('');
    const [promptsText, setPromptsText] = useState(promptText);
    const navigation = useNavigation();
    const [searchInput, setSearchInput] = useState("");
    const [promptList, setPromptList] = useState([
        {
            "id": 0,
            "prompt": "Do we get cost benefits by using INDULGE?",
        },
        {
            "id": 1,
            "prompt": "What is the scope of requests I can make?",
        },
        {
            "id": 2,
            "prompt": "How many people can use a membership?",
        }
    ])
    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken !== null) {
                    setStoredToken(storedToken)
                }
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                    setTimeout(() => {
                        sendChatGptRequest(promptText, storedNumber, storedToken);
                    }, 1000);
                }
            } catch (error) {
                
            }
        };
        getPhoneNumber();
    }, []);


    const sendChatGptRequest = async (promptText, storedNumber, storedToken) => {
        try {
            setLoading(true);
            const apiUrl = "https://indulgeconcierge.com/search";
            const data = {
                prompt: promptText,
                mobile_no: storedNumber,
            };
          
            const response = await axios.post(apiUrl, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storedToken}`,
                },
            });
            

            if (response.status === 200) {
                setResponse(response.data.result.choices);
                
            } else {
                
            }
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    };
    const handleSend = () => {
        // Handle sending the input text
    };
    const onPressPrompt = (prompt) => {
        setPromptsText(prompt)
        sendChatGptRequest(prompt, storedPhoneNumber, storedToken)
    }
    // if (loading) {
    //     return (
    //         <View style={[styles.container, { padding: 50 }]}>
    //             <ActivityIndicator size="large" color="#ffffff" />
    //         </View>
    //     )
    // }
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <LinearGradient
            colors={['#1A1A23', '#0F0F15']}
            style={styles.conciergeButtonView}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.header}>
                <Pressable onPress={handleBack}>
                    <Image source={require("../../assets/screen/WhiteBackArrow.png")} style={styles.backArrow} />
                </Pressable>
                {/* <Image source={require('../../assets/screen/Search.png')} style={styles.searchIcon} /> */}
            </View>

            <View style={styles.humanImageContainer}>
                <Image source={require('../../assets/screen/Humanhandbg.png')} style={styles.humanImage} />
            </View>
            {/* <View style={styles.bottomRight}>
                <Image source={require('../../assets/screen/ShareIconImage.png')} style={styles.shareImageIcon} />
            </View> */}
            {loading && <View style={[styles.container, { padding: 50 }]}>
                <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
            </View>
            }
            {!loading && <><View style={styles.content}>
                <Text style={styles.promptText}>{promptsText}</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#ffffff" />
                ) : response ? (
                    <Text style={styles.responseText}>{response[0]?.message?.content}</Text>
                ) : (
                    <Text style={styles.errorText}>No response found</Text>
                )}
            </View>
                <View style={styles.flatlistContainer} />
                {/* <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={promptList}
                    renderItem={
                        ({ item }) => <TouchableOpacity
                            style={styles.promptContainer}
                            onPress={() => onPressPrompt(item.prompt)}
                        >
                            <Text style={styles.responseTextPrompt}>
                                {item.prompt}
                            </Text>
                        </TouchableOpacity>
                    }
                    style={styles.flatlistContainer}
                    keyExtractor={item => item.id.toString()}
                // extraData={eventsSuggestedData} // You can directly pass the state here
                /> */}
            </>
            }
            <View style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                // alignItems: 'center',
            }}>
                <TextInput
                    style={styles.input}
                    placeholder={'type your text here..'}
                    value={inputText}
                    onChangeText={setInputText}
                />
                <Pressable onPress={() => onPressPrompt(inputText)}
                    style={{
                        backgroundColor: colors.WHITE_COLOR, width: '10%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderWidth: 2,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                    }}
                >
                    <Image
                        source={require('../../assets/screen/SendIcon.png')}
                        style={{ width: 24, height: 24, tintColor: 'black' }} />
                </Pressable>
            </View>
        </LinearGradient >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#000000',
    },
    conciergeButtonView: {
        flex: 1,
        paddingHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        paddingTop: 10
    },
    backArrow: {
        width: 42,
        height: 42
    },
    searchIcon: {
        width: 32,
        height: 32
    },
    content: {
        justifyContent: 'center',
        paddingTop: 20
    },
    responseText: {
        color: '#ffffff',
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 18,
        fontWeight: '400',
        marginTop: '5%',
        paddingHorizontal: 20
    },
    flatlistContainer: {
        marginTop: '5%',
        flex: 1

    },
    input: {
        backgroundColor: "#FFFFFF",
        borderColor: '#EFF1F4',
        borderWidth: 2,
        // borderRadius: 5,
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        // marginBottom: 15,
        fontWeight: "400",
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 20,
        color: "#566D80",
        // width: '100%'
        flex: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    promptContainer: {
        marginTop: '2%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        backgroundColor: colors.BACK_BLUE_DARK,
        padding: 15
    },
    responseTextPrompt: {
        color: colors.WHITE_COLOR,
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 16,
        fontWeight: '400',
        // marginTop: '5%',
        // paddingHorizontal: 20
    },
    errorText: {
        color: '#ff0000',
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20
    },
    humanImage: {
        width: 360,
        height: 140,
        resizeMode: 'cover',
        borderRadius: 20
    },
    humanImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    bottomRight: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: -20
    },
    shareImageIcon: {
        width: 46,
        height: 46
    },
    promptText: {
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 24,
        color: '#ffffff',
        fontWeight: '400',
        paddingHorizontal: 20
    },
    searchText: {
        color: '#373737',
        fontSize: 18,
        fontFamily: "YourFont-Regular",
        fontWeight: '400'
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingStart: 15,
        borderRadius: 10,
        marginTop: '3%'
    },
    seachImage: {
        width: 32,
        height: 32,
        marginLeft: "3%",
        tintColor: '#373737'
    },
    search: {
        padding: "3%",
        color: "#373737",
        fontFamily: 'PFBeauSansPro-Regular',
        fontSize: 16,
        flex: 1
    },
    sendIcon: {
        width: 32,
        height: 32,
        marginRight: "3%"
    }
});

export default ChatAiQNAScreen;
