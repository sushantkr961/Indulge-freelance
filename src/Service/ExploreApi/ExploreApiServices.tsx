import apiService from "../Api";
import { AxiosResponse } from 'axios';

export async function getExploreApi(city: string | undefined, subType: string | undefined, page: number): Promise<any> {
    let url = `/api/place?page=${page}`;

    if (city) {
        url = `/api/place?city=${city}&page=${page}`;

        if (subType) {
            url = `/api/place?city=${city}&type=${subType}&page=${page}`;
        }
    }
    console.log("URLLLLLLL::::", url)
    try {
        const response: AxiosResponse<any> = await apiService.get(url);
        return { response: response.data, headers: response.headers };
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getExploreApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getExploreApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getExploreApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export async function addToMyBidApi(data: any) {
    try {
        const response = await apiService.post(`/api/bidd/in`, data);
        console.log("addToMyBidApi:: Response:", response,);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("addToMyBidApi:: Server Response Error:", error.response.data.error);
            throw new Error(`${error.response.data.error || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("addToMyBidApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("addToMyBidApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}


export async function getExploreFilterListApi(type: string): Promise<any> {
    let url = `/api/tags/get-tags?type=${type}&active=true`;
    
    try {
        const response: AxiosResponse<any> = await apiService.get(url);
        // console.log("URLLLLLLLresponseresponse::::", response.data)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getExploreFilterListApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getExploreFilterListApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getExploreFilterListApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}