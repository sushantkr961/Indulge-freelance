import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../../Utils/Constant/Fonts';

const QueueModal = ({ visible, onClose, closeModalOnly, selectedButton }: any) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.message}>See You Soon</Text>
                <View style={styles.modalContent}>
                    {/* Lottie Animation */}
                    <LottieView
                        source={require('../../../assets/lottieFile/PaymentSuccess.json')}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                    {/* Text Message */}
                    {selectedButton === 40000 ? <Text style={styles.message1}>
                        You’re in our queue, and our team will reach out as soon as your turn arrives. Thank you for your patience. For priority assistance, consider upgrading to an annual membership to move up in the queue.
                    </Text> : <Text style={styles.message1}>
                        Hey! {'\n'}
                        You skipped the queue.{'\n'}
                        {'\n'}{'\n'}
                        You are 3x closer to your team now!{'\n'}
                        Our genies will contact you shortly.{'\n'}
                        Thank you for your patience.
                    </Text>
                    }
                    {/* "Okay" Button */}
                    <TouchableOpacity style={styles.button} onPress={closeModalOnly}>
                        <Text style={styles.buttonText}>Thank You</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={onClose}>
                        <Text style={styles.buttonText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '20%'
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.BLACK_BACKGROUND_COLOR,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    lottie: {
        width: 300,
        height: 300,
    },
    message: {
        textAlign: 'center',
        marginVertical: 20,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_600,
        fontSize: FontSize.F_32,
        fontFamily: Fonts.REGULAR
    },
    message1: {
        textAlign: 'center',
        marginVertical: 20,
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_400,
        fontSize: FontSize.F_20,
        fontFamily: Fonts.REGULAR
    },
    button: {
        alignItems: 'center',
        width: '100%',
        marginTop: 35,
        backgroundColor: colors.YELLO_THEME_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 45,
        borderRadius: 5,
    },
    button1: {
        marginTop: 30,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: colors.WHITE_COLOR
    },
    buttonText: {
        color: colors.WHITE_COLOR,
        fontWeight: FontWeight.F_W_400,
        fontSize: FontSize.F_16,
        fontFamily: Fonts.REGULAR
    },
});

export default QueueModal;
