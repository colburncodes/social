import React from "react"
import { Stack, Tabs } from "@mantine/core"
import Layout from "~/src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { IconMail, IconUserSearch } from "@tabler/icons-react"
import classes from '~/src/styles/Settings.module.css';
import { Users } from "~/src/core/components/Admin/Users"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"


export const Admin = () => {
  const user = useCurrentUser()
  return (
    <Stack className={classes.container}>
      <Tabs defaultValue="account" orientation="vertical">
        <Tabs.List>
          <Tabs.Tab value="email" leftSection={<IconMail size={"0.8rem"}/>}>Email</Tabs.Tab>
          {user?.isAdmin && <Tabs.Tab value="users" leftSection={<IconUserSearch size={"0.8rem"}/>}>Users</Tabs.Tab>}

        </Tabs.List>

        <Tabs.Panel value="email">
          <div>
            Sending Bulk Emails
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="profile">Profile tab content</Tabs.Panel>
        {user?.isAdmin && (
          <Tabs.Panel value="users">
            <Users/>
          </Tabs.Panel>
        )}

      </Tabs>
    </Stack>
  )
}

export const AdminPage: BlitzPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Admin/>
      </Layout>
    </>
  )
}

export default AdminPage