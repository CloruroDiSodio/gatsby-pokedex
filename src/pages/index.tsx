import * as React from 'react';
import type { PageProps } from 'gatsby';
import { graphql, Link } from 'gatsby';
import './index.scss';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

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
      <Grid container spacing={2}>
        {data.allPokemon.nodes.map(({ image, name }) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={name}>
            <Link to={`/${name.toLowerCase()}`} className="card">
              <Card className="card">
                <CardMedia
                  className="card__image"
                  component="img"
                  src={image}
                  title={name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
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
