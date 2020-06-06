export const colorScheme = {
  palette: {
    primary: {
      main: '#2b6efa',
      dark: '#0050c8',
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
    },
  },
};

const dark = {
  ...colorScheme,
  palette: {
    ...colorScheme.palette,
    text: {
      primary: '#fff',
    },
    primary: {
      ...colorScheme.palette.primary,
      contrastText: '#000',
    },
    background: {
      paper: '#001629',
    },
  },
};

export default {
  light: colorScheme,
  dark,
};
