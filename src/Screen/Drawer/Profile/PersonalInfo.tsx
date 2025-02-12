import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, Pressable, Modal, ScrollView, Dimensions, StyleSheet, FlatList, Alert, BackHandler, PermissionsAndroid, Platform, TouchableOpacity, FlatListComponent } from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Camera, useCameraPermission } from 'react-native-vision-camera'
import { useAppSelector } from '../../../StoreRedux/hooks/Hooks';
import { colors } from '../../../Utils/Constant/Colors';
import { Fonts, FontSize, FontWeight } from '../../../Utils/Constant/Fonts';

const PersonalInfo = () => {
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState(require('../../../../assets/drawer/ProfileImageData.png'));
    const [showModalVisible, setShowModalVisible] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0)
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const [focusedElement, setFocusedElement] = useState('Personal');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedAnniversaryDate, setSelectedAnniversarryDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('Married');
    const statusOptions = ['Single', 'Dating', 'Married', 'Choose not to say'];
    const [selectedChildren, setSelectedChildren] = useState('2');
    const childrenOptions = ['0', '1', '2', '3', '4+'];
    const [childrenModalVisible, setChildrenModalVisible] = useState(false);
    const [imagePermissionResult, setImagePermissionResult] = useState(false);
    const [isPhotoSelected, setIsPhotoSelected] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { countryCode } = useAppSelector((state) => state.profileDetails);


    const [profileData, setProfileData] = useState({
        name: 'Enter Name',
        age: 'Enter Age',
        relationStatus: 'Single',
        numberOfChildren: '0',
        birthday: '',
        anniversary: '2024-06-08'
    });
    const { hasPermission, requestPermission } = useCameraPermission()

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setDatePickerVisibility1(false);
    };

    const handleConfirm = (date: any, key: any) => {
        const formattedDate = formatDate(date);
        if (key === 'DOB') {
            setSelectedDate(formattedDate);
            // setProfileData((prevData) => ({
            //     ...prevData,
            //     birthday: formattedDate,
            // }));
            setDatePickerVisibility(false);
        }
        if (key === 'Anniversarry') {
            setSelectedAnniversarryDate(formattedDate)
            // setProfileData((prevData) => ({
            //     ...prevData,
            //     anniversary: formattedDate,
            // }));
            setDatePickerVisibility1(false);
        }
    };


    const formatDate = (date: any) => {
        return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
    };


    const getMonthName = (monthIndex: any) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    };


    const toggleModal = () => {
        setShowModalVisible(!showModalVisible);
    };

    const handleStatusSelection = (status: any) => {
        setSelectedStatus(status);
        // setProfileData((prevData) => ({
        //     ...prevData,
        //     relationStatus: status,
        // }));
        toggleModal();
    };



    const renderStatusOption = ({ item }: any) => {
        return (
            <Pressable onPress={() => handleStatusSelection(item)}>
                <Text style={styles.statusText}>{item}</Text>
            </Pressable>
        );
    };

    const toggleShowModal = () => {
        setChildrenModalVisible(!childrenModalVisible);
    };

    const handleChildrenSelection = (children: any) => {
        setSelectedChildren(children);
        // setProfileData((prevData) => ({
        //     ...prevData,
        //     numberOfChildren: children,
        // }));
        toggleShowModal();
    };

    const renderChildrenOption = ({ item }: any) => {
        return (
            <Pressable onPress={() => handleChildrenSelection(item)}>
                <Text style={styles.statusText}>{item}</Text>
            </Pressable>
        );
    };
    const handleBackButton = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            backHandler.remove();
        };
    }, []);
    //stored phone number
    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };

        getPhoneNumber();
    }, []);

    //get-wallet-balance api
    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber) {
                    const response = await axios.get("https://indulgeconcierge.com/get-wallet-balance", {
                        params: {
                            mobile_no: storedNumber,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const updatedBalance = response.data.customer_balance;
                    setWalletBalance(updatedBalance || 0);
                } else {

                    Alert.alert('Error', 'Stored phone number is undefined');
                }
            } catch (error) {

                Alert.alert('Error', 'Failed to fetch wallet balance.');
            }
        };

        fetchWalletBalance();
    }, []);


    useEffect(() => {
        loadProfilePicture();
    }, []);

    const loadProfilePicture = async () => {
        try {
            const uri = await AsyncStorage.getItem('profilePictureURI');
            if (uri) {
                setProfilePicture({ uri });
                setIsPhotoSelected(true);
            }
        } catch (error) {
            console.error('Error loading profile picture:', error);
        }
    };

    const saveProfilePicture = async () => {
        try {
            const storedNumber = await AsyncStorage.getItem('phoneNumber');
            const profilePictureURI = await AsyncStorage.getItem('profilePictureURI');
            if (profilePictureURI && storedNumber) {
                await uploadProfilePicture(storedNumber, profilePictureURI);
            }

            // if (isEditing) {
            await updateProfileAPI();
            // }

            await fetchProfileDetails();
            setShowSaveButton(false);
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };

    // upload-profile-picture api
    const uploadProfilePicture = async (mobileNumber: any, uri: any) => {
        const formData = new FormData();
        formData.append('profilePicture', {
            uri,
            type: 'image/jpeg',
            name: 'profile_picture.jpg',
        });

        try {
            const response = await axios.post(
                `https://indulgeconcierge.com/upload-profile-picture?mobile_no=${mobileNumber}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Profile picture uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    const compareStateWithProfileData = () => {
        if (
            selectedStatus !== profileData.relationStatus ||
            selectedDate !== profileData.birthday ||
            selectedChildren !== profileData.numberOfChildren || selectedAnniversaryDate !== profileData.anniversary
        ) {
            return true;
        }
        return false;
    };

    // save button
    const renderSaveButton = () => {
        if (compareStateWithProfileData()) {
            return (
                <Pressable
                    style={styles.saveButtonContainer}
                    onPress={saveProfilePicture}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
            );
        }
        return null;
    };

    // press edit icon
    const handleEditIconPress = () => {
        setIsEditing(!isEditing);
        setShowSaveButton(true);
    };


    // edit-profile api
    const updateProfileAPI = async () => {
        try {
            const response = await axios.post(
                `https://indulgeconcierge.com/edit-profile`,
                {
                    mobile_no: storedPhoneNumber,
                    birthday: selectedDate,
                    Relation_status: selectedStatus,
                    Children: selectedChildren,
                    anniversary: selectedAnniversaryDate
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

        } catch (error) {
            console.error('Error updating profile through API:', error);
        }
    };


    useEffect(() => {
        fetchProfileDetails();
    }, []);

    // get-profile-details api
    const fetchProfileDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const storedNumber = await AsyncStorage.getItem('phoneNumber');
            if (storedNumber) {
                const response = await axios.get("https://indulgeconcierge.com/get-profile-details", {
                    params: {
                        mobile_no: storedNumber,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { name, age, Relation_status, number_of_children, birthdate, anniversary } = response.data;
                setProfileData({
                    name: name,
                    age: age,
                    relationStatus: Relation_status,
                    numberOfChildren: number_of_children,
                    birthday: birthdate,
                    anniversary: anniversary
                });
                setSelectedDate(birthdate)
                setSelectedAnniversarryDate(anniversary)
                setSelectedStatus(Relation_status)
                setSelectedChildren(number_of_children)
            } else {
                console.error('Stored phone number is undefined');
            }
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.marginTop2}>
                <Text style={styles.nameStyle}>Name</Text>
                <Text style={styles.nameValueStles}>{profileData.name}</Text>
                <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={styles.imagestyle} resizeMode="contain" />
            </View>

            <View style={styles.marginTop20}>
                <Text style={styles.mobileLabel}>Mobile No</Text>
                <Text style={styles.mobileValue}>+{countryCode} {storedPhoneNumber}</Text>
                <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={styles.imagestyle} resizeMode="contain" />
            </View>
            <View style={styles.subContainer}>
                <View style={styles.flex1}>
                    <Text style={styles.mobileLabel}>Birthday</Text>
                    <Text style={styles.mobileValue}>{selectedDate}</Text>
                    <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={styles.imagestyle} resizeMode="contain" />
                </View>
                <Pressable style={styles.marginRight5} onPress={showDatePicker}>
                    <Image source={require('../../../../assets/drawer/EditImageIcon.png')} />
                </Pressable>
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => handleConfirm(date, "DOB")}
                    onCancel={hideDatePicker}
                />
            </View>
            <View style={styles.subContainer}>
                <View style={styles.flex1}>
                    <Text style={styles.mobileLabel}>Relation Status</Text>
                    <Text style={styles.mobileValue}>{selectedStatus}</Text>
                    <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={styles.imagestyle} resizeMode="contain" />
                </View>
                <Pressable style={styles.marginRight5} onPress={() => { toggleModal(); handleEditIconPress(); }}>
                    <Image source={require('../../../../assets/drawer/EditImageIcon.png')} />
                </Pressable>
                <Modal visible={showModalVisible} transparent animationType="slide" >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => setShowModalVisible(false)}>
                            <Image source={require('../../../../assets/screen/Close_Icon_Cross_Grey.png')} style={styles.filterIcon} />
                        </TouchableOpacity>

                        <View style={styles.modalContent}>
                            <FlatList
                                data={statusOptions}
                                renderItem={renderStatusOption}
                                keyExtractor={(item) => item}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.flex1}>
                    <Text style={styles.mobileLabel}>Children</Text>
                    <Text style={styles.mobileValue}>{selectedChildren}</Text>
                    <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={styles.imagestyle} resizeMode="contain" />
                </View>
                <Pressable style={styles.marginRight5} onPress={() => { toggleShowModal(); handleEditIconPress(); }}>
                    <Image source={require('../../../../assets/drawer/EditImageIcon.png')} />
                </Pressable>
                <Modal visible={childrenModalVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => setChildrenModalVisible(false)}>
                            <Image source={require('../../../../assets/screen/Close_Icon_Cross_Grey.png')} style={styles.filterIcon} />
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={childrenOptions}
                                renderItem={renderChildrenOption}
                                keyExtractor={(item) => item}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.flex1}>
                    <Text style={styles.mobileLabel}>Anniversary</Text>
                    <Text style={styles.mobileValue}>{selectedAnniversaryDate ? selectedAnniversaryDate : formatDate(new Date())}</Text>
                    <Image source={require('../../../../assets/drawer/ProfileVectorLine.png')} style={styles.imagestyle} resizeMode="contain" />
                </View>
                <Pressable style={styles.marginRight5} onPress={() => {
                    setDatePickerVisibility1(true);
                }}>
                    <Image source={require('../../../../assets/drawer/EditImageIcon.png')} />
                </Pressable>
                <DateTimePicker
                    isVisible={isDatePickerVisible1}
                    mode="date"
                    onConfirm={(date) => handleConfirm(date, "Anniversarry")}
                    onCancel={hideDatePicker}
                    style={styles.statusText}
                />
            </View>
            <View style={styles.buttonContainer}>
                {profilePicture && <Image source={{ uri: profilePicture.uri }} />}
                {renderSaveButton()}
            </View>
        </ScrollView>
    );
};

