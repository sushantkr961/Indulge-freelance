import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import ChatAiQNAScreen from '../Components/ChatAiQNAScreen';
import EventActionMenu from '../Components/EventActionMenu';
import TopupScreen from '../Components/Payment/TopupScreen';
import BuyScreen from '../Screen/BuyScreen';
import CalendarNotifications from '../Screen/Calender/CalendarNotifications';
import CalenderScreen from '../Screen/Calender/index';
import Checkout from '../Screen/Checkout';
import AboutUsScreen from '../Screen/Drawer/AboutUsScreen/index';
import AccountsScreen from '../Screen/Drawer/Accounts/index';
import AuctionScreen from '../Screen/Drawer/Auctions';
import AuctionsGuide from '../Screen/Drawer/AuctionsGuide';
import AuctionsSubScreen from '../Screen/Drawer/AuctionsSubScreen';
import BookingScreen from '../Screen/Drawer/Booking/index';
import Cart from '../Screen/Drawer/Cart';
import FAQSScreen from '../Screen/Drawer/FaqsScreen/index';
import FavoriteScreen from '../Screen/Drawer/Favorites/index';
import Orders from '../Screen/Drawer/Orders';
import OrderScreen from '../Screen/Drawer/Orders/OrderScreen';
import PrivacyPolicyScreen from '../Screen/Drawer/PrivacyPolicy/index';
import ProfileScreen from '../Screen/Drawer/Profile/index';
import TermAndConditionsScreen from '../Screen/Drawer/TermAndConditions/index';
import TopUpBalance from '../Screen/Drawer/TopUpBalance';
import Transactions from '../Screen/Drawer/Transcation';
import ExploreSubScreen from '../Screen/ExploreSubScreen';
import BenifitScreen from '../Screen/Login/BenifitScreen/index';
import ContactConciergePage from '../Screen/Login/ContactConciergePage/index';
import IntroImageScreen from '../Screen/Login/IntroImage/index';
import IntroVideoScreen from '../Screen/Login/introVideoScreen/index';
import LoginMainScreen from '../Screen/Login/LoginMainScreen/index';
import OtpScreen from '../Screen/Login/OtpScreen/index';
import RegisterOtpScreen from '../Screen/Login/RegisterOtpScreen/index';
import RegisterScreen from '../Screen/Login/RegisterScreen/index';
import WelcomeScreen from '../Screen/Login/WelcomeScreen/index';
import ReferFriendForm from '../Screen/Referral/ReferFriendFrom';
import ReferFriends from '../Screen/Referral/ReferFriends';
import Referral from '../Screen/Referral/Referral';
import TrackReferral from '../Screen/Referral/TrackReferral';
import TastesScreen from '../Screen/Tastes';
import { addFcmTokenToServer } from '../Service/NotificationsApi/NotificationsApiServices';
import { fetchProducts } from '../StoreRedux/AllReelsSlice';
import { fetchDeeplinkDetailsData, setDeeplinkDetailsData, setIsFromDeeplinking } from '../StoreRedux/DeepLinkingSlice';
import { useAppDispatch, useAppSelector } from '../StoreRedux/hooks/Hooks';
import { setFcmToken } from '../StoreRedux/ProfileDetailsSlice';
import { extractPathAndId, parseDeepLinkUrl } from '../Utils';
import { getFcmToken } from '../Utils/FcmHelper';
import MyBottomTabs from './bottomTabNavigation';
import MyDrawer from './drawerNavigation';
import RNFS from 'react-native-fs';
import axios from 'axios';
import Address from '../Screen/Drawer/Profile/Address';


const Stack = createNativeStackNavigator();

