// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import ConfigLocalized from './docusaurus.config.localized.json';

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const defaultLocale = 'ru';

function getLocalizedConfigValue(key) {
  const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? defaultLocale;
  const values = ConfigLocalized[key];
  if (!values) {
    throw new Error(`Localized config key=${key} not found`);
  }
  const value = values[currentLocale] ?? values[defaultLocale];
  if (!value) {
    throw new Error(
      `Localized value for config key=${key} not found for both currentLocale=${currentLocale} or defaultLocale=${defaultLocale}`,
    );
  }
  return value;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: getLocalizedConfigValue('title'),
  tagline: getLocalizedConfigValue('tagline'),
  url: 'https://docs.pastvu.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: './img/favicon.ico',
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: defaultLocale,
    locales: ['en', 'ru'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      ru: {
        htmlLang: 'ru-RU',
      },
    },
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
    remarkRehypeOptions: {
        footnoteLabel: getLocalizedConfigValue('remarkRehypeOptions_footnotes'),
    },
  },
  plugins: ['docusaurus-plugin-sass',
    ["@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // Since 'ru' is default locale, '/ru' path is omitted. We need redirect for some pages where url
          // may differ based on user locale in the app.
          {
            to: '/rules',
            from: '/ru/rules',
          },
          {
            to: '/about',
            from: '/ru/about',
          },
        ],
      }
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/pastvu/docs/edit/main',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        gtag: {
          trackingID: "G-VC6PK6N277",
        },
        sitemap: {
          ignorePatterns: ['/tags/**'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'PastVu',
        logo: {
          alt: 'PastVu Logo',
          src: './img/logo.png',
        },
        items: [
          {
            type: 'localeDropdown',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Docs',
          },
          {
            type: 'doc',
            docId: 'rules',
            position: 'right',
            label: 'Rules',
          },
          {
            href: 'https://github.com/pastvu/docs',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        copyright: `© ${new Date().getFullYear()}&nbsp;` + getLocalizedConfigValue('footer_copyright'), // Not in use, see i18n/en/docusaurus-theme-classic/footer.json
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image',
        content: '/img/logo.png',
      },
    },
  ],
};

module.exports = config;
