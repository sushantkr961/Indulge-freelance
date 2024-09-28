import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, ToastAndroid, View } from "react-native";
import LabeledInput from "../../Components/LabeledInput";
import CustomButton from "../../Components/CustomButton";
import { RootStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomGradientButton from "../../Components/CustomGradientButton";
import { ReferFriendFormstyles as styles } from "./style";
import { RouteProp } from "@react-navigation/native";
import { createReferralApi } from "../../Service/ReferralApi/ReferralApiServices";
import Toast from "react-native-toast-message";

type ReferFriendFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ReferFriendForm"
>;

type ReferFriendFormRouteProp = RouteProp<
  RootStackParamList,
  "ReferFriendForm"
>;

type Props = {
  navigation: ReferFriendFormNavigationProp;
  route: ReferFriendFormRouteProp;
};

const ReferFriendForm = ({ navigation, route }: Props) => {
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);
  const [contactNumber, setContactNumber] = useState(contact.mobileNo);

  const handleSave = async () => {
    try {
      const referralData = {
        mobileNo: contactNumber.toString(),
      };
      const response = await createReferralApi(referralData);
      // console.log("Referral created successfully:", response.message);
      Toast.show({
        type: 'success',
        // text1: 'Success',
        text1: response.message,
      });
      navigation.goBack();
    } catch (error: any) {
      // console.log("Error creating referral:", error.message);
      Toast.show({
        type: 'info',
        // text1: '',
        text1: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.screenModalView}>
        <View style={styles.dragHandle} />
        <Text style={styles.title}>Refer your Friend</Text>
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
        <View>
          <CustomGradientButton
            title="Save"
            onPress={handleSave}
            buttonStyle={styles.saveButton}
            gradientColors={["#D39F3A", "#BD812D"]}
          />
          <CustomButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ReferFriendForm;
