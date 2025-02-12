
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../Utils/Constant/Colors';
import { useIsFocused } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { fetchMyBidData } from '../../../StoreRedux/AuctionOngoingSlice';
import OngoingCard from './OngoingCard';
import { STATUSES } from '../../../StoreRedux/objects';

const MyBids = () => {
    const { myBidData, status } = useAppSelector((state: any) => state.auctionOngoing);
    const { userId } = useAppSelector((state) => state.profileDetails);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useAppDispatch()
    const isFocused = useIsFocused()

    useEffect(() => {
        dispatch(fetchMyBidData(userId))
    }, [isFocused, userId])

    const onRefresh = async () => {
        setRefreshing(true);
        // Fetch new data here
        await dispatch(fetchMyBidData(userId)); // Assume this is the action to fetch ongoing bid data
        setRefreshing(false);
    };

    const renderItem1 = ({ item }: any) => <OngoingCard item={item} />
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
                data={myBidData}
                renderItem={renderItem1}
                keyExtractor={item => item._id.toString()}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.WHITE_COLOR]} // Customize the refresh indicator color
                    />
                }
            />
            {/* <Text style={styles.title}>Work In Progress</Text> */}
        </View>

    );
}

export default MyBids

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F15'
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
    item: {
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16
    },
    itemBackground: {
        height: 340, // Adjust height as needed
    },
    backgroundImage: {
        resizeMode: 'cover',
        borderRadius: 16
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
    },
    subTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    title: {
        color: colors.WHITE_COLOR,
        fontFamily: 'PF Beau Sans Pro-SemiBold',
        fontSize: 24,
        // fontWeight: '600',
        textAlign: 'left'
    }

});
