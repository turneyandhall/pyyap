import { useState } from "react"
import { NavLink } from '@remix-run/react';
import { Box, Flex, GridItem, Icon, Link } from '@chakra-ui/react'
import { TbHome, TbHome2, TbBuildingCommunity, TbBuildingSkyscraper, TbBuildingFactory2, TbBuildingStore } from "react-icons/tb";

export default function Menu() {

  const [building, setBuilding] = useState(0)

  const buildings = [TbHome, TbHome2, TbBuildingCommunity, TbBuildingSkyscraper, TbBuildingFactory2, TbBuildingStore]

  return (
    <GridItem w='100%' h={{ base: '60px', md: '100vh'}} zIndex='10' position='relative'>
      <Box pos='fixed' w={{ base: '100%', md: '60px'}} h={{ base: '60px', md: '100vh'}} bg='gray.50'>
        <Flex pos="absolute" align="center" justify="flex-start" w={{ base: '100%', md: '100vh'}} h="60px" px={{ base: 2, md: 8}} left={{ base: '0', md: '60px'}} transformOrigin="0 0" transform={{ base: 'rotate(0)', md: 'rotate(90deg)'}}>
          <Link 
            onClick={() => setBuilding(Math.floor(Math.random() * buildings.length))}
            as={NavLink} 
            to="/" 
            p="0.5em"
            transform={{ base: 'rotate(0)', md: 'rotate(-90deg)'}}
            fontSize="xl"
            ><Icon as={buildings[building]} /></Link>
          <Link 
            onClick={() => setBuilding(Math.floor(Math.random() * buildings.length))}
            as={NavLink} 
            to="/about" 
            p="0.5em"
            _hover={{
              textDecoration: "none",
              color: "pyyap.500",
            }}
            _activeLink={{
              color: "pyyap.500",
            }}
            >About</Link>
          <Link 
            onClick={() => setBuilding(Math.floor(Math.random() * buildings.length))}
            as={NavLink} 
            to="/posts" 
            p="0.5em"
            _hover={{
              textDecoration: "none",
              color: "pyyap.500",
            }}
            _activeLink={{
              color: "pyyap.500",
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
              color: "pyyap.500",
            }}
            _activeLink={{
              color: "pyyap.500",
            }}
            >Contact</Link>
        </Flex>
      </Box>
    </GridItem>
  )
}