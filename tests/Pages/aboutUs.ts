import { expect, Locator, Page } from '@playwright/test';
import { aboutUsContent } from '../constants/aboutUsContent';
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

const OUR_STORY_FADE_ORDER = aboutUsContent.ourStory.fadeOrder;
const AI_POINTERS = aboutUsContent.ai.pointers;
const INNOVATION_PARAGRAPHS = aboutUsContent.innovation.paragraphs;
const JOURNEY_MILESTONES = aboutUsContent.journey.milestones;
const OUR_VALUES = aboutUsContent.values.items;
const IMPACT_AREAS = aboutUsContent.impact.items;

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
        this.aiCtaHeading = this.aiSection.getByText(aboutUsContent.ai.ctaHeading, { exact: true });
        this.aiCtaButton = this.aiSection.getByRole('link', { name: aboutUsContent.ai.ctaButton.text });
        this.innovationSection = this.page.locator('.aur-innovation');
        this.innovationImage = this.page.locator('.aur-innovation__logo img');
        this.innovationDescription = this.page.locator('.aur-innovation__columns');
        this.cultureSection = this.page.locator('.aur-culture');
        this.cultureHeading = this.page.locator('.aur-culture__heading');
        this.cultureDescription = this.page.locator('.aur-culture__description');
        this.cultureCtaButton = this.cultureSection.getByRole('link', {
            name: aboutUsContent.culture.ctaButton.text
        });
        this.cultureGallery = this.page.locator('.aur-culture__gallery');
        this.cultureColumns = this.page.locator('.aur-culture__gallery .aur-culture__column');
        this.cultureMarqueeTracks = this.page.locator('.aur-culture__gallery .aur-marquee__track');
        this.midPageCtaSection = this.page.locator('.aur-mid-cta');
        this.midPageCtaHeading = this.page.locator('.aur-mid-cta__support');
        this.midPageCtaButton = this.midPageCtaSection.getByRole('link', {
            name: aboutUsContent.midPageCta.button.text
        });
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
        this.endCtaButton = this.endCtaSection.getByRole('link', { name: aboutUsContent.endCta.button.text });
    }

    async goto() {
        await this.page.goto(aboutUsContent.url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    }

    async expectAboutUsPageLoaded() {
        await expect(this.page).toHaveURL(aboutUsContent.urlPattern);
    }

    async expectMetaContent() {
        await expect(this.page).toHaveTitle(aboutUsContent.meta.title);
        const description = this.page.locator('meta[name="description"]');
        await expect(description).toHaveAttribute('content', aboutUsContent.meta.description);
    }

    async expectBreadcrumbsVisible() {
        await expect(this.breadcrumbs).toBeVisible();
        await expect(this.breadcrumbs).toContainText(aboutUsContent.breadcrumbs.home);
        await expect(this.breadcrumbs).toContainText(aboutUsContent.breadcrumbs.aboutUs);
    }

    async expectEyebrowTitleVisible() {
        await expect(this.eyebrowTitle).toBeVisible();
        await expect(this.eyebrowTitle).toHaveText(aboutUsContent.banner.eyebrow);
    }

    async expectTitleAndDescriptionVisible() {
        await expect(this.title).toBeVisible();
        await expect(this.title).toHaveText(aboutUsContent.banner.h1, {
            useInnerText: true
        });
        await expect(this.bannerDescription).toBeVisible();
        await expect(this.bannerDescription).toHaveText(aboutUsContent.banner.description);
    }

    async expectBannerCertificationsVisible() {
        await expect(this.bannerCertifications).toBeVisible();
    }

    async expectBannerAnimationVisible() {
        await expect(this.bannerAnimation).toBeVisible();
    }

    async expectBannerAnimationTextVisible() {
        for (const text of aboutUsContent.banner.certifications) {
            await expect(this.bannerAnimation).toContainText(text);
        }
    }

    async expectBannerHighlightsVisible() {
        await expect(this.bannerHighlights).toBeVisible();

        for (const highlight of aboutUsContent.banner.highlights) {
            await expect(this.bannerHighlights).toContainText(highlight.label, { ignoreCase: true });
            await expect(this.bannerHighlights).toContainText(highlight.value);
        }
    }

    async expectWhoWeAreHeadingVisible() {
        await expect(this.whoWeAreHeading).toBeVisible();
        await expect(this.whoWeAreHeading).toHaveText(aboutUsContent.whoWeAre.heading, { useInnerText: true });
    }

    async expectWhoWeAreDescriptionVisible() {
        await expect(this.whoWeAreDescription).toBeVisible();
        for (const paragraph of aboutUsContent.whoWeAre.paragraphs) {
            await expect(this.whoWeAreDescription).toContainText(paragraph);
        }
    }

    async expectOurStoryHeadingVisible() {
        await expect(this.ourStoryHeading).toBeVisible();
        await expect(this.ourStoryHeading).toHaveText(aboutUsContent.ourStory.heading, { useInnerText: true });
    }

    async expectOurStoryDescriptionVisible() {
        await expect(this.ourStoryDescription).toBeVisible();
        for (const paragraph of aboutUsContent.ourStory.paragraphs) {
            await expect(this.ourStoryDescription).toContainText(paragraph);
        }
    }

    async expectOurStoryImagesVisible() {
        await this.ourStoryGallery.scrollIntoViewIfNeeded();
        await expect(this.ourStoryGallery).toBeVisible();
        await expect(this.ourStoryGallery).toHaveAttribute('data-story-fade-order', OUR_STORY_FADE_ORDER);
        await expect(this.ourStorySlotImages).toHaveCount(aboutUsContent.ourStory.imageCount);

        for (let index = 0; index < aboutUsContent.ourStory.imageCount; index++) {
            await expect(this.ourStorySlotImages.nth(index)).toBeVisible();
            await expect(this.ourStorySlotImages.nth(index)).toHaveAttribute(
                'alt',
                aboutUsContent.ourStory.imageAlt
            );
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
        await expect(this.mapHeading).toContainText(aboutUsContent.map.heading.line1);
        await expect(this.mapHeading).toContainText(aboutUsContent.map.heading.line2);
    }

    async expectMapValueAndLabelVisible() {
        await expect(this.mapValueAndLabel).toBeVisible();
        for (const highlight of aboutUsContent.map.highlights) {
            await expect(this.mapValueAndLabel).toContainText(highlight.value);
            await expect(this.mapValueAndLabel).toContainText(highlight.label);
        }
    }

    async expectMapImageVisible() {
        await expect(this.mapImage).toBeVisible();
    }

    async expectOurClientsHeadingVisible() {
        await this.ourClientsHeading.scrollIntoViewIfNeeded();
        await expect(this.ourClientsHeading).toBeVisible();
        await expect(this.ourClientsHeading).toContainText(aboutUsContent.clients.heading.line1);
        await expect(this.ourClientsHeading).toContainText(aboutUsContent.clients.heading.line2);
    }

    async expectOurClientsDescriptionVisible() {
        await expect(this.ourClientsDescription).toBeVisible();
        await expect(this.ourClientsDescription).toContainText(aboutUsContent.clients.description);
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
        await expect(this.aiSectionHeading).toHaveText(aboutUsContent.ai.heading);
    }

    async expectAiLeftDescriptionVisible() {
        await expect(this.aiLeftDescription).toBeVisible();
        for (const paragraph of aboutUsContent.ai.leftParagraphs) {
            await expect(this.aiLeftDescription).toContainText(paragraph);
        }
    }

    async expectAiRightDescriptionVisible() {
        await expect(this.aiRightDescription).toBeVisible();
        await expect(this.aiRightDescription).toContainText(aboutUsContent.ai.threadTitle);
        await expect(this.aiRightDescription).toContainText(aboutUsContent.ai.threadIntro);
    }

    async expectAiPointersVisible() {
        await this.aiPointers.first().scrollIntoViewIfNeeded();
        await expect(this.aiPointers).toHaveCount(AI_POINTERS.length);

        for (let index = 0; index < AI_POINTERS.length; index++) {
            await expect(this.aiPointers.nth(index)).toBeVisible();
            await expect(this.aiPointers.nth(index)).toContainText(AI_POINTERS[index]);
        }
    }

    async expectAiCtaHeadingVisible() {
        await this.aiCtaHeading.scrollIntoViewIfNeeded();
        await expect(this.aiCtaHeading).toBeVisible();
        await expect(this.aiCtaHeading).toHaveText(aboutUsContent.ai.ctaHeading);
    }

    async expectAiCtaButtonVisible() {
        await this.aiCtaButton.scrollIntoViewIfNeeded();
        await expect(this.aiCtaButton).toBeVisible();
        await expect(this.aiCtaButton).toHaveText(aboutUsContent.ai.ctaButton.text);
        await expect(this.aiCtaButton).toHaveAttribute('href', aboutUsContent.ai.ctaButton.href);
    }

    async expectAiCtaButtonNavigation() {
        await this.aiCtaButton.scrollIntoViewIfNeeded();
        await Promise.all([this.page.waitForURL(aboutUsContent.ai.ctaButton.href), this.aiCtaButton.click()]);
    }

    async expectInnovationImageVisible() {
        await this.innovationSection.scrollIntoViewIfNeeded();
        await expect(this.innovationImage).toBeVisible();
        await expect(this.innovationImage).toHaveAttribute('alt', aboutUsContent.innovation.imageAlt);
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
        await expect(this.cultureHeading).toHaveText(aboutUsContent.culture.heading, { useInnerText: true });
    }

    async expectCultureDescriptionVisible() {
        await expect(this.cultureDescription).toBeVisible();
        for (const paragraph of aboutUsContent.culture.paragraphs) {
            await expect(this.cultureDescription).toContainText(paragraph);
        }
    }

    async expectCultureCtaButtonVisible() {
        await this.cultureCtaButton.scrollIntoViewIfNeeded();
        await expect(this.cultureCtaButton).toBeVisible();
        await expect(this.cultureCtaButton).toHaveText(aboutUsContent.culture.ctaButton.text);
        await expect(this.cultureCtaButton).toHaveAttribute('href', aboutUsContent.culture.ctaButton.href);
    }

    async expectCultureMarqueeRowsVisible() {
        await this.cultureGallery.scrollIntoViewIfNeeded();
        await expect(this.cultureGallery).toBeVisible();
        await expect(this.cultureColumns).toHaveCount(aboutUsContent.culture.gallery.columnCount);
        await expect(this.cultureMarqueeTracks).toHaveCount(aboutUsContent.culture.gallery.columnCount);

        for (let index = 0; index < aboutUsContent.culture.gallery.columnCount; index++) {
            const column = this.cultureColumns.nth(index);
            const columnImage = column.locator('.aur-culture__image-item img').first();

            await expect(column).toBeVisible();
            await expect(this.cultureMarqueeTracks.nth(index)).toBeVisible();
            await expect(columnImage).toBeVisible();
            await expect(columnImage).toHaveAttribute('alt', aboutUsContent.culture.gallery.imageAlt);
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
        await expect(this.midPageCtaHeading).toContainText(aboutUsContent.midPageCta.heading);
    }

    async expectMidPageCtaButtonVisible() {
        await this.midPageCtaButton.scrollIntoViewIfNeeded();
        await expect(this.midPageCtaButton).toBeVisible();
        await expect(this.midPageCtaButton).toHaveText(aboutUsContent.midPageCta.button.text);
        await expect(this.midPageCtaButton).toHaveAttribute('href', aboutUsContent.midPageCta.button.href);
    }

    async expectMidPageCtaButtonNavigation() {
        await this.midPageCtaButton.scrollIntoViewIfNeeded();
        await Promise.all([
            this.page.waitForURL(aboutUsContent.midPageCta.button.href),
            this.midPageCtaButton.click()
        ]);
    }

    async expectJourneyHeadingVisible() {
        await this.journeyHeading.scrollIntoViewIfNeeded();
        await expect(this.journeyHeading).toBeVisible();
        await expect(this.journeyHeading).toContainText(aboutUsContent.journey.heading.line1);
        await expect(this.journeyHeading).toContainText(aboutUsContent.journey.heading.line2);
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
        await expect(this.valuesHeading).toHaveText(aboutUsContent.values.heading, { useInnerText: true });
    }

    async expectValuesDescriptionVisible() {
        await expect(this.valuesDescription).toBeVisible();
        await expect(this.valuesDescription).toContainText(aboutUsContent.values.description);
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
        await expect(this.impactHeading).toHaveText(aboutUsContent.impact.heading, { useInnerText: true });
    }

    async expectImpactDescriptionVisible() {
        await expect(this.impactDescription).toBeVisible();
        await expect(this.impactDescription).toContainText(aboutUsContent.impact.description);
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
        await expect(this.endCtaHeading).toContainText(aboutUsContent.endCta.heading.line1);
        await expect(this.endCtaHeading).toContainText(aboutUsContent.endCta.heading.line2);
    }

    async expectEndCtaDescriptionVisible() {
        await expect(this.endCtaDescription).toBeVisible();
        await expect(this.endCtaDescription).toHaveText(aboutUsContent.endCta.description);
    }

    async expectEndCtaButtonVisible() {
        await this.endCtaButton.scrollIntoViewIfNeeded();
        await expect(this.endCtaButton).toBeVisible();
        await expect(this.endCtaButton).toHaveText(aboutUsContent.endCta.button.text);
        await expect(this.endCtaButton).toHaveAttribute('href', aboutUsContent.endCta.button.href);
    }

    async expectEndCtaButtonNavigation() {
        await this.endCtaButton.scrollIntoViewIfNeeded();
        await Promise.all([
            this.page.waitForURL(aboutUsContent.endCta.button.href),
            this.endCtaButton.click()
        ]);
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
