import { Locator } from "@playwright/test";
import BasePage from "./base/base.page";

export enum AppFormElements {
    Name = "Name:",
    Email = "Email:",
    Avatar = "Avatar:"
}

export default class FormResultPage extends BasePage {
    readonly pageTitle: string = "Form Submissions";

    private readonly submitButton = this.page.locator("a");

    private readonly getTextElement = (formElement: AppFormElements): Locator =>
        this.page.locator(
            `//strong[text()="${formElement}"]/following-sibling::text()[1]`
        );

    async getName() {
        await this.getTextElement(AppFormElements.Name).textContent();
    }

    async getEmail() {
        await this.getTextElement(AppFormElements.Email).textContent();
    }

    async getAvatar() {
        await this.getTextElement(AppFormElements.Avatar).textContent();
    }
}
