import { useLoaderData } from "@remix-run/react"
import type { MetaFunction } from "@remix-run/node"
import { getClient } from "~/lib/sanity/getClient"
import { config } from "~/lib/sanity/config"
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import Container from "~/components/container"
import TextContainer from "~/components/textContainer";

import { Box, Button, FormControl, Heading, Image, Input, Link, ListItem, Select, Stack, Text, Textarea, UnorderedList } from '@chakra-ui/react'


export const meta: MetaFunction = () => {
  return {
    description:
      "Contact pinch yourself, you're a planner",
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

export default function Contact() {
  let page = useLoaderData()
  let { body, title } = page[0]

  const handleSubmit = (e: React.SyntheticEvent | any) => {
    e.preventDefault()

    const form = e.target as typeof e.target & {
      name: { value: string }
      email: { value: string }
      message: { value: string }    }
    const data = new FormData(form)

    fetch('/form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as any).toString(),
    })
      .then(() => {
        window.location.href = '/success-message/'
      })
      .catch((error) => alert(error))
  }

  return (
    <>
      <Container>
        <Heading as="h1" fontFamily="DM Serif Display, serif" lineHeight="1.4" fontWeight="400">{title}</Heading>
      </Container>
      <TextContainer>
        <PortableText value={body} components={bodyComponents} />
        <form 
          name="contact" 
          method="post" 
          data-netlify="true"
          onSubmit={handleSubmit}>
          <Stack spacing={3} maxW="500px">
            <input type='hidden' name='form-name' value='contact' />
            <Input type="text" focusBorderColor='pyyap.500' isRequired name="name" placeholder='Name' />
            <Input type="email" focusBorderColor='pyyap.500' name="email" placeholder='Email' />
            <Textarea name="message" focusBorderColor='pyyap.500' isRequired placeholder='Your Message' />
            <Button type="submit" bg='pyyap.500' color="white" variant='solid' _hover={{ bg: 'pyyap.600' }} _active={{ bg: 'pyyap.600' }} _focus={{ bg: 'pyyap.600' }}>Submit</Button>
          </Stack>
        </form>
      </TextContainer>
    </>
  )
}