import { useLoaderData, Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node";
import { getClient } from "~/lib/sanity/getClient";
import Container from "~/components/container";
import { Box, Heading, Image, Link as PLink, ListItem, Text, UnorderedList } from '@chakra-ui/react'


export const meta: MetaFunction = () => {
  return {
    description:
      "All the posts",
  }
}

export async function loader() {
  const posts = await getClient().fetch(
		`*[_type == "post"] | order(dateTime(publishedAt) desc) {
        _id, 
        title, 
        slug, 
        publishedAt, 
        "cats": categories[]->title
      }`,
	)
	return posts
}

export default function Index() {
  let posts = useLoaderData()
  return (
    <>
      <Container>
        <Heading as="h1" fontFamily="DM Serif Display, serif" lineHeight="1.4" fontWeight="400">Posts</Heading>
      </Container>
      <Container>
      {posts?.length > 0
				? posts.map((post: {_id: number, slug: {current: string}, title: string, publishedAt: any, cats: any, catSlug: any}) => (
            <Box key={post._id} mb={8}>
              {post.cats && 
                post.cats.map((c: string, i: number) => (
                  <Heading as="h4" size='sm' key="c">{c}</Heading>
                  ))
              }
							<Link to={post.slug.current}>
              <Heading as="h3" size='lg' fontFamily="DM Serif Display, serif" lineHeight="1.4" fontWeight="400">{post.title}</Heading>
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
      </Container>
    </>
  )
}
