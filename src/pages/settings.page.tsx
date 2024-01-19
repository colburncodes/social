import React from "react"
import { Text } from "@mantine/core"
import Layout from "~/src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"

export const SettingsPage: BlitzPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text>
          Hello from Settings
        </Text>
      </Layout>
    </>
  )
}

export default SettingsPage