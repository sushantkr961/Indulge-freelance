import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, Platform, RefreshControl, ActivityIndicator } from 'react-native';
import { colors } from '../../../Utils/Constant/Colors';
import LinearGradient from 'react-native-linear-gradient';
import RenderSubTextView from '../../../Components/RenderSubTextView';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../../StoreRedux/hooks/Hooks';
import { getAmountByRegion, getTimeLeft } from '../../../Utils';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';
import { fetchWonBidData } from '../../../StoreRedux/AuctionOngoingSlice';
import FastImage from 'react-native-fast-image';
const OngoingCard = ({ item }: any) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const goToAuctionsSubScreen = (item: any) => {
        dispatch(fetchWonBidData(item?._id))
        navigation.navigate('AuctionsSubScreen', { item: item });
    };
    const [timeLeft, setTimeLeft] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            // Assuming you are calculating timeLeft for a specific item
            if (item) {
                const time = getTimeLeft(item.auctionStartTime, item.auctionEndTime);
                setTimeLeft(time);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [item]);

    return (
        <TouchableOpacity
            style={[styles.itemButtonStyle, Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow]}
            onPress={() => goToAuctionsSubScreen(item)}
        >
            <FastImage
                style={styles.itemBackground}
                source={{
                    uri: item?.mainImage.url,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            >
            </FastImage>
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>{item?.name}</Text>
                <View style={styles.subTitleContainer}>
                    <RenderSubTextView string1={'Starting Bid'} string2={`₹${getAmountByRegion(item?.prices, "IN")}`} />
                    <RenderSubTextView string1={'Current Bid'} string2={item?.lastBiddedAmount ? `₹${(item.lastBiddedAmount)}` : `₹${getAmountByRegion(item?.prices, "IN")}`} />
                    {item.auctionStartTime && <RenderSubTextView string1={'Hours Left'} string2={`${timeLeft}`} />}
                    {item.myBidValue && <RenderSubTextView string1={'MyBid Value'} string2={`${item.myBidValue}`} />}
                </View>
            </View>
        </TouchableOpacity >
    )
};

export default OngoingCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
    },
    itemButtonStyle: {
        marginVertical: 10,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
    },
    iosShadow: {
        shadowColor: colors.WHITE_COLOR,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    androidShadow: {
        elevation: 5,
    },
    itemBackground: {
        height: 340,
    },
    backgroundImage: {
        resizeMode: 'cover',
        borderRadius: 16,
    },
    titleContainer: {
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    subTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    title: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_24,
        textAlign: 'left'
    }
});
