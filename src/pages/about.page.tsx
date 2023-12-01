import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Stack, Text } from "@mantine/core"


export const About = () => {
  return (
    <Stack>
      <Text>
        About Page
      </Text>
    </Stack>
  )
}
const AboutPage: BlitzPage = () => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <About/>
      </Layout>
    </>
  )
}

export default AboutPage
