import "@mantine/notifications/styles.css"
import "src/styles/globals.css"
import "@mantine/core/styles.css"
import { env } from "~/src/env.mjs"
import { APP_NAME } from "~/src/config"
import React, { Suspense } from "react"
import { globalModals } from "~/src/modals"
import { withBlitz } from "src/blitz-client"
import { Notifications } from "@mantine/notifications"
import { ErrorFallbackProps, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { Group, MantineProvider, Paper, Text } from "@mantine/core"
import AuthenticationForm from "~/src/core/components/auth-form"
import { theme } from "~/src/styles/mantine-theme"
import { ModalsProvider } from "@mantine/modals"
import { LogSnagProvider } from "@logsnag/next"
import {
  emotionTransform,
  MantineEmotionProvider,
} from '@mantine/emotion';
import {emotionCache} from "~/emotion/cache";
import { SpotlightWrapper } from "~/src/core/components/spotlight";


const ErrorComponent: React.FC<{ statusCode: string | number; title: string}> = ({
  statusCode,
  title
}) => {
  return(
    <Group>
      <Paper p={"xl"} w={"100%"} maw={400} radius={"md"}>
        <Group>
          <Text  fz={"md"} fw={"bold"}>
            {statusCode}
          </Text>
          <Group >
            <Text fz={"xl"}>An error occurred 😭</Text>
            <Text fz={"md"}>
              {title}
            </Text>
          </Group>
        </Group>
      </Paper>
    </Group>
  )
}

export function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <AuthenticationForm />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <MantineProvider stylesTransform={emotionTransform} theme={theme}>
        <MantineEmotionProvider cache={emotionCache}>
            <ModalsProvider modals={globalModals}>
              {/* @ts-expect-error Server Component */}
              <ErrorBoundary FallbackComponent={RootErrorFallback}>
                <Notifications position={"top-right"} />
                <Suspense fallback="Loading...">
                  <LogSnagProvider token={env.NEXT_PUBLIC_LOGSNAG_CLIENT_TOKEN} project={APP_NAME}>
                    <SpotlightWrapper>
                        {/* @ts-expect-error Server Component */}
                      <Component {...pageProps} />
                    </SpotlightWrapper>
                  </LogSnagProvider>
                </Suspense>
              </ErrorBoundary>
            </ModalsProvider>
        </MantineEmotionProvider>
      </MantineProvider>
  )
}

export default withBlitz(MyApp)
