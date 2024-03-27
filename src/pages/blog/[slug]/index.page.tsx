import React from "react"
import { Text } from "@mantine/core"
import Layout from "~/src/core/layouts/layout"
import { useStringParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"

export const BlogPostPage: BlitzPage = () => {
  const username = useStringParam("username")
  console.log(username)
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text>
          Hello from BlogPost
        </Text>
      </Layout>
    </>
  )
}

export default BlogPostPage