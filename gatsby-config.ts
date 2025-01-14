import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `pokedex`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyDefault: 'en', // Default language
        langKeyForNull: 'en', // Language fallback for missing translations
        prefixDefault: true, // Add `/en` for the default language in the URL
        useLangKeyLayout: false, // Use the same layout for all languages
        pagesPaths: ['/src/pages'], // Define the path for pages
      },
    },
    {
      resolve: `gatsby-pokeapi-plugin`,
      options: {},
    },
    `gatsby-theme-material-ui`,
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
  ],
};

export default config;
