import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LabeledInput from "../../Components/LabeledInput";
import CustomButton from "../../Components/CustomButton";
import { RootStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomGradientButton from "../../Components/CustomGradientButton";
import { ReferFriendFormstyles as styles } from "./style";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ReferFriend"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const ReferFriendForm = ({ navigation }: Props) => {
  const [name, setName] = useState("Kunal Bahal");
  const [contact, setContact] = useState("Auto fill Number");

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
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
          placeholder="Enter contact"
        />
        <View style={{ marginTop: 15 }}>
          <CustomGradientButton
            title="Save"
            onPress={() => navigation.goBack()}
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
