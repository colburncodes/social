import React from "react"
import { Group, Title, Text, Box, Card, Image } from "@mantine/core"
import Layout from "~/src/core/layouts/layout"
import { formatDate, useStringParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import { useMDXComponent } from "next-contentlayer/hooks"
import { allPosts } from "contentlayer/generated"
// @ts-ignore
import { mdxComponents } from "~/src/core/components/magic-grid"



export const BlogPostPage: BlitzPage = () => {
  const slug = useStringParam("slug")
  const post = allPosts.find((post) => post.slug === slug)

  if(!post) {
    return(
      <>
        {/* @ts-expect-error Server Component */}
        <Layout>
          <Group>
            <Title>Post not found</Title>
            <Text>Post with slug {slug} not found</Text>
          </Group>
        </Layout>
      </>
    )
  }
  const formattedDate = formatDate(post.date)
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text c={"dimmed"}>{formattedDate}</Text>
        <Title>
          {post.title}
        </Title>
        <Card>
          {post.image && (
            <Card.Section component="a" href="https://mantine.dev/" mr={100}>
              <Image
                height={500}
                width={"auto"}
                radius={"md"}
                fit={"contain"}
                src={post.image}
                alt={`Preview image for ${post.title}`}
                mt={40}
              />
            </Card.Section>
          )}
        </Card>

        <Card w={700}>
          <Group justify="center" mb={4}>
            <MDXContent components={mdxComponents}/>
          </Group>
        </Card>
      </Layout>
    </>
  )
}

export default BlogPostPage