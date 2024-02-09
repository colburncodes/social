import Layout from "~/src/core/layouts/layout"
import { BlitzPage } from "@blitzjs/next"
import { Button, Group } from "@mantine/core"
import React from "react"
import { FeaturesCard } from "~/src/core/components/feature-card/features-card"
import { features } from "~/src/utils/constants"
import classes from "~/src/styles/Home.module.css"
import { useMutation } from "@blitzjs/rpc"
import sendDummyEmail from "~/src/features/users/mutations/sendDummyEmail"

const Home: BlitzPage = () => {

  const [$sendEmail] = useMutation(sendDummyEmail)

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Home">
        <Button onClick={async() => {
          await $sendEmail({})
        }} color={"bright-pink"}>Send dummy email</Button>
          <Group className={classes.container}>
            <FeaturesCard features={features}/>
          </Group>
      </Layout>
    </>
  )
}

export default Home
