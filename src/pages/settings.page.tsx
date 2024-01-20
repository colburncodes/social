import React from "react"
import { Stack, Tabs } from "@mantine/core"
import Layout from "~/src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { IconMail, IconUser, IconUserCog } from "@tabler/icons-react"
import classes from '~/src/styles/Settings.module.css';

export const SettingsPage: BlitzPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout className={classes.container}>
        <Stack>
          <Tabs defaultValue="account" orientation="vertical">
            <Tabs.List>
              <Tabs.Tab value="account" leftSection={<IconUserCog size={"0.8rem"}/>}>Account</Tabs.Tab>
              <Tabs.Tab value="email" leftSection={<IconMail size={"0.8rem"}/>}>Email</Tabs.Tab>
              <Tabs.Tab value="profile" leftSection={<IconUser size={"0.8rem"}/>}>Profile</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="account">Account tab content</Tabs.Panel>
            <Tabs.Panel value="email">Email tab content</Tabs.Panel>
            <Tabs.Panel value="profile">Profile tab content</Tabs.Panel>
          </Tabs>
        </Stack>
      </Layout>
    </>
  )
}

export default SettingsPage