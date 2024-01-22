import { Menu, rem, Indicator, Group, Tooltip, Button } from "@mantine/core"
import {
  IconSettings,
  IconTrash,
  IconUserShield, IconUser
} from "@tabler/icons-react"
import Link from 'next/link';
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import { UserAvatar } from "~/src/core/components/UserAvatar"
import { confirmDelete } from "~/src/utils/mantine-utils"
import { MenuItemEdit, MenuItemLink } from "~/src/core/components/MenuItems"
import React from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"
import logout from "~/src/features/auth/mutations/logout"

export function UserHeaderMenu() {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  const user = useCurrentUser()
  if(!user) return null;

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {user && (
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
        )}
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <MenuItemLink
          Icon={IconSettings}
          href={Routes.SettingsPage()}>
          Settings
        </MenuItemLink>

        <MenuItemEdit
          href={Routes.EditProfilePage()} >
          Edit Profile
        </MenuItemEdit>

        {user.username && (
          <MenuItemLink
            Icon={IconUser}
            href={Routes.ProfilePage({
            username: user.username
          })}>
            Go to Profile
          </ MenuItemLink>
        )}

        <Menu.Divider />

        <Button size="xs" variant="light" style={{ margin: 10 }} onClick={async () => {
          await logoutMutation()
          router.push('/')
        }}>
          Logout
        </Button>

      </Menu.Dropdown>
    </Menu>
  );
}