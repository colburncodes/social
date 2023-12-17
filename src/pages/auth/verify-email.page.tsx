import React from "react"
import { Text } from "@mantine/core"
import Layout from "~/src/core/layouts/Layout"
import { useStringQueryParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"

export const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text>
          Token is {token}
        </Text>
      </Layout>
    </>
  )
}

export default VerifyEmailPage