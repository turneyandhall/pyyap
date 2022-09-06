import { useLoaderData } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import { getClient } from "~/lib/sanity/getClient"
import { config } from "~/lib/sanity/config"
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import Container from "~/components/container"
import TextContainer from "~/components/textContainer";

import { Heading, Image, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react'


export const meta: MetaFunction = () => {
  return {
    description:
      "Welcome to the pinch yourself you're a planner website",
  }
}

export async function loader() {
	const page = await getClient().fetch(
		`*[_type == "contact"]{ body, title }`
	)

	return page
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
          <Link color="cake.700" href={value?.href} target={target}>
            {children}
          </Link>
        )
      },
    },
    types: {
      image: SampleImageComponent,
    },
}

export default function Contact() {
  let page = useLoaderData()
  let { body, title } = page[0]
  return (
    <>
      <Container>
        <Heading as="h1">{title}</Heading>
      </Container>
      <TextContainer>
        <PortableText value={body} components={bodyComponents} />
      </TextContainer>
    </>
  )
}