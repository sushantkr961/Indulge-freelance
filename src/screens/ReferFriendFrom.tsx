import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LabeledInput from "../components/LabeledInput";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomGradientButton from "../components/CustomGradientButton";

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
        <View style={{marginTop: 15}}>
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

const styles = StyleSheet.create({
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
