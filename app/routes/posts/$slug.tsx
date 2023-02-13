import { useLoaderData } from "@remix-run/react";
import { getClient } from "~/lib/sanity/getClient";
import { config } from "~/lib/sanity/config"
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import { Box, Heading, Image, Link, OrderedList, UnorderedList, ListItem, Text, Button, Input, Stack, Textarea } from "@chakra-ui/react"
import Container from "~/components/container";
import TextContainer from "~/components/textContainer";
import { json } from "@remix-run/node";

export async function loader({ params }: any) {
	const page = await getClient().fetch(
		`*[_type == "post" && slug.current == $slug] { mainImage, title, body, publishedAt, "cats": categories[]->title }`,
		{ slug: params.slug }
  );

  const slug = params.slug;

  if (!page || page.length === 0) throw json({ error: "post not found" }, { status: 404 })

	return { page, slug };
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
  let { page, slug } = useLoaderData();

  const handleSubmit = (e: React.SyntheticEvent | any) => {
    e.preventDefault()

    const form = e.target as typeof e.target & {
      personName: { value: string }
      contribution: { value: string }
      location: { value: string }
    }
    const data = new FormData(form)

    fetch('/valForm.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as any).toString(),
    })
      .then(() => {
        window.location.href = '/success-message/'
      })
      .catch((error) => alert(error))
  }
  
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
          <Heading as='h1' size='2xl' fontFamily="DM Serif Display, serif" lineHeight="1.4" fontWeight="400">{title}</Heading>
          <Box my="4">
              {publishedAt && <Text as="span">{articleDate}</Text>}
          </Box>
        </Container>
        {mainImage && <Image mb="8" htmlWidth="1500" htmlHeight="1000" loading="lazy" src={urlFor(mainImage).width(1500).url()} alt={`image for article: ${title}`} />}
          <TextContainer>
        <PortableText value={body} components={bodyComponents} />
          {slug === 'ode-to-public-sector-planning' && 
          <form 
            name="ode" 
            method="post" 
            data-netlify="true"
            onSubmit={handleSubmit}>
            <Stack spacing={3} maxW="500px">
              <input type='hidden' name='form-name' value='ode' />
              <Input type="text" focusBorderColor='pyyap.500' name="personName" placeholder='Name' />
              <Textarea name="contribution" focusBorderColor='pyyap.500' isRequired placeholder='Contribution to the ode' />
              <Input type="text" focusBorderColor='pyyap.500' name="location" placeholder='Location/where you plan' />
              <Button type="submit" bg='pyyap.500' color="white" variant='solid' _hover={{ bg: 'pyyap.600' }} _active={{ bg: 'pyyap.600' }} _focus={{ bg: 'pyyap.600' }}>Submit</Button>
            </Stack>
          </form>
          }
          </TextContainer>
        </>
	);
}