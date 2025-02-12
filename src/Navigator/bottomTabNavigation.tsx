import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CalenderScreen from '../Screen/Calender/index';
import ConciergeScreen from '../Screen/Concierge/index';
import FeedScreen from '../Screen/FeedOld/index_Vertical_Flatlist';
import { View, Linking } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShopScreen from '../Screen/Shop';
import ExploreScreen from '../Screen/Explore';
import { useAppDispatch, useAppSelector } from '../StoreRedux/hooks/Hooks';
import { setIsWelcomeIsShown, setWhatspLink } from '../StoreRedux/ProfileDetailsSlice';
import apiService from '../Service/Api';
import { useNavigation } from '@react-navigation/native';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';
import ShopIconSvg from '../../assets/svg/ShopIconSvg';
import ExploreSvg from '../../assets/svg/ExploreSvg';
import WhatsappIconSvg from '../../assets/svg/WhatsappIconSvg';
import FeedIconSvg from '../../assets/svg/FeedIconSvg';
import CalendarIconSvg from '../../assets/svg/CalendarIconSvg';
import BottomTabCustomTooltip from '../Components/BottomTabCustomTooltip';
import WelcomeScreen from '../Components/WelcomeScreen';
import { fetchExploreCarouselData, fetchShopCarouselData } from '../StoreRedux/GetEcomAndExploreCarosalImageSlice';
import RNFS from 'react-native-fs';
import { fetchExploreFilterData } from '../StoreRedux/ExploreFilterListSlice';

const Tab = createMaterialBottomTabNavigator();

type UserData = {
    whatsAppLink: string;
};

