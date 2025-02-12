import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../Utils/Constant/Colors';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AuctionIconSvg from '../../assets/svg/AuctionIconSvg';
import NotificationIconSvg from '../../assets/svg/NotificationIconSvg';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';
import CloseWhite from '../../assets/svg/CloseWhite';

const ExploreScreensHeader = ({ isSearching, setIsSearching, handleSearch, searchQuery }: any) => {
    const navigation = useNavigation();
    const opendrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const onNotificationPress = () => {
        navigation.navigate('CalendarNotifications' as never)
    }

    const handleSearchIconPress = () => {
        // handleSearch('');
        setIsSearching(!isSearching);
    };

    const onChangeSearchText = (text: string) => {
        // setSearchText(text);
        handleSearch(text);
    };

    return (
        <View style={styles.mainView}>
            {isSearching ? (<View style={styles.searchView}>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={onChangeSearchText}
                    placeholder="Search..."
                    placeholderTextColor={colors.GREY_DARK_LINE_COLOR}
                />
                <TouchableOpacity style={styles.closeButton} onPress={handleSearchIconPress}>
                    <CloseWhite />
                </TouchableOpacity>
            </View>
            ) : (<>
                <TouchableOpacity onPress={opendrawer}>
                    <Image
                        source={require('../../assets/screen/Indulge_LOGO_ONLY.png')}
                        style={styles.iconViewProfile}
                    />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>Welcome to </Text>
                    <Text style={styles.headerText1}>Great Explore</Text>
                </View>
            </>
            )}
            {!isSearching && (
                <>
                    <TouchableOpacity onPress={onNotificationPress} style={styles.searchIconStyle}>
                        <NotificationIconSvg />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchIconStyle} onPress={handleSearchIconPress}>
                        <Image
                            source={require('../../assets/screen/Search.png')}
                            style={styles.iconView}
                        />
                    </TouchableOpacity>
                </>
            )}

        </View>
    );
};

export default ExploreScreensHeader;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 5,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        marginTop: Platform.OS == 'ios' ? 45 : 0,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginStart: 5,
    },
    iconViewProfile: {
        height: 60,
        width: 60,
        resizeMode: 'cover'
        // tintColor: colors.WHITE_COLOR
    },
    iconView: {
        height: 32,
        width: 32,
    },
    searchIconStyle: {
        marginStart: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.GREY_FONT_FONT_COLOR
    },
    headerText1: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
    },
    searchView: {
        flex: 1,
        height: 45,
        flexDirection: 'row'
    },
    closeButton: {
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 45,
        backgroundColor: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR
    },
});
