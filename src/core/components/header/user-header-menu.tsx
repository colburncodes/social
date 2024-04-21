import { Menu, Indicator, Group, Tooltip, Button, Title } from "@mantine/core"
import {
  IconSettings,
  IconUserShield, IconUser
} from "@tabler/icons-react"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import { UserAvatar } from "~/src/core/components/user-avatar"
import { MenuItemEdit, MenuItemLink } from "~/src/core/components/menu-items"
import React from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"
import logout from "~/src/features/auth/mutations/logout"
import Layout from "~/src/core/layouts/layout"

export function UserHeaderMenu() {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  const user = useCurrentUser()
  if(!user) return null;

  //
  // if(!user) {
  //   return (
  //     <>
  //       {/* @ts-expect-error Server Component */}
  //       <Layout>
  //         <Group>
  //           <Title>user not found</Title>
  //         </Group>
  //       </Layout>
  //     </>
  //   )
  // }

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

        {user.isAdmin && (
          <MenuItemLink
            Icon={IconUserShield}
            href={Routes.AdminPage()}>
            Admin
          </MenuItemLink>
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