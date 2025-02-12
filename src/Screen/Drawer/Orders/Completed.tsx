import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../Utils/Constant/Colors';
import OrdersList from './OrdersList';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { fetchCompleteOrderListData } from '../../../StoreRedux/OrderListSlice';
import { STATUSES } from '../../../StoreRedux/objects';
import { useIsFocused } from '@react-navigation/native';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const Completed = () => {
    const dispatch = useAppDispatch();
    const { userId } = useAppSelector((state) => state.profileDetails);
    const completeOrderList = useAppSelector((state) => state.orderList.completeOrderList);
    const { status, error } = useAppSelector((state) => state.orderList);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused()

    useEffect(() => {
        if (userId) {
            dispatch(fetchCompleteOrderListData(userId, "delivered"));
        }
    }, [userId, dispatch, isFocused]);

    useEffect(() => {
        if (status === STATUSES.ERROR && error) {
            Alert.alert("Error", error);
        }
    }, [error]);
    const onRefresh = async () => {
        setRefreshing(true);
        // Fetch new data here
        dispatch(fetchCompleteOrderListData(userId, "delivered"));
        setRefreshing(false);
    };
    return (
        <View style={styles.container}>
            {status === STATUSES.LOADING ? (
                <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
            ) : <View style={styles.container}>
                {completeOrderList.length > 0 ? (
                    <OrdersList
                        orderList={completeOrderList}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                ) : (
                    <View style={styles.noOrdersContainer}>
                        <Text style={styles.noOrdersText}>No completed orders available.</Text>
                    </View>
                )}
            </View>}
        </View>
    );
}

export default Completed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
        // justifyContent: 'center',
        // alignItems: 'center',
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
        marginHorizontal: 16,
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    title: {
        color: colors.WHITE_COLOR,
        fontFamily: 'PF Beau Sans Pro-SemiBold',
        fontSize: 24,
        // fontWeight: '600',
        textAlign: 'left'
    },
    noOrdersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOrdersText: {
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontSize: FontSize.F_18,
        fontFamily: Fonts.REGULAR,
    },
});
