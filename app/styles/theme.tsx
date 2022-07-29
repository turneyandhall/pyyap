import { extendTheme, ChakraProvider } from '@chakra-ui/react'

export const Theme = extendTheme({
    fonts: {
      heading: "roboto, sans-serif",
      body: "roboto, sans-serif",
    },
    fontWeights: {
      hairline: 300,
      thin: 300,
      light: 300,
      normal: 300,
      medium: 500,
      semibold: 500,
      bold: 700,
      extrabold: 900,
      black: 900,
    },
    colors: {
      pyyap: {
        900: "#615c4a",
        800: "#209d50",
        700: "#1e9d50",
        650: "#0d4f26",
        600: "#ff7f50",
        500: "#209d50",
        400: "#E1DFDE",
        300: "#918c79",
        200: "#d9d7d0",
        100: "#edece6",
      },
    },
    styles: {
      global: {
        html: {
          fontSize: "16px",
        },
        body: {
        backgroundColor: "#ff7f50"
        },
        p: {
          margin: '1em 0',
          lineHeight: 'tall', 
        },
        ul: {
          padding: '0 0 0 1em',
        },
        li: {
          marginBottom: '0.5em'
        }
      },
    },
  })