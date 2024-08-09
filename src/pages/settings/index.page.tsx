import React from "react"
import { Divider, Stack, Tabs, Text, Title } from "@mantine/core"
import Layout from "~/src/core/layouts/layout"
import { BlitzPage } from "@blitzjs/next"
import {IconCreditCard, IconGift, IconKey, IconKeyboard, IconMail, IconUserCog} from "@tabler/icons-react"
import classes from '~/src/styles/Settings.module.css';
import { ChangePassword } from "~/src/pages/settings/components/change-password"
import { UserEmailSettings } from "~/src/pages/settings/components/user-email-settings"

export const Settings = () => {
  // @ts-ignore
  return (
    <>
      <Stack className={classes.container}>
        <Stack>
          <Title>Settings</Title>
          <Divider my={"sx"} w={500}/>
          <Text mb={10} size={"xs"}>Manage your account settings and set e-mail preferences.</Text>
        </Stack>
        <Tabs defaultValue="account" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="account" leftSection={<IconUserCog size={"0.8rem"}/>}>Account</Tabs.Tab>
            <Tabs.Tab value="notifications" leftSection={<IconMail size={"0.8rem"}/>}>Notifications</Tabs.Tab>
            <Tabs.Tab value="billing" leftSection={<IconCreditCard size={"0.8rem"}/>}>Billing</Tabs.Tab>
            <Tabs.Tab value="invitation" leftSection={<IconGift size={"0.8rem"}/>}>Invites</Tabs.Tab>
            <Tabs.Tab value="shortcuts" leftSection={<IconKeyboard size={"0.8rem"}/>}>Shortcuts</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="account">
            <ChangePassword/>
          </Tabs.Panel>
          <Tabs.Panel value="notifications">
            <UserEmailSettings/>
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            "Billing View"
          </Tabs.Panel>
          <Tabs.Panel value="invitation">
            "Invites View"
          </Tabs.Panel>
          <Tabs.Panel value="shortcuts">
            "Shortcuts View"
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </>
  )
}

export const SettingsPage: BlitzPage = () => {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Settings/>
      </Layout>
    </>
  )
}

export default SettingsPage