import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet, FlatList, Alert, Linking } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme, useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import MyStack from './stackNavigation';
import LinearGradient from 'react-native-linear-gradient';
import { colors as color, colors } from '../Utils/Constant/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getZohoCustomerId } from '../Service/ApiService';
import { useAppDispatch, useAppSelector } from '../StoreRedux/hooks/Hooks';
import { fetchProfileDetailsData, setFcmToken, setIsExploreTooltipOpen, setIsFromReginster, setIsHelpModalOpen, setIsShopTooltipOpen, setIsWelcomeIsShown } from '../StoreRedux/ProfileDetailsSlice';
import { getCurrencySymbol } from '../Utils';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';
import { setDeeplinkDetailsData, setIsFromDeeplinking } from '../StoreRedux/DeepLinkingSlice';
import ProfileSvg from '../../assets/svg/drawerSvg/ProfileSvg';
import AuctionSvg from '../../assets/svg/drawerSvg/AuctionSvg';
import OrderSvg from '../../assets/svg/drawerSvg/OrderSvg';
import CartSvg from '../../assets/svg/drawerSvg/CartSvg';
import FavoriteSvg from '../../assets/svg/drawerSvg/FavoriteSvg';
import FaqsSvg from '../../assets/svg/drawerSvg/FaqsSvg';
import ReferAndEarnSvg from '../../assets/svg/drawerSvg/ReferAndEarnSvg';
import { setExploreCarouselData, setShopCarouselData } from '../StoreRedux/GetEcomAndExploreCarosalImageSlice';

