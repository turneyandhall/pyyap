import { Box } from '@chakra-ui/react'

export default function TextContainer({children}: any) {
  return (
    <Box p={16} maxW="950px">
        {children}
    </Box>
  )
}