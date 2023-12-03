import React from "react"
import { Text } from "@mantine/core"
import Layout from "~/src/core/layouts/Layout"
import { useStringParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import { ContactCard } from "~/src/core/components/Contact/ContactCard"

export const ContactPage: BlitzPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text>
          <ContactCard/>
        </Text>
      </Layout>
    </>
  )
}

export default ContactPage