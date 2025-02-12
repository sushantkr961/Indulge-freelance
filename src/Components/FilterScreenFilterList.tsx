import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterTags } from '../StoreRedux/ShopFilterListSlice';
import { colors } from '../Utils/Constant/Colors';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';

const FilterScreenFilterList = () => {
    const { filterListData } = useSelector(((state: any) => state.shopFilterList))
    const dispatch = useDispatch();

    const renderEventsSuggestionItem = ({ item }: any) => (
        <TouchableOpacity
            style={[
                styles.eventSuggestionView,
                Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow,
                { backgroundColor: item.selected ? colors.YELLO_THEME_COLOR : colors.BACK_BLUE_DARK },
            ]}
            onPress={() => dispatch(setFilterTags({ id: item.id }))}
        >
            <Text style={styles.eventSuggestionText}>{item.name}</Text>
        </TouchableOpacity >
    );

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={3}
                showsVerticalScrollIndicator={false}
                data={filterListData}
                renderItem={renderEventsSuggestionItem}
                keyExtractor={(item: any) => item.id.toString()}
                extraData={filterListData}
            />
        </View>
    );
};

export default FilterScreenFilterList;

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    eventSuggestionView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 25,
        marginEnd: 10,
        overflow: 'hidden',
        marginBottom: 5
    },
    eventSuggestionText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16
    },
    iosShadow: {
        shadowColor: colors.WHITE_COLOR,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5
        },
    },
    androidShadow: {
        elevation: 5,
    },
});

