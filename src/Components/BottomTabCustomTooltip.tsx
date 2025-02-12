import { Modal, View, TouchableOpacity, Text, StyleSheet, Platform, Image } from 'react-native';
import React from 'react';
import { Fonts, FontSize, FontWeight } from '../Utils/Constant/Fonts';
import { colors } from '../Utils/Constant/Colors';

// You would import your arrow icon here
import ShopIconSvg from '../../assets/svg/ShopIconSvg';
import CalendarIconSvg from '../../assets/svg/CalendarIconSvg';
import FeedIconSvg from '../../assets/svg/FeedIconSvg';
import ExploreSvg from '../../assets/svg/ExploreSvg';
import WhatsappIconSvg from '../../assets/svg/WhatsappIconSvg';
import LinearGradient from 'react-native-linear-gradient';
import ShopTolltipArrowSvg from '../../assets/svg/ShopTolltipArrowSvg';
import CalanderTolltipArrowSvg from '../../assets/svg/CalanderTolltipArrowSvg';
import FeedTolltipArrowSvg from '../../assets/svg/FeedTolltipArrowSvg';
import ExploreTolltipArrowSvg from '../../assets/svg/ExploreTolltipArrowSvg';
import ConciergeTolltipArrowSvg from '../../assets/svg/ConciergeTolltipArrowSvg';
import ProfileAvtarWithBadgeSvg from '../../assets/svg/ProfileAvtarWithBadgeSvg';
import ProfileTolltipArrowSvg from '../../assets/svg/ProfileTolltipArrowSvg';
import NextRoundSvg from '../../assets/svg/NextRoundSvg';
import PreviousRoundSvg from '../../assets/svg/PreviousRoundSvg';

const BottomTabCustomTooltip = ({ visible, handleSkipTooltip, handleNextTooltip, handlePreviousTooltip, tooltipData, tooltipStep }: any) => {
    // Dynamic styles to position the arrow based on the tooltip step
    const getArrowPosition = () => {
        switch (tooltipStep) {
            case 0: // Shop
                return { left: '10%', top: Platform.OS == 'ios' ? '6%' : '0%' };
            case 1: // Shop
                return { left: '15%', bottom: Platform.OS == 'ios' ? '12%' : '6%' };
            case 2: // Calendar
                return { left: '1%', bottom: Platform.OS == 'ios' ? '12%' : '8%' };
            case 3: // Feed
                return { left: '32%', bottom: Platform.OS == 'ios' ? '14%' : '9%' };
            case 4: // Explore
                return { left: '40%', bottom: Platform.OS == 'ios' ? '11%' : '6%', };
            case 5: // Concierge
                return { left: '32%', bottom: Platform.OS == 'ios' ? '10%' : '5%', };
            default:
                return { left: '50%' }; // Default position
        }
    };
    const getIconPosition = () => {
        switch (tooltipStep) {
            case 0: // Shop
                return { left: '8%', top: Platform.OS == 'ios' ? '5%' : 0 };
            case 1: // Shop
                return { left: '10%' };
            case 2: // Calendar
                return { left: '26%' };
            case 3: // Feed
                return { left: '48%' };
            case 4: // Explore
                return { left: '70%' };
            case 5: // Concierge
                return { left: '85%' };
            default:
                return { left: '50%' }; // Default position
        }
    };
    const GetIcon = () => {
        switch (tooltipStep) {
            case 0: // Profile
                return (
                    <View style={styles.iconContainer0}>
                        {/* <ProfileAvtarWithBadgeSvg width={30} height={30} activeColor={colors.YELLO_THEME_COLOR_DARK} /> */}
                        <Image source={require('../../assets/screen/ProfileWalletSet.png')} />
                        <Text style={styles.textIconLabel}>Profile</Text>
                    </View>
                );
            case 1: // Shop
                return (
                    <View style={styles.iconContainer0}>
                        <ShopIconSvg width={30} height={30} activeColor={colors.YELLO_THEME_COLOR_DARK} />
                        <Text style={styles.textIconLabel}>Shop</Text>
                    </View>
                );
            case 2: // Calendar
                return (
                    <View style={styles.iconContainer0}>
                        <CalendarIconSvg width={30} height={30} activeColor={colors.YELLO_THEME_COLOR_DARK} />
                        <Text style={styles.textIconLabel}>Calendar</Text>
                    </View>
                );
            case 3: // Feed
                return (
                    <View style={styles.iconContainer0}>
                        <FeedIconSvg width={30} height={30} activeColor={colors.YELLO_THEME_COLOR_DARK} />
                        <Text style={styles.textIconLabel}>Feed</Text>
                    </View>
                );
            case 4: // Explore
                return (
                    <View style={styles.iconContainer0}>
                        <ExploreSvg width={30} height={30} activeColor={colors.YELLO_THEME_COLOR_DARK} />
                        <Text style={styles.textIconLabel}>Explore</Text>
                    </View>
                );
            case 5: // Concierge
                return (
                    <View style={styles.iconContainer0}>
                        <WhatsappIconSvg width={30} height={30} activeColor={colors.YELLO_THEME_COLOR_DARK} />
                        <Text style={styles.textIconLabel}>Concierge</Text>
                    </View>
                );
            default:
                return (
                    <View style={styles.iconContainer0}>
                        <FeedIconSvg width={30} height={30} activeColor={colors.YELLO_THEME_COLOR_DARK} />
                        <Text style={styles.textIconLabel}>Concierge</Text>
                    </View>
                );
        }
    };
    const GetArrowIcon = () => {
        switch (tooltipStep) {
            case 0: // Profile
                return <ProfileTolltipArrowSvg />
            case 1: // Shop
                return <ShopTolltipArrowSvg />
            case 2: // Calendar
                return <CalanderTolltipArrowSvg />
            case 3: // Feed
                return <FeedTolltipArrowSvg />
            case 4: // Explore
                return <ExploreTolltipArrowSvg />
            case 5: // Concierge
                return <ConciergeTolltipArrowSvg />
            default:
                return (
                    <View style={styles.iconContainer0}>
                        <FeedIconSvg width={30} height={30} activeColor={colors.YELLO_THEME_COLOR_DARK} />
                        <Text style={styles.textIconLabel}>Concierge</Text>
                    </View>
                );
        }
    };
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.7)', '#000000']}
                style={styles.overlay}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.tooltipContainer}>
                    <Text style={styles.tooltipTitle1}>
                        {`${tooltipStep + 1}/${tooltipData?.length}`}
                    </Text>
                    <View style={styles.tooltipSubContainer}>
                        <Text style={styles.tooltipTitle}>
                            {tooltipData[tooltipStep].title}
                        </Text>
                    </View>
                    <Text style={styles.tooltipText}>
                        {tooltipData[tooltipStep].text}
                    </Text>
                </View>
                <View style={[styles.arrowContainer, getArrowPosition()]}>
                    <GetArrowIcon />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSkipTooltip} style={styles.skipButtonContainer}>
                        <Text style={styles.skipButton}>Skip</Text>
                    </TouchableOpacity>
                    <View style={styles.nextButtonMainContainer}>
                        <TouchableOpacity onPress={handlePreviousTooltip} style={styles.nextButtonContainer}>
                            <PreviousRoundSvg />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextTooltip} style={styles.nextButtonContainer}>
                            <NextRoundSvg />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.iconContainer, getIconPosition()]}><GetIcon /></View>
            </LinearGradient>
        </Modal>
    );
}

