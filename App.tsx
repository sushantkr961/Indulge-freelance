import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./src/navigation/Navigation";
import store, { persistor } from "./src/StoreRedux/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const App = () => {
  const setInitialToken = async () => {
    const initialToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI3YjA3MWVlZjU3N2UyOTYyNzI2YjYiLCJpYXQiOjE3MjcwODYxODZ9.ZI0URGOPCQIyoxn6IZinVJdFTQBaZSqER1HfK4CGasI";

    try {
      const storedToken = await AsyncStorage.getItem("token");

      if (!storedToken) {
        await AsyncStorage.setItem("token", initialToken);
        console.log("Token set successfully");
      } else {
        console.log("Token already exists:", storedToken);
      }
    } catch (error) {
      console.error("Error checking or setting token:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not set the token!",
      });
    }
  };

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
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