// Define custom drawer content
const CustomDrawerContent = () => {
    // const { colors } = useTheme();
    const dispatch = useAppDispatch()
    const { mobile_no, profileDetails, walletBalance, region, currency, userId } = useAppSelector((state) => state.profileDetails);
    const data = [
        { id: '1', title: 'Profile', icon: <ProfileSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '2', title: 'Orders', icon: <OrderSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '3', title: 'Cart', icon: <CartSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '4', title: 'Favorites', icon: <FavoriteSvg height={21} width={18} color={colors.YELLO_THEME_COLOR} /> },
        { id: '5', title: 'Transactions', icon: <ProfileSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '6', title: 'Flash Shop', icon: <FaqsSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '7', title: 'Refers and Earn', icon: <ReferAndEarnSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '8', title: 'Auctions', icon: <AuctionSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '9', title: 'FAQ’s', icon: <FaqsSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '10', title: 'AboutUs', icon: <FaqsSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '11', title: 'CustomerService', icon: <FaqsSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '12', title: 'Terms & Conditions', icon: <FaqsSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '13', title: 'Privacy Policy', icon: <FaqsSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> },
        { id: '14', title: 'Logout', icon: <FaqsSvg height={21} width={21} color={colors.YELLO_THEME_COLOR} /> }
    ];
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const [showTransaction, setShowTransaction] = useState(false)
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const [drawerData, setDrawerData] = useState<any>([]);

    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber) {
                    const id = await getZohoCustomerId(Number(storedNumber))
                    if (!id) {
                        setDrawerData(data.filter(item => item.id != '5'))
                    } else {
                        setDrawerData(data)
                    }
                    dispatch(fetchProfileDetailsData(storedNumber, "IN",// Localize.getCountry(),
                        getCurrencySymbol("IN")))
                } else {
                    console.error('Stored phone number is undefined');
                }
            } catch (error) {
                console.error('Error fetching profile details:', error);
            }
        };
        fetchProfileDetails()
    }, []);
    const closeDrawer = () => {
        // navigation.closeDrawer();
        navigation.dispatch(DrawerActions.closeDrawer())
    };

    const logout = async () => {
        await AsyncStorage.setItem('token', "");
        await AsyncStorage.setItem('profilePictureURI', "");
        await AsyncStorage.setItem('phoneNumber', "")
        await AsyncStorage.setItem('isFromRegister', "")
        dispatch(setIsFromReginster(false));
        // dispatch(setIsWelcomeIsShown(false));
        dispatch(setIsExploreTooltipOpen(false))
        dispatch(setIsShopTooltipOpen(false))
        dispatch(setFcmToken(''))
        dispatch(setDeeplinkDetailsData({}))
        dispatch(setShopCarouselData([]))
        dispatch(setExploreCarouselData([]))
        dispatch(setIsFromDeeplinking({ isFromDeepLinking: false, path: '', id: '' }))
        navigation.reset({
            index: 0,
            routes: [{ name: 'WelComeScreen' } as never],
        })
        closeDrawer()
    }
    const showLogoutConfirmationAlert = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Logout", onPress: () => logout(),
                    style: 'destructive',
                },
            ]
        );
    }
    const onPressMenu = (item: any) => {
        if (item.title === "Flash Shop") {
            Linking.openURL('https://chat.whatsapp.com/GdPpyXW6VOw1M0DIfrOOJn');
            return
        } else if (item.title === "Logout") {
            showLogoutConfirmationAlert()
        } else if (item.title == "CustomerService") {
            Linking.openURL('https://api.whatsapp.com/send?phone=8483977708');
        }
        else {
            navigation.navigate(item.title as never)
        }

    }
    const handleProfileScreen = () => {
        navigation.navigate("Profile" as never)
    }
    const handleWalletScreen = () => {
        navigation.navigate('TopUpBalance' as never)
    }
    const renderItem = ({ item, index }: any) => {
        // Render items 6, 7, 8 with different styles and background
        if (item.id === '6' || item.id === '7' || item.id === '8') {
            return (
                <View>
                    {item.id === '6' && <View style={styles.divider} />}
                    <TouchableOpacity onPress={() => onPressMenu(item)}>
                        <LinearGradient
                            colors={['#1A1A23', 'rgba(26, 26, 35, 0)']}
                            style={[styles.itemContainer]}
                            start={{ x: 0.5, y: 0.1 }}
                            end={{ x: 0.9, y: 1 }}
                        >
                            <View style={styles.icon}>
                                {item.icon}
                            </View>
                            <Text style={styles.title1}>{item.title}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {item.id === '8' && <View style={styles.divider} />}
                </View>
            );
        }
        return (
            <TouchableOpacity
                onPress={() => onPressMenu(item)}
            >
                <LinearGradient
                    colors={['#1A1A23', 'rgba(26, 26, 35, 0)']}
                    style={styles.itemContainer}
                    start={{ x: 0.5, y: 0.1 }}
                    end={{ x: 0.9, y: 1 }}
                >
                    <View style={styles.icon}>
                        {item.icon}
                    </View>
                    <Text style={[styles.title]}>{item.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: color.BLACK_BLUE_DARK }}>
            <View style={{
                backgroundColor: color.BACK_BLUE_DARK,
                borderBottomRightRadius: 20, borderBottomLeftRadius: 20, height: 240, marginBottom: 10
            }}>
                <Pressable style={{ marginTop: 20, marginLeft: 10 }} onPress={closeDrawer}>
                    <Image style={{ width: 42, height: 42 }} source={require('../../assets/drawer/Close.png')} />
                </Pressable>
                <View style={{ marginTop: 40, marginLeft: 20, marginRight: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.profileText}>{profileDetails.name}</Text>
                    <Pressable style={{}} onPress={handleProfileScreen}>
                        <Image source={require('../../assets/drawer/EditImageIcon.png')} />
                    </Pressable>
                </View>
                <View style={{ marginTop: 35, marginRight: 25, marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{}}>
                        <Text style={styles.walletText}>Wallet</Text>
                        <Text style={styles.priceText}>{currency}{walletBalance.toLocaleString()}</Text>
                    </View>
                    <TouchableOpacity style={{ paddingHorizontal: 16, borderRadius: 12, padding: 10, backgroundColor: '#D39F3A' }} onPress={handleWalletScreen}>
                        <Text style={styles.addText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={drawerData}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
        </View>
    );
};

// Create drawer navigator
const Drawer = createDrawerNavigator();

const MyDrawer = ({ route }: any) => {
    const { path, id } = route.params || { path: undefined, id: undefined };
    return (
        <Drawer.Navigator drawerContent={() => <CustomDrawerContent />}>
            <Drawer.Screen name="Stack" component={MyStack} options={{ headerShown: false }} initialParams={{ path, id }} />
            {/* Add more screens as needed */}
        </Drawer.Navigator>
    );
};
export default MyDrawer;


const styles = StyleSheet.create({
    crossImage: {
        marginLeft: 20,
        marginTop: 38
    },
    profileText: {
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_24,
        fontFamily: Fonts.REGULAR
    },
    walletText: {
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_13,
        fontFamily: Fonts.REGULAR
    },
    priceText: {
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_20,
        fontFamily: Fonts.REGULAR
    },
    addButton: {
        width: 64,
        height: 36
    },
    addText: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR
    },
    editableText: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10
    },
    logoutImage: {
        width: 18,
        height: 19.17,
        marginRight: 12
    },
    logoutButton: {
        backgroundColor: '#20202080',
        width: 250,
        height: 42,
        borderRadius: 8,
        alignSelf: 'center',
        padding: 10,
        flexDirection: 'row',
        marginTop: '3%'
    },
    favouriteImage: {
        width: 23,
        height: 19.17,
        marginRight: 10
    },
    profileImage: {
        width: 18.86,
        height: 19.17,
        marginRight: 15
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        borderRadius: 8
    },
    specialItemContainer: {
        backgroundColor: '#333333',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    title: {
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR
    },
    title1: {
        color: colors.GREEN_LIGHT_COLOR,
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR
    },
    divider: {
        height: 1,
        backgroundColor: colors.WHITE_COLOR_30,
        marginVertical: 10,
        marginHorizontal: 10
    },
}) 
