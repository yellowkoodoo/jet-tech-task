import { faker } from "@faker-js/faker";
import { User, Gender, PictureType } from "../../types/user";
import { fileURLToPath } from "url";
import path from "path";
import { writeFileSync, promises as fs } from "fs";
import AppConstants from "../data/constants";

// current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateUserDataRequired(options?: { gender: Gender }) {
    if (!options) {
        options = {
            gender: faker.helpers.arrayElement([Gender.Male, Gender.Female])
        };
    }

    const password = generatePassword({
        length: AppConstants.password_MinLength
    });

    const user: User = {
        FirstName: generateFirstName(options.gender),
        LastName: generateLastName(options.gender),
        Email: generateEmail(),
        Password: password,
        PasswordConfirm: password
    };

    return user;
}

export function generateUserData(options?: { gender: Gender }) {
    const user = generateUserDataRequired(options);
    user.Avatar = { UploadFrom: getAvatar() };

    return user;
}

export function generateFirstName(gender: Gender, length?: number) {
    if (gender === Gender.Other || length) {
        return faker.word.noun({ length });
    }
    return faker.person.firstName();
}

export function generateLastName(gender: Gender, length?: number) {
    if (gender === Gender.Other || length) {
        return faker.word.adverb({ length });
    }
    return faker.person.lastName();
}

export function generateEmail(options?: { user: User; provider: string }) {
    return faker.internet.email(
        options && {
            firstName: options.user.FirstName,
            lastName: options.user.LastName,
            provider: options.provider
        }
    );
}

export function generatePassword(options?: { length: number }) {
    return faker.internet.password(
        options && {
            length: options.length
        }
    );
}

export function getAvatar(options?: { picture: PictureType }) {
    if (!options) {
        options = {
            picture: faker.helpers.arrayElement([
                PictureType.jpg,
                PictureType.jpeg,
                PictureType.png,
                PictureType.gif,
                PictureType.bmp
            ])
        };
    }

    return path.join(
        __dirname,
        "..",
        "..",
        "resources",
        "user",
        `avatar.${PictureType[options?.picture]}`
    );
}

export function generateFile(options: {
    picture: PictureType;
    sizeMb: number;
}) {
    const targetSizeInBytes = options.sizeMb * 1024 * 1024;

    let content = "";
    while (Buffer.byteLength(content, "utf8") < targetSizeInBytes) {
        content += faker.lorem.paragraphs(5) + "\n";
    }

    const filePath = path.join(
        __dirname,
        "..",
        "..",
        "tests",
        "artifacts",
        `fileOf_${options.sizeMb}Mb.${PictureType[options.picture]}`
    );
    writeFileSync(filePath, content);

    return filePath;
}

export async function removeFile(filePath: string) {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error("Failed to remove file: ", error);
    }
}
