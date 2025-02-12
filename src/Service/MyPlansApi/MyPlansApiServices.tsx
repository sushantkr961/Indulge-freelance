import apiService from "../Api";
import { AxiosResponse } from 'axios';

export async function getMyPlansApi(): Promise<any> {
    try {
        const response: AxiosResponse<any> = await apiService.get(`/api/subscription`);
        console.log("getMyPlansApi:: Response:", response);
        return response.data;
    } catch (error: any) {
        console.error("getMyPlansApi:: Error:", error);
        if (error.response) {
            console.error("getMyPlansApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            console.error("getMyPlansApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            console.error("getMyPlansApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}
