import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { STATUSES } from '../../../StoreRedux/objects';
import { colors } from '../../../Utils/Constant/Colors';
import RenderCard from './RenderCard';

const CartList = ({ cart, status, error }: any) => {
    return (
        <View style={styles.container}>
            {
                status === STATUSES.ERROR || error && Alert.alert("Error: ", error)
            }
            {
                status === STATUSES.LOADING &&
                <ActivityIndicator size="large" color={colors.YELLO_THEME_COLOR} />
            }
            <FlatList
                data={cart}
                renderItem={({ item }: any) => <RenderCard item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 15
    }
});

export default CartList;
