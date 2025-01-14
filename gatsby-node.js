exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allPokemon {
        nodes {
          name
          id
          image
          langData {
            language
            name
            description
            genus
          }
        }
      }
    }
  `);

  const languages = ['en', 'fr', 'es'];

  data.allPokemon.nodes.forEach((pkm) => {
    languages.forEach((lang) => {
      const localizedName =
        pkm.langData.find((entry) => entry.language === lang)?.name || pkm.name;
      const slug = `/${lang}/${pkm.name.toLowerCase()}`;
      actions.createPage({
        path: slug,
        component: require.resolve(`./src/templates/pokemon.tsx`),
        context: { ...pkm, language: lang },
      });
    });
  });

  // Create the language-aware homepage
  languages.forEach((lang) => {
    actions.createPage({
      path: `/${lang}/`,
      component: require.resolve('./src/templates/home.tsx'),
      context: { language: lang },
    });
  });
};
