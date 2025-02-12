import apiService from "../Api";
import { AxiosResponse } from 'axios';

//=========getCartListApi===================
export interface Image {
    filename: string;
    url: string;
}

export interface Price {
    region: string;
    amount: number;
}

export interface Product {
    _id: string;
    name: string;
    images: Image[];
    prices: Price[];
    description: string;
    productType: string;
    categories: string[];
    __v: number;
}

export interface CartItem {
    productId: Product;
    quantity: number;
    price: Price[];
    name: string;
    _id: string;
}

export interface GetCartListResponse {
    cart: CartItem[];
    totalPrice: number;
    currency: string;
}

export async function getCartListApi(region: string): Promise<any> {
    try {
        const response: AxiosResponse<any> = await apiService.get(`api/cart/get?region=IN`);
        console.log("getCartListApi:: Response:", response.data);
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

export async function changeQuantityDataApi(data: any) {
    try {
        const response = await apiService.put(`/api/cart/update`, data);
        console.log("getCartListApi:: Response:", response.data);
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


//=========addToCartApi===================
interface AddToCartRequest {
    // Define the properties of your request object here
    // For example:
    productId: string;
    quantity: number;
    // userId: string
}

interface AddToCartResponse {
    // Define the properties of your response object here
    // For example:
    success: boolean;
    message: string;
}

export async function addToCartApi(obj: AddToCartRequest): Promise<AddToCartResponse> {
    console.log("addToCartApi:: Request Payload:", obj);
    try {
        const response: AxiosResponse<AddToCartResponse> = await apiService.post('/api/cart/add', obj);
        console.log("addToCartApi:: Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("addToCartApi:: Error:", error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("addToCartApi:: Server Response Error:", error.response.data);
            throw new Error(`Server error: ${error.response.data.message || 'An error occurred'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("addToCartApi:: No Response Error:", error.request);
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("addToCartApi:: Request Setup Error:", error.message);
            throw new Error(`Error: ${error.message}`);
        }
    }
}