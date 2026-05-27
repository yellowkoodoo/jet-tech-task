import { Locator } from "@playwright/test";
import BasePage from "./base/base.page";
import { User, Avatar } from "../types/user";

export enum AppFormElements {
    FirstName = "first_name",
    LastName = "last_name",
    Email = "email",
    Password = "password",
    PasswordConfirm = "confirm_password",
    Avatar = "avatar",
    Submit = "submit"
}

export default class AppFormPage extends BasePage {
    private readonly slider = this.page.locator("#slider-thumb");
    private readonly sliderTrack = this.page.locator("#slider-track");
    private readonly submitButton = this.page.locator('input[type="submit"]');
    private readonly errors = this.page.locator("ul li");

    private readonly getInputElement = (
        formElement: AppFormElements
    ): Locator => this.page.locator(`input[name='${formElement}']`);

    async submitApplicationForm(
        user: User,
        options?: { optionalFields: boolean; resolveCaptcha: boolean }
    ) {
        if (!options) {
            options = { optionalFields: true, resolveCaptcha: true };
        }

        await this.enterFirstName(user.FirstName);
        await this.enterLastName(user.LastName);
        await this.enterEmail(user.Email);
        await this.enterPassword(user.Password);
        await this.confirmPassword(user.PasswordConfirm);

        if (options.optionalFields) {
            await this.uploadAvatar(user.Avatar);
        }
        if (options.resolveCaptcha) {
            await this.resolveCaptcha();
        }

        await this.clickSubmit();
    }

    async checkSuccessfulSubmit() {
        await this.checkSuccessfulLoad();
    }

    getErrorMessageLocator() {
        return this.errors.first();
    }

    async getFieldValidation(element: AppFormElements) {
        return await this.getInputElement(element).evaluate(
            (e: HTMLInputElement) => e.validationMessage
        );
    }

    async getSliderText() {
        return await this.slider.textContent();
    }

    private async enterFirstName(firstName: string) {
        await this.getInputElement(AppFormElements.FirstName).fill(firstName);
    }

    private async enterLastName(lastName: string) {
        await this.getInputElement(AppFormElements.LastName).fill(lastName);
    }

    private async enterEmail(email: string) {
        await this.getInputElement(AppFormElements.Email).fill(email);
    }

    private async enterPassword(password: string) {
        await this.getInputElement(AppFormElements.Password).fill(password);
    }

    private async confirmPassword(password: string) {
        await this.getInputElement(AppFormElements.PasswordConfirm).fill(
            password
        );
    }

    private async uploadAvatar(avatar: Avatar) {
        if (!avatar) return;
        await this.getInputElement(AppFormElements.Avatar).setInputFiles(
            avatar.UploadFrom
        );
    }

    private async resolveCaptcha() {
        const trackBox = await this.sliderTrack.boundingBox();

        await this.slider.dragTo(this.sliderTrack, {
            targetPosition: {
                x: trackBox!.width - 10,
                y: trackBox!.height / 2
            }
        });
    }

    private async clickSubmit() {
        await this.submitButton.click();
    }
}
