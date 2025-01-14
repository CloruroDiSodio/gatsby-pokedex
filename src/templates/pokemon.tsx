import React from 'react';
import { Link, PageProps } from 'gatsby';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { LangData } from './home';
import './pokemon.scss';

interface PageContext {
  image: string;
  language: string;
  langData: LangData[];
}

const PokemonPage: React.FC<PageProps<{}, PageContext>> = ({ pageContext }) => {
  const { image, language, langData } = pageContext;

  const localizedData: LangData | undefined = langData.find(
    (entry) => entry.language === language,
  );

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail__actions">
        <Link to="/" className="pokemon-detail__go-back">
          <Typography>⬅️ Back to homepage</Typography>
        </Link>
        <LanguageSwitcher />
      </div>
      <Card className="card no-hover">
        <CardMedia
          className="card__image"
          component="img"
          src={image}
          title={localizedData?.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {localizedData?.name}
          </Typography>
          <Chip
            size="small"
            label={localizedData?.genus}
            sx={{ marginBottom: '16px' }}
          />
          <Typography component="p">{localizedData?.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonPage;
