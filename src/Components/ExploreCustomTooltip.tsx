import { Modal, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { Fonts, FontSize, FontWeight } from '../Utils/Constant/Fonts';
import { colors } from '../Utils/Constant/Colors';

// You would import your arrow icon here
import LinearGradient from 'react-native-linear-gradient';
import NextRoundSvg from '../../assets/svg/NextRoundSvg';
import PreviousRoundSvg from '../../assets/svg/PreviousRoundSvg';
import ExploreArrow1Svg from '../../assets/svg/HelpWithYouSvg/ExploreArrow1Svg';
import ExploreArrow2Svg from '../../assets/svg/HelpWithYouSvg/ExploreArrow2Svg';

const ExploreTabCustomTooltip = ({ visible, handleSkipTooltip, handleNextTooltip, handlePreviousTooltip, exploreTooltipData, tooltipStep }: any) => {
    // Dynamic styles to position the arrow based on the tooltip step
    const getArrowPosition = () => {
        switch (tooltipStep) {
            case 0: // Shop
                return { left: '25%', top: Platform.OS == 'ios' ? '22%' : '16%' };
            case 1: // Shop
                return { left: '20%', top: Platform.OS == 'ios' ? '21%' : '16%' };
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
                return { left: '5%', top: Platform.OS == 'ios' ? '13%' : '9%' };
            case 1: // Shop
                return { left: '60%', top: Platform.OS == 'ios' ? '13%' : '9%' };
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
                        <TouchableOpacity
                            style={[
                                styles.eventSuggestionView,
                                { backgroundColor: colors.YELLO_THEME_COLOR },
                            ]}
                        >
                            <Text style={styles.eventSuggestionText}>London</Text>
                        </TouchableOpacity >
                    </View>
                );
            case 1: // Shop
                return (
                    <View style={styles.iconContainer0}>
                        <TouchableOpacity
                            style={[
                                styles.eventSuggestionView,
                                { backgroundColor: colors.YELLO_THEME_COLOR },
                            ]}
                        >
                            <Text style={styles.eventSuggestionText}>India</Text>
                        </TouchableOpacity >
                    </View>
                );
            default:
                return (
                    <View style={styles.iconContainer0}>
                        <TouchableOpacity
                            style={[
                                styles.eventSuggestionView,
                                { backgroundColor: colors.BACK_BLUE_DARK },
                            ]}
                        >
                            <Text style={styles.eventSuggestionText}>India</Text>
                        </TouchableOpacity >
                    </View>
                );
        }
    };
    const GetArrowIcon = () => {
        switch (tooltipStep) {
            case 0: // Profile
                return <ExploreArrow1Svg />
            case 1: // Shop
                return <ExploreArrow2Svg />
            default:
                return <ExploreArrow2Svg />
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
                        {`${tooltipStep + 1}/${exploreTooltipData?.length}`}
                    </Text>
                    <View style={styles.tooltipSubContainer}>
                        <Text style={styles.tooltipTitle}>
                            {exploreTooltipData[tooltipStep].title}
                        </Text>
                    </View>
                    <Text style={styles.tooltipText}>
                        {exploreTooltipData[tooltipStep].text}
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

export default ExploreTabCustomTooltip;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.SEMI_TRANSPARENT
    },
    buttonContainer: {
        marginBottom: Platform.OS == 'ios' ? '10%' : '5%',
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
        // bottom: Platform.OS == 'ios' ? '8%' : '2%',
        marginStart: -20,
    },
    iconContainer0: {
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        // marginBottom: 10
    },
    eventSuggestionText: {
        fontSize: FontSize.F_16,
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR
    },
});
