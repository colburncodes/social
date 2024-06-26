import { Card, Stack, Group, Title } from "@mantine/core"
import getUserEmailSettings from "~/src/features/users/queries/getUserEmailSettings"
import { useMutation, useQuery } from "@blitzjs/rpc"
import setUserSettings from "~/src/features/users/mutations/setUserSettings"
import React from "react"
import { ToggleUserSettings } from "~/src/core/components/toggle-user-settings"


export const UserEmailSettings: React.FC<{}> = () => {
    const [user] = useQuery(getUserEmailSettings, {})
    const [$setUserSettings, {isLoading}] = useMutation(setUserSettings)
    const marketingEmail = user?.settings[0]?.settingsEmailMarketing;
    const productEmail = user?.settings[0]?.settingsEmailProduct;
  const handleToggle = (key: any, value: any) => async () => {
     await $setUserSettings({
      key,
      value: !value
    })
  }

  return(
    <Group ml={10}>
      <Stack>
        <Title order={4}>Email Notifications</Title>
        <Card withBorder={true}>
          <ToggleUserSettings
            disabled={isLoading}
            onToggle={handleToggle("settingsEmailMarketing", marketingEmail)}
            checked={marketingEmail}
            label={"Marketing emails"}
            description={"Receive emails about new products, features, and more."}
          />
        </Card>
        <Card withBorder={true}>
          <ToggleUserSettings
            disabled={isLoading}
            onToggle={handleToggle("settingsEmailProduct", productEmail)}
            checked={productEmail}
            label={"Product emails"}
            description={"Want to learn more about the latest product updates, get notified now."}
          />
        </Card>
      </Stack>

    </Group>
  )
}
