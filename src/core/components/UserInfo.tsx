import { useCurrentUser } from "../../features/users/hooks/useCurrentUser"
import { Stack, Text } from "@mantine/core"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything  in here and start from scratch if you like.
 */
export const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) return null

  return (
    <>
      <Stack>
        <Text>
          User id: <code>{currentUser.id}</code>
        </Text>
        <br />
        <Text>
          User role: <code>{currentUser.role}</code>
        </Text>
      </Stack>
    </>
  )
}
