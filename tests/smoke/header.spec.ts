import { test, expect } from '../fixtures/visualTest';
import { Header } from '../Pages/header';
import { STABLE_ENTRY_PATH } from '../constants/navigation';
import { isMobileProject } from '../utils/project';

test.describe('TO THE NEW Header Tests', () => {
    let header: Header;

    test.beforeEach(async ({ page, visualStep }) => {
        header = new Header(page);
        await visualStep(`Open landing page: ${STABLE_ENTRY_PATH}`);
        await header.goto(STABLE_ENTRY_PATH);
        await visualStep('Landing page loaded');
    });

    test('Verify header buttons are visible', async ({ visualStep }, testInfo) => {
        const mobile = isMobileProject(testInfo.project.name);

        await visualStep('Checking header buttons are visible');
        await expect(header.logo).toBeVisible();
        await expect(header.contactUs).toBeVisible();

        if (mobile) {
            await expect(header.siteSearchToggle).toBeVisible();
            await visualStep('Mobile header essentials are visible');
            return;
        }

        await expect(header.whoWeAre).toBeVisible();
        await expect(header.whatWeDo).toBeVisible();
        await expect(header.infAIniteGPT).toBeVisible();
        await expect(header.careers).toBeVisible();
        await expect(header.siteSearchToggle).toBeVisible();
        await visualStep('All header buttons are visible');
    });
    
});
