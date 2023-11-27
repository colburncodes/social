import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"

const AboutPage: BlitzPage = () => {
  {/* @ts-expect-error Server Component */}
  return <Layout>About Page</Layout>
}

AboutPage.authenticate = true;

export default AboutPage
