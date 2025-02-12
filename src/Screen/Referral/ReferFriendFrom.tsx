import React, { useState, useEffect } from "react";
import { Alert, Platform, StyleSheet, Text, ToastAndroid, View } from "react-native";
// import { RootStackParamList } from "../../navigation/types";
// import { StackNavigationProp } from "@react-navigation/stack";
import CustomGradientButton from "../../Components/CustomGradientButton";
// import { RouteProp } from "@react-navigation/native";
import LabeledInput from "../../Components/LabeledInput";
import CustomButton from "../../Components/CustomButton";
import { createReferralApi } from "../../Service/ReferralApi/ReferralApiServices";

// type ReferFriendFormNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "ReferFriendForm"
// >;

// type ReferFriendFormRouteProp = RouteProp<
//   RootStackParamList,
//   "ReferFriendForm"
// >;

// type Props = {
//   navigation: ReferFriendFormNavigationProp;
//   route: ReferFriendFormRouteProp;
// };

const ReferFriendForm = ({ navigation, route }: any) => {
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);
  const [contactNumber, setContactNumber] = useState(contact.mobileNo);
  const showMessage = (message: any) => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } else {
      Alert.alert('', message);
    }
  };
  const formatPhoneNumber = (phoneNumber: any) => {
    // Remove all non-numeric characters
    return phoneNumber.replace(/[^0-9]/g, '');
  };
  const handleSave = async () => {
    try {
      const referralData = {
        name: name,
        mobileNo: formatPhoneNumber(contactNumber),
      };
      // console.log("referralData=======", referralData)
      const response = await createReferralApi(referralData);
      // Usage
      showMessage(response.message);
      navigation.goBack();
    } catch (error: any) {
      error.message && showMessage(error.message);
    }
  };

  return (
    <View style={ReferFriendFormstyles.container}>
      <View style={ReferFriendFormstyles.overlay} />
      <View style={ReferFriendFormstyles.screenModalView}>
        <View style={ReferFriendFormstyles.dragHandle} />
        <Text style={ReferFriendFormstyles.title}>Refer your Friend</Text>

        <LabeledInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
        />

        <LabeledInput
          label="Contact"
          value={contactNumber.toString()}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          placeholder="Enter contact"
        />

        <View style={{ marginTop: 15 }}>
          <CustomGradientButton
            title="Save"
            onPress={handleSave}
            buttonStyle={ReferFriendFormstyles.saveButton}
            gradientColors={["#D39F3A", "#BD812D"]}
          />
          <CustomButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            buttonStyle={ReferFriendFormstyles.cancelButton}
            textStyle={ReferFriendFormstyles.cancelButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ReferFriendForm;
export const ReferFriendFormstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  screenModalView: {
    flex: 0.6,
    justifyContent: "flex-start",
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: "#1A1A23",
    padding: 20,
    //   borderWidth: 1, borderColor: 'white'
  },
  dragHandle: {
    width: 60,
    height: 3,
    backgroundColor: "#566D80",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    marginVertical: 20,
  },
  saveButton: {
    backgroundColor: "#D4AF37",
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelButtonText: {
    fontFamily: "JosefinSans-Regular",
    textDecorationLine: "underline",
  },
});