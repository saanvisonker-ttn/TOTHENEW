# TOTHENEW Playwright + LambdaTest

Minimal Playwright and TypeScript framework for running your own tests against `https://www.tothenew.com/` on LambdaTest cloud browsers.

## 1. Install

```bash
npm install
npx playwright install
```

The `dotenv` package loads local values from `.env`.

## 2. Configure `.env`

Copy the example file:

```powershell
Copy-Item .env.example .env
```

Open `.env` and replace the placeholders:

```text
LT_USERNAME=your_lambdatest_username
LT_ACCESS_KEY=your_lambdatest_access_key
```

Get these values from your LambdaTest account. Never commit `.env`; it is ignored by Git. `BASE_URL`, `LT_BUILD_NAME`, and `LT_PROJECT_NAME` can also be changed there.

## 3. LambdaTest connection

[`playwright.config.ts`](playwright.config.ts) reads `LT_USERNAME` and `LT_ACCESS_KEY`, builds LambdaTest capabilities, and encodes them into the LambdaTest Playwright WebSocket endpoint. Playwright Test uses `connectOptions.wsEndpoint` to connect each project to a remote LambdaTest browser.

The capabilities are kept together in the `browsers` array and include browser, browser version, operating system, OS version through `platformName`, build, project, test name, and resolution. Change the resolution in that array or select another value from `resolutions` when you are ready to run different sizes.

Configured browser examples:

- Chrome on Windows 11
- Firefox on Windows 11
- Safari on macOS Sonoma

The same single test file is executed by the three browser projects. No page objects, utilities, responsive tests, visual tests, or application-specific logic are included.

## 4. Write and run a test

Add your tests under `tests/`. Use the configured `baseURL` like this:

```ts
import { test, expect } from '@playwright/test';

test('LambdaTest connection test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/TO THE NEW/i);
});
```

Run all configured browsers:

```bash
npm test
```

To see the currently running test name in the terminal:

```bash
npm run test:live
```

Use the LambdaTest Automation dashboard to watch the remote browser session and its live execution details. `--headed` does not open a local browser window because the browser runs in LambdaTest.

Run one browser project:

```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

The `--headed` option is not useful for a remote LambdaTest session, because the browser runs in the cloud.

## 5. Verify LambdaTest execution

1. Run `npm test` with valid credentials.
2. Confirm the terminal reports passing tests for the `chrome`, `firefox`, and `safari` projects.
3. Open the LambdaTest Automation dashboard.
4. Find the build named `TOTHENEW Playwright Build` or the value of `LT_BUILD_NAME`.
5. Open a session and verify its browser, operating system, resolution, test name, video, and console details.

HTML reports are generated locally and can be opened with:

```bash
npm run report
```

Type-check the framework with:

```bash
npm run check
```
