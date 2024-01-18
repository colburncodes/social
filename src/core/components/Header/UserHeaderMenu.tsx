import { Menu, Text, rem, Indicator, Group, Tooltip } from "@mantine/core"
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconPencil,
  IconTrash,
  IconUserShield, IconUser
} from "@tabler/icons-react"
import Link from 'next/link';
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import { UserAvatar } from "~/src/core/components/UserAvatar"

export function UserHeaderMenu() {
  const user = useCurrentUser()
  if(!user) return null;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {user && (
          <Link href={user?.username ? Routes.ProfilePage({ username: user.username}) : Routes.EditProfilePage({ username: user.username})}>
            <Group>
              {user.isAdmin &&
                <Indicator
                  color={"none"}
                  top={10}
                  left={50}
                  position={"bottom-end"}
                  label={<Tooltip label={"Admin"}>
                    <IconUserShield size={13} />
                  </Tooltip>}>
                </Indicator>
              }
              <UserAvatar user={user}/>

            </Group>
          </Link>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconPencil size={14} />}>
          Edit Profile
        </Menu.Item>
        <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
          Go to Profile
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}