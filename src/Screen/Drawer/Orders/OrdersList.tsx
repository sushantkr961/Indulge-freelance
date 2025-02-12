import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { colors } from '../../../Utils/Constant/Colors';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const OrdersList = ({ orderList, onRefresh, refreshing }: any) => {
    const [filteredOrderList, setFilteredOrderList] = useState<any[]>([]);
    const [quantity, setQuantity] = useState<number>(2)
    const navigation = useNavigation()
    const { currency } = useAppSelector((state) => state.profileDetails);
    useEffect(() => {
        const filteredList = orderList.filter((order: any) => {
            return order.products.every((product: any) => product.product !== null);
        });
        setFilteredOrderList(filteredList);
    }, [orderList]);

    const onOrderPress = (item: any, add: any) => {
        (navigation as any).navigate('OrderScreen', { order: item, shippingAddress: add })
    }
    const renderCartItem = ({ item }: any) => {
        const categories = item?.products.map((product: any) => product?.product?.categories[0]);
        const categoriesString = categories.join(', ');
        const nameString = item?.products.length === 1
            ? item?.products[0].product?.name
            : item?.products.map((product: any) => product?.product.name.slice(0, Math.ceil(product.product?.name.length / 2)) + "...").join(' + ');

        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => onOrderPress(item, item.shippingAddress)}>
                <View style={styles.detailsContainer}>
                    <View style={styles.cardActionView}>
                        <Text style={styles.title}>{categoriesString}</Text>
                        <Text style={[styles.quantity, { color: item?.status == "delivered" ? colors.LIGHT_GREEN : colors.YELLO_THEME_COLOR }]}>{item.status}</Text>
                    </View>
                    <Text style={styles.subtitle}>{nameString?.trim()}</Text>
                    <View style={styles.cardActionView}>
                        <Text style={styles.price}>Total: {currency}{item?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        <View style={styles.actionsContainer}>
                            <Text style={styles.quantity}>Products: {item?.products.length}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredOrderList}
                renderItem={renderCartItem}
                keyExtractor={item => item._id}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
    },
    itemContainer: {
        backgroundColor: colors.BACK_BLUE_DARK,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 16
    },
    image: {
        // flex: 1,
        width: 96,
        height: 96,
        borderRadius: 16,
        marginRight: 10
    },
    detailsContainer: {
        flex: 1,
        padding: 10
    },
    title: {
        flex: 1,
        marginBottom: 8,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        textAlign: 'left'
    },
    subtitle: {
        color: colors.GREY_FONT_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_14,
        textAlign: 'left',
        marginBottom: 5
    },
    price: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_14,
        textAlign: 'left',
        marginTop: 10
    },
    quantity: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_14,
        textAlign: 'left',
        alignSelf: 'center'
    },
    actionsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -10,
        marginEnd: 15

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
});

export default OrdersList;