export default BottomTabCustomTooltip;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.SEMI_TRANSPARENT
    },
    buttonContainer: {
        marginBottom: Platform.OS == 'ios' ? '40%' : '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        paddingHorizontal: 32
    },
    skipButtonContainer: {
        backgroundColor: colors.BACK_BLUE_DARK,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50
    },
    skipButton: {
        fontSize: FontSize.F_15,
        fontFamily: Fonts.REGULAR,
        fontWeight: FontWeight.F_W_300,
        color: colors.WHITE_COLOR
    },
    nextButtonMainContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    },
    nextButtonContainer: {
        paddingHorizontal: 5,
    },
    nextButton: {
        fontSize: FontSize.F_15,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_300
    },
    textIconLabel: {
        marginTop: 5,
        fontSize: FontSize.F_15,
        fontFamily: Fonts.REGULAR,
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontWeight: FontWeight.F_W_500
    },
    tooltipContainer: {
        paddingVertical: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: '100%',
        alignItems: 'flex-start',
        padding: 10,
        paddingHorizontal: 32
    },
    tooltipSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tooltipTitle: {
        flex: 1,
        textAlign: 'left',
        fontSize: FontSize.F_24,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_400
    },
    tooltipTitle1: {
        textAlign: 'left',
        fontSize: FontSize.F_14,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_400,
        marginBottom: 20
    },
    tooltipText: {
        marginTop: 10,
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR_80,
        fontWeight: FontWeight.F_W_400
    },
    arrowContainer: {
        position: 'absolute',
        bottom: Platform.OS == 'ios' ? '12%' : '4%',
    },
    iconContainer: {
        position: 'absolute',
        bottom: Platform.OS == 'ios' ? '8%' : '2%',
        marginStart: -20,
    },
    iconContainer0: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
