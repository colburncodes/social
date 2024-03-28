import React from "react"
import { Text } from "@mantine/core"
import { useStringParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"

export const BlogPage: BlitzPage = () => {
  const username = useStringParam("username")
  console.log(username)
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text>
          Hello from Blog
        </Text>
      </Layout>
    </>
  )
}

export default BlogPage