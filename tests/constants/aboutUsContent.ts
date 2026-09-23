/**
 * Expected About Us page content for live-page comparison.
 * Source: https://www.tothenew.com/about-us
 */
export const aboutUsContent = {
    url: '/about-us',
    urlPattern: /about-us/i,

    meta: {
        title: 'About TO THE NEW | Human-Centered Digital Engineering & AI Innovation',
        description:
            'Discover TO THE NEW, a global digital engineering company shaping the future with Cloud, Data & GenAI. Explore our culture, values, innovation & people.'
    },

    breadcrumbs: {
        home: /Home/i,
        aboutUs: /About Us/i
    },

    banner: {
        eyebrow: 'About TO THE NEW',
        h1: 'Human-Centered, AI-Powered Digital Engineering',
        description: "Helping enterprises build what's next through AI-powered digital engineering.",
        certifications: [
            '#47 - India’s Top 100 Companies to Work For',
            'Top 25 - Best Workplaces in IT & IT-BPM',
            'Best Workplaces - Culture of Innovation by All',
            'Best Workplaces for Millennials',
            '10× Great Place To Work Certified'
        ],
        highlights: [
            { label: 'ESTABLISHED', value: '2008' },
            { label: 'NEWERS', value: '2200+' },
            { label: 'ENTERPRISE CLIENTS', value: '100+' },
            { label: 'DELIVERY CENTERS', value: '6' },
            { label: 'CLIENT LOCATIONS', value: '25+' }
        ]
    },

    whoWeAre: {
        heading: /Who\s+we\s+are/i,
        paragraphs: [
            'Who TO THE NEW is a digital technology services company helping enterprises build, modernize, and scale digital products, platforms, and experiences through AI, Cloud, Data, and Product Engineering.',
            'We partner with startups, digital-native businesses, and Fortune 500 enterprises across media & entertainment, healthcare, technology, Gaming, BFSI, retail, manufacturing, telecom, travel, and automotive, to solve complex technology challenges and accelerate business outcomes.'
        ]
    },

    ourStory: {
        heading: /Our story/i,
        paragraphs: [
            "What began as a small group of enthusiasts excited about crafting digital products has grown into a global company helping organizations imagine what’s next. Our story began in 2008, during one of the world's toughest economic crises. Starting in adversity shaped us in two defining ways: we had to build differentiated technology solutions, and we had to create a culture capable of attracting exceptional people.",
            'Innovation was never a buzzword, it was a survival instinct. Curiosity became our culture. We ask questions with humility, experiment boldly, and continuously learn in pursuit of meaningful outcomes. That mindset has helped us become a trusted technology partner for enterprises around the world.',
            'Today, we combine AI, engineering, cloud, data, and design expertise to help enterprises modernize technology, accelerate innovation, and build digital products that create lasting business value.'
        ],
        imageAlt: 'Our story | TO THE NEW',
        imageCount: 4,
        fadeOrder: '0,3,1,2'
    },

    map: {
        heading: {
            line1: /Engineered close to/i,
            line2: /our clients/i
        },
        highlights: [
            { value: '25+', label: /Client locations/i },
            { value: '6', label: /Delivery centers/i }
        ]
    },

    clients: {
        heading: {
            line1: /Trusted by leading/i,
            line2: /global enterprises/i
        },
        description:
            "Our engineering, cloud, and data expertise powers innovation for some of the world's fastest-growing and most customer-focused businesses.",
        logos: [
            'Tata Play',
            'Maruti Suzuki',
            'Prime Video',
            'Ooredoo',
            'Gleneagles',
            'Alibaba Cloud',
            'Lionsgate',
            'Welocalize',
            'SonyLiv',
            'MX Player',
            'Fortis',
            'Indigo',
            'Majid-Al-Futtaim',
            'Zeiss',
            'Amaron',
            'Observe.AI',
            'Zupee',
            'Olive Gaea',
            'ETV',
            'Axiom Telecom',
            'HDFC MF',
            'PWC',
            'Comviva',
            'HT Media',
            'Seera Group',
            'Homevista',
            'Damensch',
            'Fashionphile',
            'Lakeshore',
            'Klover Holdings',
            'Audio Enhancement',
            'Lumira'
        ]
    },

    ai: {
        heading: 'AI-led, human-centered. Built into everything we do.',
        leftParagraphs: [
            "At TO THE NEW, Generative AI is more than just another capability, it's built into how we think, engineer, and deliver. While we offer dedicated GenAI solutions, we also embed AI across our engineering, cloud, data, quality engineering, and digital experience practices to help enterprises innovate faster and create greater business value.",
            'From accelerating software development and improving quality engineering to strengthening decision-making with real-time intelligence and automating repetitive tasks, GenAI helps our teams solve complex problems faster. Whether enabling engineers to prototype rapidly or giving designers more creative possibilities, AI amplifies human expertise rather than replacing it.',
            'By combining AI with engineering excellence and human judgment, we help organizations build smarter digital products, accelerate time to value, and deliver meaningful business outcomes.'
        ],
        threadTitle: 'The GenAI thread: Technology with a human heart',
        threadIntro:
            "We don't see GenAI as the star of the show. We see it as the quiet force that helps our people think bigger, move faster, and create better outcomes.",
        pointers: [
            'Giving our engineers more space to innovate',
            'Helping our designers explore more possibilities',
            'Strengthening our decisions with real-time intelligence',
            'Unlocking ideas that were once too time-consuming or costly',
            'Ensuring quality without slowing imagination'
        ],
        ctaHeading: 'Ready to accelerate AI-led innovation?',
        ctaButton: {
            text: 'EXPLORE OUR SERVICES',
            href: /\/services/i
        }
    },

    innovation: {
        imageAlt: /Driving Innovation/i,
        paragraphs: [
            'Innovation at TO THE NEW is driven by action. We continuously invest in technologies, purpose-built accelerators, and modern engineering practices that help enterprises modernize faster, reduce complexity, and create measurable business value.',
            'From accelerators like VideoReady, HAWK, PRISM, NIMBUS, and BOLT to reusable architectures, AI-enabled frameworks, and automation-first delivery, we help organizations accelerate time to market, improve productivity, and build scalable digital platforms.',
            'Whether modernizing legacy systems, building cloud-native applications, or delivering AI-powered experiences, we combine product thinking with engineering expertise to solve complex challenges and deliver technology that performs reliably, scales confidently, and drives lasting impact.'
        ]
    },

    culture: {
        heading: /A [Cc]ulture of\s+[Gg]rowth\s*&\s*[Bb]elonging/i,
        paragraphs: [
            'Great technology is built by empowered people. At TO THE NEW, our culture is rooted in curiosity, ownership, collaboration, and continuous learning. We believe the best ideas emerge when talented people are trusted to experiment, challenge conventions, and grow together.',
            "Our Newers, across our global delivery centers, bring diverse perspectives, deep technical expertise, and a shared commitment to solving complex business challenges. Through continuous learning, leadership development, and a people-first approach, we've built a workplace where innovation thrives and long-term partnerships flourish.",
            "The result is a team that doesn't just deliver projects, it builds trusted relationships, embraces change, and continuously creates value for our customers."
        ],
        ctaButton: {
            text: /Hear our Newers/i,
            href: /youtube\.com\/watch/i
        },
        gallery: {
            columnCount: 3,
            imageAlt: /Our Culture/i
        }
    },

    midPageCta: {
        heading: /Build what.s next with us/i,
        button: {
            text: 'JOIN OUR TEAM',
            href: /\/careers/i
        }
    },

    journey: {
        heading: {
            line1: /Our [Jj]ourney/i,
            line2: /[Ss]o far/i
        },
        milestones: [
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
                    'Launched our Digital Marketing practice and onboarded our first clients in Australia and Dubai'
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
        ]
    },

    values: {
        heading: /Living our\s+[Vv]alues/i,
        description:
            "Our core values aren’t on a wall. They show up in how we hire, how we build, how we partner, and how we treat each other.",
        items: [
            {
                heading: 'Authenticity',
                description: 'We speak with honesty, act with integrity, and take ownership of our mistakes'
            },
            {
                heading: 'People Centricity',
                description:
                    'We put people first, valuing growth, collaboration, and a culture where everyone thrives'
            },
            {
                heading: 'Customer Focus',
                description:
                    'We stay nimble and do whatever it takes to deliver outcomes that truly matter to our customers'
            },
            {
                heading: 'Complete Ownership',
                description: 'We own every outcome end-to-end, focusing on solutions instead of problems'
            },
            {
                heading: 'Continuous improvement',
                description:
                    'We invest in learning, experiment with curiosity, and constantly strive to work smarter'
            }
        ]
    },

    impact: {
        heading: /Creating impact\s+beyond technology/i,
        description:
            'Technology is powerful, but its real impact is measured in how it serves people, communities, and the planet. At TO THE NEW, we innovate with intention, ensuring that what we build is good for business and meaningful for the world.',
        items: [
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
        ]
    },

    endCta: {
        heading: {
            line1: /Let.?s create real business/i,
            line2: /impact,\s*together/i
        },
        description:
            'Transform your business with AI-led digital engineering, cloud, data, and product innovation.',
        button: {
            text: 'GET IN TOUCH',
            href: /\/contact-us/i
        }
    }
} as const;

