import React from "react"
import { Group, Title, Text } from "@mantine/core"
import Layout from "~/src/core/layouts/layout"
import { useStringParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import { useMDXComponent } from "next-contentlayer/hooks"
// @ts-ignore
import { mdxComponents } from "~/src/core/components/magic-grid"
import { allPosts } from "contentlayer/generated"

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

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Title>
          {post.title}
          <MDXContent components={mdxComponents}/>
        </Title>
      </Layout>
    </>
  )
}

export default BlogPostPage