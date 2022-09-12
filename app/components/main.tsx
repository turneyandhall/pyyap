import { Outlet, Link } from '@remix-run/react';
import { Box, GridItem, Show } from '@chakra-ui/react'

export default function Menu() {
  return (
    <GridItem w='100%' pos="relative">
      <Outlet />
    </GridItem>
  )
}