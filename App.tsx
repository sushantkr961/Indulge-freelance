import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./src/navigation/Navigation";
import store, { persistor } from "./src/StoreRedux/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  // Function to set the token in AsyncStorage when the app starts
  const setInitialToken = async () => {
    const initialToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI3YjA3MWVlZjU3N2UyOTYyNzI2YjYiLCJpYXQiOjE3MjcwODYxODZ9.ZI0URGOPCQIyoxn6IZinVJdFTQBaZSqER1HfK4CGasI"; // Replace with the actual token you want to set
    try {
      await AsyncStorage.setItem("token", initialToken);
      console.log("Token set successfully");
    } catch (error) {
      console.error("Error setting token:", error);
    }
  };
  // useEffect to set the token when the app starts
  useEffect(() => {
    setInitialToken();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#0F0F15"
            translucent={true}
            showHideTransition={"slide"}
          />
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
