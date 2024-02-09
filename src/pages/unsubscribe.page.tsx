import React from "react"
import { Text } from "@mantine/core"
import { useStringQueryParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import getUserEmailSettingsForUnsubscribe from "~/src/features/users/queries/getUserEmailSettingsForUnsubscribe"
import { useQuery } from "@blitzjs/rpc"
import Layout from "../core/layouts/layout"

export const UnsubScribePage: BlitzPage = () => {
  const token = useStringQueryParam("token")

  const [settings] = useQuery(getUserEmailSettingsForUnsubscribe, {
    token: token as string
  })
  console.log(token)
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title={"Unsubscribe"}>
        <Text>
          Hello from unsubscribe {token}
        </Text>
      </Layout>
    </>
  )
}

export default UnsubScribePage