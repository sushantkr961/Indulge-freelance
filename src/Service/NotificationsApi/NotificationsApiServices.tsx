import apiService from "../Api";
import { AxiosResponse } from 'axios';

export async function addFcmTokenToServer(userId: any, fcmToken: any): Promise<any> {
    console.log("userId,fcmToken====================", userId, fcmToken)
    let url = `/api/communication/add-fcm/${userId}`;
    try {
        const response: AxiosResponse<any> = await apiService.put(url, {
            "fcmToken": fcmToken
        });
        console.log("fcm registered Success.......", response.data)
        return response.data
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("addFcmTokenToServer:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("addFcmTokenToServer:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("addFcmTokenToServer:: Request Setup Error:", error.message);
            throw new Error(`${error.message}`);
        }
    }
}

export async function clearNotificationDataApi(userId: any): Promise<any> {
    let url = `/api/notifications/${userId}/read`;
    try {
        const response: AxiosResponse<any> = await apiService.put(url);
        return response.data
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("clearNotificationDataApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("clearNotificationDataApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("clearNotificationDataApi:: Request Setup Error:", error.message);
            throw new Error(`${error.message}`);
        }
    }
}
