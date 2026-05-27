import { Locator, expect } from "@playwright/test";
import BasePage from "./base/base.page";

export enum AppFormElements {
    Name = "Name:",
    Email = "Email:",
    Avatar = "Avatar:"
}

export default class FormResultPage extends BasePage {
    readonly pageTitle: string = "Form Submissions";

    private readonly submitButton = this.page.locator("a");
    private readonly getElement = (formElement: AppFormElements): Locator =>
        this.page.locator(`//strong[text()="${formElement}"]`);

    async checkUserPassedSubmission() {
        await expect(this.page).toHaveURL(/success/);
    }

    async getName() {
        return await this.getText(AppFormElements.Name);
    }

    async getEmail() {
        return await this.getText(AppFormElements.Email);
    }

    async getAvatarText() {
        return await this.getText(AppFormElements.Avatar);
    }

    async getAvatar() {
        return await this.getElement(AppFormElements.Avatar);
    }

    private async getText(formElement: AppFormElements): Promise<string> {
        const element = this.getElement(formElement);
        return await element.evaluate(
            (e) => e.nextSibling?.textContent?.trim() ?? ""
        );
    }
}
