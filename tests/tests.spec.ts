import { expect, test } from "@playwright/test";
import { login, logout } from "../controllers/auth";
import { orderCreate, ordersGet, ordersGetById } from "../controllers/orders";

import { OrderRequest } from "../dto/api/Requests/OrderRequest";
import { PaymentType } from "../dto/data/enums/Payments";
import { OrderStatus } from "../dto/data/enums/OrderStatus";
import { PaymentStatus } from "../dto/data/enums/PaymentStatus";

import { alice } from "./test-data/Users";

test.describe("API | ORDERS", () => {
    test.beforeAll(async ({ request }) => {
        await login(request, alice);
    });

    test.afterAll(async ({ request }) => {
        await logout(request, alice);
    });

    test("Create order", async ({ request }) => {
        const order1: OrderRequest = {
            items: [
                {
                    productId: "p1",
                    quantity: 1
                }
            ],
            paymentMethod: PaymentType.CreditCard
        };

        const created = await orderCreate(request, order1);
        const orderId = created.id;
        expect(created.items[0].productId).toEqual(order1.items[0].productId);
        expect(created.items[0].quantity).toEqual(order1.items[0].quantity);
        expect(created.status).toEqual(OrderStatus.Processing);
        expect(created.paymentStatus).toEqual(PaymentStatus.Paid);

        const orders = await ordersGet(request);
        expect(orders.data.some((order) => order.id === orderId)).toBeTruthy();

        const orderById = await ordersGetById(request, orderId);
        expect(created.id).toEqual(orderId);
        expect(created.items[0].productId).toEqual(order1.items[0].productId);
        expect(orderById.items[0].quantity).toEqual(order1.items[0].quantity);
        expect(orderById.status).toEqual(OrderStatus.Processing);
        expect(orderById.paymentStatus).toEqual(PaymentStatus.Paid);
    });

    test("Empty items", async ({ request }) => {
        const order1: OrderRequest = {
            items: [],
            paymentMethod: PaymentType.CreditCard
        };

        const created = await orderCreate(request, order1, false);
        expect(created).toEqual(
            "items array is required and must not be empty"
        );
    });

    test("Invalid product id", async ({ request }) => {
        const order1: OrderRequest = {
            items: [
                {
                    productId: "a1",
                    quantity: 1
                }
            ],
            paymentMethod: PaymentType.CreditCard
        };

        const created = await orderCreate(request, order1, false);
        console.log(created);
        expect(created).toEqual(
            `Product ${order1.items[0].productId} not found`
        );
    });
});
