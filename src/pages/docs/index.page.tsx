import React from "react"
import { Divider, Text, Title } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"

export const DocumentationPage: BlitzPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Title order={1}>
          Documentation
        </Title>
        <Text size={"md"} c={"rgb(136 142 150)"}>Welcome to the Social documentation.</Text>
        <Divider my={"sx"} w={500}/>
      </Layout>
    </>
  )
}

export default DocumentationPage