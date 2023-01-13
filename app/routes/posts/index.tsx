import { useLoaderData } from "@remix-run/react";
import { getClient } from "~/lib/sanity/getClient";
import { config } from "~/lib/sanity/config"
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import { Box, Heading, Image, Link, OrderedList, UnorderedList, ListItem, Text } from "@chakra-ui/react"
import Container from "~/components/container";
import TextContainer from "~/components/textContainer";

export async function loader() {
	const page = await getClient().fetch(
		`*[_type == "post"] | order(_createdAt desc)[0] { mainImage, title, body, publishedAt, "cats": categories[]->title }`,
	);

	return { page };
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

const Acast = ({value}: any) => {
  return (
    <Box className="acast-embed" overflow="hidden">
      <iframe
        src={value.url}
        frameBorder="0" 
        width="100%" 
        height="110px"
      />
  </Box>
  )
}

const bodyComponents = {
    block: {
      normal: ({children}: any) => <Text>{children}</Text>,
      h1: ({children}: any) => <Heading as='h1' size='2xl' lineHeight="1.4">{children}</Heading>,
      h2: ({children}: any) => <Heading as='h2' lineHeight="1.4">{children}</Heading>,
      h3: ({children}: any) => <Heading as='h3' lineHeight="1.4">{children}</Heading>,
      h4: ({children}: any) => <Heading as='h4' size='md' lineHeight="1.6">{children}</Heading>,
    },
    list: {
      bullet: ({children}: any) => <UnorderedList>{children}</UnorderedList>,
      number: ({children}: any) => <OrderedList>{children}</OrderedList>,
    },
    listItem: {
      bullet: ({children}: any) => <ListItem>{children}</ListItem>,
      number: ({children}: any) => <ListItem>{children}</ListItem>,
    },
    marks: {
      link: ({value, children}: any) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <Link color="pyyap.500" href={value?.href} target={target}>
            {children}
          </Link>
        )
      },
    },
    types: {
      image: SampleImageComponent,
      acast: Acast
    },
  }

export default function Page() {
	let { page } = useLoaderData();
    let { mainImage, title, body, publishedAt, cats } = page
	const day = new Date(publishedAt).toLocaleString("en-US", { day : 'numeric'})
	const month = new Date(publishedAt).toLocaleString("en-US", { month: "short" })
	const year = new Date(publishedAt).getFullYear()
	const articleDate = day+' '+month+' '+year+' '

	return (
        <>
        <Container>
        {cats && 
            cats.map((c: string, i: number) => (
              <Heading as="h4" size='md' key="c">{c}</Heading>
              ))
          }
          <Heading as='h1' size='2xl' fontFamily="DM Serif Display, serif" lineHeight="1.4" fontWeight="400">{title}</Heading>
          <Box my="4">
              {publishedAt && <Text as="span">{articleDate}</Text>}
          </Box>
        </Container>
        {mainImage && <Image mb="8" htmlWidth="1500" htmlHeight="1000" loading="lazy" src={urlFor(mainImage).width(1500).url()} alt={`image for article: ${title}`} />}
          <TextContainer>
            <PortableText value={body} components={bodyComponents} />
          </TextContainer>
        </>
	);
}