import React from "react"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { allPosts } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from "date-fns"
import Link from "next/link"
import Head from "next/head"


export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}



const BlogPostCard = (post) => {
  const truncatedBody = post.body.raw.split(' ').slice(0, 200).join(' ')
  return (
    <Card w={400} component={Link} href={Routes.BlogPage({
      slug: post.slug
    })} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{post.title}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {truncatedBody}
      </Text>
    </Card>
  );
}

export const BlogPage: BlitzPage = ({posts}) => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <Head>
            <title>Contentlayer Blog Example</title>
          </Head>
          {posts.map((post, idx) => (
            <BlogPostCard key={idx} {...post} />
          ))}
        </div>
      </Layout>
    </>
  )
}

export default BlogPage