function MyBottomTabs({ route }: any) {
    const { path, id } = route.params || { path: undefined, id: undefined };
    const theme = useTheme();
    const dispatch = useAppDispatch();
    theme.colors.secondaryContainer = "transparent";
    const navigation = useNavigation();
    const { isWelcomeIsShown, isFromReginster } = useAppSelector((state) => state.profileDetails);
    const { shopCarosalList, exploreCarosalList } = useAppSelector((state) => state.carosalImageData);

    const [userData, setUserData] = useState<UserData | null>(null);
    const [tooltipStep, setTooltipStep] = useState<number>(0); // Track tooltip step
    const [tooltipsShown, setTooltipsShown] = useState(false); // Track if tooltips have been shown
    const [welcomeVisible, setWelcomeVisible] = useState(false);
    const { exploreFilterListData } = useAppSelector(
        (state: any) => state.exploreFilterList
    );
    const { filterListData } = useAppSelector((state: any) => state.shopFilterList);

    const tooltipData = [
        {
            index: 0,
            text: "Effortlessly top up your funds, explore transaction history, and unlock benefits by referring friends",
            title: "Profile"
        },
        {
            index: 1,
            text: "Shop to elevate your everyday—explore the Indulge Shop, filled with unique and exquisite pieces curated just for you.",
            title: "Shop"
        },
        {
            index: 2,
            text: "Introducing the first-ever calendar that manages your life’s special moments—birthdays, anniversaries, sports and global music events. The only private calendar you'll ever need.",
            title: "Calender"
        },
        {
            index: 3,
            text: "Explore the latest in luxury living, from fashion to travel, with our bite-sized Reels that elevate your lifestyle across the world",
            title: "Feed"
        },
        {
            index: 4,
            text: "Discover cities like never before—use the Explore section to find the best experiences, dining spots, and activities tailored to your tastes.",
            title: "Explore"
        },
        {
            index: 5,
            text: "The future of bespoke services is here—connect with your concierge team on WhatsApp, and enjoy seamless, 24/7 assistance.",
            title: "Concierge"
        }
    ];
    const downloadImages = async (carosalList: any, isFrom: any) => {
        try {
            const localPaths = [];

            for (let item of carosalList) {
                const filePath = `${RNFS.DocumentDirectoryPath}/${item._id}.jpg`;

                // Check if image already exists
                const imageExists = await RNFS.exists(filePath);
                if (!imageExists) {
                    // Download and save image
                    await RNFS.downloadFile({
                        fromUrl: item.images.url,
                        toFile: filePath,
                    }).promise;
                }

                localPaths.push(filePath);
            }


            // Save local paths in AsyncStorage
            if (isFrom === 'Ecommerce') {
                await AsyncStorage.setItem('carouselEcommerceImages', JSON.stringify(localPaths));
            }
            if (isFrom === 'Explore') {
                await AsyncStorage.setItem('carouselExploreImages', JSON.stringify(localPaths));
            }

        } catch (error) {
            console.error('Error downloading images:', error);

        }
    };

    useEffect(() => {
        dispatch(fetchExploreFilterData("EXPLORE"));
        // exploreFilterListData?.length == 0 && dispatch(fetchExploreFilterData("EXPLORE"));
        dispatch(fetchExploreFilterData("ECOMMERCE"));
        // filterListData?.length == 0 && dispatch(fetchExploreFilterData("ECOMMERCE"));
        shopCarosalList?.length > 0 && downloadImages(shopCarosalList, 'Ecommerce')
        exploreCarosalList?.length > 0 && downloadImages(exploreCarosalList, 'Explore')
    }, [shopCarosalList, exploreCarosalList]);

    useEffect(() => {
        const fetchData = async () => {
            if (shopCarosalList.length === 0 || exploreCarosalList.length === 0) {
                console.log("Carosal data called...........")
                dispatch(fetchShopCarouselData('ecommerce', true))
                // dispatch(fetchExploreCarouselData('explore', true))
            }

            const storedNumber = await AsyncStorage.getItem('phoneNumber');
            try {
                const response = await apiService.get('/get-whatsapp-group', {
                    params: {
                        mobile_no: storedNumber,
                    },
                });
                if (response?.data?.whatsAppLink && response.data.whatsAppLink === "https://indulge.global/membership/") {
                    setUserData(null);
                    dispatch(setWhatspLink(''))
                } else {
                    setUserData(response.data);
                    dispatch(setWhatspLink(response.data.whatsAppLink));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        const checkWelcomeScreen = async () => {
            const token = await AsyncStorage.getItem('token');

            if (!isWelcomeIsShown && token) {
                openWelcomeModal() // Open WelcomeScreen if not shown before
            }
        };
        checkWelcomeScreen();
    }, []);

    const checkTooltipsShown = async () => {
        if (isFromReginster) {
            setTooltipsShown(true)
        } else {
            dispatch(setIsWelcomeIsShown(true))
        }
    };

    // Function to open the Welcome Modal
    const openWelcomeModal = () => {
        setWelcomeVisible(true);
    };

    // Function to close the Welcome Modal
    const closeWelcomeModal = async () => {
        setWelcomeVisible(false);
        checkTooltipsShown();
    };


    const handlePreviousTooltip = async () => {
        if (tooltipStep == 0) return
        if (tooltipStep <= tooltipData.length - 1) {
            setTooltipStep(tooltipStep - 1);
        } else {
            setTooltipsShown(false);
            dispatch(setIsWelcomeIsShown(true))
        }
    };
    const handleNextTooltip = async () => {
        if (tooltipStep < tooltipData.length - 1) {
            setTooltipStep(tooltipStep + 1);
        } else {
            setTooltipsShown(false);
            dispatch(setIsWelcomeIsShown(true))
        }
    };
    const handleSkipTooltip = async () => {
        setTooltipsShown(false);
        dispatch(setIsWelcomeIsShown(true))
    };

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName={path && id ? path : "Feed"}
                shifting={true}
                barStyle={{
                    backgroundColor: '#000000',
                }}
                activeColor="#C4963D"
                inactiveColor="#ffffff"
                sceneAnimationEnabled={true}
                screenOptions={{
                    tabBarVisible: ({ route }: any) => {
                        if (route.name === 'Feed') {
                            return false;
                        }
                        return true;
                    },
                    tabBarLabelStyle: {
                        display: "none",
                        fontFamily: Fonts.REGULAR,
                        fontSize: FontSize.F_11,
                    },
                    tabBarStyle: { height: 60 },
                    activeBackgroundColor: 'transparent'
                }}
            >
                <Tab.Screen
                    name="Shop"
                    component={ShopScreen}
                    options={{
                        tabBarIcon: ({ color }) => (<ShopIconSvg width={30} height={30} activeColor={color} />),
                        tabBarLabel: 'Shop',
                    }}
                    initialParams={path && id && { path: path, id: id }}
                />
                <Tab.Screen
                    name="Calendar"
                    component={CalenderScreen}
                    options={{
                        tabBarIcon: ({ color }) => (<CalendarIconSvg width={30} height={30} activeColor={color} />),
                    }}
                />
                <Tab.Screen
                    name="Feed"
                    component={FeedScreen}
                    options={{
                        tabBarIcon: ({ color }) => (<FeedIconSvg width={30} height={30} activeColor={color} />),
                    }}
                    initialParams={path && id && { path: path, id: id }}
                />
                <Tab.Screen
                    name="Explore"
                    component={ExploreScreen}
                    options={{
                        tabBarIcon: ({ color }) => (<ExploreSvg width={30} height={30} activeColor={color} />),
                    }}
                    initialParams={path && id && { path: path, id: id }}
                />
                <Tab.Screen
                    name="Concierge"
                    component={ConciergeScreen}
                    initialParams={{ whatsAppLink: userData?.whatsAppLink }}
                    options={{
                        tabBarIcon: ({ color }) => (<WhatsappIconSvg width={30} height={30} activeColor={color} />),
                    }}
                    listeners={{
                        tabPress: () => {
                            if (userData?.whatsAppLink) {
                                Linking.openURL(userData.whatsAppLink)
                                    .catch((err) => console.error("Failed to open WhatsApp link:", err))
                                    .finally(() => {
                                        navigation.navigate('Feed' as never);
                                    });
                            }
                        },
                    }}
                />
            </Tab.Navigator>
            <WelcomeScreen
                visible={welcomeVisible}
                onClose={closeWelcomeModal}
            />
            <BottomTabCustomTooltip
                visible={tooltipsShown}
                tooltipData={tooltipData}
                tooltipStep={tooltipStep}
                handleNextTooltip={handleNextTooltip}
                handlePreviousTooltip={handlePreviousTooltip}
                handleSkipTooltip={handleSkipTooltip}
            />
        </View>
    );
}

export default MyBottomTabs;
