import { expect, Locator, Page } from '@playwright/test';
import { clearElementHighlights, highlightElements } from '../utils/visualState';

function hasConsecutiveFadePair(observed: string[], expected: string[]): boolean {
    if (observed.length < 2) {
        return false;
    }

    const doubled = [...expected, ...expected];

    for (let index = 0; index < observed.length - 1; index++) {
        const from = observed[index];
        const to = observed[index + 1];

        if (doubled.some((_, startIndex) => doubled[startIndex] === from && doubled[startIndex + 1] === to)) {
            return true;
        }
    }

    return false;
}

const OUR_STORY_FADE_ORDER = '0,3,1,2';

const AI_POINTERS = [
    'Giving our engineers more space to innovate',
    'Helping our designers explore more possibilities',
    'Strengthening our decisions with real-time intelligence',
    'Unlocking ideas that were once too time-consuming or costly',
    'Ensuring quality without slowing imagination'
] as const;

const INNOVATION_PARAGRAPHS = [
    'Innovation at TO THE NEW is driven by action. We continuously invest in technologies, purpose-built accelerators, and modern engineering practices that help enterprises modernize faster, reduce complexity, and create measurable business value.',
    'From accelerators like VideoReady, HAWK, PRISM, NIMBUS, and BOLT to reusable architectures, AI-enabled frameworks, and automation-first delivery, we help organizations accelerate time to market, improve productivity, and build scalable digital platforms.',
    'Whether modernizing legacy systems, building cloud-native applications, or delivering AI-powered experiences, we combine product thinking with engineering expertise to solve complex challenges and deliver technology that performs reliably, scales confidently, and drives lasting impact.'
] as const;

const JOURNEY_MILESTONES = [
    {
        year: '2008',
        description:
            'Founded TO THE NEW, marking the beginning of our journey in digital engineering and technology services. Secured our first client from the United States, setting a strong global direction from inception'
    },
    {
        year: '2009',
        description:
            'Won our first Indian client and delivered our first application on AWS, laying the foundation for our cloud capabilities'
    },
    {
        year: '2010',
        description:
            'Welcomed our first batch of campus hires and expanded into Europe with our first Swedish client, strengthening both our talent pipeline and global presence'
    },
    {
        year: '2011',
        description:
            'Moved into a 5,000 sq. ft. office in NSEZ and powered the ESPN Cricket World Cup 2011 app, achieving our first major global live streaming milestone'
    },
    {
        year: '2012',
        description: 'Expanded our technology portfolio by launching MEAN, Mobility, and UX practices'
    },
    {
        year: '2013',
        description: 'Launched our Adobe practice and achieved AWS Advanced Consulting Partner status'
    },
    {
        year: '2014',
        description:
            'Crossed 100 Newers and established our Big Data practice, deepening our engineering capabilities'
    },
    {
        year: '2015',
        description:
            'Expanded operations with an additional 40,000 sq. ft. office in Noida, and earned our first Great Place To Work® recognition, reinforcing our people-first culture'
    },
    {
        year: '2016',
        description:
            'Launched our Digital Marketing practice and onboarded our first clients in Australia and Dubai.'
    },
    {
        year: '2017',
        description:
            'Entered the government sector and became a digital transformation partner to leading Indian enterprises in Media & Entertainment and Insurance sectors'
    },
    {
        year: '2018',
        description:
            'Became an AWS Consulting Partner, launched PAHAL (our social impact initiative), and established offices in New York City and Dubai, further strengthening our global footprint'
    },
    {
        year: '2019',
        description:
            'Moved into a 135,000 sq. ft. office in Noida and ranked 47th in GPTW Top 100 (Large Category)'
    },
    {
        year: '2020',
        description:
            'Set up a delivery center in Dubai and joined the AWS Trusted Partner Network, enhancing global delivery capabilities and strengthening strategic cloud partnerships during a transformative year'
    },
    {
        year: '2021',
        description:
            'Became a Google Cloud Platform Partner and further strengthened our Media & Entertainment practice with advanced OTT monetization capabilities'
    },
    {
        year: '2022',
        description:
            'Opened an offshore center in Dehradun, launched Azure Managed Services, and earned recognition from IAOP Global Outsourcing 100'
    },
    {
        year: '2023',
        description:
            'Introduced Generative AI offerings to help enterprises innovate at scale and received the Award of Excellence from Tata Play for impactful digital delivery'
    },
    {
        year: '2024',
        description:
            'Hived off CloudKeeper as an independent entity. Narinder Kumar took charge as CEO, and Deepak Mittal transitioned to Chairman of TO THE NEW. Established Healthcare and iGaming Centers of Excellence and achieved Prime Video Preferred Fulfillment Vendor status'
    },
    {
        year: '2025',
        description:
            'Over 100 Newers were certified by the Great Manager Institute, strengthening leadership capabilities across the organization'
    },
    {
        year: '2026',
        description:
            'Launched InfAInite, a GenAI-powered natural language search solution, on the TO THE NEW website to enhance visitor experience and accessibility'
    }
] as const;

