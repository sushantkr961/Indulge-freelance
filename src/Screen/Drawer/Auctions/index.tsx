import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import DrawerScreensHeader from '../../../Components/DrawerScreensHeader';
import { colors } from '../../../Utils/Constant/Colors';
import TabNavBarAuction from './TabNavBarAuction';
import { useNavigation } from '@react-navigation/native';
import { Fonts, FontSize, FontWeight } from '../../../Utils/Constant/Fonts';
import AuctionSvg from '../../../../assets/svg/drawerSvg/AuctionSvg';

const AuctionScreen = () => {
    const navigation = useNavigation()
    const goBack = () => {
        navigation.goBack()
    }
    const leftButtonAction = () => {
        navigation.navigate('AuctionsGuide' as never)
       
    }
    return (
        <SafeAreaView style={styles.container0}>
            <View style={styles.container}>
                <View style={styles.container1}>
                    <DrawerScreensHeader
                        style={{
                            marginTop: Platform.OS === 'ios' ? 0 : 10
                        }}
                        title="Auctions"
                        leftButtonAction={goBack}
                    />
                    <TouchableOpacity style={styles.container2}
                        onPress={leftButtonAction}
                    >
                        <AuctionSvg width={18} height={18} />
                        <Text style={styles.headerText}>
                            Guide
                        </Text>
                    </TouchableOpacity>

                </View>
                <TabNavBarAuction />
            </View>
        </SafeAreaView>
    )
};

export default AuctionScreen

const styles = StyleSheet.create({
    container0: {
        flex: 1,
        backgroundColor: colors.BLACK_BLUE_DARK,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container2: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.WHITE_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        // marginTop: 20
    },
    headerText: {
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_400,
        color: colors.WHITE_COLOR,
        marginStart: 10
    }
})
