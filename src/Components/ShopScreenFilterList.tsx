import React, { useCallback, memo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../Utils/Constant/Colors';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';

const ShopScreenFilterList = ({ goToAuction, clickOnTag }: any) => {
    const { filterListData } = useSelector((state: any) => state.shopFilterList);

    const renderEventsSuggestionItem = useCallback(({ item }: any) => (
        <TouchableOpacity
            style={[
                styles.eventSuggestionView,
                Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow,
                { backgroundColor: item.selected ? colors.YELLO_THEME_COLOR : colors.BACK_BLUE_DARK },
            ]}
            onPress={() => clickOnTag(item)}
        >
            <Text style={styles.eventSuggestionText}>{item?.name}</Text>
        </TouchableOpacity >
    ), [clickOnTag]);

    return (
        <View style={{}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={filterListData}
                renderItem={renderEventsSuggestionItem}
                keyExtractor={(item: any) => item.id.toString()}
                extraData={filterListData} // This ensures the list re-renders when filterListData changes
            />
        </View>
    );
};

// Memoize the entire component but include filterListData in dependency
export default memo(ShopScreenFilterList, (prevProps, nextProps) => {
    return prevProps.filterListData === nextProps.filterListData;
});

const styles = StyleSheet.create({
    eventSuggestionView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 25,
        marginStart: 16,
        marginTop: 15,
        overflow: 'hidden',
        marginBottom: 20,
    },
    eventSuggestionText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
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
});
