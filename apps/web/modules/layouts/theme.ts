import { createTheme, Theme } from '@mui/material/styles'

// Version 1: Sky theme
const font = "'poppins', sans-serif"
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: font,
    },
  },
  palette: {
    primary: {
      light: '#8600D6',
      main: '#0a1467',
      dark: '#00003c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b5ffff',
      main: '#80d8ff',
      dark: '#49a7cc',
      contrastText: '#000000',
    },
    grey: {
      50: '#333333',
    },
  },
})

// Version 2: Lavendaer theme
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#463b96',
//       main: '#0a1467',
//       dark: '#00003c',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#f3ffff',
//       main: '#c0d7fc',
//       dark: '#8fa6c9',
//       contrastText: '#000000',
//     },
//   },
// })

// Version 3: Baby blue theme
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#463b96',
//       main: '#0a1467',
//       dark: '#00003c',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#e6ffff',
//       main: '#b3e5fc',
//       dark: '#82b3c9',
//       contrastText: '#000000',
//     },
//   },
// })

// Version 4: Cyan theme
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#463b96',
//       main: '#0a1467',
//       dark: '#00003c',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#b4ffff',
//       main: '#80deea',
//       dark: '#4bacb8',
//       contrastText: '#000000',
//     },
//   },
// })

// Version 5: Turquoise theme (just for fun!)
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#463b96',
//       main: '#0a1467',
//       dark: '#00003c',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#9effff',
//       main: '#64ffda',
//       dark: '#14cba8',
//       contrastText: '#000000',
//     },
//   },
// })

export default theme
