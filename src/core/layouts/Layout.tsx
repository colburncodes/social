import Head from "next/head"
import React, { Suspense, useState } from "react"
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next"
import { AppShell, Group, Text, Stack, Anchor, Button, Tooltip, Loader } from "@mantine/core"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "../../features/auth/mutations/logout"
import { useCurrentUser } from "../../features/users/hooks/useCurrentUser"
import { useRouter } from "next/navigation"
import { IconUserShield } from "@tabler/icons-react"
import { RootErrorFallback } from "~/src/pages/_app.page"
import classes from "~/src/styles/Home.module.css"
import { Footer } from '~/src/core/components/Footer/Footer'

type Props = {
  title?: string
  children?: React.ReactNode
}

const links = [
  { link: '/about', label: "About" },
  { link: '/events', label: "Events" },
  { link: '/contact', label: "Contact" },
  { link: '/create-group', label: "Create Group"}
];

const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  // @ts-ignore
  const [active, setActive] = useState(links[0].link)
  const user = useCurrentUser()

  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={user && active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        router.push(link.link)
      }}>
      {link.label}
    </Anchor>
  ))

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
              ml={50}
            >
              Social
            </Anchor>

            <Group mr={400} mt={5} gap={5} visibleFrom={"xs"}>
              {items}
            </Group>

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
          {/* @ts-expect-error Server Component */}
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense fallback={<Loader/>}>
              <Stack>{children}</Stack>
            </Suspense>
          </ErrorBoundary>
        </AppShell.Main>

          {/*<div style={{ textAlign: "center" }}>*/}
          {/*  <Text fz={"xs"} p={5}>*/}
          {/*    copyright {thisYear}*/}
          {/*  </Text>*/}
          {/*</div>*/}
          <Footer/>

      </AppShell>
    </>
  )
}

export default Layout
