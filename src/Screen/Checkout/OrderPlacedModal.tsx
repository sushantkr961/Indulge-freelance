import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DoneYellowSvg from '../../../assets/svg/DoneYellowSvg';
import { colors } from '../../Utils/Constant/Colors';
import { Fonts, FontSize } from '../../Utils/Constant/Fonts';

const OrderPlacedModal = ({ visible, onClose, message }: any) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <DoneYellowSvg />
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: colors.BLACK_BLUE_DARK,
        borderRadius: 10,
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 20,
    },
    message: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    closeButton: {
        backgroundColor: colors.YELLO_THEME_COLOR_DARK,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16
    },
});

export default OrderPlacedModal;
