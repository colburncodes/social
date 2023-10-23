import Head from "next/head"
import React from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { AppShell, Group, Text, Stack, Anchor, Button } from "@mantine/core"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "../../features/auth/mutations/logout"
import { useCurrentUser } from "../../features/users/hooks/useCurrentUser"
import { useRouter } from "next/navigation"
import { thisYear } from "src/utils/utils"

type Props = {
  title?: string
  children?: React.ReactNode
}
const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const user = useCurrentUser()

  const onLogout = async () => {
    await logoutMutation()
    router.push("/")
  }

  return (
    <>
      <Head>
        <title>{title || "social"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        header={{ height: 55 }}
        navbar={{ width: 300, breakpoint: "sm" }}
        footer={{ height: 30 }}
        padding="md"
      >
        <AppShell.Header>
          <Group style={{ justifyContent: "space-between" }}>
            <Anchor
              component={Link}
              href={Routes.Home()}
              fw={"bold"}
              p={10}
              c={"black"}
              underline={false}
            >
              SOCIAL
            </Anchor>

            {user && (
              <Button size="xs" variant="light" style={{ margin: 10 }} onClick={onLogout}>
                Logout
              </Button>
            )}
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
