import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../Utils/Constant/Colors'; // Assuming you have a colors file
import { Fonts, FontSize, FontWeight } from '../Utils/Constant/Fonts'; // Assuming you have a fonts file
import RightYellowArrowSvg from '../../assets/svg/RightYellowArrowSvg';
import FeedIconSvg from '../../assets/svg/FeedIconSvg';

interface WelcomeScreenProps {
    visible: boolean;
    onClose: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide" // Optional, you can use "fade" as well
            onRequestClose={onClose} // Ensures it can be closed on Android back button
        >
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.9)', '#1A1A23']} // Define the gradient colors
                style={styles.gradientBackground}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.container}>
                    {/* Icon at the Top */}
                    <View style={styles.iconContainer}>
                        <FeedIconSvg width={50} height={50} activeColor={colors.WHITE_COLOR} />
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Welcome to Indulge.</Text>

                    {/* Description */}
                    <Text style={styles.description}>
                        Where every moment is a masterpiece waiting to unfold. Through our lens of digital craftsmanship, we invite you to step into a world where luxury is redefined, and the extraordinary is yours to experience. Let the journey begin.
                    </Text>

                    {/* Footer with Team Label and Button */}
                    <View style={styles.footerContainer}>
                        <Text style={styles.teamText}>Team Indulge</Text>
                    </View>
                    <TouchableOpacity style={styles.outerCircle} >
                        <View style={styles.innerCircle} >
                            <TouchableOpacity style={styles.circleButton} onPress={onClose}>
                                <RightYellowArrowSvg width={80} height={80} stroke={colors.YELLO_THEME_COLOR_DARK} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </Modal>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    iconContainer: {
        alignItems: 'flex-start',
        marginBottom: 20
    },
    title: {
        fontSize: FontSize.F_24,
        fontFamily: Fonts.REGULAR,
        color: colors.YELLO_THEME_COLOR_DARK,
        fontWeight: FontWeight.F_W_400,
        textAlign: 'left',
        marginBottom: 40
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
        color: colors.YELLO_THEME_COLOR_DARK
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
        alignItems: 'center',
    }
});
