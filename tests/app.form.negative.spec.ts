import { test, expect } from "../utils/fixtures/appFixture";
import { PictureType, User } from "../types/user";
import {
    generateUserData,
    generatePassword,
    generateUserDataRequired,
    generateFile,
    removeFile
} from "../utils/data/user.data.factory";
import AppConstants from "../utils/data/constants";
import { AppFormElements } from "../pages/form.page";
import { faker } from "@faker-js/faker";

test.describe("Application form | Negative tests", () => {
    test.beforeEach(async ({ app }) => {
        await app.appForm.navigate();
    });

    const error_ValueMissing = `Please fill out this field.`;
    const error_PasswordsMismatch = "Passwords do not match!";

    test("Passwords | Mismatch (Required fields)", async ({ app }) => {
        const user: User = generateUserDataRequired();
        user.Password = generatePassword({
            length: AppConstants.password_MinLength
        });
        user.PasswordConfirm = generatePassword({
            length: AppConstants.password_MinLength + 1
        });

        await app.appForm.submitApplicationForm(user, {
            optionalFields: false,
            resolveCaptcha: true
        });

        await expect(await app.appForm.getErrorMessageLocator()).toContainText(
            error_PasswordsMismatch
        );
    });

    test("Passwords | Mismatch (Optional fields)", async ({ app }) => {
        const user: User = generateUserData();
        user.Password = generatePassword({
            length: AppConstants.password_MinLength
        });
        user.PasswordConfirm = generatePassword({
            length: AppConstants.password_MinLength + 1
        });

        await app.appForm.submitApplicationForm(user);

        await expect(await app.appForm.getErrorMessageLocator()).toContainText(
            error_PasswordsMismatch
        );
    });

    test("Passwords | Minimum length", async ({ app }) => {
        const user: User = generateUserData();
        user.Password = generatePassword({
            length: AppConstants.password_MinLength - 1
        });
        user.PasswordConfirm = user.Password;

        const error_MinLength = `Password must be at least ${AppConstants.password_MinLength} characters long!`;

        await app.appForm.submitApplicationForm(user, {
            optionalFields: false,
            resolveCaptcha: true
        });

        await expect(await app.appForm.getErrorMessageLocator()).toContainText(
            error_MinLength
        );
    });

    test("Passwords | Forbidden characters", async ({ app }) => {
        const user: User = generateUserData();
        user.Password = user.Password + "<";
        user.PasswordConfirm = user.Password;

        const error_ForbiddenCharacters = `TBD: Password must not contain forbidden characters`;

        await app.appForm.submitApplicationForm(user, {
            optionalFields: false,
            resolveCaptcha: true
        });

        await expect(await app.appForm.getErrorMessageLocator()).toContainText(
            error_ForbiddenCharacters
        );
    });

    test("Email | Invalid Email format | @ missing", async ({ app }) => {
        const user: User = generateUserDataRequired();
        user.Email = faker.word.noun();

        const message = `Please include an '@' in the email address. '${user.Email}' is missing an '@'.`;

        await app.appForm.submitApplicationForm(user);

        const actualValidation = await app.appForm.getFieldValidation(
            AppFormElements.Email
        );
        await expect(actualValidation).toStrictEqual(message);
    });

    test("Email | Invalid Email format | Incomplete email", async ({ app }) => {
        const user: User = generateUserDataRequired();
        user.Email = faker.word.noun() + "@";

        const message = `Please enter a part following '@'. '${user.Email}' is incomplete.`;

        await app.appForm.submitApplicationForm(user);

        const actualValidation = await app.appForm.getFieldValidation(
            AppFormElements.Email
        );
        await expect(actualValidation).toStrictEqual(message);
    });

    test("First Name | Value is missing", async ({ app }) => {
        const user: User = generateUserDataRequired();
        user.FirstName = "";

        await app.appForm.submitApplicationForm(user);

        const actualValidation = await app.appForm.getFieldValidation(
            AppFormElements.FirstName
        );
        await expect(actualValidation).toStrictEqual(error_ValueMissing);
    });

    test("Last Name | Value is missing", async ({ app }) => {
        const user: User = generateUserDataRequired();
        user.LastName = "";

        await app.appForm.submitApplicationForm(user);

        const actualValidation = await app.appForm.getFieldValidation(
            AppFormElements.LastName
        );
        await expect(actualValidation).toStrictEqual(error_ValueMissing);
    });

    test("Captcha | Not solved", async ({ app }) => {
        const user: User = generateUserDataRequired();

        const error_Captcha = "Please solve the captcha!";

        await app.appForm.submitApplicationForm(user, {
            optionalFields: false,
            resolveCaptcha: false
        });

        await expect(await app.appForm.getErrorMessageLocator()).toContainText(
            error_Captcha
        );
    });

    test("Avatar | Unsupported file type (.js)", async ({ app }) => {
        const user: User = generateUserData();
        user.Avatar.UploadFrom = user.Avatar.UploadFrom.replace(
            /\.[^/.]+$/,
            ".js"
        );

        const error_FileType = "Unsupported file type";

        await app.appForm.submitApplicationForm(user);

        await expect(await app.appForm.getErrorMessageLocator()).toContainText(
            error_FileType
        );
    });

    test("Avatar | File size exceeds the limit of 2 mb", async ({ app }) => {
        const user: User = generateUserData();
        user.Avatar.UploadFrom = generateFile({
            picture: PictureType.jpeg,
            sizeMb: 3
        });

        const error_FileSize = "File exceeds allowed size";

        try {
            await app.appForm.submitApplicationForm(user);

            await expect(
                await app.appForm.getErrorMessageLocator()
            ).toContainText(error_FileSize);
        } finally {
            await removeFile(user.Avatar.UploadFrom);
        }
    });
});
