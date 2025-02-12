import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, { useEffect } from 'react';
import DrawerScreensHeader from '../../Components/DrawerScreensHeader';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../Utils/Constant/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import AuctionIconSvg from '../../../assets/svg/AuctionIconSvg';
import CalendarIcon from '../../../assets/svg/CalendarIcon';
import FeedIcon from '../../../assets/svg/FeedIcon';
import EcommerceIcon from '../../../assets/svg/EcommerceIcon';
import ExploreSvg from '../../../assets/svg/ExploreSvg';
import { useAppDispatch, useAppSelector } from '../../StoreRedux/hooks/Hooks';
import { clearNotificationData, fetchNotificationData } from '../../StoreRedux/CalendarNotificationsSlice';
import { STATUSES } from '../../StoreRedux/objects';
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts';
import { fetchDeeplinkDetailsData, setDeeplinkDetailsData, setIsFromDeeplinking } from '../../StoreRedux/DeepLinkingSlice';
import { extractPathAndId } from '../../Utils';

const CalendarNotifications = () => {
    const dispatch = useAppDispatch();
    const { userId } = useAppSelector((state) => state.profileDetails);

    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                // const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (userId !== null) {
                    dispatch(fetchNotificationData(userId))
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };
        getPhoneNumber();

    }, [userId])

    const navigation = useNavigation();
    const { calendarNotificationsData, status } = useSelector((state: any) => state.calendarNotificationsSlice)

    const goBack = () => {
        navigation.goBack();
    };
    const clearNotification = () => {
        if (calendarNotificationsData.length > 0) {
            dispatch(clearNotificationData(userId))
            dispatch(fetchNotificationData(userId))
        }
    };

    const renderCardItem = ({ item }: any) => {
        const { type } = item;
        // console.log("item==================", item)
        // Define the interface for the mapping
        interface NotificationIconMapping {
            [key: string]: JSX.Element;
        }

        // Create the mapping object
        const notificationImageURIs: NotificationIconMapping = {
            CALENDAR: <CalendarIcon />,
            ECOMMERCE: <EcommerceIcon />,
            EXPLORE: <ExploreSvg width={31} height={31} activeColor={colors.WHITE_COLOR} />,
            REEL: <FeedIcon />,
            AUCTION: <AuctionIconSvg />
        };
        const NotificationType = Object.freeze({
            CALENDAR: 'Calendar',
            ECOMMERCE: 'Shop',
            EXPLORE: 'Explore',
            REEL: 'Feed',
            info: 'info',
            // AUCTION: 'Auctions',
        });
        // Function to get the notification type if it matches
        const getNotificationType = (type: keyof typeof NotificationType) => {
            console.log("type=====", type, NotificationType[type])
            // Check if the passed type exists in the enum
            if (NotificationType[type]) {
                return NotificationType[type];
            } else {
                Alert.alert('', 'Notification type not found');
                return null; // Handle invalid type case
            }
        };
        const getNotificationIcon = (): JSX.Element => {
            return notificationImageURIs[type.toUpperCase()] || <FeedIcon />;
        };
        const goTONotificationLink = () => {
            const notificationType = getNotificationType(type)
            if (notificationType === 'info' && item.productLink) {
                const { path, id } = extractPathAndId(item.productLink);
                (notificationType && path && id) && dispatch(fetchDeeplinkDetailsData(path, id));
                (notificationType && path && id) && gotoMydrawer(path, path, id)
            } else {
                console.log("item==================", item)
                notificationType && dispatch(fetchDeeplinkDetailsData(notificationType, item.productLink));
                notificationType && gotoMydrawer(notificationType, notificationType, item.productLink)
            }
            // notificationType && gotoMydrawer(notificationType, notificationType, item.productLink)
        };
        const gotoMydrawer = (initialRoute: string, path: string, id: string) => navigation.navigate(
            initialRoute, {
            path: path,
            id: id
        });
        return (
            <LinearGradient
                colors={['#1A1A23', 'rgba(26, 26, 35, 0)']}
                style={styles.subContainer}
                start={{ x: 0.5, y: 0.1 }}
                end={{ x: 0.9, y: 1 }}
            >
                <TouchableOpacity style={styles.gradientView} onPress={goTONotificationLink}
                >
                    <View style={styles.imageContainer}>
                        {getNotificationIcon()}
                        <View style={styles.flex1} />
                    </View>
                    <View style={styles.textContainer}>
                        {/* <Text style={styles.titleText}>{item.title}</Text> */}
                        {item?.message && <Text style={styles.nameText}>{item?.message}</Text>}
                        {/* {item?.type && <Text style={styles.typeText}>{item?.type}</Text>} */}
                    </View>
                </TouchableOpacity>
            </LinearGradient >
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer0}>
                <DrawerScreensHeader
                    title="Notifications"
                    leftButtonAction={goBack}
                    style={{ marginTop: 5 }}
                />
                <TouchableOpacity style={styles.clearButton} onPress={clearNotification}>
                    <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
            </View>
            {
                status === STATUSES.LOADING && <View style={styles.subContainer1} >
                    <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
                </View>
            }
            {
                calendarNotificationsData.length == 0 && <View style={styles.subContainer1} >
                    <Text style={styles.typeText0}>No Notifications</Text>
                </View>
            }
            {calendarNotificationsData && <FlatList
                data={calendarNotificationsData}
                renderItem={renderCardItem}
                keyExtractor={(item) => item?._id.toString()}
                showsVerticalScrollIndicator={false}
            />
            }
        </SafeAreaView>
    );
};

export default CalendarNotifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
    },
    subContainer0: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    subContainer: {
        paddingHorizontal: 20,
        marginTop: 5,
        marginBottom: 10
    },
    gradientView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    backIcon: {
        width: 36,
        height: 36,
    },
    imageContainer: {
        paddingVertical: 15
    },
    textContainer: {
        flex: 1,
        paddingVertical: 10,
        marginStart: 15
    },
    flex1: {
        flex: 1
    },
    nameText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300,
        color: colors.WHITE_COLOR,
    },
    typeText0: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        fontWeight: FontWeight.F_W_300,
        alignSelf: 'center'
    },
    typeText: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_15,
        fontWeight: FontWeight.F_W_300,
        marginTop: 10
    },
    clearButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.RED_DARK,
        borderRadius: 10,
        marginEnd: 10

    },
    clearText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_12,
        fontWeight: FontWeight.F_W_300,
    },
    subContainer1: {
        paddingHorizontal: 20,
        marginTop: 20
    },
});
