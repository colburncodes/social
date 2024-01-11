import Head from "next/head"
import React, { Suspense, useState } from "react"
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next"
import {
  AppShell,
  Group,
  Text,
  Stack,
  Anchor,
  Button,
  Indicator,
  Loader,
  ActionIcon,
  Tooltip,
  useMantineColorScheme, useComputedColorScheme, Modal
} from "@mantine/core"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "../../features/auth/mutations/logout"
import { useCurrentUser } from "../../features/users/hooks/useCurrentUser"
import { useRouter } from "next/navigation"
import { IconSun, IconUserShield, IconMoon } from "@tabler/icons-react"
import { RootErrorFallback } from "~/src/pages/_app.page"
import classes from "~/src/styles/Home.module.css"
import { Footer } from '~/src/core/components/Footer/Footer'
import cx from 'clsx'
import { Img } from "@react-email/components"
import { ourFileRouter } from "~/src/uploadthing/uploadthing-router"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { UserAvatar } from "~/src/core/components/UserAvatar"
import { UserProfileProgress } from "~/src/core/components/UserProfileProgress"
import { OnboardingWizard } from "~/src/core/components/OnboardingWizard"


type Props = {
  title?: string
  children?: React.ReactNode
}

const links = [
  { link: '/about', label: "About" },
  { link: '/events', label: "Events" },
  { link: '/create-group', label: "Create Group"}
];

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const router = useRouter()
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  // @ts-ignore
  const [active, setActive] = useState(links[0].link)
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })


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
        header={{ height: 90 }}
        navbar={{ width: 300, breakpoint: "sm" }}
        footer={{ height: 30 }}
        padding="md"
      >
        <AppShell.Header>
          <Group style={{ justifyContent: "space-between", position: "relative" }}>

              <Anchor
                underline={"never"}
                component={Link}
                href={Routes.Home()}
                fw={"bold"}
                c={"black"}
                ml={10}
                pos={"relative"}
                top={-10}
              >
                <Img src={`${baseUrl}/social/social-logo.png`} width={200} height={120} alt={"Social"}/>
              </Anchor>

            {user &&
            <Group mr={100} mt={-30} gap={5} visibleFrom={"xs"}>
              {items}
            </Group>}

            <ActionIcon
              className={classes.iconWrapper}
              onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
              variant="default"
              size="md"
              aria-label="Toggle color scheme"
            >
              <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
              <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
            </ActionIcon>

            {user && (
              <Group className={classes.profile}>
                <Link href={user?.username ? Routes.ProfilePage({ username: user.username}) : Routes.EditProfilePage({ username: user.username})}>
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
                    <Text>{user.name}</Text>
                    <UserProfileProgress/>
                  </Group>
                </Link>

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
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {/* @ts-expect-error Server Component */}
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense fallback={<Loader/>}>
              <Modal
                size={"xl"}
                centered={true}
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                title={"Onboarding Tutorial"}
                opened={user != null && !user?.onBoarded}
                onClose={() => {}}>
                <OnboardingWizard />
              </Modal>
              <Stack>{children}</Stack>
            </Suspense>
          </ErrorBoundary>
        </AppShell.Main>
        <Footer/>
      </AppShell>
    </>
  )
}

export default Layout
