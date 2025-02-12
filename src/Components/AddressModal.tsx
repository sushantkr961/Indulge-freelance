import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import React from 'react'
import { colors } from '../Utils/Constant/Colors';
import { Checkbox } from 'react-native-paper';
import { Fonts, FontSize } from '../Utils/Constant/Fonts';

const AddressModal = ({ modalVisible, editedAddressType, addressId, setEditedAddressType, setEditedAddress, editedAddress, handleUpdate, setModalVisible, setIsCurrent, isCurrent, closeModal, handleSave }: any) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.label}>Address Type</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Address Type"
                        value={editedAddressType}
                        onChangeText={setEditedAddressType}
                    />
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={editedAddress}
                        onChangeText={setEditedAddress}
                    />
                    <View style={styles.checkboxContainer}>
                        <Checkbox.Android
                            status={isCurrent ? 'checked' : 'unchecked'}
                            onPress={() => setIsCurrent(!isCurrent)}
                        />
                        <Text style={styles.label}
                            onPress={() => setIsCurrent(!isCurrent)}
                        >
                            Set as Current Address
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        {addressId != null ?
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleUpdate}
                            >
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity> : <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={closeModal}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AddressModal

const styles = StyleSheet.create({
    currentTextContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#4F4F4F",
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15
    },
    deleteContainer: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: '#D39F3A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 10,
        marginTop: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent background
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginStart: -8
    },
    label: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
    },
    buttonContainer: {
        justifyContent: 'space-between'
    },
    cancelButton: {
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10
    },
    buttonText: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
    },
})