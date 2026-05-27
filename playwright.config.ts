/// <reference types="node" />

// import type {} from 'node';
import { defineConfig } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "./tests",
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 0 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [["list"], ["html", { open: "never" }]],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    snapshotDir: "./tests/screenshots",
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        baseURL: "https://qa-task.redvike.rocks/",

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
        video: "off",
        screenshot: "on",
        launchOptions: { slowMo: 1000 },
        headless: process.env.CI ? true : false
    },

    expect: { timeout: 4000 },

    projects: [
        {
            name: "appForm",
            testMatch: "**/tests/**.spec.ts",
            workers: 2
        }
    ]
});
