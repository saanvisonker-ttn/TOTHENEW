import { test as base } from '@playwright/test';
import { showVisualStep } from '../utils/visualState';

type VisualStepFn = (label: string) => Promise<void>;

export const test = base.extend<{ visualStep: VisualStepFn }>({
    visualStep: async ({ page }, use, testInfo) => {
        let stepIndex = 0;

        const visualStep: VisualStepFn = async (label: string) => {
            stepIndex += 1;
            await showVisualStep(page, label, testInfo, stepIndex);
        };

        await visualStep(`START: ${testInfo.title}`);
        await use(visualStep);
        await visualStep(`END: ${testInfo.title}`);
    }
});

export { expect } from '@playwright/test';
