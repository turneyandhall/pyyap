import { extendTheme, ChakraProvider } from '@chakra-ui/react'

export const Theme = extendTheme({
    fonts: {
      heading: "'DM Sans', sans-serif",
      body: "'DM Sans', sans-serif",
    },
    fontWeights: {
      hairline: 400,
      thin: 400,
      light: 400,
      normal: 400,
      medium: 400,
      semibold: 400,
      bold: 700,
      extrabold: 700,
      black: 700,
    },
    colors: {
      pyyap: {
        900: "#615c4a",
        800: "#209d50",
        700: "#1e9d50",
        650: "#0d4f26",
        600: "#009A17",
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
        backgroundColor: "gray.50",
        overscrollBehavior: "none",
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