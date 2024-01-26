import React from "react"
import { Text } from "@mantine/core"
import Layout from "~/src/core/layouts/layout"
import { useStringQueryParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import verifyUserToken from "~/src/features/auth/queries/verifyUserToken"

export const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  const [result, { isSuccess, error }] = useQuery(verifyUserToken, {
    token: token as any
  }, {
    enabled: !!token
  })

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        {result && isSuccess && (<Text>Email Verified!</Text>)}
        {error && <Text>Invalid Token!</Text>}
      </Layout>
    </>
  )
}

export default VerifyEmailPage