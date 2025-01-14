import React, { useEffect } from 'react';
import { navigate, PageProps } from 'gatsby';
import './index.scss';

const IndexPage: React.FC<PageProps> = ({}: any) => {
  useEffect(() => {
    const browserLang = navigator.language.startsWith('fr')
      ? 'fr'
      : navigator.language.startsWith('es')
        ? 'es'
        : 'en';
    navigate(`/${browserLang}/`);
  }, []);

  return <p>Redirecting...</p>;
};

export default IndexPage;
