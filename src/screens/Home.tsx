import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Home</Text>
        <Button
          title="Go to Referral Screen"
          onPress={() => navigation.navigate("Referral")}
          color="#1e90ff"
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F15",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 32,
    color: "white",
    marginBottom: 20,
    fontFamily: "JosefinSans-Bold",
  },
});
