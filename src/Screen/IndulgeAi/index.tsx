import { Image, ImageBackground, SafeAreaView, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import IndulgeAiStyle from './style'
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { colors } from '../../Utils/Constant/Colors';
import PromptBox from '../../Components/PromptBox';
import QuestionAnswerList from './QuestionAnswerList';
import SearchSvg from '../../../assets/svg/Search';
import apiService from '../../Service/Api';


const IndulgeAiScreen = () => {
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setLoading] = useState<boolean>(false);

    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const [storedToken, setStoredToken] = useState('');
    const [chatGptResponse, setChatGptResponse] = useState();
    const [prompts, setPrompts] = useState([]);
    const [searchData, setSearchData] = useState<any[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPrompts = async () => {
            setLoading(true);
            try {
                const response = await apiService.get('https://indulgeconcierge.com/get-prompts');
                setPrompts(response.data);
            } catch (error) {
                console.error('Error fetching prompts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrompts();
    }, []);

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
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };
        getPhoneNumber();
    }, []);
    const sendChatGptRequest = async (prompt: string) => {
        if (prompt === '') {
            return
        }
        try {
            setLoading(true);
            // Add new question to searchData with blank answer
            const newId = searchData.length > 0 ? searchData[searchData.length - 1].id + 1 : 1;
            const newQuestion = {
                id: newId,
                question: prompt,
                answer: '',
            };

            setSearchData((prevData) => [...prevData, newQuestion]);

            const apiUrl = "https://indulgeconcierge.com/search";
            const data = {
                prompt: prompt,
                mobile_no: storedPhoneNumber,
            };

           
            const response = await axios.post(apiUrl, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storedToken}`,
                },
            });
            
            if (response.status === 200) {
                setChatGptResponse(response.data.response);
                setSearchData((prevData) =>
                    prevData.map(item =>
                        item.id === newId ? { ...item, answer: response.data.response } : item
                    )
                );
            } else {
                console.error(
                    "ChatGPT API request failed with status:",
                    response.status
                );
            }
           
        } catch (error) {
            

            if (axios.isAxiosError(error)) {
                console.error("Error with request:", error.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        } finally {
            setSearchInput('')
            setLoading(false);
        }
    };
    const opendrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }
    const onNotificationPress = () => {
        navigation.navigate('CalendarNotifications' as never)
    }
    const clearSearchData = () => {
        setSearchData([])
    }
    return (
        <SafeAreaView style={IndulgeAiStyle.container}>
            <ImageBackground
                source={require('../../../assets/screen/ChatGPT_Bg_FOR_SEARCH.png')}
                resizeMode="cover"
                style={IndulgeAiStyle.backgroundImage}>
                {searchData.length == 0 && <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <View style={IndulgeAiStyle.headerContainer}>
                        <TouchableOpacity onPress={opendrawer}>
                            <Image
                                source={require('../../../assets/screen/Logo_Icon_Concierge_screen.png')}
                                style={IndulgeAiStyle.iconViewProfile}
                            />
                        </TouchableOpacity>
                        <View style={IndulgeAiStyle.textContainer}>
                            <Text style={IndulgeAiStyle.conciergeTextWelcome}>Welcome to
                            </Text>
                            <Text style={IndulgeAiStyle.conciergeTextIndulgeTo}>
                                Indulge AI
                            </Text>
                        </View>
                        <TouchableOpacity onPress={onNotificationPress}>
                            <Image
                                source={require('../../../assets/screen/Bell_Icon.png')}
                            // style={ConciergeStyle.logo}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={[IndulgeAiStyle.exploreTextContainer, { marginTop: "10%" }]}>
                        <Text style={IndulgeAiStyle.exploreText}>How can I help you today?</Text>
                    </View>
                    <View
                        style={IndulgeAiStyle.promptContainer1}>

                        <PromptBox
                            sendChatGptRequest={sendChatGptRequest}
                            prompts={prompts?.prompt1 || ''}
                        />
                        <View style={{ width: 15 }} />
                        <PromptBox
                            sendChatGptRequest={sendChatGptRequest}
                            prompts={prompts?.prompt2 || ''}
                        />
                    </View>
                    <View
                        style={IndulgeAiStyle.promptContainer1}>
                        <PromptBox
                            sendChatGptRequest={sendChatGptRequest}
                            prompts={prompts?.prompt3 || ''}
                        />
                        <View style={{ width: 15 }} />
                        <PromptBox
                            sendChatGptRequest={sendChatGptRequest}
                            prompts={prompts?.prompt4 || ''}
                        />
                    </View>
                    {/* {
                        isLoading && <View style={IndulgeAiStyle.responseText}>
                            <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
                        </View>
                    }
                    {
                        !isLoading && <Text style={IndulgeAiStyle.responseText}>{chatGptResponse}</Text>
                    } */}
                </ScrollView>}
                {searchData.length > 0 && <QuestionAnswerList data={searchData} isLoading={isLoading} clearSearchData={clearSearchData} />}

                <View style={IndulgeAiStyle.searchContainer}>
                    <TextInput
                        style={IndulgeAiStyle.search}
                        value={searchInput}
                        onChangeText={(text) => {
                            setSearchInput(text);
                        }}
                        placeholder='Chat with Indulge AI'
                        placeholderTextColor={"#373737"}
                    // onSubmitEditing={() => {
                    //     sendChatGptRequest(searchInput)
                    // }}
                    />
                    <TouchableOpacity onPress={() => {
                        sendChatGptRequest(searchInput)
                    }}
                    >
                        <SearchSvg />
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </SafeAreaView >
    )
}

export default IndulgeAiScreen

