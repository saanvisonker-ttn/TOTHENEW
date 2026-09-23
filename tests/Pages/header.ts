import { Locator, Page, expect } from '@playwright/test';
import { STABLE_ENTRY_PATH } from '../constants/navigation';

export class Header {
    private readonly page: Page;
    private readonly siteHeader: Locator;
    readonly logo: Locator;
    readonly whoWeAre: Locator;
    readonly whatWeDo: Locator;
    readonly infAIniteGPT: Locator;
    readonly infAIniteSearchInput: Locator;
    readonly careers: Locator;
    readonly siteSearchToggle: Locator;
    readonly siteSearchInput: Locator;
    readonly contactUs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.siteHeader = page.getByRole('banner', { name: 'Site header' });
        this.logo = this.siteHeader.locator('a.site-logo');
        this.whoWeAre = this.siteHeader.getByRole('link', { name: 'Who we are', exact: true });
        this.whatWeDo = this.siteHeader.getByRole('link', { name: 'What we do', exact: true });
        this.infAIniteGPT = this.siteHeader.getByRole('link', { name: 'InfAInite GPT', exact: true });
        this.careers = this.siteHeader.getByRole('link', { name: 'Careers', exact: true });
        this.infAIniteSearchInput = this.siteHeader.getByRole('searchbox', { name: 'Ask anything ?' });
        this.siteSearchToggle = this.siteHeader.locator('a.search-icon');
        this.siteSearchInput = this.page.getByPlaceholder('Enter search term');
        this.contactUs = this.siteHeader.locator('#h-contact-us');
    }

    async goto(path: string = STABLE_ENTRY_PATH) {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    }

    async clickLogo() {
        await this.logo.click();
    }

    async clickWhoWeAre() {
        await this.whoWeAre.click();
    }

    async clickWhatWeDo() {
        await this.whatWeDo.click();
    }

    async clickInfAIniteGPT() {
        await this.infAIniteGPT.click();
    }

    async openSiteSearch() {
        await this.siteSearchToggle.click();
        await expect(this.siteSearchInput).toBeVisible();
    }

    async siteSearchAndSubmit(query: string) {
        await this.openSiteSearch();
        await this.siteSearchInput.fill(query);
        await this.siteSearchInput.press('Enter');
    }

    async expectSiteSearchResultsFor(query: string) {
        await expect(this.page).toHaveURL(new RegExp(`/search\\?search_keyword=${query}`, 'i'));
    }

    async gptSearchAndSubmit(query: string) {
        await this.clickInfAIniteGPT();
        await this.expectInfAIniteGPTPanelOpen();

        const searchInput = this.page.getByRole('searchbox', { name: /Ask anything/i }).last();
        await searchInput.fill(query);
        await searchInput.press('Enter');
    }

    async expectGptSearchResultsFor(query: string) {
        await expect(this.page.getByText(new RegExp(query, 'i')).first()).toBeVisible();
    }

    async openWhoWeAreMenu() {
        await this.whoWeAre.click();
        await this.expectWhoWeAreMenuOpen();
    }

    async openWhatWeDoMenu() {
        await this.whatWeDo.click();
        await this.expectWhatWeDoMenuOpen();
    }

    async openInfAIniteGPTMenu() {
        await this.infAIniteGPT.click();
        await this.expectInfAIniteGPTPanelOpen();
    }

    async expectWhoWeAreMenuOpen() {
        await expect(
            this.siteHeader.getByRole('link', { name: 'About TO THE NEW', exact: true })
        ).toBeVisible();
    }

    async expectWhatWeDoMenuOpen() {
        await expect(
            this.siteHeader.getByRole('link', { name: 'Services', exact: true })
        ).toBeVisible();
    }

    async expectInfAIniteGPTPanelOpen() {
        await expect(this.infAIniteSearchInput).toBeVisible();
    }

    async clickCareers() {
        await this.careers.click();
    }

    async clickContactUs() {
        await this.contactUs.click();
    }

    async clickAboutUs() {
        const isDesktopNavVisible = await this.whoWeAre.isVisible();

        if (!isDesktopNavVisible) {
            await this.page.goto('/about-us', { waitUntil: 'domcontentloaded', timeout: 60_000 });
            return;
        }

        await this.openWhoWeAreMenu();

        const link = this.siteHeader.locator('nav a[href="/about-us"]').first();
        await link.waitFor({ state: 'visible' });
        await Promise.all([
            this.page.waitForURL('**/about-us**'),
            link.evaluate((element) => (element as HTMLAnchorElement).click())
        ]);
    }

    async clickLeadership() {
        const isDesktopNavVisible = await this.whoWeAre.isVisible();

        if (!isDesktopNavVisible) {
            await this.page.goto('/leadership', { waitUntil: 'domcontentloaded', timeout: 60_000 });
            return;
        }

        await this.openWhoWeAreMenu();

        const link = this.siteHeader.locator('nav a[href="/leadership"]').first();
        await link.waitFor({ state: 'visible' });
        await Promise.all([
            this.page.waitForURL('**/leadership**'),
            link.evaluate((element) => (element as HTMLAnchorElement).click())
        ]);
    }

    async clickPartners() {
        const isDesktopNavVisible = await this.whoWeAre.isVisible();

        if (!isDesktopNavVisible) {
            await this.page.goto('/partners', { waitUntil: 'domcontentloaded', timeout: 60_000 });
            return;
        }

        await this.openWhoWeAreMenu();

        const link = this.siteHeader.locator('nav a[href="/partners"], nav a[href*="/partners"]').first();
        await link.waitFor({ state: 'visible' });
        await Promise.all([
            this.page.waitForURL('**/partners**'),
            link.evaluate((element) => (element as HTMLAnchorElement).click())
        ]);
    }
}
