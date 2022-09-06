import { Box } from '@chakra-ui/react'

export default function Container({children}: any) {
  return (
    <Box px={{ base: 4, md: 16}} py={{ base: 8, md: 16}}>
        {children}
    </Box>
  )
}