import React, { useEffect, useState } from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import LanguageSwitcher from '../components/LanguageSwitcher';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Pagination,
  TextField,
  Fab,
} from '@mui/material';
import './home.scss';

interface HomePageContext {
  language: string;
}

interface PokemonNode {
  id: string;
  name: string;
  image: string;
  langData: LangData[];
}

export interface LangData {
  name: string;
  description: string;
  genus: string;
  language: string;
}

interface IHome extends PageProps {
  pageContext: HomePageContext;
  data: {
    allPokemon: {
      nodes: PokemonNode[];
    };
  };
}

const Home: React.FC<IHome> = ({ data, pageContext }) => {
  const { language } = pageContext;
  const pokemonList = data.allPokemon.nodes;
  const [filteredList, setFilteredList] = useState(pokemonList);
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20; // Number of items per page

  useEffect(() => {
    let list = [...pokemonList];
    list = list.filter((pokemon) => {
      const localizedName =
        pokemon.langData.find((entry) => entry.language === language)?.name ||
        pokemon.name;
      return localizedName.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredList(list);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [value, language, pokemonList]);

  // Calculate the paginated list for the current page
  const paginatedList = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const backToTop = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <div className="home">
      <div className="home__title">
        <Typography gutterBottom variant="h2" component="div">
          Pokèdex
        </Typography>
        <LanguageSwitcher />
      </div>
      <TextField
        sx={{
          marginBottom: '28px',
          marginTop: 1,
          backgroundColor: '#fff',
          width: '100%',
        }}
        id="search"
        label="Search your pokemon"
        variant="outlined"
        onChange={(e) => setValue(e.target.value)}
      />
      {filteredList.length === 0 && <Typography>No match found</Typography>}
      <Grid container spacing={2} sx={{ paddingBottom: 7 }}>
        {paginatedList.map((pokemon: PokemonNode) => {
          const localizedName =
            pokemon.langData.find((entry) => entry.language === language)
              ?.name || pokemon.name;
          return (
            <Grid item xs={12} sm={6} md={4} lg={2} key={pokemon.id}>
              <Link
                to={`/${language}/${pokemon.name.toLowerCase()}`}
                className="card"
              >
                <Card className="card">
                  <CardMedia
                    className="card__image"
                    component="img"
                    src={pokemon.image}
                    title={pokemon.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {localizedName}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      {filteredList.length > 0 && (
        <div className="home__pagination-container">
          <Pagination
            className="home__pagination"
            color="primary"
            count={Math.ceil(filteredList.length / pageSize)}
            size="small"
            page={currentPage}
            onChange={(e, p) => {
              backToTop();
              setCurrentPage(p);
            }}
          />
        </div>
      )}
      <Fab
        size="small"
        onClick={() => backToTop()}
        className="home__back-to-top"
      >
        🔝
      </Fab>
    </div>
  );
};

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
        }
      }
    }
  }
`;

export default Home;
