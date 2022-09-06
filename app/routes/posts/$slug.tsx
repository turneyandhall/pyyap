import { useLoaderData } from "@remix-run/react";
import { getClient } from "~/lib/sanity/getClient";
import { config } from "~/lib/sanity/config"
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import { Box, Heading, Image, Link, OrderedList, UnorderedList, ListItem, Text } from "@chakra-ui/react"
import Container from "~/components/container";
import TextContainer from "~/components/textContainer";

export async function loader({ params }: any) {
	const page = await getClient().fetch(
		`*[_type == "post" && slug.current == $slug] { mainImage, title, body, publishedAt, "cats": categories[]->title }`,
		{ slug: params.slug }
	);

	return { page };
}

const builder = imageUrlBuilder(config)

function urlFor(source: any) {
  return builder.image(source)
}

const bodyComponents = {
    block: {
        normal: ({children}: any) => <Text>{children}</Text>,
        h1: ({children}: any) => <Heading as='h1' size='2xl'>{children}</Heading>,
        h2: ({children}: any) => <Heading as='h2'>{children}</Heading>,
        h3: ({children}: any) => <Heading as='h3'>{children}</Heading>,
        h4: ({children}: any) => <Heading as='h4' size='lg'>{children}</Heading>,
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
            <Link color="cake.700" href={value?.href} target={target}>
              {children}
            </Link>
          )
        },
      },
  }

export default function Page() {
	let { page } = useLoaderData();
    let { mainImage, title, body, publishedAt, cats } = page[0]
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
          <Heading as='h1' size='2xl' fontWeight={900}>{title}</Heading>
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