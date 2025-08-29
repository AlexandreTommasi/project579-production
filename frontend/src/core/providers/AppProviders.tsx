import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { GlobalStyles, theme } from '@/shared/styles';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;
