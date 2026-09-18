import { test, expect } from './fixtures/visualTest';
import { Header } from './Pages/header';
import {
    headerDirectButtons,
    headerMenuButtons,
    SEARCH_QUERY,
    STABLE_ENTRY_PATH
} from './constants/navigation';
import { isMobileProject } from './utils/project';

test.describe('TO THE NEW Header Tests', () => {
    let header: Header;

    test.beforeEach(async ({ page, visualStep }) => {
        header = new Header(page);
        await visualStep(`Open landing page: ${STABLE_ENTRY_PATH}`);
        await header.goto(STABLE_ENTRY_PATH);
        await visualStep('Landing page loaded');
    });

    test('Verify header buttons are visible on the landing page', async ({ visualStep }, testInfo) => {
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

    for (const button of headerMenuButtons) {
        test(`Header - ${button.label} opens its menu or panel`, async ({ visualStep }, testInfo) => {
            test.skip(isMobileProject(testInfo.project.name), 'Desktop megamenu is unavailable in the mobile header layout.');
            await visualStep(`Click header button: ${button.label}`);

            if (button.label === 'Who we are') {
                await header.clickWhoWeAre();
                await visualStep('Verify Who we are menu is open');
                await header.expectWhoWeAreMenuOpen();
            } else if (button.label === 'What we do') {
                await header.clickWhatWeDo();
                await visualStep('Verify What we do menu is open');
                await header.expectWhatWeDoMenuOpen();
            } else {
                await header.clickInfAIniteGPT();
                await visualStep('Verify InfAInite GPT panel is open');
                await header.expectInfAIniteGPTPanelOpen();
            }
        });
    }

    test('Verify InfAInite GPT search functionality', async ({ visualStep }, testInfo) => {
        test.skip(isMobileProject(testInfo.project.name), 'InfAInite GPT is unavailable in the mobile header layout.');
        await visualStep(`Submit InfAInite GPT search query: ${SEARCH_QUERY}`);
        await header.gptSearchAndSubmit(SEARCH_QUERY);
        await visualStep('Verify InfAInite GPT search results are displayed');
        await header.expectGptSearchResultsFor(SEARCH_QUERY);
    });

    test('Verify site search functionality', async ({ visualStep }) => {
        await visualStep(`Submit site search query: ${SEARCH_QUERY}`);
        await header.siteSearchAndSubmit(SEARCH_QUERY);
        await visualStep('Verify site search results page opens');
        await header.expectSiteSearchResultsFor(SEARCH_QUERY);
    });

    for (const button of headerDirectButtons) {
        test(`Header - ${button.label} opens the correct page`, async ({ page, visualStep }, testInfo) => {
            test.skip(
                isMobileProject(testInfo.project.name) && button.label === 'Careers',
                'Careers is unavailable in the mobile header layout.'
            );
            await visualStep(`Click header button: ${button.label}`);

            if (button.label === 'Contact us') {
                await header.clickContactUs();
            } else {
                await header.clickCareers();
            }

            await visualStep(`Verify ${button.label} navigation`);
            await expect(page).toHaveURL(button.urlPattern);
        });
    }
});