const OUR_VALUES = [
    {
        heading: 'Authenticity',
        description: 'We speak with honesty, act with integrity, and take ownership of our mistakes'
    },
    {
        heading: 'People Centricity',
        description: 'We put people first, valuing growth, collaboration, and a culture where everyone thrives'
    },
    {
        heading: 'Customer Focus',
        description: 'We stay nimble and do whatever it takes to deliver outcomes that truly matter to our customers'
    },
    {
        heading: 'Complete Ownership',
        description: 'We own every outcome end-to-end, focusing on solutions instead of problems'
    },
    {
        heading: 'Continuous improvement',
        description: 'We invest in learning, experiment with curiosity, and constantly strive to work smarter'
    }
] as const;

const IMPACT_AREAS = [
    {
        heading: 'Impact on People',
        description:
            'Our people are our greatest strength. We invest in continuous learning, leadership development, and a culture of belonging that empowers every Newer to grow, innovate, and deliver exceptional outcomes for our customers.'
    },
    {
        heading: 'Impact on Planet',
        description:
            'We strive to build responsibly by embracing sustainable engineering practices. From energy-efficient cloud architectures to optimizing digital operations, we help reduce waste, improve efficiency, and create technology with a lighter environmental footprint.'
    },
    {
        heading: 'Impact on Communities (CSR)',
        description:
            'Through our CSR initiative, PAHAL, we support education, environmental sustainability, and community well-being. Our Newers actively volunteer, mentor, and contribute to initiatives that create opportunities and foster inclusive growth because we believe technology should improve lives beyond the workplace.'
    }
] as const;

function isCyclicOrderMatch(observed: string[], expected: string[]): boolean {
    if (observed.length < expected.length) {
        return false;
    }

    const window = observed.slice(0, expected.length);
    const doubled = [...expected, ...expected];

    return doubled.some((_, startIndex) =>
        expected.every((value, offset) => doubled[startIndex + offset] === window[offset])
    );
}

type HorizontalMarqueeDirection = 'ltr' | 'rtl';
type VerticalMarqueeDirection = 'up' | 'down';

