import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Platform } from 'react-native';
import React, { memo } from 'react';
import { colors } from '../Utils/Constant/Colors';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import AuctionIconSvg from '../../assets/svg/AuctionIconSvg';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';
import CartIconSvg from '../../assets/svg/CartIconSvg';

const ShopScreensHeader = ({ isSearching, setIsSearching, handleSearch, searchQuery }: any) => {
    const navigation = useNavigation();
    const opendrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const addToCart = () => {
        navigation.navigate('Cart' as never);
    };

    const goToAuction = () => {
        navigation.navigate('Auctions' as never);
    };

    const handleSearchIconPress = () => {
        setIsSearching(!isSearching);
    };

    const onChangeSearchText = (text: string) => {
        handleSearch(text);
    };

    return (
        <View style={styles.mainView}>
            {isSearching ? (
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={onChangeSearchText}
                    placeholder="Search..."
                    placeholderTextColor={colors.GREY_DARK_LINE_COLOR}
                />
            ) : (<>
                <TouchableOpacity onPress={opendrawer}>
                    <Image
                        source={require('../../assets/screen/Indulge_LOGO_ONLY.png')}
                        style={styles.iconViewProfile}
                    />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>Indulge</Text>
                    <Text style={styles.headerText1}>Shop</Text>
                </View>
            </>
            )}
            {!isSearching && (
                <>
                    <TouchableOpacity onPress={goToAuction} style={styles.searchIconStyle}>
                        <AuctionIconSvg />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addToCart} style={styles.searchIconStyle}>
                        <CartIconSvg />
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles.searchIconStyle} onPress={handleSearchIconPress}>
                <Image
                    // source={isSearching ? require('../../assets/screen/Close.png') : require('../../assets/screen/Search.png')}
                    source={require('../../assets/screen/Search.png')}
                    style={styles.iconView}
                />
            </TouchableOpacity>
        </View>
    );
};

export default memo(ShopScreensHeader);

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
    },
    iconView: {
        height: 32,
        width: 32,
    },
    searchIconStyle: {
        marginStart: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        color: colors.GREY_DARK_LINE_COLOR
    },
    headerText1: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_14
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: colors.WHITE_COLOR,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
    },
});