const MyStack = ({ route }: any) => {
    const { path, id } = route.params || { path: undefined, id: undefined };
    console.log("path, idpath, idpath, idpath, id==MyStack", path, id)

    const { userId, fcmToken } = useAppSelector((state) => state.profileDetails);
    useEffect(() => {
        const addToken = async () => {
            console.log("fcm register initiate.......")
            if (fcmToken && userId) {
                await addFcmTokenToServer(userId, fcmToken)
            }
        }
        addToken()
    }, [fcmToken, userId])
    return (
        <Stack.Navigator initialRouteName={'MyBottomTabs'}>
            <Stack.Screen
                name="MyBottomTabs"
                component={MyBottomTabs}
                options={{
                    headerShown: false,
                }}
                initialParams={path && id && { path: path, id: id }}
            />
            <Stack.Screen
                name="Tastes"
                component={TastesScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AuctionsSubScreen"
                component={AuctionsSubScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AuctionsGuide"
                component={AuctionsGuide}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="BuyScreen"
                component={BuyScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ExploreSubScreen"
                component={ExploreSubScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="OrderScreen"
                component={OrderScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CalendarNotifications"
                component={CalendarNotifications}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Transactions"
                component={Transactions}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{
                    headerShown: false,
                }}
            />
            {/* <Stack.Screen name="LoginMainScreen" component={LoginMainScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="BenifitScreen" component={BenifitScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} options={{
                headerShown: false
            }} /> */}
            <Stack.Screen name="TopupScreen" component={TopupScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Address" component={Address} options={{
                // headerShown: false
            }} />
            <Stack.Screen name="Favorites" component={FavoriteScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Cart" component={Cart} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Orders" component={Orders} options={{
                headerShown: false
            }} />
            {/* <Stack.Screen name="Favorites" component={AuctionScreen} /> */}
            <Stack.Screen name="Auctions" component={AuctionScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="TopUpBalance" component={TopUpBalance} options={{
                headerShown: false
            }} />
            <Stack.Screen
                name="Refers and Earn"
                component={Referral}
                options={{ title: "Referral", headerShown: false }}
            />
            <Stack.Screen
                name="ReferFriend"
                component={ReferFriends}
                options={{ title: "Refer a Friend", headerShown: false }}
            />
            <Stack.Screen
                name="ReferFriendForm"
                component={ReferFriendForm}
                options={{
                    title: "Refer a Friend",
                    headerShown: false,
                    presentation: "transparentModal",
                    // animation: 'slide_from_bottom',
                    // ...TransitionPresets.ModalSlideFromBottomIOS,
                }}
            />
            <Stack.Screen
                name="TrackReferral"
                component={TrackReferral}
                options={{ title: "Track Referral", headerShown: false }}
            />
            <Stack.Screen name="FAQ’s" component={FAQSScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Calender" component={CalenderScreen} />
            <Stack.Screen name="Accounts" component={AccountsScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="EventActionMenu" component={EventActionMenu} />
            {/*  <Stack.Screen name="Indulge Ai" component={IndulgeAiScreen} />
            <Stack.Screen name="Concierge" component={ConciergeScreen} /> */}
        </Stack.Navigator>
    );
};

const LoginStack = createNativeStackNavigator();

export const MyLoginStack = ({ notificationUrl }: any) => {
    const [initialRoute, setInitialRoute] = useState('IntroVideo');
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const { reelData } = useAppSelector((state: any) => state.product);

    useEffect(() => {
        // const setFcmTokenFromAsync = async () => {
        //     const data = await AsyncStorage.getItem('fcmToken');
        //     if (data) {
        //         dispatch(setFcmToken(data))
        //     }
        // }
        // setFcmTokenFromAsync()
        if (notificationUrl) {
            const { path, id } = extractPathAndId(notificationUrl);
            console.log("path, params======", path, id)
            if (path && id) {
                navigateToScreen(path, id);
            }
        }
        // Function to handle incoming deep links
        const handleDeepLink = (event: any) => {
            const url = event.url;
            const { path, id } = extractPathAndId(url);
            console.log("path, params======", path, id)
            if (path && id) {
                navigateToScreen(path, id);
            }
        };

        // Attach event listener
        Linking.addEventListener('url', handleDeepLink);

        // Check if the app was opened via a deep link
        Linking.getInitialURL().then((url) => {
            if (url) {

                handleDeepLink({ url });
            }
        });
        return () => { }
    }, [notificationUrl])
    // useEffect(() => {
    //     dispatch(fetchProducts('', 1));
    // }, [])
    const [videoData, setVideoData] = useState(null);

    const getVideo = async () => {
        try {
            const response = await axios.get('https://indulgeconcierge.com/get-all-vidoes-noToken'); // replace with actual API endpoint
            console.log("Video data fetched successfully:", response.data);
            await downloadAllVideos(response.data.videos);
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    useEffect(() => {
        getVideo();
    }, []);
    const [videoPaths, setVideoPaths] = useState([]);
    const directoryPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.CachesDirectoryPath;

    // Function to check if a video file exists
    const checkIfVideoExists = async (fileName) => {
        const videoPath = `${directoryPath}/${fileName}`;
        const exists = await RNFS.exists(videoPath);
        return exists ? videoPath : null;
    };

    // Function to download a video
    const downloadVideo = async (url, fileName) => {
        try {
            const filePath = `${directoryPath}/${fileName}`;
            const downloadResult = await RNFS.downloadFile({
                fromUrl: url,
                toFile: filePath,
            }).promise;

            if (downloadResult.statusCode === 200) {
                return filePath;
            }
            return null;
        } catch (error) {
            console.error('Download Error:', error);
            return null;
        }
    };

    // Download videos one by one for all data
    const downloadAllVideos = async (reelData) => {
        const downloadedPaths = [];

        for (const item of reelData) {
            const fileName = `reel_${item._id}.mp4`;
            const localVideoPath = await checkIfVideoExists(fileName);

            if (!localVideoPath) {
                console.log(`Downloading video for item ID: ${item._id}`);
                const downloadedPath = await downloadVideo(item.videoUrl, fileName);
                downloadedPaths.push(downloadedPath ? downloadedPath : item.videoUrl);
            } else {
                console.log(`Video already exists for item ID: ${item._id}`);
                downloadedPaths.push(localVideoPath);
            }
        }

        console.log("All video paths:", downloadedPaths);
        return downloadedPaths;
    };

    // useEffect(() => {
    //     const fetchVideoPaths = async () => {
    //         const paths = await downloadAllVideos();
    //         setVideoPaths(paths);
    //     };

    //     fetchVideoPaths();
    // }, [reelData]);
    // Function to navigate to the appropriate screen
    const navigateToScreen = async (path: string, params: string) => {
        try {
            const data = await AsyncStorage.getItem('token');
            if (data) {
                dispatch(setDeeplinkDetailsData({}))
                dispatch(fetchDeeplinkDetailsData(path, params));
                dispatch(setIsFromDeeplinking({ isFromDeepLinking: true, path: path, id: params }))
                setInitialRoute("MyStack");
                console.log("GOTO my MyStack====== path, params==", path, params)
                gotoMydrawer("MyDrawer", path, params);
            } else {
                setInitialRoute('IntroImage');
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
            setInitialRoute("IntroImage");
        }
    };


    const gotoMydrawer = (initialRoute: string, path: string, id: string) =>
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: initialRoute,
                    params: {
                        path: path,
                        id: id,
                    },
                },
            ],
        });
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <LoginStack.Screen
                name="IntroVideo"
                component={IntroVideoScreen}
                options={{
                    headerShown: false,
                    // drawerLockMode: 'locked-closed'
                }}
            />
            <LoginStack.Screen
                name="IntroImage"
                component={IntroImageScreen}
                options={{
                    headerShown: false,
                    // gestureEnabled: false,
                    // drawerLockMode: 'locked-closed'
                }}
            />
            <LoginStack.Screen
                name="MyStack"
                component={MyStack}
                options={{
                    headerShown: false,
                    // gestureEnabled: false,
                    // drawerLockMode: 'locked-closed'
                }}
            />
            <LoginStack.Screen
                name="WelComeScreen"
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                    // drawerLockMode: 'locked-closed'
                }}
            />
            <LoginStack.Screen
                name="MyDrawer"
                component={MyDrawer}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="LoginMainScreen"
                component={LoginMainScreen}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="BenifitScreen"
                component={BenifitScreen}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="OtpScreen"
                component={OtpScreen}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="RegisterOtpScreen"
                component={RegisterOtpScreen}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="ContactConciergePage"
                component={ContactConciergePage}
                options={{
                    headerShown: false,
                }}
            />
            <LoginStack.Screen
                name="ChatAiQNAScreen"
                component={ChatAiQNAScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Terms & Conditions" component={TermAndConditionsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};
export default MyStack;
