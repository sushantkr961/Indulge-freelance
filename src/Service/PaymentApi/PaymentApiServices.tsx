import apiService from "../Api";
import { AxiosResponse } from 'axios';


export async function getWalletBalanceApi(mobile_no: any, region: string): Promise<any> {
    try {
        const response: AxiosResponse<any> = await apiService.get(`/get-wallet-balance?mobile_no=${mobile_no}&region=${region}`);
        console.log("getWalletBalanceApi:: Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("getWalletBalanceApi:: Error:", error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getWalletBalanceApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getWalletBalanceApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getWalletBalanceApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}