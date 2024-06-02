import React from "react"
import { Group, Title, Text, Box, Card, Image } from "@mantine/core"
import Layout from "~/src/core/layouts/layout"
import { formatDate, useStringParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import { allPosts } from "contentlayer/generated"
// @ts-ignore
import { MdxRender } from "~/src/core/components/mdx-render"



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

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text c={"dimmed"}>{formattedDate}</Text>
        <Title>
          {post.title}
        </Title>
        <Card ml={70} w={500} h={"100%"}withBorder>
          {post.image && (
              <Image
                height={500}
                radius={"md"}
                fit={"contain"}
                src={post.image}
                alt={`Preview image for ${post.title}`}
                mt={40}
              />
          )}
        </Card>

        <Card w={700}>
          <Group justify="center" mb={4}>
            <MdxRender post={post}/>
          </Group>
        </Card>
      </Layout>
    </>
  )
}

export default BlogPostPage