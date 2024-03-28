import React from "react"
import { Title } from "@mantine/core"
import Layout from "~/src/core/layouts/layout"
import { useStringParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"

export const BlogPostPage: BlitzPage = () => {
  const slug = useStringParam("slug")

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Title>
          {slug}
        </Title>
      </Layout>
    </>
  )
}

export default BlogPostPage