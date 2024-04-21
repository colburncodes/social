import { BlitzPage } from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"
import { Title, Text } from "@mantine/core"


export const PricingPage: BlitzPage = () => {
  return(
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Title order={1}>
          Simple, transparent pricing
        </Title>
        <Text size={"md"} c={"rgb(136 142 150)"}>Unlock all features including unlimited posts for your blog.</Text>
      </Layout>
    </>
  )
}

export default PricingPage