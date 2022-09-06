import { useLoaderData, Link } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node";
import { getClient } from "~/lib/sanity/getClient";
import { config } from "~/lib/sanity/config"
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import TextContainer from "~/components/textContainer";
import { Box, Heading, Highlight, Image, Link as PLink, ListItem, Text, UnorderedList } from '@chakra-ui/react'


export const meta: MetaFunction = () => {
  return {
    description:
      "Welcome to the pinch yourself you're a planner website",
  }
}

export async function loader() {
	const page = await getClient().fetch(
		`*[_type == "home"]{ body }`,
	)
  const posts = await getClient().fetch(
		`*[_type == "post"] | order(dateTime(publishedAt) desc) {
        _id, 
        title, 
        slug, 
        publishedAt, 
        "cats": categories[]->title
      }`,
	)

	return { page, posts }
}

const builder = imageUrlBuilder(config)

function urlFor(source: any) {
  return builder.image(source)
}

const SampleImageComponent = ({value}: any) => {
  return (
    <Image loading="lazy" src={urlFor(value).width(1500).url()} w="100%" h="100%" align="0 30%" objectFit='cover' alt='page image header' />
  )
}

const bodyComponents = {
  block: {
      normal: ({children}: any) => <Text>{children}</Text>,
      h1: ({children}: any) => <Heading as='h1' color="white" size='2xl'>{children}</Heading>,
      h2: ({children}: any) => <Heading as='h2' color="white" lineHeight="1.4">{children}</Heading>,
      h3: ({children}: any) => <Heading as='h3'color="white" >{children}</Heading>,
      h4: ({children}: any) => <Heading as='h4' color="white" mt="16">{children}</Heading>,
      p: ({children}: any) => <Text>{children}</Text>,
  },
  list: {
      bullet: ({children}: any) => <UnorderedList>{children}</UnorderedList>,
  },
  listItem: {
      bullet: ({children}: any) => <ListItem>{children}</ListItem>,
  },
  marks: {
      link: ({value, children}: any) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <PLink color="cake.700" href={value?.href} target={target}>
            {children}
          </PLink>
        )
      },
    },
    types: {
      image: SampleImageComponent,
    },
}

export default function Index() {
  let { page, posts } = useLoaderData()
  let { body } = page[0]
  return (
    <>
      <Box bg="pyyap.500" h="75vh">
        <TextContainer>
          <PortableText value={body} components={bodyComponents} />
        </TextContainer>
      </Box>
      <TextContainer>
      {posts?.length > 0
				? posts.map((post: {_id: number, slug: {current: string}, title: string, publishedAt: any, cats: any, catSlug: any}) => (
            <Box key={post._id}>
              {post.cats && 
                post.cats.map((c: string, i: number) => (
                  <Heading as="h4" size='md' key="c">{c}</Heading>
                  ))
              }
							<Link to={'posts/'+post.slug.current}>
              <Heading as="h3" size='lg'>{post.title}</Heading>
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
      </TextContainer>
    </>
  )
}
