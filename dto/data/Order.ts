export interface Order {
    id: string,
    userId: string,
    items: OrderItem[],
    total: number,
    status: string,
    paymentStatus: string,
    createdAt: string,
    updatedAt: string
}

export interface OrderItem { 
    productId: string, 
    quantity: number, 
    price: number 
}

