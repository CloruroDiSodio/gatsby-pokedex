import React, { useEffect } from 'react';
import { navigate, PageProps } from 'gatsby';
import './index.scss';
import { CircularProgress, Paper } from '@mui/material';

const IndexPage: React.FC<PageProps> = ({}: any) => {
  useEffect(() => {
    const browserLang = navigator.language.startsWith('fr')
      ? 'fr'
      : navigator.language.startsWith('es')
        ? 'es'
        : 'en';
    navigate(`/${browserLang}/`);
  }, []);

  return (
    <div className="redirecting">
      <Paper
        sx={{
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ marginBottom: '8px' }} />
        Redirecting...
      </Paper>
    </div>
  );
};

export default IndexPage;
