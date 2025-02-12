import { ScrollView, View, StyleSheet, Text, Platform, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, Linking, Share } from 'react-native'
import React from 'react'
import { colors } from '../../Utils/Constant/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppDispatch, useAppSelector } from '../../StoreRedux/hooks/Hooks';
import ExploreCustomCarousel from './ExploreCustomCarousel';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';
import ShareIconSvg from '../../../assets/svg/ShareIconSvg';
import LocationIconSvg from '../../../assets/svg/LocationIconSvg';
import ActionIcons from '../../Components/ActionIcons';
import { setDeeplinkDetailsData, setIsFromDeeplinking } from '../../StoreRedux/DeepLinkingSlice';

const ExploreSubScreen = () => {
    const route = useRoute();
    const dispatch = useAppDispatch();
    const { deeplinkURL } = useAppSelector((state) => state.deeplinkData);
    const { item }: any = route.params;
    const { whatspLink } = useAppSelector((state) => state.profileDetails);
    const actionButton = [
        {
            "id": 0,
            "source": <ShareIconSvg width={26} height={26} />, //require('../../../assets/screen/ShareIconWhite.png'),
            "onPress": () => sharePlace()
        },
        {
            "id": 2,
            "source": <LocationIconSvg width={25} height={30} />,// require('../../../assets/screen/LocationIcon.png'),
            "onPress": () => mapCallNow(item?.mapLink),
            "isLike": false
        }
    ]
    const navigation = useNavigation()
    const backPress = () => {
        dispatch(setDeeplinkDetailsData({}))
        dispatch(setIsFromDeeplinking({ isFromDeepLinking: false, path: '', id: '' }))
        navigation.goBack()
    }

    const sharePlace = async () => {
        const result = await Share.share({
            message: `Hey,
            Check this out on Indulge🧞‍♀️ - ${deeplinkURL}?path=Explore&id=${item._id}`,
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log(`Shared with activity type: ${result.activityType}`);
            } else {
                console.log('Link was shared');
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('Share was dismissed');
        }
    }
    const bookNow = (place: string) => {
        const secondLink = "https://buy.stripe.com/8wM03K5rT845fsI3dn";
        const message = `Hey,
        Check this out on Indulge🧞‍♀️ - ${deeplinkURL}?path=Explore&id=${item._id}`;
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        // const url = `${whatspLink}/send?text=${encodeURIComponent(message)}`;
        if (whatspLink) {
            Linking.openURL(whatspLink).catch((err) => Alert.alert("Error opening WhatsApp", err));
            return
        } else {
            Linking.openURL(secondLink).catch((err) => Alert.alert("Error opening Link", err));
        // navigation.goBack();
        // // Pass 'Concierge' as a param
        // navigation.navigate('Explore', {
        //     screen: 'Concierge',
        // });
        }
    };
    const mapCallNow = (url: string) => {
        Linking.openURL(url).catch((err) => Alert.alert("Error opening WhatsApp", err));
    };

    return (
        <ScrollView style={styles.container} nestedScrollEnabled={true} contentContainerStyle={{ marginBottom: 120 }}>
            <LinearGradient
                colors={['rgba(26, 26, 35, 0)', '#0F0F15']}
                style={styles.gradientView}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.8 }}
            >
                <TouchableOpacity onPress={backPress} style={styles.backIconContainer}>
                    <Image
                        source={require('../../../assets/intro/BackArrow3.png')}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <ExploreCustomCarousel item={item} />
                <View style={styles.subcontainer} >
                    <View style={styles.cardActionView}>
                        <View style={styles.subTitleContainer1}>
                            {item?.name && <Text style={styles.subTitle} numberOfLines={1}>{item?.name} </Text>}
                            {item?.city && <Text style={styles.title11} >{item?.city}</Text>}
                        </View>
                        <View style={styles.cardActionView1}>
                            {actionButton?.map((item) => <ActionIcons item={item} key={item.id} />)}
                        </View>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.subcontainer1} >
                <Text style={styles.title3}>Description</Text>
                <Text style={styles.title4}>{item?.description}</Text>
            </View>
            <TouchableOpacity onPress={() => bookNow(item?.name)}
                style={styles.cartButtonView1
                    // { opacity: whatspLink ? 1 : 0.3 }]
                }
            // disabled={whatspLink ? false : true}
            >
                <Text style={styles.buttonTitle}>Reserve</Text>
            </TouchableOpacity>
        </ScrollView >
    )
};

export default ExploreSubScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        paddingTop: Platform.OS == 'ios' ? 50 : 10
    },
    imageContainer: {
        flex: 1,
        height: 450,
        width: '100%',
        backgroundColor: 'red'
    },
    gradientView: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    subcontainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: colors.BLACK_BLUE_DARK,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    subcontainer1: {
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 40
    },
    cardActionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardActionView1: {
        // flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10
    },
    title3: {
        textAlign: 'left',
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_24,
        fontFamily: Fonts.SEMIBOLD,
        marginTop: 10
    },
    title4: {
        textAlign: 'left',
        fontSize: FontSize.F_18,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        marginTop: 20
    },
    itemBackground: {
        height: Platform.OS == 'ios' ? 600 : 550, // Adjust height as needed
        marginHorizontal: 20
    },
    backgroundImage: {
        resizeMode: 'cover',
        borderRadius: 16
    },
    subTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 40
    },
    backIconContainer: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20
    },
    backIcon: {
        // position: 'absolute',
        // top: 20,
        // left: 20,
        // width: 24,
        // height: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: Platform.OS == 'ios' ? 80 : 20
    },
    cartButtonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.GREY_DARK_LINE_COLOR,
        padding: 8,
        borderRadius: 10,
        marginEnd: 5
    },
    cartButtonView1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.YELLO_THEME_COLOR_DARK,
        padding: 11,
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 150
    },
    buttonTitle: {
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_18,
        fontFamily: Fonts.REGULAR,
        textAlign: 'left'
    },
    subTitleContainer1: {
        flex: 1
    },
    title11: {
        flex: 1,
        textAlign: 'left',
        color: colors.GREY_FONT_FONT_COLOR,
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR
    },
    subTitle: {
        flex: 1,
        textAlign: 'left',
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_26,
        fontFamily: Fonts.REGULAR,
        marginTop: 10
    },
})
