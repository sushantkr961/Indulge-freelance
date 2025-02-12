import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../Utils/Constant/Colors';
import { EventSuggestedData } from '../Utils/Constant/Constant';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';

const ListOfSuggestedEventsType = ({ eventSuggestionView, onPressType, selectedType }: any) => {
    const [eventsSuggestedData, setEventsSuggestedData] = useState(EventSuggestedData);

    const renderEventsSuggestionItem = ({ item }: any) => (
        <TouchableOpacity
            style={[eventSuggestionView, { backgroundColor: item.color }, selectedType == item.name ? { opacity: 0.5 } : {}]}
            onPress={() => onPressType(item.name)}
        >
            <Text style={styles.eventSuggestionText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{}}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={eventsSuggestedData}
                renderItem={renderEventsSuggestionItem}
                keyExtractor={(item: any) => item.id.toString()}
                extraData={eventsSuggestedData} // You can directly pass the state here
            />
        </View>
    );
};

const styles = StyleSheet.create({
    eventSuggestionView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 14,
        borderRadius: 25,
        height: 46,
        marginStart: 16,
        marginTop: 20
    },

    eventSuggestionText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR
    },
});

export default ListOfSuggestedEventsType;
