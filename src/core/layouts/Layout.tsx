import Head from "next/head"
import React, from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { AppShell, Group, Text, Stack, Anchor } from "@mantine/core"
import Link from "next/link"

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
            <Anchor
              component={Link}
              href={Routes.Home()}
              fw={"bold"}
              p={10}
              c={"black"}
              underline={false}
            >
              Social
            </Anchor>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          <Stack>{children}</Stack>
        </AppShell.Main>
        <AppShell.Footer>
          <div style={{ textAlign: "center" }}>
            <Text fz={"xs"} p={5}>
              copyright {thisYear}
            </Text>
          </div>
        </AppShell.Footer>
      </AppShell>
    </>
  )
}

export default Layout
