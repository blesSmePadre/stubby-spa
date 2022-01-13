import production from './production';
import staging from './staging';

/* TODO Look how to properly use an unknown type */
/* eslint-disable @typescript-eslint/ban-types */
const configs: Record<string, object> = {
  production,
  staging,
};

export default {
  defaultLocale: 'en',
  remoteApiUrl: 'https://stubby-test-api.herokuapp.com',
  baseUrl: '/api',
  htmlMinifier: {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
  },
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React Starter Boilerplate',
    link: [
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
    ],
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      {
        name: 'description',
        content: 'The best react universal starter boilerplate in the world.',
      },
    ],
  },
  google: {
    clientId:
      '576472057386-nfo6fa5hmemhtvnuqb9hpqmfan9ecd8q.apps.googleusercontent.com',
  },
  ...configs[process.env.APP_ENV || 'development'],
};
