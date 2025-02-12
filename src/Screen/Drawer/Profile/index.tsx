import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Image, Text, Pressable, Modal, ScrollView, Dimensions, StyleSheet, Alert, BackHandler, PermissionsAndroid, Platform } from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import { useCameraPermission } from 'react-native-vision-camera'
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from "../../../Utils/Constant/Colors";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Notes from "./Notes";
import Address from "./Address";
import PersonalInfo from "./PersonalInfo";
import { Fonts, FontSize, FontWeight } from "../../../Utils/Constant/Fonts";
import ProfileCustomTabBar from "./ProfileCustomTabBar";

const Tab = createMaterialTopTabNavigator();
const ProfileScreen = () => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState(require('../../../../assets/screen/Indulge_LOGO_ONLY.png'));
    const [showModalVisible, setShowModalVisible] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0)
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    const [focusedElement, setFocusedElement] = useState('Personal');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('13 January');
    const [selectedStatus, setSelectedStatus] = useState('Married');
    const statusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
    const [selectedChildren, setSelectedChildren] = useState('2');
    const childrenOptions = ['0', '1', '2', '3', '4+'];
    const [childrenModalVisible, setChildrenModalVisible] = useState(false);
    const [imagePermissionResult, setImagePermissionResult] = useState(false);
    const [isPhotoSelected, setIsPhotoSelected] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Enter Name',
        age: 'Enter Age',
        relationStatus: 'Single',
        numberOfChildren: '0',
        birthday: 'Enter Birthday',
    });
    const { hasPermission, requestPermission } = useCameraPermission()

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        const formattedDate = formatDate(date);
        setSelectedDate(formattedDate);
        // setProfileData((item) => {...item, birthday: formattedDate});
        setProfileData((prevData) => ({
            ...prevData,
            birthday: formattedDate,
        }));
    };


    const formatDate = (date) => {
        return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
    };


    const getMonthName = (monthIndex) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    };


    const toggleModal = () => {
        setShowModalVisible(!showModalVisible);
    };

    const handleStatusSelection = (status) => {
        setSelectedStatus(status);
        setProfileData((prevData) => ({
            ...prevData,
            relationStatus: status,
        }));
        toggleModal();
    };



    const renderStatusOption = ({ item }) => {
        return (
            <Pressable onPress={() => handleStatusSelection(item)}>
                <Text style={{
                    padding: 10, fontFamily: 'PF Beau Sans Pro-Regular',
                    fontSize: 18
                }}>{item}</Text>
            </Pressable>
        );
    };

    const toggleShowModal = () => {
        setChildrenModalVisible(!childrenModalVisible);
    };

    const handleChildrenSelection = (children) => {
        setSelectedChildren(children);
        setProfileData((prevData) => ({
            ...prevData,
            numberOfChildren: children,
        }));
        toggleShowModal();
    };

    const renderChildrenOption = ({ item }) => {
        return (
            <Pressable onPress={() => handleChildrenSelection(item)}>
                <Text style={{
                    padding: 10, fontFamily: 'PF Beau Sans Pro-Regular',
                    fontSize: 18
                }}>{item}</Text>
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

    const handleBackDrawerScreen = () => {
        navigation.navigate('Drawer')
        setShowSaveButton(false);
    }

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

    //choose photo from camera
    const handleCaptureImage = async () => {
        hideModal();

        // const { status } = await Camera.requestCameraPermissionsAsync();
        if (!hasPermission) {
            requestPermission()
            // alert("Allow camera permission first? for upload profile image")
        } else {
            const result = await ImagePicker.launchCamera({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const selectedImage = result.assets[0];
                setProfilePicture({ uri: selectedImage.uri })
                try {
                    await AsyncStorage.setItem('profilePictureURI', selectedImage.uri);
                } catch (error) {
                    console.error('Error saving profile picture:', error);
                }
            }
        }
        setIsPhotoSelected(true);
        setShowSaveButton(true);
    };

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Permission title",
                    message:
                        "Permission message",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setImagePermissionResult(true)
            } else {
                setImagePermissionResult(false)
               
            }
        } catch (err) {
            console.warn(err);
        }
    };
    //Choose photo from gallery
    const handleSelectProfileImage = async () => {
        hideModal();
        // const imagePermissionResult = true // await ImagePicker.requestMediaLibraryPermissionsAsync();

        // if (Platform.OS === "ios" ? true : imagePermissionResult) {
        const result = await ImagePicker.launchImageLibrary({
            mediaTypes: 'image',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0];
            setProfilePicture({ uri: selectedImage.uri })

            try {
                await AsyncStorage.setItem('profilePictureURI', selectedImage.uri);
                
            } catch (error) {
                console.error('Error saving profile picture:', error);
            }
        }
        // } else {
        //     requestStoragePermission()
        // }
        setIsPhotoSelected(true);
        setShowSaveButton(true);
    };

    const showModal = () => {
        setModalVisible(true)
    }

    const hideModal = () => {
        setModalVisible(false)
    }

    const saveProfilePicture = async () => {
        try {
            const storedNumber = await AsyncStorage.getItem('phoneNumber');
            const profilePictureURI = await AsyncStorage.getItem('profilePictureURI');
            if (profilePictureURI && storedNumber) {
                await uploadProfilePicture(storedNumber, profilePictureURI);
            }

            if (isEditing) {
                await updateProfileAPI(storedNumber, selectedDate, selectedStatus, selectedChildren);
            }

            await fetchProfileDetails();
            setShowSaveButton(false);
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };

    // upload-profile-picture api
    const uploadProfilePicture = async (mobileNumber, uri) => {
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
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    // save button
    const renderSaveButton = () => {
        if ((isPhotoSelected && showSaveButton) || isEditing) {
            return (
                <Pressable
                    style={{ backgroundColor: '#D39F3A', width: '90%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}
                    onPress={saveProfilePicture}>
                    <Text style={{
                        color: 'white', fontFamily: 'PF Beau Sans Pro-Regular',
                        fontSize: 18,
                    }}>Save</Text>
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
    const updateProfileAPI = async (mobileNumber, birthday, relationStatus, children) => {
        try {
            const response = await axios.post(
                `https://indulgeconcierge.com/edit-profile`,
                {
                    mobile_no: mobileNumber,
                    birthday: birthday,
                    Relation_status: relationStatus,
                    Children: children,
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
        if (isEditing) {
            updateProfileAPI(storedPhoneNumber, selectedDate, selectedStatus, selectedChildren);
        }
    }, [isEditing]);


    useEffect(() => {
        fetchProfileDetails();
    }, [isEditing]);

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
                const { name, age, Relation_status, number_of_children, birthdate } = response.data;
               
                setProfileData({
                    name: name || 'Enter Name',
                    age: age || 'Enter Age',
                    relationStatus: Relation_status || 'Single',
                    numberOfChildren: number_of_children || '0',
                    birthday: birthdate || 'Enter Birthday',
                });
            } else {
                console.error('Stored phone number is undefined');
            }
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.headerButton} onPress={handleBackButton}>
                <Image source={require('../../../../assets/intro/WhiteBackArrow.png')} style={{ marginRight: 15 }} />
                <Text style={styles.headerText}>Profile Edit</Text>
            </Pressable>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ padding: 15, position: 'relative' }}>
                    <Pressable >
                        <Image source={profilePicture} style={{ marginBottom: 20, width: 124, height: 124, borderRadius: 32, resizeMode: 'contain' }} />
                    </Pressable>
                    <Pressable onPress={showModal} style={{ position: 'absolute', left: '80%', top: 100 }}>
                        <Image source={require('../../../../assets/drawer/CameraImage.png')} />
                    </Pressable>
                </View>
                {/* <View style={{ alignItems:'center',justifyContent:'center'}}>
          <Text style={{ color: '#8E93A6',     
fontSize: 16,  }}>Wallet</Text>
          <Text style={{ color: '#FFFFFF',    
fontSize: 16,  }}>₹ {walletBalance}</Text>
        </View> */}
            </View>
            {/* Modal */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={isModalVisible}
                onRequestClose={hideModal}>
                <ScrollView style={styles.modalContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Text style={styles.profilePicture}>Upload Profile</Text>
                        <Pressable style={{
                            marginLeft: '20%', marginTop: '5%',
                            alignItems: 'center', justifyContent: 'center',
                            // backgroundColor: colors.GREY_FONT_COLOR
                        }} onPress={hideModal} >
                            <Image source={require('../../../../assets/drawer/Close.png')} style={{ width: 45, height: 45, tintColor: colors.BLACK_BACKGROUND_COLOR }} />
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '15%', marginBottom: '20%', justifyContent: 'space-between' }}>
                        <Pressable style={{ marginLeft: '20%', alignItems: 'center', justifyContent: 'center' }} onPress={handleCaptureImage} >
                            <Image source={require('../../../../assets/drawer/UploadCameraPic.png')} style={{ width: 55, height: 55 }} />
                            <Text style={styles.takePhoto}>Take a Photo</Text>
                        </Pressable>
                        <Pressable style={{ marginRight: '16%', alignItems: 'center', justifyContent: 'center' }} onPress={handleSelectProfileImage}>
                            <Image source={require('../../../../assets/drawer/Gallery.png')} style={{ width: 55, height: 55 }} />
                            <Text style={styles.takePhoto}>Photo Gallery</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>
            <Tab.Navigator
                tabBar={props => <ProfileCustomTabBar {...props} />}
                style={{ backgroundColor: '#0F0F15' }}
                sceneContainerStyle={{ backgroundColor: '#0F0F15' }}
                tabBarOptions={{
                    style: {
                        backgroundColor: '#0F0F15',
                        borderColor: 'transparent',
                    },
                    activeTintColor: colors.WHITE_COLOR,
                    inactiveTintColor: colors.GREY_FONT_FONT_COLOR,
                    labelStyle: {
                        fontFamily: Fonts.REGULAR,
                        fontSize: FontSize.F_20,
                        fontWeight: FontWeight.F_W_300,
                        textAlign: 'auto',
                        autoCapitalize: 'none'
                    },
                    indicatorStyle: {
                        backgroundColor: colors.YELLO_THEME_COLOR
                    }
                }}
            >
                <Tab.Screen name="PersonalInfo" component={PersonalInfo} options={{ tabBarLabel: 'Personal Info' }} />
                <Tab.Screen name="Address" component={Address} />
                <Tab.Screen name="Notes" component={Notes} />
            </Tab.Navigator>
        </View>
    )
}
export default ProfileScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F15'
    },
    firstContainer: {
        backgroundColor: '#535353',
        height: SCREEN_HEIGHT / 4.7
    },
    secondContainer: {
        backgroundColor: '#FFFFFF',
        flex: 1 / 1
    },
    profileImage: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: '3%',

    },
    camera: {
        position: 'absolute',
        top: 100,
        left: 218,
    },
    modalContainer: {
        flex: 1,
        marginTop: '128%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.40,
        shadowRadius: 3.84,
    },
    profilePicture: {
        marginTop: '5%',
        marginLeft: '5%',
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.BLACK_BACKGROUND_COLOR
    },
    deleteIcon: {
        marginTop: '10%',
        marginRight: '10%'
    },
    cancelButton: {
        backgroundColor: '#ffbf00',
        width: 123,
        height: 33,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButton: {
        padding: 2,
        marginTop: '4%',
        marginLeft: '5%'
    },
    tabBar: {
        flexDirection: "row",
    },
    tabButton1: {
        padding: 2,
        marginTop: '4%',
        marginLeft: '7%'
    },
    activeTab: {
        backgroundColor: "#ddd",
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 1,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    categoryText: {
        color: '#8E93A6',
        fontFamily: 'PF Beau Sans Pro-Regular',
        fontSize: 20,
        // fontWeight: '400',
    },
    tasteText: {
        color: '#8E93A6',
        fontFamily: 'PF Beau Sans Pro-Regular',
        fontSize: 20,
        // fontWeight: '400',
        marginLeft: '30%',
    },
    focusedText: {
        color: '#FFFFFF',
    },
    takePhoto: {
        marginTop: '15%',
        fontFamily: Fonts.REGULAR,
        fontSize: FontSize.F_20,
        color: colors.BLACK_BACKGROUND_COLOR
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 50 : 0,
        marginLeft: 20
    },
    headerText: {
        color: colors.WHITE_COLOR,
        fontSize: FontSize.F_16,
        fontWeight: FontWeight.F_W_300
    }
})