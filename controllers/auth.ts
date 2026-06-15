import { APIRequestContext } from "@playwright/test";
import { readSession } from "../utils/session";
import { createHeaders } from "../utils/request";
import { User } from "../dto/data/User";
import { LoginResponse } from "../dto/api/Responses/LoginResponse";
import { storeSession, disposeSession } from "../utils/session";

export async function login(
    request: APIRequestContext,
    user: User
): Promise<any> {
    const response = await request.post("/auth/login", {
        data: user,
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok()) {
        throw new Error(
            `Login failed: ${response.status()} ${await response.text()}`
        );
    }

    const body: LoginResponse = await response.json();
    storeSession(body);
}

export async function logout(
    request: APIRequestContext,
    user: User
): Promise<any> {
    const response = await request.post("/auth/logout", {
        data: user,
        headers: createHeaders(readSession())
    });

    disposeSession();

    if (!response.ok()) {
        throw new Error(
            `Logout failed: ${response.status()} ${await response.text()}`
        );
    }

    return null;
}
