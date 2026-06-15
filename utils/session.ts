import { LoginResponse } from "../dto/api/Responses/LoginResponse";
import * as fs from "fs";

const file = "auth-token";

export function storeSession(login: LoginResponse) {
    fs.writeFileSync(file, login.token, "utf-8");
}

export function readSession() {
    const session = fs.readFileSync(file, "utf-8");
    return session;
}

export function disposeSession() {
    fs.unlinkSync(file);
}
