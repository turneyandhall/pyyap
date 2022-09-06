import { Box } from '@chakra-ui/react'

export default function TextContainer({children}: any) {
  return (
    <Box p={{ base: 8, md: 16}} maxW="950px">
        {children}
    </Box>
  )
}