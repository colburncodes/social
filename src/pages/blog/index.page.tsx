import React from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"
import { Card, Image, Text, Group } from "@mantine/core"
import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc } from "date-fns"
import Link from "next/link"
import { MagicGrid } from "~/src/core/components/magic-grid"


export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

const BlogPostCard = (post: Post) => {
  return (
    <Card
      component={Link}
      href={Routes.BlogPostPage({
      slug: post.slug
    })} w={"100%"} shadow="sm" padding="lg" radius="md" withBorder>

      {post.image && (
        <Card.Section component="a" href="https://mantine.dev/">
          <Image
            src={post.image}
            h={200}
            alt={`Preview image for ${post.title}`}
          />
        </Card.Section>
      )}

      <Group justify="space-between" mt="sm" mb="xs">
        <Text fw={500}>{post.title}</Text>
        {/*<Badge color="pink">On Sale</Badge>*/}
      </Group>

      <Text h={200} size="sm" c="dimmed">
        {post.body.raw}
      </Text>
    </Card>
  );
}

export const BlogPage: BlitzPage = ({ posts }: Post) => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <MagicGrid>
          {posts.map((post: any) => (
            <BlogPostCard key={post.slug} {...post} />
          ))}
        </MagicGrid>
      </Layout>
    </>
  )
}

export default BlogPage