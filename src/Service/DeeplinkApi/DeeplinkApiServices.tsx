import apiService from "../Api";
import { AxiosResponse } from 'axios';

export async function getDeeplinkDetailsApi(path: string, id: string): Promise<any> {
    console.log("getDeeplinkDetailsApi:: Request Payload:id=====", path, id);


    type PathType = 'Feed' | 'Explore' | 'Shop';
    // select url based on path
    const urlMap: Record<PathType, (id: string) => string> = {
        Feed: (id) => `/video/${id}`,
        Explore: (id) => `/api/place/${id}`,
        Shop: (id) => `/api/products?id=${id}`,
    };
    const url = path in urlMap ? urlMap[path as PathType](id) : '';

    try {
        const response: AxiosResponse<any> = await apiService.get(url);
        console.log("getDeeplinkDetailsApi:: Response:", response.data);
        if (path == 'Shop') {
            return response.data[0];
        }
        return response.data;
    } catch (error: any) {
        console.error("getDeeplinkDetailsApi:: Error:", error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getDeeplinkDetailsApi:: Server Response Error:", error.response.data.message);
            throw new Error(`${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getDeeplinkDetailsApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getDeeplinkDetailsApi:: Request Setup Error:", error.message);
            throw new Error(`${error.message}`);
        }
    }
}