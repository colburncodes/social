import { Card, Stack, Group, Title, Switch, Text } from "@mantine/core"
import getUserEmailSettings from "~/src/features/users/queries/getUserEmailSettings"
import { useMutation, useQuery } from "@blitzjs/rpc"
import setUserSettings from "~/src/features/users/mutations/setUserSettings"
import React from "react"


export const UserEmailSettings = () => {
  const [user] = useQuery(getUserEmailSettings, {})
  const [$setUserSettings, {isSuccess}] = useMutation(setUserSettings)

  return(
    <Group ml={10}>

      <Stack>
        <Title order={4}>Email Notifications</Title>
        {isSuccess && <Text>Settings updated successfully!</Text>}
        <Card withBorder={true}>
          <Stack mt={10}>
            <Switch
              onClick={() => {
                const newVal = !user?.settings[0]?.settingsEmailMarketing;
                $setUserSettings({
                  key: "settingsEmailMarketing",
                  value: newVal
                })
              }}
              checked={user?.settings[0]?.settingsEmailMarketing}
              label="Marketing emails"
              color="gray"
            />
          </Stack>
          <Text mt={10} size={"xs"}>Receive emails about new products, features, and more.</Text>
        </Card>
        <Card withBorder={true}>
          <Switch
            onClick={() => {
              $setUserSettings({
                key: "settingsEmailProduct",
                value: !user?.settings[1]?.settingsEmailProduct
              })
            }}
            checked={user?.settings[1]?.settingsEmailProduct}
            label="Product updates"
            color="gray"
          />
          <Text mt={10} size={"xs"}>Want to learn more about the latest product updates, get notified now.</Text>
        </Card>
      </Stack>

    </Group>
  )
}
