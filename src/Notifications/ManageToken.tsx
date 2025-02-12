import messaging from '@react-native-firebase/messaging';

// Function to get the FCM token
export async function getFcmToken() {
    try {
        // await checkApplicationPermission
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('FCM Token:', fcmToken);
            return fcmToken;
            // Send the token to your server or use it in your app
        } else {
            console.log('No token received.');
        }
    } catch (error) {
        console.error('Error fetching FCM token:', error);
    }
}

// Listen to token refresh (optional)
messaging().onTokenRefresh((token) => {
    console.log('FCM Token refreshed:', token);
    // Handle token updates (e.g., save to server)
});
