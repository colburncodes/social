import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next"
import { AppShell, Group, Text, Stack, Anchor, Button, Tooltip, Loader } from "@mantine/core"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "../../features/auth/mutations/logout"
import { useCurrentUser } from "../../features/users/hooks/useCurrentUser"
import { useRouter } from "next/navigation"
import { thisYear } from "src/utils/utils"
import { IconUserShield } from "@tabler/icons-react"
import { RootErrorFallback } from "~/src/pages/_app.page"

type Props = {
  title?: string
  children?: React.ReactNode
}
const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const user = useCurrentUser()

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
              underline={"never"}
              component={Link}
              href={Routes.Home()}
              fw={"bold"}
              p={10}
              c={"black"}
            >
              social
            </Anchor>

            {user && (
              <Group>
                <Text>{user.name}</Text>
                {user.isAdmin && <Tooltip label={"Admin"}>
                  <IconUserShield size={18} />
                </Tooltip>}
                <Button size="xs" variant="light" style={{ margin: 10 }} onClick={async () => {
                  await logoutMutation()
                  router.push('/')
                }}>
                  Logout
                </Button>
              </Group>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Main>
          {/*<ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>*/}
            <Suspense fallback={<Loader/>}>
              <Stack>{children}</Stack>
            </Suspense>
          {/*</ErrorBoundary>*/}
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
