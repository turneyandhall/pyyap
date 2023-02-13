import type { MetaFunction } from "@remix-run/node";
import TextContainer from "~/components/textContainer";
import { Box, Heading, } from '@chakra-ui/react'


export const meta: MetaFunction = () => {
  return {
    description:
      "Pyyap form success message",
  }
}


export default function SuccessMessage() {
  return (
    <Box bg="pyyap.500" minH="100vh">
        <TextContainer>
            <Heading as='h2' color="white" fontFamily="DM Serif Display, serif" lineHeight="1.4" fontWeight="400">Thank you!</Heading>
        </TextContainer>
    </Box>

  )
}
