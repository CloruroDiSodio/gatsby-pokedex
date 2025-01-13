import * as React from 'react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

interface PokemonNode {
  id: string;
  name: string;
  image: string;
  langData: LangData;
}

interface LangData {
  language: string;
  name: string;
  description: string;
  genus: string;
}

interface DataProps {
  allPokemon: {
    nodes: PokemonNode[];
  };
}

interface IProps extends PageProps {
  data: DataProps;
}

const IndexPage: React.FC<IProps> = ({ data }) => {
  return (
    <main>
      <h1>Pokédex</h1>
      {/* TODO: page structure*/}
      {data.allPokemon.nodes.map((pokemon) => (
        <div>{pokemon.name}</div>
      ))}
    </main>
  );
};

export default IndexPage;

export const query = graphql`
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
`;
