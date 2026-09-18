/** TO THE NEW landing page used as the default test entry point. */
export const STABLE_ENTRY_PATH = '/';

export const SEARCH_QUERY = 'cloud';

/** Header buttons that open a megamenu or panel (no submenu navigation). */
export const headerMenuButtons = [
  {
    label: 'Who we are',
    expectedItem: 'About TO THE NEW'
  },
  {
    label: 'What we do',
    expectedItem: 'Services'
  },
  {
    label: 'InfAInite GPT',
    expectedItem: 'Ask anything ?'
  }
] as const;

/** Header buttons that navigate directly when clicked. */
export const headerDirectButtons = [
  { label: 'Contact us', urlPattern: /contact-us/i },
  { label: 'Careers', urlPattern: /careers/i }
] as const;
