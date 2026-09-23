import { test } from './fixtures/visualTest';
import { Leadership } from './Pages/leadership';
import { Header } from './Pages/header';
import { STABLE_ENTRY_PATH } from './constants/navigation';

test.describe('Leadership page Tests', () => {
    let leadership: Leadership;
    let header: Header;

    test.beforeEach(async ({ page, visualStep }) => {
        leadership = new Leadership(page);
        header = new Header(page);

        await visualStep('Open landing page');
        await header.goto(STABLE_ENTRY_PATH);
        await visualStep('Navigate to Leadership from header');
        await header.clickLeadership();
        await leadership.expectLeadershipPageLoaded();
        await visualStep('Leadership page is loaded');
    });

    test('Verify banner section', async ({ visualStep }) => {
        await visualStep('Checking Leadership banner section');
        await leadership.expectBannerHeadingVisible();
        await leadership.expectBannerDescriptionVisible();
        await leadership.expectBannerImageVisible();
        await leadership.expectBreadcrumbsVisible();
        await visualStep('Leadership banner section is visible');
    });

    test('Verify section tabs are visible', async ({ visualStep }) => {
        await visualStep('Checking Leadership section tabs');
        await leadership.expectSectionTabsVisible();
        await visualStep('Leadership section tabs are visible');
    });

    test('Verify Management section leaders', async ({ visualStep }) => {
        await visualStep('Opening Management section');
        await leadership.openManagementSection();
        await visualStep('Checking Management leaders image, name, title, and LinkedIn');
        await leadership.expectManagementLeadersVisible();
        await visualStep('Management section leaders are verified');
    });

    test('Verify CoEs section leaders', async ({ visualStep }) => {
        await visualStep('Opening CoEs section');
        await leadership.openCoEsSection();
        await visualStep('Checking CoEs leaders image, name, title, and LinkedIn');
        await leadership.expectCoEsLeadersVisible();
        await visualStep('CoEs section leaders are verified');
    });

    test('Verify Sales section leaders', async ({ visualStep }) => {
        await visualStep('Opening Sales section');
        await leadership.openSalesSection();
        await visualStep('Checking Sales leaders image, name, title, and LinkedIn');
        await leadership.expectSalesLeadersVisible();
        await visualStep('Sales section leaders are verified');
    });

    test('Verify Enabling Functions section leaders', async ({ visualStep }) => {
        await visualStep('Opening Enabling Functions section');
        await leadership.openEnablingFunctionsSection();
        await visualStep('Checking Enabling Functions leaders image, name, title, and LinkedIn');
        await leadership.expectEnablingFunctionsLeadersVisible();
        await visualStep('Enabling Functions section leaders are verified');
    });

    test('Verify Board of Directors section leaders', async ({ visualStep }) => {
        await visualStep('Opening Board of Directors section');
        await leadership.openBoardOfDirectorsSection();
        await visualStep('Checking Board of Directors leaders image, name, title, and LinkedIn');
        await leadership.expectBoardOfDirectorsLeadersVisible();
        await visualStep('Board of Directors section leaders are verified');
    });
});
