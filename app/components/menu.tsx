import { useState } from "react"
import { NavLink } from '@remix-run/react';
import { Box, Flex, GridItem, Icon, Link } from '@chakra-ui/react'
import { TbHome, TbHome2, TbBuildingCommunity, TbBuildingSkyscraper, TbBuildingFactory2, TbBuildingStore } from "react-icons/tb";

export default function Menu() {

  const [building, setBuilding] = useState(0)

  const buildings = [TbHome, TbHome2, TbBuildingCommunity, TbBuildingSkyscraper, TbBuildingFactory2, TbBuildingStore]

  return (
    <GridItem w='100%' h='100vh'>
      <Box pos="fixed" w='60px' h='100vh' bg='gray.100'>
        <Flex pos="absolute" align="center" justify="flex-start" w="100vh" h="60px" px="1.5em" left="60px" transformOrigin="0 0" transform="rotate(90deg)">
          <Link 
            onClick={() => setBuilding(Math.floor(Math.random() * buildings.length))}
            as={NavLink} 
            to="/" 
            p="0.5em"
            transform="rotate(-90deg)"
            fontSize="xl"
            ><Icon as={buildings[building]} /></Link>
          <Link 
            onClick={() => setBuilding(Math.floor(Math.random() * buildings.length))}
            as={NavLink} 
            to="/about" 
            p="0.5em"
            _hover={{
              textDecoration: "none",
              color: "pyyap.600",
            }}
            _activeLink={{
              color: "pyyap.600",
            }}
            >About</Link>
          <Link 
            onClick={() => setBuilding(Math.floor(Math.random() * buildings.length))}
            as={NavLink} 
            to="/posts" 
            p="0.5em"
            _hover={{
              textDecoration: "none",
              color: "pyyap.600",
            }}
            _activeLink={{
              color: "pyyap.600",
            }}
            >Posts</Link>
          <Link 
            onClick={() => setBuilding(Math.floor(Math.random() * buildings.length))}
            as={NavLink} 
            to="/contact" 
            p="0.5em"
            ml="auto"
            _hover={{
              textDecoration: "none",
              color: "pyyap.600",
            }}
            _activeLink={{
              color: "pyyap.600",
            }}
            >Contact</Link>
        </Flex>
      </Box>
    </GridItem>
  )
}