import React from "react"
import { Card, Group, Stack, Switch, Text, Title } from "@mantine/core"
import { useStringQueryParam } from "~/src/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import getUserEmailSettingsForUnsubscribe from "~/src/features/users/queries/getUserEmailSettingsForUnsubscribe"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Layout from "../core/layouts/layout"
import setUserEmailSettingsForUnsubscribe from "~/src/features/users/mutations/setUserEmailSettingsForUnsubscribe"


export const ToggleUserUnsubscribeSettings =
  ({disabled = false, checked, label, description, settings, token, setting }) => {
  const [$setUserSetting, { isLoading }] = useMutation(setUserEmailSettingsForUnsubscribe)

  return(
    <Stack mt={10}>
      <Switch
        disabled={disabled}
        onClick={async (event) => {
          const newVal = event.currentTarget.checked;
          await $setUserSetting({
            key: setting,
            value: newVal,
            token
          })
        }}
        checked={checked}
        label={label}
        color="gray"
      />
      <Text size={"xs"}>{description}</Text>
    </Stack>
  )
}

export const UnsubScribePage: BlitzPage = () => {
  const token = useStringQueryParam("token")

  const [user] = useQuery(getUserEmailSettingsForUnsubscribe, {
    token: token as string
  })

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title={"Unsubscribe"}>
        <Text>
          <Group ml={10}>
            <Stack>
              <Title order={4}>Email Settings</Title>
                <Card withBorder={true}>
                  <ToggleUserUnsubscribeSettings
                    token={token}
                    settings={user?.settings}
                    setting={"settingsEmailMarketing"}
                    checked={user?.settings[0]?.settingsEmailMarketing}
                    label={"Marketing emails"}
                    description={"Receive emails about new products, features, and more."}
                />
              </Card>
              <Card withBorder={true}>
                <ToggleUserUnsubscribeSettings
                  token={token}
                  settings={user?.settings}
                  setting={"settingsEmailProduct"}
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