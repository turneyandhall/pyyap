import { Grid } from '@chakra-ui/react'

export default function Site({children}: any) {
  return (
    <Grid templateColumns='60px auto' gap={0}>
      {children}
    </Grid>
  )
}