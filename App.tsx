import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";
import { SafeAreaView } from "react-native-safe-area-context"; // To avoid overlap issues

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar
        barStyle="light-content"
        backgroundColor="#0F0F15"
        translucent={true}
        showHideTransition={'slide'}
        // hidden={true}
      /> */}
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