export default PersonalInfo;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BACK_BLUE_DARK,
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    marginTop2: {
        marginTop: '2%'
    },
    nameStyle: {
        color: colors.GREY_WHITE_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        left: 30,
        textAlign: 'left',
        marginBottom: 5
    },
    mobileLabel: {
        color: colors.GREY_WHITE_TEXT,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        left: 30,
        marginBottom: 5
    },
    mobileValue: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        left: 30
    },
    marginRight5: { marginRight: '5%' },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100
    },
    imagestyle: {
        width: '93%',
        top: 10,
        left: 10,
    },
    nameValueStles: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        fontWeight: FontWeight.F_W_300,
        left: 30,
        textAlign: 'left'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    flex1: { flex: 1 },
    marginTop20: { marginTop: 20 },
    section: {
        marginTop: 20,
        marginHorizontal: 30,
    },
    sectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    line: {
        width: '100%',
        marginTop: 10,
        marginLeft: 10,
    },
    editIcon: {
        marginRight: '5%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginTop: 10
    },
    profilePictureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    saveButtonText: {
        color: colors.WHITE_COLOR,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        fontWeight: FontWeight.F_W_300,

    },
    saveButtonContainer: {
        backgroundColor: '#D39F3A',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },
    statusText: {
        color: colors.BACK_BLUE_DARK,
        padding: 10,
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_18,
        fontWeight: FontWeight.F_W_300
    }
});
