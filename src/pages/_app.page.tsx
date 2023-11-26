import "@mantine/notifications/styles.css"
import "src/styles/globals.css"
import "@mantine/core/styles.css"
import { ErrorFallbackProps, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { FC, Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import { createTheme, Group, MantineProvider, Paper, rem, Text } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import AuthenticationForm from "~/src/core/components/AuthForm"

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

const theme = createTheme({
  /** Put your mantine theme override here */
  // colors: {
  //   // Add your color
  //   dark: ['#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113' /* ... */]
  // },

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme={"light"}>
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Notifications position={"top-right"} />
        <Suspense fallback="Loading...">
          <Component {...pageProps} />
        </Suspense>
    </ErrorBoundary>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
