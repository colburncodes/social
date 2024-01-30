import Layout from "~/src/core/layouts/layout"
import { BlitzPage } from "@blitzjs/next"
import { Group } from "@mantine/core"
import React from "react"
import { FeaturesCard } from "~/src/core/components/feature-card/features-card"
import { features } from "~/src/utils/constants"
import classes from "~/src/styles/Home.module.css"

const Home: BlitzPage = () => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Home">
          <Group className={classes.container}>
            <FeaturesCard features={features}/>
          </Group>
      </Layout>
    </>
  )
}

export default Home
