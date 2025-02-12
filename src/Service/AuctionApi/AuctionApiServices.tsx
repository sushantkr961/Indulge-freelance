import apiService from "../Api";
import { AxiosResponse } from 'axios';

export async function getOngoingBidsApi(userId: string): Promise<any> {
    console.log("getCartListApi:: Response:", userId);

    try { //bidd/live-auction
        const response: AxiosResponse<any> = await apiService.get(`/api/bidd/live-auction`);
        console.log("getCartListApi:: Response:", response);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getCartListApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getCartListApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getCartListApi:: Request Setup Error:", error.message);
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


export async function getMyBidsApi(userId: any): Promise<any> {
    console.log("getMyBidsApi:: Request Payload:userId=====", userId);
    try {
        const response: AxiosResponse<any> = await apiService.get(`/api/order?userId=${userId}&productType=AUCTION`);
        console.log("getMyBidsApi:: Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("getMyBidsApi:: Error:", error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getMyBidsApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getMyBidsApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getMyBidsApi:: Request Setup Error:", error.message);
            throw new Error(`${error.message}`);
        }
    }
}


export async function getWonBidsApi(id: any): Promise<any> {
    console.log("getWonBidsApi:: Request Payload:id=====", id, `/api/bidd/check-winner?productId=${id}`);
    try {
        const response: AxiosResponse<any> = await apiService.get(`/api/bidd/check-winner?productId=${id}`);
        console.log("getWonBidsApi:: Response:", response.data);
        return response.data.data;
    } catch (error: any) {
        console.error("getWonBidsApi:: Error:", error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getWonBidsApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getWonBidsApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getWonBidsApi:: Request Setup Error:", error.message);
            throw new Error(`${error.message}`);
        }
    }
}
