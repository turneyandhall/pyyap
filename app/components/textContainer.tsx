import { Box } from '@chakra-ui/react'

export default function TextContainer({children}: any) {
  return (
    <Box px={{ base: 4, md: 16}} py={{ base: 8, md: 16}} maxW="950px">
        {children}
    </Box>
  )
}