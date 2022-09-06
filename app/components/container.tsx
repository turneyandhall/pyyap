import { Box } from '@chakra-ui/react'

export default function Container({children}: any) {
  return (
    <Box p={16}>
        {children}
    </Box>
  )
}