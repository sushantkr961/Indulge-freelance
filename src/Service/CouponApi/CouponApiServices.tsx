import apiService from "../Api";
import { AxiosResponse } from 'axios';

export async function getInitiateSubPaymentDataApi(body: any): Promise<any> {
    let url = `/api/payment/initiate-payment`;
    console.log("body:::::", body)
    try {
        const response: AxiosResponse<any> = await apiService.post(url, body);
        return response.data
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getInitiatePaymentDataApi:: Server Response Error:", error.response.data);
            throw new Error(`${error.response.data.msg || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getInitiatePaymentDataApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getInitiatePaymentDataApi:: Request Setup Error:", error.message);
            throw new Error(`${error.message}`);
        }
    }
}
export async function getVerifySubPaymentDataApi(body: any): Promise<any> {
    let url = `/api/payment/verify-subs-payment`;
    try {
        const response: AxiosResponse<any> = await apiService.post(url, body);
        return response.data
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getVerifyPaymentDataApi:: Server Response Error:", error.response.data);
            throw new Error(`${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getVerifyPaymentDataApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getVerifyPaymentDataApi:: Request Setup Error:", error.message);
            throw new Error(`${error.message}`);
        }
    }
}
