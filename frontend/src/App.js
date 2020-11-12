import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import store from './redux/store';
import Routes from './routes';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0275d8',
      contrastText: grey[100],
    },
    secondary: {
      main: grey[100],
    },
  },
  typography: {
    allVariants: {
      color: grey[800],
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
