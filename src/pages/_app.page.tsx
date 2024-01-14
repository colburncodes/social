import "@mantine/notifications/styles.css"
import "src/styles/globals.css"
import "@mantine/core/styles.css"
import { ErrorFallbackProps, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import { Group, MantineProvider, Paper, Text } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import AuthenticationForm from "~/src/core/components/AuthForm"
import { theme } from "~/src/styles/mantine-theme"
import { ModalsProvider } from "@mantine/modals"
import { globalModals } from "~/src/modals"

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
    <MantineProvider theme={theme}>
      <ModalsProvider modals={globalModals}>
        {/* @ts-expect-error Server Component */}
        <ErrorBoundary FallbackComponent={RootErrorFallback}>
          <Notifications position={"top-right"} />
          <Suspense fallback="Loading...">
            {/* @ts-expect-error Server Component */}
            <Component {...pageProps} />
          </Suspense>
        </ErrorBoundary>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
