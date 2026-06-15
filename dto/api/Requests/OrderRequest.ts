import { PaymentType } from '../../data/enums/Payments'

export interface OrderRequest
{
    items: OrderItem[],
    paymentMethod: PaymentType
}

export interface OrderItem
{
    productId?: string, 
    quantity?: number
}