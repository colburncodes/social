import React from "react"
import { Card, Group, Stack, Text, Title } from "@mantine/core"
import { useStringQueryParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import getUserEmailSettingsForUnsubscribe from "~/src/features/users/queries/getUserEmailSettingsForUnsubscribe"
import { useQuery } from "@blitzjs/rpc"
import Layout from "../core/layouts/layout"
import { ToggleUserSettings } from "~/src/core/components/toggle-user-settings"
import { UserEmailSettings } from "~/src/pages/settings/components/user-email-settings"

export const UnsubScribePage: BlitzPage = () => {
  const token = useStringQueryParam("token")

  const [user] = useQuery(getUserEmailSettingsForUnsubscribe, {
    token: token as string
  })
  console.log(token)
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title={"Unsubscribe"}>
        <Text>
          <Group ml={10}>
            <Stack>
              <Title order={4}>Email Settings</Title>
                <Card withBorder={true}>
                  <ToggleUserSettings
                    // disabled={isLoading}
                    // onToggle={handleToggle("settingsEmailMarketing", user?.settings[0]?.settingsEmailMarketing)}
                    checked={user?.settings[0]?.settingsEmailMarketing}
                    label={"Marketing emails"}
                    description={"Receive emails about new products, features, and more."}
                />
              </Card>
              <Card withBorder={true}>
                <ToggleUserSettings
                  // disabled={isLoading}
                  // onToggle={handleToggle("settingsEmailProduct", user?.settings[0]?.settingsEmailProduct)}
                  checked={user?.settings[0]?.settingsEmailProduct}
                  label={"Product emails"}
                  description={"Want to learn more about the latest product updates, get notified now."}
                />
              </Card>
            </Stack>
          </Group>
        </Text>
      </Layout>
    </>
  )
}

export default UnsubScribePage