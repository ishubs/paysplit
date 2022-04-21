import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Routes from './Routes';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
  },
};

/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  );
}
