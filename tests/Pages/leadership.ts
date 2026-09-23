import { expect, Locator, Page } from '@playwright/test';

type LeadershipSectionSlug =
    | 'management'
    | 'coes'
    | 'sales'
    | 'enabling-functions'
    | 'board-of-directors';

type Leader = {
    name: string;
    title: string;
    linkedin: RegExp;
};

const MANAGEMENT_LEADERS: Leader[] = [
    {
        name: 'Narinder Kumar',
        title: 'Chief Executive Officer',
        linkedin: /linkedin\.com\/in\/narinderkumar/i
    },
    {
        name: 'Saurabh Das',
        title: 'Chief Operating Officer',
        linkedin: /linkedin\.com\/in\/saudas/i
    },
    {
        name: 'Ankur Tripathi',
        title: 'Business Head - M&E',
        linkedin: /linkedin\.com\/in\/ankur-tripathi/i
    },
    {
        name: 'Anurag Agrawal',
        title: 'Business Head - Americas',
        linkedin: /linkedin\.com\/in\/anuragagrawal15/i
    },
    {
        name: 'Divyanshu Bhushan',
        title: 'Business Head - India & SEA',
        linkedin: /linkedin\.com\/in\/divyanshu-bhushan/i
    },
    {
        name: 'Gayatri Deshpande',
        title: 'Business Head - Digital Marketing',
        linkedin: /linkedin\.com\/in\/gayatrideshpande1/i
    },
    {
        name: 'Sushil Jethaliya',
        title: 'Business Head - EMEA & ANZ',
        linkedin: /linkedin\.com\/in\/sushilj/i
    }
];

const COE_LEADERS: Leader[] = [
    {
        name: 'Ashish Singh Panwar',
        title: 'Head - Insurance',
        linkedin: /linkedin\.com\/in\/ashishpanwar/i
    },
    {
        name: 'Dipti Narang',
        title: 'Director - CX & Content',
        linkedin: /linkedin\.com\/in\/diptikhullar/i
    },
    {
        name: 'Jitender Punia',
        title: 'Principal Architect - Data Analytics',
        linkedin: /linkedin\.com\/in\/jitender-punia/i
    },
    {
        name: 'Vineet Kansal',
        title: 'VP - Quality Engineering',
        linkedin: /linkedin\.com\/in\/vineetkansal/i
    }
];

const SALES_LEADERS: Leader[] = [
    {
        name: 'Arthur Wozniak',
        title: 'Associate Director - Sales (Americas)',
        linkedin: /linkedin\.com\/in\/arthur-wozniak/i
    },
    {
        name: 'Ashutosh Bansal',
        title: 'Associate Director - Sales (Americas)',
        linkedin: /linkedin\.com\/in\/ashutosh-bansal/i
    },
    {
        name: 'Arpit Miglani',
        title: 'Partner Sales (India)',
        linkedin: /linkedin\.com\/in\/arpitmig/i
    },
    {
        name: 'Gurjot Singh',
        title: 'AVP - Sales (Digital Marketing)',
        linkedin: /linkedin\.com\/in\/gurjot-singh/i
    },
    {
        name: 'Inderjeet Singh Oberoi',
        title: 'AVP - Sales (ANZ)',
        linkedin: /linkedin\.com\/in\/inderjeet-oberoi/i
    },
    {
        name: 'Joshua Taweel',
        title: 'Associate Director - Sales (ANZ)',
        linkedin: /linkedin\.com\/in\/joshuataweel/i
    },
    {
        name: 'Penny Whitelaw',
        title: 'Director - Sales (ANZ)',
        linkedin: /linkedin\.com\/in\/penny-whitelaw/i
    },
    {
        name: 'Prabhpreet Kaur',
        title: 'Associate Director - Sales (India)',
        linkedin: /linkedin\.com\/in\/prabhpreet-kaur/i
    },
    {
        name: 'Sreenandh Sreekumar',
        title: 'Associate Director - Sales (EMEA)',
        linkedin: /linkedin\.com\/in\/sreenandhsreekumar/i
    },
    {
        name: 'Sandeep Sahu',
        title: 'AVP - Sales (EMEA)',
        linkedin: /linkedin\.com\/in\/sandeep-sahu/i
    }
];

