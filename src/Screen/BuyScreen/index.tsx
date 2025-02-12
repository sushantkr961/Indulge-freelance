import { ScrollView, View, StyleSheet, Text, Platform, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, Linking, Share } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../Utils/Constant/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import CustomCarousel from './CustomCarousel';
import { addToCartApi } from '../../Service/CartApi/CartApiServices';
import { useAppSelector } from '../../StoreRedux/hooks/Hooks';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';
import WhatsappIconSvg from '../../../assets/svg/WhatsappIconSvg';
import CallingIconSvg from '../../../assets/svg/CallingIconSvg';
import ActionIcons from '../../Components/ActionIcons';
import { setDeeplinkDetailsData, setIsFromDeeplinking } from '../../StoreRedux/DeepLinkingSlice';
import ShareIconSvg from '../../../assets/svg/ShareIconSvg';

const BuyScreen = () => {
    const route = useRoute();
    const { item }: any = route.params;
    const [cartLoader, setCartLoader] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const { mobile_no, whatspLink, walletBalance, region, currency, userId } = useAppSelector((state) => state.profileDetails);
    const { deeplinkURL } = useAppSelector((state) => state.deeplinkData);

    const actionButton = [
        {
            "id": 0,
            "source": <WhatsappIconSvg width={26} height={26} activeColor={colors.WHITE_COLOR} />, // require('../../../assets/screen/WhatsappIconData.png'),
            "onPress": () => bookNow(item?.name)
        },
        {
            "id": 1,
            "source": <CallingIconSvg width={26} height={26} />,
            "onPress": () => callNow('+91 8087773374')
        },
        {
            "id": 2,
            "source": <ShareIconSvg width={26} height={26} />, //require('../../../assets/screen/ShareIconWhite.png'),
            "onPress": () => sharePlace()
        },
        // {
        //     "id": 2,
        //     "source": require('../../../assets/screen/LikeWhite.png'),
        //     "onPress": () => { },
        //     "isLike": false
        // },
    ]
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const backPress = () => {
        dispatch(setDeeplinkDetailsData({}))
        dispatch(setIsFromDeeplinking({ isFromDeepLinking: false, path: '', id: '' }))
        navigation.goBack()
    }
    const addToCart = () => {
        navigation.navigate('Cart' as never)
    }
    const sharePlace = async () => {
        const result = await Share.share({
            message: `Hey there, I am interested to know about ${deeplinkURL}?path=Shop&id=${item._id}`,
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
    const bookNow = (productName: string) => {
        const message = `Hey there, I am interested to know about  ${deeplinkURL}?path=Shop&id=${item._id}`;
        const url = `https://api.whatsapp.com/send?phone=+918956611374&text=${encodeURIComponent(message)}`;
        // const url = `${whatspLink}&text=${encodeURIComponent(message)}`;
        // const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        // const url = `${whatspLink}&text=${encodeURIComponent(message)}`;
        console.log("url::::", url)
        Linking.openURL(url).catch((err) => Alert.alert("Error opening WhatsApp", err));
    };
    const priceOnRequest = () => {
        const message = `Please help me with the price of this product. 
        *${item?.name?.trim()}* 
        ${deeplinkURL}?path=Shop&id=${item._id}`;
        const url = `https://api.whatsapp.com/send?phone=+918956611374&text=${encodeURIComponent(message)}`;
        // const url = `whatsapp://send?text=${encodeURIComponent(message)}&phoneNumber=+918956611374`;
        Linking.openURL(url).catch((err) => Alert.alert("Error opening WhatsApp", err));
    };
    const productOnRequest = () => {
        const message = `Please assist me with the quantity of this product: *${item?.name?.trim()}* 
        Here’s the link: ${deeplinkURL}?path=Shop&id=${item._id}`;
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch((err) => Alert.alert("Error opening WhatsApp", err));
    };

    const callNow = (number: any) => {
        const url = `tel:${number}`;

        Linking.openURL(url).catch((err) =>
            Alert.alert("Error opening the dialer", err.message)
        );
    };

    const handleAddToCart = async () => {
        const itemToAdd = {
            userId: userId,
            productId: item._id,
            quantity: 1
        };
       
        setCartLoader(true);
        setMessage(null);
        try {
            const response = await addToCartApi(itemToAdd);
            setMessage(response.message);
            navigation.navigate('Cart' as never)
        } catch (error: any) {
            setMessage(error.message);
            Alert.alert("Error:", error.message)
        } finally {
            setCartLoader(false);
        }
    };
    const getCurrencySymbol = (region: any) => {
        switch (region.toUpperCase()) {
            case 'IN':
                return '₹'; // Indian Rupee
            case 'AE':
                return 'د.إ'; // UAE Dirham
            case 'GB':
                return '£'; // British Pound
            case 'EU':
                return '€'; // Euro
            case 'US':
                return '$'; // US Dollar
            default:
                return '$'; // Default to US Dollar if region is not recognized
        }
    };
    // Function to get the price and region information
    const getPriceInfo = (product: any) => {
        const region = "IN"; //Localize.getCountry()
        const priceInfo = product.find((price: any) => price.region.toLowerCase() === region.toLowerCase());
        if (priceInfo) {
            const currencySymbol = getCurrencySymbol(region);
            return `${currencySymbol}${priceInfo.amount?.toLocaleString()}`
        } else {
            return null; // Return null if no price information is found for the specified region
        }
    };
    const getOnlyPriceInfo = () => {
        const region = "IN"; //Localize.getCountry()
        const priceInfo = item?.prices?.find((price: any) => price.region.toLowerCase() === region.toLowerCase());
        return priceInfo.amount
    }
    const buyNow = () => {
        // "products": cart?.map((item: any) => ({
        //     productId: item.productId._id,
        //     quantity: item.quantity
        // })),
        const products = [{
            productId: item._id,
            quantity: 1
        }]
        navigation.navigate('Checkout', { isFromBuyNow: true, products: products, price: getOnlyPriceInfo() });
    };


    return (
        <ScrollView style={styles.container} nestedScrollEnabled={true} contentContainerStyle={{ marginBottom: 100 }}>
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
                <CustomCarousel item={item} />
                {/* <ImageBackground
                    source={require('../../../assets/drawer/auction/Image3.png')}
                    style={styles.itemBackground}
                    imageStyle={styles.backgroundImage}
                >
                </ImageBackground> */}
                <View style={styles.subcontainer} >
                    <Text style={styles.title}>{item?.categories[0]}</Text>
                    <Text style={styles.title1}>{item?.name}</Text>
                    <View style={styles.cardActionView}>
                        <Text style={styles.title2}>{item?.isPriceOnRequest ? '' : getPriceInfo(item.prices)}</Text>
                        <View style={styles.cardActionView1}>
                            {actionButton?.map((item) => <ActionIcons item={item} key={item.id} />)}
                        </View>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.subcontainer1} >
                <Text style={styles.title3}>Description</Text>
                <Text style={styles.title4}>{item.description}</Text>
            </View>
            {!item?.isPriceOnRequest && <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleAddToCart} style={[styles.cartButtonView, { opacity: item?.availableQuantity == 0 ? 0.4 : 1 }]}
                    disabled={item?.availableQuantity == 0}
                >
                    <Image
                        source={require('../../../assets/screen/Cart.png')}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                    {cartLoader ? (
                        <ActivityIndicator size="small" color={colors.YELLO_THEME_COLOR} />
                    ) : <Text style={styles.buttonTitle}>{item?.availableQuantity == 0 ? 'Sold Out' : 'Add to Cart'}</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={buyNow}
                    style={[styles.cartButtonView1, { opacity: item?.availableQuantity == 0 ? 0.4 : 1 }]}
                    disabled={item?.availableQuantity == 0}
                >
                    <Text style={styles.buttonTitle}>Buy Now</Text>
                </TouchableOpacity>
            </View>}
            <View style={styles.buttonContainer}>
                {item?.isPriceOnRequest && <TouchableOpacity onPress={priceOnRequest} style={styles.cartButtonView1}>
                    <Text style={styles.buttonTitle}>Price On Request</Text>
                </TouchableOpacity>
                }
                {/* {item?.availableQuantity == 0 && < Text style={styles.title2}>Qty.: {item?.availableQuantity}</Text>} */}
                {/* {item?.availableQuantity == 0 && <TouchableOpacity onPress={productOnRequest} style={styles.cartButtonView1}>
                    <Text style={styles.buttonTitle}>Sold Out</Text>
                </TouchableOpacity>
                } */}
            </View>
        </ScrollView >
    )
};

export default BuyScreen

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10
    },
    title: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        textAlign: 'left'
    },
    title1: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_15,
        textAlign: 'left',
        marginTop: 10
    },
    title2: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        textAlign: 'left',
        marginTop: 10
    },
    title3: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        textAlign: 'left',
        marginTop: 10
    },
    title4: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        textAlign: 'left',
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
        marginStart: 5
    },
    buttonTitle: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_15,
        textAlign: 'left'
    }
})