/** Flat list of all visible body copy strings (useful for page-text contains checks). */
export const aboutUsVisibleTextSnippets = [
    aboutUsContent.banner.eyebrow,
    aboutUsContent.banner.h1,
    aboutUsContent.banner.description,
    ...aboutUsContent.banner.certifications,
    ...aboutUsContent.banner.highlights.map((h) => h.value),
    ...aboutUsContent.whoWeAre.paragraphs,
    ...aboutUsContent.ourStory.paragraphs,
    aboutUsContent.clients.description,
    aboutUsContent.ai.heading,
    ...aboutUsContent.ai.leftParagraphs,
    aboutUsContent.ai.threadTitle,
    aboutUsContent.ai.threadIntro,
    ...aboutUsContent.ai.pointers,
    aboutUsContent.ai.ctaHeading,
    aboutUsContent.ai.ctaButton.text,
    ...aboutUsContent.innovation.paragraphs,
    ...aboutUsContent.culture.paragraphs,
    aboutUsContent.midPageCta.button.text,
    ...aboutUsContent.journey.milestones.map((m) => `${m.year}: ${m.description}`),
    aboutUsContent.values.description,
    ...aboutUsContent.values.items.map((v) => `${v.heading}: ${v.description}`),
    aboutUsContent.impact.description,
    ...aboutUsContent.impact.items.map((i) => `${i.heading}: ${i.description}`),
    aboutUsContent.endCta.description,
    aboutUsContent.endCta.button.text
] as const;
