import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import DrawerScreensHeader from '../../../Components/DrawerScreensHeader';
import { colors } from '../../../Utils/Constant/Colors';
import { useNavigation } from '@react-navigation/native';
import TabNavBarOrders from './TabNavBarOrders';
import { useAppDispatch, useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { fetchOrderListData } from '../../../StoreRedux/OrderListSlice';

const Orders = () => {
    const navigation = useNavigation()
    const goBack = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <DrawerScreensHeader
                title="Orders"
                leftButtonAction={goBack}
            />
            <TabNavBarOrders />
        </View>
    )
};

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
        paddingHorizontal: 20
    },
    textStyle: {
        fontFamily: 'PF Beau Sans Pro-Regular',
        fontSize: 18,
        // fontWeight: '400',
        color: colors.WHITE_COLOR,
        marginTop: 10
    }
})
