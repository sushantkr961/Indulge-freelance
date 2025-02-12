import apiService from "../Api";
import { AxiosResponse } from 'axios';

export async function getMyCouponApi(): Promise<any> {
    try {
        const response: AxiosResponse<any> = await apiService.get(`/api/discount/get-all?active=true`);
        console.log("getMyCouponApi:: Response:", response);
        return response.data;
    } catch (error: any) {
        console.error("getMyCouponApi:: Error:", error);
        if (error.response) {
            console.error("getMyCouponApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            console.error("getMyCouponApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            console.error("getMyCouponApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}
