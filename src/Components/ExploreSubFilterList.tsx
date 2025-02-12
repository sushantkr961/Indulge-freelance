import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setExploreSubFilterTags } from '../StoreRedux/ExploreFilterListSlice';
import { colors } from '../Utils/Constant/Colors';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';

const ExploreSubCategoryFilterList = ({ clickOnSubTag }: any) => {
    const { exploreSubFilterListData } = useSelector(((state: any) => state.exploreFilterList))
    // const dispatch = useDispatch();
    // const clickOnTag = (item: any) => {
    //     dispatch(setExploreSubFilterTags({ id: item.id }))
    // }
    const renderEventsSuggestionItem = ({ item }: any) => (
        <TouchableOpacity
            style={[
                styles.eventSuggestionView,
                Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow,
                item.selected ? styles.selectedItem : styles.unSelectedItem
            ]}
            onPress={() => clickOnSubTag(item)}
        >
            <Text style={[styles.eventSuggestionText, { color: item.selected ? colors.YELLO_THEME_COLOR_TEXT : colors.WHITE_COLOR }]}>{item.name}</Text>
        </TouchableOpacity >
    );

    return (
        <View style={{}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={exploreSubFilterListData}
                renderItem={renderEventsSuggestionItem}
                keyExtractor={(item: any) => item.id.toString()}
                extraData={exploreSubFilterListData} // You can directly pass the state here
            />
        </View>
    );
};

export default ExploreSubCategoryFilterList;

const styles = StyleSheet.create({
    eventSuggestionView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 25,
        marginStart: 16,
        marginTop: 5,
        overflow: 'hidden',
        marginBottom: 20
    },
    eventSuggestionText: {
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR
    },
    selectedItem: {
        backgroundColor: colors.BLACK_BLUE_DARK,
        borderWidth: 2,
        borderColor: colors.YELLO_THEME_COLOR_TEXT
    },
    unSelectedItem: {
        backgroundColor: colors.BLACK_BLUE_DARK,
        borderWidth: 2,
        borderColor: colors.BACK_BLUE_DARK
    },
    iosShadow: {
        shadowColor: colors.WHITE_COLOR,
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 }
    },
    androidShadow: {
        elevation: 5
    },
});

