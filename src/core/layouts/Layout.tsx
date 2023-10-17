import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell, Group, Text, Stack } from "@mantine/core"

type Props = {
  title?: string
  children?: React.ReactNode
}
const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const thisYear = new Date().getFullYear()
  return (
    <>
      <Head>
        <title>{title || "social"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        header={{ height: 45 }}
        navbar={{ width: 300, breakpoint: "sm" }}
        footer={{ height: 30 }}
        padding="md"
      >
        <AppShell.Header>
          <Group>
            <Text fw={"bold"}>
              <div style={{ padding: 10 }}>Social</div>
            </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Stack>{children}</Stack>
        </AppShell.Main>
        <AppShell.Footer>
          <div style={{ textAlign: "center" }}>
            <Text fz={"xs"} p={5} color="dimmed">
              copyright {thisYear}
            </Text>
          </div>
        </AppShell.Footer>
      </AppShell>
    </>
  )
}

export default Layout
