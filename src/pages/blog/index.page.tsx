import React from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"
import { Card, Image, Text, Group, Title, Divider } from "@mantine/core"
import { allPosts, Post } from 'contentlayer/generated'
import { compareDesc } from "date-fns"
import Link from "next/link"
import { MagicGrid } from "~/src/core/components/magic-grid"
import { formatDate } from "~/src/utils/utils"

type BlogPageProps = {
  posts: Post[]
}
export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

const BlogPostCard = (post: Post) => {
  const formattedDate = formatDate(post.date)
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
            alt={`Preview image for ${post.title}`}
          />
        </Card.Section>
      )}

      <Group justify="space-between" mt="sm" mb="xs">
        <Text fw={500}>{post.title}</Text>
        {/*<Badge color="pink">On Sale</Badge>*/}
      </Group>

      <Text size="sm">
        {post.description}
      </Text>

      <Text mt={5} size="sm" c="dimmed">
        {formattedDate}
      </Text>
    </Card>
  );
}

export const BlogPage: BlitzPage<BlogPageProps> = ({ posts }) => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Title>
          <Text size={"xl"} fw={"bolder"}>Blog</Text>
        </Title>
        <Text c={"rgb(136 142 150)"}>
          A blog built using Contentlayer. Posts are written in MDX
        </Text>
        <Divider my={"sx"} w={500}/>
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