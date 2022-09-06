import { Outlet } from '@remix-run/react';
import { GridItem } from '@chakra-ui/react'

export default function Menu() {
  return (
    <GridItem w='100%'>
      <Outlet />
    </GridItem>
  )
}