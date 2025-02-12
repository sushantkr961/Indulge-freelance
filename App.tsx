/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { DefaultTheme, Provider as RNProvider } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { MyLoginStack } from './src/Navigator/stackNavigation';
import { Provider } from "react-redux";
import store, { persistor } from './src/StoreRedux/Store';
import { PersistGate } from 'redux-persist/integration/react';
// import { StripeProvider } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { linking } from './linkingConfig';
import { CopilotProvider } from "react-native-copilot";
import { requestUserPermission } from './src/Notifications/Permission';
import messaging from '@react-native-firebase/messaging';
import { getFcmToken, onDisplayNotification, registerListenerWithFCM } from './src/Utils/FcmHelper';
import notifee, { EventType } from '@notifee/react-native';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [notificationData, setNotificationData] = useState(null);
  const [notificationUrl, setNotificationUrl] = useState<string | undefined>(undefined);

  // const navigation = useNavigation()
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
    },
  };
  const getlinking = async () => {
    const data = await AsyncStorage.getItem('token');
    if (data) {
      console.log("linkinglinking==", linking)
      return linking
    } else {
      return {}
    }
  };
  const handleNotificationData = (remoteMessage: any) => {
    console.log("-------> remoteMessage", remoteMessage)
    if (remoteMessage.data.productLink) {
      const url = remoteMessage.data.productLink;
      // Example URL: https://indulgeconcierge.com/app?path=Explore&id=66c98ffe7bace498d5199ef4
      // setNotificationUrl("https://indulgeconcierge.com/app?path=Explore&id=66c98ffe7bace498d5199ef4")
      setNotificationUrl(url)

      // const urlParams = new URLSearchParams(url.split('?')[1]);
      // const path = urlParams.get('path'); // Extract 'Explore'
      // const id = urlParams.get('id');     // Extract '66c98ffe7bace498d5199ef4'
      // setNotificationData({ path, id });

      // // Navigate to the corresponding screen based on the path and id
      // if (path === 'Explore') {
      //   navigation.navigate('ExploreScreen', { id });
      // }
      // Add more conditions here for other paths if needed
    }
  };
  useEffect(() => {
    getFcmToken();
    requestPermission()
  }, []);

  const requestPermission = async () => {
    const trackingStatus = await requestTrackingPermission();
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      // Tracking is authorized or unavailable
      // Proceed with tracking or loading advertising data
    } else {
      // Tracking is not allowed
      // Handle accordingly
    }
  };

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);
  function registerListenerWithFCM() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('onMessage Received : ', JSON.stringify(remoteMessage));
      if (
        remoteMessage?.notification?.title &&
        remoteMessage?.notification?.body
      ) {
        onDisplayNotification(
          remoteMessage.notification?.title,
          remoteMessage.notification?.body,
          remoteMessage?.data,
        );
      }
    });
    notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          handleNotificationData(detail.notification);
          // if (detail?.notification?.data?.clickAction) {
          //   onNotificationClickActionHandling(
          //     detail.notification.data.clickAction
          //   );
          // }
          break;
      }
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'onNotificationOpenedApp Received',
        JSON.stringify(remoteMessage),
      );
      handleNotificationData(remoteMessage);

      // if (remoteMessage?.data?.clickAction) {
      //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
      // }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          handleNotificationData(remoteMessage);

        }
      });

    return unsubscribe;
  }
  return (
    <Provider store={store} >
      <RNProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <CopilotProvider stopOnOutsideClick androidStatusBarVisible>
            <NavigationContainer //linking={getlinking}
            >
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <MyLoginStack notificationUrl={notificationUrl} />
            </NavigationContainer>
          </CopilotProvider>
        </PersistGate>
      </RNProvider>
    </Provider >
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;


// useEffect(() => {
  //   requestUserPermission();  // Request permission on app start
  //   getFcmToken()
  //   // Handle incoming messages while the app is in the foreground
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!000', remoteMessage);
  //     // handleNotificationData(remoteMessage);
  //     // Show a simple alert with the notification details
  //     // Alert.alert(
  //     //   remoteMessage.notification.title,
  //     //   remoteMessage.notification.body,
  //     //   [{ text: 'OK' }]
  //     // );
  //   });
  //   // Foreground notification listener
  //   messaging().onMessage(async (remoteMessage) => {
  //     console.log('A new FCM message arrived!111', remoteMessage);
  //     handleNotificationData(remoteMessage);  // Handle notification data
  //   });

  //   // Background and quit state notifications (handled when app is opened from notification)
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('Notification caused app to open from background state:222', remoteMessage);
  //     handleNotificationData(remoteMessage);  // Handle notification data
  //   });

  //   // Handle notifications that caused the app to open from a quit state
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log('Notification caused app to open from quit state:333', remoteMessage);
  //         handleNotificationData(remoteMessage);  // Handle notification data
  //       }
  //     });
  //   return unsubscribe;
  // }, []);
