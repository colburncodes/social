import React, {Suspense, useEffect, useState} from "react"
import {BlitzLayout, ErrorBoundary, Routes} from "@blitzjs/next"
import {
  ActionIcon,
  Anchor,
  AppShell,
  Badge,
  Button,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme
} from "@mantine/core"
import Link from "next/link"
import {useCurrentUser} from "../../features/users/hooks/useCurrentUser"
import {IconMoon, IconSun} from "@tabler/icons-react"
import {RootErrorFallback} from "~/src/pages/_app.page"
import classes from "~/src/styles/Home.module.css"
import {Footer} from '~/src/core/components/footer/footer'
import cx from 'clsx'
import {ourFileRouter} from "~/src/uploadthing/uploadthing-router"
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {extractRouterConfig} from "uploadthing/server";
import {UserProfileProgress} from "~/src/core/components/header/user-profile-progress"
import {OnboardingWizard} from "~/src/core/components/onboarding-wizard"
import {modals} from "@mantine/modals"
import {GlobalModal} from "~/src/modals"
import {UserHeaderMenu} from "~/src/core/components/header/user-header-menu"
import {navigateToLoginRouter} from "~/src/utils/blitz-utils"
import {useRouter} from "next/router"
import {pathNameHidden} from "~/src/utils/constants"
import MetaTagHead from "~/src/core/meta-tag-head";
import {useHotkeys} from "@mantine/hooks";
import {getShortcutKeys} from "~/src/core/components/shortcuts/shortcut-list";
import {ShortcutId} from "~/src/shortcuts/types";

type Props = {
  title?: string
  children?: React.ReactNode
}

const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const user = useCurrentUser()
  const router = useRouter()
  const navigateToLogin = navigateToLoginRouter()
  // @ts-ignore
  const { setColorScheme } = useMantineColorScheme()
  const [isLoginButtonVisible, setLoginButtonVisible] = useState(true);
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })
  const isActive = (href: any) => router.pathname === href;
  const toggleColorScheme = () => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')

  useHotkeys([[getShortcutKeys(ShortcutId.ToggleDarkTheme), () => toggleColorScheme()]])

  const openModal = () => modals.openContextModal({
    modal: GlobalModal.becomePro,
    title: "Become a pro",
    innerProps: {
      price: 25
    }
  })

  const handleLoginButtonClick = async () => await navigateToLogin()

  useEffect(() => {
    setLoginButtonVisible(!pathNameHidden.includes(router.pathname))
  }, [router.pathname])

  return (
    <>
      <MetaTagHead title={title}/>
      <AppShell
        header={{ height: 90 }}
        navbar={{ width: 300, breakpoint: "sm" }}
        footer={{ height: 30 }}
        padding="md"
      >
          <Group style={{ justifyContent: "space-between", position: "relative" }}>
            <Group>
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
                <Text
                  style={{ fontFamily: "Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif", fontSize: "1.75rem", fontWeight: "bolder", marginTop: 20, marginLeft: 20}}>social</Text>
              </Anchor>

              <Anchor
                underline={"never"}
                component={Link}
                href={Routes.BlogPage()}
                fw={"bold"}
                c={isActive(Routes.BlogPage()) ? "black" : "gray"}
              >
                <Text size={"sm"}>features</Text>
              </Anchor>
              <Anchor
                underline={"never"}
                component={Link}
                href={Routes.PricingPage()}
                fw={"bold"}
                c={isActive(Routes.PricingPage()) ? "black" : "gray"}
              >
                <Text size={"sm"}>pricing</Text>
              </Anchor>
              <Anchor
                underline={"never"}
                component={Link}
                href={Routes.BlogPage()}
                fw={"bold"}
                c={isActive(Routes.BlogPage()) ? "black" : "gray"}
              >
                <Text size={"sm"}>blog</Text>
              </Anchor>

              <Anchor
                underline={"never"}
                component={Link}
                href={Routes.DocumentationPage()}
                fw={"bold"}
                c={isActive(Routes.DocumentationPage()) ? "black" : "gray"}
              >
                <Text size={"sm"}>docs</Text>
              </Anchor>
            </Group>


              <Group className={classes.profile}>
                <UserHeaderMenu/>
                <UserProfileProgress/>

                {user && (
                  <>
                    <Badge
                      style={{ border: '1px solid red' }}
                      variant={"light"}
                      onClick={() => {
                      openModal()
                    }} color={"red"}>
                      Pro
                    </Badge>

                    <ActionIcon
                      left={-5}
                      pos={"relative"}
                      top={1}
                      className={classes.iconWrapper}
                      onClick={() => toggleColorScheme()}
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
              <Button
                  bg={"black"}
                  c={"white"}
                  size="sm"
                  variant="light"
                  style={{ margin: 10, right: 30, top: 10 }}
                  onClick={handleLoginButtonClick}
              >
                Login
              </Button>
            )}

          </Group>
        <AppShell.Main style-={{ alignItems: "center"}}>
        <NextSSRPlugin
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
