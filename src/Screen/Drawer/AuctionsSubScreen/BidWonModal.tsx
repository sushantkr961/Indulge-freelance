import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import WonMedalSvg from '../../../../assets/svg/WonMedalSvg';
import { colors } from '../../../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../../../Utils/Constant/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import WonMedalSparkSvg from '../../../../assets/svg/WonMedalSparkSvg';

const BidWonModal = ({ isVisible, onClose, title, subtitle, bidPrice, imageUrl }: any) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            style={styles.modalContainer}
        >
            <View style={styles.modalContent}>
                {/* Display the product image */}
                <View style={styles.modalContent1}>
                    <ImageBackground source={{ uri: imageUrl }} style={styles.image} >
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0)', '#000000']}
                            style={styles.modalContent11}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <WonMedalSparkSvg />
                            <WonMedalSvg />
                        </LinearGradient>
                    </ImageBackground>
                </View>
                {/* Icon and title */}
                <View style={styles.modalContent2}>
                    <Text style={styles.congratulationsText}>Congratulations!</Text>
                    <Text style={styles.subTitleText}>You Won</Text>
                    <Text style={styles.subTitleText}>{title}</Text>
                    <Text style={styles.subTitleText}>{subtitle}</Text>
                    {/* Display the winning bid price */}
                    <Text style={styles.bidPrice}>{bidPrice}</Text>

                    {/* Close button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    modalContent1: {
        flex: 1,
        backgroundColor: colors.GREY_DARK_TEXT,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
    },
    modalContent11: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
    },
    modalContent2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    iconAndTitleContainer: {
        alignItems: 'center'
    },
    congratulationsText: {
        fontSize: FontSize.F_32,
        fontWeight: FontWeight.F_W_300,
        fontFamily: Fonts.REGULAR,
        color: colors.YELLO_THEME_COLOR_TEXT,
        marginBottom: 10
    },
    subTitleText: {
        fontSize: FontSize.F_24,
        fontWeight: FontWeight.F_W_300,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        marginBottom: 5
    },
    bidPrice: {
        fontSize: FontSize.F_32,
        fontWeight: FontWeight.F_W_300,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
        marginBottom: 20
    },
    closeButton: {
        backgroundColor: colors.BUTTON_WHITE_GREY,
        borderRadius: 100,
        width: 54,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50
    },
    closeButtonText: {
        fontSize: FontSize.F_32,
        fontWeight: FontWeight.F_W_300,
        fontFamily: Fonts.REGULAR,
        color: colors.WHITE_COLOR,
    },
});

export default BidWonModal;
