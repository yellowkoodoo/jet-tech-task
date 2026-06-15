import { APIRequestContext } from "@playwright/test";
import { readSession } from "../utils/session";
import { createHeaders } from "../utils/request";
import { OrderRequest } from "../dto/api/Requests/OrderRequest";
import {
    OrderResponse,
    OrdersResponse
} from "../dto/api/Responses/OrderResponse";

export async function orderCreate(
    request: APIRequestContext,
    order: OrderRequest,
    fail: boolean = true
): Promise<OrderResponse> {
    const response = await request.post("/orders", {
        data: order,
        headers: createHeaders(readSession())
    });

    if (fail && !response.ok()) {
        throw new Error(
            `Failed to place an order: ${response.status()} ${await response.text()}`
        );
    }

    if (!fail) {
        const body = await response.json();
        return body.error;
    }

    const body: OrderResponse = await response.json();
    return body;
}

export async function ordersGet(
    request: APIRequestContext
): Promise<OrdersResponse> {
    const response = await request.get("/orders", {
        headers: createHeaders(readSession())
    });

    if (!response.ok()) {
        throw new Error(
            `Failed to get orders: ${response.status()} ${await response.text()}`
        );
    }

    const body: OrdersResponse = await response.json();
    return body;
}

export async function ordersGetById(
    request: APIRequestContext,
    orderId: string
): Promise<OrderResponse> {
    const response = await request.get(`/orders/${orderId}`, {
        headers: createHeaders(readSession())
    });

    if (!response.ok()) {
        throw new Error(
            `Failed to get orders: ${response.status()} ${await response.text()}`
        );
    }

    const body: OrderResponse = await response.json();
    return body;
}
