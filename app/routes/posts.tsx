import { useLoaderData, Link, Outlet } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node";
import { getClient } from "~/lib/sanity/getClient";
import { Box, Flex, Grid, Heading, Icon, Text, useMediaQuery } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { TbArrowRampLeft3, TbArrowRampRight3 } from "react-icons/tb";


export const meta: MetaFunction = () => {
  return {
    description:
      "All the pinch yourself, you're a planner posts",
  }
}

export async function loader({ params }: any) {
  const posts = await getClient().fetch(
		`*[_type == "post"] | order(dateTime(publishedAt) desc) {
        _id, 
        title, 
        slug, 
        publishedAt, 
        "cats": categories[]->title
      }`,
	)
	return {posts, params}
}

export default function Posts() {
  
  let { posts, params } = useLoaderData()

  const [mobileOpen, setMobileOpen] = useState(false)

  const [isLarge] = useMediaQuery('(min-width: 48em)')

  useEffect(() => {
    params.slug ? null : setMobileOpen(true)
  }, [])

  return (
    <>
      <Grid templateColumns={{ base: '1fr', md: `${mobileOpen ? '20em' : '30px' } 1fr` }} gap='0' transition='0.2s grid-template-columns ease-in-out'>
        <Box
          pos={{ base: 'fixed', md: 'sticky' }}
          top={{ base: '60px', md: '0' }}
          h={{ base: 'calc(100vh - 60px)', md: '100vh' }}
          w={{ base: `${mobileOpen ? '20em' : '30px' }`, md: 'auto' }}
          overflow='hidden'
          bg='pyyap.500'
          color='white'
          transition='0.2s width ease-in-out'
        >
          <Box pl='16' py='16' pr='0' w='20em'>
            <Heading as="h1" fontFamily="DM Serif Display, serif" lineHeight="1.4" fontWeight="400">Posts</Heading>
          </Box>
          <Flex
            onClick={() => setMobileOpen(!mobileOpen)}
            position='absolute'
            h='100vh'
            w='30px'
            left='0'
            top="0"
            direction='column'
            align='center'
            justify='space-around'
            cursor='pointer'
          >
            { mobileOpen ? <Icon as={TbArrowRampLeft3} /> : <Icon as={TbArrowRampRight3} /> }
            <Text
              as='b'
              transform='rotate(90deg)'
              whiteSpace='nowrap'
              fontSize='xs'
              userSelect='none'
            >
              All Posts
            </Text>
            { mobileOpen ? <Icon as={TbArrowRampLeft3} /> : <Icon as={TbArrowRampRight3} /> }
          </Flex>
          <Box pl='16' py='16' pr='2' h='100%' overflow='scroll' pb='190px' w='20em'>

          {posts?.length > 0
          ? posts.map((post: {_id: number, slug: {current: string}, title: string, publishedAt: any, cats: any, catSlug: any}) => (
              <Box key={post._id} mb={8}>
                {post.cats && 
                  post.cats.map((c: string, i: number) => (
                    <Heading as="h4" size='sm' key="c">{c}</Heading>
                    ))
                }
              <Link
                to={post.slug.current}
                onClick={ () => {isLarge ? null : setMobileOpen(!mobileOpen)}}
              >
                <Heading as="h3" size='lg' fontFamily="DM Serif Display, serif" lineHeight="1.1" fontWeight="400">{post.title}</Heading>
                  {post.publishedAt && 
                  <Text my="0" fontWeight={500}>
                    {new Date(post.publishedAt).toLocaleString("en-US", { day : 'numeric'})}
                    {' '}
                    {new Date(post.publishedAt).toLocaleString("en-US", { month: "short" })}
                    {' '}
                    {new Date(post.publishedAt).getFullYear()}
                  </Text>
                  }
                </Link>
              </Box>
            ))
            : null}
          </Box>
        </Box>
        <Box pl={{ base: '30px', md: '0' }} >
          <Outlet />
        </Box>
        
      </Grid>

    </>
  )
}
