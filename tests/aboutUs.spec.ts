import { test } from './fixtures/visualTest';
import { AboutUs } from './Pages/aboutUs';
import { Header } from './Pages/header';
import { STABLE_ENTRY_PATH } from './constants/navigation';

test.describe('About TO THE NEW Tests', () => {
    let aboutUs: AboutUs;
    let header: Header;

    test.beforeEach(async ({ page, visualStep }) => {
        aboutUs = new AboutUs(page);
        header = new Header(page);

        await visualStep('Open landing page');
        await header.goto(STABLE_ENTRY_PATH);
        await visualStep('Navigate to About TO THE NEW from header');
        await header.clickAboutUs();
        await aboutUs.expectAboutUsPageLoaded();
        await visualStep('About TO THE NEW page is loaded');
    });

    test('Verify breadcrumbs are visible', async ({ visualStep }) => {
        await visualStep('Checking breadcrumbs are visible');
        await aboutUs.expectBreadcrumbsVisible();
        await visualStep('Breadcrumbs are visible');
    });

    test('Verify banner section', async ({ visualStep }) => {
        await visualStep('Checking banner section');
        await aboutUs.expectEyebrowTitleVisible();
        await aboutUs.expectTitleAndDescriptionVisible();
        await aboutUs.expectBannerCertificationsVisible();
        await aboutUs.expectBannerAnimationVisible();
        await aboutUs.expectBannerAnimationTextVisible();
        await aboutUs.expectBannerHighlightsVisible();
        await visualStep('Banner section is visible');
    });

    test('Verify Who We Are section', async ({ visualStep }) => {
        await visualStep('Checking Who We Are section');
        await aboutUs.expectWhoWeAreHeadingVisible();
        await aboutUs.expectWhoWeAreDescriptionVisible();
        await visualStep('Who We Are section is visible');
    });

    test('Verify Our Story section', async ({ visualStep }) => {
        test.setTimeout(90_000);

        await visualStep('Checking Our Story section');
        await aboutUs.expectOurStoryHeadingVisible();
        await aboutUs.expectOurStoryDescriptionVisible();
        await aboutUs.expectOurStoryImagesVisible();
        await aboutUs.expectOurStoryImageAnimation();
        await visualStep('Our Story section and gallery animation are visible');
    });

    test('Verify Map section', async ({ visualStep }) => {
        await visualStep('Checking Map section');
        await aboutUs.expectMapHeadingVisible();
        await aboutUs.expectMapValueAndLabelVisible();
        await aboutUs.expectMapImageVisible();
        await visualStep('Map section is visible');
    });

    test('Verify Our Clients section', async ({ visualStep }) => {
        test.setTimeout(90_000);

        await visualStep('Checking Our Clients section');
        await aboutUs.expectOurClientsHeadingVisible();
        await aboutUs.expectOurClientsDescriptionVisible();
        await aboutUs.expectOurClientsLogosVisible();
        await aboutUs.expectOurClientsMarqueeAnimation();
        await visualStep('Our Clients marquee scrolls in the correct direction');
    });

    test('Verify AI section', async ({ visualStep }) => {
        await visualStep('Checking AI section');
        await aboutUs.expectAiSectionHeadingVisible();
        await aboutUs.expectAiLeftDescriptionVisible();
        await aboutUs.expectAiRightDescriptionVisible();
        await aboutUs.expectAiPointersVisible();
        await aboutUs.expectAiCtaHeadingVisible();
        await aboutUs.expectAiCtaButtonVisible();
        await aboutUs.expectAiCtaButtonNavigation();
        await visualStep('AI section is visible and CTA navigates to services');
    });

    test('Verify Innovation section', async ({ visualStep }) => {
        await visualStep('Checking Innovation section');
        await aboutUs.expectInnovationImageVisible();
        await aboutUs.expectInnovationDescriptionVisible();
        await visualStep('Innovation section is visible');
    });

    test('Verify Culture section', async ({ visualStep }) => {
        test.setTimeout(90_000);

        await visualStep('Checking Culture section');
        await aboutUs.expectCultureHeadingVisible();
        await aboutUs.expectCultureDescriptionVisible();
        await aboutUs.expectCultureCtaButtonVisible();
        await aboutUs.expectCultureMarqueeRowsVisible();
        await aboutUs.expectCultureMarqueeAnimation();
        await visualStep('Culture section and three image marquees are visible');
    });
    test('Verify Mid Page CTA section', async ({ visualStep }) => {
        await visualStep('Checking Mid Page CTA section');
        await aboutUs.expectMidPageCtaHeadingVisible();
        await aboutUs.expectMidPageCtaButtonVisible();
        await aboutUs.expectMidPageCtaButtonNavigation();
        await visualStep('Mid Page CTA section is visible and navigates to careers');
    });

    test('Verify Our Journey timeline section', async ({ visualStep }) => {
        test.setTimeout(180_000);

        await visualStep('Checking Our Journey heading');
        await aboutUs.expectJourneyHeadingVisible();
        await visualStep('Highlighting each year box and description from 2008 to 2026');
        await aboutUs.expectJourneyTimelineThrough2026();
        await visualStep('Our Journey timeline year highlight, description, and slider verified through 2026');
    });

    test('Verify Our Values section', async ({ visualStep }) => {
        await visualStep('Checking Our Values heading and description');
        await aboutUs.expectValuesHeadingVisible();
        await aboutUs.expectValuesDescriptionVisible();
        await visualStep('Checking all 5 value boxes with heading and description');
        await aboutUs.expectValuesBoxesVisible();
        await visualStep('Our Values section with 5 boxes is verified');
    });

    test('Verify Impact beyond technology section', async ({ visualStep }) => {
        await visualStep('Checking Impact heading and description');
        await aboutUs.expectImpactHeadingVisible();
        await aboutUs.expectImpactDescriptionVisible();
        await visualStep('Checking all 3 impact boxes with heading, description, and icon');
        await aboutUs.expectImpactBoxesVisible();
        await visualStep('Impact beyond technology section with 3 boxes is verified');
    });

    test('Verify End CTA section', async ({ visualStep }) => {
        await visualStep('Checking End CTA heading, description, and button');
        await aboutUs.expectEndCtaHeadingVisible();
        await aboutUs.expectEndCtaDescriptionVisible();
        await aboutUs.expectEndCtaButtonVisible();
        await aboutUs.expectEndCtaButtonNavigation();
        await visualStep('End CTA section is visible and navigates to contact us');
    });
});
