import React, { useCallback, useMemo } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../Utils/Constant/Fonts';
import LogoWithNameSvg from '../../assets/svg/LogoWithNameSvg';
import ShopingSvg from '../../assets/svg/HelpWithYouSvg/ShopingSvg';
import AuctionSvg from '../../assets/svg/HelpWithYouSvg/AuctionSvg';
import BrowsingSvg from '../../assets/svg/HelpWithYouSvg/BrowsingSvg';
import AirportProtocol from '../../assets/svg/HelpWithYouSvg/AirportProtocol';
import GiftingSvg from '../../assets/svg/HelpWithYouSvg/GiftingSvg';
import ExperienceSvg from '../../assets/svg/HelpWithYouSvg/ExperienceSvg';
import TravelSvg from '../../assets/svg/HelpWithYouSvg/TravelSvg';
import ConciergeSvg from '../../assets/svg/HelpWithYouSvg/ConciergeSvg';
import { useNavigation } from '@react-navigation/native';
import CloseModalSvg from '../../assets/svg/HelpWithYouSvg/CloseModalSvg';
import { useAppSelector } from '../StoreRedux/hooks/Hooks';

interface HelpWithYouScreenProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (selection: any) => void;
}

const HelpWithYouScreen: React.FC<HelpWithYouScreenProps> = ({ visible, onClose, onSelect }: any) => {
    const navigation = useNavigation();
    const { profileDetails } = useAppSelector((state) => state.profileDetails);

    const helpWithYouData = useMemo(() => [
        { index: 0, name: 'Shopping', icon: <ShopingSvg width={30} height={30} />, navigate: 'Shop', selectedTag: "Featured" },
        { index: 1, name: 'Auctions', icon: <AuctionSvg width={30} height={30} />, navigate: 'Auctions', selectedTag: "Auctions" },
        { index: 3, name: 'Refer & Earn', icon: <BrowsingSvg width={30} height={30} />, navigate: 'Refers and Earn', selectedTag: "Refer & Earn" },
        { index: 3, name: 'My Tastes', icon: <AirportProtocol width={30} height={30} />, navigate: 'Tastes', selectedTag: "Tastes" },
        { index: 4, name: 'Gifting', icon: <GiftingSvg width={30} height={30} />, navigate: 'Shop', selectedTag: "Flowers and cakes" },
        { index: 5, name: 'Experiences', icon: <ExperienceSvg width={30} height={30} />, navigate: 'Explore', selectedTag: "Featured" },
        { index: 6, name: 'Global Events', icon: <TravelSvg width={30} height={30} />, navigate: 'Shop', selectedTag: "Global Events" },
        { index: 7, name: 'My Concierge', icon: <ConciergeSvg width={30} height={30} />, navigate: 'Concierge', selectedTag: "Concierge" },
    ], []);

    const renderItem = useCallback(({ item }: any) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect({ name: item.navigate, selectedTag: item.selectedTag })}>
            <View style={styles.iconContainer1}>{item.icon}</View>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    ), [onSelect]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={{ flex: Platform.OS === 'ios' ? 0.7 : 0.5 }}
                onPress={onClose} >
            </TouchableOpacity>
            <LinearGradient
                colors={['#000000CC', '#1A1A23E0']}
                style={styles.gradientBackground}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <LogoWithNameSvg width={50} height={50} activeColor={colors.WHITE_COLOR} />
                    </View>
                    <TouchableOpacity style={styles.closeIconContainer} onPress={onClose}>
                        <CloseModalSvg width={30} height={30} />
                    </TouchableOpacity>
                    <Text style={styles.title0}>
                        Good day {profileDetails && profileDetails.name ? profileDetails.name.split(' ')[0] : ''}!</Text>

                    {/* Good day {profileDetails ? profileDetails.name.split(' ')[0] : ''}!</Text> */}
                    <Text style={styles.title}>How can we assist you today?</Text>
                    <View style={styles.containerFlatlist}>
                        <FlatList
                            data={helpWithYouData}
                            horizontal={false}
                            numColumns={4}
                            keyExtractor={(item) => item.index.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={styles.flatlistContainer}
                        />
                    </View>
                </View>
            </LinearGradient>
        </Modal>
    );
};

export default React.memo(HelpWithYouScreen);

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        opacity: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        alignItems: 'flex-start',
        marginBottom: 20,
        marginTop: 20
    },
    closeIconContainer: {
        position: 'absolute',
        padding: 10,
        top: 20,
        right: 0
    },
    title0: {
        fontSize: FontSize.F_20,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_700,
        textAlign: 'left',
        marginTop: 35
    },
    title: {
        fontSize: FontSize.F_20,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR_60,
        fontWeight: FontWeight.F_W_400,
        textAlign: 'left',
        marginBottom: 40,
        marginTop: 10
    },
    skipContainer: {
        borderBottomWidth: 1,
        borderColor: colors.WHITE_COLOR,
        marginBottom: Platform.OS == 'ios' ? 20 : 5
    },
    skipText: {
        fontSize: FontSize.F_12,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_400,
        textAlign: 'left',
        marginTop: 10,
    },
    description: {
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_400,
        textAlign: 'left',
        marginBottom: 30
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50
    },
    teamText: {
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR,
        fontWeight: FontWeight.F_W_400,
        color: colors.WHITE_COLOR
    },
    circleButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.YELLO_THEME_COLOR_DARK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    outerCircle: {
        position: 'absolute',
        bottom: -120,
        right: -120,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.WHITE_COLOR_24,
        height: 360,
        width: 360,
        borderWidth: 1,
        borderRadius: 200
    },
    innerCircle: {
        borderColor: colors.WHITE_COLOR_24,
        height: 200,
        width: 200,
        borderWidth: 1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerFlatlist: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatlistContainer: {
        justifyContent: 'center',
        width: '100%'
    },
    itemContainer: {
        width: 84,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 10
    },
    iconContainer1: {
        flex: 1,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.WHITE_COLOR_60,
        borderRadius: 10,
        padding: 10
    },
    itemText: {
        flex: 1,
        fontSize: FontSize.F_10,
        fontFamily: Fonts.REGULAR,
        fontWeight: FontWeight.F_W_400,
        color: colors.WHITE_COLOR,
        textAlign: 'center'
    },
});
