/**
 * Expected Partners page content for live-page comparison.
 * Source: https://www.tothenew.com/partners
 */
export const partnersContent = {
    url: '/partners',
    urlPattern: /partners/i,

    meta: {
        title: 'Strategic Technology Alliances & Partner Ecosystem | TO THE NEW',
        description:
            "TO THE NEW's AI-first partner ecosystem combines Product Engineering DNA with leaders like AWS, Adobe, and Snowflake to co-engineer future-ready digital solutions."
    },

    breadcrumbs: {
        home: /Home/i,
        partners: /Partners/i
    },

    banner: {
        h1: 'Strategic Alliances & Partner Ecosystem',
        description:
            'Partnering with global technology leaders to deliver scalable, AI-driven digital solutions.',
        cta: {
            text: 'Talk to our experts',
            href: /contact/i
        }
    },

    impact: {
        heading: 'Driving real business impact through strong technology partnerships',
        description:
            'We are partner-native and AI-first, collaborating with leading technology platforms to build scalable, future-ready digital solutions. By combining our product engineering DNA with a curated ecosystem of global leaders, we help businesses accelerate innovation, improve agility, and deliver measurable outcomes.',
        highlights: [
            'Faster time-to-value with proven accelerators & certified expertise',
            'Best-fit solutions through a platform-agnostic approach',
            'Stronger outcomes through deep partner collaboration',
            'Future-ready architecture built on leading technologies'
        ]
    },

    strategicPartners: {
        heading: 'Our strategic partners',
        categories: [
            {
                name: 'Cloud partners',
                description: 'Scalable cloud, AI, and enterprise technology ecosystems.',
                partners: [
                    {
                        name: 'AWS',
                        cta: { text: 'Explore AWS capabilities' },
                        description:
                            'Build secure, scalable cloud platforms for high-performance applications, data, and AI workloads.'
                    },
                    {
                        name: 'Google Cloud',
                        cta: { text: 'Discover Google Cloud solutions' },
                        description:
                            'Build data-driven, AI-powered applications on a flexible, scalable cloud platform.'
                    },
                    {
                        name: 'Microsoft Azure',
                        cta: { text: 'View Microsoft expertise' },
                        description:
                            'Transform enterprises with integrated cloud, AI, and business application ecosystems.'
                    }
                ]
            },
            {
                name: 'Data ecosystem',
                description: 'Unified platforms powering analytics, AI, and intelligent decision-making.',
                partners: [
                    {
                        name: 'Databricks',
                        cta: { text: 'Explore Databricks capabilities' },
                        description:
                            'Build unified data and AI platforms for advanced analytics and machine learning.'
                    },
                    {
                        name: 'Snowflake',
                        cta: { text: 'View Snowflake expertise' },
                        description:
                            'Enable seamless data sharing and high-performance analytics on a unified cloud platform.'
                    }
                ]
            },
            {
                name: 'Customer experience platforms',
                description: 'Connected platforms for personalized engagement and digital experiences.',
                partners: [
                    {
                        name: 'Salesforce',
                        cta: { text: 'See Salesforce offerings' },
                        description:
                            'Enable connected, intelligent customer experiences with unified CRM and automation.'
                    },
                    {
                        name: 'Adobe',
                        cta: { text: 'Explore Adobe solutions' },
                        description:
                            'Deliver personalized, content-driven digital experiences across channels at scale.'
                    },
                    {
                        name: 'HubSpot',
                        description:
                            'Drive growth with integrated marketing, sales, and CRM automation platforms.'
                    }
                ]
            },
            {
                name: 'Media Technology Partners',
                description: 'Secure, scalable, and monetized digital content ecosystems.',
                partners: [
                    {
                        name: 'Irdeto',
                        description:
                            'Protect digital platforms with advanced DRM, anti-piracy, and content security solutions.'
                    },
                    {
                        name: 'Harmonic',
                        description:
                            'Deliver high-quality video streaming and broadcast experiences at scale.'
                    },
                    {
                        name: 'Evergent',
                        description:
                            'Optimize subscriptions, billing, and customer lifecycle management for recurring revenue growth.'
                    }
                ]
            }
        ]
    },

    whatWeBuild: {
        heading: 'What we build with our partners',
        items: [
            'AI-powered digital platforms',
            'Scalable OTT and media ecosystems',
            'Data-driven decision systems',
            'Personalized customer experiences',
            'Cloud-native applications and modernization'
        ]
    },

    endCta: {
        heading: 'Looking to unlock more value from your technology investments?',
        description:
            /Let['’]s explore how our partner ecosystem can help you move faster, innovate smarter, and scale with confidence/i,
        buttons: [
            { text: 'Talk to our experts', href: /contact/i },
            { text: 'Explore our services', href: /services|what-we-do/i }
        ]
    }
} as const;
