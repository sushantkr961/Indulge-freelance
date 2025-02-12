import apiService from '../Api';
import { AxiosResponse } from 'axios';
import { CreateOrderRequest, CreateOrderResponse } from './Types';

export async function createOrderApi(orderData: CreateOrderRequest): Promise<any> {
    try {
        const response: AxiosResponse<any> = await apiService.post('/api/order/create', orderData);
        console.log('createOrderApi:: Response:', response);
        return response.data;
    } catch (error: any) {
        console.error('createOrderApi:: Error:', error);
        if (error.response) {
            console.error('createOrderApi:: Server Response Error:', error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            console.error('createOrderApi:: No Response Error:', error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            console.error('createOrderApi:: Request Setup Error:', error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export async function getOrderListApi(userId: string, status: string): Promise<any> {
    try {
        const response: AxiosResponse<any> = await apiService.get(`/api/order?userId=${userId}&status=${status}`);
        console.log("getOrderListApi:: Response:", response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("getOrderListApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("getOrderListApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("getOrderListApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}