const ENABLING_FUNCTIONS_LEADERS: Leader[] = [
    {
        name: 'Charu Balani',
        title: 'Head - Talent Acquisition',
        linkedin: /linkedin\.com\/in\/charu-balani/i
    },
    {
        name: 'Deepak Handuja',
        title: 'Head - Administration & IT',
        linkedin: /linkedin\.com\/in\/deepak-handuja/i
    },
    {
        name: 'Vinayak',
        title: 'Head - Marketing',
        linkedin: /linkedin\.com\/in\/vinayak-marketing/i
    },
    {
        name: 'Vishnu Kumar Gupta',
        title: 'Head - Finance',
        linkedin: /linkedin\.com\/in\/ca-vishnu-gupta/i
    }
];

const BOARD_OF_DIRECTORS_LEADERS: Leader[] = [
    {
        name: 'Deepak Mittal',
        title: 'Chairman & Director',
        linkedin: /linkedin\.com\/in\/mittaldeepak/i
    },
    {
        name: 'Narinder Kumar',
        title: 'Director & CEO',
        linkedin: /linkedin\.com\/in\/narinderkumar/i
    },
    {
        name: 'Raman Mittal',
        title: 'Director',
        linkedin: /linkedin\.com\/in\/mittalraman/i
    },
    {
        name: 'Satya Sheel Sharma',
        title: 'Director',
        linkedin: /linkedin\.com\/in\/satyasheelsharma/i
    }
];

