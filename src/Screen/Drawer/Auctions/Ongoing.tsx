import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, Platform, RefreshControl, ActivityIndicator } from 'react-native';
import { colors } from '../../../Utils/Constant/Colors';
import LinearGradient from 'react-native-linear-gradient';
import RenderSubTextView from '../../../Components/RenderSubTextView';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../../StoreRedux/hooks/Hooks';
import { fetchOngoingBidData } from '../../../StoreRedux/AuctionOngoingSlice';
import * as Localize from 'react-native-localize';
import { getCurrencySymbol } from '../../../Utils';
import { STATUSES } from '../../../StoreRedux/objects';
import OngoingCard from './OngoingCard';
const Ongoing = () => {
    const { onGoingBidData, status } = useAppSelector((state: any) => state.auctionOngoing);
    const navigation = useNavigation();
    const isFocused = useIsFocused()

    const { userId, currency } = useAppSelector((state) => state.profileDetails);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchOngoingBidData(userId))
    }, [isFocused])
    const [refreshing, setRefreshing] = useState(false);

    const goToAuctionsSubScreen = (item: any) => {
        navigation.navigate('AuctionsSubScreen', { item: item });
    };
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            // Assuming you are calculating timeLeft for a specific item
            if (onGoingBidData.length > 0) {
                const firstItem = onGoingBidData[0]; // Get the first item for example
                const time = getTimeLeft(firstItem.auctionStartTime, firstItem.auctionEndTime);
                setTimeLeft(time);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [onGoingBidData]);
    const getTimeLeft = (auctionStartTime: any, auctionEndTime: any) => {
        const startTime = new Date(auctionStartTime).getTime();
        const endTime = startTime + auctionEndTime;
        const now = new Date().getTime();

        let timeLeft = endTime - now;

        if (timeLeft < 0) {
            return "Auction has ended";
        }

        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        const formatNumber = (number: any) => (number < 10 ? `0${number}` : number);

        return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    };

    const onRefresh = async () => {
        setRefreshing(true);
        // Fetch new data here
        await dispatch(fetchOngoingBidData()); // Assume this is the action to fetch ongoing bid data
        setRefreshing(false);
    };
    // Function to get the price and region information
    const getPriceInfo = (product: any) => {
        const region = Localize.getCountry()
        const priceInfo = product.find((price: any) => price.region.toLowerCase() === region.toLowerCase());
        if (priceInfo) {
            const currencySymbol = getCurrencySymbol(region);
            return `${currencySymbol}${priceInfo.amount}`
        } else {
            return null; // Return null if no price information is found for the specified region
        }
    };
    const renderItem = ({ item }: any) => <OngoingCard item={item} />
    if (status === STATUSES.LOADING) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={onGoingBidData}
                renderItem={renderItem}
                keyExtractor={(item) => item?._id.toString()}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.WHITE_COLOR]} // Customize the refresh indicator color
                    />
                }
            />
        </View>
    );
};

export default Ongoing;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F15',
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    subTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    }
});
