import Layout from "~/src/core/layouts/layout"
import { BlitzPage } from "@blitzjs/next"
import { Group } from "@mantine/core"
import React from "react"
import { TestCard } from "~/src/core/components/feature-card/test-card"
import { mockdata } from "~/src/utils/constants"


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const Home: BlitzPage = () => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Home">
          <Group style={{ position: "relative"}} w={800} justify={"center"}>
            <TestCard features={mockdata}/>
          </Group>
      </Layout>
    </>
  )
}

export default Home
