import 'dotenv/config';
import { chromium } from '@playwright/test';

async function globalSetup() {
    if (process.env.CLOUD !== 'true') {
        return;
    }

    const username = process.env.LT_USERNAME;
    const accessKey = process.env.LT_ACCESS_KEY;

    if (!username || !accessKey) {
        throw new Error(
            'LambdaTest credentials missing. Set LT_USERNAME and LT_ACCESS_KEY in .env before running cloud tests.'
        );
    }

    const buildName = process.env.LT_BUILD_NAME ?? 'TOTHENEW Playwright Build';
    const projectName = process.env.LT_PROJECT_NAME ?? 'TOTHENEW Playwright Project';

    const capabilities = {
        browserName: 'chrome',
        browserVersion: 'latest',
        platformName: 'Windows 11',
        'LT:Options': {
            username,
            accessKey,
            build: buildName,
            name: `${projectName} - preflight`,
            project: projectName,
            resolution: '1920x1080',
            plugin: 'Playwright'
        }
    };

    const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;

    try {
        const browser = await chromium.connect({ wsEndpoint, timeout: 60_000 });
        await browser.close();
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        if (message.includes('Lifetime Minutes Exhausted')) {
            throw new Error(
                [
                    'LambdaTest desktop-automation minutes are exhausted on this account.',
                    'Cloud tests cannot start until minutes reset or the plan is upgraded.',
                    'Use local runs instead:',
                    '  npm test                  (desktop)',
                    '  npm run test:local:mobile (mobile viewports)',
                    '',
                    `LambdaTest response: ${message}`
                ].join('\n')
            );
        }

        if (message.includes('403 Forbidden') || message.includes('401')) {
            throw new Error(
                [
                    'LambdaTest rejected the connection (check LT_USERNAME / LT_ACCESS_KEY in .env).',
                    '',
                    `LambdaTest response: ${message}`
                ].join('\n')
            );
        }

        throw error;
    }
}

export default globalSetup;
