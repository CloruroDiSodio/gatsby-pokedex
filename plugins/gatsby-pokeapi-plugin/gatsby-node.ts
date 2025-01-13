import axios from 'axios';
import { Actions, GatsbyNode } from 'gatsby';

interface PokemonSpecies {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  order: number;
  names: { name: string; language: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  // Fetch data from the Pokémon API
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon-species?limit=151',
  );
  const speciesList: PokemonSpecies[] = response.data.results;
  // Loop through the Pokémon species and create Gatsby nodes
  for (const species of speciesList) {
    const details = await axios.get<PokemonDetails>(species.url);
    const data = details.data;

    // Combine name, genus, and description into langData
    const langData = data.names.map((entry) => {
      const languageName = entry.language.name;
      const genus =
        data.genera.find((g) => g.language.name === languageName)?.genus || '';
      const description =
        data.flavor_text_entries.find(
          (desc) => desc.language.name === languageName,
        )?.flavor_text || '';

      return {
        language: languageName,
        name: entry.name,
        genus,
        description,
      };
    });

    createNode({
      id: createNodeId(
        data.names.find((n) => n.language.name === 'en')?.name || '',
      ),
      order: data.order,
      name: data.names.find((n) => n.language.name === 'en')?.name || '',
      genus: data.genera.find((g) => g.language.name === 'en')?.genus || '',
      description:
        data.flavor_text_entries.find((entry) => entry.language.name === 'en')
          ?.flavor_text || '',
      langData,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      internal: {
        type: 'Pokemon',
        contentDigest: createContentDigest(data),
      },
    });
  }
};

exports.createSchemaCustomization = ({ actions }: { actions: Actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Pokemon implements Node {
      id: ID!
      order: Int!
      name: String!
      image: String!
      langData: [PokemonLangData!]!
    }

    type PokemonLangData {
      language: String!
      name: String!
      genus: String!
      description: String!
    }
  `;

  createTypes(typeDefs);
};
