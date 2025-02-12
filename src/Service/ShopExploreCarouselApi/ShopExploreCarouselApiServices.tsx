import apiService from "../Api";
import { AxiosResponse } from 'axios';

export async function getShopCarouselApi(category: string | undefined, active: boolean): Promise<any> {
    let url = `/api/banner/get-all?active=${active}&category=${category}`;
    try {
        const response: AxiosResponse<any> = await apiService.get(url);
        return response.data
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getShopCarouselApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getShopCarouselApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getShopCarouselApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}
export async function getExploreCarouselApi(category: string | undefined, active: boolean): Promise<any> {
    let url = `/api/banner/get-all?active=${active}&category=${category}`;
    try {
        const response: AxiosResponse<any> = await apiService.get(url);
        return response.data
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getExploreCarouselApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getExploreCarouselApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getExploreCarouselApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}
