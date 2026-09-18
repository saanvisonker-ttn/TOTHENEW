import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const username = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;
const runCloud = process.env.CLOUD === 'true';
const mobileMode = process.env.MOBILE;
const visualDebug = process.env.VISUAL_DEBUG === 'true';
const isHeaded = process.env.HEADED === 'true';

if (runCloud && (!username || !accessKey)) {
  throw new Error('Set LT_USERNAME and LT_ACCESS_KEY in .env before running cloud tests (CLOUD=true).');
}

const baseURL = process.env.BASE_URL ?? 'https://www.tothenew.com/';
const buildName = process.env.LT_BUILD_NAME ?? 'TOTHENEW Playwright Build';
const projectName = process.env.LT_PROJECT_NAME ?? 'TOTHENEW Playwright Project';

const resolutions = {
  desktop: '1920x1080',
  laptop: '1440x900',
  standard: '1280x720',
  tabletLandscape: '1024x768',
  tabletPortrait: '768x1024',
  mobileLarge: '390x844',
  mobileMedium: '375x812',
  mobileSmall: '360x800'
} as const;

type LambdaTestDesktopBrowser = {
  name: string;
  lambdaBrowserName: string;
  playwrightBrowserName: 'chromium' | 'firefox' | 'webkit';
  browserVersion: string;
  os: string;
  osVersion: string;
  resolution: string;
};

const cloudBrowsers: LambdaTestDesktopBrowser[] = [
  {
    name: 'chrome',
    lambdaBrowserName: 'chrome',
    playwrightBrowserName: 'chromium',
    browserVersion: 'latest',
    os: 'Windows',
    osVersion: '11',
    resolution: resolutions.desktop
  },
  {
    name: 'firefox',
    lambdaBrowserName: 'pw-firefox',
    playwrightBrowserName: 'firefox',
    browserVersion: 'latest',
    os: 'Windows',
    osVersion: '11',
    resolution: resolutions.desktop
  },
  {
    name: 'safari',
    lambdaBrowserName: 'pw-webkit',
    playwrightBrowserName: 'webkit',
    browserVersion: 'latest',
    os: 'macOS',
    osVersion: 'Sonoma',
    resolution: resolutions.desktop
  }
];

function lambdaTestEndpoint(browser: LambdaTestDesktopBrowser) {
  const ltOptions: Record<string, string | boolean> = {
    username: username!,
    accessKey: accessKey!,
    build: buildName,
    name: `${projectName} - ${browser.name}`,
    project: projectName,
    resolution: browser.resolution,
    video: true,
    network: false,
    console: true,
    visual: false,
    w3c: true,
    plugin: 'Playwright'
  };

  const capabilities = {
    browserName: browser.lambdaBrowserName,
    browserVersion: browser.browserVersion,
    platformName: `${browser.os} ${browser.osVersion}`,
    'LT:Options': ltOptions
  };

  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
}

const localTrace = visualDebug ? ('on' as const) : ('retain-on-failure' as const);
const localScreenshot = visualDebug ? ('on' as const) : ('only-on-failure' as const);
const localVideo = visualDebug ? ('on' as const) : ('off' as const);

const localChromeProject = {
  name: 'local-chrome',
  use: {
    ...devices['Desktop Chrome'],
    channel: 'chrome' as const,
    headless: !isHeaded,
    launchOptions: {
      slowMo: visualDebug ? 350 : 0
    },
    trace: localTrace,
    screenshot: localScreenshot,
    video: localVideo
  }
};

const localMobileProjects = [
  { name: 'local-iphone', device: devices['iPhone 15'] },
  { name: 'local-android', device: devices['Pixel 7'] },
  { name: 'local-ipad', device: devices['iPad Pro 11'] }
].map(({ name, device }) => ({
  name,
  timeout: 90_000,
  use: {
    ...device,
    browserName: 'chromium' as const,
    channel: 'chrome' as const,
    headless: !isHeaded,
    launchOptions: {
      slowMo: visualDebug ? 350 : 0
    },
    trace: localTrace,
    screenshot: localScreenshot,
    video: localVideo
  }
}));

const cloudProjects = cloudBrowsers.map((browser) => ({
  name: browser.name,
  use: {
    browserName: browser.playwrightBrowserName,
    connectOptions: { wsEndpoint: lambdaTestEndpoint(browser) }
  }
}));

function localProjects() {
  if (mobileMode === 'true') {
    return localMobileProjects;
  }

  if (mobileMode === 'all') {
    return [localChromeProject, ...localMobileProjects];
  }

  return [localChromeProject];
}

export default defineConfig({
  testDir: './tests',
  globalSetup: runCloud ? './tests/global-setup.ts' : undefined,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : runCloud ? 1 : 0,
  maxFailures: runCloud ? 1 : undefined,
  workers: 1,
  timeout: runCloud ? 90_000 : 60_000,
  reporter: [
    ['html', { open: 'never' }],
    ['line']
  ],
  use: {
    baseURL,
    actionTimeout: runCloud ? 30_000 : 15_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: runCloud ? cloudProjects : localProjects()
});
