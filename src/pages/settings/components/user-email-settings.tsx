import { Card, Stack, Group, Title } from "@mantine/core"
import getUserEmailSettings from "~/src/features/users/queries/getUserEmailSettings"
import { useMutation, useQuery } from "@blitzjs/rpc"
import setUserSettings from "~/src/features/users/mutations/setUserSettings"
import React from "react"
import { ToggleUserSettings } from "~/src/core/components/toggle-user-settings"

interface EmailSettings {
    key: string;
    label: string;
    description: string;
}

const EMAIL_SETTINGS: EmailSettings[] = [
    {
        key: "settingsEmailMarketing",
        label: "Marketing emails",
        description: "Receive emails about new products, features, and more."
    },
    {
        key: "settingsEmailProduct",
        label: "Product emails",
        description: "Want to learn more about the latest product updates, get notified now."
    }
]

export const UserEmailSettings: React.FC<{}> = () => {
    const [user] = useQuery(getUserEmailSettings, {})
    const [$setUserSettings, {isLoading}] = useMutation(setUserSettings)
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
          {EMAIL_SETTINGS.map((setting) => (
            <Card withBorder={true}>
                <ToggleUserSettings
                  disabled={isLoading}
                  onToggle={handleToggle(setting.key, user?.settings[0]?.[setting.key] ?? false)}
                  checked={user?.settings[0]?.[setting.key]}
                  label={setting.label}
                  description={setting.description}
                />
          </Card>
          ))}
      </Stack>

    </Group>
  )
}