export class AboutUs {
    private readonly page: Page;
    readonly breadcrumbs: Locator;
    readonly eyebrowTitle: Locator;
    readonly title: Locator;
    readonly bannerDescription: Locator;
    readonly bannerCertifications: Locator;
    readonly bannerAnimation: Locator;
    readonly bannerHighlights: Locator;
    readonly whoWeAreHeading: Locator;
    readonly whoWeAreDescription: Locator;
    readonly ourStoryHeading: Locator;
    readonly ourStoryDescription: Locator;
    readonly ourStoryGallery: Locator;
    readonly ourStorySlotImages: Locator;
    readonly mapHeading: Locator;
    readonly mapValueAndLabel: Locator;
    readonly mapImage: Locator;
    readonly ourClientsHeading: Locator;
    readonly ourClientsDescription: Locator;
    readonly ourClientsLogos: Locator;
    readonly ourClientsMarqueeRtlTrack: Locator;
    readonly ourClientsMarqueeLtrTrack: Locator;
    readonly aiSection: Locator;
    readonly aiSectionHeading: Locator;
    readonly aiLeftDescription: Locator;
    readonly aiRightDescription: Locator;
    readonly aiPointers: Locator;
    readonly aiCtaHeading: Locator;
    readonly aiCtaButton: Locator;
    readonly innovationSection: Locator;
    readonly innovationImage: Locator;
    readonly innovationDescription: Locator;
    readonly cultureSection: Locator;
    readonly cultureHeading: Locator;
    readonly cultureDescription: Locator;
    readonly cultureCtaButton: Locator;
    readonly cultureGallery: Locator;
    readonly cultureColumns: Locator;
    readonly cultureMarqueeTracks: Locator;
    readonly midPageCtaSection: Locator;
    readonly midPageCtaHeading: Locator;
    readonly midPageCtaButton: Locator;
    readonly journeySection: Locator;
    readonly journeyHeading: Locator;
    readonly journeyYearPanel: Locator;
    readonly journeyActiveYear: Locator;
    readonly journeyNextButton: Locator;
    readonly journeyPrevButton: Locator;
    readonly journeySliderTrack: Locator;
    readonly journeyActiveCard: Locator;
    readonly valuesSection: Locator;
    readonly valuesHeading: Locator;
    readonly valuesDescription: Locator;
    readonly valuesBoxes: Locator;
    readonly impactSection: Locator;
    readonly impactHeading: Locator;
    readonly impactDescription: Locator;
    readonly impactBoxes: Locator;
    readonly endCtaSection: Locator;
    readonly endCtaHeading: Locator;
    readonly endCtaDescription: Locator;
    readonly endCtaButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.breadcrumbs = this.page.locator('#block-ttnd-breadcrumbs');
        this.eyebrowTitle = this.page.locator('.aur-banner__eyebrow-pill');
        this.title = this.page.locator('h1').first();
        this.bannerDescription = this.page.locator('.aur-banner__byline');
        this.bannerCertifications = this.page.locator('.aur-banner__cert');
        this.bannerAnimation = this.page.locator('.aur-text-flip__viewport');
        this.bannerHighlights = this.page.locator('.aur-banner__highlights');
        this.whoWeAreHeading = this.page.locator('.aur-who__heading-col');
        this.whoWeAreDescription = this.page.locator('.aur-who__text-col');
        this.ourStoryHeading = this.page.locator('.aur-story__heading');
        this.ourStoryDescription = this.page.locator('.aur-story__description');
        this.ourStoryGallery = this.page.locator('.aur-story__gallery');
        this.ourStorySlotImages = this.page.locator('.aur-story__gallery .aur-story__slot img');
        this.mapHeading = this.page.locator('.aur-map__heading');
        this.mapValueAndLabel = this.page.locator('.field--name-field-aur-map-highlights');
        this.mapImage = this.page.locator('.aur-map__visual');
        this.ourClientsHeading = this.page.locator('.aur-clients__heading');
        this.ourClientsDescription = this.page.locator('.aur-clients__description');
        this.ourClientsLogos = this.page.locator('.aur-clients__marquees');
        this.ourClientsMarqueeRtlTrack = this.page.locator(
            '.aur-clients__marquees .aur-marquee--rtl .aur-marquee__track'
        );
        this.ourClientsMarqueeLtrTrack = this.page.locator(
            '.aur-clients__marquees .aur-marquee--ltr .aur-marquee__track'
        );
        this.aiSection = this.page.locator('.aur-ai');
        this.aiSectionHeading = this.page.locator('.aur-ai__heading');
        this.aiLeftDescription = this.page.locator('.aur-ai__prose');
        this.aiRightDescription = this.page.locator('.aur-ai__thread-intro');
        this.aiPointers = this.page.locator('.aur-ai__highlights .aur-genai-highlight');
        this.aiCtaHeading = this.aiSection.getByText('Ready to accelerate AI-led innovation?', { exact: true });
        this.aiCtaButton = this.aiSection.getByRole('link', { name: 'EXPLORE OUR SERVICES' });
        this.innovationSection = this.page.locator('.aur-innovation');
        this.innovationImage = this.page.locator('.aur-innovation__logo img');
        this.innovationDescription = this.page.locator('.aur-innovation__columns');
        this.cultureSection = this.page.locator('.aur-culture');
        this.cultureHeading = this.page.locator('.aur-culture__heading');
        this.cultureDescription = this.page.locator('.aur-culture__description');
        this.cultureCtaButton = this.cultureSection.getByRole('link', { name: /Hear our Newers/i });
        this.cultureGallery = this.page.locator('.aur-culture__gallery');
        this.cultureColumns = this.page.locator('.aur-culture__gallery .aur-culture__column');
        this.cultureMarqueeTracks = this.page.locator('.aur-culture__gallery .aur-marquee__track');
        this.midPageCtaSection = this.page.locator('.aur-mid-cta');
        this.midPageCtaHeading = this.page.locator('.aur-mid-cta__support');
        this.midPageCtaButton = this.midPageCtaSection.getByRole('link', { name: 'JOIN OUR TEAM' });
        this.journeySection = this.page.locator('.aur-journey');
        this.journeyHeading = this.page.locator('.aur-journey__heading');
        this.journeyYearPanel = this.page.locator('.aur-journey__year-panel');
        this.journeyActiveYear = this.page.locator('.aur-journey__active-year');
        this.journeyNextButton = this.journeySection.getByRole('button', { name: 'Next milestone' });
        this.journeyPrevButton = this.journeySection.getByRole('button', { name: 'Previous milestone' });
        this.journeySliderTrack = this.page.locator('.aur-journey .slick-track');
        this.journeyActiveCard = this.page.locator('.aur-journey .slick-slide.slick-current .aur-journey__card');
        this.valuesSection = this.page.locator('.aur-values');
        this.valuesHeading = this.page.locator('.aur-values__heading');
        this.valuesDescription = this.page.locator('.aur-values__description');
        this.valuesBoxes = this.page.locator('.aur-values .aur-value');
        this.impactSection = this.page.locator('.aur-impact');
        this.impactHeading = this.page.locator('.aur-impact__heading');
        this.impactDescription = this.page.locator('.aur-impact__description');
        this.impactBoxes = this.page.locator('.aur-impact .aur-impact-area');
        this.endCtaSection = this.page.locator('.aur-end-cta');
        this.endCtaHeading = this.page.locator('.aur-end-cta__support');
        this.endCtaDescription = this.page.locator('.aur-end-cta__byline');
        this.endCtaButton = this.endCtaSection.getByRole('link', { name: 'GET IN TOUCH' });
    }

    async goto() {
        await this.page.goto('/about-us', { waitUntil: 'domcontentloaded', timeout: 60_000 });
    }

    async expectAboutUsPageLoaded() {
        await expect(this.page).toHaveURL(/about-us/i);
    }

    async expectBreadcrumbsVisible() {
        await expect(this.breadcrumbs).toBeVisible();
        await expect(this.breadcrumbs).toContainText(/Home/i);
        await expect(this.breadcrumbs).toContainText(/About Us/i);
    }

    async expectEyebrowTitleVisible() {
        await expect(this.eyebrowTitle).toBeVisible();
        await expect(this.eyebrowTitle).toHaveText('About TO THE NEW');
    }

    async expectTitleAndDescriptionVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.title).toHaveText('Human-Centered, AI-Powered Digital Engineering', {
            useInnerText: true
        });
        await expect(this.bannerDescription).toBeVisible();
        await expect(this.bannerDescription).toHaveText(
            "Helping enterprises build what's next through AI-powered digital engineering."
        );
    }

    async expectBannerCertificationsVisible() {
        await expect(this.bannerCertifications).toBeVisible();
    }

    async expectBannerAnimationVisible() {
        await expect(this.bannerAnimation).toBeVisible();
    }

    async expectBannerAnimationTextVisible() {
        const animationTexts = [
            '#47 - India’s Top 100 Companies to Work For',
            'Top 25 - Best Workplaces in IT & IT-BPM',
            'Best Workplaces - Culture of Innovation by All',
            'Best Workplaces for Millennials',
            '10× Great Place To Work Certified'
        ];

        for (const text of animationTexts) {
            await expect(this.bannerAnimation).toContainText(text);
        }
    }

    async expectBannerHighlightsVisible() {
        await expect(this.bannerHighlights).toBeVisible();

        const highlightsHeading = ['Established', 'Newers', 'Enterprise Clients', 'Delivery Centers', 'Client locations'];
        const highlightsValue = ['2008', '2200+', '100+', '6', '100+'];

        for (let i = 0; i < highlightsHeading.length; i++) {
            await expect(this.bannerHighlights).toContainText(highlightsHeading[i]);
            await expect(this.bannerHighlights).toContainText(highlightsValue[i]);
        }
    }

    async expectWhoWeAreHeadingVisible() {
        await expect(this.whoWeAreHeading).toBeVisible();
        await expect(this.whoWeAreHeading).toHaveText(/Who\s+we\s+are/i, { useInnerText: true });
    }

    async expectWhoWeAreDescriptionVisible() {
        await expect(this.whoWeAreDescription).toBeVisible();
        await expect(this.whoWeAreDescription).toContainText('Who TO THE NEW is a digital technology services company');
        await expect(this.whoWeAreDescription).toContainText(
            'complex technology challenges and accelerate business outcomes.'
        );
    }

    async expectOurStoryHeadingVisible() {
        await expect(this.ourStoryHeading).toBeVisible();
        await expect(this.ourStoryHeading).toHaveText(/Our story/i, { useInnerText: true });
    }

    async expectOurStoryDescriptionVisible() {
        await expect(this.ourStoryDescription).toBeVisible();
        await expect(this.ourStoryDescription).toContainText(
            'What began as a small group of enthusiasts excited about crafting digital products'
        );
        await expect(this.ourStoryDescription).toContainText(
            'build digital products that create lasting business value.'
        );
    }

    async expectOurStoryImagesVisible() {
        await this.ourStoryGallery.scrollIntoViewIfNeeded();
        await expect(this.ourStoryGallery).toBeVisible();
        await expect(this.ourStoryGallery).toHaveAttribute('data-story-fade-order', OUR_STORY_FADE_ORDER);
        await expect(this.ourStorySlotImages).toHaveCount(4);

        for (let index = 0; index < 4; index++) {
            await expect(this.ourStorySlotImages.nth(index)).toBeVisible();
            await expect(this.ourStorySlotImages.nth(index)).toHaveAttribute('alt', 'Our story | TO THE NEW');
        }
    }

    async expectOurStoryImageAnimation() {
        await this.ourStoryGallery.scrollIntoViewIfNeeded();
        await expect(this.ourStoryGallery).toHaveAttribute('data-story-fade-order', OUR_STORY_FADE_ORDER);

        const expectedOrder = OUR_STORY_FADE_ORDER.split(',');
        const animatedSlotOrder: string[] = [];

        await expect
            .poll(
                async () => {
                    const transitioningSlot = await this.getTransitioningStorySlot();

                    if (transitioningSlot && animatedSlotOrder.at(-1) !== transitioningSlot) {
                        animatedSlotOrder.push(transitioningSlot);
                    }

                    if (isCyclicOrderMatch(animatedSlotOrder, expectedOrder)) {
                        return true;
                    }

                    return animatedSlotOrder.length >= 2 && hasConsecutiveFadePair(animatedSlotOrder, expectedOrder);
                },
                {
                    timeout: 30_000,
                    intervals: [250, 500, 750],
                    message: `Expected our story gallery to animate slots in order ${OUR_STORY_FADE_ORDER}.`
                }
            )
            .toBe(true);
    }

    async expectMapHeadingVisible() {
        await this.mapHeading.scrollIntoViewIfNeeded();
        await expect(this.mapHeading).toBeVisible();
        await expect(this.mapHeading).toContainText(/Engineered close to/i);
        await expect(this.mapHeading).toContainText(/our clients/i);
    }

    async expectMapValueAndLabelVisible() {
        await expect(this.mapValueAndLabel).toBeVisible();
        await expect(this.mapValueAndLabel).toContainText('25+');
        await expect(this.mapValueAndLabel).toContainText(/Client locations/i);
        await expect(this.mapValueAndLabel).toContainText('6');
        await expect(this.mapValueAndLabel).toContainText(/Delivery centers/i);
    }

    async expectMapImageVisible() {
        await expect(this.mapImage).toBeVisible();
    }

    async expectOurClientsHeadingVisible() {
        await this.ourClientsHeading.scrollIntoViewIfNeeded();
        await expect(this.ourClientsHeading).toBeVisible();
        await expect(this.ourClientsHeading).toContainText(/Trusted by leading/i);
        await expect(this.ourClientsHeading).toContainText(/global enterprises/i);
    }

    async expectOurClientsDescriptionVisible() {
        await expect(this.ourClientsDescription).toBeVisible();
        await expect(this.ourClientsDescription).toContainText(
            "Our engineering, cloud, and data expertise powers innovation for some of the world's fastest-growing and most customer-focused businesses."
        );
    }

    async expectOurClientsLogosVisible() {
        await this.ourClientsLogos.scrollIntoViewIfNeeded();
        await expect(this.ourClientsLogos).toBeVisible();
        await expect(this.page.locator('.aur-clients__marquees .aur-clients__logo-item img').first()).toBeVisible();
    }

    async expectOurClientsMarqueeAnimation() {
        await this.ourClientsLogos.scrollIntoViewIfNeeded();
        await expect(this.ourClientsMarqueeRtlTrack).toBeVisible();
        await expect(this.ourClientsMarqueeLtrTrack).toBeVisible();

        await this.expectMarqueeMovesInDirection(this.ourClientsMarqueeRtlTrack, 'rtl');
        await this.expectMarqueeMovesInDirection(this.ourClientsMarqueeLtrTrack, 'ltr');
    }

    async expectAiSectionHeadingVisible() {
        await this.aiSectionHeading.scrollIntoViewIfNeeded();
        await expect(this.aiSectionHeading).toBeVisible();
        await expect(this.aiSectionHeading).toHaveText('AI-led, human-centered. Built into everything we do.');
    }

    async expectAiLeftDescriptionVisible() {
        await expect(this.aiLeftDescription).toBeVisible();
        await expect(this.aiLeftDescription).toContainText(
            "At TO THE NEW, Generative AI is more than just another capability, it's built into how we think, engineer, and deliver."
        );
    }

    async expectAiRightDescriptionVisible() {
        await expect(this.aiRightDescription).toBeVisible();
        await expect(this.aiRightDescription).toContainText('The GenAI thread: Technology with a human heart.');
        await expect(this.aiRightDescription).toContainText(
            'We see it as the quiet force that helps our people think bigger, move faster, and create better outcomes.'
        );
    }

    async expectAiPointersVisible() {
        await this.aiPointers.first().scrollIntoViewIfNeeded();
        await expect(this.aiPointers).toHaveCount(5);

        for (let index = 0; index < AI_POINTERS.length; index++) {
            await expect(this.aiPointers.nth(index)).toBeVisible();
            await expect(this.aiPointers.nth(index)).toContainText(AI_POINTERS[index]);
        }
    }

    async expectAiCtaHeadingVisible() {
        await this.aiCtaHeading.scrollIntoViewIfNeeded();
        await expect(this.aiCtaHeading).toBeVisible();
        await expect(this.aiCtaHeading).toHaveText('Ready to accelerate AI-led innovation?');
    }

    async expectAiCtaButtonVisible() {
        await this.aiCtaButton.scrollIntoViewIfNeeded();
        await expect(this.aiCtaButton).toBeVisible();
        await expect(this.aiCtaButton).toHaveText('EXPLORE OUR SERVICES');
        await expect(this.aiCtaButton).toHaveAttribute('href', /\/services/i);
    }

    async expectAiCtaButtonNavigation() {
        await this.aiCtaButton.scrollIntoViewIfNeeded();
        await Promise.all([this.page.waitForURL(/\/services/i), this.aiCtaButton.click()]);
    }

    async expectInnovationImageVisible() {
        await this.innovationSection.scrollIntoViewIfNeeded();
        await expect(this.innovationImage).toBeVisible();
        await expect(this.innovationImage).toHaveAttribute('alt', /Driving Innovation/i);
    }

    async expectInnovationDescriptionVisible() {
        await expect(this.innovationDescription).toBeVisible();

        for (const paragraph of INNOVATION_PARAGRAPHS) {
            await expect(this.innovationDescription).toContainText(paragraph);
        }
    }

    async expectCultureHeadingVisible() {
        await this.cultureHeading.scrollIntoViewIfNeeded();
        await expect(this.cultureHeading).toBeVisible();
        await expect(this.cultureHeading).toHaveText(/A Culture of\s+Growth\s*&\s*Belonging/i, { useInnerText: true });
    }

    async expectCultureDescriptionVisible() {
        await expect(this.cultureDescription).toBeVisible();
        await expect(this.cultureDescription).toContainText('Great technology is built by empowered people.');
        await expect(this.cultureDescription).toContainText(
            "The result is a team that doesn't just deliver projects, it builds trusted relationships, embraces change, and continuously creates value for our customers."
        );
    }

    async expectCultureCtaButtonVisible() {
        await this.cultureCtaButton.scrollIntoViewIfNeeded();
        await expect(this.cultureCtaButton).toBeVisible();
        await expect(this.cultureCtaButton).toHaveText(/Hear our Newers/i);
        await expect(this.cultureCtaButton).toHaveAttribute('href', /youtube\.com\/watch/i);
    }

    async expectCultureMarqueeRowsVisible() {
        await this.cultureGallery.scrollIntoViewIfNeeded();
        await expect(this.cultureGallery).toBeVisible();
        await expect(this.cultureColumns).toHaveCount(3);
        await expect(this.cultureMarqueeTracks).toHaveCount(3);

        for (let index = 0; index < 3; index++) {
            const column = this.cultureColumns.nth(index);
            const columnImage = column.locator('.aur-culture__image-item img').first();

            await expect(column).toBeVisible();
            await expect(this.cultureMarqueeTracks.nth(index)).toBeVisible();
            await expect(columnImage).toBeVisible();
            await expect(columnImage).toHaveAttribute('alt', /Our Culture/i);
        }
    }

    async expectCultureMarqueeAnimation() {
        await this.cultureGallery.scrollIntoViewIfNeeded();
        await expect(this.cultureMarqueeTracks).toHaveCount(3);

        for (let index = 0; index < 3; index++) {
            const track = this.cultureMarqueeTracks.nth(index);
            const direction = await this.getVerticalMarqueeDirection(track);
            await this.expectVerticalMarqueeMovesInDirection(track, direction);
        }
    }

    async expectMidPageCtaHeadingVisible() {
        await this.midPageCtaHeading.scrollIntoViewIfNeeded();
        await expect(this.midPageCtaHeading).toBeVisible();
        await expect(this.midPageCtaHeading).toContainText(/Build what.s next with us/i);
    }

    async expectMidPageCtaButtonVisible() {
        await this.midPageCtaButton.scrollIntoViewIfNeeded();
        await expect(this.midPageCtaButton).toBeVisible();
        await expect(this.midPageCtaButton).toHaveText('JOIN OUR TEAM');
        await expect(this.midPageCtaButton).toHaveAttribute('href', /\/careers/i);
    }

    async expectMidPageCtaButtonNavigation() {
        await this.midPageCtaButton.scrollIntoViewIfNeeded();
        await Promise.all([this.page.waitForURL(/\/careers/i), this.midPageCtaButton.click()]);
    }

    async expectJourneyHeadingVisible() {
        await this.journeyHeading.scrollIntoViewIfNeeded();
        await expect(this.journeyHeading).toBeVisible();
        await expect(this.journeyHeading).toContainText(/Our Journey/i);
        await expect(this.journeyHeading).toContainText(/So far/i);
    }

    async expectJourneyTimelineThrough2026() {
        await this.journeySection.scrollIntoViewIfNeeded();
        await expect(this.journeyPrevButton).toHaveClass(/slick-disabled/);
        await expect(this.journeyActiveYear).toHaveText(JOURNEY_MILESTONES[0].year);

        try {
            for (let index = 0; index < JOURNEY_MILESTONES.length; index++) {
                const milestone = JOURNEY_MILESTONES[index];
                const activeCardYear = this.journeyActiveCard.locator('.aur-journey__card-year');
                const activeCardDescription = this.journeyActiveCard.locator('.aur-journey__card-desc');

                await expect(this.journeyYearPanel).toBeVisible();
                await expect(this.journeyActiveYear).toHaveText(milestone.year);
                await expect(activeCardYear).toContainText(milestone.year);
                await expect(activeCardDescription).toContainText(milestone.description);

                await this.highlightJourneyYearAndDescription(milestone.year);

                const isLastMilestone = index === JOURNEY_MILESTONES.length - 1;
                if (isLastMilestone) {
                    break;
                }

                const nextMilestone = JOURNEY_MILESTONES[index + 1];
                const previousTranslateX = await this.getTrackTranslate(this.journeySliderTrack, 'x');
                const canUseNextArrow = !(await this.journeyNextButton.isDisabled());

                if (canUseNextArrow) {
                    await this.journeyNextButton.click();
                    await expect(this.journeyActiveYear).toHaveText(nextMilestone.year);
                    await expect
                        .poll(async () => this.getTrackTranslate(this.journeySliderTrack, 'x'), {
                            timeout: 10_000,
                            intervals: [100, 250, 500],
                            message: `Expected journey slider to move left after selecting ${nextMilestone.year}.`
                        })
                        .toBeLessThan(previousTranslateX);
                    continue;
                }

                // Final visible years stay on-screen; next arrow disables, so select the card directly.
                await this.journeySection
                    .locator('.aur-journey__card', { hasText: nextMilestone.year })
                    .first()
                    .click();
                await expect(this.journeyActiveYear).toHaveText(nextMilestone.year);
                await expect(this.journeyActiveCard.locator('.aur-journey__card-year')).toContainText(
                    nextMilestone.year
                );
                await expect(this.journeySliderTrack).toBeVisible();
                expect(previousTranslateX).toBeLessThan(0);
            }
        } finally {
            await clearElementHighlights(this.page);
        }
    }

    async expectValuesHeadingVisible() {
        await this.valuesHeading.scrollIntoViewIfNeeded();
        await expect(this.valuesHeading).toBeVisible();
        await expect(this.valuesHeading).toHaveText(/Living our\s+Values/i, { useInnerText: true });
    }

    async expectValuesDescriptionVisible() {
        await expect(this.valuesDescription).toBeVisible();
        await expect(this.valuesDescription).toContainText(/Our\s+core values\s+aren.t on a wall/i);
        await expect(this.valuesDescription).toContainText(
            /how we hire,\s*how we build,\s*how we partner,\s*and how we treat each other/i
        );
    }

    async expectValuesBoxesVisible() {
        await this.valuesBoxes.first().scrollIntoViewIfNeeded();
        await expect(this.valuesBoxes).toHaveCount(OUR_VALUES.length);

        for (let index = 0; index < OUR_VALUES.length; index++) {
            const box = this.valuesBoxes.nth(index);
            const value = OUR_VALUES[index];

            await expect(box).toBeVisible();
            await expect(box.locator('.aur-value__title')).toHaveText(value.heading);
            await expect(box.locator('.aur-value__description')).toContainText(value.description);
        }
    }

    async expectImpactHeadingVisible() {
        await this.impactHeading.scrollIntoViewIfNeeded();
        await expect(this.impactHeading).toBeVisible();
        await expect(this.impactHeading).toHaveText(/Creating impact\s+beyond technology/i, { useInnerText: true });
    }

    async expectImpactDescriptionVisible() {
        await expect(this.impactDescription).toBeVisible();
        await expect(this.impactDescription).toContainText(
            'Technology is powerful, but its real impact is measured in how it serves people, communities, and the planet.'
        );
        await expect(this.impactDescription).toContainText(
            'we innovate with intention, ensuring that what we build is good for business and meaningful for the world.'
        );
    }

    async expectImpactBoxesVisible() {
        await this.impactBoxes.first().scrollIntoViewIfNeeded();
        await expect(this.impactBoxes).toHaveCount(IMPACT_AREAS.length);

        for (let index = 0; index < IMPACT_AREAS.length; index++) {
            const box = this.impactBoxes.nth(index);
            const area = IMPACT_AREAS[index];

            await expect(box).toBeVisible();
            await expect(box.locator('.aur-impact-area__title')).toHaveText(area.heading);
            await expect(box.locator('.aur-impact-area__description')).toContainText(area.description);
            await expect(box.locator('.aur-impact-area__icon img')).toBeVisible();
        }
    }

    async expectEndCtaHeadingVisible() {
        await this.endCtaHeading.scrollIntoViewIfNeeded();
        await expect(this.endCtaHeading).toBeVisible();
        await expect(this.endCtaHeading).toContainText(/Let.?s create real business/i);
        await expect(this.endCtaHeading).toContainText(/impact,\s*together/i);
    }

    async expectEndCtaDescriptionVisible() {
        await expect(this.endCtaDescription).toBeVisible();
        await expect(this.endCtaDescription).toHaveText(
            'Transform your business with AI-led digital engineering, cloud, data, and product innovation.'
        );
    }

    async expectEndCtaButtonVisible() {
        await this.endCtaButton.scrollIntoViewIfNeeded();
        await expect(this.endCtaButton).toBeVisible();
        await expect(this.endCtaButton).toHaveText('GET IN TOUCH');
        await expect(this.endCtaButton).toHaveAttribute('href', /\/contact-us/i);
    }

    async expectEndCtaButtonNavigation() {
        await this.endCtaButton.scrollIntoViewIfNeeded();
        await Promise.all([this.page.waitForURL(/\/contact-us/i), this.endCtaButton.click()]);
    }

    private async highlightJourneyYearAndDescription(year: string) {
        const yearBox = await this.journeyYearPanel.boundingBox();
        const descriptionBox = await this.journeyActiveCard.locator('.aur-journey__card-desc').boundingBox();

        await expect(this.journeyYearPanel).toBeVisible();
        await expect(this.journeyActiveCard.locator('.aur-journey__card-desc')).toBeVisible();

        if (!yearBox || !descriptionBox) {
            return;
        }

        await highlightElements(this.page, [
            {
                x: yearBox.x,
                y: yearBox.y,
                width: yearBox.width,
                height: yearBox.height,
                label: `Year ${year}`
            },
            {
                x: descriptionBox.x,
                y: descriptionBox.y,
                width: descriptionBox.width,
                height: descriptionBox.height,
                label: `${year} description`
            }
        ]);

        // Keep the highlight visible briefly so headed/visual runs can show year then description boxes.
        await this.page.waitForTimeout(350);
    }

    private async getVerticalMarqueeDirection(track: Locator): Promise<VerticalMarqueeDirection> {
        const marquee = track.locator(
            'xpath=ancestor::*[contains(@class,"aur-marquee--up") or contains(@class,"aur-marquee--down")][1]'
        );
        const className = (await marquee.getAttribute('class')) ?? '';

        return className.includes('aur-marquee--down') ? 'down' : 'up';
    }

    private async expectMarqueeMovesInDirection(track: Locator, direction: HorizontalMarqueeDirection) {
        const startTranslateX = await this.getTrackTranslate(track, 'x');

        await expect
            .poll(
                async () => {
                    const delta = (await this.getTrackTranslate(track, 'x')) - startTranslateX;

                    if (Math.abs(delta) < 5) {
                        return false;
                    }

                    return direction === 'rtl' ? delta < 0 : delta > 0;
                },
                {
                    timeout: 10_000,
                    intervals: [250, 500, 750],
                    message: `Expected marquee to scroll ${direction.toUpperCase()}.`
                }
            )
            .toBe(true);
    }

    private async expectVerticalMarqueeMovesInDirection(track: Locator, direction: VerticalMarqueeDirection) {
        const startTranslateY = await this.getTrackTranslate(track, 'y');

        await expect
            .poll(
                async () => {
                    const delta = (await this.getTrackTranslate(track, 'y')) - startTranslateY;

                    if (Math.abs(delta) < 5) {
                        return false;
                    }

                    return direction === 'up' ? delta < 0 : delta > 0;
                },
                {
                    timeout: 10_000,
                    intervals: [250, 500, 750],
                    message: `Expected culture marquee to scroll ${direction.toUpperCase()}.`
                }
            )
            .toBe(true);
    }

    private async getTrackTranslate(track: Locator, axis: 'x' | 'y'): Promise<number> {
        return track.evaluate(
            (element, translateAxis) => {
                const transform = window.getComputedStyle(element).transform;

                if (!transform || transform === 'none') {
                    return 0;
                }

                if (transform.startsWith('matrix3d(')) {
                    const values = transform
                        .slice(9, -1)
                        .split(',')
                        .map((value) => Number.parseFloat(value.trim()));

                    return translateAxis === 'x' ? (values[12] ?? 0) : (values[13] ?? 0);
                }

                if (transform.startsWith('matrix(')) {
                    const values = transform
                        .slice(7, -1)
                        .split(',')
                        .map((value) => Number.parseFloat(value.trim()));

                    return translateAxis === 'x' ? (values[4] ?? 0) : (values[5] ?? 0);
                }

                return 0;
            },
            axis
        );
    }

    private async getTransitioningStorySlot(): Promise<string | null> {
        return this.page.evaluate(() => {
            const slot = document.querySelector(
                '.aur-story__gallery .aur-story__slot:has(.aur-story__layer.is-entering, .aur-story__layer.is-leaving)'
            );

            return slot?.getAttribute('data-story-slot') ?? null;
        });
    }
}
