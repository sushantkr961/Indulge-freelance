import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';
import { getFcmToken } from './ManageToken';

// Function to request notification permissions
export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log("authStatus:::", authStatus, enabled)
    if (enabled) {
        console.log('Notification permissions enabled.');
        getFcmToken();  // Get the FCM token when permission is granted
    } else {
        console.log('Notification permissions disabled.');
        Alert.alert('Permission Required', 'Notification permission is required to send notifications.');
    }
}
