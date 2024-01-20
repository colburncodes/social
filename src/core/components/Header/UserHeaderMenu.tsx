import { Menu, rem, Indicator, Group, Tooltip } from "@mantine/core"
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

export function UserHeaderMenu() {
  const user = useCurrentUser()
  if(!user) return null;

  const deleteAccountMutation = () => {
    // wire up mutation later
    console.log("deleting account!")
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {user && (
          <Link href={user?.username ? Routes.ProfilePage({ username: user.username}) : Routes.EditProfilePage()}>
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

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          onClick={() => {
            confirmDelete(() => {
              deleteAccountMutation()
            }, {
              // override
              confirmLabel: "Delete my account"
            })
          }}
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}