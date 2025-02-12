import { StyleSheet, Text, View, FlatList, ImageBackground, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../Utils/Constant/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import RenderSubTextView from '../../../Components/RenderSubTextView';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import OrdersList from './OrdersList';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { fetchOrderListData } from '../../../StoreRedux/OrderListSlice';
import { STATUSES } from '../../../StoreRedux/objects';

const OngoingOrders = () => {

    const dispatch = useAppDispatch()
    const { userId } = useAppSelector((state) => state.profileDetails);
    const orderList = useAppSelector((state) => state.orderList.orderList)
    const { status, error } = useAppSelector((state) => state.orderList);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused()

    useEffect(() => {
        if (userId) {
            dispatch(fetchOrderListData(userId, "pending"))
        }
    }, [userId, dispatch, isFocused]);
    const onRefresh = async () => {
        setRefreshing(true);
        // Fetch new data here
        dispatch(fetchOrderListData(userId, "pending"))
        setRefreshing(false);
    };
    return (
        <View style={styles.container}>
            {status === STATUSES.LOADING ? (
                <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
            ) : (
                <OrdersList orderList={orderList} onRefresh={onRefresh} refreshing={refreshing} />
            )}
        </View>
    );
};

export default OngoingOrders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK
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
        height: 340, // Adjust height as needed
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
    },
});
