import React from 'react';
import { useLocation } from '@reach/router';
import { ButtonGroup, Button } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const location = useLocation();

  // Helper to switch language by replacing the prefix
  const switchLanguage = (lang: string) => {
    const currentPath = location.pathname.replace(/^\/[a-z]{2}/, ''); // Remove existing language prefix
    const newPath = `/${lang}${currentPath}`;
    window.location.href = newPath; // Redirect to new URL
  };

  return (
    <ButtonGroup variant="text" size="small" aria-label="Language switcher">
      <Button onClick={() => switchLanguage('en')}>En</Button>
      <Button onClick={() => switchLanguage('fr')}>Fr</Button>
      <Button onClick={() => switchLanguage('es')}>Es</Button>
    </ButtonGroup>
  );
};

export default LanguageSwitcher;
