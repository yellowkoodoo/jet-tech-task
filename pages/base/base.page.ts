import { Page } from "@playwright/test";

export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("/");
        await this.checkSuccessfulLoad();
    }

    async checkSuccessfulLoad() {
        await this.waitForPageResponse();
        await this.waitForLoadState();
    }

    async getPageTitle() {
        await this.page.title();
    }

    protected async waitForLoadState() {
        await this.page.waitForLoadState("load");
        await this.page.waitForLoadState("networkidle");
    }

    protected async waitForPageResponse() {
        this.page.on("response", async (response) => {
            if (response.url().includes("") && response.status() === 200) {
            } else {
                throw new Error(
                    `Page response: ${response.status()} ${response.statusText()}`
                );
            }
        });
    }
}
