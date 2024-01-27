import Layout from "~/src/core/layouts/layout"
import { BlitzPage } from "@blitzjs/next"
import { Group } from "@mantine/core"
import React from "react"
import { FeaturesCard } from "~/src/core/components/feature-card/features-card"
import { features } from "~/src/utils/constants"


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const Home: BlitzPage = () => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Home">
          <Group style={{ position: "relative", margin: "auto", marginLeft: 50}} w={800} justify={"center"}>
            <FeaturesCard features={features}/>
          </Group>
      </Layout>
    </>
  )
}

export default Home
