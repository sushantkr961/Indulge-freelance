import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../Utils/Constant/Colors';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { changeQuantityData } from '../../../StoreRedux/CartListSlice';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';
import FastImage from 'react-native-fast-image';

const RenderCard = ({ item }: any) => {
    const dispatch = useAppDispatch()
    const { cartList, status, error } = useAppSelector(((state: any) => state.cartList))
   
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

    const [quantity, setQuantity] = useState<number>(item.quantity)
    const chngeQuantity = (qty: number) => {
        const region = "IN";//Localize.getCountry()

        setQuantity(qty)
        dispatch(changeQuantityData({
            "productId": item.productId._id,
            "quantity": qty
        }, region))
    }
    // Function to get the price and region information
    const getPriceInfo = (prices: any) => {
        const region = "IN"; //Localize.getCountry()
        const priceInfo = prices.find((price: any) => price.region.toLowerCase() === region.toLowerCase());
        if (priceInfo) {
            const currencySymbol = getCurrencySymbol(priceInfo.region);
            return `${currencySymbol}${priceInfo.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        } else {
            return `0`; // Return null if no price information is found for the specified region
        }
    };
    return (
        <>
            <View style={styles.itemContainer}>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: item?.productId?.mainImage?.url,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.subtitle}>{item.productId.categories[0]}</Text>
                    <View style={styles.cardActionView}>
                        <Text style={styles.price}>{getPriceInfo(item.productId.prices)}</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, { opacity: quantity == 0 ? 0.5 : 5 }]}
                                onPress={() => chngeQuantity(quantity - 1)}
                                disabled={quantity >= 1 ? false : true}
                            >
                                <MaterialCommunityIcons name="minus" size={28} color={colors.WHITE_COLOR} />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity
                                style={[styles.actionButton, { opacity: quantity == 4 ? 0.5 : 5 }]}
                                onPress={() => chngeQuantity(quantity + 1)}
                                disabled={quantity <= 3 ? false : true}
                            >
                                <MaterialCommunityIcons name="plus" size={28} color={colors.WHITE_COLOR} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.divider} />
        </>
    )
}

export default RenderCard

const styles = StyleSheet.create({

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 15
    },
    image: {
        width: 84,
        height: 84,
        borderRadius: 10,
        marginRight: 10
    },
    detailsContainer: {
        flex: 1
    },
    title: {
        marginBottom: 5,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        textAlign: 'left'
    },
    subtitle: {
        color: colors.GREY_DARK_LINE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_13,
        textAlign: 'left',
        marginBottom: 5
    },
    price: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        textAlign: 'left',
        marginTop: 10
    },
    quantity: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.BOLD,
        fontSize: FontSize.F_16,
        textAlign: 'left'
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: -10
    },
    actionButton: {
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        borderWidth: 1,
        borderColor: colors.BACK_BLUE_DARK
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
})