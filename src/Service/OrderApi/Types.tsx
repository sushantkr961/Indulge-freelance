// types.ts
export interface Product {
    productId: string;
    quantity: number;
}

export interface CreateOrderRequest {
    products: Product[];
    currency: string;
    shippingAddress: string;
}

export interface CreateOrderResponse {
    orderId: string;
    status: string;
    totalAmount: number;
    currency: string;
}
