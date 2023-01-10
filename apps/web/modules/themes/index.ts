import { createTheme, DeprecatedThemeOptions, adaptV4Theme } from '@mui/material/styles';

const primary = {
  light: '#C9C9C9',
  main: '#10014E',
  dark: '#10014E',
  contrastText: '#fff',
}

const secondary = {
  light: '#51678b',
  main: '#243d5e',
  dark: '#001734',
  contrastText: '#fff',
}

const light: DeprecatedThemeOptions = {
  typography: {
    fontFamily: ['Work Sans', 'sans-serif'].join(','),
  },
  palette: {
    primary,
    secondary,
  },
  overrides: {
    MuiTableCell: {
      head: {
        backgroundColor: '#C6EEFD',
      },
    },
  },
}

export const lightTheme = createTheme(adaptV4Theme(light))
