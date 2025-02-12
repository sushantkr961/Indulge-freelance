import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Image, Modal, Alert } from 'react-native';
import { colors } from '../../../Utils/Constant/Colors';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox } from 'react-native-paper';
import { addProfileAddress, deleteProfileAddress } from '../../../StoreRedux/ProfileAddressSlice'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddressModal from '../../../Components/AddressModal';
import { Fonts, FontSize } from '../../../Utils/Constant/Fonts';

const Address = () => {
    const dispatch = useDispatch()
    const profileAddress = useSelector((state: any) => state.profileAddress);
    const [addressId, setAddressId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const [editedAddressType, setEditedAddressType] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [isCurrent, setIsCurrent] = useState(false);

    const handleAddAddress = () => {
        setAddressId(null)
        setEditedAddressType('')
        setEditedAddress('')
        setIsCurrent(false)
        setModalVisible(true);
    };
    const handleEdit = (item: any) => {

        setAddressId(item.addressId)
        setEditedAddressType(item.addressType)
        setEditedAddress(item.address)
        setIsCurrent(item.isCurrent)
        setModalVisible(true);
    };
    const handleDelete = (addressId: any) => {
        Alert.alert("",
            'Are you sure you want to delete this address?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Delete Cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // Perform the delete action
                        dispatch(deleteProfileAddress(addressId));
                    },
                },
            ],
            { cancelable: false }
        );
    };
    const handleSave = () => {
        if (editedAddressType.trim() === '' || editedAddress.trim() === '') {
            Alert.alert("Please fill all the fields");
            return;
        }
        dispatch(addProfileAddress({
            "addressType": editedAddressType,
            "address": editedAddress,
            "isCurrent": isCurrent
        }));
        setModalVisible(false);
        setEditedAddressType('')
        setEditedAddress('')
        setIsCurrent(false)
    };
    const handleCurrentSelect = (item: any) => {
        dispatch(addProfileAddress({
            "addressId": item.addressId,
            "addressType": item.addressType,
            "address": item.address,
            "isCurrent": true
        }));
        closeModal()
    };
    const handleUpdate = () => {
        dispatch(addProfileAddress({
            "addressId": addressId,
            "addressType": editedAddressType,
            "address": editedAddress,
            "isCurrent": isCurrent
        }));
        closeModal()
    }
    const closeModal = () => {
        setModalVisible(false);
        setEditedAddressType('')
        setEditedAddress('')
        setAddressId(null)
        setIsCurrent(false)
    }
    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={[styles.addressContainer, item.isCurrent && { borderWidth: 1, borderColor: colors.YELLO_THEME_COLOR }]} onPress={() => handleCurrentSelect(item)}>
            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <TouchableOpacity style={styles.deleteContainer} onPress={() => handleEdit(item)}>
                    <Image source={require("../../../../assets/drawer/EditImageIcon.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.addressId)} style={{ marginTop: 10, marginStart: -5, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="delete-outline" size={25} color={colors.YELLO_THEME_COLOR} />
                </TouchableOpacity>
            </View>
            <View style={styles.addressInfoContainer}>
                <Text style={styles.addressTypeText}>
                    {item.addressType}
                </Text >
                <Text style={styles.addressText}>
                    {item.address}
                </Text>
            </View>
            {item.isCurrent && (
                <View style={styles.currentTextContainer}>
                    <Text style={styles.currentText}>Current</Text>
                </View>
            )}

        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={["#1A1A23", 'rgba(26, 26, 35, 0)']}
            style={styles.container}
            start={{ x: 1, y: 0.1 }}
            end={{ x: 1, y: 1 }}
        >
            <FlatList
                data={profileAddress}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={ // Render button as footer
                    <TouchableOpacity
                        onPress={handleAddAddress}
                        style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Add Address</Text>
                    </TouchableOpacity>
                }

            />
            <AddressModal
                modalVisible={modalVisible} editedAddressType={editedAddressType}
                addressId={addressId} setEditedAddressType={setEditedAddressType}
                setEditedAddress={setEditedAddress} editedAddress={editedAddress}
                handleUpdate={handleUpdate} setModalVisible={setModalVisible}
                setIsCurrent={setIsCurrent} isCurrent={isCurrent}
                closeModal={closeModal} handleSave={handleSave}
            />
        </LinearGradient>
    );
};

export default Address;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: colors.BLUE_DARK_COLOR,
        padding: 10
    },
    editIconSpacer: {
        flex: 1
    },
    addressInfoContainer: {
        flex: 1,
        marginStart: 15,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    addressTypeText: {
        flex: 1,
        color: colors.YELLO_THEME_COLOR_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_16
    },
    addressText: {
        flex: 1,
        marginTop: 10,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_15,
        color: colors.WHITE_COLOR
    },
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
    currentText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_13
    },
    saveButton: {
        backgroundColor: '#D39F3A',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 10,
        marginTop: 10
    },
    saveButtonText: {
        color: colors.BLACK_BACKGROUND_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
    }
});