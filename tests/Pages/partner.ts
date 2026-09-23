import { expect, Locator, Page } from '@playwright/test';
import { partnersContent } from '../constants/partnersContent';

type PartnerCategorySlug = 'cloud-partners' | 'data-ecosystem' | 'customer-experience' | 'media-technology';

type StrategicPartner = {
    name: string;
    description: string;
    cta?: { text: string };
};

type StrategicCategory = {
    slug: PartnerCategorySlug;
    tabId: string;
    name: string;
    description: string;
    partners: readonly StrategicPartner[];
};

const STRATEGIC_CATEGORIES: StrategicCategory[] = partnersContent.strategicPartners.categories.map(
    (category, index) => {
        const slugs: PartnerCategorySlug[] = [
            'cloud-partners',
            'data-ecosystem',
            'customer-experience',
            'media-technology'
        ];

        return {
            slug: slugs[index],
            tabId: `tab-${index + 1}`,
            name: category.name,
            description: category.description,
            partners: category.partners.map((partner) => ({
                name: partner.name,
                description: partner.description,
                cta: 'cta' in partner ? partner.cta : undefined
            }))
        };
    }
);

export class Partner {
    private readonly page: Page;
    readonly breadcrumbs: Locator;
    readonly bannerHeading: Locator;
    readonly bannerDescription: Locator;
    readonly bannerCtaButton: Locator;
    readonly menu: Locator;
    readonly menuCloudPartners: Locator;
    readonly menuDataEcoSystem: Locator;
    readonly menuCustomerExperiencePlatform: Locator;
    readonly menuMediaTechnologyPartners: Locator;
    readonly impactSection: Locator;
    readonly impactHeading: Locator;
    readonly impactDescription: Locator;
    readonly partnerHighlights: Locator;
    readonly strategicPartnersSection: Locator;
    readonly strategicPartnersHeading: Locator;
    readonly categoryTriggers: Locator;
    readonly whatWeBuildSection: Locator;
    readonly whatWeBuildHeading: Locator;
    readonly whatWeBuildItems: Locator;
    readonly endCtaSection: Locator;
    readonly endCtaHeading: Locator;
    readonly endCtaDescription: Locator;
    readonly endCtaButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.breadcrumbs = this.page.locator('#block-ttnd-breadcrumbs');
        this.bannerHeading = this.page.locator('.l0-banner-title');
        this.bannerDescription = this.page.locator('.l0-banner-description');
        this.bannerCtaButton = this.page
            .locator('.parent-banner')
            .getByRole('link', { name: partnersContent.banner.cta.text });
        this.menu = this.page.locator('.l0-strip-list .partners-strip-link');
        this.menuCloudPartners = this.page.locator('.partners-strip-link[href="#tab-1"]');
        this.menuDataEcoSystem = this.page.locator('.partners-strip-link[href="#tab-2"]');
        this.menuCustomerExperiencePlatform = this.page.locator('.partners-strip-link[href="#tab-3"]');
        this.menuMediaTechnologyPartners = this.page.locator('.partners-strip-link[href="#tab-4"]');
        this.impactSection = this.page.locator('.partner-impact');
        this.impactHeading = this.impactSection.locator('h2.heading');
        this.impactDescription = this.impactSection.locator('.partners-l0-text').first();
        this.partnerHighlights = this.impactSection.locator('.key-highlight-item');
        this.strategicPartnersSection = this.page.locator('.partners-strategic');
        this.strategicPartnersHeading = this.strategicPartnersSection.locator('#partners-strategic-heading');
        this.categoryTriggers = this.strategicPartnersSection.locator('.partners-strategic__category-trigger');
        this.whatWeBuildSection = this.page.locator('.partners-built-with');
        this.whatWeBuildHeading = this.whatWeBuildSection.locator('#partners-built-with-heading, h2').first();
        this.whatWeBuildItems = this.whatWeBuildSection.locator('.partners-built-with__card');
        this.endCtaSection = this.page.locator('.l0-talk-to-experts');
        this.endCtaHeading = this.endCtaSection.locator('.field--name-field-simple-body').first();
        this.endCtaDescription = this.endCtaSection.locator('.field--name-field-short-description').first();
        this.endCtaButtons = this.endCtaSection.locator('.talk-to-expert-cta a');
    }

    async goto() {
        await this.page.goto(partnersContent.url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    }

    async expectPartnersPageLoaded() {
        await expect(this.page).toHaveURL(partnersContent.urlPattern);
        await expect(this.bannerHeading).toBeVisible();
    }

    async expectBreadcrumbsVisible() {
        await expect(this.breadcrumbs).toBeAttached();
        await expect(this.breadcrumbs).toContainText(partnersContent.breadcrumbs.home);
        await expect(this.breadcrumbs).toContainText(partnersContent.breadcrumbs.partners);
    }

    async expectBannerSectionVisible() {
        await expect(this.bannerHeading).toBeVisible();
        await expect(this.bannerHeading).toContainText(partnersContent.banner.h1);
        await expect(this.bannerDescription).toBeVisible();
        await expect(this.bannerDescription).toContainText(partnersContent.banner.description);
        await expect(this.bannerCtaButton).toBeVisible();
        await expect(this.bannerCtaButton).toHaveText(partnersContent.banner.cta.text);
        await expect(this.bannerCtaButton).toHaveAttribute('href', partnersContent.banner.cta.href);
    }

    async expectBannerCtaNavigation() {
        await this.bannerCtaButton.scrollIntoViewIfNeeded();
        await Promise.all([
            this.page.waitForURL(partnersContent.banner.cta.href),
            this.bannerCtaButton.click()
        ]);
    }

    async expectCategoryStripVisible() {
        await this.menu.first().scrollIntoViewIfNeeded();
        await expect(this.menu).toHaveCount(4);
        await expect(this.menuCloudPartners).toBeVisible();
        await expect(this.menuCloudPartners).toContainText(/Cloud partners/i);
        await expect(this.menuDataEcoSystem).toBeVisible();
        await expect(this.menuDataEcoSystem).toContainText(/Data ecosystem/i);
        await expect(this.menuCustomerExperiencePlatform).toBeVisible();
        await expect(this.menuCustomerExperiencePlatform).toContainText(/Customer experience platforms/i);
        await expect(this.menuMediaTechnologyPartners).toBeVisible();
        await expect(this.menuMediaTechnologyPartners).toContainText(/Media technology partners/i);
    }

    async expectImpactSectionVisible() {
        await this.impactSection.scrollIntoViewIfNeeded();
        await expect(this.impactHeading).toBeVisible();
        await expect(this.impactHeading).toHaveText(partnersContent.impact.heading);
        await expect(this.impactDescription).toBeVisible();
        await expect(this.impactDescription).toContainText(partnersContent.impact.description);
        await expect(this.partnerHighlights).toHaveCount(partnersContent.impact.highlights.length);

        for (const highlight of partnersContent.impact.highlights) {
            await expect(this.impactSection).toContainText(highlight);
        }
    }

    async expectStrategicPartnersHeadingVisible() {
        await this.strategicPartnersHeading.scrollIntoViewIfNeeded();
        await expect(this.strategicPartnersHeading).toBeVisible();
        await expect(this.strategicPartnersHeading).toHaveText(partnersContent.strategicPartners.heading);
    }

    async expectCategoryTogglesVisible() {
        await this.categoryTriggers.first().scrollIntoViewIfNeeded();
        await expect(this.categoryTriggers).toHaveCount(STRATEGIC_CATEGORIES.length);

        for (const category of STRATEGIC_CATEGORIES) {
            const trigger = this.getCategoryTrigger(category.tabId);
            await expect(trigger).toBeVisible();
            await expect(trigger).toContainText(new RegExp(category.name, 'i'));
        }
    }

    async expectCategoryExpanded(tabId: string) {
        const category = this.getCategory(tabId);
        const trigger = this.getCategoryTrigger(tabId);
        const panel = this.getCategoryPanel(tabId);

        await expect(category).toHaveClass(/is-expanded/);
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        await expect(panel).toHaveAttribute('aria-hidden', 'false');
        await expect(panel).toBeVisible();
    }

    async expectCategoryCollapsed(tabId: string) {
        const category = this.getCategory(tabId);
        const trigger = this.getCategoryTrigger(tabId);
        const panel = this.getCategoryPanel(tabId);

        await expect(category).not.toHaveClass(/is-expanded/);
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        await expect(panel).toHaveAttribute('aria-hidden', 'true');
    }

    async toggleCategory(tabId: string) {
        const trigger = this.getCategoryTrigger(tabId);
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
    }

    async expandCategory(tabId: string) {
        const trigger = this.getCategoryTrigger(tabId);
        const expanded = await trigger.getAttribute('aria-expanded');

        if (expanded !== 'true') {
            await this.toggleCategory(tabId);
        }

        await this.expectCategoryExpanded(tabId);
    }

    async collapseCategory(tabId: string) {
        const trigger = this.getCategoryTrigger(tabId);
        const expanded = await trigger.getAttribute('aria-expanded');

        if (expanded === 'true') {
            await this.toggleCategory(tabId);
        }

        await this.expectCategoryCollapsed(tabId);
    }

    async expectToggleButtonFunctionality() {
        for (const category of STRATEGIC_CATEGORIES) {
            await this.expandCategory(category.tabId);
            await this.collapseCategory(category.tabId);
            await this.expandCategory(category.tabId);
        }
    }

    async expectStrategicCategoryContent(tabId: string) {
        const expected = STRATEGIC_CATEGORIES.find((category) => category.tabId === tabId);
        if (!expected) {
            throw new Error(`Unknown strategic partners tab: ${tabId}`);
        }

        await this.expandCategory(tabId);

        const category = this.getCategory(tabId);
        const panel = this.getCategoryPanel(tabId);
        const cards = panel.locator('.partners-strategic__card');

        await expect(category.locator('.partners-strategic__category-deck')).toContainText(expected.description);
        await expect(cards).toHaveCount(expected.partners.length);

        for (const partner of expected.partners) {
            const card = cards.filter({ hasText: partner.description });

            await expect(card, `Expected partner card for ${partner.name}`).toHaveCount(1);
            await card.scrollIntoViewIfNeeded();

            const logo = card.locator('img').first();
            await expect(logo).toBeAttached();
            await expect(logo).toHaveAttribute('src', /.+/);
            await expect(logo).toHaveAttribute('alt', new RegExp(partner.name, 'i'));
            await expect(card).toContainText(partner.description);

            if (partner.cta) {
                const cta = card.getByRole('link', { name: partner.cta.text });
                await expect(cta).toBeVisible();
                await expect(cta).toHaveAttribute('href', /.+/);
            }
        }
    }

    async expectAllStrategicCategoriesContent() {
        for (const category of STRATEGIC_CATEGORIES) {
            await this.expectStrategicCategoryContent(category.tabId);
        }
    }

    async expectStripLinkScrollsToCategory(tabId: string) {
        const stripLink = this.page.locator(`.partners-strip-link[href="#${tabId}"]`);
        const category = this.getCategory(tabId);

        await stripLink.scrollIntoViewIfNeeded();
        await stripLink.click();
        await expect(category).toBeInViewport();
        await this.expandCategory(tabId);
    }

    async expectWhatWeBuildSectionVisible() {
        await this.whatWeBuildSection.scrollIntoViewIfNeeded();
        await expect(this.whatWeBuildHeading).toBeVisible();
        await expect(this.whatWeBuildHeading).toHaveText(partnersContent.whatWeBuild.heading);
        await expect(this.whatWeBuildItems).toHaveCount(partnersContent.whatWeBuild.items.length);

        for (const item of partnersContent.whatWeBuild.items) {
            await expect(this.whatWeBuildItems.filter({ hasText: item })).toHaveCount(1);
        }
    }

    async expectEndCtaSectionVisible() {
        await this.endCtaSection.scrollIntoViewIfNeeded();
        await expect(this.endCtaHeading).toBeVisible();
        await expect(this.endCtaHeading).toContainText(/Looking to unlock more value from your/i);
        await expect(this.endCtaHeading).toContainText(/technology investments/i);
        await expect(this.endCtaDescription).toBeVisible();
        await expect(this.endCtaDescription).toContainText(partnersContent.endCta.description);
        await expect(this.endCtaButtons).toHaveCount(partnersContent.endCta.buttons.length);

        for (const button of partnersContent.endCta.buttons) {
            const link = this.endCtaButtons.filter({ hasText: button.text });
            await expect(link).toHaveCount(1);
            await expect(link).toHaveAttribute('href', button.href);
        }
    }

    async expectEndCtaTalkToExpertsNavigation() {
        const button = partnersContent.endCta.buttons[0];
        const link = this.endCtaButtons.filter({ hasText: button.text });

        await link.scrollIntoViewIfNeeded();
        await Promise.all([this.page.waitForURL(button.href), link.click()]);
    }

    private getCategory(tabId: string) {
        return this.strategicPartnersSection.locator(`#${tabId}`);
    }

    private getCategoryTrigger(tabId: string) {
        return this.getCategory(tabId).locator('.partners-strategic__category-trigger');
    }

    private getCategoryPanel(tabId: string) {
        const panelId = tabId.replace('tab-', 'partners-strategic-panel-');
        return this.getCategory(tabId).locator(`#${panelId}`);
    }
}
