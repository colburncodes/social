import Head from "next/head"
import React, { Suspense, useEffect, useState } from "react"
import { BlitzLayout, ErrorBoundary, Routes } from "@blitzjs/next"
import {
  AppShell,
  Group,
  Stack,
  Anchor,
  Loader,
  ActionIcon,
  Text,
  useMantineColorScheme, useComputedColorScheme, Modal, Badge, Button
} from "@mantine/core"
import Link from "next/link"
import { useCurrentUser } from "../../features/users/hooks/useCurrentUser"
import { IconSun, IconMoon } from "@tabler/icons-react"
import { RootErrorFallback } from "~/src/pages/_app.page"
import classes from "~/src/styles/Home.module.css"
import { Footer } from '~/src/core/components/footer/footer'
import cx from 'clsx'
import { ourFileRouter } from "~/src/uploadthing/uploadthing-router"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { UserProfileProgress } from "~/src/core/components/header/user-profile-progress"
import { OnboardingWizard } from "~/src/core/components/onboarding-wizard"
import { modals } from "@mantine/modals"
import { GlobalModal } from "~/src/modals"
import { UserHeaderMenu } from "~/src/core/components/header/user-header-menu"
import { navigateToLoginRouter } from "~/src/utils/blitz-utils"
import { useRouter } from "next/router"
import { pathNameHidden } from "~/src/utils/constants"

type Props = {
  title?: string
  children?: React.ReactNode
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const user = useCurrentUser()
  const router = useRouter()
  const navigateToLogin = navigateToLoginRouter()
  const [isLoginButtonVisible, setLoginButtonVisible] = useState(true);
  // @ts-ignore
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })
  const openModal = () => modals.openContextModal({
    modal: GlobalModal.becomePro,
    title: "Become a pro",
    innerProps: {
      price: 25
    }
  })

  const handleLoginButtonClick = async () => {
    await navigateToLogin()
  }

  useEffect(() => {
    const paths = pathNameHidden;

    const isLoginPage = paths.includes(router.pathname)
    setLoginButtonVisible(!isLoginPage)
  }, [router.pathname])

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
                <Text style={{ fontFamily: "Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif", fontSize: "1.75rem", fontWeight: "bolder", marginTop: 20, marginLeft: 20}}>social</Text>
                {/*<Img src={`${baseUrl}/social/logos/png/white_logo_no_background.png`} width={100} height={100} alt={"Social"}/>*/}
              </Anchor>

              <Group className={classes.profile}>
                <UserHeaderMenu/>
                <UserProfileProgress/>

                {user && (
                  <>
                    <Badge style={{ border: '1px solid red' }} variant={"light"} onClick={() => {
                      openModal()
                    }} color={"red"}>Pro</Badge>

                    <ActionIcon
                      left={-5}
                      pos={"relative"}
                      top={1}
                      className={classes.iconWrapper}
                      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                      variant="default"
                      size="md"
                      aria-label="Toggle color scheme"
                    >
                      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
                      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
                    </ActionIcon>
                  </>
                )}

              </Group>

            {!user && isLoginButtonVisible && (
              <Button bg={"black"} c={"white"} size="sm" variant="light"
                      style={{ margin: 10, right: 30, top: 10 }}
                      onClick={handleLoginButtonClick}>
                Login
              </Button>
            )}

          </Group>
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

      </AppShell>
      <Footer/>
    </>
  )
}

export default Layout
