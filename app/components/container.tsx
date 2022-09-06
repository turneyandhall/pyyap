import { Box } from '@chakra-ui/react'

export default function Container({children}: any) {
  return (
    <Box p={{ base: 8, md: 16}}>
        {children}
    </Box>
  )
}