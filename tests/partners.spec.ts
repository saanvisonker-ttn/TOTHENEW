import { test } from './fixtures/visualTest';
import { Partner } from './Pages/partner';
import { Header } from './Pages/header';
import { STABLE_ENTRY_PATH } from './constants/navigation';

test.describe('Partners page Tests', () => {
    let partner: Partner;
    let header: Header;

    test.beforeEach(async ({ page, visualStep }) => {
        partner = new Partner(page);
        header = new Header(page);

        await visualStep('Open landing page');
        await header.goto(STABLE_ENTRY_PATH);
        await visualStep('Navigate to Partners from header');
        await header.clickPartners();
        await partner.expectPartnersPageLoaded();
        await visualStep('Partners page is loaded');
    });

    test('Verify breadcrumbs are visible', async ({ visualStep }) => {
        await visualStep('Checking breadcrumbs are visible');
        await partner.expectBreadcrumbsVisible();
        await visualStep('Breadcrumbs are visible');
    });

    test('Verify banner section', async ({ visualStep }) => {
        await visualStep('Checking Partners banner section');
        await partner.expectBannerSectionVisible();
        await visualStep('Partners banner section is visible');
    });

    test('Verify banner CTA navigates to contact us', async ({ visualStep }) => {
        await visualStep('Clicking banner Talk to our experts CTA');
        await partner.expectBannerCtaNavigation();
        await visualStep('Banner CTA navigated to contact us');
    });

    test('Verify category strip menu is visible', async ({ visualStep }) => {
        await visualStep('Checking Partners category strip links');
        await partner.expectCategoryStripVisible();
        await visualStep('Category strip menu is visible');
    });

    test('Verify impact section', async ({ visualStep }) => {
        await visualStep('Checking impact heading, description, and highlights');
        await partner.expectImpactSectionVisible();
        await visualStep('Impact section is visible');
    });

    test('Verify strategic partners heading and category toggles', async ({ visualStep }) => {
        await visualStep('Checking strategic partners heading');
        await partner.expectStrategicPartnersHeadingVisible();
        await visualStep('Checking category toggle buttons');
        await partner.expectCategoryTogglesVisible();
        await visualStep('Strategic partners heading and toggles are visible');
    });

    test('Verify toggle button expand and collapse functionality', async ({ visualStep }) => {
        test.setTimeout(90_000);

        await visualStep('Expanding and collapsing each strategic partner category toggle');
        await partner.expectToggleButtonFunctionality();
        await visualStep('All category toggles expand and collapse correctly');
    });

    test('Verify Cloud partners category content', async ({ visualStep }) => {
        await visualStep('Checking Cloud partners cards, descriptions, and CTAs');
        await partner.expectStrategicCategoryContent('tab-1');
        await visualStep('Cloud partners category content is verified');
    });

    test('Verify Data ecosystem category content', async ({ visualStep }) => {
        await visualStep('Checking Data ecosystem cards, descriptions, and CTAs');
        await partner.expectStrategicCategoryContent('tab-2');
        await visualStep('Data ecosystem category content is verified');
    });

    test('Verify Customer experience platforms category content', async ({ visualStep }) => {
        await visualStep('Checking Customer experience platforms cards and descriptions');
        await partner.expectStrategicCategoryContent('tab-3');
        await visualStep('Customer experience platforms category content is verified');
    });

    test('Verify Media technology partners category content', async ({ visualStep }) => {
        await visualStep('Checking Media technology partners cards and descriptions');
        await partner.expectStrategicCategoryContent('tab-4');
        await visualStep('Media technology partners category content is verified');
    });

    test('Verify strip link scrolls to Cloud partners category', async ({ visualStep }) => {
        await visualStep('Clicking Cloud partners strip link');
        await partner.expectStripLinkScrollsToCategory('tab-1');
        await visualStep('Strip link scrolled to Cloud partners category');
    });

    test('Verify What we build section', async ({ visualStep }) => {
        await visualStep('Checking What we build heading and items');
        await partner.expectWhatWeBuildSectionVisible();
        await visualStep('What we build section is visible');
    });

    test('Verify End CTA section', async ({ visualStep }) => {
        await visualStep('Checking End CTA heading, description, and buttons');
        await partner.expectEndCtaSectionVisible();
        await visualStep('End CTA section is visible');
    });

    test('Verify End CTA Talk to our experts navigation', async ({ visualStep }) => {
        await visualStep('Clicking End CTA Talk to our experts');
        await partner.expectEndCtaTalkToExpertsNavigation();
        await visualStep('End CTA navigated to contact us');
    });
});
