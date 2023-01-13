import { LoaderFunction, Response } from "@remix-run/node";
import { getClient } from "~/lib/sanity/getClient";

export const loader: LoaderFunction = async ({ request }) => {

  const posts = await getClient().fetch(
		`*[_type == "post"] | order(dateTime(publishedAt) desc) {
        _id, 
        slug, 
        publishedAt, 
      }`,
  )
  
  console.log(posts[2].publishedAt)

  return new Response(pyyapXML(posts), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
    },
  });
};

const pyyapXML = (posts: { slug: { current?: string }, publishedAt: Date }[]) => {
  const getXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://pyyap.com/</loc>
      <lastmod>2022-09-26T01:00:00+00:00</lastmod>
    </url>
    <url>
      <loc>https://pyyap.com/about</loc>
      <lastmod>2022-09-26T01:00:00+00:00</lastmod>
    </url>
    <url>
      <loc>https://pyyap.com/contact</loc>
      <lastmod>2022-09-26T01:00:00+00:00</lastmod>
    </url>
    <url>
      <loc>https://pyyap.com/posts</loc>
      <lastmod>2022-09-26T01:00:00+00:00</lastmod>
    </url>
  ${posts.filter(Boolean).map((item) => `
    <url>
      <loc>https://pyyap.com/posts/${item.slug.current}</loc>
      <lastmod>${item.publishedAt}</lastmod>
    </url>`)}
  </urlset>`

  return getXML
  
}