export class Leadership {
    private readonly page: Page;
    readonly bannerHeading: Locator;
    readonly bannerDescription: Locator;
    readonly bannerImage: Locator;
    readonly breadcrumbs: Locator;
    readonly menuTabs: Locator;
    readonly menuManagement: Locator;
    readonly menuCoEs: Locator;
    readonly menuSales: Locator;
    readonly menuEnablingFunctions: Locator;
    readonly menuBoardOfDirectors: Locator;
    readonly managementPanel: Locator;
    readonly coesPanel: Locator;
    readonly salesPanel: Locator;
    readonly enablingFunctionsPanel: Locator;
    readonly boardOfDirectorsPanel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bannerHeading = this.page.locator('h1').first();
        this.bannerDescription = this.page.locator('.leadership-intro');
        this.bannerImage = this.page.locator('.banner img, .overlay img, .banner-sec img').first();
        this.breadcrumbs = this.page.locator('#block-ttnd-breadcrumbs');
        this.menuTabs = this.page.locator('.leadership-tab-filter .leadership-tab-link');
        this.menuManagement = this.page.locator('.leadership-tab-link[data-leadership-slug="management"]');
        this.menuCoEs = this.page.locator('.leadership-tab-link[data-leadership-slug="coes"]');
        this.menuSales = this.page.locator('.leadership-tab-link[data-leadership-slug="sales"]');
        this.menuEnablingFunctions = this.page.locator(
            '.leadership-tab-link[data-leadership-slug="enabling-functions"]'
        );
        this.menuBoardOfDirectors = this.page.locator(
            '.leadership-tab-link[data-leadership-slug="board-of-directors"]'
        );
        this.managementPanel = this.page.locator('[data-leadership-panel="management"]');
        this.coesPanel = this.page.locator('[data-leadership-panel="coes"]');
        this.salesPanel = this.page.locator('[data-leadership-panel="sales"]');
        this.enablingFunctionsPanel = this.page.locator('[data-leadership-panel="enabling-functions"]');
        this.boardOfDirectorsPanel = this.page.locator('[data-leadership-panel="board-of-directors"]');
    }

    async goto() {
        await this.page.goto('/leadership', { waitUntil: 'domcontentloaded', timeout: 60_000 });
    }

    async expectLeadershipPageLoaded() {
        await expect(this.page).toHaveURL(/\/leadership/i);
        await expect(this.bannerHeading).toBeVisible();
    }

    async expectBannerHeadingVisible() {
        await expect(this.bannerHeading).toBeVisible();
        await expect(this.bannerHeading).toHaveText(/Leadership/i);
    }

    async expectBannerDescriptionVisible() {
        await expect(this.bannerDescription).toBeVisible();
        await expect(this.bannerDescription).toContainText(
            'Meet the visionary leaders driving innovation, excellence, and growth at TO THE NEW'
        );
    }

    async expectBannerImageVisible() {
        await expect(this.bannerImage).toBeVisible();
    }

    async expectBreadcrumbsVisible() {
        await expect(this.breadcrumbs).toBeAttached();
        await expect(this.breadcrumbs).toContainText(/Home/i);
        await expect(this.breadcrumbs).toContainText(/leadership/i);
    }

    async expectSectionTabsVisible() {
        await this.menuTabs.first().scrollIntoViewIfNeeded();
        await expect(this.menuTabs).toHaveCount(5);
        await expect(this.menuManagement).toBeVisible();
        await expect(this.menuCoEs).toBeVisible();
        await expect(this.menuSales).toBeVisible();
        await expect(this.menuEnablingFunctions).toBeVisible();
        await expect(this.menuBoardOfDirectors).toBeVisible();
    }

    async openManagementSection() {
        await this.openSection('management', this.menuManagement, this.managementPanel);
    }

    async openCoEsSection() {
        await this.openSection('coes', this.menuCoEs, this.coesPanel);
    }

    async openSalesSection() {
        await this.openSection('sales', this.menuSales, this.salesPanel);
    }

    async openEnablingFunctionsSection() {
        await this.openSection('enabling-functions', this.menuEnablingFunctions, this.enablingFunctionsPanel);
    }

    async openBoardOfDirectorsSection() {
        await this.openSection('board-of-directors', this.menuBoardOfDirectors, this.boardOfDirectorsPanel);
    }

    async expectManagementLeadersVisible() {
        await this.expectSectionLeadersVisible('Management', this.managementPanel, MANAGEMENT_LEADERS);
    }

    async expectCoEsLeadersVisible() {
        await this.expectSectionLeadersVisible('CoEs', this.coesPanel, COE_LEADERS);
    }

    async expectSalesLeadersVisible() {
        await this.expectSectionLeadersVisible('Sales', this.salesPanel, SALES_LEADERS);
    }

    async expectEnablingFunctionsLeadersVisible() {
        await this.expectSectionLeadersVisible(
            'Enabling Functions',
            this.enablingFunctionsPanel,
            ENABLING_FUNCTIONS_LEADERS
        );
    }

    async expectBoardOfDirectorsLeadersVisible() {
        await this.expectSectionLeadersVisible(
            'Board of Directors',
            this.boardOfDirectorsPanel,
            BOARD_OF_DIRECTORS_LEADERS
        );
    }

    private async openSection(slug: LeadershipSectionSlug, tab: Locator, panel: Locator) {
        await tab.scrollIntoViewIfNeeded();
        await tab.click();
        await expect(tab).toHaveClass(/active/);
        await expect(panel).toBeVisible();
        await expect(panel).toHaveAttribute('data-leadership-panel', slug);
    }

    private async expectSectionLeadersVisible(sectionName: string, panel: Locator, leaders: Leader[]) {
        const members = panel.locator('.paragraph--type--leadership-team-member');

        await panel.scrollIntoViewIfNeeded();
        await expect(panel).toBeVisible();
        await expect(members).toHaveCount(leaders.length);

        const actualNames = await members.evaluateAll((elements) =>
            elements.map((member) => {
                const link = member.querySelector('.leader-bio a[href*="linkedin.com"]');
                return (link?.textContent ?? '').replace(/\s+/g, ' ').trim();
            })
        );
        const expectedNames = leaders.map((leader) => leader.name);

        expect(actualNames, `${sectionName} leader names on page must exactly match expected list`).toEqual(
            expectedNames
        );

        for (const leader of leaders) {
            const member = members.filter({
                has: this.page.getByRole('link', { name: leader.name, exact: true })
            });

            await expect(member, `Expected ${sectionName} leader card for ${leader.name}`).toHaveCount(1);

            const image = member.locator('.team-pg-img img');
            const nameLink = member.locator('.leader-bio a[href*="linkedin.com"]');
            const title = member.locator('.leader-bio span');

            await expect(image).toBeVisible();
            await expect(image).toHaveAttribute('src', /.+/);
            await expect(nameLink).toBeVisible();
            await expect(nameLink).toHaveText(leader.name);
            await expect(nameLink).toHaveAttribute('href', leader.linkedin);
            await expect(nameLink).toHaveAttribute('target', '_blank');
            await expect(title).toBeVisible();
            await expect(title).toHaveText(leader.title.trim());
        }
    }
}
